<template>
    <div id="main">
        <Header title="我的喵喵" />
        <router-view></router-view>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
import LoginIn from '@/components/LoginIn/index.vue'
export default {
    name : 'Mine',
    components :{
        Header,
        Footer,
        LoginIn
    }
}
</script>

<style scoped>

</style>