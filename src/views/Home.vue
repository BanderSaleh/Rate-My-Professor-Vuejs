<template>
  <div class="home">
    <h1>All Users:</h1>
    <div v-for="user in users">
      <h2>{{ user.email }}</h2>
      <!-- <img v-bind:src="photo.url" v-bind:alt="photo.name" />
      <p>Width: {{ photo.width }}</p>
      <p>Height: {{ photo.height }}</p> -->
    </div>

    <h1>All Professors:</h1>
    <div v-for="professor in professors">
      <h2>{{ professor.name }}</h2>
      <!-- <h2>{{ professor }} </h2> -->
    </div>

    <h1>All Reviews:</h1>
    <div v-for="review in reviews">
      <h2>{{ review }}</h2>
    </div>

  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      professors: [],
      users: [],
      reviews: [],
    };
  },
  created: function() {
    this.indexProfessors();
    this.indexUsers();
    this.indexReviews();
  },
  methods: {
    indexProfessors: function() {
      axios.get("/professors/").then(response => {
        console.log("professors index", response);
        this.professors = response.data;
      });
    },
    indexUsers: function() {
      axios.get("/Users/").then(response => {
        console.log("users index", response);
        this.users = response.data;
      });
    },
    indexReviews: function() {
      axios.get("/reviews/").then(response => {
        console.log("reviews index", response);
        this.reviews = response.data;
      });
    },
  },
};
</script>