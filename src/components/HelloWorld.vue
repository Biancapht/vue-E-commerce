<template>
  <div class="hello">
    <a href="#" @click.prevent="signout">登出</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    signout() {
      const api = `${process.env.APIPATH}/logout`;
      this.$http.post(api).then((response) => {
          // 登出成功後返回登入頁
          if(response.data.success) {
              this.$router.push('/login');
          }
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
