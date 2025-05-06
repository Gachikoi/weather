import { defineStore } from "pinia";
import { ref } from "vue";
import { getWeatherData } from "../api";

interface Now {
  cloud: string;
  dew: string;
  humidity: string;
  icon: string;
  feelsLike: string;
  pressure: string;
  temp: string;
}
interface WeatherData {
  updateTime: string;
  now: Now;
}
interface Air {
  aqi: number;
  category: string;
  color: {
    alpha: number;
    blue: number;
    green: number;
    red: number;
  }
}
interface AirData {
  indexes: Air[]
}
export interface HourWeather {
  cloud: string;
  dew: string;
  humidity: string;
  temp: string;
  text: string;
  windDir: string;
  fxTime: string;
}
interface Future {
  hourly: HourWeather[]
}
const processWeatherData = (data: WeatherData) => {
  console.log(data)
  return data
}

const processAirData = (data: AirData) => {
  console.log(data)
  return data.indexes[0]
}

export const useStore = defineStore('store', () => {
  const weatherDetail = ref<WeatherData>()
  const airQuality = ref<Air>()
  const future = ref<Future>()

  async function getData(coords: any) {
    try {
      const result = await getWeatherData(coords)
      weatherDetail.value = processWeatherData(result?.weather)
      airQuality.value = processAirData(result?.air)
      console.log(result?.future)
      future.value = result?.future
    } catch { }
  }

  return { weatherDetail, airQuality, future, getData }
})