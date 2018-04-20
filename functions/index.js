const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!"); });

exports.emojify = functions.database.ref("/messages/{pushID}/text").onCreate(myHandler => {
    console.log("Emojify...");
    var originalData = myHandler.val();
    var emojifiedData = emojifyText(originalData);

    return myHandler.ref.set(emojifiedData);
});

function emojifyText(text) {
    var emojifiedText = text;
    emojifiedText = emojifiedText.replace(/\blol\b/ig, "😂");
    emojifiedText = emojifiedText.replace(/\bcat\b/ig, "😸");
    emojifiedText = emojifiedText.replace(/\b(\+34|0034|34)?[ -](6|7)[ -]([0-9][ -]*){8}\b/ig, "No se puede acceder a este número");
    return emojifiedText;
}
