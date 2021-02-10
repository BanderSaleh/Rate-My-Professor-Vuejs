<template>
  <dialog id="review-index">
    <form method="dialog">
      <h4>Reviews</h4>
      <div v-for="review in reviews">
        <p>
          Rating: {{ review.rating }} <br />
          {{ review.text }}
        </p>
      </div>
      <button class="btn btn-outline-primary">Close</button>
    </form>
  </dialog>
</template>

<script>
export default {
  props: ["reviews"],
};
</script>
