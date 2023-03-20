<script setup>

const router = useRouter()
const route = useRoute()
const user = useCurrentUser()



</script>



<template>
    <div>
        <h1>Your Assessments</h1>
        <p v-if="user">Hello, {{ user.displayName }}!</p>


    </div>
</template>
