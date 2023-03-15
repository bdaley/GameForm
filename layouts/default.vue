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



</script>

<template>
    <v-app>
        <v-app-bar flat style="background-color: #293C70;">
            <v-container class="fill-height d-flex align-center">
                
                <NuxtLink to="/"><img src="/logo2.svg" alt="" height="40"></NuxtLink>  

                <v-btn v-for="link in links" :key="link" variant="text">
                    {{ link }}
                </v-btn>

                <v-btn v-if="user" @click="logOut">Log Out</v-btn>

                <v-spacer></v-spacer>

                <!-- <v-responsive max-width="260">
                    <v-text-field density="compact" hide-details variant="solo"></v-text-field>
                </v-responsive> -->
            </v-container>
        </v-app-bar>

        <v-main class="bg-grey-lighten-3">
            <v-container>
                <v-row>
                    <v-col cols="2">
                        <v-sheet rounded="lg">
                            <v-list rounded="lg">
                                <v-list-item v-for="n in 5" :key="n" link>
                                    <v-list-item-title>
                                        List Item {{ n }}
                                    </v-list-item-title>
                                </v-list-item>

                                <v-divider class="my-2"></v-divider>

                                <v-list-item link color="grey-lighten-4">
                                    <v-list-item-title>
                                        Refresh
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <v-sheet min-height="70vh" rounded="lg">
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