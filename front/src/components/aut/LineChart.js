import {Line} from 'vue-chartjs'
import $ from 'jquery'
import _ from 'lodash'
// import moment from 'moment'

export default Line.extend({
  methods: {
    getRandomColor () {
      let letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
  },
  mounted () {
    /* eslint-disable */
    const that = this
    const datasets = []
    $.when(this.$http.get('http://localhost:3000/chart'), this.$http.get('http://localhost:3000/Cakes')).done((res, cakes) => {
      res.data.forEach(item => {
        if (_.find(datasets, { idCake: item.idCake })) {
          datasets[_.findIndex(datasets, { idCake: item.idCake })].data.splice((item['MONTH(Data)'] - 1), 1, item['SUM(Weight)'])
        } else {
          const dataArr = []
          const color = that.getRandomColor()
          dataArr.length = item['MONTH(Data)']
          dataArr.splice((item['MONTH(Data)'] - 1), 1, item['SUM(Weight)'])
          datasets.push({
            idCake: item.idCake,
            label: _.find(cakes.data, { idCake: item.idCake }).namecake,
            borderColor: color,
            pointBackgroundColor: color,
            borderWidth: 2,
            pointBorderColor: color,
            fill: false,
            data: dataArr
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
        }

        result.toFixed(2)

        item.data.push(result)
      })

      that.renderChart({
        labels: ['январь', 'Февраль', 'март', 'апрель', 'май', 'Июнь', 'июль', 'август', 'сентябрь', 'ноябрь', 'декабрь'],
        datasets: datasets
      }, { responsive: true, maintainAspectRatio: false })
    })
  }
})
