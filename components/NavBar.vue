<template>
  <nav id="navbar">
    <v-app-bar class="white" flat app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold"
        ><router-link to="/" class="black--text" style="text-decoration: none"
          ><img
            src="~/assets/images/logo.png"
            style="width:100px;margin-top:10px;margin-left:-20px"
          /> </router-link
      ></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        flat
        hide-details
        append-icon="mdi-magnify"
        placeholder="Search"
        outlined
        dense
        v-model="searchText"
        @click:append="search"
        class="hidden-sm-and-down"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on"> <v-icon size="25">mdi-apps</v-icon></v-btn>
        </template>
        <span>Nices apps</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" class="mr-7">
            <v-icon size="25">mdi-bell</v-icon></v-btn
          >
        </template>
        <span>Notifications</span>
      </v-tooltip>

      <v-menu offset-y left>
        <template v-slot:activator="{ on }">
          <v-btn
            small
            color="primary"
            depressed
            fab
            v-on="on"
            class="white--text"
          >
            T
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img :src="`https://randomuser.me/api/portraits/men/4.jpg`" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Demo</v-list-item-title>
                <v-list-item-subtitle>{{ account }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item to="/signin">
              <v-list-item-icon>
                <v-icon>mdi-login-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sign out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      :clipped="$route.name !== 'Watch'"
      :temporary="$route.name === 'Watch'"
      id="nav"
    >
      <div tag="div" class="v-navigation-drawer__content">
        <v-list dense nav class="py-0" tag="div">
          <v-list-item
            :class="{
              'hidden-lg-and-up': $route.name === 'Watch' ? false : true,
            }"
          >
            <v-app-bar-nav-icon
              @click="drawer = !drawer"
              class="mr-5"
            ></v-app-bar-nav-icon>
            <v-toolbar-title class="font-weight-bold">VueTube</v-toolbar-title>
          </v-list-item>
          <v-divider class="hidden-lg-and-up"></v-divider>
          <div v-for="parentItem in items" :key="parentItem.header">
            <v-subheader
              v-if="parentItem.header"
              class="pl-3 py-4 subtitle-1 font-weight-bold text-uppercase"
              >{{ parentItem.header }}</v-subheader
            >
            <v-list-item
              v-for="(item, i) in parentItem.pages"
              :key="item.title"
              link
              class="mb-0"
              router
              :to="item.link"
              exact
              color="primary"
            >
              <v-list-item-icon v-if="parentItem.header !== 'Subscriptions'">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class=" font-weight-medium subtitle-2">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2 mb-2"></v-divider>
          </div>
        </v-list>
      </div>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    account: '',
    items: [
      {
        header: 'home',
        pages: [
          { title: 'Home', link: '/', icon: 'mdi-home' },
          { title: 'Account', link: '/account', icon: 'mdi-flag' },
          {
            title: 'External Account',
            link: '/externalaccount',
            icon: 'mdi-robber',
          },
          { title: 'My NFT', link: '/mynft', icon: 'mdi-account-outline' },
          {
            title: 'VideoGuide',
            link: '/videoguide',
            icon: 'mdi-vhs',
          },
        ],
      },
    ],
    searchText: '',
  }),
  methods: {
    search() {
      if (!this.searchText) return
      this.$router.push({
        name: 'Search',
        query: { 'search-query': this.searchText },
      })
    },
  },
  mounted() {
    this.drawer = this.$vuetify.breakpoint.mdAndDown ? false : true
    const arrCookie = document.cookie.split('; ')
    for (let i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split('=')
      if (arr[0] == 'email') {
        this.account = arr[1]
        if (!this.$store.state.email) {
          this.$store.commit('setEmail', arr[1])
        }
      }
    }
  },
}
</script>

<style lang="scss">
#navbar {
  .active-item {
    // .v-list-item__icon {
    //   color: red !important;
    // }
  }
  .v-navigation-drawer__border {
    width: 0 !important;
  }

  .vuebar-element {
    height: 250px;
    width: 100%;
    max-width: 500px;
    background: #dfe9fe;
  }

  .vb > .vb-dragger {
    z-index: 5;
    width: 10px;
    right: 0;
  }

  .vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0, 0, 0, 0);
    transform: rotate3d(0, 0, 0, 0);
    -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out,
      height 100ms ease-out;
    transition: background-color 100ms ease-out, margin 100ms ease-out,
      height 100ms ease-out;

    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
  }

  .v-navigation-drawer__content:hover .vb > .vb-dragger > .vb-dragger-styler {
    width: 10px;
    background-color: #e0e0e0;
  }

  .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.3);
    background-color: rgba(255, 255, 255, 0.3);
  }

  .vb > .vb-dragger:hover > .vb-dragger-styler {
    margin: 0px;
    width: 10px;
  }

  .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.5);
    margin: 0px;
    height: 100%;
  }

  .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.5);
  }
}
</style>
