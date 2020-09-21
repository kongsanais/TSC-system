<template>
 <v-container>
   
    <!--container-->
<section class="container">

	<!--questionBox-->
	<div class="questionBox" id="app">
    
	   <!--qusetionContainer-->
      <v-card>
         <!-- {{quiz.questions.length}}
         {{questionIndex}}
         {{quiz.questions.length}} -->
        <div >
          <!-- Total score: {{ score() }} / {{ quiz.questions.length }} -->
          
          <!-- <v-alert>Complete Quiz</v-alert> -->
          {{title_quiz.quiz_name}}
          {{title_quiz.quiz_type}}
          {{title_quiz.quiz_time}}
        </div>

			<div v-if="questionIndex<quiz.questions.length" v-bind:key="questionIndex">
 
				<header>
					<!--progress-->
					<div>
            <h1 class="title is-6">Quiz ({{questionIndex}} / {{quiz.questions.length}})</h1>

	  <progress class="progress is-info is-small" :value="(questionIndex/quiz.questions.length)*100" 
      max="100">{{(questionIndex/quiz.questions.length)*100}}%</progress>
						<!-- <p>{{(questionIndex/quiz.questions.length)*100}}% complete</p> -->
					</div>
					<!--/progress-->
				</header>
		<!-- questionTitle -->
     <v-alert
      class="ma-2"
      border="right"
      color="blue-grey"
      dark
    >
     	<h2 class="titleContainer title">{{questionIndex+1}}){{ quiz.questions[questionIndex].question }}</h2>
    </v-alert>
			<!-- {{quiz.questions[0].ans[0]}} -->


				<div class="optionContainer">
					<div class="option" v-for="(ans, index) in quiz.questions[questionIndex].ans" @click="selectOption(index)" :class="{ 'is-selected': userResponses[questionIndex] == index}" :key="index">
						{{ index | charIndex }}. {{ ans.ans }}
					</div>
				</div>

				<!-- quizOptions -->
				<!-- <div class="optionContainer">
					<div class="option" v-for="(response, index) in quiz.questions[questionIndex].responses"  :class="{ 'is-selected': userResponses[questionIndex] == index}" :key="index">
                  <v-btn  :class="{ 'is-selected': userResponses[questionIndex] == index}" class="ma-1" @click="selectOption(index)" >{{ index | charIndex }} ) {{ question.text }}</v-btn>
					</div>
				</div> -->

            
            <v-btn class="mr-1" v-on:click="prev();" :disabled="questionIndex < 1" > Back</v-btn>       

            <v-btn v-on:click="next();"  :disabled="userResponses[questionIndex]==null" > NEXT </v-btn>


			</div>
      </v-card>
			<!--/questionContainer-->
	</div>
	<!--/questionBox-->
  </section>
 </v-container> 

</template>

<script>
import api from "@/services/api";

export default {
 
 async  mounted () {

   if(temp_id == null){
       let   q_id = localStorage.getItem("quiz_id");
       this.quizdata = await api.getquizShow({q_id});    
   }else{
       var temp_id = this.quiz_id;
       localStorage.setItem("quiz_id",temp_id);
       let   q_id = localStorage.getItem("quiz_id");
       this.quizdata = await api.getquizShow({q_id});
   }

   this.title_quiz.quiz_name = this.quizdata.quiz_name
   this.title_quiz.quiz_type = this.quizdata.quiz_type
   this.title_quiz.quiz_time = this.quizdata.quiz_time

   this.quiz = {
      questions: this.quizdata.quiz_question
   },

   this.userResponses = Array(this.quiz.questions.length).fill(null);
  },
  props: ['quiz_id'],
  data() {
    return {
      title_quiz: {
        quiz_name:"",
        quiz_type:"",
        quiz_time:""  
      },
      quiz: null,
      questionIndex: 0,
      userResponses: "",
      isActive: false,
      quizdata:null
    };
   },
   filters: {
      charIndex: function(i) {
         return String.fromCharCode(97 + i);
      }
   },
   methods: {
		 restart: function() {
			 	this.questionIndex=0;
		 		this.userResponses=Array(this.quiz.questions.length).fill(null);
       },
       selectOption: function(index) {
          this.$set(this.userResponses, this.questionIndex, index)
         //console.log(this.userResponses);
       },
       next: function() {
         if (this.questionIndex < this.quiz.questions.length)
            this.questionIndex++;
       },
       prev: function() {
         if (this.quiz.questions.length > 0) this.questionIndex--;
       },
       score: function() {
         var score = 0;
         for (let i = 0; i < this.userResponses.length; i++) {
            if (
               typeof this.quiz.questions[i].ans[
                  this.userResponses[i]
               ] !== "undefined" &&
               this.quiz.questions[i].ans[this.userResponses[i]].correct
            ) 
            {
               score = score + 1;
            }
         }
         return score;
         //return this.userResponses.filter(function(val) { return val }).length;
      }
   }
}
</script>

<style>
 .is-selected{
  background-color: #4CAF50;
  }

</style>