import fs from 'node:fs'
import path from 'node:path'

const sa = path.resolve(__dirname, 'serviceAccountKey.json')


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: false,
        layoutTransition: false
    },
    nitro: {
        preset: 'digital-ocean'
    },
    // ssr: false,
    routeRules: {
        '/login/**': { ssr: false },
        '/view/**': {
            cors: true,
            ssr: true
        }, 
        '/iframe/**': {
            cors: true,
            ssr: true
        },
        '/api/**': {
            cors:true
        }
        // // Static page generated on-demand once
        // '/articles/**': { static: true },
        // // Set custom headers matching paths
        // '/_nuxt/**': { headers: { 'cache-control': 's-maxage=0' } },
        // // Render these routes with SPA
        // '/admin/**': { ssr: false },
        // // Add cors headers
        // '/api/v1/**': { cors: true },
        // // Add redirect headers
        // '/old-page': { redirect: '/new-page' },
        // '/old-page2': { redirect: { to: '/new-page', statusCode: 302 } }                                                                                                                                                                            
    },
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
            authDomain: 'getgameform.web.app',
            projectId: 'getgameform',
            appId: '1:631880925853:web:443dea65019c7f380b4a74',
            measurementId: "G-JSJEG57E3C"
            // there could be other properties depending on the project
        },
        admin: {
            serviceAccount: sa
        }
    },
    //https://nuxt.com/docs/api/configuration/nuxt-config#hooks
    hooks: {
        'nitro:build:public-assets': (nitro) =>{
            // const sa = `${nitro.options.output.serverDir}/.serviceAccountKey.json`
            // console.log(nitro.options.output)
            console.log('Writing SA')
            const buff = Buffer.from(process.env.SERVICE_ACCOUNT, 'base64')
            const decoded = buff.toString('utf-8')

            fs.writeFile(sa, decoded, (err, data)=>{
                console.log(`File written: ${sa}`)
            })

        }
    }
})
