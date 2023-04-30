import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getQuery } from 'h3'
// import { default as _ } from 'lodash/collection'


// const appConfig = useAppConfig()
const firebaseApp = initializeApp({
    // credential: appConfig.firebaseAdmin.serviceAccount,
    credential: applicationDefault(),
    databaseURL: 'https://gameform.firebaseio.com'
}, 'leaderboard')




export default defineEventHandler(async (event) => {

    const db = getFirestore(firebaseApp)


    let { id, host, path } =  getQuery(event)
    let unique = []
    let scores = []


    const q = db.collection("scores")
        .where("assessment_id", "==", id)
        .where("host", "==", host)
        .where("path", "==", path)
        .orderBy("submitted", "asc")

    const querySnapshot = await q.get();
    querySnapshot.forEach((doc) => {
        if(!unique.includes(doc.data().uid)){
            unique.push(doc.data().uid)
            scores.push({ id: doc.id, ...doc.data() })
        }
    });
    
    // https://lodash.com/docs/4.17.15#orderBy
    // return _.orderBy(scores, ['score', 'desc'])
    return scores

})
