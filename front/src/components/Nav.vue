<template>
  <div style="margin: 50px 0; ">

    <router-link :to="{ path: 'ordersList' }">
      <b-button variant="primary">
        Список заказов
      </b-button>
    </router-link>

    <router-link :to="{ path: 'Storehouse' }">
      <b-button variant="primary">
        Склад
      </b-button>
    </router-link>

    <router-link :to="{ path: 'Chart' }">
      <b-button variant="primary">
        График
      </b-button>
    </router-link>

  </div>
</template>
<script>
  export default {
    name: 'nav'
  }
</script>
