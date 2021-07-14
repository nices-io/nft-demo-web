<template>
    <v-app>
        <nav-bar v-if="$route.name != 'SignIn' && $route.name != 'SignUp'"></nav-bar>
        <div v-else style="height: 104px"></div>
        <v-main>

            <!-- Provides the application the proper gutter -->
            <v-container fluid>

                <!-- If using vue-router -->
                <router-view></router-view>
            </v-container>
        </v-main>

    </v-app>
</template>

<script>
import NavBar from "../components/NavBar";
export default {
    components: {NavBar},
  created() {
      console.log(this.$route)
  },
    data () {
    return {
        drawer: true,
        items: [
            { title: 'Account', icon: 'mdi-account' },
            { title: 'Home', icon: 'mdi-home-city' },
        ],
        mini: true,
    }
  }
}
</script>
