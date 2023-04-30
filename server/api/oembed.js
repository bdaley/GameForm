// import { initializeApp, applicationDefault } from 'firebase-admin/app'
// import { getFirestore } from 'firebase-admin/firestore'
// import { getQuery } from 'h3'


// // const appConfig = useAppConfig()
// const firebaseApp = initializeApp({
//     // credential: appConfig.firebaseAdmin.serviceAccount,
//     credential: applicationDefault(),
//     databaseURL: 'https://gameform.firebaseio.com'
// })



// export default defineEventHandler(async (event) => {

//     const db = getFirestore(firebaseApp)

//     let { id } =  getQuery(event)

//     let  query = db.collectionGroup('assessments').where('id', '==', id).limit(1);

//     try {
//         let doc = (await query.get()).docs[0].data()

//         return {
//             "type": "rich",
//             "title": doc.question,
//             "id": doc.id,
//             "html": `<script src="https://cdn.jsdelivr.net/gh/bdaley/gf-web-components/dist/assets/js/gf-trivia.js" async></script><gf-trivia data-id="${doc.id}" answers="${doc.answers.join(',')}" time="10">${doc.question}</gf-trivia>`,
//             "version": "1.0",
//             "cache_age": 3600,
//             "provider_name": "GameForm",
//             "provider_url": "https:\/\/getgameform.com\/"
//         }
//     } catch (error) {
//         return error
//     }
//     // query.get().then((querySnapshot) => {
//     //     querySnapshot.forEach((doc) => {
//     //         // console.log(doc.data())
//     //         res =  {
//     //             "type": "rich",
//     //             "title": doc.data().question,
//     //             "id": doc.data().id,
//     //             "html": `<script src="https://cdn.jsdelivr.net/gh/bdaley/gf-web-components/dist/assets/js/gf-trivia.js" async></script><gf-trivia data-id="${doc.id}" answers="${doc.data().answers.join(',')}" time="10">${doc.data().question}</gf-trivia>`,
//     //             "version": "1.0",
//     //             "cache_age": 3600,
//     //             "provider_name": "GameForm",
//     //             "provider_url": "https:\/\/getgameform.com\/"
//     //         }
//     //     });
//     //     console.log(res)
//     //     return res
// });     



