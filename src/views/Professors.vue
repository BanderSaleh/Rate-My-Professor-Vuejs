<template>
  <div class="professors">
    <!-- <div class="container-fluid bg-info p-3 mb-3">
      <h1>Rate My Professor</h1>
    </div> -->

    <div class="row row-cols-1 row-cols-md-4 g-4">
      <!-- <div class="col">
        <div class="card h-100">
          <button
            class="card-body border-primary"
            v-on:click="createProfessorModal()"
          >
            <h1>Add Professor</h1>
          </button>
        </div>
      </div> -->
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
                <h6 class="text-success">
                  {{ avgReview(professor) }}
                </h6>

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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <button
            class="card-body border-primary"
            v-on:click="createProfessorModal()"
          >
            <h1>Add Professor</h1>
          </button>
        </div>
      </div>
    </div>

    <CreateReviewModal
      :id="newProfessorID"
      :name="professorName"
      :submitReview="createReview"
    />

    <ProfessorReviewsModal :reviews="professorReviews" />

    <NewProfessorModal :handleSubmit="createProfessor" />
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import NewProfessorModal from "../components/NewProfessorModal";
import ProfessorReviewsModal from "../components/ProfessorReviewsModal";
import CreateReviewModal from "../components/CreateReviewModal";

export default {
  data: function() {
    return {
      professors: [],
      // users: [],
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
    CreateReviewModal,
  },
  created: function() {
    this.indexProfessors();
    // this.indexUsers();
    this.indexReviews();
  },
  methods: {
    indexProfessors: function() {
      axios.get("/professors/").then((response) => {
        console.log("professors index", response);
        this.professors = response.data;
      });
    },
    // indexUsers: function() {
    //   axios.get("/Users/").then((response) => {
    //     console.log("users index", response);
    //     this.users = response.data;
    //   });
    // },
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
    createReview: function(params) {
      if (params.rating >= 1 && params.rating <= 10) {
        axios.post("/reviews", params).then((response) => {
          console.log("review create", response);
          this.professors.forEach((professor) => {
            if (professor.id === params.professor_id) {
              professor.reviews.push(response.data);
            }
          });
        });
      }
    },
    avgReview: function(professor) {
      if (professor.reviews.length > 0) {
        return `Rating:
          ${(
            professor.reviews.map((x) => x.rating).reduce((a, b) => a + b) /
            professor.reviews.length
          ).toFixed(1)} \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 ${
          professor.reviews.length
        } Reviews`;
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
