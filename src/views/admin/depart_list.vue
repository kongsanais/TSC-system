<template>
 <v-container>
   <v-card>
        <v-container class="pa-1">
      <v-row class="mt-1" dense>
        <v-alert
          class="mt-3 ml-2 mr-2"
          border="left"
          colored-border
          color="primary"
          elevation="2"
        >

          <v-btn
            class="ma-2"
            tile
            outlined
            color="#6D8764"
            @click="onClickMenu('/admin_home')"
          >
            <v-icon left>mdi-shield-account</v-icon> Admin
          </v-btn>


          <v-btn
            class="ma-2"
            tile
            outlined
            color="primary"
            @click="dialog_addDepart = true"
          >
            <v-icon left>mdi-folder-multiple-plus-outline</v-icon> Add Department
          </v-btn>

          
        </v-alert>
      </v-row>
    </v-container>
  </v-card>


    <v-container> 
        <v-card>
        <v-data-table :search="search" :headers="headers" :items="itemsWithIndex">
        <!-- table top section -->
        <template v-slot:top>
          <v-toolbar-title><v-icon> mdi-format-list-checkbox </v-icon> Department List</v-toolbar-title>
          <v-toolbar flat color="white">
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <!-- table tr section -->
            <template v-slot:item="{ item }">
              <tr class="mb-2">
                <td>{{ item.index + 1 }}</td>
                <td>{{ item.dep_name}}</td>
    
                <td>
                  <ul id="example-1">
                    <li v-for="(item,index) in item.dep_quiz" :key="index">
                      {{index+1}} ) {{ item.quiz_name }}
                    </li>
                  </ul>
               </td>

                <td>{{item.createdAt | formatDate}}</td>
                <td>                       

            <!-- <v-btn color="warning" class="mr-1"  fab  x-small>
              <v-icon>mdi-playlist-edit</v-icon>
            </v-btn> -->

            <v-btn color="error" @click="onClickRemoveDepart(item._id)" class="mr-1" fab x-small>
              <v-icon>mdi-delete</v-icon>
            </v-btn>

               </td>
              </tr>
            </template>
      </v-data-table>
      </v-card>
    </v-container>

      <v-dialog v-model="dialog_addDepart" hide-overlay persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Department</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-col cols="12" xl="12" sm="6" md="4">
                  <v-text-field
                    v-model="depart_name"
                    label="Department Name"
                    solo
                    shaped
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" xl="12" sm="6" md="4">
                  <v-select
                    solo
                    label="Select Quiz"
                    item-text="quiz_name"
                    item-value="_id"
                    v-model="select_quiz"
                    :items="item_quiz"
                    multiple
                    chips
                  >
                  </v-select>
                </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="error" @click="dialog_addDepart = false" >
            Close
          </v-btn>
          <v-btn class="primary" text @click="saveDepart()" >SUBMIT</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <v-dialog v-model="dialog_addDepart" hide-overlay persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Department</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-col cols="12" xl="12" sm="6" md="4">
                  <v-text-field
                    v-model="depart_name"
                    label="Department Name"
                    solo
                    shaped
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" xl="12" sm="6" md="4">
                  <v-select
                    solo
                    label="Select Quiz"
                    item-text="quiz_name"
                    item-value="_id"
                    v-model="select_quiz"
                    :items="item_quiz"
                    multiple
                    chips
                  >
                  </v-select>
                </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="error" @click="dialog_addDepart = false" >
            Close
          </v-btn>
          <v-btn class="primary" text @click="saveDepart()" >SUBMIT</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  data: () => ({
    search: "",
    headers: [
      { text: "Index", value: "index" },
      { text: "Department Name", value: "" },
      { text: "Quiz List", value: ""},
      { text: "Reg Date", value: "" },
      { text: "Action", value: "" },
    ],
    depart_list:[],
    dialog_addDepart:false,
    depart_name:"",
    select_quiz:[],
    item_quiz: []
  }),
  async mounted() {
    const depart_list =  await api.getDepartlist();
    this.depart_list = depart_list 

    const data = await api.getAllQuizlist();
    this.item_quiz = data
  },
    methods: {
      onClickMenu(link)  {
      this.$router.push(link).catch((err) => {});
      },    
      async onClickRemoveDepart(depart_id){
      const data = await api.removeDepart({depart_id})
      const depart_list =  await api.getDepartlist();
      this.depart_list = depart_list 
      },
      async saveDepart() {
       let depart_name = this.depart_name
       let select_quiz=  this.select_quiz 
       const data = await api.addDepart({depart_name,select_quiz})
      }
  },
  computed: {
    itemsWithIndex() {
      return this.depart_list.map(
        (items, index) => ({
          ...items,
          index: index
        }))
    }
  }
}
</script>

<style>

</style>