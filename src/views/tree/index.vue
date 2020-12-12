<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script  lang="ts">
import type { ElTree } from "element-plus"
import { defineComponent, ref, watch } from "vue"

export default defineComponent({
  setup() {
    const tree2 = ref<InstanceType<typeof ElTree> | null>(null)
    const filterText = ref('')

    watch(filterText, (val) => {
      tree2.value?.filter(val)
    })
    type Tree = {
      id: number,
      label: string,
      children: Tree[]
    }

    return {
      filterNode(value: string, data: Tree) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      tree2,
      filterText,
      data2: [{
        id: 1,
        label: 'Level one 1',
        children: [{
          id: 4,
          label: 'Level two 1-1',
          children: [{
            id: 9,
            label: 'Level three 1-1-1'
          }, {
            id: 10,
            label: 'Level three 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: 'Level one 2',
        children: [{
          id: 5,
          label: 'Level two 2-1'
        }, {
          id: 6,
          label: 'Level two 2-2'
        }]
      }, {
        id: 3,
        label: 'Level one 3',
        children: [{
          id: 7,
          label: 'Level two 3-1'
        }, {
          id: 8,
          label: 'Level two 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  }
})
</script>

