<template>
  <section class="w-full m-5 md:m-10 xl:m-20">
    <div>
      <SingleStoredVideoCard />
    </div>
  </section>
</template>

<script>
import SingleStoredVideoCard from '~/components/StoredVideos/SingleStoredVideoCard.vue'

export default {
  components: {
    SingleStoredVideoCard,
  },
}
</script>

<style></style>
