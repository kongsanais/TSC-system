<template>
  <v-container grid-list-xs>

    <v-card class="mb-2">
      <v-row>
        <v-col class="d-flex" xl="9" lg="8" md="7" sm="12" cols="12">
          <h1 class="ml-6">
            <v-icon large class="mb-2">mdi-file-account-outline</v-icon
            >Information Profile [ Engineer & Management ]
          </h1>
        </v-col>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn class="ma-5" @click="$router.go(-1)">
          Back
          <v-icon right dark>mdi-file-document</v-icon>
        </v-btn>
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

                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="ma-2"
                      tile
                      outlined
                      :color="color_status"
                      v-bind="attrs"
                      v-on="on"
                    >
                     <v-icon left>mdi-pencil</v-icon>
                      {{ text_status }}
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Update Register Status</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col>
                            <v-select
                              :items="['Waitting', 'HR Consider', 'Interview', 'Hiring', 'Fail']"
                              v-model="applicant.reg_status"
                              label="Register Status"
                            >
                            </v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false"
                        >Close</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="go_update_status()"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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

          <v-col class="d-flex d-xl-none" lg="3" md="12" sm="12" cols="12">
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
                 

                <div  class="mt-5"  style="color: #212121;"> 
                <v-icon large left color="black">
                 mdi-format-float-right
                </v-icon>Scores Quiz
                
                <ul class="mt-2">
                     <h6><li v-for="(item,index) in applicant.score_quiz" :key="index">
                    {{ item.quiz_id.quiz_name | capitalize}} : {{ item.score_data }} / {{item.score_full}} 
                    <!-- {{item.quiz_id._id}} -->
                    <v-btn class="ma-2" color="green" @click="show_ans_history(item.quiz_id._id,$route.params._id)" small>result quiz</v-btn>
                    </li></h6>
                </ul>
                </div>

              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-title>
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
      _id: "",
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
      education: "",
      degree_education: "",
      majoy_education: "",
      gpa: "",
      reg_status: "",
    },
    color_status: "",
    text_status:"",
    dialog: false,
  }),
  async mounted() {
    let result = await api.getOneApplicant(this.$route.params._id);
    this.applicant = result;
    this.check_color_status();
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
      let phone_fmaliy = this.applicant.phone_number_famaily +" " +"(" + this.applicant.person_relationship +")";
      return phone_fmaliy;
    },
    getLevelandPosition() {
      let level_position = this.applicant.job_level + " : " + this.applicant.job_position.dep_name;
      return level_position;
    },
    getEducation() {
      let education = this.applicant.degree_education + " : " + this.applicant.education;
      return education;
    },
    getMojorGPA() {
      let education = this.applicant.majoy_education + " / GPA : " + this.applicant.gpa;
        return education;
    },
    async go_update_status() {
       this.dialog = false;
       let update_status = this.applicant.reg_status;
       let update_id  = this.$route.params._id;
       let result = await api.updateRegStatus({ update_status, update_id });
       if(result){
         //set text status //
           this.applicant.reg_status = update_status
           this.check_color_status()
       }
    },
    check_color_status() {
      if (this.applicant.reg_status == "Waitting") {
        this.color_status = "#f39c12";
      } else if (this.applicant.reg_status == "HR Consider") {
        this.color_status = "#3F51B5";
      } else if (this.applicant.reg_status == "Interview") {
        this.color_status = "#00c0ef";
      } else if (this.applicant.reg_status == "Hiring") {
        this.color_status = "green";
      } else if (this.applicant.reg_status == "Fail") {
        this.color_status = "red";
      }

      this.text_status = this.applicant.reg_status;
    },
    show_ans_history(quiz_id ,user_id){
      this.$router.push(`/quiz_ans_history/${quiz_id}/${user_id}`);
    }
  },
};
</script>
