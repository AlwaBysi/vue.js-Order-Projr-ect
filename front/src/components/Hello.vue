<template>
  <div>
    <form @submit.prevent="addOrder">
      <div class="row">
        <div class="col-lg-6"><p class="text-right">Фамилия и имя</p></div>
        <div class="col-lg-3"><input type="text" v-model="names" placeholder="Фамилия и имя"></div>
      </div>

      <div class="row">
        <div class="col-lg-6"><p class="text-right">Выберите торт</p></div>
        <div class="col-lg-3">
          <select name="cake" id="cake" v-model="cake" @change="changeSelect">
            <option value="" disabled>Выберите торт</option>
            <option value="1">медовый</option>
            <option value="2">наполен</option>
            <option value="3">прага</option>
            <option value="4">тирамесу</option>
            <option value="5">птичье молоко</option>
            <option value="6">чизкейк</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6"><p class="text-right">Выберите вес торта</p></div>
        <div class="col-lg-3">
          <select name="weight" id="weight" v-model="weight" @change="changeSelect">
            <option value="" disabled>Выберите вес торта</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
            <option value="2.5">2.5</option>
            <option value="3">3</option>
            <option value="3.5">3.5</option>
            <option value="4">4</option>
            <option value="4.5">4.5</option>
            <option value="5">5</option>
            <option value="5.5">5.5</option>
            <option value="6">6</option>
            <option value="6.5">6.5</option>
            <option value="7">7</option>
            <option value="7.5">7.5</option>
            <option value="8">8</option>
            <option value="8.5">8.5</option>
            <option value="9">9</option>
            <option value="9.5">9.5</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6"><p class="text-right">Цена</p></div>
        <div class="col-lg-3"><input type="text" v-model="price" placeholder="Цена" disabled></div>
      </div>

      <div class="row">
        <div class="col-lg-6"><p class="text-right">Дата доставки</p></div>
        <div class="col-lg-3">
          <datepicker format="dd.MM.yyyy" :value="timeDelivery" v-model="timeDelivery"/>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6"><p class="text-right">Пожелания по оформлению</p></div>
        <div class="col-lg-3"><textarea v-model="wish" name="wish" id="wish" cols="30" rows="10" placeholder="Пожелания по оформлению"></textarea></div>
      </div>

      <div class="row">
        <div class="col-lg-6"><p class="text-right">Телефон</p></div>
        <div class="col-lg-3"><input type="text" v-model="phone" placeholder="Телефон"></div>
      </div>

      <div class="row">
        <b-button variant="primary" type="submit">
          Заказать
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
  import $ from 'jquery'
  import datepicker from 'vuejs-datepicker'
  import moment from 'moment'
  import navigation from './Nav.vue'

  export default {
    name: 'hello',
    components: {
      datepicker,
      navigation
    },
    data () {
      return {
        names: '',
        cake: '',
        price: '',
        weight: '',
        wish: '',
        phone: '',
        timeDelivery: new Date()
      }
    },
    methods: {
      changeSelect () {
        if (this.cake.length && this.weight.length) {
          this.$http.get('http://localhost:3000/orders', { cake: this.cake }).then(res => {
            const price = Number(this.weight) * Number(res.data.price1kg)
            this.$set(this, 'price', price)
          })
        }
      },
      addOrder () {
        $.ajax({
          type: 'POST',
          crossOrigin: true,
          url: 'http://localhost:3000/orders',
          dataType: 'json',
          cache: false,
          data: {
            names: this.names,
            cake: this.cake,
            price: this.price,
            weight: this.weight,
            phone: this.phone,
            wish: this.wish,
            timeDelivery: moment(this.timeDelivery).format('YYYY-MM-DD')
          },
          always: function () {
            alert('Заказ отправлен')
          }
        }).then(function () {
          debugger
          alert('Заказ отправлен')
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
