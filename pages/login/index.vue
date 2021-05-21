<template>
  <v-container>
    <v-row>
      <v-col md="6">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          ></v-checkbox>

          <v-btn
            :disabled="!valid || $store.state.auth.busy"
            color="primary"
            class="mr-2"
            @click.prevent="login"
          >
            {{ $store.state.auth.busy ? 'Loading ...' : 'Login' }}
          </v-btn>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-2"
            @click="validate"
          >
            Validate
          </v-btn>

          <v-btn color="error" class="mr-2" @click="reset"> Reset Form </v-btn>

          <v-btn color="warning" @click="resetValidation">
            Reset Validation
          </v-btn>
        </v-form>
      </v-col>
      <v-col md="3">
        <v-btn @click="$auth.loginWith('google')">Login with google</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'Login',
  layout: 'login',
  data: () => ({
    valid: true,
    email: 'duyentb@goofinity.com',
    password: 'admin',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    checkbox: true,
  }),

  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },

    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(err)
      }
    },
  },
}
</script>
