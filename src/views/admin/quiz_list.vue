<template>
 <v-container>
   <v-card>
    <v-container class="pa-1">
      <v-row class="mt-1" dense>
        <v-alert
          class="mt-3 ml-2 mr-2"
          border="left"
          colored-border
          color="primary"
          elevation="2"
        >

           <v-btn
            class="ma-2"
            tile
            outlined
            color="#6D8764"
            @click="onClickMenu('/admin_home')"
          >
             <v-icon left>mdi-shield-account</v-icon> Admin
          </v-btn>

          <v-btn
            class="ma-2"
            tile
            outlined
            color="primary"
            @click="onClickMenu('/quiz_add')"
          >
            <v-icon left>mdi-folder-multiple-plus-outline</v-icon> Add Quiz
          </v-btn>

        </v-alert>
      </v-row>
    </v-container>

    <v-container> 
        <v-card>
        <v-data-table :search="search" :headers="headers" :items="itemsWithIndex">
        <!-- table top section -->
        <template v-slot:top>
          <v-toolbar-title><v-icon> mdi-format-list-checkbox </v-icon> Quiz List</v-toolbar-title>
          <v-toolbar flat color="white">
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            >
            </v-text-field>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <!-- table tr section -->
            <template v-slot:item="{ item }">
              <tr class="mb-2">
                <td>{{ item.index + 1}}</td>
                <td>{{ item.quiz_name }}</td>
                <td>{{ item.quiz_type }}</td>
                <td>{{ item.quiz_time }}</td>
                <td>

            <v-btn color="info" class="mr-1"  @click="onClickReviewTest(item._id)" fab x-small>
              <v-icon>mdi-view-day-outline</v-icon>
            </v-btn>
            
            <v-btn color="warning" class="mr-1"  @click="onClickEditQuiz(item._id)" fab  x-small>
              <v-icon>mdi-playlist-edit</v-icon>
            </v-btn>

            <v-btn color="error" class="mr-1" @click="dialog_messenger.status = true,qq_id=item._id" fab x-small>
              <v-icon>mdi-delete</v-icon>
            </v-btn>

                </td>
              </tr>
            </template>
      </v-data-table>
      </v-card>
    </v-container>

    <v-dialog v-model="dialog_messenger.status" persistent max-width="480">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          {{ dialog_messenger.title }}
          <v-icon color="warning" class="mdi mdi-36px ml-2">
            mdi-alert-circle-outline
          </v-icon>
        </v-card-title>

        <v-card-text class="mt-3 pd-0">
          <h2 class="mb-3">{{ dialog_messenger.text }}</h2>
          <h3>
            <p><span v-html="dialog_messenger.sub_text"></span></p>
          </h3>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error"
            @click="dialog_messenger.status = false"
          >
            close
          </v-btn>

          <v-btn
            class="primary"
            light
            text
            @click="onClickRemoveQuiz(qq_id)"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
  
  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  async mounted() {
    const data = await api.getAllQuizlist();
    this.item_quiz = data;
  },
  data: () => ({
    qq_id:"",
    headers: [
      { text: "Index", value: "index" },
      { text: "Quiz Name", value: "quiz_name" },
      { text: "Quiz Type", value: "quiz_type" },
      { text: "Quiz Time", value: "quiz_time" },
      { text: "Action", value: "" },
    ],
    item_quiz: [],
    search: "",
    dialog_review_test:false,
    dialog_messenger: {
      status: false,
      title: "Message",
      text: "Are you sure delete this quiz ?",
      sub_text: "",
      router: "",
    },
  }),
  methods: {
    onClickMenu(link) {
      this.$router.push(link).catch((err) => {});
    },
    onClickReviewTest(quiz_id){
      this.$router.push({ name: 'quiz_show', params: {quiz_id:quiz_id}})
    },
    onClickEditQuiz(quiz_id){
      this.$router.push({ name: 'quiz_edit', params: {quiz_id:quiz_id}})
    },
    async onClickRemoveQuiz(quiz_id){
      const data = await api.removeQuiz({quiz_id})
      if(data.result === true ){
        this.dialog_messenger.status  =  false 
        const data = await api.getAllQuizlist();
        this.item_quiz = data;
      }
    }///remove quiz
  },
  computed: {
    itemsWithIndex() {
      return this.item_quiz.map(
        (items, index) => ({
          ...items,
          index: index
        }))
    }
  }
};
</script>
