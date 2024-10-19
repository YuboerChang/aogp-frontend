<template>
  <div id="main" ref="main" class="list"></div>
</template>

<script>
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";

import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

export default {
  data() {
    return {
      chartDom: null,
      chartInstance: null,
      option: null,
    };
  },
  mounted() {
    this.chartDom = this.$refs.main;
    this.chartInstance = echarts.init(this.chartDom);
  },
  methods: {
    createOption(xData, yData) {
      this.option = {
        title: {
          text: "黄金价格列表",
        },
        grid: {
          top: 80,
        },
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          type: "category",
          name: "日期",
          data: xData,
        },
        yAxis: {
          type: "value",
          scale: true,
          name: "黄金每日收盘价（元/克）",
          axisLabel: {
            margin: 10,
            formatter: "{value}",
          },
        },
        series: [
          {
            data: yData,
            type: "line",
            lineStyle: {
              color: "#E57373",
            },
            itemStyle: {
              color: "#F44336",
            },
            symbolSize: 20,
          },
        ],
      };
      this.chartInstance.setOption(this.option);
    },
  },
};
</script>
<style scoped>
.list {
  height: 450px;
  width: 920px;
  margin-left: 120px;
}
</style>
