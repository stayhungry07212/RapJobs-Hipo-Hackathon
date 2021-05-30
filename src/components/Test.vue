<template>
  <v-container>
    <v-stepper v-model="stepNumber" vertical v-if="!isShowResults">
      <div v-for="(category, index) in testData.questions" :key="index">
        <v-stepper-step
          :complete="stepNumber > findIndexOfCategory(index)"
          :step="findIndexOfCategory(index)"
        >
          {{ index | splitWords }}
        </v-stepper-step>
        <v-stepper-content :step="findIndexOfCategory(index)">
          <table>
            <tr>
              <th></th>
              <th>Very Inaccurate</th>
              <th>Moderately Inaccurate</th>
              <th>Neither Inaccurate nor Accurate</th>
              <th>Moderately Accurate</th>
              <th>Very Accurate</th>
            </tr>
            <tr
              v-for="(question, index2) in testData.questions[index]"
              :key="index2"
              class="border-bottom"
            >
              <td>
                {{ question.text }}
              </td>
              <td
                v-for="(answer, index3) in testData.answers[question.key]"
                :key="index3"
              >
                <input
                  type="radio"
                  :value="answer.value"
                  :name="index + index2"
                  @change="setAnswerForQestion(index, index2, answer.value)"
                />
              </td>
            </tr>
          </table>

          <div class="buttons">
            <v-btn
              color="primary"
              :disabled="!areAllQuestionsAnswered(index)"
              @click="nextStep()"
              v-if="
                findIndexOfCategory(index) + 1 !=
                  Object.keys(testData.questions).length
              "
            >
              Continue
            </v-btn>
            <v-btn
              color="primary"
              @click="showResults()"
              :disabled="!areAllQuestionsAnswered(index)"
              v-if="
                findIndexOfCategory(index) + 1 ===
                  Object.keys(testData.questions).length
              "
            >
              Show results
            </v-btn>
          </div>
        </v-stepper-content>
      </div>
    </v-stepper>
    <v-card v-if="isShowResults">
      <div class="map">
        Green - you got this! Good job!<br />
        Red - things to be improved, don't worry.
      </div>

      <div class="result-items">
        <div
          v-for="(item, index4) in Object.keys(results)"
          :key="index4"
          class="result-item-card"
          v-bind:class="{
            'red-border': results[item] === '-',
            'green-border': results[item] === '+',
          }"
        >
          {{ item | splitWords }}
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable */
import firebase from "firebase";
import data from "./../assets/test";
export default {
  name: "Test",
  data() {
    return {
      testData: data,
      stepNumber: 0,
      step: "",
      isShowResults: false,
      results: {},
    };
  },
  computed: {
    user() {
      this.$store.getters.user.uid;
    },
  },
  filters: {
    splitWords(word) {
      return word.split(/(?=[A-Z])/).join(" ");
    },
  },
  methods: {
    areAllQuestionsAnswered(category) {
      let answered = 0;
      Object.values(this.testData.questions[category]).forEach((element) => {
        answered =
          element.answer || element.answer === 0 ? answered + 1 : answered;
      });
      return answered === Object.keys(this.testData.questions[category]).length;
    },
    findIndexOfCategory(category) {
      return Object.keys(this.testData.questions).indexOf(category);
    },
    nextStep() {
      this.stepNumber = this.stepNumber + 1;
      this.step = Object.keys(this.testData.questions)[this.stepNumber];
    },
    setAnswerForQestion(category, question, answerPoints) {
      console.log("answerPoints", answerPoints);
      this.testData.questions[category][question].answer = answerPoints;
    },
    showResults() {
      this.isShowResults = !this.isShowResults;
      Object.keys(this.testData.questions).forEach((category) => {
        const categoryFields = this.testData.questions[category];
        let sum = categoryFields.reduce((a, b) => a + b.answer, 0);
        const medium = (categoryFields.length * 5 + categoryFields.length) / 2;
        this.results[category] = sum >= medium ? "+" : "-";
      });
    },
  },
  created() {
    this.step = Object.keys(this.testData.questions)[this.stepNumber];
  },
};
</script>

<style scoped>
td {
  place-content: center;
  text-align: -webkit-center;
}
tr td:first-child {
  text-align: left;
}
.v-stepper__step {
  text-transform: capitalize;
}
table tr:first-child th {
  padding: 20px;
}
tr.border-bottom td {
  border-bottom: 1px solid lightgray;
  padding: 5px;
}
.buttons {
  display: flex;
  margin-top: 15px;
  justify-content: flex-end;
}
.result-item-card {
  padding: 50px;
  margin: 20px;
}
.red-border {
  border: 5px solid #ff0000;
  background-color: #ff00001a;
}
.green-border {
  border: 5px solid #008000;
  background-color: #0080001a;
}
.result-items {
  display: flex;
  flex-flow: wrap;
}
.map {
  padding: 20px;
  text-transform: capitalize;
}
</style>
