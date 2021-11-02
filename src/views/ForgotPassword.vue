<template>
  <div class="reset-password">
    <Modal
      v-if="modalActive"
      v-on:close-modal="closeModal"
      :modalMessage="modalMessage"
    />
    <Loading v-show="isLoading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="{ name: 'Login' }">
            Login
          </router-link>
        </p>
        <h2>Reset Password</h2>
        <p class="login-register">
          Forgot your password? Enter your email to reset it.
        </p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <Email class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle" />
      </form>
      <div class="background" />
    </div>
  </div>
</template>

<script>
import Email from "../assets/Icons/envelope-regular.svg";
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "ForgotPassword",
  components: {
    Email,
    Modal,
    Loading,
  },
  data() {
    return {
      email: "",
      modalActive: "",
      modalMessage: "",
      isLoading: null,
    };
  },
  methods: {
    resetPassword() {
      this.Loading = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.modalMessage =
            "If your account exists, you will receive a email";
          this.isLoading = false;
          this.modalActive = true;
        })
        .catch((err) => {
          this.modalMessage = err.message;
          this.loading = false;
          this.modalActive = true;
        });
    },
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
    },
  },
};
</script>

<style lang='scss' scoped>
</style>