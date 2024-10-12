<template>
  <GPHistorySimple ref="gpHistorySimple"></GPHistorySimple>
  <div class="advise-box">
    交易建议：
    <br />
    上一个极值出现日期为： <span class="mark-data">{{ extremeDate }}</span
    >，黄金价格为 <span class="mark-data"> {{ extremePrice }}</span> 元每克。
    <br />
    最近交易记录日期为：
    <span class="mark-data">{{ recentDate }}</span
    >，黄金价格为 <span class="mark-data">{{ recentPrice }}</span> 元每克。
    <br />
    当前价格与极值相差
    <span class="mark-data">{{ difference }}</span> 元每克，变化比例为
    <span class="mark-data">{{ ratio }}</span> %。
    <br />
    {{ advise }}
  </div>
</template>
<script>
import GPHistorySimple from "@/components/gp-history-simple";
import { post } from "@/api/api";
import { toChineseDate } from "@/util/util";

export default {
  components: {
    GPHistorySimple,
  },
  data() {
    return {
      xArr: [],
      yArr: [],
      extremeDate: "--",
      extremePrice: "--",
      recentDate: "--",
      recentPrice: "--",
      difference: "--",
      ratio: "--",
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
    this.ratio = (this.difference / this.extremePrice / 100).toFixed(2);
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
      });
    },
    resolveAdvise() {
      if (this.ratio < 1.0) {
        this.advise = "当前变化幅度较小，不建议交易。";
      } else if (this.ratio < 3.0) {
        this.advise = "当前变化幅度适当，可考虑交易";
      } else {
        this.advise = "当前变化幅度较大，建议尽快交易";
      }
    },
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
