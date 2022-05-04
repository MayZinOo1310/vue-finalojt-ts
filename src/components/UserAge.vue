<template>
  <div class="form-group row mb-3">
    <div class="col-md-8 row">
      <label class="col-md-4 me-4">DateofBirth</label>
      <div class="col-md-7">
        <datepicker
          v-model="myDate.date"
          input-class="form-control"
        ></datepicker>
      </div>
    </div>
    <div class="col-md-4 row">
      <label class="col-md-3" for="age">Age</label>
      <div class="col-md-9">
        <input
          id="age"
          type="text"
          class="form-control"
          :value="calculateAge()"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import datepicker from "vuejs-datepicker";
@Component({
  components: {
    datepicker,
  },
})
export default class UserAge extends Vue {
  public myDate: any = {
    date: new Date(),
  }
  calculateAge() {
    this.$emit("getDate", this.myDate.date.toLocaleDateString());
    var today = new Date();
    var age = today.getFullYear() - this.myDate.date.getFullYear();
    var m = today.getMonth() - this.myDate.date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.myDate.date.getDate())) {
      age--;
    }
    return age;
  }
}
</script>
