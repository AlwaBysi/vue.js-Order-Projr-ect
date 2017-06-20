<template>
  <div class="container">
    <navBar />
    <chart />

    <h1 class="text-center">Список ингредиентов</h1>

    <table class="table table-striped">
      <thead>
      <tr>
        <th v-for="item in fields">{{ item }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in ingr">
        <td>
          <span>{{ item.name }}</span>
        </td>
        <td>
          <span v-if="item.data[0]">{{ item.data[0] }}</span>
          <span v-else>-</span>
        </td>
        <td>
          <span v-if="item.data[1]">{{ item.data[1] }}</span>
          <span v-else>-</span>
        </td>
        <td>
          <span v-if="item.data[2]">{{ item.data[2] }}</span>
          <span v-else>-</span>
        </td>
        <td>
          <span v-if="item.data[3]">{{ item.data[3] }}</span>
          <span v-else>-</span>
        </td>
        <td>
          <span v-if="item.data[4]">{{ item.data[4] }}</span>
          <span v-else>-</span>
        </td>
        <td>
          <span v-if="item.data[5]">{{ item.data[5] }}</span>
          <span v-else>-</span>
        </td>
        <td>
          <span v-if="item.data[6]">{{ item.data[6] }}</span>
          <span v-else>-</span>
        </td>
        <td>
          <span v-if="item.data[7]">{{ item.data[7] }}</span>
          <span v-else>-</span>
        </td>
        <td>
          <span v-if="item.data[8]">{{ item.data[8] }}</span>
          <span v-else>-</span>
        </td>
        <td>
          <span v-if="item.data[9]">{{ item.data[9] }}</span>
          <span v-else>-</span>
        </td>
        <td>
          <span v-if="item.data[10]">{{ item.data[10] }}</span>
          <span v-else>-</span>
        </td>
        <td>
          <span v-if="item.data[11]">{{ item.data[11] }}</span>
          <span v-else>-</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import chart from './LineChart.js'
  import $ from 'jquery'
  import _ from 'lodash'
  import navBar from '../Nav.vue'

  export default {
    created () {
      this.getIngr()
    },
    methods: {
      /* eslint-disable */
      getIngr () {
        const that = this

        $.ajax({
          type: 'GET',
          crossOrigin: true,
          url: 'http://localhost:3000/store'
        }).then(data => {

          data.forEach(item => {
            that.ingrName.push({
              id: item.idIngr,
              name: item.ingredient
            })
          })
        })

        $.ajax({
          type: 'GET',
          crossOrigin: true,
          url: 'http://localhost:3000/ingr'
        }).then((data) => {
          const datasets = []

          data.forEach(item => {

            if (_.find(datasets, {idIngr: item.idIngr})) {

              datasets[_.findIndex(datasets, {idIngr: item.idIngr})].data.splice((item['MONTH(Date)']) - 1, 1, item['SUM(Quantity)'])
            if (item.idIngr === 14) {
              console.log((item['MONTH(Date)']) - 1 +'price'+ (item['SUM(Quantity)']))
              console.log()
            }
            } else {
              if (item.idIngr === 14) { console.log((item['MONTH(Date)']) - 1 +'price'+ (item['SUM(Quantity)'])) }
              const dataArr = []
              dataArr.length = item['MONTH(Date)']
              dataArr.splice((item['MONTH(Date)'] - 1), 1, item['SUM(Quantity)'])
              datasets.push({
                idIngr: item.idIngr,
                data: dataArr,
                name: _.find(that.ingrName, {id: item.idIngr}).name
              })
            }
          })

          datasets.forEach(item => {
            let x = 0
            let s = 0
            let result

            if (item.data.length < 14) { // первая формула
              item.data.forEach(arrItem => {
                if (arrItem) {
                  s += Number(arrItem)
                  x += 1
                }
              })
              result = s / x
            } else if (item.data.length > 13 && item.data.length < 27) { // вторая формула

              let numberMonth = Number(item.data.length) -12
              let x = 0
              let y = 0
              numberMonth.forEach((numberM, i) => [
                x += item.data[item.data.length - i],
                y += item.data[i]
              ])
              result = x * item.data[numberMonth]/ y

            } else if (item.data.length > 27 && item.data.length < 40) { // третья формула

              let numberMonth = Number(item.data.length) - 25
              let x = 0
              let y = 0
              let z = 0
              let indexArr = 0
              numberMonth.forEach((numberM, i) => [
                indexArr++,
                x += Number(item.data[item.data.length - i]) / 2,
                y += Number(item.data[i]),
                z = Number(item.data[12 + i])
              ])

              result = x * (item.data[indexArr]/y) + item.data[12 + indexArr]/z
            } else if (item.data.length > 39 && item.data.length < 53) { // четвертая

              let x = 0
              let y = 0
              let y2 = 0
              let z = 0
              let z2 = 0
              let indexArr = 0
              let d = 0
              let d2 = 0

              // перед скобками
              item.data.forEach((Data, i) => {
                let numb = item.data.length
                if (i > 36 && i < numb) {
                  x += Data
                }
              }),
                x = x / 3,

                // первое выражение
                y += Number(item.data[item.data.length - 36]),

                item.data.forEach((Data, i) => {
                  let numb = item.data.length - 37
                  if (i < numb) {
                    y2 += Data
                  }
                }),
                y = y / y2,

                // второе выражение
                z += Number(item.data[item.data.length - 24]),

                item.data.forEach((Data, i) => {
                  let numb = item.data.length - 25
                  if (i > 12 && i < numb) {
                    z2 += Data
                  }
                }),
                z = z / z2,

                // третье выражение
                d += Number(item.data[item.data.length - 12]),

                item.data.forEach((Data, i) => {
                  let numb = item.data.length - 13
                  if (i > 24 && i < numb) {
                    d2 += Data
                  }
                }),
                d = d / d2,

                result = x + y + z + d
            } else if (item.data.length > 52 && item.data.length < 66) { // пятая формула

              let x = 0
              let y = 0
              let y2 = 0
              let z = 0
              let z2 = 0
              let m = 0
              let m2 = 0
              let d = 0
              let d2 = 0

              // перед скобками
              item.data.forEach((Data, i) => {
                let numb = item.data.length
                if (i > 48 && i < numb) {
                  x += Data
                }
              }),
                x = x / 4,

                // первое выражение
                y += Number(item.data[item.data.length - 48]),

                item.data.forEach((Data, i) => {
                  let numb = item.data.length - 48
                  if (i < numb) {
                    y2 += Data
                  }
                }),
                y = y / y2,

                // второе выражение
                z += Number(item.data[item.data.length - 36]),

                item.data.forEach((Data, i) => {
                  let numb = item.data.length - 37
                  if (i > 12 && i < numb) {
                    z2 += Data
                  }
                }),
                z = z / z2,

                // третье выражение
                d += Number(item.data[item.data.length - 24]),

                item.data.forEach((Data, i) => {
                  let numb = item.data.length - 25
                  if (i > 24 && i < numb) {
                    d2 += Data
                  }
                }),
                d = d / d2,

                // четвертое выражение
                m += Number(item.data[item.data.length - 12]),

                item.data.forEach((Data, i) => {
                  let numb = item.data.length - 13
                  if (i > 36 && i < numb) {
                    m2 += Data
                  }
                }),

                m = m / m2

              result = x + y + z + d + m

            } else if (item.data.length > 65 && item.data.length < 78) {
              let x = 0
              let y = 0
              let y2 = 0
              let z = 0
              let z2 = 0
              let m = 0
              let m2 = 0
              let d = 0
              let d2 = 0
              let g = 0
              let g2 = 0

              // перед скобками
              item.data.forEach((Data, i) => {
                let numb = item.data.length
                if (i > 60 && i < numb) {
                  x += Data
                }
              }),
                x = x / 5,

                // первое выражение
                y += Number(item.data[item.data.length - 60]),

                item.data.forEach((Data, i) => {
                  let numb = item.data.length - 61
                  if (i < numb) {
                    y2 += Data
                  }
                }),
                y = y / y2,

                // второе выражение
                z += Number(item.data[item.data.length - 48]),

                item.data.forEach((Data, i) => {
                  let numb = item.data.length - 49
                  if (i > 12 && i < numb) {
                    z2 += Data
                  }
                }),
                z = z / z2,

                // третье выражение
                d += Number(item.data[item.data.length - 36]),

                item.data.forEach((Data, i) => {
                  let numb = item.data.length - 37
                  if (i > 24 && i < numb) {
                    d2 += Data
                  }
                }),
                d = d / d2,

                // четвертое выражение
                m += Number(item.data[item.data.length - 24]),

                item.data.forEach((Data, i) => {
                  let numb = item.data.length - 25
                  if (i > 36 && i < numb) {
                    m2 += Data
                  }
                }),

                m = m / m2

              // четвертое выражение
              g += Number(item.data[item.data.length - 12]),

                item.data.forEach((Data, i) => {
                  let numb = item.data.length - 13
                  if (i > 48 && i < numb) {
                    m2 += Data
                  }
                }),

                g = g / g2

              result = x + y + z + d + m
            } else {
              result = 0
            }

            result = result.toFixed(2)

            item.data.push(result)
          })
          that.ingr = datasets

        })



      }
    },
    data () {
      return {
        fields: ['Ингредиент','январь', 'Февраль', 'март', 'апрель', 'май', 'Июнь', 'июль', 'август', 'сентябрь', 'ноябрь', 'декабрь'],
        ingr: [],
        ingrName: []
      }
    },
    components: {
      chart,
      navBar
    }
  }
</script>
