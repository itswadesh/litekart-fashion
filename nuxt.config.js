const dev = process.env.NODE_ENV !== 'production'
const HTTP_ENDPOINT = 'https://tapi.litekart.in'
const server = dev ? 'http://localhost:3000' : 'https://fashion.litekart.in'

export default {
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  ssr:false,
  components: true,
  plugins:[{ src: '~/plugins/lazy.js', mode: 'client' },],
  buildModules: [
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',
    'nuxt-webfontloader',
    '@nuxtjs/google-analytics',
  ],
  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/toast',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt',
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: server + '/graphql',
        // wsEndpoint: server.replace('http', 'ws') + '/graphql',
      },
    },
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
  },
  proxy: {
    '/graphql': HTTP_ENDPOINT,
    '/images': HTTP_ENDPOINT,
  },
  webfontloader: {
    google: {
      families: ['Lato:400,700'], //Loads Lato font with weights 400 and 700
    },
  },
}
