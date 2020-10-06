<template>
 <v-container>
   <v-card  >
    <v-container>

        <v-alert  class="mt-1" v-if="length_quiz == 0"  type="success" max-width="260px">
          Complete All Quiz
        </v-alert> 
        <!-- {{item_quiz}}
       {{length_quiz}} -->
      <v-data-iterator
      v-if="length_quiz != 0"
      :items="items"
      :items-per-page.sync="itemsPerPage"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          class="mb-2"
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Quiz</v-toolbar-title>
        </v-toolbar>
      </template>
      
      <template v-slot:default="props">
        <v-row  >
          <v-col
            
            v-for="item in props.items"
            :key="item.quiz_name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
          
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{ item.quiz_name }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>

                <v-list-item>
                  <v-list-item-content>Quiz Type :</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.quiz_type }}</v-list-item-content>
                </v-list-item>


                <v-list-item>
                  <v-list-item-content>Quiz Time:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.quiz_time }} minute </v-list-item-content>
                </v-list-item>

                
                <v-list-item>
                  <v-list-item-content>
                      
                     <v-btn color="success" @click="onClickStartquiz(item._id)">
                       START
                      </v-btn>
                  
                  </v-list-item-content>
                </v-list-item>
                
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>   
    </v-data-iterator>
    </v-container>

  </v-card>

  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  async mounted() {
    const data = await api.getDoingquiz(this.$route.params._id);
    this.item_quiz = data;
    // alert(this.item_quiz.res_data.length)
    this.length_quiz = this.item_quiz.res_data.length
    this.items = this.item_quiz.res_data
  },
  data: () => ({
      itemsPerPage: 10,
      items: [],    
      length_quiz: ""
  }),
  methods: {
    onClickMenu(link) {
      this.$router.push(link).catch((err) => {});
    },
    onClickStartquiz(quiz_id){
      this.$router.push({ name: 'user_start_quiz', params: {quiz_id:quiz_id}})
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
