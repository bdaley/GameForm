<script setup>
import {
  doc,
  setDoc,
} from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();

const router = useRouter()
const route = useRoute()
const user = useCurrentUser()
const db = useFirestore()


function login() {
    signInWithPopup(auth, provider)
        .then( async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            const docRef = doc(db, "users", user.uid )
            await setDoc(docRef, {
              "displayName": user.displayName,
              "email": user.email,
              "photoURL": user.photoURL
            });
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // The email of the user's account used.
            // const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}
</script>



<template>
    <div>
            <h1>Login Page</h1>
          <v-btn v-if="!user"
            color="primary"
            @click="login()"
          >
            Login w/ Google
          </v-btn>



        <v-btn v-if="user"
              color="primary"
              to="/"
            >
              Dashboard
        </v-btn>
    </div>
</template>
