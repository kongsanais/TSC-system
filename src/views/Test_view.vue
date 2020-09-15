<template>
  <v-container>
    <v-btn @click="addNewTodo()">Add</v-btn>
    {{todos}}
    <ul>
      <li v-for="(item, index) in todos" :key="index">
          <v-text-field
            v-model="item[index]"
            label="First Name"
            outlined
            shaped
          ></v-text-field>
        <v-btn @click="deleteItem(item, index)">Delete</v-btn >
      </li>
    </ul>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newTodoText:"",
      todos: [],
    };
  },
  methods: {
    addNewTodo: function () {
      this.todos.push({
        // question: this.newTodoText
      })
      this.newTodoText = ''
    },
     deleteItem: function (item, index) {
        this.$delete(this.todos, index)
    }
  }
};
</script>