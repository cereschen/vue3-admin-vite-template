<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1-1" type="success">
      <RouterViewWrapper />
    </el-alert>
  </div>
</template>

<script>
import RouterViewWrapper from "@/router/routerView";

export default {
  name: 'menu-1',
  components: { RouterViewWrapper }
}
</script>
