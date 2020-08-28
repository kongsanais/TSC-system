<template>
    <div class="ma-5">
    <v-card class="mb-2" color="primary" dark >
      <v-row >
        <v-col class="d-flex" xl="12" lg="12" md="12" sm="12" cols="12">
          <h2 class="ma-2">
            <v-icon large class="mb-2">mdi-file-account-outline</v-icon>
            User list
          </h2>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="mt-5 mb-5">
      <v-row class="pa-3">

        <v-col xl="2" lg="4" md="4" sm="12" cols="12">
          <StockCard
            title="All Applicant"
            avatar_ic="mdi-account-group-outline"
            avatar_bg="#2196F3"
            :subtitle="card_status.card_all"
          />
        </v-col>


        <v-col  xl="2" lg="4" md="4" sm="12" cols="12">
          <StockCard
            title="Waitting"
            avatar_ic="mdi-account-clock"
            avatar_bg="#f39c12"
            :subtitle="card_status.card_wait"
          />
        </v-col>

        <v-col  xl="2" lg="4" md="4" sm="12" cols="12">
          <StockCard
            title="HR Consider"
            avatar_ic="mdi-comment-account"
            avatar_bg="#3F51B5"
            :subtitle="card_status.card_con"
          />
        </v-col>



          <v-col  xl="2" lg="4" md="4" sm="12" cols="12">
          <StockCard
            title="Interview"
            avatar_ic="mdi-account-question"
            avatar_bg="#00c0ef"
            :subtitle="card_status.card_inter"
          />
        </v-col>
        

        
          <v-col  xl="2" lg="4" md="4" sm="12" cols="12">
          <StockCard
            title="Hiring"
            avatar_ic="mdi-account-check-outline"
            avatar_bg="#4CAF50"
            :subtitle="card_status.card_hiring"
          />
        </v-col>


          <v-col  xl="2" lg="4" md="4" sm="12" cols="12">
          <StockCard
            title="Fail"
            avatar_ic="mdi-earth-minus"
            avatar_bg="#F44336"
            :subtitle="card_status.card_fail"
          />
        </v-col>

       <!-- <v-col xl="2" lg="4" md="6" sm="12" cols="12"  v-for="item in statusArray" :key="item" >
          <StockCard
            :title="item._id.reg_status"
            :subtitle="item.count"
          /> 
        </v-col> -->
      </v-row>
    </v-card>
  
  

  <v-row >
  <v-col xl="6" lg="6" md="6" sm="12" cols="12">
    <v-card class="mb-2">
        <v-btn class="success mt-2 ml-2" @click="fillData()"><v-icon>mdi-refresh</v-icon></v-btn>
        <BarChart style="height: 300px;" :chartData="datacollection_BarChart" />
    </v-card>
  </v-col>

      <v-col xl="6" lg="6" md="6" sm="12" cols="12">
  <v-card class="mb-2">
      <v-btn class="success mt-2 ml-2" @click="fillData()"><v-icon>mdi-refresh</v-icon></v-btn>
      <LineChart style="height: 300px;" :chartData="datacollection_LineChart" />
  </v-card>
  </v-col>
  </v-row>


  <v-card   color="primary" dark>
      <v-row >
        <v-col class="d-flex" xl="12" lg="12" md="12" sm="12" cols="12">
          <h2 class="ma-2">
            <v-icon large class="mb-2">mdi-file-account-outline</v-icon>
            Table list
          </h2>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
        </v-col>
      </v-row>
  </v-card>
  
   <v-card  >
      <v-data-table :search="search" :headers="headers" :items="mDataArray">
        <!-- table top section -->
        <template v-slot:top>
          <v-toolbar flat color="white">
            <!-- <v-toolbar-title>Applicant</v-toolbar-title> -->
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            
    <v-dialog v-model="data_dateTemplete.date_dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
     <v-btn color="indigo" dark class="mb-4 mr-2" v-bind="attrs"  v-on="on">
              <v-icon left>mdi-account-search-outline</v-icon>
              <span>Filter</span>
            </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Filter Data</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

            <!-- start date -->
                <v-col cols="12" xl="6" sm="6" md="4">
                <v-menu
                  v-model="data_dateTemplete.menu_start"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="data_dateTemplete.date_start"
                      label="Select Date Start"
                      prepend-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="data_dateTemplete.date_start" @input="data_dateTemplete.menu_start = false"></v-date-picker>
                </v-menu>
                </v-col>

           <!-- stop end -->
                <v-col cols="12" xl="6" sm="6" md="4">
                  
                <v-menu
                  v-model="data_dateTemplete.menu_end"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="data_dateTemplete.date_end"
                      label="Select Date End"
                      prepend-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="data_dateTemplete.date_end" @input="data_dateTemplete.menu_end = false"></v-date-picker>
                </v-menu>
                </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          
          <!-- <v-btn class="error" @click="dialog = false" >
            Close
          </v-btn> -->

          <v-btn class="primary" text @click="filterDataTable()" >FIND</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>

    

           <v-btn color="green" dark class="mb-4">
              <v-icon left>mdi-microsoft-excel</v-icon>
              <span>Export</span>
            </v-btn>

          
          </v-toolbar>
        </template>

        <!-- table tr section -->
        <template v-slot:item="{item}">
          <tr class="mb-2" >
            <td >
            <v-img
                :src="item.imageURL | imageUrl"
                lazy-src="@/assets/samsung-icon.png"
                aspect-ratio="1"
                max-width="100"
                max-height="100"
              ></v-img>
            </td>
            <td>{{ item.eng_prefix + " " + item.eng_firstname  + " " + item.eng_lastname | capitalize  }}</td>
            <td>{{ item.nationality | capitalize }}</td>
            <td>{{ item.age}}</td>
            <td>{{ item.degree_education}}</td>
            <td>{{ item.education}}</td>
            <td>{{item.majoy_education}}</td>
            <td>{{item.gpa}}</td>
            <td>{{item.createdAt | formatDate}}</td>
            <td>
            <v-btn color="primary" @click="show_Profile(item)" fab x-small dark>
              <v-icon>mdi-card-account-phone-outline</v-icon>
            </v-btn>
            <!-- <span class="ma-1"></span>
            <v-btn color="primary" fab x-small dark>
              <v-icon>mdi-pencil</v-icon>
            </v-btn> -->

            </td>
          </tr>
        </template>
      </v-data-table>
  </v-card>




  </div>
