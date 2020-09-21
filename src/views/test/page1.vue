<template>
  <div>
      <v-btn @click="click()">click</v-btn>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
    }
  },
  methods:{
      click(){
          this.$router.push({ name: 'page2', params: {title: 'test data' }})
      }
  }
}
</script>

<style>

</style>