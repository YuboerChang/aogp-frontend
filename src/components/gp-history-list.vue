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
    createOption(xData, yData) {
      this.option = {
        title: {
          text: "Distribution of Electricity",
          subtext: "Fake Data",
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
          // prettier-ignore
          data: xData
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} W",
          },
          axisPointer: {
            snap: true,
          },
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 6,
              color: "green",
            },
            {
              gt: 6,
              lte: 8,
              color: "red",
            },
            {
              gt: 8,
              lte: 14,
              color: "green",
            },
            {
              gt: 14,
              lte: 17,
              color: "red",
            },
            {
              gt: 17,
              color: "green",
            },
          ],
        },
        series: [
          {
            name: "Electricity",
            type: "line",
            smooth: true,
            // prettier-ignore
            data: yData,
            markArea: {
              itemStyle: {
                color: "rgba(255, 173, 177, 0.4)",
              },
              data: [
                [
                  {
                    name: "Morning Peak",
                    xAxis: "07:30",
                  },
                  {
                    xAxis: "10:00",
                  },
                ],
                [
                  {
                    name: "Evening Peak",
                    xAxis: "17:30",
                  },
                  {
                    xAxis: "21:15",
                  },
                ],
              ],
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
  height: 400px;
  width: 800px;
}
</style>
