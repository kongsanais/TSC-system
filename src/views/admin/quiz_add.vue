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
            @click="onClickMenu('/quiz_list')"
          >
            <v-icon left>mdi-order-bool-descending</v-icon> Quiz List
          </v-btn>
        </v-alert>
      </v-row>
    </v-container>

    <v-container>
      <v-form @submit.prevent="saveQuiz" ref="form">
      <!-- {{ quiz }}
      {{ question_array }} -->
      <v-row>
        <v-progress-linear
          color="black darken-1"
          rounded
          value="0"
        ></v-progress-linear>
        <v-col class="d-flex" xl="12" lg="12" md="12" sm="12" cols="12">
          <b class="mt-5" ><h3>Quiz Add</h3></b>
          <v-spacer></v-spacer>
              <v-btn @click="saveQuiz()" class="ma-2" tile outlined color="success"><v-icon left>mdi-pencil</v-icon> SAVE </v-btn>
        </v-col>
        <v-col class="d-flex" xl="6" lg="6" md="6" sm="12" cols="12">
          <v-text-field 
          v-model="quiz.quiz_name" 
          label="Quiz Name" 
          :rules="[(v1) => !!v1 || 'Please Enter Quiz Name']"
          clearable>
          </v-text-field>
        </v-col>
        <v-col class="d-flex" xl="6" lg="6" md="6" sm="12" cols="12">
          <v-select
            @change="setupQuiz_Seq"
            v-model="quiz.quiz_type"
            :items="['English', 'Specific','Management','Attitude ']"
            menu-props="auto"
            label="Select Quiz Type"
            :rules="[(v1) => !!v1 || 'Please Select Quiz Type']"
            hide-details
            prepend-icon="mdi-format-list-bulleted-type"
            single-line
          ></v-select>
        </v-col>
        <v-col class="d-flex" xl="3" lg="3" md="3" sm="12" cols="12">
          <v-text-field
            v-model="quiz.quiz_time"
            prepend-icon="mdi-clock-time-ten-outline"
            label="Time/Minute"
            type="number"
            :rules="[(v1) => !!v1 || 'Please Enter Time / Minute']"
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


        <v-card class="ma-2 ">
          <v-card-title>
            Quiz List
            <v-spacer></v-spacer>
            
      <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ml-2"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus-box-multiple</v-icon>
           Add Question
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Qustion Add</span>
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
    </v-card-title>
        <!-- array_img length : {{array_img.length}}<br>
        array question : {{question_array}}<br>
        img : {{array_img}}<br> -->
          <v-data-table  :headers="headers" :items="itemsWithIndex" >
            <template v-slot:item="{ item }">
              <tr class="mb-2">
                <td>{{item.index+1}} </td>
                <td>
                  <img
                      @click="showZoomin(array_imageURL[item.index])"
                      v-if="array_imageURL[item.index]"
                      :src="array_imageURL[item.index]"
                      style="height: 50px; width: 50px;"
                    />
                </td>
                <td>
                {{item.question}}
                </td>

                <td>
                    {{item.ans_type}}
                </td>

                <td>
                  <ul v-if="item.ans_type == 'Choice'">
                    <li v-for="(item,index) in item.ans" :key="index">
                      {{index+1}} ) {{ item.ans }}
                    </li>
                  </ul> <div v-else>-</div>
                </td>
                <td>
                  <v-btn color="error" @click="deleteQuiz(item.index)" fab x-small dark>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>

    <v-dialog v-model="show_big_img" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">View</span>
        </v-card-title>
        <v-card-text>
            <v-row>
              <v-col class="d-flex" xl="12" lg="12" md="12" sm="12" cols="12">
               <v-img  style="height: 100%; width: 100%;"  :src="img_ondialog"></v-img>
              </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="show_big_img = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

          <!-- <v-btn
            color="green darken-1"
            text
            @click="dialog_messenger.status = false"
          >
            Disagree
          </v-btn> -->

          <v-btn
            class="primary"
            light
            text
            @click="onClickMenu(dialog_messenger.router)"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  async mounted() {
  },
  data: () => ({
    quiz: {
      quiz_name: null,
      quiz_type: null,
      quiz_sequence :null,
      quiz_time: null,
    },
    question_array: [],  
    ans_array: [],  
    ans_type:"",
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
          { text: 'Index', value: 'index' },
          { text: 'Images', value: 'index' },
          { text: 'Question', value: 'question' },
          { text: 'Ans Type', value: '' },
          { text: 'Ans' , value: ''},
          { text: 'Action',value:'index'}
    ],
    dialog: false,
    show_big_img:false,
    img_ondialog:null,
    imageURL: [],
    array_imageURL:[],
    image:null,
    array_img:[],
    dialog_messenger: {
      status: false,
      title: "Message",
      text: "",
      sub_text: "",
      router: "",
    },
  }),
  methods: {
    onFileSelected(event) {
      const reader = new FileReader();
      reader.onload = event => {
        this.imageURL =  event.target.result ;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.image = event.target.files[0];
    },
    setupQuiz_Seq(){
      if(this.quiz.quiz_type == "English"){
         this.quiz.quiz_sequence = '1'
      }else if(this.quiz.quiz_type == "Specific"){
         this.quiz.quiz_sequence = '2'
      }else if(this.quiz.quiz_type == "Management"){
         this.quiz.quiz_sequence = '3'
      }else if(this.quiz.quiz_type == "Attitude"){
         this.quiz.quiz_sequence = '4'
      }
    },
    select_Type(){
        //
    },
    addAns: function() {
      this.newEntries.push({});
      this.defaultFunds.push({ question: null, correct: "" });
    },    
    submitQues: function() {
      var ansArray = []    
      var tarndata

      for(var i = 0 ; i < this.newEntries.length ; i++)
      {
        tarndata = { ans:this.newEntries[i].ans , correct:this.newEntries[i].correct }
        ansArray.push(tarndata)
      }

      var json_data = {question : this.question_insert, ans:ansArray , ans_type : this.ans_type}
      this.question_array.push(json_data)

      if(this.image != null) {
        this.array_img.push(this.image)
      }else {
        var f = new File([],"index")
        this.array_img.push(f)
      }
      
      this.array_imageURL.push(this.imageURL)
      this.question_insert = null
      this.defaultFunds = [ { "img": null, "ans": null, "correct": "" } ]
      this.newEntries = [ {} ]
      this.$refs.fileupload.value=null;
      this.imageURL = null
      this.image = null 
      this.dialog = false

    },
     async saveQuiz(){
       
        let formData = new FormData();
        const { quiz_name, quiz_type, quiz_time ,quiz_sequence } = this.quiz;
        formData.append("quiz_name", quiz_name);
        formData.append("quiz_type", quiz_type);
        formData.append("quiz_time", quiz_time);
        formData.append("quiz_sequence", quiz_sequence);
        formData.append("ques",JSON.stringify(this.question_array)) 

        for (const i of Object.keys(this.array_img)) 
        {
            formData.append('files', this.array_img[i])
        }

        const result =  await api.addQuiz(formData);
        if(result){
          this.dialog_messenger.text = "Add Quiz Success";
          this.dialog_messenger.sub_text = "";
          this.dialog_messenger.status = true;
          this.dialog_messenger.router = "/quiz_list";
        }else{
          this.dialog_messenger.text = "Check your Information";
          this.dialog_messenger.sub_text = "";
          this.dialog_messenger.status = true;
        }
    },
    showZoomin(img){
     this.show_big_img = true;
     this.img_ondialog = img
    },
    onClickMenu(link) {
    this.dialog_messenger.status = false;
      if (link == "/quiz_list") {
        this.$router.push(link).catch((err) => {});
      }
    },
    deleteRow(index) {
      this.defaultFunds.splice(index, 1);
      this.newEntries.splice(index, 1);
    },
    deleteQuiz(index){
      this.question_array.splice(index, 1); 
      this.array_img.splice(index,1)   
      this.array_imageURL.splice(index,1)  
    }
  }, 
  computed: {
    itemsWithIndex() {
      return this.question_array.map(
        (items, index) => ({
          ...items,
          index: index
        }))
    }
  }
};
</script>
