<script setup>
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore'
const router = useRouter()
const route = useRoute()
const user = useCurrentUser()

const question = ref("")
const solution = ref("")
let loading = ref(false)
let options = ref([""])
const db = useFirestore()



async function publish(){

    loading = true

    const docRef = doc(collection(db, "users", user.value.uid, "assessments"))
    
    await setDoc(docRef, {
        "id": docRef.id,
        "type": 'trivia',
        "question": question.value,
        "answers": [solution.value, ...options.value]
    })
    console.log(docRef.id)

    router.push(`/games/trivia/${docRef.id}`)


    // loading = false

}

function addOption(key){
    if(isLastOption(key)){
        options.value.push("")
    }   
}

function deleteOption(key){
    options.value.splice(key, 1)
}



function getHint(key){
    return (isLastOption(key)) 
        ? "Press Tab key to add another option"
        : ''
}

function isLastOption(key){
    return key === (options.value.length-1)
}

function log(){
    console.log('tab pressed')
}

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
        <h1>New Trivia Question</h1>
            <h3>Question Details</h3>
            <form @submit.prevent="publish">
                <v-text-field
                name="question"
                v-model="question"
                label="Question"
                ></v-text-field>

                <v-text-field
                name="answer"
                v-model="solution"
                label="Correct Answer"
                ></v-text-field>


                <v-text-field
                :name="`option_${index}`"
                v-for="(item, index) in options" :key="`index_${index}`"
                :label="`Option ${index+1}`"
                @keydown.tab="addOption(index)"
                v-model="options[index]"
                persistent-hint
                :hint="getHint(index)"
                append-icon="mdi-delete"
                :model-value="item"
                @click:append="deleteOption(index, this)"
                ></v-text-field>


                    <!-- <v-btn
                    class="me-4"
                    @click="addOption"
                    >
                        Add Option
                    </v-btn>            -->

                
                
                    <v-btn
                    class="me-4 mt-4"
                    type="submit"
                    color="primary"
                    :loading="loading"
                    >
                        Publish
                    </v-btn>

            </form>




            <!-- <h3>Game Preview</h3>
            <gf-trivia :answers="options.join(',')" time="10">
                {{ question }}
            </gf-trivia> -->
    </div>
</template>


<style>

</style>
