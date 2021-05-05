<template>
  <div class="bg-white">
    <span v-for="(w,ix) in western" :key="ix" class="flex flex-row p-3 pl-8 text-sm">
      </span>{{w.tag}}</span>
    </span>
  </div>
</template>

<script>
import MEGAMENU from '~/gql/category/megamenu.gql'
export default {
    data(){
        return{
          megamenu:null,
            western:[
                {tag:'Drsses and Jumpsuit'},
                {tag: 'Top Tshirts, Shirts'},
                {tag:'Jeans & Jeggings'},
                {tag:'Trousers'},
                {tag:'Skirt'},
                {tag:'Short'},
                {tag:'Sweaters & Sweatshirts'},
                {tag:'Jackets & Coats'},
                {tag:'Srug'},
                {tag:'Blazzes & Waistecoats'}
            ]
        }
    },
}
</script>