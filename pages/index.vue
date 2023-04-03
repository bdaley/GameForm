<script setup>
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";

const router = useRouter()
const route = useRoute()
const user = useCurrentUser()



const db = useFirestore()




onMounted(async () => {
    console.log(user.value.uid)
    const assessments = collection(db, 'users', user.value.uid,  'assessments')

    let collectionSnap = await getDocs(assessments)

    console.log(collectionSnap)

    // const museums = query(collectionGroup(db, 'users.assessments'), where('id', '==', id));
    // const docSnap = await getDocs(museums)
    // console.log(docSnap)
})

</script>



<template>
    <div>
        <h1>Your Assessments</h1>
        <p v-if="user">Hello, {{ user.displayName }}!</p>




        <v-btn color="primary" density="default" icon="mdi-plus" size="x-large" to="/games/trivia"></v-btn>


    </div>
</template>
