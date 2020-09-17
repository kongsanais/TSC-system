<template>
  <v-container>
    <v-btn @click="addNewTodo()">Add</v-btn>
    {{todos}}
    <!-- <ul>
      <li v-for="(item, index) in todos" :key="index">
          <v-text-field
            v-model="item[index]"
            label="First Name"
            outlined
            shaped
          ></v-text-field>
        <v-btn @click="deleteItem(item, index)">Delete</v-btn >
      </li>
    </ul> -->
    <b>----------------------------------------------------</b>
    <div id="app">
      newEntries: {{ newEntries }}
      data : {{defaultFunds}}
      <v-btn @click="newQ()">add</v-btn >
      <table>
          <tr v-for="(fund, index) in defaultFunds" :key="index">
            <td>{{ fund.name }}</td>
            <td>
            <v-text-field v-model="newEntries[index].question" name="entryFund" type="text"  />
            </td>
            <td>
            <v-checkbox v-model="newEntries[index].correct"></v-checkbox>
            </td>
          </tr>
      </table>
      </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newTodoText:"",
      todos: [],
      defaultFunds: [
      {
        question: null,
        correct: ''
      }
    ],
    newEntries: [{}]
    };
  },
  methods: {    
    newQ: function () {
      this.newEntries.push({})
      this.defaultFunds.push({question: null,correct:''})
    },
    addNewTodo: function () {
      this.todos.push({question: null,correct:''})
      this.todos.push({})
      this.newTodoText = ''
    },
     deleteItem: function (item, index) {
        this.$delete(this.todos, index)
    }
  }
};
</script>