<template>
<div class="navbar bg-gray-100 mb-2 h-10 shadow">
  <div class="navbar-start"></div>
  <div class="navbar-center">
    <a href="#" class="h-12">
      <img src="@/assets/logo.png" class="h-full object-contain mx-auto" alt="Logo">
    </a>
  </div>
  <div class="navbar-end">
    <span class="font-title mr-2">config</span>
  </div>

</div>

</template>

<script>
import { defineComponent, } from "vue";

export default defineComponent({
  name: "NavigationBar",

  setup() {
    
  },
})
</script>