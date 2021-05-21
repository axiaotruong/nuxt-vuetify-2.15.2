import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - nuxt-vuetify',
    title: 'nuxt-vuetify',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://i18n.nuxtjs.org/
    'nuxt-i18n',
    // https://auth.nuxtjs.org/guide/setup
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://ecomdy-api.goofinity.com',
  },

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en-US.js',
      },
      {
        code: 'vi',
        name: 'Vietnamese',
        file: 'vi-VN.js',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
    // routes: {
    //   'product/_id': {
    //     en: '/product/:id?',
    //     vi: '/san-pham/:id?',
    //   },
    // },
    vueI18n: {
      numberFormats: {
        en: {
          currency: {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0, // set fraction digits to 0 to remove cents
            maximumFractionDigits: 2,
          },
        },
        vi: {
          currency: {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0, // set fraction digits to 0 to remove cents
            maximumFractionDigits: 2,
          },
        },
      },
    },
    // detectBrowserLanguage: {
    //   useCookie: true,
    //   cookieKey: 'i18n_redirected',
    //   onlyOnRoot: true, // recommended
    // },
    skipSettingLocaleOnNavigate: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      home: '/',
      // callback: '/callback',
    },
    strategies: {
      local: {
        token: {
          property: 'id_token', // property from api response
        },
        user: {
          property: false, // set false if api fetch user not contain data property
          // autoFetch: false,
        },
        endpoints: {
          login: {
            url: 'https://ecomdy-admin.goofinity.com/api/authenticate',
            method: 'post',
          },
          user: {
            url: 'https://ecomdy-admin.goofinity.com/api/account',
            method: 'get',
          },
          // set false if no needs logout api.
          logout: false,
        },
        tokenRequired: true,
      },
      // localRefresh: {
      //   scheme: 'refresh',
      //   token: {
      //     property: 'token.accessToken',
      //     maxAge: 15,
      //   },
      //   refreshToken: {
      //     property: 'token.refreshToken',
      //     data: 'refreshToken',
      //     maxAge: false,
      //   },
      // },
      facebook: {
        endpoints: {
          userInfo:
            'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        },
        clientId: '1671464192946675',
        scope: ['public_profile', 'email', 'user_birthday'],
      },
      google: {
        clientId:
          '907833463685-sjjqln9bqflrg0rmf66f3uf46as6namu.apps.googleusercontent.com',
      },
    },
  },
}
