<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"
          >FireBlogs</router-link
        >
      </div>
      <div class="nav-links" v-show="!isMobile">
        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
        <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
        <router-link class="link" :to="{ name: '#' }">Create Post</router-link>
        <router-link class="link" :to="{ name: 'Login' }">
          Login/Register
        </router-link>
      </div>
      <div
        v-if="user"
        :class="{ 'mobile-user-menu': isMobile }"
        class="profile"
        ref="profile"
      >
        <span>{{ this.$store.state.profileInitials }}</span>
        <div v-show="profileMenu" class="profile-menu">
          <div class="info">
            <p class="initials">{{ this.$store.state.profileInitials }}</p>
            <div class="right">
              <p>
                {{ this.$store.state.profileFirstName }}
                {{ this.$store.state.profileLastName }}
              </p>
              <p>{{ this.$store.state.profileUsername }}</p>
              <p>{{ this.$store.state.profileEmail }}</p>
            </div>
          </div>
          <div class="options">
            <div class="option">
              <router-link class="option" :to="{ name: 'Profile' }">
                <UserIcon class="icon" />
                <p>Profile</p>
              </router-link>
            </div>
            <div class="option">
              <router-link class="option" :to="{ name: 'Admin' }">
                <AdminIcon class="icon" />
                <p>Admin</p>
              </router-link>
            </div>
            <!-- <div @click="signOut" class="option">
              <SignOutIcon class="icon" />
              <p>Sign Out</p>
            </div> -->
          </div>
        </div>
      </div>
    </nav>

    <MenuIcon @click="toogleMobileNav" v-show="isMobile" />

    <transition name="mobile-nav">
      <div class="mobile-nav" v-show="isMobile && isMobileNavOpen">
        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
        <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
        <router-link class="link" :to="{ name: '#' }">Create Post</router-link>
        <router-link class="link" :to="{ name: 'Login' }">
          Login/Register
        </router-link>
      </div>
    </transition>
  </header>
</template>

<script>
import MenuIcon from "../assets/Icons/bars-regular.svg";
import UserIcon from "../assets/Icons/user-alt-light.svg";
import AdminIcon from "../assets/Icons/user-crown-light.svg";
// import SignOutIcon from "../assets/Icons/sign-out-alt-regular.svg";

export default {
  name: "navigation",
  components: {
    MenuIcon,
    UserIcon,
    AdminIcon,
    // SignOutIcon,
  },
  data() {
    return {
      isMobile: null,
      isMobileNavOpen: null,
      windowWidth: null,
      profileMenu: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkWindowSize);
    this.checkWindowSize();
  },
  methods: {
    checkWindowSize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.isMobile = true;
        return;
      }
      this.isMobile = false;
      this.isMobileNavOpen = false;
      return;
    },
    toogleMobileNav() {
      this.isMobileNavOpen = !this.isMobileNavOpen;
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background: white;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rbga(0, 0, 0, 0.1),
    0 2px 4px -1px rgbs(0, 0, 0, 0.6);
  position: relative;
  z-index: 99;

  svg {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 32px;
    height: 25px;
    width: auto;
  }
}

.link {
  font-weight: 500;
  padding: 0 8px;
  transition: color 0.3s ease;

  &:hover {
    color: #1eb8b8;
  }
}

nav {
  display: flex;
  padding: 25px 0;

  .branding {
    display: flex;
    align-items: center;
  }

  .header {
    color: black;
    font-weight: 600;
    font-size: 24px;
    text-decoration: none;
  }
}

.nav-links {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-right: 32px;
}

.link {
  margin-right: 32px;

  &:last-of-type {
    margin-right: 0;
  }
}

.mobile-nav {
  background: #303030;
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;

  .link {
    color: white;
    padding: 15px 0;
  }
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 0.5s ease;
}

.mobile-nav-enter {
  transform: translateX(-250px);
}

.mobile-nav-enter-to {
  transform: translateX(0);
}

.mobile-nav-leave-to {
  transform: translateX(-250px);
}
</style>
