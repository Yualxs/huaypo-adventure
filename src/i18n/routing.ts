import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'es', 'pt'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // Tu configuración actual (oculta /en)

  // --- NUEVO: TRADUCCIÓN DE RUTAS (SEO PREMIUM) ---
  pathnames: {
    '/': '/', // Home es igual para todos
    
    // About
    '/about': {
      en: '/about',
      es: '/nosotros',
      pt: '/quem-somos'
    },

    // Contact
    '/contact': {
      en: '/contact',
      es: '/contacto',
      pt: '/fale-conosco'
    },

    // Blog
    '/blog': {
      en: '/blog',
      es: '/blog',
      pt: '/blog'
    },

    // Book (Wizard)
    '/book': {
      en: '/book',
      es: '/reservar',
      pt: '/reservar'
    },

    // Partners (B2B)
    '/partners': {
      en: '/partners',
      es: '/socios',
      pt: '/parceiros'
    },

    // Plan
    '/plan': {
      en: '/plan',
      es: '/planifica',
      pt: '/planeje'
    },

    // Legal: Terms
    '/terms': {
      en: '/terms',
      es: '/terminos',
      pt: '/termos'
    },

    // Legal: Privacy
    '/privacy': {
      en: '/privacy',
      es: '/privacidad',
      pt: '/privacidade'
    },

    // Legal: ESNNA
    '/code-esnna': {
      en: '/code-esnna',
      es: '/codigo-esnna',
      pt: '/codigo-esnna'
    },

    // Legal: Complaints Book
    '/complaints-book': {
      en: '/complaints-book',
      es: '/libro-de-reclamaciones',
      pt: '/livro-de-reclamacoes'
    },

    // Thank You Page
    '/thank-you': {
      en: '/thank-you',
      es: '/gracias',
      pt: '/obrigado'
    },

    // --- RUTAS DINÁMICAS (TOURS) ---
    // Aquí es más complejo porque el [slug] también cambia.
    // Para la fase 1, traducimos solo la base "/tours".
    // El slug lo manejaremos luego con Sanity.
    '/tours': {
      en: '/tours',
      es: '/tours', // 'tours' se entiende bien en español, o podrías usar '/viajes'
      pt: '/tours'
    },
    
    // Rutas dinámicas genéricas (se mantienen igual por ahora)
    '/tours/[slug]': {
      en: '/tours/[slug]',
      es: '/tours/[slug]',
      pt: '/tours/[slug]'
    },

    '/collections/[slug]': {
        en: '/collections/[slug]',
        es: '/colecciones/[slug]',
        pt: '/colecoes/[slug]'
    }
  }
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);