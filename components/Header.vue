<template>
  <header class="pt-1">

    <div class="slider">
      <div class="slide">
        <div class="relative flex header_height">

          <div class="bg-purple-200 w-2/3">
            <img class="h-full  ml-16" src="/img/cosmetic-bottle.png" alt="" />
          </div>

          <div class="absolute px-60 hero_heading">
            <h4 class="text-3xl text-gray-600">New</h4>
            <h1 class="text-8xl font-md leading-tight mb-4 text-white">Shower Gel</h1>
            <p class="text-pink-800 text-xl">Experience Luxury</p>
            <p class="mt-2">BODY FIRST : Bath Essentials To Add To Your Routine This Year</p>
            <p class="mt-2">
                From plush dead sea minerals to bathing bars that smell better than your favorite dessert, we love these formulas hyper tailored to coddle and protect every last inch of our skin.
                Read More On Fashion Store's Beauty Book >
            </p>
          </div>

          <div class="bg-green-200 w-1/3 flex flex-col justify-end">
            <button class="h-20 px-4 bg-red-500 text-white flex items-center justify-between hover:bg-red-600 ">
              <span class="transform hover:scale-110 motion-reduce:transform-none">SEE ALL</span>
              <img class="transform hover:scale-110 motion-reduce:transform-none" src="/img/arrow-right.svg" alt="" />
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="flex pt-3 justify-center space-x-5">
        <div class="w-2 h-2 bg-gray-500 rounded-full slide_dot"></div>
        <div class="w-2 h-2 bg-gray-500 rounded-full slide_dot"></div>
        <div class="w-2 h-2 bg-gray-500 rounded-full slide_dot"></div>
        <div class="w-2 h-2 bg-gray-500 rounded-full slide_dot"></div>
    </div>

  </header> 
</template> 
<script >
export default {
}
</script>
<style scoped>
.hero_heading{
 left:27%;
 top: 20%;
}
.header_height{
  max-height: 600px;
}
.slide_dot:hover{
  background-color:rgba(217, 119, 6, 0.548);
  transform:scale(1.2);

}

</style>