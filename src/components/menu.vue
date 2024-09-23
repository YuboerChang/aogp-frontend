<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <MenuItem :menuList="menuList"></MenuItem>
  </el-menu>
</template>
<script scoped>
import { ref } from "vue";
import MenuItem from "./menu-item.vue";
import { menuListData } from "@/const/menu-config.js";

export default {
  components: {
    MenuItem,
  },
  data() {
    return {
      menuList: ref(menuListData),
    };
  },
  methods: {},
  props: { isCollapse: Boolean },
  setup() {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      handleOpen,
      handleClose,
    };
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  position: absolute;
  border-right: none;
  color: #fff;
  height: 100%;
  width: 200px;
  overflow: auto;
}
.el-menu--collapse {
  width: 50px;
  overflow: hidden;
}
</style>
