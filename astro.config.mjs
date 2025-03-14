import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import starlight from "@astrojs/starlight";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  // https://docs.astro.build/en/guides/images/#authorizing-remote-images
  site: "https://screwfast.uk",
  image: {
    domains: ["images.unsplash.com"],
  },
  // i18n: {
  //   defaultLocale: "ru",
  //   locales: ["ru", "en", "fr"],
  //   fallback: {
  //     ru: "en",
  //   },
  //   routing: {
  //     prefixDefaultLocale: false,
  //   },
  // },
  prefetch: true,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "ru", // Все URL, которые не содержат `en` после `https://screwfast.uk/`, будут считаться основной локализацией, т.е. `ru`
        locales: {
          ru: "ru", // Значение `defaultLocale` должно присутствовать среди ключей `locales`
          en: "en",
          fr: "fr",
        },
      },
    }),
    starlight({
      title: "ScrewFast Документация",
      defaultLocale: "ru",
      // Если не предоставлено ни одной конфигурации локализации для Astro и Starlight, используется встроенная настройка локализации по умолчанию в Starlight, и соответствующая конфигурация для Astro генерируется/используется.
      // Если предоставлена только конфигурация локализации для Starlight, эквивалентная конфигурация для Astro генерируется/используется.
      // Если предоставлена только конфигурация локализации для Astro, конфигурация локализации для Starlight обновляется соответствующим образом.
      // Если предоставлены обе конфигурации — для Astro и Starlight, выбрасывается ошибка.
      locales: {
        ru: {
          label: "Русский",
          lang: "ru",
        },
        en: { label: "English", lang: "en" },
        de: { label: "Deutsch", lang: "de" },
        es: { label: "Español", lang: "es" },
        fa: { label: "فارسی", lang: "fa", dir: "rtl" },
        fr: { label: "Français", lang: "fr" },
        ja: { label: "日本語", lang: "ja" },
        "zh-cn": { label: "简体中文", lang: "zh-CN" },
      },
      // https://starlight.astro.build/guides/sidebar/
      sidebar: [
        {
          label: "Быстрый старт",
          translations: {
            en: "Quick Start Guides",
            de: "Schnellstartanleitungen",
            es: "Guías de Inicio Rápido",
            fa: "راهنمای شروع سریع",
            fr: "Guides de Démarrage Rapide",
            ja: "クイックスタートガイド",
            "zh-cn": "快速入门指南",
          },
          autogenerate: { directory: "guides" },
        },
        {
          label: "Инструменты и оборудование",
          items: [
            {
              label: "Руководства по инструментам",
              link: "tools/tool-guides/",
            },
            { label: "Уход за оборудованием", link: "tools/equipment-care/" },
          ],
        },
        {
          label: "Строительные услуги",
          autogenerate: { directory: "construction" },
        },
        {
          label: "Продвинутые темы",
          autogenerate: { directory: "advanced" },
        },
      ],
      social: {
        github: "https://github.com/mearashadowfax/ScrewFast",
      },
      disable404Route: true,
      customCss: ["./src/assets/styles/starlight.css"],
      favicon: "/favicon.ico",
      components: {
        SiteTitle: "./src/components/ui/starlight/SiteTitle.astro",
        Head: "./src/components/ui/starlight/Head.astro",
        MobileMenuFooter:
          "./src/components/ui/starlight/MobileMenuFooter.astro",
        ThemeSelect: "./src/components/ui/starlight/ThemeSelect.astro",
      },
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://screwfast.uk" + "/social.webp",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "twitter:image",
            content: "https://screwfast.uk" + "/social.webp",
          },
        },
      ],
    }),
    compressor({
      gzip: false,
      brotli: true,
    }),
    mdx(),
  ],
  experimental: {
    clientPrerender: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
