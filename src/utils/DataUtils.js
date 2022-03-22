import pako from 'pako';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import saveAs from 'file-saver';

const MAX_SIZE = 2500;

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

    var dataPointer = 0;
    for (let i = 0; i < dataPackets; i++) {
        var dataSlice = "";
        while (byteSize(dataSlice) < allowedDataPacketSize && dataPointer < dataLength) {
            console.log(byteSize(dataSlice), dataSlice.length);
            dataSlice += compressedData.charAt(dataPointer);
            dataPointer++;
        }
        dataPacketArray.push(appId + '_' + (i + 1) + '_' + dataPackets + '_' + dataLength + '_' + dataSlice);
    }

    return dataPacketArray;
}

export const generateQRCode = (appId, dataPacketArray) => {
    const zip = new JSZip();
    dataPacketArray.forEach((packet, idx) => {
        QRCode.toDataURL(packet, { errorCorrectionLevel: 'L'}, function (err, url) {
            const base64Data = url.replace('data:image/png;base64,', '');
            zip.file((idx + 1) + '.png', base64Data, {base64: true});
        });
    });
    zip.generateAsync({type:"blob"}).then(function(content) {
        saveAs(content, appId + "_qrcode.zip");
    });
}


export const byteSize = str => new Blob([str]).size;