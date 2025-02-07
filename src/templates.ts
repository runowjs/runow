import colors from 'picocolors';
import { StackType } from './types';

const { blue, red, green,white,yellow, cyan, magenta, gray,  } = colors;

const templates: StackType[] = [
  {
    display: 'React',
    color: blue,
    items: [
      {
        display: 'Vite',
        items: [
          {
            display: 'Blank',
            names: ['react-vite-blank', 'react-vite'],
            path: 'react/vite/blank'
          },
          {
            display: 'Tailwind CSS',
            names: ['react-vite-tailwindcss', 'react-vite-tw'],
            path: 'react/vite/tailwind-css'
          },
          {
            display: 'Uno CSS',
            names: ['react-vite-unocss', 'react-vite-uno'],
            path: 'react/vite/uno-css'
          },
          {
            display: 'Headless UI',
            names: ['react-vite-headlessui'],
            path: 'react/vite/headless-ui'
          },
          {
            display: 'Ant Design',
            names: ['react-vite-antd'],
            path: 'react/vite/antd'
          },
          {
            display: 'Next UI',
            names: ['react-vite-nextui'],
            path: 'react/vite/next-ui'
          },
          {
            display: 'Shadcn UI',
            names: ['react-vite-shadcnui'],
            path: 'react/vite/shadcn-ui'
          },
          {
            display: 'Charka UI',
            names: ['react-vite-charkaui'],
            path: 'react/vite/charka-ui'
          },
          {
            display: 'MUI',
            names: ['react-vite-mui'],
            path: 'react/vite/mui'
          },
          {
            display: 'Radix UI',
            names: ['react-vite-radixui'],
            path: 'react/vite/radix-ui'
          },
          {
            display: 'Arco Design',
            names: ['react-vite-arco'],
            path: 'react/vite/arco'
          },
        ]
      },
      {
        display: 'Next.js',
        items: [
          {
            display: 'Blank',
            names: ['react-next-blank', 'react-next'],
            path: 'react/next/blank'
          },
          {
            display: 'Tailwind CSS',
            names: ['react-next-tailwindcss', 'react-next-tw'],
            path: 'react/next/tailwind-css'
          },
          {
            display: 'Uno CSS',
            names: ['react-next-unocss', 'react-next-uno'],
            path: 'react/next/uno-css'
          },
          {
            display: 'Headless UI',
            names: ['react-next-headlessui'],
            path: 'react/next/headless-ui'
          },
          {
            display: 'Ant Design',
            names: ['react-next-antd'],
            path: 'react/next/antd'
          },
          {
            display: 'Next UI',
            names: ['react-next-nextui'],
            path: 'react/next/next-ui'
          },
          {
            display: 'Shadcn UI',
            names: ['react-next-shadcnui'],
            path: 'react/next/shadcn-ui'
          },
          {
            display: 'Charka UI',
            names: ['react-next-charkaui'],
            path: 'react/next/charka-ui'
          },
          {
            display: 'MUI',
            names: ['react-next-mui'],
            path: 'react/next/mui'
          },
          {
            display: 'Radix UI',
            names: ['react-next-radixui'],
            path: 'react/next/radix-ui'
          },
          {
            display: 'Arco Design',
            names: ['react-next-arco'],
            path: 'react/next/arco'
          },
        ]
      },
      {
        display: 'Remix',
        items: [
          {
            display: 'Blank',
            names: ['react-remix-blank', 'react-remix'],
            path: 'react/remix/blank'
          },
          {
            display: 'Tailwind CSS',
            names: ['react-remix-tailwindcss', 'react-remix-tw'],
            path: 'react/remix/tailwind-css'
          },
          {
            display: 'Uno CSS',
            names: ['react-remix-unocss', 'react-remix-uno'],
            path: 'react/remix/uno-css'
          },
          {
            display: 'Headless UI',
            names: ['react-remix-headlessui'],
            path: 'react/remix/headless-ui'
          },
          {
            display: 'Ant Design',
            names: ['react-remix-antd'],
            path: 'react/remix/antd'
          },
          {
            display: 'Next UI',
            names: ['react-remix-nextui'],
            path: 'react/remix/next-ui'
          },
          {
            display: 'Shadcn UI',
            names: ['react-remix-shadcnui'],
            path: 'react/remix/shadcn-ui'
          },
          {
            display: 'Charka UI',
            names: ['react-remix-charkaui'],
            path: 'react/remix/charka-ui'
          },
          {
            display: 'MUI',
            names: ['react-remix-mui'],
            path: 'react/remix/mui'
          },
          {
            display: 'Radix UI',
            names: ['react-remix-radixui'],
            path: 'react/remix/radix-ui'
          },
          {
            display: 'Arco Design',
            names: ['react-remix-arco'],
            path: 'react/remix/arco'
          },
        ]
      }
    ]
  },
  {
    display: 'Vue',
    color: green,
    items: [
      {
        display: 'Vite',
        items: [
          {
            display: 'Blank',
            names: ['vue-vite-blank', 'vue-vite'],
            path: 'vue/vite/blank'
          },
          {
            display: 'Tailwind CSS',
            names: ['vue-vite-tailwindcss', 'vue-vite-tw'],
            path: 'vue/vite/tailwind-css'
          },
          {
            display: 'Uno CSS',
            names: ['vue-vite-unocss', 'vue-vite-uno'],
            path: 'vue/vite/uno-css'
          },
          {
            display: 'Headless UI',
            names: ['vue-vite-headlessui'],
            path: 'vue/vite/headless-ui'
          },
          {
            display: 'Nuxt UI',
            names: ['vue-vite-nuxtui'],
            path: 'vue/vite/nuxt-ui'
          },
          {
            display: 'Ant Design Vue',
            names: ['vue-vite-antdv'],
            path: 'vue/vite/antdv'
          },
          {
            display: 'Element UI',
            names: ['vue-vite-elementui'],
            path: 'vue/vite/element-ui'
          },
          {
            display: 'Naive UI',
            names: ['vue-vite-naiveui'],
            path: 'vue/vite/naive-ui'
          },
          {
            display: 'Vuetify',
            names: ['vue-vite-vuetify'],
            path: 'vue/vite/vuetify'
          },
          {
            display: 'Reka UI',
            names: ['vue-vite-rekaui'],
            path: 'vue/vite/reka-ui'
          },
          {
            display: 'Arco Design',
            names: ['vue-vite-arco'],
            path: 'vue/vite/arco'
          },
        ]
      },
      {
        display: 'Nuxt.js',
        items: [
          {
            display: 'Blank',
            names: ['vue-nuxt-blank', 'vue-nuxt'],
            path: 'vue/nuxt/blank'
          },
          {
            display: 'Tailwind CSS',
            names: ['vue-nuxt-tailwindcss', 'vue-nuxt-tw'],
            path: 'vue/nuxt/tailwind-css'
          },
          {
            display: 'Uno CSS',
            names: ['vue-nuxt-unocss', 'vue-nuxt-uno'],
            path: 'vue/nuxt/uno-css'
          },
          {
            display: 'Headless UI',
            names: ['vue-nuxt-headlessui'],
            path: 'vue/nuxt/headless-ui'
          },
          {
            display: 'Nuxt UI',
            names: ['vue-nuxt-nuxtui'],
            path: 'vue/nuxt/nuxt-ui'
          },
          {
            display: 'Ant Design Vue',
            names: ['vue-nuxt-antdv'],
            path: 'vue/nuxt/antdv'
          },
          {
            display: 'Element UI',
            names: ['vue-nuxt-elementui'],
            path: 'vue/nuxt/element-ui'
          },
          {
            display: 'Naive UI',
            names: ['vue-nuxt-naiveui'],
            path: 'vue/nuxt/naive-ui'
          },
          {
            display: 'Vuetify',
            names: ['vue-nuxt-vuetify'],
            path: 'vue/nuxt/vuetify'
          },
          {
            display: 'Reka UI',
            names: ['vue-nuxt-rekaui'],
            path: 'vue/nuxt/reka-ui'
          },
          {
            display: 'Arco Design',
            names: ['vue-nuxt-arco'],
            path: 'vue/nuxt/arco'
          },
        ]
      }
    ]
  },
  {
    display: 'Angular',
    color: magenta,
    items: [
      {
        display: 'Vite',
        items: [
          {
            display: 'Blank',
            names: ['angular-vite', 'angular-vite-blank'],
            path: 'angular/vite/blank'
          }
        ]
      },
    ]
  },
  {
    display: 'Solid',
    color: white,
    items: [
      {
        display: 'Vite',
        items: [
          {
            display: 'Blank',
            names: ['solid-vite', 'solid-vite-blank'],
            path: 'solid/vite/blank'
          }
        ]
      },
    ]
  },
  {
    display: 'Svelte',
    color: cyan,
    items: [
      {
        display: 'Vite',
        items: [
          {
            display: 'Blank',
            names: ['svelte-vite', 'svelte-vite-blank'],
            path: 'svelte/vite/blank'
          }
        ]
      },
    ]
  },
  {
    display: 'Astro',
    color: red,
    items: [
      {
        display: 'Vite',
        items: [
          {
            display: 'Blank',
            names: ['astro-vite', 'astro-vite-blank'],
            path: 'astro/vite/blank'
          }
        ]
      },
    ]
  },
  {
    display: 'Vanilla',
    color: yellow,
    items: [
      {
        display: 'Vite',
        items: [
          {
            display: 'Blank',
            names: ['vanilla-vite', 'vanilla-vite-blank', 'js-vite', 'js-vite-blank'],
            path: 'vanilla/vite/blank'
          }
        ]
      },
    ]
  },
  {
    display: 'Cross',
    color: gray,
    items: [
      {
        display: 'Electron',
        items: [
          {
            display: 'Blank',
            names: ['cross-electron', 'cross-electron-blank'],
            path: 'cross/electron/blank'
          }
        ]
      },
      {
        display: 'Flutter',
        items: [
          {
            display: 'Blank',
            names: ['cross-flutter', 'cross-flutter-blank'],
            path: 'cross/flutter/blank'
          }
        ]
      },
      {
        display: 'Uni App',
        items: [
          {
            display: 'Blank',
            names: ['cross-uniapp', 'cross-uniapp-blank'],
            path: 'cross/uni-app/blank'
          }
        ]
      },
      {
        display: 'Ionic',
        items: [
          {
            display: 'Blank',
            names: ['cross-ionic', 'cross-ionic-blank'],
            path: 'cross/ionic/blank'
          }
        ]
      },
      {
        display: 'Expo',
        items: [
          {
            display: 'Blank',
            names: ['cross-expo', 'cross-expo-blank'],
            path: 'cross/expo/blank'
          }
        ]
      },
    ]
  }
]

export default templates