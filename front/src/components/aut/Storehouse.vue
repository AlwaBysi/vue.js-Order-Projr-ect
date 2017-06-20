<template>
  <div>
    <navBar />
    <h1 class="text-center">Склад</h1>

    <div class="row">
      <div class="col-lg-6">
        <div class="wrap_for_table">
          <table class="table table-striped">
            <thead>
              <tr>
                <td v-for="item in fields">{{ item }}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cols">
                <td>{{ item.idIngr }}</td>
                <td>{{ item.ingredient }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.unit }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-center">На складе закончились</h3>
        <div v-for="item in cols">
          <div v-if="item.quantity < 0">{{ item.ingredient }},</div>
        </div>
      </div>
      <form class="col-lg-6" @submit.prevent="changeIngridient">
        <div class="row">
          <div class="col-lg-4">
            <span class="cols_name">Продукт</span>
            <input type="text" v-model="product" name="product" v-validate="'required'">
          </div>
          <div class="col-lg-4">
            <span class="cols_name">Количество</span>
            <input type="text" v-model="quantity">
          </div>
          <div class="col-lg-4">
            <span class="cols_name">Единица измерения</span>
            <input type="text" v-model="unit">
          </div>
          <div class="col-lg-12 padding_top">
            <b-button variant="primary" type="submit">
              Изменить
            </b-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import navBar from '../Nav.vue'

  export default {
    components: {
      navBar
    },
    methods: {
      changeIngridient () {
        const that = this
        $.ajax({
          type: 'POST',
          crossOrigin: true,
          url: 'http://localhost:3000/store',
          dataType: 'json',
          cache: false,
          data: {
            product: this.product,
            quantity: this.quantity,
            unit: this.unit
          },
          success: function (data) {
            that.$set(that, 'cols', data)
          }
        })
      }
    },
    name: 'storehouse',
    created () {
      this.$http.get('http://localhost:3000/store')
        .then((data) => {
          this.$set(this, 'cols', data.data)
        })
    },
    data () {
      return {
        fields: ['id', 'ингридиетн', 'количество', 'ед измерения'],
        cols: [],
        product: '',
        quantity: '',
        unit: ''
      }
    }
  }
</script>

<style>
  .wrap_for_table {
    height: 500px;
    overflow: scroll;
  }

  .cols_name {
    display: block;
  }

  .padding_top {
    margin-top: 50px;
  }
</style>
