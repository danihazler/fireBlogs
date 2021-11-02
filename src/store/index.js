import Vue from 'vue';
import Vuex from 'vuex';
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      { blogTitle: 'Card 1', blogCoverPhoto: 'stock-1', blogDate: 'May 1, 2021' },
      { blogTitle: 'Card 2', blogCoverPhoto: 'stock-2', blogDate: 'May 1, 2021' },
      { blogTitle: 'Card 3', blogCoverPhoto: 'stock-3', blogDate: 'May 1, 2021' },
      { blogTitle: 'Card 4', blogCoverPhoto: 'stock-4', blogDate: 'May 1, 2021' },
    ],
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileName: null,
    profileSurname: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    toogleEditPost(state, payload) {
      state.editPost = payload;
    },
    updateUser(state, payload) {
      state.user = payload
    },
    setProfileInfo(state, info) {
      state.profileId = info.id;
      state.profileEmail = info.data().email;
      state.profileName = info.data().name;
      state.profileSurname = info.data().surname;
      state.profileUserName = info.data().userName;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileName.match(/(\b\S)?/g).join("") + state.profileSurname.match(/(\b\S)?/g).join("");
    }
  },
  actions: {
    async getCurrentUser({ commit }) {
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit('setProfileInfo', dbResults);
      commit('setProfileInitials');
    }
  },
  modules: {
  }
})
