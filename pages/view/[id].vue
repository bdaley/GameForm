<script setup>
import QRCode from 'qrcode'

import { collectionGroup, query, where, limit, getDocs, getDoc, FieldPath, documentId } from "firebase/firestore";
import { getRequestURL, getRequestHost, getRequestProtocol } from 'h3'

const router = useRouter()
const route = useRoute()
const user = useCurrentUser()
const req = useRequestEvent()
// const headers = useRequestHeaders()

const id = route.params.id
const qrcode = ref('')
let assessment = ref({})
const notification = ref(false)
let notificationText = ref('')
const html = ref('')
const iframe = ref(`<iframe src="${currentURL().replace('view', 'iframe')}" frameborder="0" style="width:100%; min-height:550px; overflow:hidden" scrolling="no" ></iframe>`)


const db = useFirestore()



function currentURL(){
    return (typeof document !== 'undefined') ? document.URL : getRequestURL(req).href
}

async function copyURL(){
    let txt = currentURL()
    await navigator.clipboard.writeText(txt)
    showNotification('Successfully Copied to Clipboard!')
}

async function copyHTML(){
    await navigator.clipboard.writeText(html.value)
    showNotification('Successfully Copied to Clipboard!')
}


async function copyIframe() {
    await navigator.clipboard.writeText(iframe.value)
    showNotification('Successfully Copied to Clipboard!')
}

function showNotification(msg){
    notificationText.value = msg
    notification.value = true
}

function updateHTML(){
    // Set HTML Code
    html.value = document.querySelector('#gf-trivia-script').outerHTML
    html.value += document.querySelector('gf-trivia').outerHTML
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

    console.log(assessment)

    // Set QR Code
    QRCode.toDataURL(currentURL().replace('view', 'iframe'), {scale: 8}).then(url => {
        qrcode.value = url
    })
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
    <v-row>
        <v-col>
            <h2 style="text-transform: capitalize">{{ assessment.type }}</h2>
            <template v-if="assessment.answers">
                <gf-trivia :data-id="assessment.id" :answers="assessment.answers.join(',')" time="10">
                    {{ assessment.question }}
                </gf-trivia>
            </template>
        </v-col>
        <v-col>
            <h2>Share this Assessment!</h2>
            <v-expansion-panels variant="accordion" flat>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        URL
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            append-inner-icon="mdi-content-copy"
                            single-line
                            readonly
                            hide-details
                            @click:append-inner="copyURL"
                            style="font-family: monospace;"

                        >{{ currentURL() }}</v-text-field>
                    
                        <!-- <p><small><a :href="`/api/oembed?format=json&id=${id}&url=${currentURL()}`" target="_blank">oEmbed Provider URL</a></small></p> -->

                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        QR Code
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <img :src="qrcode" alt="QR Code for this Assessment" width="300" height="300">
                    </v-expansion-panel-text>
                </v-expansion-panel>  
                
                <v-expansion-panel>
                    <v-expansion-panel-title @click="updateHTML">
                        Embed Code (HTML)
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-textarea 
                            label="HTML Code" 
                            variant="outlined"
                            append-inner-icon="mdi-content-copy"
                            single-line
                            readonly
                            hide-details
                            @click:append-inner="copyHTML"
                            v-model="html"
                            auto-grow
                            style="font-family: monospace; "
                        >                  
                        </v-textarea>
                    </v-expansion-panel-text>
                </v-expansion-panel>  
                <v-expansion-panel>
                    <v-expansion-panel-title @click="updateHTML">
                        Embed Code (iframe)
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-textarea 
                            label="HTML Code" 
                            variant="outlined"
                            append-inner-icon="mdi-content-copy"
                            single-line
                            readonly
                            hide-details
                            @click:append-inner="copyIframe"
                            v-model="iframe"
                            auto-grow
                            style="font-family: monospace; "
                        >                  
                        </v-textarea>
                    </v-expansion-panel-text>
                </v-expansion-panel>                 

        </v-expansion-panels>
        </v-col>

        <v-snackbar
          v-model="notification"
          vertical
          :timeout="3000"
        >
          <!-- <div class="text-subtitle-1 pb-2">Notification</div> -->

          <p>{{ notificationText }}</p>

          <!-- <template v-slot:actions>
            <v-btn
              color="indigo"
              variant="text"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template> -->
        </v-snackbar>
    </v-row>
     
</template>


<style>

</style>