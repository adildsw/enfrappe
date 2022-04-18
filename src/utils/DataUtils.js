import pako from 'pako';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import saveAs from 'file-saver';

const MAX_SIZE = 2100;

const PDF_SERVER_IP = '127.0.0.1';
const PDF_SERVER_PORT = '3001';

export const compressData = (data) => (
    {
        'length': JSON.stringify(data).length,
        'data': btoa(String.fromCharCode(...pako.deflate(JSON.stringify(data))))
    }
)

export const decompressData = (data) => {
    const binaryArray = atob(data).split('').reduce((acc, next) => [...acc, next.charCodeAt(0)], [] );
    return pako.inflate(binaryArray, { to: 'string' });
}

export const enfrappifyData = (appId, data) => {
    const compressedDataObj = compressData(data);
    const compressedData = compressedDataObj['data'];
    const dataLength = compressedDataObj['length'];
    const allowedDataPacketSize = MAX_SIZE - byteSize(appId) - byteSize(dataLength) - 6;
    const compressedDataSize = byteSize(compressedData);
    const dataPackets = Math.ceil(compressedDataSize / allowedDataPacketSize);
    const dataPacketArray = [];

    console.log(compressedData, dataLength);

    var dataPointer = 0;
    for (let i = 0; i < dataPackets; i++) {
        var dataSlice = "";
        while (byteSize(dataSlice) < allowedDataPacketSize && dataPointer < dataLength) {
            dataSlice += compressedData.charAt(dataPointer);
            dataPointer++;
        }
        dataPacketArray.push(appId + '_' + (i + 1) + '_' + dataPackets + '_' + dataLength + '_' + dataSlice);
    }

    return dataPacketArray;
}

export const generateQRCode = (appId, appVersion, dataPacketArray) => {
    const zip = new JSZip();
    dataPacketArray.forEach((packet, idx) => {
        QRCode.toDataURL('http://frappe.com/load?data=' + packet, { errorCorrectionLevel: 'M'}, function (err, url) {
            const base64Data = url.replace('data:image/png;base64,', '');
            zip.file((idx + 1) + '.png', base64Data, {base64: true});
        });
    });
    zip.generateAsync({type:'blob'}).then(function(content) {
        saveAs(content, appId + '_' + appVersion + '_qrcode.zip');
    });
}

export const generateQRCodePdf = (appId, appName, appVersion, dataPacketArray) => {
    const b64Images = {};
    dataPacketArray.forEach((packet, idx) => {
        QRCode.toDataURL('http://frappe.com/load?data=' + packet, { errorCorrectionLevel: 'M'}, function (err, url) {
            b64Images['img_' + (idx + 1)] = url;
        });
    });
    return fetch('http://' + PDF_SERVER_IP + ':' + PDF_SERVER_PORT + '/generate_pdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...b64Images,
                'app_id': appId,
                'app_name': appName,
                'count': dataPacketArray.length,
            })
        })
        .then(response => response.blob())
        .then(blob => {
            return blob;
        });
}

export const downloadQRCodePdf = (appId, appName, appVersion, dataPacketArray) => {
    generateQRCodePdf(appId, appName, appVersion, dataPacketArray)
        .then(blob => {
            saveAs(blob, appId + '_' + appVersion + '_qrcode.pdf');
        });
}

export const generateAndPrintQRCodePdf = (appId, appName, appVersion, dataPacketArray) => {
    generateQRCodePdf(appId, appName, appVersion, dataPacketArray)
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            const iframe = document.createElement('iframe');
            document.body.appendChild(iframe);
            iframe.style.display = 'none';
            iframe.src = blobUrl;
            iframe.onload = function() {
                setTimeout(function() {
                    iframe.contentWindow.print();
                }, 1);
            }
        });
}

export const byteSize = str => new Blob([str]).size;