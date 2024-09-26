<template>
  <div class="block">
    <span class="tips">请选择日期：</span>
    <el-date-picker
      v-model="value"
      type="daterange"
      unlink-panels
      range-separator="至"
      :shortcuts="shortcuts"
      @change="dateChange"
    /></div
></template>

<script>
export default {
  props: ["initDate"],
  data() {
    return {
      value: [new Date(), new Date()],
      shortcuts: [
        {
          text: "近1周",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
        {
          text: "近1月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setMonth(end.getMonth() - 1);
            return [start, end];
          },
        },
        {
          text: "近3月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setMonth(end.getMonth() - 3);
            return [start, end];
          },
        },
        {
          text: "近1年",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setFullYear(end.getFullYear() - 1);
            return [start, end];
          },
        },
        {
          text: "近3年",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setFullYear(end.getFullYear() - 3);
            return [start, end];
          },
        },
      ],
    };
  },
  mounted() {
    if (this.$props.initDate) {
      this.value = this.$props.initDate;
    }
  },
  methods: {
    dateChange(value) {
      this.$emit("handleDateChange", value);
    },
  },
};
</script>

<style>
.block {
  padding: 30px 0px;
  text-align: left;
}
.tips {
  margin-right: 20px;
  font-size: 14px;
}
</style>
