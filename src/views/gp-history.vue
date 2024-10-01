<template>
  <div class="search-box">
    <DatePicker
      :initDate="initDate"
      @handleDateChange="handleDateChange"
    ></DatePicker>
    <el-radio-group
      class="general-box"
      v-model="markChoose"
      @change="handleMarkChoose"
    >
      <el-radio-button label="峰值" value="chooseTop" />
      <el-radio-button label="谷值" value="chooseValley" />
    </el-radio-group>
    <el-button type="primary" circle class="general-box" @click="query"
      ><el-icon><Search /></el-icon
    ></el-button>
  </div>

  <GPHistoryList ref="gpHistoryList"></GPHistoryList>
</template>
<script>
import GPHistoryList from "@/components/gp-history-list";
import DatePicker from "@/components/date-picker";
import { post } from "@/api/api";
import { toFormatDateString } from "@/util/util";

export default {
  components: {
    GPHistoryList,
    DatePicker,
  },
  data() {
    return {
      endDate: null,
      startDate: null,
      initDate: null,
      markChoose: "chooseTop",
      topExtreme: [],
      valleyExtreme: [],
      markColor: "#fae5e5",
      xArr: [],
      yArr: [],
    };
  },
  created() {
    this.endDate = new Date();
    this.startDate = new Date();
    this.startDate.setMonth(this.startDate.getMonth() - 3);
    this.initDate = [this.startDate, this.endDate];
  },
  mounted() {
    this.query();
  },
  methods: {
    async query() {
      await post(
        "/api/queryGoldPrice",
        {
          startDate: toFormatDateString(this.startDate),
          endDate: toFormatDateString(this.endDate),
        },
        {}
      ).then((res) => {
        this.xArr = [];
        this.yArr = [];
        res.goldPriceList.forEach((element) => {
          this.xArr.push(element.date);
          this.yArr.push(element.close);
        });
        this.topExtreme = [];
        this.valleyExtreme = [];
        res.extremeList.forEach((element) => {
          if (element.type == "TOP") {
            this.topExtreme.push(element.interval);
          } else {
            this.valleyExtreme.push(element.interval);
          }
        });
        this.$refs.gpHistoryList.createOption(
          this.xArr,
          this.yArr,
          this.markChoose == "chooseTop" ? this.topExtreme : this.valleyExtreme,
          this.markColor
        );
      });
    },
    handleDateChange(dates) {
      this.startDate = dates[0];
      this.endDate = dates[1];
    },
    handleMarkChoose() {
      let extreme = [];
      if (this.markChoose == "chooseTop") {
        extreme = this.topExtreme;
        this.markColor = "#fae5e5";
      } else {
        extreme = this.valleyExtreme;
        this.markColor = "#d4f3cb";
      }
      if (this.xArr.length != 0 && this.yArr.length != 0) {
        this.$refs.gpHistoryList.createOption(
          this.xArr,
          this.yArr,
          extreme,
          this.markColor
        );
      }
    },
  },
};
</script>
<style scoped>
.search-box {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}
.general-box {
  margin-left: 100px;
}
</style>
