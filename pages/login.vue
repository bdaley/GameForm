<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();

const router = useRouter()
const route = useRoute()
const user = useCurrentUser()


function login() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}
</script>



<template>
    <div>
            <h1>Login Page</h1>
          <v-btn
            color="primary"
            @click="login()"
          >
            Login w/ Google
          </v-btn>



        <v-btn
              color="primary"
              to="/"
            >
              Dashboard
        </v-btn>
    </div>
</template>
