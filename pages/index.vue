<script setup>

const router = useRouter()
const route = useRoute()
const user = useCurrentUser()



</script>



<template>
    <div>
        <h1>Index Page</h1>
        <p>user is logged in</p>
        <p v-if="user">{{ user.displayName }}</p>
    </div>
</template>
