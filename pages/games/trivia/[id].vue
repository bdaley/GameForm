<script setup>
import { collectionGroup, query, where, limit, getDocs, getDoc, FieldPath, documentId } from "firebase/firestore";


const router = useRouter()
const route = useRoute()
const user = useCurrentUser()

const id = route.params.id


const db = useFirestore()




onMounted(async () => {
    console.log(id)
    const querySnapshot = query(collectionGroup(db, 'assessments'), where("id", '==', id), limit(1));

    console.log((await getDocs(querySnapshot)).docs[0].data())
})


useHead({
    script: [
        {
            src: 'https://cdn.jsdelivr.net/gh/bdaley/gf-web-components/dist/assets/js/gf-trivia.min.js'
        }
    ]
})

</script>



<template>
    <div>
        <h1>Loading Trivia Question</h1>
            <h3>Question Details</h3>




            <!-- <h3>Game Preview</h3>
            <gf-trivia :answers="options.join(',')" time="10">
                {{ question }}
            </gf-trivia> -->
    </div>
</template>


<style>

</style>
