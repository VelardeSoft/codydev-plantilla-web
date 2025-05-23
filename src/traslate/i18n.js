import { createI18n } from 'vue-i18n'

const messages = {
    es: {
        navbar: {
            title: '¡Sobrin@ entregamos tu pedido en 30 minutos!',
            home: 'Hola!',
            welcome: 'Bienvenido a Tambo',
        },
    },
    en: {
        navbar: {
            title: 'We deliver your order in 30 minutes!',
            home: 'Home',
            welcome: 'Welcome to Tambo',
        },
    }
};
const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'es',
    messages
});

export default i18n;