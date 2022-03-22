import pako from 'pako';

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
    const dataPacketsArray = [];

    var dataPointer = 0;
    for (let i = 0; i < dataPackets; i++) {
        var dataSlice = "";
        while (byteSize(dataSlice) < allowedDataPacketSize && dataPointer < dataLength) {
            dataSlice += compressedData.charAt(dataPointer);
            dataPointer++;
        }
        dataPacketsArray.push(appId + '_' + (i + 1) + '_' + dataPackets + '_' + dataLength + '_' + dataSlice);
    }
    return dataPacketsArray;
}

export const byteSize = str => new Blob([str]).size;