<template>
  <div>
    <!-- v-for="(w, ix) in women" -->
    <!-- :key="ix" -->
    <div class="font-semibold text-gray-700 bg-gray-200 text-normal">
      <span @click="isWest = !isWest" class="flex flex-row justify-between p-3">
        </span>{{ women[0] }}</span>
        <chevron-down-icon size="1x" class="custom-class"></chevron-down-icon>
      </span>
      <Westernwear v-if="isWest" />

      <span class="flex flex-row justify-between p-3">
        </span>{{ women[1] }}</span>
        <chevron-down-icon size="1x" class="custom-class"></chevron-down-icon>
      </span>
      <span class="flex flex-row justify-between p-3">
        </span>{{ women[2] }}</span>
        <chevron-down-icon size="1x" class="custom-class"></chevron-down-icon>
      </span>
      <span class="flex flex-row justify-between p-3">
        </span>{{ women[3] }}</span>
        <chevron-down-icon size="1x" class="custom-class"></chevron-down-icon>
      </span>
      <span class="flex flex-row justify-between p-3">
        </span>{{ women[4] }}</span>
        <chevron-down-icon size="1x" class="custom-class"></chevron-down-icon>
      </span>
      <span class="flex flex-row justify-between p-3">
        </span>{{ women[5] }}</span>
        <chevron-down-icon size="1x" class="custom-class"></chevron-down-icon>
      </span>
      <span class="flex flex-row justify-between p-3">
        </span>{{ women[6] }}</span>
        <chevron-down-icon size="1x" class="custom-class"></chevron-down-icon>
      </span>
      <span class="flex flex-row justify-between p-3">
        </span>{{ women[7] }}</span>
        <chevron-down-icon size="1x" class="custom-class"></chevron-down-icon>
      </span>
      <span class="flex flex-row justify-between p-3">
        </span>{{ women[8] }}</span>
        <chevron-down-icon size="1x" class="custom-class"></chevron-down-icon>
      </span>
      <span class="flex flex-row justify-between p-3">
        </span>{{ women[9] }}</span>
        <chevron-down-icon size="1x" class="custom-class"></chevron-down-icon>
      </span>
      <span class="flex flex-row justify-between p-3">
        </span>{{ women[10] }}</span>
        <chevron-down-icon size="1x" class="custom-class"></chevron-down-icon>
      </span>
      <span class="flex flex-row justify-between p-3">
        </span>{{ women[11] }}</span>
        <chevron-down-icon size="1x" class="custom-class"></chevron-down-icon>
      </span>
    </div>
  </div>
</template>

<script>
import Westernwear from './Westernwear'
export default {
  data() {
    return {
      isWest: false,
      women: [
        'Westernwear',
        'Ethics and Fusionwear',
        'Footwear',
        'Lingerie',
        'Bag, wallet, Clutches',
        'Jewellery',
        'Other Accessories',
        'Beauty & Personal Care',
        'Sports and Activewear',
        'Luggage & Trolleys',
        'SleepWear and Longwear',
        'Watches',
        'Winterwear Store',
      ],
    }
  },
  components: {
    Westernwear,
  },
}
</script>
