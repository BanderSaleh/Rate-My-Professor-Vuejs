<template>
  <dialog id="professor-form">
    <form method="dialog">
      <h4>Create New Professor:</h4>
      <div>
        <p>Name: <input type="text" v-model="newName" /></p>

        <p>Email: <input type="text" v-model="newEmail" /></p>
        <p>Title: <input type="text" v-model="newTitle" /></p>
        <p>School: <input type="text" v-model="newSchool" /></p>
        <p>Department: <input type="text" v-model="newDepartment" /></p>
      </div>
      <button class="btn btn-outline-primary me-2" v-on:click="handleClick">
        Create Professor
      </button>
      <button class="btn btn-outline-primary">Close</button>
    </form>
  </dialog>
</template>

<script>
export default {
  data() {
    return {
      newName: "",
      newEmail: "",
      newTitle: "",
      newSchool: "",
      newDepartment: "",
    };
  },
  props: ["handleSubmit"],
  methods: {
    handleClick() {
      const params = {
        name: this.newName,
        email: this.newEmail,
        title: this.newTitle,
        school: this.newSchool,
        department: this.newDepartment,
      };
      this.handleSubmit(params);
      this.newName = "";
      this.newEmail = "";
      this.newTitle = "";
      this.newSchool = "";
      this.newDepartment = "";
    },
  },
};
</script>
