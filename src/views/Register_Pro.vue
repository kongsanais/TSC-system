<template>
  <v-container grid-list-xs>
    <v-form @submit.prevent="submit" ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>แบบฟอร์มสมัครงาน ( ฝ่ายผลิต )</v-toolbar-title>
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
                  <!-- <v-col class="d-flex" xl="4" lg="4" md="3" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.email"
                      type="email"
                      label="อีเมล"
                      :rules="[
                        (v1) => !!v1 || 'โปรดใส่ อีเมล ',
                        (v2) =>
                          !!/^(([^<>()[\]\\.,;:\s@\&quot;]+(\.[^<>()[\]\\.,;:\s@\&quot;]+)*)|(\&quot;.+\&quot;))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                            v2
                          ) || 'ตรวจสอบอีเมล',
                      ]"
                    >
                    </v-text-field>
                  </v-col> -->

                  <!-- Password -->
                  <!-- <v-col class="d-flex" xl="4" lg="4" md="3" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.password"
                      label="รหัสผ่าน"
                      min="8"
                      :append-icon="
                        show_password ? 'visibility' : 'visibility_off'
                      "
                      @click:append="show_password = !show_password"
                      :type="show_password ? 'password' : 'text'"
                      :rules="[
                        (v1) => !!v1 || 'โปรดใส่ รหัสผ่าน',
                        (v2) =>
                          !!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v2) ||
                          'รหัสผ่านต้องมากว่า 8 ตัว และ มีตัวอักษรกับตัวเลข',
                      ]"
                      required
                    />
                  </v-col> -->

                  <!-- Confirm Password -->
                  <!-- <v-col class="d-flex" xl="4" lg="4" md="3" sm="12" cols="12">
                    <v-text-field
                      v-model="checkpassword"
                      label="ยืนยันรหัสผ่าน"
                      min="8"
                      :append-icon="
                        show_password_con ? 'visibility' : 'visibility_off'
                      "
                      @click:append="show_password_con = !show_password_con"
                      :type="show_password_con ? 'password' : 'text'"
                      :rules="[
                        applicant.password === checkpassword ||
                          'รหัสผ่านไม่ตรงกัน',
                        (checkpassword) =>
                          !!checkpassword || 'โปรดใส่ รหัสผ่าน',
                      ]"
                      required
                    />
                  </v-col> -->

                  <!-- TH prefix  -->
                  <v-col class="d-flex" xl="2" lg="3" md="3" sm="12" cols="12">
                    <v-select
                      v-on:change="onGetGender()"
                      :items="data_th_prefix"
                      v-model="applicant.th_prefix"
                      label="คำนำหน้า ( ภาษาไทย )"
                      :rules="[(v1) => !!v1 || 'โปรดเลือกคำนำหน้า']"
                      outlined
                    >   
                    </v-select>
                  </v-col>

                  <!-- TH fristname -->
                  <v-col class="d-flex" xl="5" lg="4" md="3" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.th_firstname"
                      label="ชื่อ ( ภาษาไทย )"
                      :rules="[(v1) => !!v1 || 'โปรดใส่ชื่อภาษาไทย']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- TH lastname -->
                  <v-col class="d-flex" xl="5" lg="4" md="3" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.th_lastname"
                      label="นามสกุล ( ภาษาไทย )"
                      :rules="[(v1) => !!v1 || 'โปรดใส่นามสกุล']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- EN prefix -->
                  <v-col class="d-flex" xl="2" lg="3" md="3" sm="12" cols="12">
                    <v-select
                      label="คำนำหน้า ( ภาษาอังกฤษ )"
                      :items="data_eng_prefix"
                      v-model="applicant.eng_prefix"
                      :rules="[(v1) => !!v1 || 'โปรดเลือกคำนำหน้า']"
                      outlined
                    ></v-select>
                  </v-col>

                  <!-- EN fristname -->
                  <v-col class="d-flex mb-1" xl="5" lg="4" md="3" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.eng_firstname"
                      label="ชื่อ ( ภาษาอังกฤษ )"
                      :rules="[(v1) => !!v1 || 'โปรดใส่ชื่อภาษาอังกฤษ']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- EN lastname -->
                  <v-col class="d-flex" xl="5" lg="4" md="3" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.eng_lastname"
                      label="นามสกุล ( ภาษาอังกฤษ ) "
                      :rules="[(v1) => !!v1 || 'โปรดใส่นามสกุลภาษาอังกฤษ']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- Nationality -->
                  <v-col class="d-flex" xl="3" lg="6" md="3" sm="3" cols="12">
                      <v-text-field
                      v-model="applicant.nationality"
                      label="สัญชาติ "
                      :rules="[(v1) => !!v1 || 'โปรดใส่สัญชาติ']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- Phone number -->
                  <v-col class="d-flex" xl="3" lg="6" md="3" sm="3" cols="12">
                    <v-text-field
                      v-model="applicant.phone_number"
                      label="เบอร์ โทรศัพท์"
                      type="number"
                      min="0"
                      :rules="[(v1) => !!v1 || 'โปรดใส่เบอร์โทรศัพท์']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- Phone number  family-->
                  <v-col class="d-flex" xl="3" lg="6" md="3" sm="3" cols="12">
                    <v-text-field
                      v-model="applicant.phone_number_famaily"
                      label="เบอร์โทรบุลคลที่ติดต่อได้กรณีฉุกเฉิน"
                      type="number"
                      min="0"
                      :rules="[(v1) => !!v1 || 'โปรดใส่เบอร์โทรศัพท์']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- Relationship -->
                  <v-col class="d-flex" xl="3" lg="6" md="2" sm="3" cols="12">
                    <v-text-field
                      v-model="applicant.person_relationship"
                      label="ความสัมพันธ์ เช่น (บิดา, มารดา) "
                      :rules="[(v1) => !!v1 || 'โปรดใส่ข้อมูล']"
                    >
                    </v-text-field>
                  </v-col>

                  <!-- Address -->
                  <v-col cols="12" md="6">
                    <v-textarea
                      label="ที่อยู่อาศัยปัจจุบัน"
                      auto-grow
                      outlined
                      rows="3"
                      row-height="25"
                      v-model="applicant.eng_address"
                      :rules="[(v1) => !!v1 || 'โปรดใส่ที่อยู่อาศัยปัจจุบัน']"
                      shaped
                    ></v-textarea>
                  </v-col>

                  <!--  Birthday  -->
                  <v-col class="d-flex" xl="4" lg="6" md="3" sm="12" cols="12">
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
                          label="วันเกิดของผู้สมัคร"
                          prepend-icon="event"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :rules="[
                            (v1) => !!v1 || 'โปรดใส่ข้อมูล',
                          ]"
                        >
                        </v-text-field>
                      </template>

                      <v-date-picker
                        v-model="applicant.date_birthday"
                        @input="date_menu = false"
                        ref="picker"
                        locale="th"
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
                    ต่อไป
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

                  <!-- upload img file input and resume -->
                  <v-col class="d-flex" xl="5" lg="6" md="6" sm="12" cols="12">
                     <div>
                       <v-btn
                              class="mt-2 mr-2"
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
                     </div>
                  </v-col>
                </v-row>


                 <v-row>

                  <!-- Degree -->
                  <v-col class="d-flex" xl="3" lg="3" md="6" sm="12" cols="12">
                    <v-select
                      v-model="applicant.degree_education"
                      :items="degree_item"
                      label="ระดับการศึกษา"
                      :rules="[(v1) => !!v1 || 'Please Degree Education']"
                    >
                    </v-select>
                  </v-col>


                  <!-- Major -->
                  <v-col class="d-flex" xl="3" lg="3" md="6" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.majoy_education"
                      label="สาขาวิชา"
                      :rules="[(v1) => !!v1 || 'Please Enter Major']"
                    >
                    </v-text-field>
                  </v-col>


                  <!-- Gpa -->
                  <v-col class="d-flex" xl="3" lg="3" md="3" sm="12" cols="12">
                    <v-text-field
                      v-model="applicant.gpa"
                      label="เกรดเฉลี่ยล่าสุด"
                      type="number"
                      min="0"
                      :rules="[(v1) => !!v1 || 'Please Enter GPA']"
                    >
                    </v-text-field>
                  </v-col>

                </v-row>

              
                <v-row>

                  <!-- skill -->
                  <v-col class="d-flex" xl="4" lg="6" md="5" sm="12" cols="12">

                  
                     <!-- <v-list shaped>
                      <v-subheader>ทักษะด้านในต่าง ๆ </v-subheader>
                      <v-list-item-group  color="primary">
                        <v-list-item
                          v-for="(item, i) in applicant.job_skill"
                          :key="i"
                        >
                          <v-list-item-content>
                           <v-checkbox v-model="item.checked" :label="item.name" ></v-checkbox>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list> -->

                    <!-- ทักษะด้านในต่าง ๆ : 
                   <div class="mr-2" v-for="(item, index) in applicant.job_skill" :key="index">
                    <v-checkbox v-model="item.checked" :label="item.name" ></v-checkbox>
                    </div> -->
                    <v-select
                      v-model="applicant.job_skill"
                      :items="data_skill"
                      label="ทักษะด้านในต่างๆ"
                      multiple
                      chips
                    >
                    </v-select>
                  </v-col>
                
                  <v-col class="d-flex" xl="6" lg="6" md="5" sm="12" cols="12">
                      <v-textarea
                      label="ประสบการณ์การทํางาน"
                      auto-grow
                      outlined
                      rows="3"
                      row-height="25"
                      v-model="applicant.job_exp"
                      shaped
                    ></v-textarea>
                  </v-col>
                </v-row>

                <v-row>
                  <v-spacer></v-spacer>
                  <v-btn @click="changeTab(1)" class="mr-3">
                    กลับ
                  </v-btn>

                  <v-btn @click="changeTab(3)" class="primary">
                    ต่อไป
                  </v-btn>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-3">
            <v-card flat>
              <v-card-text>
                <h2 class="mt-2 mb-3">
                  นโยบายความเป็นส่วนตัว
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
                    label="ยืนยัน"
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
                    กลับ
                  </v-btn>

                  <v-btn
                    class="success mr-3"
                    type="submit"
                  >
                    ยืนยันการสมัคร
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
      password: "tse@2020admin",
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
      gender:"",
      eng_address: "",
      date_birthday: null,
      age: "",
      imageURL: null,
      resumeURL: null,
      job_skill:"",
      job_exp:"",
      job_position: "",
      job_salary: "", 
      degree_education:"",
      education:"",
      majoy_education:"",
      gpa:"",
      role:"Production"
    },
    checked_ac: false,
    data_th_prefix: ["นาย", "นาง", "นางสาว"],
    data_eng_prefix: ["Mr", "Mrs", "Miss"],
    degree_item: ["มัธยมศึกษาตอนต้น (ม.3)", "มัธยมศึกษาตอนปลาย (ม.6)" ,"ประกาศนียบัตรวิชาชีพ (ปวช)","ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส)","ระดับปริญญาตรี","ปริญญาโท","ปริญญาเอก"],
    data_skill: ["ทักษะการประกอบ","ทักษะการตรวจสอบคุณภาพ","ทักษะการยิงสกรู","ทักษะการควบคุมเครื่องจักร(เครื่องกลึง,เครื่องกัด,เครื่องเจียร เป็นต้น)","ทักษะการปั๊มขึ้นรูปชิ้นงาน","ทักษะการฉีดขึ้นรูปชิ้นงาน","ทักษะการขับโฟล์คลิฟ","ทักษะการใช้เครื่องมือวัด(เวอร์เนีย,ไมโคร เป็นต้น)","ทักษะการใช้คอมพิวเตอร์","ทักษะการควบคุมสต็อกวัตถุดิบ"],
    data_position: ["Developer", "Data Analysis"],
    show_password: true,
    show_password_con: true,
    valid: true,
    checkpassword: "tse@2020admin",
    date_menu: false, //for date
    imageURL: "https://image.flaticon.com/icons/svg/882/882849.svg",
    CountryList: ["Thailand"],
    message_filename_pic: "อัพโหลดรูปภาพของคุณ",
    message_filename_resume: " Upload Resume / CV",
    tab: "tab-1",
    tabs: [
      {
        id: 1,
        icon: "mdi-account",
        name: "ฟอร์ม 1",
        href_tab: "#tab-1",
      },
      {
        id: 2,
        icon: "mdi-clipboard-file-outline",
        name: "ฟอร์ม 2",
        href_tab: "#tab-2",
      },
      {
        id: 3,
        icon: "mdi-clipboard-check-outline",
        name: "ฟอร์ม 3",
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
      if (link == "/login") {
        this.$router.push(link).catch((err) => {});
      }
    },
    onGetGender(){
      var pre_th = this.applicant.th_prefix
      if(pre_th == 'นาย'){
        this.applicant.gender = 'Male'
      }else if (pre_th == 'นาง'){
        this.applicant.gender = 'Female'
      }else if(pre_th == 'นางสาว'){
       this.applicant.gender = 'Female'
      }
    },
    async submit() {
  
      var check;
      var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
      var string = '';
      for(var ii=0; ii<30; ii++){
            string += chars[Math.floor(Math.random() * chars.length)];
      }

      this.applicant.email = string+'@domain.com';
      if (this.applicant.imageURL == null) {
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
