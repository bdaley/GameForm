<script setup>

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
        <slot></slot>
    </v-app>
</template>

<style>
</style>