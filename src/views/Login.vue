<template>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'Register' }">
          Register here
        </router-link>
      </p>
      <h2>Login to Fireblogs</h2>
      <div class="inputs">
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
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">
        Forgot your password?
      </router-link>
      <button @click.prevent="signIn">Sign in</button>
      <div class="angle" />
    </form>
    <div class="background" />
  </div>
</template>

<script>
import Email from "../assets/Icons/envelope-regular.svg";
import Password from "../assets/Icons/lock-alt-solid.svg";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Login",
  components: {
    Email,
    Password,
  },
  data() {
    return {
      email: "",
      password: "",
      hasError: false,
      errorMsg: "",
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: "Home" });
          this.hasError = false;
          this.errorMsg = "";
        })
        .catch((err) => {
          this.hasError = true;
          this.errorMsg = err.message;
        });
    },
  },
};
</script>

<style lang='scss'>
//  not scoped because this is shared with Register and Forgot Password
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 900px) {
    width: 100%;
  }
  .login-register {
    margin-bottom: 32px;
    .router-link {
      color: black;
    }
  }
  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 900px) {
      padding: 0 50px;
    }
    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;
      @media (min-width: 900px) {
        font-size: 40px;
      }
    }
    .inputs {
      width: 100%;
      max-width: 350px;
      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;
          &:focus {
            outline: none;
          }
        }
        .icon {
          width: 1rem;
          position: absolute;
          left: 8px;
        }
      }
    }
    .forgot-password {
      text-decoration: none;
      color: black;
      cursor: pointer;
      font-size: 14px;
      margin: 12px 0;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;
      &:hover {
        border-color: #303030;
      }
    }
    button {
      margin-top: 12px;
      width: 120px;
    }
    .angle {
      display: none;
      position: absolute;
      transform: rotate(3deg);
      background-color: #fff;
      width: 60px;
      right: -30px;
      height: 102vh;
      @media (min-width: 900px) {
        display: initial;
      }
    }
  }
  .background {
    display: none;
    flex: 2;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: url("../assets/background.png");
    @media (min-width: 900px) {
      display: block;
    }
  }
}
</style>