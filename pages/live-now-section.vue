<template>
  <section class="flex bg-gray-50">
    <div>
      <Sidebar />
    </div>
    <div class="w-full">
      <Livenow />
    </div>
  </section>
</template>

<script>
import Sidebar from '~/components/Livenow/Sidebar.vue'
import Livenow from '~/components/Livenow/Livenow.vue'
export default {
  components: {
    Sidebar,
    Livenow,
  },
}
</script>

<style></style>
