<template>
  <v-container grid-list-xs>
    <v-card class="mb-1">
      <v-row>
        <v-col class="d-flex" xl="9" lg="8" md="7" sm="12" cols="12">
            <h1 class="ml-6" ><v-icon large  class="mb-2">mdi-file-account-outline</v-icon>Information Profile</h1>
        </v-col>
        <v-col  class="d-flex"  xl="2" lg="2" md="2" sm="12" cols="12">
                <v-btn
                  color="warning"
                  class="white--text ma-1"
                  @click="go_update"
                >
                  Update FORM
                  <v-icon right dark>mdi-file-document</v-icon>

                </v-btn> 

                  <v-btn
                  color="info"
                  class="white--text ma-1"
                  @click="go_quiz"
                >
                  QUIZ
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
            <v-card class="mx-auto" width="230px" height="250px">
              <img
                :src="getProfileImage()"
                style="height: 250px; width: 230px;"
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
                  :value="getDateFormat(applicant.date_birthday)"
                  label="Birthday"
                  prepend-icon="event"
                  readonly
                >
                </v-text-field>

                <v-text-field
                  :value="getEducation()"
                  label="Degress / Education"
                  prepend-icon="mdi-medal"
                  readonly
                >
                </v-text-field>

                
                <v-text-field
                  :value="getMojorGPA()"
                  label="Major / GPA"
                  prepend-icon="mdi-card-bulleted-outline"
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
                <h3>Contact</h3>
              </v-card-title>

              <v-card-text class="headline font-weight-bold">
                <v-text-field
                  v-model="applicant.email"
                  label="Email"
                  prepend-icon="mdi-email-box"
                  readonly
                >
                </v-text-field>

                <v-text-field
                  v-model="applicant.phone_number"
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
                
                <v-textarea
                  class="mt-2"
                  v-model="applicant.eng_address"
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

          <v-col class="d-flex d-xl-none"  lg="3" md="12" sm="12" cols="12">
               
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
                  v-model="applicant.job_salary"
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
      applicant: {
      email: "",
      password: "",
      th_prefix: "",
      th_firstname: "",
      th_lastname: "",
      eng_prefix: "",
      eng_firstname: "",
      eng_lastname: "",
      nationality: "",
      phone_number: "",
      phone_number_famaily: "",
      person_relationship: "",
      eng_address: "",
      date_birthday: null,
      age: "",
      imageURL: "samsung-icon.png",
      resumeURL: null,
      job_level: null,
      job_position: "",
      job_salary: "", 
      education:"",
      degree_education:"",
      majoy_education:"",
      gpa:""
    },
  }),
  async mounted() {
    if (api.isLoggedIn() && (api.getRole() != "Admin"))
    {
        let result = await api.readProfile();
        this.applicant = result;
    }else if(api.isLoggedInAdmin() && (api.getRoleAdmin() == "Admin")){
        this.$router.push("/admin_home");
    }
    else{
      this.$router.push("/login");
    }
  },
  methods: {
    getProfileImage() {
      return `${imageUrl}/${this.applicant.imageURL}`;
      // return this.$options.filters.imageUrl(this.profile_data.imageURL);
    },
    getProfileResume() {
      return `${resumeUrl}/${this.applicant.resumeURL}`;
      // return this.$options.filters.resumeUrl(this.profile_data.resumeURL);
    },
    getDateFormat(date_iso) {
      var date = new Date(date_iso);
      var real_day = moment(date).format("ddd, ll");
      return real_day + " / Age : " + this.applicant.age;
    },
    getFullName_eng() {
      let full_ENG_name =
        this.applicant.eng_prefix +
        " " +
        this.applicant.eng_firstname +
        " " +
        this.applicant.eng_lastname;
      return full_ENG_name;
    },
    getFullName_th() {
      let full_TH_name =
        this.applicant.th_prefix +
        " " +
        this.applicant.th_firstname +
        " " +
        this.applicant.th_lastname;
      return full_TH_name;
    },
    getPhone_Fmaliy() {
      let phone_fmaliy =
        this.applicant.phone_number_famaily +
        " " +
        "(" +
        this.applicant.person_relationship +
        ")";
      return phone_fmaliy;
    },
    getLevelandPosition() {
      let level_position =
        this.applicant.job_level + " : " + this.applicant.job_position.dep_name;
      return level_position;
    },
    getEducation(){
      let education = this.applicant.degree_education+ " : " + this.applicant.education;
      return education; 
    },
    getMojorGPA(){
      let education = this.applicant.majoy_education+ " / GPA : " + this.applicant.gpa;
      return education; 
    },
     go_update() {
      this.$router.push('/profile_update');
    },
     go_quiz() {
       let position_id = this.applicant.job_position._id;
       this.$router.push(`/user_doing_list/${position_id}`); 
    },
  },
};
</script>
