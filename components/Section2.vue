<template>
  <section class="w-11/12 ml-auto flex my-4">

    <div class="bg-red-400 w-2/5 pl-24 pt-10">

      <div class="w-60">
        <h4 class="text-white font-medium text-lg">Select All</h4>
        <h3
          class="text-white font-medium text-6xl leading-tight pb-4 border-b-2 border-white">
          Offer
        </h3>
        <p class="text-white pt-4">
          Subscribe to mail list <br />
          and get 15% off on First Order
        </p>
      </div>
      
      <div class="mt-16 pr-12">
        <form action="">

          <div>
            <input
              class="bg-red-600 text-white text-sm placeholder-white w-full p-3 outline-none focus:bg-red-800"
              type="Name"
              placeholder="Name"/>
          </div>

          <div class="mt-4">
            <input
              class="bg-red-600 text-white text-sm placeholder-white w-full p-3 outline-none focus:bg-red-800"
              type="Email"
              placeholder="your mail @gmail.com" />
          </div>

          <div class="pt-3">
            <button
              class="bg-black shadow-xl text-medium w-full text-white tracking-wide p-2 hover:bg-blue-900 focus:outline-none">
              SUBSCRIBE NOW
            </button>
          </div>

          <div class="flex mt-4">

            <div>
              <input
                type="checkbox"
                id="check"
                class="agree_checkbox"
                checked />
              <label for="check"></label>
            </div>

            <div class="ml-4">
              By clicking subscribe, you agree to our terms and <br />
              <a class="underline text-blue-700 hover:text-black" href="#"
                >Privacy policy</a>
            </div>

          </div>
          
        </form>
      </div>

    </div>

    <div class="w-3/5">
      <img class=" " src="/img/cosmetics-tools.png" alt="" />
    </div>
    
  </section>
</template>

<script>
export default {};
</script>

<style></style>
