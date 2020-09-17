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

         <v-btn
            class="ma-2"
            tile
            outlined
            color="#232F3E"
            @click="onClickMenu('/')"
          >
            <v-icon left>mdi-pencil</v-icon> Add Quiz
          </v-btn>
        </v-alert>
      </v-row>
    </v-container>

    <v-container>
      <v-form @submit.prevent="saveQuiz" ref="form">
      <!-- {{ quiz }}
      {{ question_array }} -->
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
          <b class="mt-3">Question List </b>
  </v-col>
</v-row>

        
            <v-data-table
            max-width="100%"
            :headers="headers"
            class="elevation-2"
          >
          </v-data-table>

        

      <v-progress-linear color="black darken-2" rounded value="0">
      </v-progress-linear>
      <!-- <v-row>
        <v-col class="d-flex" xl="3" lg="3" md="3" sm="12" cols="12">
          <v-alert border="top" color="blue lighten-2" dark>
            Question Add
          </v-alert>
        </v-col> 
    </v-row> -->
    </v-form>
    </v-container>
  </v-card>
</template>

<script>
import api from "@/services/api";

export default {
  async mounted() {},
  data: () => ({
    quiz: {
      quiz_name: null,
      quiz_type: null,
      quiz_time: null,
    },
    question_array: [],
    ans_array: [],
    defaultFunds: [
      {
        img: null,
        ans: null,
        correct: "",
      },
    ],
    question_insert:"",
    newEntries: [{}],
    headers: [
          { text: 'Quiz', value: '' },
          { text: 'Ans', value: '' },
    ],
    dialog: false,
    imageURL: null,
    image:null,
    array_img:[]
  }),
  methods: {
    onFileSelected(event) {

      const reader = new FileReader();

      reader.onload = event => {
        this.imageURL = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.image = event.target.files[0];

    },
    addAns: function() {
      this.newEntries.push({});
      this.defaultFunds.push({ question: null, correct: "" });
    },    
    submitQues: function() {
      var ansArray = []    
      var tarndata;
      
      for(var i = 0 ; i < this.newEntries.length ; i++)
      {
        tarndata = { ans:this.newEntries[i].ans , correct:this.newEntries[i].correct }
        console.log(this.newEntries[i].ans)
        console.log(this.newEntries[i].correct)
        ansArray.push(tarndata)
      }

      var json_data = {question : this.question_insert, ans:ansArray}
      this.question_array.push(json_data)
      this.array_img.push(this.image)
      
        
    },
     async saveQuiz(){

        let formData = new FormData();
        const { quiz_name, quiz_type, quiz_time } = this.quiz;
        formData.append("quiz_name", quiz_name);
        formData.append("quiz_type", quiz_type);
        formData.append("quiz_time", quiz_time);
        formData.append("ques",JSON.stringify(this.question_array)) 
        
        for (const i of Object.keys(this.array_img)) {
            formData.append('files', this.array_img[i])
        }
        //for single//
        // formData.append('file',this.array_img);
        
        await api.getReportAllAppbyDate(formData);
        // var ques_ans = this.question_array;
        // const data = await api.getReportAllAppbyDate(ques_ans)
    },
    onClickMenu(link) {
      this.$router.push(link).catch((err) => {});
    },
    deleteRow(index) {
      this.defaultFunds.splice(index, 1);
      this.newEntries.splice(index, 1);
    },
  },
};
</script>
