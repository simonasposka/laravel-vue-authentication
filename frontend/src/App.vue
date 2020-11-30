<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="!authenticated" :to="{ name: 'login' }">Login  </router-link>
      <router-link v-if="authenticated" :to="{ name: 'posts' }">Posts </router-link>
      <button v-if="authenticated" @click="logout">logout</button>

      <p v-if="loading">loading...</p>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      loading: false,
      error: false,
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'authenticated'
    })
  },

  methods: {
    async logout() {
      this.loading = true;

      try {
        await this.$store.dispatch('logout');
        await this.$router.push({ name: 'login' })
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav div {
  display: inline-block;
}

.link-logout:hover {
  cursor: pointer;
  text-decoration: underline;
}

</style>
