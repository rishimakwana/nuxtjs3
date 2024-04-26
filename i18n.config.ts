import defineI18nConfig from "@nuxtjs/i18n"
import enLocale from "./locales/en.json";
import idLocale from "./locales/id.json";

export default defineI18nConfig(() => ({
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'id', iso: 'id-ID', name: 'Bahasa Indonesia' }
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: enLocale,
        id: idLocale
      }
    }
}));
