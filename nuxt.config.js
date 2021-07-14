import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)

  ssr: false,
  head: {
    titleTemplate: '%s - Demo',
    title: 'Demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: '~/plugins/vueInit.js',
      ssr: true
    },
    {
      src: '~/plugins/vue_m_message.js',
      ssr: true
    }
  ],
  router: {
    middleware: ['auth'],
  },
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  loading: {
    color: '#E2088A'
  },
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://10.2.0.128:8801',
      pathRewrite: {
        '^/api': '/'
      }
    }, '/blockapi': {
      target: 'http://8.210.190.223:8027',
      pathRewrite: {
        '^/blockapi': '/'
      }
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: "#E2088A",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: "#E2088A",
        }
      }
    }
  },
  loaders: {
    vue: {
      transformAssetUrls: {
        'v-img': 'src'
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost,
  }
}
