<template>
  <div class="relative pb-8 bg-gray-50 md:bg-white lg:bg-gray-50">
    <div class="container flex flex-row max-w-full p-4 mx-auto sm:p-8">
      <LeftUserProfile
        class="hidden w-1/4 bg-white border rounded-sm shadow lg:block"
      />
      <div class="w-full min-h-screen -mt-4 lg:pl-8 lg:w-3/4">
        <div class="w-full px-2 mx-auto mt-3 sm:w-2/3 md:w-1/2">
          <form class="text-sm text-primary-500">
            <div class="flex flex-col">
              <label for="cnumber" class="my-2">Card Number</label>
              <input
                type="text"
                id="cardnumber"
                name="cardnumber"
                placeholder="Enter card number"
                class="w-full h-10 px-2 text-sm text-gray-600 border-none rounded shadow ring-1 ring-gray-400 focus:outline-none focus:ring-primary-500"
              />
            </div>
            <div class="flex flex-col my-4">
              <label for="cname" class="my-2">Card Name</label>
              <input
                type="text"
                id="cardnumber"
                name="cardnumber"
                placeholder="Enter card Name"
                class="w-full h-10 px-2 text-sm text-gray-600 border-none rounded shadow ring-1 ring-gray-400 focus:outline-none focus:ring-primary-500"
              />
            </div>
            <div class="flex flex-row justify-between w-full my-4">
              <!-- months -->
              <div class="flex flex-col w-1/2">
                <label for="month" class="my-2">Expire Date</label>
                <select
                  name="month"
                  required
                  tabindex="4"
                  class="h-10 px-2 text-sm text-gray-600 border-none rounded shadow ring-1 ring-gray-400 focus:outline-none focus:ring-primary-500"
                >
                  <option value="Month" selected disabled>Month</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <!-- year -->
              <div class="flex flex-col w-1/2 ms-4">
                <label for="year" class="my-2">Expire Date</label>
                <select
                  name="year"
                  required
                  tabindex="4"
                  class="h-10 px-2 text-sm text-gray-600 border-none rounded shadow ring-1 ring-gray-400 focus:outline-none focus:ring-primary-500"
                >
                  <option value="Year" selected disabled>Year</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                  <option value="32">32</option>
                  <option value="33">33</option>
                  <option value="34">34</option>
                  <option value="35">35</option>
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                  <option value="40">40</option>
                  <option value="41">41</option>
                  <option value="42">42</option>
                  <option value="43">43</option>
                  <option value="44">44</option>
                  <option value="45">45</option>
                  <option value="46">46</option>
                  <option value="47">47</option>
                  <option value="48">48</option>
                  <option value="49">49</option>
                  <option value="50">50</option>
                  <option value="51">51</option>
                  <option value="52">52</option>
                  <option value="53">53</option>
                  <option value="54">54</option>
                  <option value="55">55</option>
                  <option value="56">56</option>
                  <option value="57">57</option>
                  <option value="58">58</option>
                  <option value="59">59</option>
                </select>
              </div>
            </div>
            <div class="flex flex-row justify-between mt-6">
              <button
                class="w-1/3 p-3 text-sm tracking-widest uppercase border rounded text-primary-500 border-primary-500 focus:outline-none focus:ring-opacity-80 hover:opacity-80 focus:ring focus:ring-offset-2 focus:ring-primary-500 lg:rounded"
              >
                cancle
              </button>
              <button
                class="w-2/3 p-3 text-sm tracking-widest text-white uppercase border rounded ms-3 border-primary-500 bg-primary-500 focus:outline-none focus:ring-opacity-80 hover:opacity-80 focus:ring focus:ring-offset-2 focus:ring-primary-500 lg:rounded"
              >
                save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="flex justify-center w-full">
      <Footer class="absolute bottom-0 hidden sm:flex" />
    </div>
  </div>
</template>
<script>
import Nav from '~/components/Home/Nav'

import LeftUserProfile from '~/components/User/LeftUserProfile'
import SavedCards from '~/components/User/Dashboard/SavedCards'
import Footer from '~/components/Footer'
export default {
  components: {
    Nav,
    Footer,

    LeftUserProfile,
    SavedCards,
  },
}
</script>
