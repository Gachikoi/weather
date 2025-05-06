<template>
  <div>
    <t-typography-text theme="secondary">{{ position }}</t-typography-text>
    <t-button :onclick="getPositionHandler">获取定位</t-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from '../store';
import { MessagePlugin } from 'tdesign-vue-next';

const store = useStore()

const position = ref(localStorage.getItem('position') ? `纬度: ${JSON.parse(localStorage.getItem('position')!).latitude}, 经度: ${JSON.parse(localStorage.getItem('position')!).longitude}` : '请点击下方按钮获取定位以显示当前位置的天气详情');

const getPositionHandler = () => {
  // 获取定位
  navigator.geolocation.getCurrentPosition(
    (value) => {
      const { latitude, longitude } = value.coords;
      localStorage.setItem('position', JSON.stringify({ latitude, longitude }));
      position.value = `纬度: ${latitude}, 经度: ${longitude}`;
      store.getData(value.coords)
      MessagePlugin.success('获取定位成功');
    },
    () => {
      MessagePlugin.error('获取定位失败，请检查浏览器设置或网络连接');
      position.value = '获取定位失败，请检查浏览器设置或网络连接';
      localStorage.removeItem('position');
    },
    { enableHighAccuracy: true }
  );
};
</script>

<style lang="less" scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>