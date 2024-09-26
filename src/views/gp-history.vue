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

  <GPHistoryList></GPHistoryList>
</template>
<script>
import GPHistoryList from "@/components/gp-history-list";
import DatePicker from "@/components/date-picker";

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
    this.startDate.setFullYear(this.startDate.getFullYear() - 1);
    this.initDate = [this.startDate, this.endDate];
  },
  methods: {
    query() {
      console.log("startDate:", this.startDate);
      console.log("endDate:", this.endDate);
    },
    handleDateChange(dates) {
      this.startDate = dates[0];
      this.endDate = dates[1];
    },
  },
};
</script>
<style>
.search-box {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}
.button-box {
  margin-left: 100px;
}
</style>
