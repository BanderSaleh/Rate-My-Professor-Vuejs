<template>
  <div class="home">
    <h1>All Professors</h1>
    <div v-for="professor in professors">
      <h2>{{ professor.name }}</h2>
      <!-- <img v-bind:src="photo.url" v-bind:alt="photo.name" />
      <p>Width: {{ photo.width }}</p>
      <p>Height: {{ photo.height }}</p> -->
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
    };
  },
  created: function() {
    this.indexPhotos();
  },
  methods: {
    indexPhotos: function() {
      axios.get("/professors/").then(response => {
        console.log("photos index", response);
        this.professors = response.data;
      });
    },
  },
};
</script>