<template>
  <v-container>
     <v-card
    elevation="24"
    class="mx-auto"
  >
  <v-carousel       
      :continuous="false"
      :cycle="cycle"
      :show-arrows="false"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      height="800px" >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
    </v-card>
  </v-container>
</template>

<script>
  export default {
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
