<template>
  <GPHistorySimple ref="gpHistorySimple"></GPHistorySimple>
  <div class="advise-box">
    交易建议：
    <br />
    上一个极值出现日期为：<span class="mark-data">{{ extremeDate }}</span
    >，类型为 <span class="mark-data">{{ extremeTypeMap(extremeType) }}</span
    >,黄金价格为 <span class="mark-data">{{ extremePrice }}</span> 元每克。
    <br />
    最近交易记录日期为： <span class="mark-data">{{ recentDate }}</span
    >，黄金价格为 <span class="mark-data">{{ recentPrice }}</span> 元每克。
    <br />
    当前价格与极值相差
    <span class="mark-data">{{ difference }}</span> 元每克，变化比例为
    <span class="mark-data">{{ ratio }}</span> %。
    {{ advise }}
    <br />
    {{ maybeNewExtreme }}
  </div>
</template>
<script>
import GPHistorySimple from "@/components/gp-history-simple";
import { post } from "@/api/api";
import { toChineseDate } from "@/util/util";
import { extremeTypeMap } from "@/util/filter";

export default {
  components: {
    GPHistorySimple,
  },
  data() {
    return {
      xArr: [],
      yArr: [],
      extremeDate: "--",
      extremeType: "--",
      extremePrice: "--",
      recentDate: "--",
      recentPrice: "--",
      difference: "--",
      ratio: "--",
      maybeNewExtreme: "",
      advise: "",
    };
  },
  async mounted() {
    await this.query();
    this.extremeDate = toChineseDate(this.xArr[0]);
    this.extremePrice = this.yArr[0];
    this.recentDate = toChineseDate(this.xArr[this.xArr.length - 1]);
    this.recentPrice = this.yArr[this.yArr.length - 1];
    this.difference = (this.recentPrice - this.extremePrice).toFixed(2);
    this.ratio = ((this.difference / this.extremePrice) * 100).toFixed(2);
    this.resolveMaybeNewExtreme();
    this.resolveAdvise();
  },
  methods: {
    async query() {
      await post("/api/queryAdvise", {}, {}).then((res) => {
        this.xArr = [];
        this.yArr = [];
        res.goldPriceList.forEach((element) => {
          this.xArr.push(element.date);
          this.yArr.push(element.close);
        });
        this.$refs.gpHistorySimple.createOption(this.xArr, this.yArr);
        this.extremeType = res.extremeType;
      });
    },
    resolveMaybeNewExtreme() {
      let maybeDow = true,
        maybeTop = true,
        end = this.yArr.length - 1;
      for (let i = end - 1; i >= end - 3; i--) {
        if (this.yArr[end] > this.yArr[i] && maybeTop) {
          // 结尾大，只能是峰值
          maybeDow = false;
        } else if (this.yArr[end] < this.yArr[i] && maybeDow) {
          // 结尾小，只能是谷值
          maybeTop = false;
        } else {
          maybeTop = false;
          maybeDow = false;
          break;
        }
      }
      if (maybeTop) {
        this.maybeNewExtreme =
          "从近几日价格升降来看，前3天价格均小于当前价格，可能是新的峰值，可考虑卖出。";
      }
      if (maybeDow) {
        this.maybeNewExtreme =
          "从近几日价格升降来看，前3天价格均大于当前价格，可能是新的谷值，可考虑买入。";
      }
    },
    resolveAdvise() {
      if (this.ratio >= 5.0) {
        this.advise = "涨幅较大，建议尽快卖出。";
      } else if (this.ratio >= 2.0) {
        this.advise = "涨幅适当，可考虑卖出。";
      } else if (Math.abs(this.ratie) < 2.0) {
        this.advise = "变化幅度较小，不建议交易。";
      } else if (this.ratio <= -5.0) {
        this.advise = "跌幅较大，建议尽快买入。";
      } else {
        this.advise = "跌幅适当，可考虑买入。";
      }
      this.advise = "从价格变化比例来看，" + this.advise;
    },
    extremeTypeMap,
  },
};
</script>
<style scoped>
.advise-box {
  margin: 10px 150px;
  line-height: 30px;
}
.mark-data {
  color: #ff8a65;
}
</style>
