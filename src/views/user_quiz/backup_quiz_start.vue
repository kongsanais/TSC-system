<template>
  <v-container>
   <!-- {{start_quiz}} -->
   {{title_quiz}}
   <br>
   {{quiz}}

   <br>
  
   <!-- <v-card class="ma-1" v-if="start_quiz">
    
    <v-container color="primary">
     <v-row>
      <v-col xl="4" lg="6" md="8" sm="12">
        <v-card class="ma-3">
        <v-list-item three-line>
          <v-row>
            <v-col>
                <div class="ma-3" >
                  <h2><b>{{ title_quiz.quiz_name }}</b></h2>
                </div>

                <div class="ma-3">
                   <h2>{{ title_quiz.quiz_time }} Minute</h2>
                </div>

                <div class="ma-3">
                  <h3>Type( {{ title_quiz.quiz_type }} )</h3>
                </div>
             </v-col>
            <v-col>
              <v-list-item-avatar src="" tile size="150" color="grey">
                  <v-img 
                  src="https://www.flaticon.com/svg/static/icons/svg/2367/2367217.svg"
                  style="border-style: groove;"
                  outline>
                  </v-img>
           </v-list-item-avatar>
         </v-col>
       </v-row>
    </v-list-item>

        <v-card-actions>
          <v-btn color="primary" @click="start_quiz_changed()" >START</v-btn>

        </v-card-actions>
      </v-card>
        </v-col>
     </v-row>
      </v-container>
   </v-card> -->


   <v-card>
     <!-- -----------------
     ans : {{userResponses}} -->
   <v-container>
      <!-- <v-btn class="is-selected">click</v-btn> -->
    <v-card class="ma-3" >
      <!-- {{quiz.questions.length}}
         {{questionIndex}}
         {{quiz.questions.length}} -->
     

      <v-alert v-if="questionIndex == quiz.questions.length " >
         
         <div  style="visibility: hidden;">Total score: {{score()}} / {{ quiz.questions.length }}</div>
                      
        <v-alert type="success">
          Complete Quiz
        </v-alert>

      <v-btn class="ma-2" color="warning" v-on:click="review()" :disabled="questionIndex < 1" >Review Quiz</v-btn>
      <v-btn class="ma-2" color="primary" v-on:click="done_quiz()" >Finish Quiz</v-btn>

      </v-alert>
      
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

              <v-img 
                style="border-style: groove;"
                class="ma-1"
                v-if="quiz.questions[questionIndex].img != null"
                :src="quiz.questions[questionIndex].img | quizImgUrl"
                aspect-ratio="1"
                max-width="200"
                max-height="200"
              ></v-img>

        <div class="optionContainer">
           <div
            class="ma-2 font"
            v-for="(ans, index) in quiz.questions[questionIndex].ans"
            @click="selectOption(index)"
            :key="index"
           >  
            <v-btn  :class="{'green': userResponses[questionIndex] == index}"   small>{{ index | charIndex }}. {{ ans.ans }}  </v-btn>
            <!-- <v-icon v-if="ans.correct == true">mdi-check </v-icon> -->
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
      this.main_id  = q_id
      this.quizdata = await api.getquizShow({ q_id });
    } else {
      localStorage.setItem("quiz_id", temp_id);
      let q_id = localStorage.getItem("quiz_id");
      this.main_id  = q_id
      this.quizdata = await api.getquizShow({ q_id });
    }

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
      main_id:"",
      score_data:"",
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
       this.start_quiz = false; 
    },
    restart: function() {
      this.questionIndex = 0;
      this.userResponses = Array(this.quiz.questions.length).fill(null);
    },
    selectOption: function(index) {
      this.$set(this.userResponses, this.questionIndex, index);
    },
    next: function() {
      if (this.questionIndex < this.quiz.questions.length) this.questionIndex++;
    },
    prev: function() {
      if (this.quiz.questions.length > 0) this.questionIndex--;
    },
    review: function() {
      if (this.quiz.questions.length > 0) this.questionIndex = 0;
    },
    async done_quiz () {
      let score = this.score_data
      alert(this.score_data)
      let score_full = this.quiz.questions.length
      let quiz_id = this.main_id
      var result = await api.saveScore({score,score_full,quiz_id})
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
      this.score_data = score 
      alert(this.score_data)
      return score;
      //return this.userResponses.filter(function(val) { return val }).length;
    },
  },
};
</script>

<style scoped>
.font{
  text-transform: none !important;
}
.v-btn{
  text-transform: none !important;
}
</style>
