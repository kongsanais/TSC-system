<template>
  <v-container>
   <!-- {{start_quiz}} -->
   <!-- {{quizdata.quiz_question}} -->
   <br>
   <!-- {{shuffled}} -->
    <v-card class="ma-3" >
     
    <v-alert
      color="primary"
      dark
      icon="mdi-camera-timer"
      border="left"
      prominent
    >
    <!-- My Score : {{score_data}}
    {{userResponses}} -->

       <Counter :time="title_quiz.quiz_time"/>
            <div class="ma-2">
            <h1 class="title is-6" >
              Quiz ({{ questionIndex }} / {{ quiz.questions.length }})
            </h1>
          <v-progress-linear
            striped
            height="10"
            color="lime"
            :value="(questionIndex / quiz.questions.length) * 100"
             max="100"
          ></v-progress-linear>
           </div>
    </v-alert>


      <v-alert v-if="questionIndex == quiz.questions.length " >
        
        <v-alert type="success" max-width="260px">
          Complete Quiz
        </v-alert> 
        
      <v-btn class="ma-2" color="warning" v-on:click="review()" :disabled="questionIndex < 1" >Review Quiz</v-btn>
      <v-btn class="ma-2" color="primary" v-on:click="done_quiz()" >Finish Quiz</v-btn>
      <div  style="visibility: hidden;">Total score: {{score()}} / {{ quiz.questions.length }}</div>  
      </v-alert>
      
      <v-row></v-row>
      <div
        v-if="questionIndex < quiz.questions.length"
        v-bind:key="questionIndex"
      >
        <header>
          <!--progress-->

          <!--/progress-->
        </header>
        <!-- questionTitle -->

        <v-alert class="ma-1" border="right" color="blue-grey" dark>
          <h2 class="titleContainer title">
            {{ questionIndex + 1 }})  {{ quiz.questions[questionIndex].question }}
            <!-- {{quiz}} -->
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
      
        <div v-if="quiz.questions[questionIndex].ans_type == 'Choice'"  class="optionContainer">       
           <div
            class="ma-2 font"
            v-for="(ans, index) in quiz.questions[questionIndex].ans"
            @click="selectOption(index)"
            :key="index"
           >      

        <v-btn  :class="{'green': userResponses[questionIndex].ans_data == index}" small>{{ index | charIndex }}.{{ ans.ans}}</v-btn>
        <!-- <v-icon v-if="ans.correct == true">mdi-check </v-icon> -->
         
          </div>
        </div>

         
        <div  v-if="quiz.questions[questionIndex].ans_type == 'Text'">
              <v-textarea
               @keyup="with_text()"
                v-model="userResponses[questionIndex].ans_data"
                outlined
                name="input-7-4"
                label="Outlined textarea"
              ></v-textarea>
        </div>



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
</template>

<script>
import api from "@/services/api";
import Counter from "@/components/helper/Counter.vue"
export default {
  components: {
    Counter
  },
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

    this.shuffled = this.quizdata.quiz_question
    .map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

    this.quiz = {
      questions: this.quizdata.quiz_question,
    }
    //this.userResponses = Array(this.quiz.questions.length).fill(null);
    
    for(var i = 0 ; i < this.quiz.questions.length;i++){
      this.userResponses.push({ans_data:null})
    }
    

  },
  props: ["quiz_id"],
  data() {
    return {
      data_time_quiz:"",
      shuffled:"",
      main_id:"",
      score_data:"",
      title_quiz: {
        quiz_name: "",
        quiz_type: "",
        quiz_time: "",
      },
      quiz: null,
      questionIndex: 0,
      questionArrayIndex : [],
      userResponses: [],
      isActive: false,
      quizdata: null,
      start_quiz: true,
      ans_text : "",
      temp_text : ""
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
      var  question_id = this.quiz.questions[this.questionIndex]._id
      var  ans_data  =  index
      var  build_data = {question_id,ans_data}
      this.$set(this.userResponses, this.questionIndex, build_data);
    },
    with_text: function() {
      let  question_id = this.quiz.questions[this.questionIndex]._id
      let  ans_data =   this.userResponses[this.questionIndex].ans_data
      var  build_data = {question_id,ans_data}
      this.$set(this.userResponses, this.questionIndex,build_data);
    },
    next: function(){
      if (this.questionIndex < this.quiz.questions.length) this.questionIndex++;
    },
    prev: function(){
      if (this.quiz.questions.length > 0) this.questionIndex--;
    },
    review: function() {
      if (this.quiz.questions.length > 0) this.questionIndex = 0;
    },
    async done_quiz () {
      let score = this.score_data
      let score_full = this.quiz.questions.length
      let quiz_id = this.main_id
      let ans_history  = this.userResponses 
      var result = await api.saveScore({score,score_full,quiz_id,ans_history})
      this.$router.back();
    },
    score: function() {
      var score = 0;
      for (let i = 0; i < this.userResponses.length; i++) {
        if (typeof this.quiz.questions[i].ans[this.userResponses[i].ans_data] !=="undefined" &&
           this.quiz.questions[i].ans[this.userResponses[i].ans_data].correct) 
        {
          score = score + 1;
        }
      }
      this.score_data = score 
      return score;
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
