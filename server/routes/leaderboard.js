import { initializeApp } from 'firebase/app'
import { getFirestore, collection, query, where, limit, getDocs, orderBy } from "firebase/firestore";
import { getQuery } from 'h3'
import { default as _ } from 'lodash/collection'


const appConfig = useAppConfig()
const firebaseApp = initializeApp(appConfig.firebaseConfig)
const db = getFirestore(firebaseApp)


export default defineEventHandler(async (event) => {

    let { id, host, path } =  getQuery(event)
    let unique = []
    let scores = []


    const q = query(
        collection(db, "scores"), 
        where("assessment_id", "==", id),
        where("host", "==", host),
        where("path", "==", path),
        orderBy("submitted", "desc")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if(!unique.includes(doc.data().uid)){
            unique.push(doc.data().uid)
            scores.push({ id: doc.id, ...doc.data() })
        }
    });
    
    // https://lodash.com/docs/4.17.15#orderBy
    return _.orderBy(scores, ['score', 'desc'])

})
