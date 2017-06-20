<template>
  <div class="wrap">
    <navBar />
    <h1 class="text-center">Список заказов</h1>
    <h3 class="text-center">Новых заказов: {{ newCount }}</h3>
    <div class="row paddings">
      <div class="col-md-3">C</div>
      <div class="col-md-3"><datepicker @input="changeDate" format="dd.MM.yyyy" :value="startDate" v-model="startDate"/></div>
      <div class="col-md-3">По</div>
      <div class="col-md-3"><datepicker @input="changeDate" format="dd.MM.yyyy" :value="endDate" v-model="endDate"/></div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th v-for="item in fields">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cols" v-if="!item.hide">
          <td>{{ item.idOrders }}</td>
          <td>{{ item.Customer }}</td>
          <td>{{ item.namecake }}</td>
          <td>{{ item.Weight }} кг</td>
          <td>{{ item.Price }} руб.</td>
          <td>{{ item.Data }}</td>
          <td>{{ item.Comment }}</td>
          <td>{{ item.Phone }}</td>
          <td>
            <div v-if="!item.Confirmed">
              <b-button variant="primary" @click="Confir(item.idOrders, item.idCake, item.Weight, item.Data)">
                Подтвердить
              </b-button>
              <b-button variant="primary" @click="deleteOrder(item.idOrders)">
                Удалить
              </b-button>
            </div>
            <div v-else>
              Подтвержден
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import datepicker from 'vuejs-datepicker'
  import $ from 'jquery'
  import _ from 'lodash'
  import moment from 'moment'
  import navBar from '../Nav.vue'

  export default {
    components: {
      datepicker,
      navBar
    },
    methods: {
      deleteOrder (orderId) {
        const that = this
        $.ajax({
          type: 'POST',
          crossOrigin: true,
          url: 'http://localhost:3000/OrdersList',
          dataType: 'json',
          cache: false,
          data: {
            id: orderId,
            deleteOrder: true
          }
        }).then((res) => {
          const obj = _.findIndex(that.cols, { idOrders: res })
          that.$set(that.cols[obj], 'hide', true)
        })
      },
      Confir (orderId, idCake, weight, date) {
        const that = this
        $.ajax({
          type: 'POST',
          crossOrigin: true,
          url: 'http://localhost:3000/OrdersList',
          dataType: 'json',
          cache: false,
          data: {
            id: orderId,
            idCake: idCake,
            weight: weight,
            date: date
          }
        }).then((res) => {
          const obj = _.findIndex(that.cols, { idOrders: res })
          that.cols[obj].Confirmed = 1
        })
      },
      changeDate () {
        const that = this
        $.when(this.$http.get('http://localhost:3000/OrdersList', { startTime: moment(this.startDate).format('YYYY-MM-DD'), endTime: moment(this.endDate).format('YYYY-MM-DD') }), this.$http.get('http://localhost:3000/Cakes')).done((orders, cakes) => {
          orders.data.forEach(item => {
            const cakeName = _.find(cakes.data, { idCake: item.idCake })
            item.namecake = cakeName.namecake
            item.Data = item.Data.substring(0, 10)
          })
          that.$set(that, 'cols', orders.data)
        })
      },
      getNewOrder () {
        const that = this
        this.$http.get('http://localhost:3000/OrdersList', { startTime: moment(this.startDate).format('YYYY-MM-DD'), endTime: moment(this.endDate).format('YYYY-MM-DD') }).then(res => {
          res.data.forEach(item => {
            if (!item.Confirmed) {
              that.newCount += 1
            }
          })
        })
      }
    },
    created () {
      this.changeDate()
      this.getNewOrder()
    },
    name: 'ordersList',
    data () {
      return {
        fields: ['id', 'Заказчик', 'Торт', 'Вес', 'Цена', 'Дата', 'Пожелания по оформлению', 'Телефон', 'Потвержден'],
        cols: [],
        startDate: new Date(),
        endDate: new Date(),
        newCount: 0
      }
    }
  }
</script>

<style>
  .wrap {
    width: 1000px;
    margin: auto;
  }

  .paddings {
    margin: 50px 0;
  }
</style>
