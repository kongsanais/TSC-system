<template>
  <v-card v-ripple class="mx-auto" max-width="344" outlined>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{ title }}</v-list-item-title>
        <v-list-item-subtitle class="title">{{
          subtitle
        }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar  size="65" :color="avatar_bg">
        <v-icon color="white" size="40" >{{ avatar_ic }}</v-icon>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "StockCard",
  props: ["title", "subtitle", "avatar_bg", "avatar_ic"]
};
</script>

<style></style>
