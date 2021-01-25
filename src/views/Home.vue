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
      <h3>
        Rating:
        {{ avgReview(professor) }}
      </h3>
      <button v-on:click="createReviewModal()">Create Review</button>
      <button v-on:click="professor.visible = !professor.visible">
        {{ professor.name }}
      </button>
      <div class="hidden" v-show="professor.visible">
        <p v-for="review in professor.reviews">
          Rating: {{ review.rating }} <br />
          Review: {{ review.text }}
        </p>
      </div>
    </div>

    <dialog id="review-form">
      <form method="dialog">
        <select v-model="newProfessorID">
          <option selected value="">Professor Name</option>
          <option :value="professor.id" v-for="professor in professors">
            {{ professor.name }}
          </option>
        </select>
        <!-- <p>
          Professor id:
          <input
            type="number"
            min="1"
            :max="professors.length"
            v-model="newProfessorID"
          />
        </p> -->
        <p>
          Rate your professor (1-10):
          <input type="number" max="10" min="1" v-model="newProfessorRating" />
        </p>
        <textarea v-model="newProfessorText" rows="8" cols="50"> </textarea>
        <br />
        <button v-on:click="createReview()">
          Create Review
        </button>
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
        this.reviews.visible = true;
        return this.reviews;
      });
    },
    createReviewModal: function() {
      document.querySelector("#review-form").showModal();
    },
    createReview: function() {
      var params = {
        professor_id: this.newProfessorID,
        rating: this.newProfessorRating,
        text: this.newProfessorText,
      };
      if (
        this.newProfessorRating >= 1 &&
        this.newProfessorRating <= 10 &&
        this.newProfessorID >= 1 &&
        this.newProfessorID <= this.professors.length
      ) {
        axios.post("/reviews", params).then((response) => {
          console.log("review create", response);
          this.reviews.push(response.data);
          this.newProfessorID = "";
          this.newProfessorRating = "";
          this.newProfessorText = "";
        });
      }
    },
    avgReview: function(professor) {
      return (
        professor.reviews.map((x) => x.rating).reduce((a, b) => a + b) /
        professor.reviews.length
      ).toFixed(1);
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
