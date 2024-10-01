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
          text: "黄金历史价格分析",
          subtext: "Au99.99",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xData,
        },
        yAxis: {
          type: "value",
          scale: true,
          axisLabel: {
            formatter: "{value} 元",
          },
          axisPointer: {
            snap: true,
          },
        },
        series: [
          {
            name: "GoldPrice",
            type: "line",
            smooth: true,
            data: yData,
            lineStyle: {
              color: "green",
            },
            itemStyle: {
              color: "green",
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
<style>
.list {
  height: 500px;
  width: 1000px;
  margin-left: 100px;
}
</style>
