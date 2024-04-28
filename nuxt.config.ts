// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/app.css"],
  mode: 'spa',
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "nuxt-server-utils",
    "@vee-validate/nuxt",
    "@samk-dev/nuxt-vcalendar",
    "@nuxtjs/i18n"
  ],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default
  },
  vue: {
    defineModel: true,
    propsDestructure: true,
  },
  runtimeConfig: {
    mongoUrls: [
      process.env.MONGODB_URI ?? "",
      process.env.MONGODB_URI1 ?? "",
      process.env.MONGODB_URI2 ?? "",
      process.env.MONGODB_URI3 ?? "",
      process.env.MONGODB_URI4 ?? "",
      process.env.MONGODB_URI5 ?? "",
    ],
  },
  nitro: {},
  // Vite configuration
  vite: {
    server: {
      hmr: {
        overlay: false,
      },
    },
  },
});