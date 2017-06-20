<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import ordersList from './OrdersList.vue'

  export default {
    name: 'aut',
    components: {
      ordersList
    }
  }
</script>
