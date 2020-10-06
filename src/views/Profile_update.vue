<template>
  <v-container grid-list-xs>
    <v-form @submit.prevent="submit" ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>Update Form Register</v-toolbar-title>
        </v-toolbar>
        <v-tabs v-model="tab" vertical>
          <v-tab
            class="mr-2 d-none d-sm-flex disabledTab"
            v-for="tab in tabs"
            :key="tab.id"
            :href="tab.href_tab"
            exact
          >
            <v-icon left>{{ tab.icon }}</v-icon>
            {{ tab.name }}
          </v-tab>

          <v-tab-item value="tab-1">
            <v-card flat>
              <v-card-text>
                <!-- {{applicant}} -->
                <v-row>
                  <!-- TH prefix  -->
                  <v-col class="d-flex" xl="2" lg="2" md="2" sm="12" cols="12">
                    <v-select
                      :items="data_th_prefix"
                      v-model="applicant.th_prefix"
                      label="คำนำหน้า"
                      :rules="[(v1) => !!v1 || 'Please Select TH First Name']"
                      outlined
                    >
                    </v-select>
                  </v-col>

                  <!-- TH fristname -->
                  <v-col class="d-flex" xl="5" lg="5" md="5" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.th_firstname"
                      label="ชื่อ"
                      :rules="[(v1) => !!v1 || 'Please Enter TH First Name']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- TH lastname -->
                  <v-col class="d-flex" xl="5" lg="5" md="5" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.th_lastname"
                      label="นามสกุล"
                      :rules="[(v1) => !!v1 || 'Please Enter TH Last Name']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- EN prefix -->
                  <v-col class="d-flex" xl="2" lg="2" md="2" sm="12" cols="12">
                    <v-select
                      label="Prefix"
                      :items="data_eng_prefix"
                      v-model="applicant.eng_prefix"
                      :rules="[(v1) => !!v1 || 'Please Enter eng-prefix']"
                      outlined
                    ></v-select>
                  </v-col>

                  <!-- EN fristname -->
                  <v-col class="d-flex" xl="5" lg="5" md="5" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.eng_firstname"
                      label="Frist Name"
                      :rules="[(v1) => !!v1 || 'Please Enter  ENG First Name']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- EN lastname -->
                  <v-col class="d-flex" xl="5" lg="5" md="5" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.eng_lastname"
                      label="Last Name"
                      :rules="[(v1) => !!v1 || 'Please Enter ENG Last Name']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- Nationality -->
                  <!-- <v-col class="d-flex" xl="3" lg="3" md="6" sm="3" cols="12">
                    <v-text-field
                      v-model="applicant.nationality"
                      :items="CountryList"
                      label="Nationality"
                      :rules="[
                        (v1) => !!v1 || 'Please Select Your Nationality',
                      ]"
                    ></v-text-field>
                  </v-col> -->

                  <!-- Phone number -->
                  <v-col class="d-flex" xl="3" lg="3" md="6" sm="3" cols="12">
                    <v-text-field
                      v-model="applicant.phone_number"
                      label="Your Phone Number"
                      type="number"
                      min="0"
                      :rules="[(v1) => !!v1 || 'Please Enter Phone Number']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- Phone number family-->
                  <v-col class="d-flex" xl="3" lg="3" md="6" sm="3" cols="12">
                    <v-text-field
                      v-model="applicant.phone_number_famaily"
                      label="Phone Number Family"
                      type="number"
                      min="0"
                      :rules="[(v1) => !!v1 || 'Please Enter Phone Number']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- Relationship -->
                  <v-col class="d-flex" xl="3" lg="3" md="6" sm="3" cols="12">
                    <v-text-field
                      v-model="applicant.person_relationship"
                      label="Relationship"
                      :rules="[(v1) => !!v1 || 'Pleace Select Relationship']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- Address -->
                  <v-col cols="12" md="6">
                    <v-textarea
                      label="Address / ที่อยู่อาศัย"
                      auto-grow
                      outlined
                      rows="3"
                      row-height="25"
                      v-model="applicant.eng_address"
                      :rules="[(v1) => !!v1 || 'Pleace Enter your Address']"
                      shaped
                    ></v-textarea>
                  </v-col>

                  <!--  Birthday  -->
                  <v-col class="d-flex" xl="4" lg="4" md="6" sm="12" cols="12">
                    <v-menu
                      ref="date_menu"
                      v-model="date_menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="applicant.date_birthday"
                          label="Your Birthday"
                          prepend-icon="event"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :rules="[
                            (v1) => !!v1 || 'Pleace Enter your birthday',
                          ]"
                        >
                        </v-text-field>
                      </template>

                      <v-date-picker
                        v-model="date_temp"
                        @input="date_menu = false"
                        ref="picker"
                        v-on:change="DateToAge(applicant.date_birthday)"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                      >
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <v-row>
                  <v-spacer></v-spacer>
                  <v-btn class="primary mr-3" @click="changeTab(2)">
                    Next
                  </v-btn>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-2">
            <v-card flat>
              <v-card-text>
                <v-row>
                  <!-- Review imgage -->
                  <v-col class="d-flex" xl="2" lg="4" md="4" sm="12" cols="12">
                    <v-card class="mx-auto" width="230px" height="250px">
                      <img
                        :src="getProfileImage()"
                        style="height: 250px; width: 230px;"
                      />
                    </v-card>
                  </v-col>

                  <!-- upload img file input and resume -->
                  <v-col class="d-flex" xl="5" lg="5" md="6" sm="12" cols="12">
                    <v-card outlined>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="headline mb-6"
                            >Update Document</v-list-item-title
                          >
                          <v-list-item-subtitle>
                            <!--btn upload profile picture-->
                            <v-btn
                              class="mt-1 mr-2"
                              color="#"
                              @click="$refs.inputUpload_img.click()"
                              v-model="message_filename_pic"
                            >
                              <!-- i-con in btn -->
                              <v-icon class="mr-2">mdi-cloud-upload</v-icon>
                              {{ message_filename_pic }}
                            </v-btn>

                            <!-- i-con check  if -->
                            <v-icon
                              v-if="applicant.imageURL == null"
                              color="warning"
                              class="mdi mdi-36px"
                            >
                              mdi-alert-circle-outline
                            </v-icon>

                            <v-icon v-else color="success" class="mdi mdi-36px"
                              >mdi-check-circle-outline</v-icon
                            >

                            <!-- input file for upload  -->
                            <input
                              type="file"
                              style="display: none"
                              ref="inputUpload_img"
                              @change="onFile_img"
                              :rules="[(v1) => !!v1 || 'Please Upload Picture']"
                            />

                            <br />

                            <!-- btn upload resume/cv -->
                            <v-btn
                              class="mt-3 mr-1"
                              depressed
                              color="#"
                              @click="$refs.inputUpload_resume.click()"
                              v-model="message_filename_resume"
                            >
                              <!-- i-con in btn -->
                              <v-icon class="mr-2">mdi-cloud-upload</v-icon>
                              {{ message_filename_resume }}
                            </v-btn>

                            <!-- i-con check  if -->
                            <v-icon
                              v-if="applicant.resumeURL == null"
                              color="warning"
                              class="mdi mdi-36px mt-3"
                              >mdi-alert-circle-outline</v-icon
                            >
                            <v-icon v-else color="success" class="mdi mdi-36px"
                              >mdi-check-circle-outline</v-icon
                            >

                            <!-- input file for upload  -->
                            <input
                              type="file"
                              style="display: none"
                              ref="inputUpload_resume"
                              @change="onFile_resume"
                              :rules="[
                                (v1) => !!v1 || 'Please Upload Resume / CV',
                              ]"
                            />

                            <br />

                            <v-btn
                              color="primary"
                              class="mt-2 white--text"
                              :href="getProfileResume()"
                              target="_blank"
                            >
                              Resume
                              <v-icon right dark>mdi-file-document</v-icon>
                            </v-btn>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </v-col>
                </v-row>


                <v-row>

                    <!-- Degree -->
                  <v-col class="d-flex" xl="3" lg="4" md="4" sm="12" cols="12">
                    <v-select
                      v-model="applicant.degree_education"
                      :items="degree_item"
                      label="Degree Education"
                      :rules="[(v1) => !!v1 || 'Please Degree Education']"
                    >
                    </v-select>
                  </v-col>

                  <!-- Education -->
                  <v-col class="d-flex" xl="3" lg="4" md="4" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.education"
                      label="Education"
                      :rules="[(v1) => !!v1 || 'Please Enter Education']"
                    >
                    </v-text-field>
                  </v-col>


                 <!-- Major -->
                  <v-col class="d-flex" xl="2" lg="3" md="6" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.majoy_education"
                      label="Major"
                      :rules="[(v1) => !!v1 || 'Please Enter Major']"
                    >
                    </v-text-field>
                  </v-col>



                  <!-- Gpa -->
                  <v-col class="d-flex" xl="3" lg="4" md="4" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.gpa"
                      label="GPA"
                      type="number"
                      min="0"
                      :rules="[(v1) => !!v1 || 'Please Enter GPA']"
                    >
                    </v-text-field>
                  </v-col>

                </v-row>



                <v-row>
                  <!-- Level -->
                  <v-col class="d-flex" xl="3" lg="4" md="4" sm="12" cols="12">
                    <v-select
                      v-model="applicant.job_level"
                      :items="data_level"
                      label="Level"
                      :rules="[(v1) => !!v1 || 'Please Select Level']"
                    >
                    </v-select>
                  </v-col>

                    <!-- Position -->
                  <v-col class="d-flex" xl="3" lg="4" md="4" sm="12" cols="12">
                    <v-select
                       v-model="applicant.job_position"
                       :items="data_position"
                       item-text="dep_name"
                       item-value="_id"
                      label="Position"
                      :rules="[(v1) => !!v1 || 'Please Select Position']"
                      disabled
                    >
                    </v-select>
                  </v-col>

                   <!-- Salary -->
                   <v-col class="d-flex" xl="3" lg="4" md="4" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.job_salary"
                      label="Salary (Bath)"
                      type="number"
                      min="0"
                      :rules="[(v1) => !!v1 || 'Please Enter Salary']"
                    >
                    </v-text-field>
                  </v-col>


                </v-row>



                <v-row>
                  <v-spacer></v-spacer>
                  <v-btn @click="changeTab(1)" class="mr-3">
                    Back
                  </v-btn>

                  <v-btn class="warning mr-3" type="submit">
                    Update Form
                  </v-btn>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-form>

    <v-dialog v-model="dialog_messenger.status" persistent max-width="480">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          {{ dialog_messenger.title }}
          <v-icon color="warning" class="mdi mdi-36px ml-2">
            mdi-alert-circle-outline
          </v-icon>
        </v-card-title>

        <v-card-text class="mt-3 pd-0">
          <h2 class="mb-3">{{ dialog_messenger.text }}</h2>
          <h3>
            <p><span v-html="dialog_messenger.sub_text"></span></p>
          </h3>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            class="primary"
            light
            text
            @click="onClickMenu(dialog_messenger.router)"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_load.status" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import api from "@/services/api";
