<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">
          Login here
        </router-link>
      </p>
      <h2>Create Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Name" v-model="name" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Surname" v-model="surname" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="userName" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <Email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <Password class="icon" />
        </div>
        <div class="error" v-show="hasError">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="register">Sign up</button>
      <div class="angle" />
    </form>
    <div class="background" />
  </div>
</template>

<script>
import Email from "../assets/Icons/envelope-regular.svg";
import Password from "../assets/Icons/lock-alt-solid.svg";
import User from "../assets/Icons/user-alt-light.svg";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

export default {
  name: "Register",
  components: {
    Email,
    Password,
    User,
  },
  data() {
    return {
      name: "",
      surname: "",
      userName: "",
      email: "",
      password: "",
      hasError: false,
      errorMsg: "",
    };
  },
  methods: {
    async register() {
      if (
        this.name !== "" &&
        this.surname !== "" &&
        this.useName !== "" &&
        this.emai !== "" &&
        this.password !== ""
      ) {
        this.hasError = false;
        this.errorMsg = "";

        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        const result = await createUser;
        const dataBase = db.collection("users").doc(result.user.uid);
        await dataBase.set({
          name: this.name,
          surname: this.surname,
          userName: this.userName,
          email: this.email,
        });
        this.$router.push({ name: "Home" });
        return;
      }
      this.hasError = true;
      this.errorMsg = "Please complete all fields.";
      return;
    },
  },
};
</script>

<style lang='scss' scoped>
form.register .inputs .input .icon1 {
  width: 1em;
  left: 8px;
}
form.register .inputs .input .icon2 {
  width: 1.1em;
}
form.register .inputs #checkbox {
  display: flex;
  justify-content: flex-start;
  input {
    appearance: none;
    width: 60px;
    height: 20px;
    border-radius: 20px;
    background-color: #f2f7f6;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      left: 0;
      top: 0;
      transform: scale(1.1);
      background-color: #000;
      transition: 0.3s ease;
    }
    &:checked::before {
      left: 40px;
      background-color: #999;
    }
  }
  span {
    font-size: 14px;
    color: #303030;
    font-weight: 300;
    margin-left: 15px;
  }
}
form.register h2 {
  font-size: 32px;
}
</style>