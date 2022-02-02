var qrcode;

$(document).ready(function() {
});

function initQRCode() {
    qrcode = new QRCode("qrcode", {
        text: "this is an enfrappe test placeholder qrcode. also, i don't understand why toefl scores expire in 2 years, it's not like i forgot how to speak english wth...",
        correctLevel: QRCode.CorrectLevel.H,
        colorDark : "#000000",
        colorLight : "#FFFFFF",
        width: 2000,
        height: 2000
    });
}