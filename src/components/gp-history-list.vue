<template>
  <div id="main" ref="main" class="list"></div>
</template>

<script>
import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  MarkAreaComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  MarkAreaComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

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
    createOption(xData, yData, markXAxis, markColor) {
      this.option = {
        title: {
          text: "黄金历史价格",
          subtext: "Au99.99",
        },
        tooltip: {
          trigger: "item",
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          top: 100,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xData,
          name: "日期",
        },
        yAxis: {
          type: "value",
          scale: true,
          name: "黄金每日收盘价（元/克）",
          axisLabel: {
            formatter: "{value}",
          },
          axisPointer: {
            snap: true,
          },
        },
        series: [
          {
            name: "黄金价格",
            type: "line",
            smooth: true,
            data: yData,
            lineStyle: {
              color: "#66BB6A",
            },
            itemStyle: {
              color: "#43A047",
            },
            markArea: {
              itemStyle: {
                color: markColor,
              },
              data: markXAxis,
            },
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
  height: 500px;
  width: 1000px;
  margin-left: 120px;
}
</style>
