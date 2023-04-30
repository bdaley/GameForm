<script setup>

import { collectionGroup, query, where, limit, getDocs, getDoc, FieldPath, documentId } from "firebase/firestore";
import { getRequestURL, getRequestHost, getRequestProtocol } from 'h3'

const router = useRouter()
const route = useRoute()
const user = useCurrentUser()
const req = useRequestEvent()
// const headers = useRequestHeaders()

const id = route.params.id
let assessment = ref({})


const db = useFirestore()

definePageMeta({
    layout: "empty",
});


function currentURL(){
    return (typeof document !== 'undefined') ? document.URL : getRequestURL(req).href
}

async function copyURL(){
    let txt = currentURL()
    await navigator.clipboard.writeText(txt)
    showNotification('Successfully Copied to Clipboard!')
}


function getOEmbedURL(){
    if(process.server){
        return `${getRequestProtocol(req)}://${getRequestHost(req)}/api/oembed?format=json&id=${id}&url=${currentURL()}`
    }
}



onMounted(async () => {
    console.log(id)
    const querySnapshot = query(collectionGroup(db, 'assessments'), where("id", '==', id), limit(1));

    assessment.value = (await getDocs(querySnapshot)).docs[0].data()
})

if(process.server){
    useHead({

        link: [
            {
                rel: 'alternate',
                type: 'application/json+oembed',
                href: getOEmbedURL()
            }
        ]
    })
}

</script>



<template>
    <!-- <v-row class="justify-center align-center"> -->
    <v-row>
        <v-col>
            <template v-if="assessment.answers">
                <gf-trivia :data-id="assessment.id" :answers="assessment.answers.join(',')" time="10">
                    {{ assessment.question }}
                </gf-trivia>
            </template>
        </v-col>
    </v-row>
     
</template>


<style>

</style>