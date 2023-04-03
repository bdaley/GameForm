<script setup>

import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();


const router = useRouter()
const route = useRoute()
const user = useCurrentUser()

function logOut(){
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
        console.log(error)
    });
}

useHead({
    title: 'GameForm - The Fun Formative Assessment'
})

</script>

<template>
    <v-app>
        <header style="background-color: #293C70;">
               <v-container class="fill-height d-flex align-center justify-space-between" theme="dark">
                
                    <NuxtLink to="/" style="display:block;"><img src="/logo2.svg" alt="" height="40" style="display:block;"></NuxtLink>  

                    <div>
                        <v-btn  v-for="link in links" :key="link" variant="text" theme="dark">
                            {{ link }}
                        </v-btn>

                        <v-btn v-if="user" variant="plain" @click="logOut" theme="dark" color="secondary">Log Out</v-btn>


                    </div>

                </v-container>
            sdfds
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

<script>
export default {
    data: () => ({
        links: [
            
        ],
    }),
}
</script>