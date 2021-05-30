<template>
  <v-container grid-list-sm>
    <v-card>
      <v-row>
        <v-col cols="12" sm="4">
          <img :src="detailsEmployer.Logo" class="employer-logo" />
        </v-col>
        <v-col cols="12" sm="8">
          <div class="title-style">{{ detailsEmployer.Name }}</div>
          <div class="col-style">
            <div>
              {{ detailsEmployer.Adress }}
            </div>
            <div>{{ detailsEmployer.Industry }}</div>
            <div>
              <a :href="detailsEmployer.Website" target="_blank">
                {{ detailsEmployer.Website }}
              </a>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="9">
          <div class="description-style">Description</div>
          <div class="description-col-style">
            <div>
              {{ detailsEmployer.Description }}
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="3">
          <img src="../assets/description.png" class="description-logo" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="9">
          <div class="description-style">Values</div>
          <div class="description-col-style">
            <div>
              {{ detailsEmployer.Values }}
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="3">
          <img src="../assets/values.png" class="description-logo" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="9">
          <div class="description-style">Management</div>
          <div class="description-col-style">
            <v-list dense>
              <v-list-item
                v-for="(item, index) in detailsEmployer.Management"
                :key="index"
              >
                <v-list-item-content v-if="item != null">
                  {{ item.Name }}, {{ item.JobFunction }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-col>
        <v-col cols="12" sm="3">
          <img src="../assets/team.png" class="description-logo" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="9">
          <div class="description-style">Jobs</div>
          <div class="description-col-style">
            <v-list dense>
              <v-list-item
                v-for="(item, index) in jobs"
                :key="index"
              >
                <v-list-item-content v-if="item != null">
                  {{ item.Name }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-col>
        <v-col cols="12" sm="3">
          <img src="../assets/jobs.png" class="description-logo" />
        </v-col>
      </v-row>
      <v-btn color="indigo darken-1 white--text" router to="/" class="back-btn">
        Back
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  name: "app",
  data() {
    return {
      id: this.$route.params.id,
      idFaculties: [],
    };
  },
  computed: {
    employers() {
      return this.$store.getters.employers;
    },
    jobs() {
      var details = [];
      var keysJobs = [];
      var jobs = Object.keys(this.detailsEmployer.Jobs);
      jobs.forEach((key) => {
        keysJobs.push(this.detailsEmployer.Jobs[key]);
      });
      var keys = Object.keys(this.$store.getters.jobs);
      keys.forEach((job) => {
        if (keysJobs.indexOf(job) !== -1) {
          details.push(this.$store.getters.jobs[job]);
        }
      });
      return details;
    },
  },
  methods: {},
  created() {
    this.$store.dispatch("readRatings", this.id);
    firebase
      .database()
      .ref("Employer")
      .once(
        "value",
        (snap) => {
          const myObj = snap.val();
          var details = [];
          var employersDetails = myObj;
          var employerKeys = Object.keys(employersDetails);
          var x = employerKeys[this.id];
          var y = employerKeys.indexOf(x);
          employerKeys.forEach((employer) => {
            details.push(employersDetails[employer]);
          });
          this.detailsEmployer = details[y];
        },
        function(error) {
          console.log("Error: " + error.message);
        }
      );
  },
  filters: {},
};
</script>

<style>
#imgLogo {
  max-height: 100px;
}
#input {
  display: none;
}
.col-style {
  border-left: 4px solid #3949ab;
  padding-left: 30px;
  margin-left: 30px;
  margin-top: 15px;
  line-height: 2;
}
.title-style {
  font-size: 28px;
  font-weight: bold;
  margin-top: 20px;
  color: #3949ab;
}
.description-style {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 90px;
  color: #3949ab;
}
.description-col-style {
  border-left: 4px solid #3949ab;
  padding-left: 30px;
  padding-right: 30px;
  margin-left: 90px;
  margin-top: 15px;
  line-height: 2;
  text-align: justify;
}
.back-btn {
  margin: 30px auto 20px 70px;
}
.employer-logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}
.description-logo {
  width: 80%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>
