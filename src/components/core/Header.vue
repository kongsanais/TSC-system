<template>
  <div>
    <v-app-bar color="#ffff" light app>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="d-xl-none"
      ></v-app-bar-nav-icon>

      <v-img
      @click="onClickGoHome"
        max-height="145"
        max-width="170"
         src="@/assets/samsung-icon.png"
        contain
      >
      </v-img>

      <v-spacer></v-spacer>

      <div  v-for="([title, route], index) in top_right_menu" :key="index">
        <v-btn  v-if="!$store.state.isLogged"  class="mr-2 d-none d-sm-flex" @click="onClickMenu(route)">
          {{ title }}
        </v-btn>
      </div>
       <v-btn v-if="$store.state.isLogged && ($store.state.role != 'Admin')"  class="ma-2" @click="onGoProfile()">Profile</v-btn>
      <v-icon v-if="$store.state.isLogged" class="mr-2">mdi-account-circle</v-icon>
      <span v-if="$store.state.isLogged" ><b>{{ $store.getters["username"]  | capitalize }}</b></span>
      <v-btn v-if="$store.state.isLogged && ($store.state.role != 'Admin')" icon @click="onClickLogOff">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    <v-btn v-if="$store.state.isLogged && ($store.state.role == 'Admin')" icon @click="onClickLogOffAdmin">
        <v-icon>mdi-export</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      dark
      color="#1969C1"
      v-model="drawer"
      absolute
      left
      temporary
      width="260px"
    >
      <router-link to="/" exact>
        <v-img src="@/assets/tsc-icon.png" alt="" width="100%" />
      </router-link>

      <v-list >
        <v-list-item-group v-model="selectedMenu" mandatory color="primary" v-if="$store.state.isLogged && ($store.state.role != 'Admin')" >
          <v-subheader>MENUS</v-subheader>
          <v-list-item
            class="tile"
            v-for="([icon, title, route], index) in menus_user"
            :key="index"
            @click="onClickMenu(route)"
          >
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>


        </v-list-item-group>

        <v-list-item-group v-else >
          <v-subheader>MENUS ADMIN</v-subheader>
          <v-list-item
            class="tile"
            v-for="([icon, title, route], index) in menus_admin"
            :key="index"
            @click="onClickMenu(route)"
          >
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>


        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

  </div>
</template>
<script>
import Menu from "@/components/core/Menu";
export default {
  data: () => ({
    drawer: false,
    group: null,
    selectedMenu: 0,
    menus_user: [
      ["mdi-apps-box", "Home", "/home"],
      ["mdi-chart-areaspline", "Job Openings", "/job"],
      ["mdi-login-variant", "Login", "/login"],
      ["mdi-file-table-box-multiple-outline", "About", "/about"],
    ],
    menus_admin: [
      ["mdi-apps-box", "Admin Home", "/home"],
    ],
    top_right_menu: [
      ["Home", "/stock"],
      ["Job", "/option_job"],
      ["Contact", "/about"],
    ],
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    onClickGoHome(link) {
      this.$router.push("home").catch((err) => {});
    },
    onClickMenu(link) {
      this.$router.push(link).catch((err) => {});
    },
    onClickLogOff() {
      this.$store.dispatch("doLogout");
    },
    onClickLogOffAdmin() {
      this.$store.dispatch("doLogoutAdmin");
    },
    onGoProfile(){
      this.$router.push("/profile").catch((err) => {});
    }
  },
};
</script>

<style scoped>
.v-list-item-group .v-list-item--active {
  color: #fff !important;
  font-weight: bold;
}
</style>
