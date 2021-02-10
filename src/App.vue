<template>
  <div class="container">
    <div class="row bg-info p-3 mb-3">
      <div class="col"><h1>Rate My Professor</h1></div>
      <div class="col">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/signup">Signup</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/logout">Logout</router-link> |
        <router-link to="/professors">Professors</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

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
