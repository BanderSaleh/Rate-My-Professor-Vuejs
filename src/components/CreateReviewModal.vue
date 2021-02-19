<template>
  <dialog id="review-form">
    <form method="dialog">
      <h4>{{ name }}</h4>
      <p>
        Rate your professor (1-10):
        <input type="number" max="10" min="1" v-model="newProfessorRating" />
      </p>
      <textarea v-model="newProfessorText" rows="8" cols="50"> </textarea>
      <br />
      <button class="btn btn-outline-primary me-2" v-on:click="recordReview()">
        Create Review
      </button>
      <button class="btn btn-outline-primary">Close</button>
    </form>
  </dialog>
</template>

<script>
export default {
  data() {
    return {
      newProfessorRating: "",
      newProfessorText: "",
    };
  },
  props: ["id", "name", "submitReview"],
  methods: {
    recordReview() {
      const params = {
        professor_id: this.id,
        rating: this.newProfessorRating,
        text: this.newProfessorText,
      };

      this.submitReview(params);
      // eslint-disable-next-line vue/no-mutating-props
      this.newProfessorRating = "";
      this.newProfessorText = "";
    },
  },
};
</script>
