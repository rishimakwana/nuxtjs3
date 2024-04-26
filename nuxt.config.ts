// https://nuxt.com/docs/api/configuration/nuxt-config
import i18nConfig from './i18n.config'; // Import your i18n configuration file

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/app.css'],
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    "nuxt-server-utils",
    '@vee-validate/nuxt',
    '@nuxtjs/i18n',
    '@samk-dev/nuxt-vcalendar',
    // '@nuxtjs/toast',
  ],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  i18n: {
    vueI18n: i18nConfig
  },
  // toast: {
  //   position: 'top-center',
  //   register: [ // Register custom toasts
  //     {
  //       name: 'my-error',
  //       message: 'Oops...Something went wrong',
  //       options: {
  //         type: 'error'
  //       }
  //     }
  //   ]
  // },
  vue: {
    defineModel: true,
    propsDestructure: true
  },
  runtimeConfig: {
    mongoUrls: [process.env.MONGODB_URI ?? "",
    process.env.MONGODB_URI1 ?? "",
    process.env.MONGODB_URI2 ?? "",
    process.env.MONGODB_URI3 ?? "",
    process.env.MONGODB_URI4 ?? "",
    process.env.MONGODB_URI5 ?? "",
    ]
  },
  nitro: {},
  // imports: {
  //   presets: [
  //     {
  //       from: 'vue-i18n',
  //       imports: ['useI18n']
  //     }
  //   ]
  // }
  // colorMode: {
  //   preference: 'light'
  // }
})
