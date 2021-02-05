<template>
  <div class="home">
    <!-- <h1>All Users:</h1> -->
    <div v-for="user in users">
      <!-- <h2>{{ user.email }}</h2> -->
      <!-- <img v-bind:src="photo.url" v-bind:alt="photo.name" />
      <p>Width: {{ photo.width }}</p>
      <p>Height: {{ photo.height }}</p> -->
    </div>

    <div class="container-fluid bg-info p-3 mb-3">
      <h1>Rate My Professor</h1>
    </div>

    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div v-for="professor in professors">
        <div class="col">
          <div class="card h-100 border-primary">
            <div class="card-header">{{ professor.name }}</div>
            <div class="card-body">
              <div>{{ professor.school }}</div>
              <div>{{ professor.department }}</div>
              <div>{{ professor.email }}</div>
              <br />
              <div>
                <h6 class="text-success">{{ avgReview(professor) }}</h6>

                <button
                  class="btn btn-primary me-2"
                  v-on:click="createReviewModal(professor)"
                >
                  Create Review
                </button>

                <button
                  class="btn btn-primary"
                  v-if="professor.reviews.length > 0"
                  v-on:click="showReviewsModal(professor)"
                >
                  Reviews
                </button>

                <!-- <button v-on:click="professor.visible = !professor.visible">
                  Reviews
                </button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <div class="card-body">
            <button v-on:click="createProfessorModal()">
              Add Professor
            </button>
          </div>
        </div>
      </div>
    </div>

    <ProfessorReviewsModal :reviews="professorReviews" />

    <NewProfessorModal :handleSubmit="createProfessor" />

    <!-- <dialog id="review-index">
      <form method="dialog">
        <h4>Reviews</h4>
        <div v-for="review in professorReviews">
          <p>
            Rating: {{ review.rating }} <br />
            {{ review.text }}
          </p>
        </div>
        <button>Close</button>
      </form>
    </dialog> -->

    <dialog id="review-form">
      <form method="dialog">
        <h2>{{ professorName }}</h2>
        <p>
          <!-- Your name:
          <input type="" v-model="name" /> <br /> -->
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
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import NewProfessorModal from "../components/NewProfessorModal";
import ProfessorReviewsModal from "../components/ProfessorReviewsModal";

export default {
  data: function() {
    return {
      professors: [],
      users: [],
      reviews: [],
      professorName: "",
      newProfessorID: "",
      newProfessorRating: "",
      newProfessorText: "",
      professorReviews: "",
    };
  },
  components: {
    NewProfessorModal,
    ProfessorReviewsModal,
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
    createReviewModal: function(professor) {
      document.querySelector("#review-form").showModal();
      this.newProfessorID = professor.id;
      this.professorName = professor.name;
    },
    createReview: function() {
      var params = {
        professor_id: this.newProfessorID,
        rating: this.newProfessorRating,
        text: this.newProfessorText,
      };
      if (this.newProfessorRating >= 1 && this.newProfessorRating <= 10) {
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
      if (professor.reviews.length > 0) {
        return (
          "Rating: " +
          (
            professor.reviews.map((x) => x.rating).reduce((a, b) => a + b) /
            professor.reviews.length
          ).toFixed(1)
        );
      }
      return "Be the first to submit a review.";
    },
    showReviewsModal: function(professor) {
      document.querySelector("#review-index").showModal();
      this.professorReviews = professor.reviews;
    },
    createProfessorModal: function() {
      document.querySelector("#professor-form").showModal();
    },
    createProfessor: function(params) {
      axios.post("/professors", params).then((response) => {
        console.log("professor create", response);
        this.professors.push(response.data);
      });
    },
  },
};
</script>
