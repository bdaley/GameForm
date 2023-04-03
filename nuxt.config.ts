// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    ssr: false,
    modules: [
        'nuxt-vuefire'
    ],
    css: ['vuetify/lib/styles/main.sass'],
    build: {
        transpile: ['vuetify']
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },
    vue: {
        compilerOptions: {
            // Ignore native web components
            isCustomElement: (tag) => ['gf-trivia'].includes(tag)
        }
    },
    vuefire: {
        auth: true,
        config: {
            apiKey: 'AIzaSyD8XNm6JuPn_JvB-mOkZYF1lntXl9JE0Ug',
            authDomain: 'getgameform.com',
            projectId: 'getgameform',
            appId: '1:631880925853:web:443dea65019c7f380b4a74',
            measurementId: "G-JSJEG57E3C"
            // there could be other properties depending on the project
        },
    },
})
