<template>
  <section class="p-8">
    <div class="flex items-center justify-between h-72">
      <div class="p-1 rounded-md hover:bg-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 h-7"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <!-- video section start  -->
      <div id="responsiveVideoWrapper" className="relative h-full w-full">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/zihoyz0u_cs"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <!-- video section end -->
      <div class="p-1 rounded-md hover:bg-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 h-7"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <!-- Live channels we think you’ll like section start  -->
    <div class="my-10">
      <h3 class="my-4 text-xl font-semibold">
        Live channels we think you’ll like
      </h3>

      <div>
        <div
          class="container flex flex-wrap items-center justify-start mx-auto mb-5 space-x-2"
        >
          <LiveVideoCard v-for="(v, vx) in videocards" :key="vx" :video="v" />
        </div>
        <ShowMore />
      </div>
    </div>

    <!-- Live channels we think you’ll like section end -->
    <!-- Categories we think you’ll like section start -->

    <div class="my-10">
      <h3 class="my-4 text-xl font-semibold">
        <nuxt-link
          to="#"
          class="text-purple-500 hover:text-purple-700 hover:underline"
          >Categories</nuxt-link
        >
        we think you’ll like
      </h3>

      <div>
        <div
          class="container flex flex-wrap items-center justify-between mx-auto mb-5 space-x-2"
        >
          <BannerCard v-for="(c, cx) in cards" :key="cx" :banner="c" />
        </div>
        <ShowMore />
      </div>
    </div>

    <!-- Categories we think you’ll like section end -->
    <!-- Live channels we think you’ll like section start  -->
    <div class="my-10">
      <h3 class="my-4 text-xl font-semibold">
        Recommended
        <nuxt-link
          to="#"
          class="text-purple-500 hover:text-purple-700 hover:underline"
          >Just Chatting</nuxt-link
        >
        channels
      </h3>

      <div>
        <div
          class="container flex flex-wrap items-center justify-start mx-auto mb-5 space-x-2"
        >
          <LiveVideoCard v-for="(v, vx) in videocards" :key="vx" :video="v" />
        </div>
        <ShowMore />
      </div>
    </div>

    <!-- Live channels we think you’ll like section end -->
  </section>
</template>

<script>
import LiveVideoCard from '~/components/Livenow/LiveVideoCard.vue'
import BannerCard from '~/components/Livenow/BannerCard.vue'
import ShowMore from '~/components/ShowMore.vue'

export default {
  components: {
    LiveVideoCard,
    BannerCard,
    ShowMore,
  },
  data() {
    return {
      videocards: [
        {
          link: '#',
          img: '/img/eyeshadow-woman.jpg',
          title: `[Nopixel] X BECOMES SUPERHUMAN AND TAKES OVER THE CITY. ABSOLUTE
          CRIMINAL MASTERMIND PHARAOH WARLORD (GONE BAD)(PRISON STREAM) NEW PC`,
          name: '307k viewers',
          description: 'Grand Theft Auto V',
          button1: 'English',
          button2: 'Anime',
        },
        {
          link: '#',
          img: '/img/eyeshadow-woman.jpg',
          title: `[Nopixel] X BECOMES SUPERHUMAN AND TAKES OVER THE CITY. ABSOLUTE
          CRIMINAL MASTERMIND PHARAOH WARLORD (GONE BAD)(PRISON STREAM) NEW PC`,
          name: '307k viewers',
          description: 'Grand Theft Auto V',
          button1: 'English',
          button2: 'Anime',
        },
        {
          link: '#',
          img: '/img/eyeshadow-woman.jpg',
          title: `[Nopixel] X BECOMES SUPERHUMAN AND TAKES OVER THE CITY. ABSOLUTE
          CRIMINAL MASTERMIND PHARAOH WARLORD (GONE BAD)(PRISON STREAM) NEW PC`,
          name: '307k viewers',
          description: 'Grand Theft Auto V',
          button1: 'English',
          button2: 'Anime',
        },
      ],
      cards: [
        {
          link: '#',
          img: '/img/eyeshadow-woman.jpg',
          title: 'Just Chatting',
          viewers: '307k viewers',
          button: 'IRL',
        },
        {
          link: '#',
          img: '/img/eyeshadow-woman.jpg',
          title: 'Just Chatting',
          viewers: '307k viewers',
          button: 'IRL',
        },
        {
          link: '#',
          img: '/img/eyeshadow-woman.jpg',
          title: 'Just Chatting',
          viewers: '307k viewers',
          button: 'IRL',
        },
        {
          link: '#',
          img: '/img/eyeshadow-woman.jpg',
          title: 'Just Chatting',
          viewers: '307k viewers',
          button: 'IRL',
        },
        {
          link: '#',
          img: '/img/eyeshadow-woman.jpg',
          title: 'Just Chatting',
          viewers: '307k viewers',
          button: 'IRL',
        },
        {
          link: '#',
          img: '/img/eyeshadow-woman.jpg',
          title: 'Just Chatting',
          viewers: '307k viewers',
          button: 'IRL',
        },
        {
          link: '#',
          img: '/img/eyeshadow-woman.jpg',
          title: 'Just Chatting',
          viewers: '307k viewers',
          button: 'IRL',
        },
      ],
    }
  },
}
</script>

<style></style>
