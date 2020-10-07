<template>
  <v-container>
    <v-card>
      <v-container>
        <v-card class="mb-2" color="primary" dark>
          <v-row>
            <v-col class="d-flex" xl="12" lg="12" md="12" sm="12" cols="12">
              <h2 class="ma-2">
                <v-icon large class="mb-2">mdi-file-account-outline</v-icon>
                Quiz History
                
              </h2>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
            </v-col>
          </v-row>
          <!-- {{data_ans_history}} -->
        </v-card> 
       <!-- {{data_ans_history.res_data}} -->
        <v-row>
         <v-col xl="2" lg="3" md="3" sm="12" cols="12">
           <v-alert type="primary" :value="true">
             {{ data_ans_history.res_data.h_quiz_id.quiz_name}}<br>
             Quiz Type : {{ data_ans_history.res_data.h_quiz_id.quiz_type}}
           </v-alert>
         </v-col>
            
        <v-col xl="2" lg="3" md="3" sm="12" cols="12">
          <v-card>
          {{data_ans_history.res_data.h_user_id.eng_prefix}} 
          {{data_ans_history.res_data.h_user_id.eng_firstname}}
          {{data_ans_history.res_data.h_user_id.eng_lastname}}
          </v-card>
         </v-col>

          <v-col xl="12" lg="12" md="12" sm="12" cols="12">
            <v-card>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      No.
                    </th>
                    <th class="text-left">
                      Images
                    </th>
                    <th class="text-left">
                      Question
                    </th>
                    <th class="text-left">
                      Choice
                    </th>
                    <th class="text-left">
                      User Ans
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in itemsWithIndex" :key="item._id">
                    <td>{{item.index+1}}</td>
                    <td>{{ item.img }}</td>
                    <td>{{ item.question_id.question }}</td>
                    <td> 
                         <ul v-if="item.question_id.ans_type == 'Choice'">
                              <li v-for="(item,index) in item.question_id.ans" :key="index">
                             ({{ index +1 }})  {{ item.ans}} 
                              </li>
                        </ul>
                          <ul v-else>
                              -
                         </ul>
                    </td>

                    <td v-if="item.question_id.ans_type == 'Choice'" >{{ parseInt(item.ans_data)+1}}</td>
                    <td v-else>{{item.ans_data}}</td>  

                  </tr>
                </tbody>
              </template>
            </v-simple-table>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  async mounted() {
    var quiz_id = this.$route.params.quiz_id;
    var q_id_user = this.$route.params.user_id;
    this.data_ans_history = await api.getHisAns({ quiz_id, q_id_user });
  },
  data: () => ({
    data_ans_history: null,
  }),  
  filters: {
    charIndex: function(i) {
      return String.fromCharCode(97 + i);
    },
  },
  methods: {},
  computed: {
    itemsWithIndex() {
      return this.data_ans_history.res_data.h_ans_array.map(
        (items, index) => ({
          ...items,
          index: index
        }))
    }
  }
};
</script>
