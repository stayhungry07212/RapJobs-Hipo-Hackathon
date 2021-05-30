<template>
  <v-container grid-list-sm>
    <v-card>
      <v-row class="header-style">
        <v-col cols="12" sm="4">
          <img :src="Image" class="employee-pic" />
          <input
            type="file"
            accept="image/*"
            style="display:none"
            ref="pictureInput"
            @change="pictureSelect"
          />
          <v-btn
            class="upload-btn"
            :loading="loading"
            @click.native="loader = 'loading'"
            @click="addPicture"
          >
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="12" sm="8">
          <div class="title-style">{{ name }} {{ surname }},  {{ position }}</div>
          <div class="col-style">
            <div><v-icon>mdi-phone</v-icon> {{ phone }}</div>
            <div><v-icon>mdi-email</v-icon> {{ emailAdress }}</div>
            <div><v-icon>mdi-web</v-icon> {{ website }}</div>
            <div><v-icon>mdi-home</v-icon> {{ address }}</div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <div class="subtitle-skills-style">Skills</div>
          <div class="skills-col-style">
            <v-list dense>
              <v-list-item v-for="(item, index) in summary.Skills" :key="index">
                <v-list-item-content v-if="item != null">
                  - {{ item }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <div class="subtitle-skills-style">Expertise</div>
          <div class="skills-col-style">
            <v-list dense>
              <v-list-item
                v-for="(item, index) in summary.Expertise"
                :key="index"
              >
                <v-list-item-content
                  v-if="item != null"
                  class="expertise-title"
                >
                  {{ index }}
                  <v-progress-linear :value="item"></v-progress-linear>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="8"
          style="background-color: rgb(232 240 254 / 50%);"
        >
          <div class="subtitle-style">Overview</div>
          <div class="description-col-style">
            <div>{{ summary.Overview }}</div>
          </div>
          <div class="subtitle-style">Education</div>
          <div class="education-col-style">
            <v-row>
              <div v-for="(item, index) in summary.Education" :key="index">
                <v-col col="12" sm="12" v-if="item != null">
                  <i> {{ item.Function }}</i> - {{ item.Type }}
                </v-col>
              </div>
            </v-row>
          </div>
          <div class="subtitle-style">Work experience</div>
           <div class="education-col-style">
            <v-row>
              <div v-for="(item, index) in summary.Experience" :key="index">
                <v-col col="12" sm="12" v-if="item != null">
                  <i> {{ item.Function }}</i>  @ {{ item.Company }}
                   <br/>
                   {{item.Attributions}}
                </v-col>
              </div>
            </v-row>
          </div>
          <div class="subtitle-style">References</div>
          <div class="education-col-style">
            <v-row>
              <div v-for="(item, index) in summary.Reference" :key="index">
                <v-col
                  cols="12"
                  sm="12"
                  v-if="item != null"
                  class="expertise-title"
                >
                  <i> {{ item.name }} </i>-
                  {{ item.text }}
                </v-col>
              </div>
            </v-row>
          </div>
        </v-col>
      </v-row>

       <v-btn color="indigo darken-1 white--text" router to="/" class="back-btn">
        Back
      </v-btn>
      
    </v-card>

    <v-dialog v-model="dialogEmail" width="400">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Add a new email adress
        </v-card-title>
        <v-card-text>
          <v-text-field
            prepend-icon="email"
            v-model="email3"
            label="Current email adress"
          >
            New email adress
          </v-text-field>
        </v-card-text>
        <v-card-text>
          <v-text-field
            prepend-icon="email"
            v-model="password3"
            label="Password"
            :append-icon="show3 ? 'visibility_off' : 'visibility'"
            :type="show3 ? 'text' : 'password'"
            @click:append="show3 = !show3"
          >
          </v-text-field>
        </v-card-text>
        <v-card-text>
          <v-text-field
            prepend-icon="email"
            v-model="email2"
            id="email"
            label="New email adress"
          >
            New email adress
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="updateEmail">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogPassword" width="400">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Add a new password
        </v-card-title>
        <v-card-text>
          <v-text-field
            prepend-icon="lock"
            v-model="password2"
            id="pass"
            :append-icon="show1 ? 'visibility_off' : 'visibility'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            label="Repeat the password"
          >
            Add a new password
          </v-text-field>
          <v-text-field
            prepend-icon="lock"
            v-model="passwordConfirm"
            :append-icon="show2 ? 'visibility_off' : 'visibility'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            :rules="[comparePasswords]"
            label="Repeat the password"
          >
            Repeat the password
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="updatePassword">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style>
img {
  margin: 0;
  padding: 0;
}
#imagine {
  display: block;
}
.employee-pic {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  width: 60%;
}
.upload-btn {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  width: 60%;
}
.title-style {
  font-size: 28px;
  font-weight: bold;
  margin-top: 20px;
  color: #3949ab;
}
.header-style {
  margin-bottom: 10px;
}
.col-style {
  border-left: 4px solid #3949ab;
  padding-left: 30px;
  margin-left: 30px;
  margin-top: 15px;
  line-height: 2;
  text-align: justify;
}
.description-col-style {
  border-left: 4px solid #3949ab;
  padding-left: 30px;
  padding-right: 30px;
  margin-left: 30px;
  margin-top: 15px;
  line-height: 2;
  text-align: justify;
}
.education-col-style {
  border-left: 4px solid #3949ab;
  padding-left: 30px;
  padding-right: 30px;
  margin-left: 30px;
  margin-top: 0px;
  line-height: 2;
  text-align: justify;
}
.skills-col-style {
  padding-left: 30px;
  padding-right: 30px;
  margin-left: 30px;
  margin-top: 15px;
  line-height: 2;
  text-align: justify;
}
.subtitle-style {
  font-size: 20px;
  font-weight: bold;
  margin: 10px auto 10px 15px;
  color: #3949ab;
}
.subtitle-skills-style {
  font-size: 20px;
  font-weight: bold;
  margin: 10px auto 0px 60px;
  color: #3949ab;
}
.expertise-title {
  margin-bottom: 10px;
}
</style>

