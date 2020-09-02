<template>
  <div>
  <v-carousel       
      :continuous="false"
      :show-arrows="false"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      height="800px" 
      class="mt-5">
      
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
  </div>
</template>

<script>
  import api from "@/services/api";
  export default {
  mounted() {
    if (api.isLoggedIn()) {
      this.$router.push("/profile");
    }
  },
    data () {
      return {
        items: [
             {src: require('../assets/home-carousel/home_pic_box.jpg')}
        ],
      }
    },
  }
</script>

<style>
</style>
