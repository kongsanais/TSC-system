
<template>
  <v-card
    max-width="1000"
    class="mx-auto ma-8"
  >
    <v-container>
      <v-row dense>
		
        <v-col cols="12">
          <v-card
            color="#0D47A1"
            dark
          >
         <div class="d-flex flex-no-wrap justify-space-between">
              <div>
            <v-card-title class="headline">All Applicant</v-card-title>
            <v-card-subtitle class="mt-2"><h1>{{count_all_app}}</h1></v-card-subtitle>
            </div>
            <v-avatar
                class="ma-3"
                size="125"
                tile
              >
               <v-img src="https://image.flaticon.com/icons/svg/2885/2885417.svg"></v-img>
          </v-avatar>
          </div>
          </v-card>
        </v-col>

        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            :color="item.color"
            dark
			@click="onClickMenu(item.link)"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle class="mt-2" ><h1>{{item.count}}</h1></v-card-subtitle>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import api from "@/services/api";

  export default {
	async  mounted () {
	  var data = [];
	  this.count_all_app =  await api.getReportCountAll()
	  data = await api.getReportCountRole();	  
	  for(var i = 0 ; i < this.items.length ; i++){ 
		  this.items[i].count   = data[i].count;
	  }

  	},
    data: () => ({
	  count_all_app: null ,
	  count_all_engineer: null ,
	  count_all_production: null ,
      items: [
        {
          color: '#1F7087',
          src: 'https://image.flaticon.com/icons/svg/2422/2422042.svg',
          title: 'Engineer & Management',
          count: null,
          link: "/user_list_engineer"
        },
        {
          color: '#434247',
          src: 'https://image.flaticon.com/icons/svg/2942/2942804.svg',
          title: 'Production',
          count: null,
          link: "/user_list_production"
        },
      ],
    }),
    methods: {
    onClickMenu(link) {
      this.$router.push(link).catch((err) => {});
    },
  },
  }
</script>