</template>

<script>

import StockCard from "@/components/cards/StockCard.vue";
import BarChart from "@/components/charts/BarChart.vue";
import LineChart from "@/components/charts/LineChart.vue";
import moment from "moment";
import api from "@/services/api";

export default {
  props: ["title", "subtitle", "avatar_bg", "avatar_ic"],
  components: {
    StockCard,
    BarChart,
    LineChart
  },
 async  mounted () {
        await this.loadApplicant();
        await this.getCardData()
        await this.fillData();
  },
  data() {
    return {
      card_status: {
        card_all: 0,
        card_wait: 0,
        card_con: 0,
        card_inter: 0,
        card_hiring:0,
        card_fail: 0
      },
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      search: "",
      datacollection_BarChart:{ labels:[], datasets: [] },
      datacollection_LineChart: { labels:[], datasets: [] },
      mDataArray:[],
      statusArray:[],
      index_count: 0,
      label_name:[],
      label_data:[],
      headers: [
          { text: 'Picture', value: "email"},
          { text: 'Name', value: 'th_firstname' },
          { text: 'Nationality', value: 'Nationality'},
          { text: 'Age' , value:'age'},
          { text: 'Degree' , value:'degree_education'},
          { text: 'Education' , value:'education'},
          { text: 'Majoy'  , value:'majoy_education'},
          { text: 'GPA'  , value:'gpa'},
          { text: 'Reg.Date' , value:'createdAt'},
          { text: 'Action', value:'_id'},
        ],
      data_dateTemplete: {
        date_dialog :false,
        date_start: "",
        menu_start: false,
        date_end: "",
        menu_end: false,
      }
    };
   },methods: {
     async loadApplicant(){
        let result = await api.getAllApplicant()
        this.mDataArray = result;
        let status_data = await api.getStatusData();
        this.statusArray = status_data;
     },
     show_Profile(item) {
       this.$router.push(`/profile_one_list/${item._id}`);
     },
     async fillData () {
          this.datacollection_BarChart = {
          //Data to be represented on x-axis
          labels: await this.getChartLable(),
          datasets: [
            {
              label: '2020',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              data: await this.getChartData(),
              // borderColor: [
              //   '#43A047',
              //   'green',
              //   'red'
              //  ],
               borderWidth: 2,
               backgroundColor: await this.getChartColor(),
            }
      ]};
      this.datacollection_LineChart = {
          //Data to be represented on x-axis
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: '2020',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              data: this.getRandomInt(),
              borderColor: [
                '#43A047'
               ],
               borderWidth: 2,
               backgroundColor: [
                '#2196F3',
                '#2196F3',
                '#2196F3',
                '#2196F3',
                '#2196F3'
            ],
            }
          ]};
      },
      getChartData(){
        let data_chart = []
        for (var i = 0; i < this.statusArray.length;i++)
        {
           data_chart.push(this.statusArray[i].count)
        }
        return data_chart
      },
      getChartLable(){
        let data_chart = []
        for (var i = 0; i < this.statusArray.length;i++)
        {
           data_chart.push(this.statusArray[i]._id.reg_status)
        } 
        this.label_name = data_chart;
        return data_chart
      },
      getChartColor(){
        let data_chart = []

        let color_02 = "#f39c12";
        let color_03 = "#3F51B5";
        let color_04 = "#00c0ef";
        let color_05 = "#4CAF50";
        let color_06 = "#F44336";

        for (var i = 0; i < this.statusArray.length;i++)
        {
           if(this.statusArray[i]._id.reg_status == "Waitting"){
             data_chart.push(color_02)
           }else if (this.statusArray[i]._id.reg_status == "HR Consider"){
              data_chart.push(color_03)
           }else if (this.statusArray[i]._id.reg_status == "Interview"){
              data_chart.push(color_04)
           }else if (this.statusArray[i]._id.reg_status == "Hiring"){
              data_chart.push(color_05)
           }else if (this.statusArray[i]._id.reg_status == "Fail"){
              data_chart.push(color_06)
           }
           
        } 

        this.label_name = data_chart;
        return data_chart
      },
      getCardData(){
        for (var i = 0; i < this.statusArray.length;i++)
        {
            if(this.statusArray[i]._id.reg_status == "Waitting"){
              this.card_status.card_wait = this.statusArray[i].count;
            }else if(this.statusArray[i]._id.reg_status == "HR Consider"){
              this.card_status.card_con  = this.statusArray[i].count;
            }else if(this.statusArray[i]._id.reg_status == "Interview"){
              this.card_status.card_inter = this.statusArray[i].count;
            }else if(this.statusArray[i]._id.reg_status == "Hiring"){
              this.card_status.card_hiring = this.statusArray[i].count; 
            }else if(this.statusArray[i]._id.reg_status == "Fail"){
              this.card_status.card_fail = this.statusArray[i].count; 
            }
            this.card_status.card_all += this.statusArray[i].count;
        }       
      },
       async filterDataTable(){

        this.data_dateTemplete.date_dialog = false;
        let date_start = this.data_dateTemplete.date_start;
        let date_end  = this.data_dateTemplete.date_end;
        let result = await api.getAllApplicantByDate({ date_start, date_end });
        this.mDataArray = result;
        
      }
    }
};
</script>
