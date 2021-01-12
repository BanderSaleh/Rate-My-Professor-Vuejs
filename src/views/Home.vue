<template>
  <div class="home">
    <!-- <h1>All Users:</h1> -->
    <div v-for="user in users">
      <!-- <h2>{{ user.email }}</h2> -->
      <!-- <img v-bind:src="photo.url" v-bind:alt="photo.name" />
      <p>Width: {{ photo.width }}</p>
      <p>Height: {{ photo.height }}</p> -->
    </div>

    <h1>All Professors:</h1>
    <div v-for="professor in professors">
      <h2>{{ professor }}</h2>
      <button v-on:click="createReviewModal()">Create Review</button>
    </div>

    <dialog id="review-form">
      <form method="dialog">
        <!-- <p>professor_id: <input type="text" v-model="newProfessorID" /></p> -->
        <p>
          Professor id:
          <input type="text" size="4" v-model="newProfessorID" />
        </p>
        <p>
          Rate your professor (1-10):
          <input type="number" max="10" min="1" v-model="newProfessorRating" />
        </p>
        <textarea v-model="newProfessorText" rows="8" cols="50"> </textarea>
        <br />
        <button v-on:click="createReview()">Create Review</button>
        <button>Close</button>
      </form></dialog
    >

    <h1>Create New Professor:</h1>
    <div>
      name: <input type="text" v-model="newName" /> email:
      <input type="text" v-model="newEmail" /> title:
      <input type="text" v-model="newTitle" /> school:
      <input type="text" v-model="newSchool" /> department:
      <input type="text" v-model="newDepartment" />
      <button v-on:click="createProfessor()">Create Professor</button>
    </div>

    <h1>All Reviews:</h1>
    <div v-for="review in reviews">
      <h2>{{ review }}</h2>
    </div>

    <h1>New Review Form:</h1>
    <div>
      professor_id: <input type="text" v-model="newProfessorID" /> rating:
      <input type="text" v-model="newProfessorRating" /> text:
      <input type="text" v-model="newProfessorText" />
      <button v-on:click="createReview()">Create Review</button>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      professors: [],
      users: [],
      reviews: [],
      newProfessorID: "",
      newProfessorRating: "",
      newProfessorText: "",
      newName: "",
      newEmail: "",
      newTitle: "",
      newSchool: "",
      newDepartment: "",
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
      });
    },
    createReviewModal: function() {
      // console.log(recipe.title);
      // this.currentRecipe = recipe;
      document.querySelector("#review-form").showModal();
    },
    createReview: function() {
      var params = {
        professor_id: this.newProfessorID,
        rating: this.newProfessorRating,
        text: this.newProfessorText,
      };
      axios.post("/reviews", params).then((response) => {
        console.log("review create", response);
        this.reviews.push(response.data);
        this.newProfessorID = "";
        this.newProfessorRating = "";
        this.newProfessorText = "";
      });
    },
    createProfessor: function() {
      var params = {
        name: this.newName,
        email: this.newEmail,
        title: this.newTitle,
        school: this.newSchool,
        department: this.newDepartment,
      };
      axios.post("/professors", params).then((response) => {
        console.log("professor create", response);
        this.professors.push(response.data);
        this.newName = "";
        this.newEmail = "";
        this.newTitle = "";
        this.newSchool = "";
        this.newDepartment = "";
      });
    },
  },
};
</script>
