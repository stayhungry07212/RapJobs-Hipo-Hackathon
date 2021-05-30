<template>
  <v-container>
    <v-layout align-center justify-space-between column>
      <div class="title-wrapper">
        <div class="title">
          Find the career you deserve
        </div>
        <v-btn color="indigo darken-1 white--text" to="/search">Search</v-btn>
      </div>
      <div
        class="logos"
        v-if="employersDetails.length > 0"
        style="margin-bottom: 10px;"
      >
        <img
          v-for="employer in employersDetails"
          :key="employer.Logo"
          :src="employer.Logo"
        />
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  name: "app",
  data() {
    return {
      employersDetails: null,
    };
  },

  computed: {},
  methods: {
    piechart1() {
      var test3yes = 0;
      var test3no = 0;
      firebase
        .database()
        .ref("Employer")
        .on(
          "value",
          (snap) => {
            var myObj = snap.val();
            Object.keys(myObj).forEach((key) => {
              if (myObj[key].Jobs.length > 2) {
                test3yes = parseInt(test3yes) + parseInt(1);
              } else {
                test3no = parseInt(test3no) + parseInt(1);
              }
            });
          },
          function(error) {
            console.log("Error: " + error.message);
          }
        );
      var colors = [
        "#9c5463",
        "#7b4c67",
        "#c86060",
        "#5e4469",
        "#7f4c66",
        "#b25a62",
      ];
      window.google.charts.load("visualization", "1.0", {
        packages: ["corechart", "bar", "table"],
        callback: () => {
          var chart = new window.google.visualization.PieChart(
            document.getElementById("piechart1")
          );
          chart.draw(
            window.google.visualization.arrayToDataTable([
              ["Tip", "Numar"],
              ["+3 jobs", test3yes],
              ["-3 jobs", test3no],
            ]),
            {
              is3D: false,
              colors: [
                "#f86c5c",
                colors[Math.floor(Math.random() * colors.length)],
              ],
            }
          );
        },
      });
    },
  },
  created() {
    firebase
      .database()
      .ref("Employer")
      .once(
        "value",
        (snap) => {
          const myObj = snap.val();
          this.employersDetails = [];
          this.employerKeys = Object.keys(myObj);
          this.employerKeys.forEach((employer) => {
            this.employersDetails.push(myObj[employer]);
          });
        },
        function(error) {
          console.log("Error: " + error.message);
        }
      );
  },
};
</script>

<style scoped>
.container {
  background: url("./../assets/hp2.jpg");
  height: 100%;
  background-size: cover;
  display: flex;
  margin: 0px;
  padding: 0px;
  background-position: center;
}
.title {
  color: white;
  font-weight: normal;
  margin: 20px;
  margin-top: 250px;
}
img {
  height: 50px;
  width: auto;
  margin: 5px;
}
.logos {
  display: flex;
  flex-flow: wrap;
}
.title-wrapper {
  text-align: -webkit-center;
}
@media (min-width: 1264px) {
  .container {
    max-width: unset;
  }
}
</style>
