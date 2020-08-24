P<template>
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
        <v-col xl="2" lg="3" md="6" sm="12" cols="12">
          <StockCard
            title="All Applicant"
            avatar_ic="mdi-account-group-outline"
            avatar_bg="blue"
            subtitle="1,800"
          />
        </v-col>

        <v-col  xl="2" lg="3" md="6" sm="12" cols="12">
          <StockCard
            title="Waitting"
            avatar_ic="mdi-account-clock"
            avatar_bg="#f39c12"
            subtitle="12"
          />
        </v-col>

        <v-col  xl="2" lg="3" md="6" sm="12" cols="12">
          <StockCard
            title="HR Consider"
            avatar_ic="mdi-comment-account"
            avatar_bg="#3F51B5"
            subtitle="2"
          />
        </v-col>



          <v-col  xl="2" lg="3" md="6" sm="12" cols="12">
          <StockCard
            title="Interview"
            avatar_ic="mdi-account-question"
            avatar_bg="#00c0ef"
            subtitle="101"
          />
        </v-col>
        

        
          <v-col  xl="2" lg="3" md="6" sm="12" cols="12">
          <StockCard
            title="Hiring"
            avatar_ic="mdi-account-check-outline"
            avatar_bg="green"
            subtitle="101"
          />
        </v-col>

        <v-col  xl="2" lg="3" md="6" sm="12" cols="12">
          <StockCard
            title="Fail"
            avatar_ic="mdi-account-remove-outline"
            avatar_bg="red"
            subtitle="101"
          />
        </v-col>

      </v-row>
    </v-card>
  
  
  <v-row >
    <v-col xl="6" lg="3" md="6" sm="12" cols="12">
  <v-card class="mb-2">
      <v-btn class="success mt-2 ml-2" @click="fillData()"><v-icon>mdi-refresh</v-icon></v-btn>
      <BarChart style="height: 300px;" :chartData="datacollection" />
  </v-card>
  </v-col>

      <v-col xl="6" lg="3" md="6" sm="12" cols="12">
  <v-card class="mb-2">
      <v-btn class="success mt-2 ml-2" @click="fillData()"><v-icon>mdi-refresh</v-icon></v-btn>
      <LineChart style="height: 300px;" :chartData="datacollection" />
  </v-card>
  </v-col>
  </v-row>

  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
  </v-container>
</template>

<script>
import StockCard from "@/components/cards/StockCard.vue";
import BarChart from "@/components/charts/BarChart.vue";
import LineChart from "@/components/charts/LineChart.vue";
export default {
  props: ["title", "subtitle", "avatar_bg", "avatar_ic"],
  components: {
    StockCard,
    BarChart,
    LineChart
  },
  mounted () {
        this.fillData()
  },
  data() {
    return {
      datacollection: null,
      search: '',
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },    methods: {
     fillData () {
      this.datacollection = {
          //Data to be represented on x-axis
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: '2019',
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
        for (let index = 0; index < 12; index++) {
          randoms.push(Math.floor(Math.random() * (50000 - 5 + 1)) + 5)
        }
        return randoms
      }
    }
};
</script>
