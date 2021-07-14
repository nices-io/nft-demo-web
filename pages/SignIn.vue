<!--
 * @Descripttion: 
 * @Author: cui
 * @Date: 2020-08-12 02:08:41
 * @LastEditors: cui
 * @LastEditTime: 2021-03-05 13:34:44
-->
<template>
  <v-container fluid class="fill-height">
    <v-row>
      <v-col cols="12" xs="12" sm="6" md="5" lg="4" class="ma-auto">
        <v-card class="px-8 pt-6 pb-12" outlined>
          <v-card-title class="text-center"
            ><img src="~/assets/images/logo.png" style="width:160px;"
          /></v-card-title>
          <v-card-subtitle class="mb-5">Sign in</v-card-subtitle>
          <v-card-text>
            <ValidationObserver ref="form" v-slot="{ handleSubmit, reset }">
              <form
                @submit.prevent="handleSubmit(signin)"
                @reset.prevent="reset"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="email"
                    :error-messages="errors"
                    label="Email"
                    outlined
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <p class="ma-0 text-right">
                    <v-btn
                      text
                      small
                      class="pl-0 text-capitalize"
                      color="primary"
                      href="true"
                      >Forget Password?</v-btn
                    >
                  </p>
                  <v-text-field
                    v-model="password"
                    type="password"
                    :error-messages="errors"
                    label="Password"
                    outlined
                  ></v-text-field>
                </ValidationProvider>
                <div class="mt-6 d-flex justify-space-between">
                  <v-btn
                    text
                    small
                    class="pl-0 text-capitalize"
                    color="primary"
                    router
                    to="signup"
                    >Create account</v-btn
                  >
                  <v-btn type="submit" class="primary" depressed>Sign in</v-btn>
                </div>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { login } from '@/assets/apilist'
export default {
  name: 'SignIn',
  data: () => ({
    email: '',
    password: '',
  }),
  created() {
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    this.$store.commit('setEmail', '')
  },
  methods: {
    signin() {
      login({ userName: this.email, pws: this.password }).then((res) => {
        if (res.code == 200) {
          this.$store.commit('setEmail', this.email)

          this.$router.push({ path: '/' })
          document.cookie = 'email=' + this.email
        }
      })
    },
  },
}
</script>

<style></style>
