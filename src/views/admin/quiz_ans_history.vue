<template>
  <v-container>
   <v-card>
    <v-container>
    <v-card class="mb-2" color="primary" dark >
      <v-row >
        <v-col class="d-flex" xl="12" lg="12" md="12" sm="12" cols="12">
          <h2 class="ma-2">
            <v-icon large class="mb-2">mdi-file-account-outline</v-icon>
             Quiz History          
            </h2>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
        </v-col>
      </v-row>
    </v-card>
        <v-row >
           <v-col class="d-flex" xl="12" lg="12" md="12" sm="12" cols="12">
                test
           </v-col>
       </v-row>
    </v-container>
   </v-card>
</v-container>
</template>

<script>
import api from "@/services/api";

export default {
  async mounted() 
  {
  },
  data:()=> ({
  }),
  methods:{
  }, 
};
</script>
