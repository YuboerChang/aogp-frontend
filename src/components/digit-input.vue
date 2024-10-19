<template>
  <el-input
    v-model="inputValue"
    :placeholder="placeholder"
    maxlength="6"
    clearable
    @input="handleInput"
  >
    <template #prefix v-if="isMoney">
      <span>&#65509;</span>
    </template></el-input
  >
</template>

<script>
export default {
  props: {
    value: [String, Number],
    placeholder: String,
    isMoney: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputValue: this.value,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.inputValue = value;
      },
    },
  },
  methods: {
    handleInput(value) {
      this.inputValue = this.formatValue(value);
      this.$emit("update:modelValue", this.inputValue);
    },
    formatValue(value) {
      let checkValue = "" + value;
      checkValue = checkValue
        .replace(/[^\d^\.]+/g, "")
        .replace(/^0+(\d)/, "$1")
        .replace(/^\./, "0.")
        .replace(/^(\d+)\.(\d+).*/, "$1.$2")
        .replace(/^(\d+\.\d{2})(\d+)*/, "$1");
      return checkValue;
    },
  },
};
</script>
<style scoped>
.el-input {
  width: 220px;
  height: 32px;
  margin-right: 40px;
}
</style>
