<template>
  <v-container grid-list-xs>
    <v-card class="mb-2">
      <v-row>
        <v-col class="d-flex" xl="12" lg="3" md="12" sm="12" cols="12">
            <h1 class="ma-2"><v-icon large  class="mb-2">mdi-file-account-outline</v-icon>Information Profile</h1>
            <v-spacer></v-spacer>
             <v-spacer></v-spacer>

                <v-btn
                  color="warning"
                  class="mt-3 mr-2 white--text"
                  @click="go_update"
                >
                  Update Form
                  <v-icon right dark>mdi-file-document</v-icon>
                </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-card>
      <v-card-title class="headline">
        <!-- {{profile_data}} -->
        <v-row>
          <v-col class="d-flex" xl="2" lg="3" md="12" sm="12" cols="12">
            <v-card class="mx-auto" width="250px" height="250px">
              <img
                :src="getProfileImage()"
                style="height: 250px; width: 250px;"
              />
            </v-card>
          </v-col>

          <v-col class="d-flex" xl="3" lg="4" md="12" sm="12" cols="12">
            <v-card width="100%">
              <v-card-title>
                <v-icon large left color="black">
                  mdi-badge-account-horizontal-outline
                </v-icon>
                <h3>Profile</h3>
              </v-card-title>

              <v-card-text class="headline font-weight-bold">
                <v-text-field
                  :value="getFullName_eng()"
                  label="Name ENG"
                  prepend-icon="mdi-rename-box"
                  readonly
                >
                </v-text-field>

                <v-text-field
                  :value="getFullName_th()"
                  label="Name TH"
                  prepend-icon="mdi-rename-box"
                  readonly
                >
                </v-text-field>

                <v-text-field
                  :value="getDateFormat(profile_data.date_birthday)"
                  label="Birthday"
                  prepend-icon="event"
                  readonly
                >
                </v-text-field>

                <v-textarea
                  v-model="profile_data.eng_address"
                  label="Address / ที่อยู่อาศัย"
                  readonly
                  outlined
                  rows="3"
                  row-height="25"
                  shaped
                ></v-textarea>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col class="d-flex" xl="3" lg="4" md="12" sm="12" cols="12">
            <v-card width="100%">
              <v-card-title>
                <v-icon large left color="black">
                  mdi-card-account-phone
                </v-icon>
                <h3>Contact</h3>
              </v-card-title>

              <v-card-text class="headline font-weight-bold">
                <v-text-field
                  v-model="profile_data.email"
                  label="Email"
                  prepend-icon="mdi-email-box"
                  readonly
                >
                </v-text-field>

                <v-text-field
                  v-model="profile_data.phone_number"
                  label="Phone"
                  prepend-icon="mdi-rename-box"
                  readonly
                >
                </v-text-field>

                <v-text-field
                  :value="getPhone_Fmaliy()"
                  label="Phone Family"
                  prepend-icon="mdi-cellphone"
                  readonly
                >
                </v-text-field>


              </v-card-text>
            </v-card>
          </v-col>

          <v-col class="d-flex" xl="3" lg="4" md="12" sm="12" cols="12">
            <v-card width="100%">
              <v-card-title>
                <v-icon large left color="black">
                  mdi-card-account-phone
                </v-icon>
                <h3>Resume / CV</h3>
              </v-card-title>

              <v-card-text class="headline font-weight-bold">
                <v-text-field
                  :value="getLevelandPosition()"
                  label="Level / Position"
                  prepend-icon="mdi-tablet-dashboard"
                  readonly
                >
                </v-text-field>

                <v-text-field
                  v-model="profile_data.job_salary"
                  label="Salary ( Bath ) "
                  prepend-icon="mdi-bitcoin"
                  readonly
                >
                </v-text-field>

                <v-btn
                  color="primary"
                  class="ma-2 white--text"
                  :href="getProfileResume()"
                  target="_blank"
                  download
                >
                  Resume
                  <v-icon right dark>mdi-file-document</v-icon>
                </v-btn>
                
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-title>

      <!-- <v-card-actions>
        <v-btn text>Listen Now</v-btn>
      </v-card-actions> -->
    </v-card>
  </v-container>
</template>
<script>
import api from "@/services/api";
import { imageUrl } from "@/services/constants";
import { resumeUrl } from "@/services/constants";
import moment from "moment";
export default {
  data: () => ({
    profile_data: {imageURL: "samsung-icon.png"},
  }),
  async mounted() {
    let result = await api.readProfile();
    this.profile_data = result;
  },
  methods: {
    getProfileImage() {
      return `${imageUrl}/${this.profile_data.imageURL}`;
      // return this.$options.filters.imageUrl(this.profile_data.imageURL);
    },
    getProfileResume() {
      return `${resumeUrl}/${this.profile_data.resumeURL}`;
      // return this.$options.filters.resumeUrl(this.profile_data.resumeURL);
    },
    getDateFormat(date_iso) {
      var date = new Date(date_iso);
      var real_day = moment(date).format("ddd, ll");
      return real_day + " / Age : " + this.profile_data.age;
    },
    getFullName_eng() {
      let full_ENG_name =
        this.profile_data.eng_prefix +
        " " +
        this.profile_data.eng_firstname +
        " " +
        this.profile_data.eng_lastname;
      return full_ENG_name;
    },
    getFullName_th() {
      let full_TH_name =
        this.profile_data.th_prefix +
        " " +
        this.profile_data.th_firstname +
        " " +
        this.profile_data.th_lastname;
      return full_TH_name;
    },
    getPhone_Fmaliy() {
      let phone_fmaliy =
        this.profile_data.phone_number_famaily +
        " " +
        "(" +
        this.profile_data.person_relationship +
        ")";
      return phone_fmaliy;
    },
    getLevelandPosition() {
      let level_position =
        this.profile_data.job_level + " : " + this.profile_data.job_position;
      return level_position;
    },
     go_update() {
      this.$router.push('/profile_update');
    },
  },
};
</script>
