<script setup>

const router = useRouter()
const route = useRoute()
const user = useCurrentUser()



</script>



<template>
    <div>
        <h1>Your Assessments</h1>
          <v-btn
            class="ma-2"
            variant="text"
            icon="mdi-thumb-down"
            color="red-lighten-2"
          ></v-btn>
        <p v-if="user">{{ user.displayName }}</p>

        <v-icon icon="mdi-home" />

    </div>
</template>