import { imageUrl } from "@/services/constants";
import { resumeUrl } from "@/services/constants";
import moment from "moment";
export default {
  data: () => ({
    date_temp: null,
    applicant: { 
    imageURL: "samsung-icon.png",
    },
    checked_ac: false,
    data_th_prefix: ["นาย", "นาง", "นางสาว"],
    data_eng_prefix: ["Mr", "Mrs", "Miss"],
    data_Relationship: [
      "Father",
      "Mother",
      "Grandfather",
      "Grandmather",
      "Other",
    ],
    degree_item: ["Bachelor Degrees", "Master Degrees" ,"Doctor Degrees"],
    data_level: ["Office/Engineer", "Management"],
    data_position: [],
    show_password: true,
    show_password_con: true,
    valid: true,
    checkpassword: "",
    date_menu: false, //for date
    imageURL: null,
    CountryList: ["Thailand"],
    message_filename_pic: "Upload  Profile Picture",
    message_filename_resume: " Upload  Resume / CV",
    tab: "tab-1",
    tabs: [
      {
        id: 1,
        icon: "mdi-account",
        name: "FORM 1",
        href_tab: "#tab-1",
      },
      {
        id: 2,
        icon: "mdi-clipboard-file-outline",
        name: "FORM 2",
        href_tab: "#tab-2",
      },
    ],
    dialog_messenger: {
      status: false,
      title: "Message",
      text: "",
      sub_text: "",
      router: "",
    },
    dialog_load: {
      status: false,
      title: "Message",
      text: "",
      sub_text: "",
      router: "",
    },
  }),
  async mounted() {
    if (!api.isLoggedIn()) {
      this.$router.push("/login");
    }
    let result = await api.readProfile();
    this.applicant = result;
    this.applicant.job_position =  result.job_position._id
    const depart_list =  await api.getOnlydepart();
    this.data_position = depart_list
    
    //set date
    var date = new Date(this.applicant.date_birthday);
    this.applicant.date_birthday = date.toISOString().substring(0, 10);
  },
  methods: {
    DateToAge: function(bdate) {
      var today = new Date();
      var birthDate = new Date(bdate);
      var person_age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        person_age--;
      }
      //check value//
      if (person_age == 0 || person_age < 0) {
        person_age = 0;
      }
      this.applicant.date_birthday = this.date_temp;
      this.applicant.age = person_age;
    },
    onFile_img(event) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // for preview get img
        this.imageURL = event.target.result;
      };
      //get file size //
      var _size = event.target.files[0].size;
      var _name = event.target.files[0].name;
      var _file_type = _name.split(".").pop();
      var fSExt = new Array("Bytes", "KB", "MB", "GB"),
        i = 0;
      while (_size > 900) {
        _size /= 1024;
        i++;
      }
      var exactSize = Math.round(_size * 100) / 100 + " " + fSExt[i];
      //console.log("FILE SIZE = ", exactSize);
      //check file type and type file //
      //10mb
      if (_size < 10485760 && (_file_type == "png" || _file_type == "jpg" || _file_type == "jpeg" || _file_type == "PNG" || _file_type == "JPG")) {
        reader.readAsDataURL(event.target.files[0]);
        // for upload
        this.applicant.imageURL = event.target.files[0];
        this.message_filename_pic = _name + "(" + exactSize + ")";
      } else {
        this.dialog_messenger.text = "Please Check Image Size and File Type";
        this.dialog_messenger.sub_text =
          "- Image Size < 10 mb <br> - Image Should be .PNG  .JPG   .JPEG ";
        this.dialog_messenger.status = true;

        this.applicant.imageURL = null;
      }
    },
    onFile_resume(event) {
      const reader = new FileReader();
      //get file size //
      var _size = event.target.files[0].size;
      var _name = event.target.files[0].name;
      var _file_type = _name.split(".").pop();
      var fSExt = new Array("Bytes", "KB", "MB", "GB"),
        i = 0;
      while (_size > 900) {
        _size /= 1024;
        i++;
      }
      var exactSize = Math.round(_size * 100) / 100 + " " + fSExt[i];
      //console.log("FILE SIZE = ", exactSize);
      //check file type and type file //
      if (
        _size < 10485760 &&
        (_file_type == "pdf" ||
          _file_type == "docx" ||
          _file_type == "doc" ||
          _file_type == "png")
      ) {
        reader.readAsDataURL(event.target.files[0]);
        // for upload
        this.applicant.resumeURL = event.target.files[0];
        this.message_filename_resume = _name + "(" + exactSize + ")";
      } else {
        this.dialog_messenger.text = "Please Check Resume Size and File Type";
        this.dialog_messenger.sub_text =
          "- Resume Size < 10 mb <br> - Resume/CV Should be .PDF  .DOC   .DOCX  .PNG";
        this.dialog_messenger.status = true;
        this.applicant.resumeURL = null;
      }
    },
    changeTab(tabString) {
      this.tab = "tab-" + tabString;
    },
    onClickMenu(link) {
      this.dialog_messenger.status = false;
      if (link == "/profile") {
        this.$router.push(link).catch((err) => {});
      }
    },
    getProfileImage() {
      if (this.imageURL != null) {
        return this.imageURL;
      } else {
        return `${imageUrl}/${this.applicant.imageURL}`;
      }
    },
    getProfileResume() {
      return `${resumeUrl}/${this.applicant.resumeURL}`;
    },
    getDateFormat(date_iso) {
      var date = new Date(date_iso);
      var real_day = moment(date).format("ddd, ll");
      return real_day;
    },
    async submit() {
      var check;

      if (this.applicant.imageURL == null || this.applicant.resumeURL == null) {
        check = false;
      } else {
        check = true;
      }

      check = this.$refs.form.validate();
      if (check) {
        let formData = new FormData();

        Object.keys(this.applicant).forEach((key) =>
          formData.append(key, this.applicant[key])
        );

        this.dialog_load.status = true;
        if (await api.updateProfile(formData)) {
          this.dialog_load.status = false;
          this.dialog_messenger.text = "Your Profile Update";
          this.dialog_messenger.sub_text = "";
          this.dialog_messenger.status = true;
          this.dialog_messenger.router = "/profile";
        } else {
          this.dialog_load.status = false;
          this.dialog_messenger.text = "Someting Error";
          this.dialog_messenger.sub_text = "";
          this.dialog_messenger.status = true;
        }
      } else {
        this.dialog_messenger.text = "Please Check Your Information";
        this.dialog_messenger.sub_text = "";
        this.dialog_messenger.status = true;
      }
    },
  },
  watch: {
    date_menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
};
</script>

<style scoped>
.disabledTab {
  /* pointer-events: none; */
}
</style>
