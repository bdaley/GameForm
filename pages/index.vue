<script setup>
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";

const router = useRouter()
const route = useRoute()
const user = useCurrentUser()

const assessments = ref([])



const db = useFirestore()

function deleteAssessment(){
    alert('wip')
}


function editAssessment() {
    alert('wip')
}

onMounted(async () => {
    let query = collection(db, 'users', user.value.uid,  'assessments')
    getDocs(query).then(rows => {
        rows.forEach(row => {
            assessments.value.push({...row.data(), id: row.id})
        })
    })
})

</script>



<template>
    <div style="position: relative; height:100%">
        <h1>Your Assessments</h1>


        <v-table>
            <thead>
                <tr>
                    <th>Name/Question</th>
                    <th>Assessment Type</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="assessment in assessments">
                    <td><nuxt-link :to="`/view/${assessment.id}`">{{ assessment.question || 'name not set' }}</nuxt-link></td>
                    <td>{{ assessment.type || 'trivia' }}</td>
                    <td class="d-flex align-center gap-2" style="gap:.5em">
                                                
                        <v-btn
                        icon="mdi-pencil"
                        border
                        height="40"
                        variant="text"
                        width="40"
                        @click="editAssessment(assessment.id)"

                        ></v-btn>




                            <v-btn
                                icon="mdi-content-copy"
                                border
                                height="40"
                                variant="text"
                                width="40"
                                @click="editAssessment(assessment.id)"
                            ></v-btn>                        

                        <v-btn
                        icon="mdi-delete"
                        border
                        height="40"
                        variant="text"
                        width="40"
                        @click="deleteAssessment(assessment.id)"
                        ></v-btn>


                    </td>
                </tr>
            </tbody>
        </v-table>

        <v-btn color="primary" density="default" icon="mdi-plus" size="x-large" to="/games/trivia" style="position: absolute; right: 0px; bottom: -100px"></v-btn>


    </div>
</template>
