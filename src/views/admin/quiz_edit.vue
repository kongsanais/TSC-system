<template>
  <v-container>
   <v-card>
    <v-container>
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
            <v-icon left>mdi-shield-account</v-icon> Admin
          </v-btn>

          <v-btn
            class="ma-2"
            tile
            outlined
            color="#232F3E"
            @click="onClickMenu('/quiz_list')"
          >
            <v-icon left>mdi-clipboard-multiple</v-icon> Quiz List
          </v-btn>
        </v-alert>
      </v-row>
    </v-container>

    <v-container>
     <v-row>
      <v-col xl="12" lg="12" md="12" sm="12" cols="12" >
        <v-card max-width="100%">
          <v-row>
            <v-col xl="12" lg="12" md="12" sm="12" cols="12" >
                   <div class="ma-2">
                   <h1 class="ma-2"><b>{{ title_quiz.quiz_name }}</b></h1>
                   <h2  class="ma-2" >{{ title_quiz.quiz_time }} Minute</h2>
                   <h3  class="ma-2" >Quiz Type( {{ title_quiz.quiz_type }} )</h3>
                   </div>
             </v-col>
            <v-col>
         </v-col>
       </v-row>
      </v-card>
      </v-col>
      <v-col  xl="12" lg="12" md="12" sm="12" cols="12">
          <v-card >
      <v-row >
        <v-col class="d-flex" xl="12" lg="12" md="12" sm="12" cols="12">
          {{title_quiz.q_id }}
          <h2 class="ma-2">
            <v-icon large class="mb-2">mdi-file-account-outline</v-icon>
            Question list
          </h2>
          <v-spacer></v-spacer>
        
        <v-btn
          class="ma-2"
          @click="addquestion()"
          color="primary"
          dark
          small
        >
          <v-icon>mdi-plus-box-multiple</v-icon>
           Add Question
        </v-btn>

        </v-col>
      </v-row>
  </v-card>
          <v-card>
          <v-data-table  :search="search"  :headers="headers"  :items="itemsWithIndex" >
            <template v-slot:item="{item}">
              <tr class="mb-2">
                <td> {{item.index+1}} </td>
              <td> 
              <v-img 
                style="border-style: groove;"
                class="ma-1"
                v-if="item.img != null"
                :src="item.img | quizImgUrl"
                max-width="100px"
                max-height="100px"
              >
              </v-img>
            
            <div v-else>
             -
            </div>

              </td>
              <td> {{ item.question }} </td>  
              <td> {{ item.ans_type }} </td> 
              <td>
                  <ul v-if="item.ans_type == 'Choice'">
                    <li v-for="(item,index) in item.ans" :key="index">
                      {{index+1}} ) {{ item.ans }}
                    </li>
                  </ul>
                  <div v-else>-</div>
               </td>
               
        <td>

        <v-btn
          @click="updateONdialog(item._id,item.index)"
          class="ml-2"
          color="warning"
          dark
          fab
          small
        >
          <v-icon>mdi-circle-edit-outline</v-icon>
        </v-btn>

        <v-btn
          @click="deleteQuestion(item._id)"
          class="ml-2"
          color="error"
          dark
          fab
          small
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>

       </td>


              </tr>
            </template>
          </v-data-table>

          </v-card>
      </v-col>
     </v-row>
      </v-container>
   </v-card>
   
      <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{dialog_title}}</span>
        </v-card-title>
        <v-card-text>
        <v-container>
        <v-col class="d-flex" xl="12" lg="12" md="12" sm="12" cols="12">
          <v-textarea
            v-model="question_insert"
            outlined
            rows="5"
            name="input-7-4"
            label="Enter Question"
            :rules="[(v1) => !!v1 || 'Please Enter Question']"
          ></v-textarea>
        </v-col>
                
        <v-col>
        <v-progress-linear
          color="black darken-2"
          rounded
          value="0"
        ></v-progress-linear></v-col>
        <v-col class="d-flex" xl="12" lg="12" md="12" sm="12" cols="12">
         Images : <input  class="ml-1" type="file" ref="fileupload" @change="onFileSelected" />
        </v-col>
         

        <v-col class="d-flex" xl="5" lg="5" md="6" sm="6" cols="12">

        <v-select
          @change="select_Type"
          v-model="ans_type"
          :items="['Choice','Text']"
          label="Select Ans Type"
          dense
          solo
          x-small
        >
        </v-select>
        </v-col>

       <div v-if="ans_type == 'Choice'">
        <v-col class="d-flex" xl="5" lg="5" md="6" sm="6" cols="12">
        <v-btn color="success" @click="addAns()" class="mr-1"  x-small>Add Ans</v-btn>
        </v-col>
        

        <v-col class="d-flex" xl="12" lg="12" md="12" sm="12" cols="12">
          <table width="100%">
            <tr v-for="(fund, index) in defaultFunds" :key="index"> 
              <td>{{index+1}}) </td>
              <td>
                <v-text-field
                  v-model="newEntries[index].ans"
                  name="entryFund"
                  type="text"
                />
              </td>
              <td>
                <v-checkbox v-model="newEntries[index].correct"></v-checkbox>
              </td>
              <td>
               <v-btn  @click="deleteRow(index)" color="error" class="mr-1" fab x-small>
                 <v-icon>mdi-delete</v-icon>
               </v-btn>
              </td>
            </tr>
          </table>
        </v-col>
        </div>



      </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          
           <v-btn color="error" @click="dialog = false"  dark>CLOSE</v-btn>
          <v-btn color="success" type="submit" @click="submitQues()">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

    this.title_quiz.quiz_id = this.quizdata._id
    this.title_quiz.quiz_name = this.quizdata.quiz_name;
    this.title_quiz.quiz_type = this.quizdata.quiz_type;
    this.title_quiz.quiz_time = this.quizdata.quiz_time;
    this.quiz = {questions: this.quizdata.quiz_question}

    (this.userResponses = Array(this.quiz.questions.length).fill(null));
  },
  props: ["quiz_id"],
  data() {
    return {
      search:"",
      title_quiz: {
        quiz_id : "",
        quiz_name: "",
        quiz_type: "",
        quiz_time: "",
      },
     headers: [
      { text: "No.", value: "index" },
      { text: "Imges", value: "index" },
      { text: "Question", value: "quiz_type" },
      { text: "Ans Type", value: "ans_type" },
      { text: "Ans", value: "index" },
      { text: "Action", value: "" },
     ],
    quizdata: null,
     defaultFunds: [
      {
        img: null,
        ans: null,
        correct: "",
      },
    ],
    question_insert:"",
    ans_type :"",
    newEntries: [{}],
    dialog: false,
    dialog_title : "",
    question_id:null,//for update
    img_review:null,
    imagobj:null
    };
  },
  filters: {
    charIndex: function(i) {
      return String.fromCharCode(97 + i);
    },
  },
  methods: {
    async submitQues(){
        let formData = new FormData();
        if(this.question_id == null) 
        {
         //add   
        formData.append("quiz_id",this.title_quiz.quiz_id)
        formData.append("question",this.question_insert)
        formData.append("ans_type",this.ans_type)
        formData.append("ans",JSON.stringify(this.newEntries))
        formData.append('file',this.imagobj);
        var  result_add  =  await api.addQuestion(formData);
        }else {
         //edit
        formData.append("question_id",this.question_id)
        formData.append("ques",this.question_insert)
        formData.append("ans_type",this.ans_type)
        formData.append("ans",JSON.stringify(this.newEntries))
        formData.append('file',this.imagobj);
        var  result_edit =  await api.editQuiz(formData);
        }
        this.dialog = false
        let q_id = this.quizdata._id
        this.quizdata = await api.getquizShow({ q_id });
        this.itemsWithIndex()

    },
        onClickMenu(link) {
      this.$router.push(link).catch((err) => {});
    },
    async addquestion(){
        this.dialog = true
        this.$refs.fileupload.value=null
        this.question_id = null
        this.question_insert  = null 
        this.newEntries = [{}]
        this.defaultFunds = [ { "img": null, "ans": null, "correct": "" } ]
    },
    select_Type(){
        //
    },
    async deleteQuestion(id){
        let quiz_id = this.title_quiz.quiz_id; 
        let ques_id =  id;
        const result = await api.removeQuestion({ques_id,quiz_id})
        let q_id = this.quizdata._id
        this.quizdata = await api.getquizShow({ q_id });
        this.itemsWithIndex()
    },
    async updateONdialog(id,index){

       if(this.imagobj!=null){
         this.$refs.fileupload.value = null
       }

       this.question_id = id
       this.question_insert  = null 
       this.newEntries = [{}]
       this.defaultFunds = [ { "img": null, "ans": null, "correct": "" } ]
       this.dialog_title = "Question Update"
       this.dialog = true
       this.question_insert = this.quizdata.quiz_question[index].question
       this.newEntries = this.quizdata.quiz_question[index].ans
       for(var i = 0 ;i< this.quizdata.quiz_question[index].ans.length-1; i++ ){
         this.defaultFunds.push({ "img": null, "ans": null, "correct": "" })
       }
    },
    onFileSelected(event) {
      const reader = new FileReader();
      reader.onload = event => {
        this.img_review =  event.target.result ;
     };
      reader.readAsDataURL(event.target.files[0]);
      this.imagobj = event.target.files[0];
    },
    addAns: function() {
      this.newEntries.push({});
      this.defaultFunds.push({ question: null, correct: "" });
    },
    deleteRow(index) {
      this.defaultFunds.splice(index, 1);
      this.newEntries.splice(index, 1);
    },
  },
  computed: {
    itemsWithIndex() {
      return this.quizdata.quiz_question.map(
        (items, index) => ({
          ...items,
          index: index
        }))
    }
  }
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
