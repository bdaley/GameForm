<script setup>
const router = useRouter()
const route = useRoute()
const user = useCurrentUser()

onMounted(() => {
  watch(user, (user, prevUser) => {
    console.log(user, prevUser)
    if (prevUser && !user) {
      // user logged out
      console.log('user is logged out')
      router.push('/login')
    } else if (user && typeof route.query.redirect === 'string') {
      // user logged in
      console.log('user logged in')
      router.push(route.query.redirect)
    }else{
      console.log('other condition')
    }
  })
})

</script>



<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
