<script setup>

import { getAuth, signOut } from "firebase/auth";



const router = useRouter()
const route = useRoute()
const user = useCurrentUser()

function logOut(){
    signOut(getAuth()).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
        console.log(error)
    });
}

useHead({
    title: 'GameForm - The Fun Formative Assessment',
    script: [
        {
            src: 'https://cdn.jsdelivr.net/gh/bdaley/gf-web-components/dist/assets/js/gf-trivia.js',
            async: true,
            id: 'gf-trivia-script'
        }
    ],
    link: [
        {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css'
        }
    ]
})

</script>

<template>
    <v-app>
        <header style="background-color: #293C70;">
               <v-container class="fill-height d-flex align-center justify-space-between" theme="dark">
                
                    <NuxtLink to="/" style="display:block;"><img src="/logo2.svg" alt="" height="40" style="display:block;"></NuxtLink>  

                    <div>


                        <v-btn v-if="user" variant="plain" @click="router.push('/')" theme="dark" color="secondary">Dashboard</v-btn>
                        <v-btn v-if="user" variant="plain" @click="logOut" theme="dark" color="secondary">Log Out</v-btn>


                    </div>

                </v-container>
        </header>

        <v-main class="bg-grey-lighten-3">
            <v-container>
                <v-row>
                    <v-col>
                        <v-sheet min-height="50vh" rounded="lg" class="pa-5">
                            <slot></slot>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
