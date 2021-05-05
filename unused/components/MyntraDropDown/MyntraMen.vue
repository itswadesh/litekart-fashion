<template>
  <div class="pl-5 -mt-3">
    <span class="flex flex-col -pt-2">
      <ul @click="topWear = !topWear" class="flex flex-row justify-between">
        <li class="flex flex-row pt-3 pb-3 pl-3 font-semibold text-gray-600">
          Topwear
        </li>
        <li class="mt-3">
          <chevron-right-icon
            size="1x"
            class="text-gray-500 custom-class"
          ></chevron-right-icon>
        </li>
      </ul>
      <!-- MenTopWear component called -->
      <MenTopwear v-if="topWear" class="mt-4" />
      <!--  -->
      <ul class="flex flex-row justify-between">
        <li
          class="flex flex-row pt-3 pb-3 pl-3 font-normal font-semibold text-gray-600"
        >
          Indian & Festive Wear
        </li>
        <li class="mt-3">
          <chevron-right-icon
            size="1x"
            class="text-gray-500 custom-class"
          ></chevron-right-icon>
        </li>
      </ul>
      <ul class="flex flex-row justify-between">
        <li
          class="flex flex-row pt-3 pb-3 pl-3 font-normal font-semibold text-gray-600"
        >
          Bottomwear
        </li>
        <li class="mt-3">
          <chevron-right-icon
            size="1x"
            class="text-gray-500 custom-class"
          ></chevron-right-icon>
        </li>
      </ul>
      <ul class="flex flex-row justify-between">
        <li
          class="flex flex-row pt-3 pb-3 pl-3 font-normal font-semibold text-gray-600"
        >
          Innerwear & Sleepwear
        </li>
        <li class="mt-3">
          <chevron-right-icon
            size="1x"
            class="text-gray-500 custom-class"
          ></chevron-right-icon>
        </li>
      </ul>
      <ul class="flex flex-row justify-between">
        <li
          class="flex flex-row pt-3 pb-3 pl-3 font-normal font-semibold text-gray-600"
        >
          Plus Size
        </li>
        <li class="mt-3">
          <chevron-right-icon
            size="1x"
            class="text-gray-500 custom-class"
          ></chevron-right-icon>
        </li>
      </ul>
      <ul class="flex flex-row justify-between">
        <li
          class="flex flex-row pt-3 pb-3 pl-3 font-normal font-semibold text-gray-600"
        >
          Footwear
        </li>
        <li class="mt-3">
          <chevron-right-icon
            size="1x"
            class="text-gray-500 custom-class"
          ></chevron-right-icon>
        </li>
      </ul>
      <ul class="flex flex-row justify-between">
        <li
          class="flex flex-row pt-3 pb-3 pl-3 font-normal font-semibold text-gray-600"
        >
          Personal Care & Grooming
        </li>
        <li class="mt-3">
          <chevron-right-icon
            size="1x"
            class="text-gray-500 custom-class"
          ></chevron-right-icon>
        </li>
      </ul>
      <ul class="flex flex-row justify-between">
        <li
          class="flex flex-row pt-3 pb-3 pl-3 font-normal font-semibold text-gray-600"
        >
          Sunglasses & Frames
        </li>
        <li class="mt-3">
          <chevron-right-icon
            size="1x"
            class="text-gray-500 custom-class"
          ></chevron-right-icon>
        </li>
      </ul>
      <ul class="flex flex-row justify-between">
        <li
          class="flex flex-row pt-3 pb-3 pl-3 font-normal font-semibold text-gray-600"
        >
          Watches
        </li>
        <li class="mt-3">
          <chevron-right-icon
            size="1x"
            class="text-gray-500 custom-class"
          ></chevron-right-icon>
        </li>
      </ul>
      <ul class="flex flex-row justify-between">
        <li
          class="flex flex-row pt-3 pb-3 pl-3 font-normal font-semibold text-gray-600"
        >
          Sports & Active Wear
        </li>
        <li class="mt-3">
          <chevron-right-icon
            size="1x"
            class="text-gray-500 custom-class"
          ></chevron-right-icon>
        </li>
      </ul>
    </span>
  </div>
</template>

<script>
import MenTopwear from './MenTopwear'

export default {
  data() {
    return {
      topWear: false,
    }
  },
  components: {
    MenTopwear,
  },
}
</script>