<script>
import firebase from "firebase";
export default {
  name: "Profile",
  data() {
    return {
      password: "",
      password3: "",
      email: "",
      email2: "",
      email3: "",
      show1: "",
      show2: "",
      show3: "",
      name: "",
      surname: "",
      position: "",
      phone: "",
      website: "",
      address: "",
      emailAdress: "",
      summary: "",
      e1: true,
      oldpass: "",
      password2: "",
      confirmPassword: "",
      passwordConfirm: "",
      changeDetails: false,
      user1: null,
      ImageUrl: "",
      Image: null,
      selectedFile: null,
      downloadURL: null,
      loading3: false,
      dialogEmail: false,
      dialogPassword: false,
      loading: false,
      rules: {
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Email invalid.";
        },
      },
      userdet: {
        Name: "",
        Surname: "",
      },
    };
  },
  computed: {
    userdetails() {
      return this.$store.getters.userdetails;
    },
    comparePasswords() {
      return this.password2 !== this.passwordConfirm
        ? "Parolele nu coincid"
        : "";
    },
    getuserdetails() {
      const x = this.keysUsers.indexOf(this.user.uid);
      const userdet = this.userdetails[x];
      return userdet;
    },
  },
  methods: {
    user() {
      firebase
        .database()
        .ref("Employee/")
        .on("value", (snap) => {
          const myObj = snap.val();
          const x = firebase.auth().currentUser;
          this.name = myObj[x.uid].Name;
          this.surname = myObj[x.uid].Surname;
          this.Image = myObj[x.uid].Image;
          this.position = myObj[x.uid].Position;
          this.phone = myObj[x.uid].Phone;
          this.website = myObj[x.uid].Website;
          this.address = myObj[x.uid].Address;
          this.emailAdress = myObj[x.uid].Email;
          this.summary = myObj[x.uid].Summary;
        });
    },
    updateEmail() {
      this.$store.dispatch("signIn", {
        email: this.email3,
        password: this.password3,
      });
      firebase
        .database()
        .ref("Employee/" + firebase.auth().currentUser.uid)
        .update({
          Email: this.email3,
        });
      this.dialogEmail = false;
      var email = document.getElementById("email").value;
      firebase
        .auth()
        .currentUser.updateEmail(email)
        .then(function() {
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(function() {
              console.log("email sent");
            })
            .catch(function(error) {
              console.log("error", error);
            });
        })
        .catch(function(error) {
          console.log("error", error);
        });
    },
    updatePassword() {
      this.dialog = false;
      var pass = document.getElementById("pass").value;
      firebase
        .auth()
        .currentUser.updatePassword(pass)
        .then(function() {
          console.log("succes");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addPicture() {
      this.$refs.pictureInput.click();
    },
    pictureSelect(payload) {
      const selectedFile = payload.target.files[0];
      const filesName = firebase.auth().currentUser.uid;

      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.ImageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(selectedFile);
      this.ImageUrl = selectedFile;
      const storageRef = firebase.storage().ref("ProfilePictures/" + filesName);
      const uploadTask = storageRef.put(selectedFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log("succes");
          var downloadURL = uploadTask.snapshot.ref
            .getDownloadURL()
            .then(function(downloadURL) {
              firebase
                .database()
                .ref("Employee/" + firebase.auth().currentUser.uid)
                .update({
                  Image: downloadURL,
                });
              console.log("File available at", downloadURL);
            });
          this.Image = downloadURL;
        }
      );
    },
  },
  created() {
    this.user();
    this.$store.dispatch("getUserData");
    return this.$store.getters.userdetails;
  },
};
</script>
