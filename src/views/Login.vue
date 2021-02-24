<template>
  <div class="row">
    <div class="col-5 mx-auto login">
      <form v-on:submit.prevent="submit1()">
        <h1>Login</h1>
        <ul>
          <li class="text-danger" v-for="error in errors1">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email" />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="loginPassword" />
        </div>
        <input type="submit" class="mt-3 btn btn-primary" value="Submit" />
      </form>
    </div>

    <div class="col-5 m-auto signup">
      <form v-on:submit.prevent="submit2()">
        <h1>Signup</h1>
        <ul>
          <li class="text-danger" v-for="error in errors2">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Name:</label>
          <input type="text" class="form-control" v-model="name" />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="emailAddress" />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password" />
        </div>
        <div class="form-group">
          <label>Password confirmation:</label>
          <input
            type="password"
            class="form-control"
            v-model="passwordConfirmation"
          />
        </div>
        <input type="submit" class="mt-3 btn btn-primary" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      loginPassword: "",
      name: "",
      emailAddress: "",
      password: "",
      passwordConfirmation: "",
      errors1: [],
      errors2: [],
    };
  },
  methods: {
    submit1: function() {
      var params = {
        email: this.email,
        password: this.loginPassword,
      };
      axios
        .post("/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = response.data;
          localStorage.setItem("jwt", response.data);
          this.$router.push("/professors");
        })
        .catch((error) => {
          this.errors1 = ["Invalid email or password."];
          this.email = "";
          this.loginPassword = "";
        });
    },
    submit2: function() {
      var params = {
        name: this.name,
        email: this.emailAddress,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/users", params)
        .then((response) => {
          // this.$router.push("/");
          (this.name = ""), (this.email = "");
          this.password = "";
          this.passwordConfirmation = "";
          this.errors2.push("You are now ready to login");
        })
        .catch((error) => {
          this.errors2 = error.response.data.errors;
        });
    },
  },
};
</script>
