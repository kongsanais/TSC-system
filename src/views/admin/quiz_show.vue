<template>
  <v-container>
   <!-- {{start_quiz}} -->
   <v-card class="ma-1" v-if="start_quiz">
    <v-container color="primary">
     <v-row>
      <v-col>
        <v-card max-width="450" class="ma-3">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">
              <b>quiz type ({{ title_quiz.quiz_type }}) </b>
            </div>
            <v-list-item-title class="headline mb-1">
              {{ title_quiz.quiz_name }}</v-list-item-title
            >
            <v-list-item-subtitle
              ><b>{{ title_quiz.quiz_time }} Minute</b></v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-avatar src="" tile size="140" color="grey">
            <v-img 
            src="https://www.flaticon.com/svg/static/icons/svg/2367/2367217.svg"
            outline>
            </v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn color="primary" @click="start_quiz_changed()" >START</v-btn>
          <!-- <v-btn snall color="" text>BACK</v-btn> -->
        </v-card-actions>
      </v-card>
        </v-col>
     </v-row>
      </v-container>
   </v-card>


   <v-card v-if="!start_quiz">
   <v-container>
      <!-- <v-btn class="is-selected">click</v-btn> -->
    <v-card class="ma-3" >
      <!-- {{quiz.questions.length}}
         {{questionIndex}}
         {{quiz.questions.length}} -->
      <!-- Total score: {{ score() }} / {{ quiz.questions.length }} -->

      <v-alert v-if="questionIndex == quiz.questions.length " >Complete Quiz</v-alert>

      <v-row></v-row>
      <div
        v-if="questionIndex < quiz.questions.length"
        v-bind:key="questionIndex"
      >
        <header>
          <!--progress-->
          <div>
            <h1 class="title is-6">
              Quiz ({{ questionIndex }} / {{ quiz.questions.length }})
            </h1>
            
            <progress
              class="progress is-info is-small"
              :value="(questionIndex / quiz.questions.length) * 100"
              max="100"
              >{{ (questionIndex / quiz.questions.length) * 100 }}%</progress
            >
            <!-- <p>{{(questionIndex/quiz.questions.length)*100}}% complete</p> -->
          </div>
          <!--/progress-->
        </header>
        <!-- questionTitle -->
        <v-alert class="ma-1" border="right" color="blue-grey" dark>
          <h2 class="titleContainer title">
            {{ questionIndex + 1 }})  {{ quiz.questions[questionIndex].question }}
          </h2>
        </v-alert>
        <!-- {{quiz.questions[0].ans[0]}} -->

        <div class="optionContainer">
          <div
            class="ma-3"
            v-for="(ans, index) in quiz.questions[questionIndex].ans"
            @click="selectOption(index)"
            :key="index"
          >  

            <v-btn  :class="{'green': userResponses[questionIndex] == index }"   small>{{ index | charIndex }}. {{ ans.ans }} </v-btn>
            <!-- {{userResponses[questionIndex] == index }} -->
            <br>
          </div>
        </div>

        <!-- quizOptions -->
        <!-- <div class="optionContainer">
					<div class="option" v-for="(response, index) in quiz.questions[questionIndex].responses"  :class="{ 'is-selected': userResponses[questionIndex] == index}" :key="index">
                  <v-btn  :class="{ 'is-selected': userResponses[questionIndex] == index}" class="ma-1" @click="selectOption(index)" >{{ index | charIndex }} ) {{ question.text }}</v-btn>
					</div>
				</div> -->

        <v-btn class="ma-2" v-on:click="prev()" :disabled="questionIndex < 1" small>
          Back</v-btn
        >

        <v-btn
          class="ma-1"
          color="primary"
          v-on:click="next()"
          :disabled="userResponses[questionIndex] == null"
           small>
          NEXT
        </v-btn>
      </div>
    </v-card>
      </v-container>
    </v-card>


  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  async mounted() {
    var temp_id = this.quiz_id; 
    if (temp_id  === undefined || temp_id == null) {
      let q_id = localStorage.getItem("quiz_id");
      this.quizdata = await api.getquizShow({ q_id });
    } else {
      localStorage.setItem("quiz_id", temp_id);
      let q_id = localStorage.getItem("quiz_id");
      this.quizdata = await api.getquizShow({ q_id });
    }

    console.log(this.quizdata)

    this.title_quiz.quiz_name = this.quizdata.quiz_name;
    this.title_quiz.quiz_type = this.quizdata.quiz_type;
    this.title_quiz.quiz_time = this.quizdata.quiz_time;

    (this.quiz = {
      questions: this.quizdata.quiz_question,
    }),
   (this.userResponses = Array(this.quiz.questions.length).fill(null));
  },
  props: ["quiz_id"],
  data() {
    return {
      title_quiz: {
        quiz_name: "",
        quiz_type: "",
        quiz_time: "",
      },
      quiz: null,
      questionIndex: 0,
      userResponses: "",
      isActive: false,
      quizdata: null,
      start_quiz: true
    };
  },
  filters: {
    charIndex: function(i) {
      return String.fromCharCode(97 + i);
    },
  },
  methods: {
    start_quiz_changed: function(){
       alert("test")
       this.start_quiz = false; 
    },
    restart: function() {
      this.questionIndex = 0;
      this.userResponses = Array(this.quiz.questions.length).fill(null);
    },
    selectOption: function(index) {
      this.$set(this.userResponses, this.questionIndex, index);
      //console.log(this.userResponses);
    },
    next: function() {
      if (this.questionIndex < this.quiz.questions.length) this.questionIndex++;
    },
    prev: function() {
      if (this.quiz.questions.length > 0) this.questionIndex--;
    },
    score: function() {
      var score = 0;
      for (let i = 0; i < this.userResponses.length; i++) {
        if (
          typeof this.quiz.questions[i].ans[this.userResponses[i]] !==
            "undefined" &&
          this.quiz.questions[i].ans[this.userResponses[i]].correct
        ) {
          score = score + 1;
        }
      }
      return score;
      //return this.userResponses.filter(function(val) { return val }).length;
    },
  },
};
</script>

<style>
.is-selected {
  color: #4caf50;
}
</style>
