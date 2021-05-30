<template>
  <div class="card-wrapper" @click="redirect()">
    <!-- EMOPOLYER -->
    <div v-if="searchType === 'employer'" class="card-content">
      <div class="logo-wrapper">
        <img :src="item.Logo" />
      </div>
      <div class="name">
        {{ item.Name }}
      </div>
      {{ item.Industry }}
      <span style="opacity: 0.3;color:#3949ab;"
        >{{ item.Jobs | jobsLength }} jobs available
      </span>
    </div>
    <!-- JOBS -->
    <div v-if="searchType === 'jobs'" class="card-content">
      <div class="logo-wrapper">
        <img :src="employerData.Logo" />
      </div>
      <div class="name">
        {{ item.Name }}
      </div>
      {{ item.Domain }}
      <span style="opacity: 0.3;color:#3949ab;"
        >Salary: {{ item.Salary }}
      </span>
      <span style="opacity: 0.3;color:#3949ab;"
        >{{ item.ScheduleStart }} - {{ item.ScheduleEnd }}
      </span>

      <v-chip-group>
        <v-chip>
          {{ item.Tag }}
        </v-chip>
        <v-chip>
          {{ item.JobType }}
        </v-chip>
        <v-chip>
          {{ item.Location }}
        </v-chip>
      </v-chip-group>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "CardResult",
  props: {
    searchType: null,
    item: null,
    id: null,
  },
  data() {
    return {
      employerData: null,
    };
  },
  filters: {
    jobsLength: (value) => {
      return Object.keys(value).length;
    },
  },
  methods: {
    redirect() {
      this.$router.push({ name: "Employer", params: { id: this.id } });
    },
  },
  created() {
    firebase
      .database()
      .ref("Employer/" + this.item.EmployerID)
      .once(
        "value",
        (snap) => {
          this.employerData = snap.val();
        },
        function(error) {
          console.log("Error: " + error.message);
        }
      );
  },
};
</script>
<style scoped>
.card-wrapper {
  background-color: white;
  box-shadow: 0px 0px 4px 0px lightgrey;
  padding: 10px;
  flex: 1 1 25%;
  cursor: pointer;
  margin: 10px;
}
.card-wrapper:hover {
  box-shadow: 0px 0px 4px 2px lightgrey;
}
img {
  height: 100%;
  width: auto;
}
.card-content {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  text-align: -webkit-center;
}
.logo-wrapper {
  height: 150px;
}
.name {
  font-weight: bold;
}
</style>
