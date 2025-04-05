import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Шпаргалки по IT",
  description: "Just playing around",
  base: '/vitepress/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Шпаргалки', link: '/markdown-examples' },
      { text: 'Ссылки', link: '/links' },
      { text: 'Разное', link: '/other/' },
      { text: 'Руководства', link: '/guide/guide' }
    ],

    sidebar: [
      {
        text: 'База JS',
        collapsible: true,
        collapsed: true,
        sidebarKey: 'group1',
        items: [
          {
            text: 'Массивы',
            collapsible: true,
            collapsed: true,
            items: [
              { text: 'Методы массивов', link: '/basics_js/array_methods' },
              { text: 'Массивы', link: '/basics_js/arrays' },
            ]
          },
          {
            text: 'Объекты',
            collapsible: true,
            collapsed: true,
            items: [
              { text: 'Методы объектов', link: '/basics_js/object_methods' },
              { text: 'Объекты', link: '/basics_js/objects' },
            ]
          },
          {
            text: 'Асинхронное программирование',
            collapsible: true,
            collapsed: true,
            items: [
              { text: 'База', link: '/basics_js/async' },
              { text: 'Промисы', link: '/basics_js/promises' },
            ]
          },
          {text: 'Event Loop', link: '/basics_js/event_loop'},
          {text: 'Design patterns', link: '/basics_js/design_patterns'},
          {text: 'Design principles', link: '/basics_js/design_principles'},
          {text: 'Dom', link: '/basics_js/dom'},
          {text: 'Events', link: '/basics_js/events'},
          {text: 'Functions', link: '/basics_js/functions'},
          {text: 'Map', link: '/basics_js/map'},
          {text: 'Set', link: '/basics_js/set'},
          {text: 'Modules', link: '/basics_js/modules'},
          {text: 'Numbers', link: '/basics_js/numbers'},
          {text: 'Strings', link: '/basics_js/strings'},
          {text: 'Часто задаваемые вопросы', link: '/basics_js/questions_1'},
          {text: 'Основные принципы ООП', link: '/basics_js/solid'},
          {text: 'WCAG', link: '/basics_js/WCAG'},
        ]
      },
      {
        text: 'База Vue',
        collapsible: true,
        collapsed: true,
        sidebarKey: 'group2',
        items: [
          {text: 'Components', link: '/basics_vue/components'},
          {text: 'Composables', link: '/basics_vue/composables'},
          {text: 'Composition Api', link: '/basics_vue/composition-api'},
          {text: 'Lifecycle Hooks', link: '/basics_vue/lifecycle_hooks'},
          {text: 'Реактивность', link: '/basics_vue/reactivity'},
          {text: 'Script Setup', link: '/basics_vue/script-setup'},
          {text: 'Suspense', link: '/basics_vue/suspense'},
          {text: 'defineModel', link: '/basics_vue/defineModel'},
          {text: 'Template Refs', link: '/basics_vue/templateRefs'},
          {text: 'Watch Effect', link: '/basics_vue/watchEffect'},
        ]
      },
      {
        text: 'Руководства',
        link: '/guide/guide'
      },
      {
        text: 'Разное',
        link: '/other/'
      },
      {
        text: 'Ссылки',
        link: '/links/'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AlexeyZelenko/vitepress' }
    ]
  }
});