<template>
  <dialog id="professor-form">
    <form method="dialog">
      <h1>Create New Professor:</h1>
      <div>
        name: <input type="text" v-model="newName" /> email:
        <input type="text" v-model="newEmail" /> title:
        <input type="text" v-model="newTitle" /> school:
        <input type="text" v-model="newSchool" /> department:
        <input type="text" v-model="newDepartment" />
        <button v-on:click="handleClick">Create Professor</button>
      </div>
      <button>Close</button>
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
