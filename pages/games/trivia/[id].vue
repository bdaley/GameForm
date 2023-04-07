<script setup>
import QRCode from 'qrcode'

import { collectionGroup, query, where, limit, getDocs, getDoc, FieldPath, documentId } from "firebase/firestore";


const router = useRouter()
const route = useRoute()
const user = useCurrentUser()

const id = route.params.id
const qrcode = ref('')
const tab = ref(null)
const assessment = ref({})


const db = useFirestore()




onMounted(async () => {
    console.log(id)
    const querySnapshot = query(collectionGroup(db, 'assessments'), where("id", '==', id), limit(1));

    assessment.value = (await getDocs(querySnapshot)).docs[0].data()

    console.log(assessment)
    QRCode.toDataURL(document.URL).then(url => {
        qrcode.value = url
    })
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

            <v-card>
                <v-tabs
                v-model="tab"
                >
                <v-tab value="one">Assessment Preview</v-tab>
                <v-tab value="two">QR Code</v-tab>
                <v-tab value="three">Item Three</v-tab>
                </v-tabs>

                <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="one">
                        <gf-trivia :answers="assessment.answers.join(',')" time="10">
                            {{ assessment.question }}
                        </gf-trivia>
                    </v-window-item>

                    <v-window-item value="two">
                        <img :src="qrcode" alt="">

                    </v-window-item>

                    <v-window-item value="three">
                    Three
                    </v-window-item>
                </v-window>
                </v-card-text>
            </v-card>
    </div>
</template>


<style>

</style>
