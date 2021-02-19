<template>
  <div class="container">
    <div class="row bg-info p-3 mb-3">
      <div class="col"><h1>Rate My Professor</h1></div>
      <div class="col">
        <span v-if="isLoggedIn()"
          ><router-link to="/">Home</router-link> |
        </span>
        <!-- <router-link to="/about">About</router-link> | -->
        <!-- <router-link to="/signup">Signup</router-link> | -->
        <span v-if="isLoggedOut()"
          ><router-link to="/login">Login</router-link>
        </span>
        <!-- <router-link to="/logout">Logout</router-link> | -->
        <span v-if="isLoggedIn()"
          ><router-link to="/professors">Professors</router-link></span
        >
      </div>
      <div v-if="isLoggedIn()" class="col">
        <button v-on:click="logout()">Logout</button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {};
  },
  methods: {
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
      // if (localStorage.getItem("jwt")) {
      //   console.log("Testing");
      //   console.log("123");
      // }
    },
    isLoggedOut: function() {
      return !localStorage.getItem("jwt");
    },
    logout: function() {
      axios.defaults.headers.common["Authorization"] = "";
      axios.defaults.headers.common["Authorization"] = localStorage.removeItem(
        "jwt"
      );
      this.$router.push("/login");
    },
  },
};
</script>

<style>
body {
  background: url("./assets/double-bubble.png");
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
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
</style>
