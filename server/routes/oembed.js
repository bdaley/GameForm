import { initializeApp } from 'firebase/app'
import { getFirestore, collectionGroup, query, where, limit, getDocs } from "firebase/firestore";
import { getQuery } from 'h3'


const appConfig = useAppConfig()
const firebaseApp = initializeApp(appConfig.firebaseConfig)
const db = getFirestore(firebaseApp)


export default defineEventHandler(async (event) => {

    let { id } =  getQuery(event)

    const querySnapshot = query(collectionGroup(db, 'assessments'), where("id", '==', id), limit(1));

    const doc = (await getDocs(querySnapshot)).docs[0]

    return {
        "type": "rich",
        "title": doc.data().question,
        "id": doc.id,
        "html": `<script src="https://cdn.jsdelivr.net/gh/bdaley/gf-web-components/dist/assets/js/gf-trivia.js" async></script><gf-trivia data-id="${doc.id}" answers="${doc.data().answers.join(',')}" time="10">${doc.data().question}</gf-trivia>`,
        "version": "1.0",
        "cache_age": 3600,
        "provider_name": "GameForm",
        "provider_url": "https:\/\/getgameform.com\/"
    }

})
