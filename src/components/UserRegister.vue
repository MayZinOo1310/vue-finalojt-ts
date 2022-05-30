<template>
  <div class="container">
    <form @submit.prevent="validate()">
      <div class="form-group row mb-3">
        <label class="col-md-3" for="name">User Name</label>
        <div class="col-md-9">
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="name"
            :disabled="disabled == 1"
          />
          <div v-if="this.name_error" class="text-error">
            {{ this.name_error }}
          </div>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label class="col-md-3" for="gender">Gender</label>
        <div class="col-md-9 row">
          <div class="col-md-3">
            <input
              type="radio"
              id="male"
              value="male"
              name="gender"
              v-model="gender"
              :disabled="disabled == 1"
            />
            <label class="custom-control-label" for="male">Male</label>
          </div>
          <div class="col-md-3">
            <input
              type="radio"
              id="female"
              value="female"
              name="gender"
              v-model="gender"
              :disabled="disabled == 1"
            />
            <label class="custom-control-label" for="female">Female</label>
          </div>
          <div v-if="this.gender_error" class="text-error">
            {{ this.gender_error }}
          </div>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label class="col-md-3" for="email">Email</label>
        <div class="col-md-9">
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="email"
            :disabled="disabled == 1"
          />
          <div v-if="this.email_error" class="text-error">
            {{ this.email_error }}
          </div>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label class="col-md-3" for="address">Address</label>
        <div class="col-md-9">
          <textarea
            class="form-control"
            id="address"
            v-model="address"
            :disabled="disabled == 1"
          ></textarea>
          <div v-if="this.address_error" class="text-error">
            {{ this.address_error }}
          </div>
        </div>
      </div>
      <UserAge :disabled="disabled == 1" @getDate="dateHandler" />
      <div class="form-group row mb-3">
        <label class="col-md-3" for="userRole">User Role</label>
        <div class="col-md-5">
          <select
            class="form-select"
            id="userRole"
            v-model="userRole"
            :disabled="disabled == 1"
          >
            <option value=""></option>
            <option value="Administrator">Administrator</option>
            <option value="User">User</option>
            <option value="Guest">Guest</option>
          </select>
        </div>
      </div>
      <div class="row">
        <button
          class="btn btn-danger col-md-2 m-3"
          type="reset"
          @click="backMode == true ? back() : ''"
        >
          {{ backMode ? "Back" : "Clear" }}
        </button>
        <button
          type="submit"
          class="btn btn-danger col-md-2 m-3"
          v-if="disabled == 0"
        >
          Confirm
        </button>
        <button
          type="button"
          class="btn btn-danger col-md-2 m-3"
          @click="register()"
          v-if="disabled == 1"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import UserAge from "./UserAge.vue";

@Component({
  components: {
    UserAge,
  },
})
export default class UserRegister extends Vue {
  private id: string = this.$store.state.id;
  private name: string = "";
  private gender: string = "";
  private email: string = "";
  private address: string = "";
  private userRole: string = "";
  private dob: string = "";
  private disabled = 0 as number | string;
  private name_error: string = "";
  private gender_error: string = "";
  private email_error: string = "";
  private backMode = false as boolean;
  private userList: any = {
    id: "",
    name: "",
    gender: "",
    email: "",
    address: "",
    dob: "",
    userRole: "",
  };
  validate() {
    if (this.name == "") {
      this.name_error = "This is required field";
    } else {
      this.name_error = "";
    }

    if (this.gender == "") {
      this.gender_error = "This is required field";
    } else {
      this.gender_error = "";
    }

    if (this.email.search("@") == -1) {
      this.email_error = "This is required field";
    } else {
      this.email_error = "";
    }
    if (
      this.name_error == "" &&
      this.email_error == "" &&
      this.gender_error == ""
    ) {
      this.disabled = 1;
    } else {
      this.disabled = 0;
    }
    if (this.name != "" && this.email != "") {
      this.disabled = 0;
      this.backMode = true;
    }
  }
  register() {
    if (this.disabled == 1) {
      this.userList.id = this.id;
      this.userList.name = this.name;
      this.userList.gender = this.gender;
      this.userList.email = this.email;
      this.userList.address = this.address;
      this.userList.dob = this.dob;
      this.userList.userRole = this.userRole;
      this.$store.commit("userRegister", this.userList);
      this.$router.push({ path: "/" });
    }
  }
  resetHandler() {
    (this.name = ""),
      (this.email = ""),
      (this.gender = ""),
      (this.address = ""),
      (this.userRole = "");
  }
  dateHandler(e): void {
    this.dob = e;
  }
}
</script>
<style>
form {
  max-width: 600px;
  margin: 0 auto;
}
.container {
  max-width: 1140px !important;
  margin: 0 auto;
}
.text-error {
  color: red;
  font-size: 14px;
  text-align: left;
}
</style>
