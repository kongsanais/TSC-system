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
            @click="onClickMenu('/')"
          >
            <v-icon left>mdi-pencil</v-icon> Examination
          </v-btn>
        </v-alert>
      </v-row>
    </v-container>

    <v-container>
      <!-- {{ quiz }}
      {{ question_array }} -->
      <v-row>
      <v-progress-linear
      color="black darken-1"
      rounded
      value="0"
    ></v-progress-linear>
        <v-col class="d-flex" xl="12" lg="12" md="12" sm="12" cols="12">
            <b>Quiz Add</b>
        </v-col>
        <v-col class="d-flex" xl="6" lg="6" md="6" sm="12" cols="12">
          <v-text-field v-model="quiz.qname" label="Quiz Name" clearable>
          </v-text-field>
        </v-col>
        <v-col class="d-flex" xl="6" lg="6" md="6" sm="12" cols="12">
          <v-select
            v-model="quiz.qtype"
            :items="['English', 'Specific']"
            menu-props="auto"
            label="Select Quiz Type"
            hide-details
            prepend-icon="mdi-format-list-bulleted-type"
            single-line
          ></v-select>
        </v-col>
        <v-col class="d-flex" xl="3" lg="3" md="3" sm="12" cols="12">
          <v-text-field
            v-model="quiz.qtime"
            prepend-icon="mdi-clock-time-ten-outline"
            label="Time/Minute"
            type="text"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>

    <v-progress-linear
      color="black darken-2"
      rounded
      value="0"
    ></v-progress-linear>
      </v-row>

      <v-row>
        <!-- <v-btn @click="addDataOK">click</v-btn> -->
        <v-col class="d-flex" xl="12" lg="12" md="12" sm="12" cols="12">
            <b>Question Add</b>
        </v-col>
        
        <v-col class="d-flex" xl="6" lg="6" md="6" sm="6" cols="12" >
        <v-textarea
          outlined
          name="input-7-4"
          label="Outlined textarea"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        ></v-textarea> 
        </v-col>

        <v-col class="d-flex" xl="6" lg="6" md="6" sm="6" cols="12" >
          <v-btn @click="addDataOK">click</v-btn>
        </v-col>

      </v-row>
      

       <v-row>
        <v-col class="d-flex" xl="6" lg="6" md="6" sm="6" cols="12" >
        </v-col>
      </v-row>

    <v-progress-linear
      color="black darken-2"
      rounded
      value="0"
    >
    </v-progress-linear>
    <!-- <v-row>
        <v-col class="d-flex" xl="3" lg="3" md="3" sm="12" cols="12">
          <v-alert border="top" color="blue lighten-2" dark>
            Question Add
          </v-alert>
        </v-col> 
    </v-row> -->

    </v-container>
  </v-card>
</template>

<script>
import api from "@/services/api";

export default {
  async mounted() {},
  data: () => ({
    quiz: {
      qname: null,
      qtype: null,
      qtime: null,
    },
    question_array: [],
    inputs: [],
  }),
  methods: {
    addDataOK() {
      var data = {
        text_data: "",
        question: [],
      };

      this.question_array.push(data);
    },
    onClickMenu(link) {
      this.$router.push(link).catch((err) => {});
    },
    addRow() {
      this.inputs.push({
        one: "",
        two: "",
      });
    },
    deleteRow(index) {
      this.inputs.splice(index, 1);
    },
  },
};
</script>
