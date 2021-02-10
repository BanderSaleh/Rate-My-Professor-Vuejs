<template>
  <div class="home">
    <h1>All Users:</h1>
    <div v-for="user in users">
      <h2>{{ user.email }}</h2>
      <!-- <img v-bind:src="photo.url" v-bind:alt="photo.name" /> -->
      <!-- <p>Width: {{ photo.width }}</p>
      <p>Height: {{ photo.height }}</p> -->
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      users: [],
    };
  },

  created: function() {
    this.indexProfessors();
    this.indexUsers();
    this.indexReviews();
  },
  methods: {
    indexProfessors: function() {
      axios.get("/professors/").then((response) => {
        console.log("professors index", response);
        this.professors = response.data;
      });
    },
    indexUsers: function() {
      axios.get("/Users/").then((response) => {
        console.log("users index", response);
        this.users = response.data;
      });
    },
    indexReviews: function() {
      axios.get("/reviews/").then((response) => {
        console.log("reviews index", response);
        this.reviews = response.data;
        this.reviews.visible = true;
        return this.reviews;
      });
    },
  },
};
</script>
