<template>
  <v-container>
    <v-row  class="pt-5 pl-5 pr-5" >
      <v-col lg="5" md="6" sm="12" cols="12">
      <v-card>
        <v-card-title>
          <v-icon large left>
            mdi-card-bulleted
          </v-icon>
          <span class="title font-weight-light">Information / ข่าวสาร</span>
        </v-card-title>
        <v-card-text>
          <h4>Login & Register / เข้าสู่ระบบ & สมัคร</h4>
          <v-list >
            <!-- <v-subheader>text</v-subheader> -->
            <v-list-item-group v-model="items" color="primary">
              <v-list-item v-for="(item, i) in items" :key="i" @click="onClickMenu(item.link)">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    //  
    items: [
      { text: "Login ( เข้าสู่ระบบ ) ",  icon: "mdi-account-circle-outline" ,link: "/login" },
      { text: "Register ( สมัครงาน )", icon: "mdi-account-cog-outline",link: "/job" }
    ],
  }),
  methods: {
    onClickMenu(link) {
      this.$router.push(link).catch((err) => {});
    },
  },
};
</script>

<style></style>
