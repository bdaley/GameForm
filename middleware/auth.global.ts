// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await getCurrentUser()

    // console.log(to, from)

    // redirect the user to the login page
    if (!user && to.name !== 'login' && to.name !== 'view-id') {
        return navigateTo({
            path: '/login',
            query: {
                redirect: to.fullPath,
            },
        })
    }
})
