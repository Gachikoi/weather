export const fetchData = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "X-QW-Api-Key": "890ecac1fa274af0bd24955077eaf4c9",
      "Cache-Control": "max-age=7200, stale-while-revalidate=3600",
    },
    // cache: "force-cache",  // 强制使用浏览器缓存
  });
  if (!response.ok) throw new Error("网络请求失败");
  return response.json();
};

// 获取数据
export const getWeatherData = async (coords:any) => {
  try {
    const [weatherRes, airRes,future] = await Promise.all([
      fetchData(
        `https://ne7p3yctu4.re.qweatherapi.com/v7/weather/now?location=${coords.longitude},${coords.latitude}`
      ),
      fetchData(
        `https://ne7p3yctu4.re.qweatherapi.com/airquality/v1/current/${coords.latitude}/${coords.longitude}`
      ),
      fetchData(
        `https://ne7p3yctu4.re.qweatherapi.com/v7/weather/24h?location=${coords.longitude},${coords.latitude}`
      ),
    ]);
    return {
      weather: weatherRes,
      air: airRes,
      future,
    }
  } catch (err) {
    console.error("获取天气数据失败", err);
  }
};