<template>
  <v-card max-width="1000" class="mx-auto ma-7">
    <v-container class="pa-1">
      <v-row class="mt-1" dense>
        <v-alert
          class="mt-3 ml-2 mr-2"
          border="left"
          colored-border
          color="primary"
          elevation="2"
        >
          <!-- <v-btn class="ma-2" tile outlined color="info" @click="onClickMenu('/')">
      <v-icon left>mdi-pencil</v-icon> Department
    </v-btn> -->

          <v-btn
            class="ma-2"
            tile
            outlined
            color="#232F3E"
            @click="onClickMenu('/admin_home')"
          >
            <v-icon left>mdi-pencil</v-icon> Admin
          </v-btn>

          <v-btn
            class="ma-2"
            tile
            outlined
            color="#232F3E"
            @click="onClickMenu('/quiz_add')"
          >
            <v-icon left>mdi-pencil</v-icon> Add Quiz
          </v-btn>
        </v-alert>
      </v-row>
    </v-container>

    <v-container>
      <v-form @submit.prevent="saveQuiz" ref="form">
        <v-card>
          <v-card-title>
            Quiz List
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :search="search" :headers="headers" :items="item_quiz">
            <template v-slot:item="{ item }">
              <tr class="mb-2">
                <td>{{ item.quiz_name }}</td>
                <td>{{ item.quiz_type }}</td>
                <td>{{ item.quiz_time }}</td>
                <td>

            <v-btn color="info" class="mr-1"  @click="onClickReviewTest(item._id)" fab x-small>
              <v-icon>mdi-view-day-outline</v-icon>
            </v-btn>
            
            <v-btn color="warning" class="mr-1" fab x-small>
              <v-icon>mdi-playlist-edit</v-icon>
            </v-btn>

            <v-btn color="error" class="mr-1" fab x-small>
              <v-icon>mdi-delete</v-icon>
            </v-btn>

                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <v-progress-linear color="black darken-2" rounded value="0">
        </v-progress-linear>
      </v-form>
    <v-dialog v-model="dialog_review_test" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Review Quiz</span>
        </v-card-title>
        <v-card-text>
          <v-container>
              <v-col cols="12" sm="6" md="4">
                 test
              </v-col>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    </v-container>
  </v-card>
</template>

<script>
import api from "@/services/api";

export default {
  async mounted() {
    const data = await api.getAllQuizlist();
    console.log(data);
    this.item_quiz = data;
  },
  data: () => ({
    headers: [
      { text: "Quiz Name", value: "quiz_name" },
      { text: "Quiz Type", value: "quiz_type" },
      { text: "Quiz Time", value: "quiz_time" },
      { text: "Action", value: "" },
    ],
    item_quiz: [],
    search: "",
    dialog_review_test:false
  }),
  methods: {
    onClickMenu(link) {
      this.$router.push(link).catch((err) => {});
    },
    onClickReviewTest(quiz_id){
      alert(quiz_id)
      this.dialog_review_test = true
    }
  },
};
</script>
