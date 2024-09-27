<template>
  <div class="search-box">
    <DatePicker
      :initDate="initDate"
      @handleDateChange="handleDateChange"
    ></DatePicker>
    <el-button type="primary" circle class="button-box" @click="query"
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
    };
  },
  created() {
    this.endDate = new Date();
    this.startDate = new Date();
    this.startDate.setMonth(this.startDate.getMonth() - 3);
    this.initDate = [this.startDate, this.endDate];
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
        let xArr = [];
        let yArr = [];
        res.goldPriceList.forEach((element) => {
          xArr.push(element.date);
          yArr.push(element.close);
        });
        this.$refs.gpHistoryList.createOption(xArr, yArr);
      });
    },
    handleDateChange(dates) {
      this.startDate = dates[0];
      this.endDate = dates[1];
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
.button-box {
  margin-left: 100px;
}
</style>
