import pako from 'pako';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';

import letterheadUrl from '../assets/frappe_letterhead.png';

const MAX_SIZE = 2100;

// A4 letterhead template dimensions (300 DPI) and QR size, mirroring the
// previous Python PDF server so the generated layout stays identical.
const PAGE_WIDTH = 2480;
const PAGE_HEIGHT = 3508;
const QR_SIZE = 992;
const QRS_PER_PAGE = 4;

const APP_NAME_FONT = '100 100px Roboto, Helvetica, Arial, sans-serif';
const NUMBER_FONT = 'bold 40px Roboto, Helvetica, Arial, sans-serif';
const NUMBER_HEIGHT = 40;

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

// Renders each data packet to a QR code PNG data URL.
const generateQRDataUrls = (dataPacketArray) => (
    Promise.all(dataPacketArray.map((packet) => (
        QRCode.toDataURL('http://frappe.com/load?data=' + packet, { errorCorrectionLevel: 'M' })
    )))
);

// Loads an image and resolves once it is ready to be drawn onto a canvas.
const loadImage = (src) => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
});

let letterheadPromise = null;
const getLetterhead = () => {
    if (!letterheadPromise) {
        letterheadPromise = loadImage(letterheadUrl);
    }
    return letterheadPromise;
};

// Draws a single letterhead page with up to four QR codes plus the app name and
// packet numbers, replicating the layout of the former Python PDF server.
const drawPage = (letterhead, qrImages, qrNumbers, pageIndex, appName) => {
    const canvas = document.createElement('canvas');
    canvas.width = PAGE_WIDTH;
    canvas.height = PAGE_HEIGHT;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(letterhead, 0, 0, PAGE_WIDTH, PAGE_HEIGHT);
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    const count = qrImages.length;
    const S = QR_SIZE;
    const halfW = Math.floor((PAGE_WIDTH - S) / 2);   // 744
    const eighthW = Math.floor((PAGE_WIDTH - S) / 8); // 186
    const rightX = PAGE_WIDTH - S - eighthW;          // 1302
    const halfH = Math.floor((PAGE_HEIGHT - S) / 2);  // 1258

    ctx.font = NUMBER_FONT;
    const numW = ctx.measureText('1').width;
    const drawNumber = (text, x, y) => {
        ctx.font = NUMBER_FONT;
        ctx.fillText(text, x, y);
    };
    const drawQr = (img, x, y) => ctx.drawImage(img, x, y, S, S);

    let appNameY = 0;

    if (count === 1) {
        const y = halfH - 300;
        drawQr(qrImages[0], halfW, y);
        appNameY = halfH - 200 + S;
        if (pageIndex !== 0) {
            drawNumber(qrNumbers[0], numW + halfW + 10, y - NUMBER_HEIGHT);
        }
    } else if (count === 2) {
        const y = halfH - 300;
        drawQr(qrImages[0], eighthW, y);
        drawNumber(qrNumbers[0], eighthW + 10 + numW, y - NUMBER_HEIGHT);
        drawQr(qrImages[1], rightX, y);
        drawNumber(qrNumbers[1], numW + rightX + 10, y - NUMBER_HEIGHT);
        appNameY = halfH - 200 + S;
    } else if (count === 3) {
        const topY = halfH - Math.floor(S / 2) - 300;
        const bottomY = halfH + Math.floor(S / 2) - 200;
        drawQr(qrImages[0], halfW, topY);
        drawNumber(qrNumbers[0], halfW + 10 + numW, topY - NUMBER_HEIGHT);
        drawQr(qrImages[1], eighthW, bottomY);
        drawNumber(qrNumbers[1], numW + eighthW + 10, bottomY - NUMBER_HEIGHT);
        drawQr(qrImages[2], rightX, bottomY);
        drawNumber(qrNumbers[2], numW + rightX + 10, bottomY - NUMBER_HEIGHT);
        appNameY = halfH - 100 + Math.floor(S * 3 / 2);
    } else if (count === 4) {
        const topY = halfH - Math.floor(S / 2) - 300;
        const bottomY = halfH + Math.floor(S / 2) - 200;
        drawQr(qrImages[0], eighthW, topY);
        drawNumber(qrNumbers[0], numW + eighthW + 10, topY - NUMBER_HEIGHT);
        drawQr(qrImages[1], rightX, topY);
        drawNumber(qrNumbers[1], numW + rightX + 10, topY - NUMBER_HEIGHT);
        drawQr(qrImages[2], eighthW, bottomY);
        drawNumber(qrNumbers[2], numW + eighthW + 10, bottomY - NUMBER_HEIGHT);
        drawQr(qrImages[3], rightX, bottomY);
        drawNumber(qrNumbers[3], numW + rightX + 10, bottomY - NUMBER_HEIGHT);
        appNameY = halfH - 100 + Math.floor(S * 3 / 2);
    }

    ctx.font = APP_NAME_FONT;
    const textW = ctx.measureText(appName).width;
    ctx.fillText(appName, Math.floor((PAGE_WIDTH - textW) / 2), appNameY);

    return canvas;
};

// Builds the QR-code PDF entirely in the browser and returns it as a Blob.
export const generateQRCodePdf = async (appId, appName, appVersion, dataPacketArray) => {
    const [qrUrls, letterhead] = await Promise.all([
        generateQRDataUrls(dataPacketArray),
        getLetterhead(),
    ]);
    const qrImages = await Promise.all(qrUrls.map(loadImage));
    const name = appName || 'Untitled';

    const doc = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    for (let start = 0, page = 0; start < qrImages.length; start += QRS_PER_PAGE, page++) {
        const pageImages = qrImages.slice(start, start + QRS_PER_PAGE);
        const pageNumbers = pageImages.map((_, idx) => String(start + idx + 1));
        const canvas = drawPage(letterhead, pageImages, pageNumbers, page, name);
        if (page > 0) {
            doc.addPage();
        }
        doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pageWidth, pageHeight);
    }

    return doc.output('blob');
};

export const generateQRCode = async (appId, appVersion, dataPacketArray) => {
    const qrUrls = await generateQRDataUrls(dataPacketArray);
    const zip = new JSZip();
    qrUrls.forEach((url, idx) => {
        const base64Data = url.replace('data:image/png;base64,', '');
        zip.file((idx + 1) + '.png', base64Data, { base64: true });
    });
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, appId + '_' + appVersion + '_qrcode.zip');
};

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