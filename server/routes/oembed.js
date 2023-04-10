// import { collectionGroup, query, where, limit, getDocs, getDoc, FieldPath, documentId } from "firebase/firestore";

// const nuxtApp = useNuxtApp()
 

export default defineEventHandler(async (event) => {

    // const db = useFirestore()

    // let { url, id } = getQuery(event)
    
    // const querySnapshot = query(collectionGroup(db, 'assessments'), where("id", '==', id), limit(1));

    // assessment.value = (await getDocs(querySnapshot)).docs[0].data()

    return { 
        "type": "rich", 
        "title": "Bacon Lollys", 
        "html": "<a data-flickr-embed=\"true\" href=\"https:\/\/www.flickr.com\/photos\/bees\/2362225867\/\" title=\"Bacon Lollys by \u202e\u202d\u202cbees\u202c, on Flickr\"><img src=\"https:\/\/live.staticflickr.com\/3040\/2362225867_4a87ab8baf_b.jpg\" width=\"1024\" height=\"768\" alt=\"Bacon Lollys\"><\/a><script async src=\"https:\/\/embedr.flickr.com\/assets\/client-code.js\" charset=\"utf-8\"><\/script>", 
        "version": "1.0", 
        "cache_age": 3600, 
        "provider_name": "GameForm", 
        "provider_url": "https:\/\/getgameform.com\/" 
    }
})
