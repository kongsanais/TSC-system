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
            @click="onClickMenu('/')"
          >
            <v-icon left>mdi-folder-multiple-plus-outline</v-icon> Add Department
          </v-btn>
        </v-alert>
      </v-row>
    </v-container>
  </v-card>
  </v-container>
</template>

<script>
export default {
    methods: {
    onClickMenu(link) {
      this.$router.push(link).catch((err) => {});
    },
  },
}
</script>

<style>

</style>