<template>
  <div>
    <span class="item-box"
      >购买日期：<el-date-picker
        v-model="buyDate"
        type="date"
        @change="handleBuyDate"
    /></span>
    <span class="item-box"
      >购买价格：<digitInput
        v-model="buyPrice"
        :isMoney="true"
        :disabled="buyPriceDisable"
      /> </span
    ><span class="item-box"
      >购买金额：<digitInput v-model="buyAmount" :isMoney="true"
    /></span>
  </div>
  <div>
    <span class="item-box"
      >售出日期：<el-date-picker
        v-model="sellDate"
        type="date"
        @change="handleSellDate"
    /></span>
    <span class="item-box"
      >售出价格：<digitInput
        v-model="sellPrice"
        :isMoney="true"
        :disabled="sellPriceDisable"
    /></span>
  </div>
  <div>
    <span class="item-box"
      >手续费：<digitInput v-model="customFee" :isMoney="true" /></span
    ><span class="item-box"
      >手续费率（%）：<digitInput v-model="customRate" maxlength="4"
    /></span>
  </div>
  <div class="button-div">
    <el-button type="primary" @click="calculate" class="button-box"
      >试算</el-button
    >
  </div>
  <div>
    收益试算：<br />
    本次交易,基金共持有天数&nbsp;<span class="mark-data">{{ keepDays }}</span
    >&nbsp;天，期间黄金价格变化&nbsp;<span class="mark-data">{{
      priceDiff
    }}</span
    >&nbsp;元，变化比例为&nbsp;<span class="mark-data">{{ priceRatio }}</span
    >&nbsp;%。
    <br />
    此次卖出金额共&nbsp;<span class="mark-data">{{ sellAmountTotal }}</span
    >&nbsp;元，扣除手续费&nbsp;<span class="mark-data">{{ fee }}</span
    >&nbsp;元（手续费率&nbsp;<span class="mark-data">{{ rate }}</span
    >&nbsp;%），最终实际收益金额&nbsp;<span class="mark-data">{{
      sellAmountActual
    }}</span
    >&nbsp;元，盈利&nbsp;<span class="mark-data">{{ profit }}</span
    >&nbsp;元,盈利率&nbsp;<span class="mark-data">{{ profitRatio }}</span
    >&nbsp;%。
  </div>
  <div class="warm-tip">
    温馨提示<br />
    1.&nbsp;如果是已经有确定价格的日期，价格以该日黄金实际收盘价为准，不允许自定义价格。<br />
    2.&nbsp;手续费率或手续费可自定义，优先使用手续费，再使用手续费率，均为空时按照以下规则计算：<br />
    &nbsp;&nbsp;(1)&nbsp;持有天数&lt;7天，费率1.5%<br />
    &nbsp;&nbsp;(2)&nbsp;7天&lt;=持有天数&lt;30天，费率0.1% <br />
    &nbsp;&nbsp;(3)&nbsp;30天&lt;=持有天数，费率0% <br />
  </div>
</template>
<script>
import digitInput from "@/components/digit-input.vue";
import { ElMessage } from "element-plus";
import { daysDiff, toFormatDateString } from "@/util/util";
import { queryDaysPrice } from "@/api/post";

export default {
  components: {
    digitInput,
  },
  data() {
    return {
      buyPriceDisable: false,
      sellPriceDisable: false,
      buyPrice: "",
      buyAmount: "",
      buyDate: "",
      sellPrice: "",
      sellDate: "",
      customFee: "",
      customRate: "",
      priceDiff: "",
      priceRatio: "--",
      keepDays: "--",
      rate: "--",
      fee: "--",
      sellAmountTotal: "--",
      sellAmountActual: "--",
      profit: "--",
      profitRatio: "--",
    };
  },
  methods: {
    calculate() {
      // 计算结果一律保留最多2个小数位
      this.checkData();
      // 计算持有天数
      this.keepDays = daysDiff(this.buyDate, this.sellDate) + 1;
      if (this.keepDays <= 0) {
        this.showErrorTips("售出日期 不能早于 购买日期");
        return;
      }
      this.priceDiff = (this.sellPrice - this.buyPrice).toFixed(2);
      this.priceRatio = ((this.sellPrice / this.buyPrice - 1) * 100).toFixed(2);
      this.sellAmountTotal = (
        this.buyAmount * (this.sellPrice / this.buyPrice).toFixed(2)
      ).toFixed(2);
      this.calculateFee();
      this.sellAmountActual = (this.sellAmountTotal - this.fee).toFixed(2);
      this.profit = (this.sellAmountActual - this.buyAmount).toFixed(2);
      this.profit = (this.sellAmountActual - this.buyAmount).toFixed(2);
      this.profitRatio = ((this.profit / this.buyAmount) * 100).toFixed(2);
    },
    calculateFee() {
      if (this.customFee) {
        this.fee = this.customFee;
        this.rate = ((this.customFee / this.sellAmountTotal) * 100).toFixed(2);
        return;
      } else if (this.customRate) {
        this.fee = ((this.customRate * this.sellAmountTotal) / 100).toFixed(2);
        this.rate = this.customRate;
        return;
      }
      // 未规定手续费用，按照默认规则计算
      if (this.keepDays < 7) {
        this.rate = 1.5;
      } else if (this.keepDays < 30) {
        this.rate = 0.1;
      } else {
        this.rate = 0;
      }
      this.fee = ((this.sellAmountTotal * this.rate) / 100).toFixed(2);
    },
    checkData() {
      if (!this.buyDate) {
        this.showErrorTips("请选择 购买日期");
      }
      if (!this.buyPrice) {
        this.showErrorTips("请填写 购买价格");
      }
      if (!this.buyAmount) {
        this.showErrorTips("请填写 购买金额");
      }
      if (!this.sellDate) {
        this.showErrorTips("请选择 售出日期");
      }
      if (!this.sellPrice) {
        this.showErrorTips("请填写 售出价格");
      }
    },
    showErrorTips(msg) {
      ElMessage({
        showClose: true,
        message: msg,
        type: "error",
      });
    },
    async handleBuyDate(value) {
      let daysPrice = await queryDaysPrice(value);
      if (daysPrice > 0) {
        this.buyPrice = daysPrice;
        this.buyPriceDisable = true;
      } else {
        this.showErrorTips("未查询到该日黄金价格，请自己填写");
      }
    },
    async handleSellDate(value) {
      let daysPrice = await queryDaysPrice(value);
      if (daysPrice > 0) {
        this.sellPrice = daysPrice;
        this.sellPriceDisable = true;
      } else {
        this.showErrorTips("未查询到该日黄金价格，请自己填写");
      }
    },
  },
};
</script>
<style scoped>
div {
  margin: 12px 0px;
}
.item-box {
  margin-right: 50px;
}
.warm-tip {
  padding-top: 180px;
  font-size: 14px;
  color: #ff7043;
  line-height: 25px;
}
.mark-data {
  color: #f4511e;
}
.button-div {
  text-align: center;
  line-height: 50px;
  margin: 40px 0px 50px 0px;
}
.button-box {
  width: 120px;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 30px;
  font-size: 18px;
  transition: all 0.5s;
}
.button-box:hover {
  transform: scale(1.1);
}
</style>
