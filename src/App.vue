<template>
  <div class="container">
    <Navbar :key="$route.fullPath">
      <div class="row bg-info p-3 mb-3">
        <div class="col-8">
          <h1 style="font-size:55px">
            Rate My Professor &nbsp;&nbsp;
            <span style="color:green">&star;&star;&star;&star;&star;</span>
          </h1>
        </div>
        <div class="col-2 m-auto" v-if="isLoggedIn()">
          <button style="width:135px;">
            <a href="#create professor">Add a New Professor</a>
          </button>
        </div>

        <!-- <div class="col"> -->
        <!-- <span v-if="isLoggedIn()"
            ><router-link to="/">Home</router-link> |
          </span> -->
        <!-- <router-link to="/about">About</router-link> | -->
        <!-- <router-link to="/signup">Signup</router-link> | -->
        <!-- <span v-if="isLoggedOut()"
            ><router-link to="/">Login</router-link>
          </span> -->
        <!-- <router-link to="/logout">Logout</router-link> | -->
        <!-- <span v-if="isLoggedIn()"
            ><router-link to="/professors">Professors</router-link></span
          > -->
        <!-- </div> -->
        <!-- <div class="col-2 m-auto" v-if="isLoggedIn()">
          <button style="width:135px;">
            <a href="#create professor">Create Professor</a>
          </button>
        </div> -->
        <div class="col-2 m-auto" v-if="isLoggedIn()">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button v-on:click="logout()">
            Logout
          </button>
        </div>
      </div>
    </Navbar>
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
    },
    isLoggedOut: function() {
      return !localStorage.getItem("jwt");
    },
    logout: function() {
      delete axios.defaults.headers.common["Authorization"];
      //axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("jwt");
      this.$router.push("/");
    },
  },
};
</script>

<style>
body {
  background: url("./assets/funky-lines.png");
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

.checked {
  color: orange;
}
a {
  text-decoration: none;
  color: black;
  width: 125px;
}
</style>
