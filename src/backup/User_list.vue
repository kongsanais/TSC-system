<template>
  <v-container grid-list-xs>
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
      <v-row>
       <v-col xl="2" lg="4" md="6" sm="12" cols="12"  v-for="item in statusArray" :key="item" >
          <StockCard
            :title="item._id.reg_status"
            :subtitle="item.count"
          /> 
        </v-col>
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
            


           <v-btn color="indigo" dark class="mb-4 mr-2">
              <v-icon left>mdi-account-search-outline</v-icon>
              <span>Filter</span>
            </v-btn>

           <v-btn color="green" dark class="mb-4">
              <v-icon left>mdi-microsoft-excel</v-icon>
              <span>Export</span>
            </v-btn>

          
          </v-toolbar>
        </template>

        <!-- table tr section -->
        <template v-slot:item="{ item}">
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
  </v-container>
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
        await this.fillData();
  },
  data() {
    return {
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
               backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
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
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                 'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            }
          ]};
      },
      getRandomInt () {

        let randoms = []
        for (let index = 0; index < 12; index++) 
        {
          randoms.push(Math.floor(Math.random() * (1 - 5 + 1)) + 5)
        }
        return randoms

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
        let check_status = ['Waitting','HR Consider','Interview','Hiring','Fail']

        for (var i = 0; i < this.statusArray.length;i++)
        {
           data_chart.push(this.statusArray[i]._id.reg_status)
        } 
        this.label_name = data_chart;
        
        
        
        return data_chart

      }
    }
};
</script>
