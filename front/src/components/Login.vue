<template>
  <div>
    <div class="login_form">
      <form class="container" @submit.prevent="enterToSite">
        <div class="row">
          <div class="col-lg-6 text-right"> Login</div>
          <div class="col-lg-3"><input type="text" placeholder="Login" v-model="login"></div>
        </div>
        <div class="row">
          <div class="col-lg-6 text-right">Password</div>
          <div class="col-lg-3"><input type="text" placeholder="Password" v-model="password"></div>
        </div>
        <b-button variant="primary" @click="enterToSite">
          Войти
        </b-button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    methods: {
      enterToSite () {
        this.$http.get('http://localhost:3000/admin', { login: this.login, password: this.password }).then((res) => {
          sessionStorage.setItem('tockenId', Number(res.data.tokenId))
          this.$router.push({ path: '/aut/ordersList' })
        })
      }
    },
    data () {
      return {
        login: '',
        password: ''
      }
    }
  }
</script>
