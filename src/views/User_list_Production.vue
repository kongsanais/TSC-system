<template>
    <div class="ma-5">
    <v-card class="mb-2" color="#434247" dark >
      <v-row >
        <v-col class="d-flex" xl="12" lg="12" md="12" sm="12" cols="12">
          <h2 class="ma-2">
            <v-icon large class="mb-2">mdi-file-account-outline</v-icon>
            Report User [ Production ]
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
    <v-card class="mb-2" >
        <!-- <v-btn class="success mt-2 ml-2" @click="fillData()"><v-icon>mdi-refresh</v-icon></v-btn> -->
        <BarChart style="height: 300px;" :chartData="datacollection_BarChart" />
    </v-card>
  </v-col>

      <v-col xl="6" lg="6" md="6" sm="12" cols="12">
  <v-card class="mb-2">
      <!-- <v-btn class="success mt-2 ml-2" @click="fillData()"><v-icon>mdi-refresh</v-icon></v-btn> -->
      <LineChart style="height: 300px;" :chartData="datacollection_LineChart" />
  </v-card>
  </v-col>
  </v-row>


  <v-card   color="#434247" dark>
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
            <v-spacer>
            </v-spacer>
            
    <v-dialog v-model="data_dateTemplete.date_dialog" hide-overlay persistent max-width="600px">
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
          <v-btn class="error" @click="data_dateTemplete.date_dialog = false" >
            Close
          </v-btn>
          <v-btn class="primary" text @click="filterDataTable()" >FIND</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    
      <v-dialog v-model="data_exportExcel.ep_dialog" hide-overlay persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
           <v-btn color="green" dark class="mb-4" v-bind="attrs"  v-on="on" >
              <v-icon left>mdi-microsoft-excel</v-icon>
              <span>Export</span>
            </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Export  Data</span>
        </v-card-title>
        <v-card-text>
          <v-container>

        <v-row>
          <v-col cols="12" xl="12" lg="12" sm="12" md="4" >
          <v-btn x-small @click="selectAll" class="mb-2">Select all</v-btn>
    
          <v-select
            multiple
            chips
            label='Select Filed'
            v-model='field_selected'
            :items='field_data_export'
            item-value='id'
            item-text='name'
            :menu-props="{ maxHeight: '400' }"
            persistent-hint
            return-object
          >

            <!-- <template slot='item' slot-scope='{ item }'>
              {{ item.name }}
            </template>
             -->
          </v-select>

              <v-menu
                  v-model="export_filter.menu_start"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="export_filter.date_start"
                      label="Select Date Start"
                      prepend-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="export_filter.date_start" @input="export_filter.menu_start = false"></v-date-picker>
                </v-menu>
                
                <v-menu
                  v-model="export_filter.menu_end"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="export_filter.date_end"
                      label="Select Date End"
                      prepend-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="export_filter.date_end" @input="export_filter.menu_end = false"></v-date-picker>
                </v-menu>

              <v-select
              v-model="export_filter.gender"
              :items="['Male','Female']"
              label="Select Gender"
              ></v-select>


            <!-- <v-combobox
              v-model="field_data_export.select_item"
              :items="field_data_export.items"
              label="Select"
              :disabled="field_data_export.disibled_select == 1" 
              multiple
              outlined
              dense
            >
            </v-combobox> -->
          </v-col>
        </v-row>

          </v-container>
        </v-card-text>
        <v-card-actions>
      <v-spacer></v-spacer>
          
          <v-btn class="error" @click="data_exportExcel.ep_dialog = false" >
            Close
          </v-btn>

          <v-btn class="primary" text @click="getDataExport() ">SUBMIT</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>


          
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
            <td>{{ item.age}}</td>
            <td>{{ item.degree_education | capitalize}}</td>
            <td>{{item.majoy_education | capitalize}}</td>
            <td>{{item.gpa}}</td>
            <td>{{item.createdAt | formatDate}}</td>
            <td>{{item.reg_status}}</td>
            <td>
            <v-btn color="primary" class="mr-1" @click="show_Profile(item)" fab x-small dark>
              <v-icon>mdi-card-account-phone-outline</v-icon>
            </v-btn>

            <v-btn color="error" fab x-small @click="deleteUser(item)"  dark>
              <v-icon>mdi-delete</v-icon>
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
import XLSX from 'xlsx' // import xlsx
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
      regcountArray:[],
      index_count: 0,
      label_name:[],
      label_data:[],
      headers: [
          { text: 'Picture', value: "email"},
          { text: 'Name', value: 'th_firstname' },
          { text: 'Age' , value:'age'},
          { text: 'Degree' , value:'degree_education'},
          { text: 'Major'  , value:'majoy_education'},
          { text: 'GPA'  , value:'gpa'},
          { text: 'Reg. Date' , value:'createdAt'},
          { text: 'Reg. Status' , value:'reg_status'},
          { text: 'Action', value:'_id'},
        ],
      data_dateTemplete: {
        date_dialog :false,
        date_start: "",
        date_end: "",
        menu_start: false,
        menu_end: false,
      },
      data_exportExcel:{
        ep_dialog : false,
        data: []
      },
      field_data_export:[
        {filed: 'th_prefix',  name: 'Th Prefix'},
        {filed: 'fullnameTH',  name: 'Full Name TH'},
        {filed: 'eng_prefix' , name: 'Eng prefix'},
        {filed: 'fullnameENG' , name: 'Full Name ENG'},
        {filed: 'phone_number',  name: 'Phone Number'},
        {filed: 'phone_number_famaily',  name: 'Phone Number Family'},
        {filed: 'person_relationship',  name: 'Family Relationship'},
        {filed: 'eng_address',  name: 'Address'},
        {filed: 'age', name: 'Age'},
        {filed: 'degree_education', name: 'Degree Education'},
        {filed: 'majoy_education', name: 'Major'},
        {filed: 'gpa', name: 'GPA'},
        {filed: 'job_skill', name: 'Skill'},
        {filed: 'reg_date', name: 'Reg Date'},
      ],
      field_selected:[],
      export_filter:{
        gender :null,
        date_start: null,
        date_end: null,
        menu_start: false,
        menu_end: false,
      },
      json_export:null        
    };
   },
   methods: {
     async loadApplicant(){
        this.mDataArray  = await api.getReportAllProduction()
        this.statusArray = await api.getReportStatusProduction()
        this.regcountArray = await api.getReportRegYearProduction()
     },
     async show_Profile(item) {
       this.$router.push(`/profile_show_production/${item._id}`);
     },
     async deleteUser(item){
      var  id  = item._id
      api.deleteUserData({id})
      this.mDataArray  = await api.getReportAllProduction()
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
              data: await this.getRegData(),
              borderColor: [
                '#4CAF50'
               ],
               borderWidth: 2,
               backgroundColor: [
                'rgba(255,177,193,0.2)',
            ],
            }
          ]};
      },
      async getChartData(){
        let data_chart = []
        for (var i = 0; i < this.statusArray.length;i++)
        {
           data_chart.push(this.statusArray[i].count)
        }
        return data_chart
      },
      async getChartLable(){
        let data_chart = []
        for (var i = 0; i < this.statusArray.length;i++)
        {
           data_chart.push(this.statusArray[i]._id.reg_status)
        } 
        this.label_name = data_chart;
        return data_chart
      },
      async getChartColor(){
        let data_chart = []

        let color_02 = "rgba(243,156,18,0.2)";
        let color_03 = "rgba(63,81,181,0.2)";
        let color_04 = "rgba(54, 162, 235, 0.2)";
        let color_05 = "rgb(132, 225, 132,0.2)";
        let color_06 = "rgba(255, 99, 132, 0.2)";

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
      async getCardData(){
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
      async getRegData() {
        let month12 = [0,0,0,0,0,0,0,0,0,0,0,0];

        for (var i = 0; i < this.regcountArray.length;i++)
        {
           if(this.regcountArray[i]._id.month == 1){
             month12[0] = this.regcountArray[i].count
           }else if(this.regcountArray[i]._id.month == 2){
             month12[1] = this.regcountArray[i].count
           }else if(this.regcountArray[i]._id.month == 3){
             month12[2] = this.regcountArray[i].count
           }else if(this.regcountArray[i]._id.month == 4){
             month12[3] = this.regcountArray[i].count
           }else if(this.regcountArray[i]._id.month == 5){
             month12[4] = this.regcountArray[i].count
           }else if(this.regcountArray[i]._id.month == 6){
             month12[5] = this.regcountArray[i].count
           }else if(this.regcountArray[i]._id.month == 7){
             month12[6] = this.regcountArray[i].count
           }else if(this.regcountArray[i]._id.month == 8){
             month12[7] = this.regcountArray[i].count
           }else if(this.regcountArray[i]._id.month == 9){
             month12[8] = this.regcountArray[i].count
           }else if(this.regcountArray[i]._id.month == 10){
             month12[9] = this.regcountArray[i].count
           }else if(this.regcountArray[i]._id.month == 11){
             month12[10] = this.regcountArray[i].count
           }else if(this.regcountArray[i]._id.month == 12){
             month12[11] = this.regcountArray[i].count
           }
        }
        return month12;
      },
      async filterDataTable() {
        this.data_dateTemplete.date_dialog = false;
        let date_start = this.data_dateTemplete.date_start;
        let date_end  = this.data_dateTemplete.date_end;
        let result = await api.getAllApplicantByDate_Production({ date_start, date_end });
        this.mDataArray = result;
      },
      async getDataExport()  {
        let field = this.field_selected
        let filter_data = this.export_filter
        // let merged = {...field, ...this.export_filter};
        let data =  await api.getJSON_Export_Production({field,filter_data});
        this.json_export = data.real_data
        const dataWS = XLSX.utils.json_to_sheet(this.json_export)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, dataWS)
        XLSX.writeFile(wb,'export.xlsx')
      },
      async selectAll(){
        this.field_selected = this.field_data_export
      }
    }
};
</script>
