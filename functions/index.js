const functions = require("firebase-functions");
const admin = require("firebase-admin")
const express = require('express');
const cors = require('cors')({ origin: true });
const { getFirestore } = require('firebase-admin/firestore');

admin.initializeApp();

const db = getFirestore()

const app = express();
app.use(cors);

app.get('/', (req, res) => {
    res.send('nothing to see here. move along.')
});

app.get('/oembed', (req, res) => {

    let { format, id, url } = req.query

    if(id){

        var query = db.collectionGroup('assessments').where('id', '==', id).limit(1);
        query.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                res.send({
                    "type": "rich",
                    "title": doc.data().question,
                    "id": doc.id,
                    "html": `<script src="https://cdn.jsdelivr.net/gh/bdaley/gf-web-components/dist/assets/js/gf-trivia.js" async></script><gf-trivia data-id="${doc.id}" answers="${doc.data().answers.join(',')}" time="10">${doc.data().question}</gf-trivia>`,
                    "version": "1.0",
                    "cache_age": 3600,
                    "provider_name": "GameForm",
                    "provider_url": "https:\/\/getgameform.com\/"
                })                
            });
        });       
    }



})

exports.api = functions.https.onRequest(app);