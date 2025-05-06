<template>
  <div class="app">
    <div v-if="store.weatherDetail && store.airQuality" class="wrapper">
      <div class="weather" @click="openDrawer">
        <t-statistic title="天气详情" :value="store.weatherDetail.now.temp" unit="度" />
      </div>
      <t-drawer size="100%" v-model:visible="detailVisible" :cancelBtn="null" placement="bottom"
        :onConfirm="() => detailVisible = false">
        <div class="echart" id="echart1"></div>
        <div class="echart" id="echart2"></div>
      </t-drawer>
      <div class="air-quality">
        <t-statistic title="空气质量指数" :value="store.airQuality.aqi" unit="AQI" />
      </div>
      <div class="update-time">
        <t-typography-text theme="secondary">更新时间：{{ updateTime }}</t-typography-text>
      </div>
    </div>
    <Position class="position" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import Position from './components/Position.vue';
import { useStore, type HourWeather } from './store';
import * as echarts from 'echarts';

const detailVisible = ref(false)
const updateTime = ref(new Date().toLocaleString());

const store = useStore();

const openDrawer = async () => {
  detailVisible.value = true
  await nextTick()
  const myChart1 = echarts.init(document.getElementById('echart1')!)
  myChart1.setOption({
    title: {
      text: '温度'
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: store.future?.hourly.length ?? 0 }, (_, i) => `后${i}小时`)
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: store.future?.hourly.map((item: HourWeather) => item.temp),
      type: 'line'
    }]
  })
  const myChart2 = echarts.init(document.getElementById('echart2')!)
  myChart2.setOption({
    title: {
      text: '湿度'
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: store.future?.hourly.length ?? 0 }, (_, i) => `后${i}小时`)
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: store.future?.hourly.map((item: HourWeather) => item.humidity),
      type: 'line'
    }]
  })
}

onMounted(() => {
  if (localStorage.getItem('position')) {
    store.getData({
      latitude: JSON.parse(localStorage.getItem('position')!).latitude,
      longitude: JSON.parse(localStorage.getItem('position')!).longitude
    })
  }
  setInterval(() => {
    updateTime.value = new Date().toLocaleString();
    if (localStorage.getItem('position')) {
      store.getData({
        latitude: JSON.parse(localStorage.getItem('position')!).latitude,
        longitude: JSON.parse(localStorage.getItem('position')!).longitude
      })
    }
  }, 10000)
})

</script>

<style lang="less" scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20vw;
  width: 100%;
  height: 100vh;
  background-image: url('./assets/background.jpeg');

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20vw;
  }

  .weather {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40vw;
    height: 30vw;
    margin-top: 10vw;
    border-radius: 4vw;
    box-shadow: 0 1vw 1vw rgba(0, 0, 0, 0.1);
    background-color: white;

    &:active {
      background-color: #e6e6e6;
      transition: all ease-in-out 0.2s;
    }
  }

  .air-quality {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40vw;
    height: 30vw;
    border-radius: 4vw;
    box-shadow: 0 1vw 1vw rgba(0, 0, 0, 0.1);
    background-color: white;

    &:active {
      background-color: #e6e6e6;
      transition: all ease-in-out 0.2s;
    }
  }

  .update-time {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90vw;
    height: 10vw;
    border-radius: 4vw;
    box-shadow: 0 1vw 1vw rgba(0, 0, 0, 0.1);
    background-color: white;
  }

  .echart {
    width: 100%;
    height: 50%;
  }

  .position {
    justify-self: end;
    width: 90vw;
    height: 30vw;
    border-radius: 4vw;
    box-shadow: 0 1vw 1vw rgba(0, 0, 0, 0.1);
    background-color: white;
  }
}
</style>
