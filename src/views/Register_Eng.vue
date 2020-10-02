<template>
  <v-container grid-list-xs>
    <v-form @submit.prevent="submit" ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>Form Register ( Engineer & Mangement )</v-toolbar-title>
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
                <!-- {{ applicant }} -->
                <v-row>
                  <!-- E-mail -->
                  <v-col class="d-flex" xl="4" lg="4" md="4" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.email"
                      type="email"
                      label="Email"
                      :rules="[
                        (v1) => !!v1 || 'Email is required',
                        (v2) =>
                          !!/^(([^<>()[\]\\.,;:\s@\&quot;]+(\.[^<>()[\]\\.,;:\s@\&quot;]+)*)|(\&quot;.+\&quot;))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                            v2
                          ) || 'Please Enter Email',
                      ]"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- Password -->
                  <v-col class="d-flex" xl="4" lg="4" md="4" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.password"
                      label="Password"
                      min="8"
                      :append-icon="
                        show_password ? 'visibility' : 'visibility_off'
                      "
                      @click:append="show_password = !show_password"
                      :type="show_password ? 'password' : 'text'"
                      :rules="[
                        (v1) => !!v1 || 'Password is required',
                        (v2) =>
                          !!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v2) ||
                          'Minimum eight characters, at least one letter and one number',
                      ]"
                      required
                    />
                  </v-col>


                  <!-- Confirm Password -->
                  <v-col class="d-flex" xl="4" lg="4" md="4" sm="12" cols="12">
                    <v-text-field
                      v-model="checkpassword"
                      label="Confirm Password"
                      min="8"
                      :append-icon="
                        show_password_con ? 'visibility' : 'visibility_off'
                      "
                      @click:append="show_password_con = !show_password_con"
                      :type="show_password_con ? 'password' : 'text'"
                      :rules="[
                        applicant.password === checkpassword ||
                          'Password must match',
                        (checkpassword) =>
                          !!checkpassword || 'Pleace Enter your Password',
                      ]"
                      required
                    />
                  </v-col>


                  <!-- TH prefix  -->
                  <v-col class="d-flex" xl="2" lg="2" md="3" sm="12" cols="12">
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
                  <v-col class="d-flex" xl="5" lg="5" md="4" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.th_firstname"
                      label="ชื่อ"
                      :rules="[(v1) => !!v1 || 'Please Enter TH First Name']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- TH lastname -->
                  <v-col class="d-flex" xl="5" lg="5" md="4" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.th_lastname"
                      label="นามสกุล"
                      :rules="[(v1) => !!v1 || 'Please Enter TH Last Name']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- EN prefix -->
                  <v-col class="d-flex" xl="2" lg="2" md="3" sm="12" cols="12">
                    <v-select
                      label="Prefix"
                      :items="data_eng_prefix"
                      v-model="applicant.eng_prefix"
                      :rules="[(v1) => !!v1 || 'Please Enter eng-prefix']"
                      outlined
                    ></v-select>
                  </v-col>

                  <!-- EN fristname -->
                  <v-col class="d-flex" xl="5" lg="5" md="4" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.eng_firstname"
                      label="Frist Name"
                      :rules="[(v1) => !!v1 || 'Please Enter  ENG First Name']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- EN lastname -->
                  <v-col class="d-flex" xl="5" lg="5" md="4" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.eng_lastname"
                      label="Last Name"
                      :rules="[(v1) => !!v1 || 'Please Enter ENG Last Name']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- Nationality -->
                  <!-- <v-col class="d-flex" xl="3" lg="6" md="6" sm="3" cols="12">
                      <v-text-field
                      v-model="applicant.nationality"
                      label="Nationality "
                      :rules="[(v1) => !!v1 || 'Please Select Your Nationality']"
                    >
                    </v-text-field>
                  </v-col> -->

                  <!-- Phone number -->
                  <v-col class="d-flex" xl="3" lg="6" md="6" sm="3" cols="12">
                    <v-text-field
                      v-model="applicant.phone_number"
                      label="Your Phone Number"
                      type="number"
                      min="0"
                      :rules="[(v1) => !!v1 || 'Please Enter Phone Number']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- Phone number  family-->
                  <v-col class="d-flex" xl="3" lg="6" md="6" sm="3" cols="12">
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
                  <v-col class="d-flex" xl="3" lg="6" md="6" sm="3" cols="12">
                    <v-text-field
                      v-model="applicant.person_relationship"
                      label="Relationship Ex. ( Father, Mother, Etc.)"
                      :rules="[(v1) => !!v1 || 'Pleace Enter Relationship']"
                    ></v-text-field>
                  </v-col>

                  <!-- Address -->
                  <v-col cols="12" md="6">
                    <v-textarea
                      label="Cerrently Address / ที่อยู่อาศัยปัจจุบัน"
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
                  <v-col class="d-flex" xl="4" lg="6" md="6" sm="12" cols="12">
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
                        v-model="applicant.date_birthday"
                        @input="date_menu = false"
                        ref="picker"
                        v-on:change="DateToAge(applicant.date_birthday)"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                      >
                      </v-date-picker>
                    </v-menu>
                  </v-col>

                  <!-- Age -->
                  <!-- <v-col class="d-flex" xl="1" lg="1" md="1" sm="1" cols="12">
                    <v-text-field
                      v-model="applicant.age"
                      label="Age"
                      readonly
                      sm
                    >
                    </v-text-field>
                  </v-col> -->
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
                      v-if="imageURL"
                      :src="imageURL"
                      style="height: 250px; width: 230px;"
                    />
                  </v-card>
                  </v-col>
                 <v-col class="d-flex" xl="5" lg="6" md="6" sm="12" cols="12">
                     <div>
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
                     </div>
                  </v-col>
                </v-row>


                 <v-row>
                  <!-- Degree -->
                  <v-col class="d-flex" xl="3" lg="3" md="6" sm="12" cols="12">
                    <v-select
                      v-model="applicant.degree_education"
                      :items="degree_item"
                      label="Degree Education"
                      :rules="[(v1) => !!v1 || 'Please Degree Education']"
                    >
                    </v-select>
                  </v-col>


                  <!-- Education -->
                  <v-col class="d-flex" xl="3" lg="4" md="6" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.education"
                      label="Education Name (Ex. Burapha University )"
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
                  <v-col class="d-flex" xl="2" lg="2" md="6" sm="12" cols="12">
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

                  <v-btn @click="changeTab(3)" class="primary">
                    Next
                  </v-btn>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-3">
            <v-card flat>
              <v-card-text>
                <h2 class="mt-2 mb-3">
                  Privacy policy/นโยบายความเป็นส่วนตัว
                </h2>

                <p class="mb-0">
                  นโยบายความเป็นส่วนตัวฉบับนี้มีผลบังคับใช้กับอุปกรณ์และบริการทั้งหมดของ
                  Samsung ตั้งแต่โทรศัพท์มือถือและแท็บเล็ต ไปจนถึงโทรทัศน์
                  เครื่องใช้ในบ้าน บริการออนไลน์ เว็บไซต์ แอปพลิเคชัน บริการ
                  การประกวดแข่งขัน การสำรวจ การแลกรับสิทธิ์ การทำการตลาด
                  การส่งเสริมการขาย การลงทะเบียนรับประกันสินค้า
                  บริการหลังการขายหรือบริการซ่อม และบริการอื่นของ Samsung
                  ที่อ้างถึงหรือเชื่อมโยงถึงนโยบายนี้ (เรียกรวมกันว่า “บริการ”
                  ของเรา) นอกจากนั้น
                  คุณจะต้องหมั่นตรวจสอบการปรับปรุงนโยบายความเป็นส่วนตัวฉบับนี้อย่างสม่ำเสมอ
                  นโยบายความเป็นส่วนตัวฉบับนี้อาจถูกปรับปรุงเป็นระยะๆเพื่อให้สอดคล้องกับการเปลี่ยนแปลงของแนวปฏิบัติด้านข้อมูลส่วนบุคคลซึ่งเกี่ยวกับบริการ
                  หรือการเปลี่ยนแปลงของกฎหมายที่เกี่ยวข้อง
                  เราจะประกาศในเว็บไซต์ของเราหรือในอุปกรณ์ของคุณเพื่อแจ้งล่วงหน้าเกี่ยวกับการเปลี่ยนแปลงที่สำคัญในนโยบายความเป็นส่วนตัว
                  และจะระบุวันที่อัปเดตครั้งล่าสุดไว้ที่ด้านบน
                  คุณจะสามารถดูเวอร์ชันที่เป็นปัจจุบันที่สุดของนโยบายความเป็นส่วนตัวได้ที่นี่เสมอ:
                  https://account.samsung.com/membership/pp
                </p>

                <!-- accept -->
                <v-row>
                  <v-checkbox
                    v-model="checked_ac"
                    class="ml-2"
                    label="Accept"
                    type="checkbox"
                    small
                    :rules="[(v1) => !!v1 || 'Pleace Accept Privacy Policy']"
                  >
                  </v-checkbox>
                </v-row>

                <!-- submit -->
                <v-row>
                  <v-spacer></v-spacer>

                  <v-btn @click="changeTab(2)" class="mr-3">
                    Back
                  </v-btn>

                  <v-btn
                    class="success mr-3"
                    type="submit"
                  >
                    Submit
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

          <!-- <v-btn
            color="green darken-1"
            text
            @click="dialog_messenger.status = false"
          >
            Disagree
          </v-btn> -->

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

    <v-dialog
      v-model="dialog_load.status"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
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
      imageURL: null,
      resumeURL: null,
      job_level: null,
      job_position: "",
      job_salary: "", 
      degree_education:"",
      education:"",
      majoy_education:"",
      gpa:"",
      role:"Engineer"
    },
    checked_ac: false,
    data_th_prefix: ["นาย", "นาง", "นางสาว"],
    data_eng_prefix: ["Mr.", "Mrs.", "Miss"],
    degree_item: ["Bachelor Degree", "Master Degree" ,"Doctor Degree"],
    data_level: ["Office/Engineer", "Management"],
    data_position: [],
    show_password: true,
    show_password_con: true,
    valid: true,
    checkpassword: "",
    date_menu: false, //for date
    imageURL: "https://www.flaticon.com/svg/static/icons/svg/848/848043.svg",
    CountryList: ["Thailand"],
    message_filename_pic: "Upload Picture",
    message_filename_resume: " Upload Resume / CV",
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
      {
        id: 3,
        icon: "mdi-clipboard-check-outline",
        name: "FORM 3",
        href_tab: "#tab-3",
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
  async mounted(){
    const depart_list =  await api.getOnlydepart();
    this.data_position = depart_list
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
      if (_size < 10485760 && (_file_type == "png" || _file_type == "jpg" || _file_type == "jpeg" || _file_type == "PNG" || _file_type == "JPG")
      ) {
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
      if (_size < 10485760 && (_file_type == "pdf" || _file_type == "docx" || _file_type == "doc" ||  _file_type == "png" || _file_type == "PNG")) 
      {
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
      if (link == "/login") {
        this.$router.push(link).catch((err) => {});
      }
    },
    async submit() {


      var check = this.$refs.form.validate();

      if (this.applicant.imageURL == null || this.applicant.resumeURL == null) 
      {
        check = false;
      } else {
        check = true;
      }
          
      if (check) {

        let formData = new FormData();
        
        await Object.keys(this.applicant).forEach((key) =>
           formData.append(key, this.applicant[key])
        );

          this.dialog_load.status = true;
        
        if (await api.register(formData)) {
          this.dialog_load.status = false;
          this.dialog_messenger.text = "Complete GO Login";
          this.dialog_messenger.sub_text = "";
          this.dialog_messenger.status = true;
          this.dialog_messenger.router = "/login";
        } else {
          this.dialog_messenger.text = "Please Check Your E-mail is Used";
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
