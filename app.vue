<script setup>
const router = useRouter()
const route = useRoute()
const user = useCurrentUser()

onMounted(() => {
  watch(user, (user, prevUser) => {
    console.log(user, prevUser,  route.query.redirect)
    if (prevUser && !user) {
      // user logged out
      console.log('user is logged out')
      router.push('/login')
    } else {
      // user logged in
      console.log('user logged in')
      router.push('/')
    }
  })
})

</script>



<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
