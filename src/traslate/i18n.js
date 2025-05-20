import { createI18n } from 'vue-i18n'

const messages = {
    es: {
        navbar: {
            title: 'Hola',
        }
    },
    en: {
        navbar: {
            title: 'Hello',
        }
    }
};
const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'es',
    messages
});

export default i18n;