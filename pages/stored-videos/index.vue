<template>
  <section class="flex">
    <SidebarOfStoredVideos />
    <AllStoredVideos />
  </section>
</template>

<script>
import SidebarOfStoredVideos from '~/components/StoredVideos/SidebarOfStoredVideos.vue'
import AllStoredVideos from '~/components/StoredVideos/AllStoredVideos.vue'
export default {
  components: {
    SidebarOfStoredVideos,
    AllStoredVideos,
  },
}
</script>

<style></style>
