<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template #="scope">{{ scope.index_ }}</template>
      </el-table-column>
      <el-table-column label="Title">
        <template #="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template #="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template #="scope">{{ scope.row.pageviews }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template #="scope">
          <el-tag :type="statusFilter(scope.row.status)">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template #="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { getList, Item } from '@/api/table'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const list = ref<Item[]>([])
    const listLoading = ref(true)

    function fetchData() {
      listLoading.value = true
      getList().then(response => {
        list.value = response.data.items
        listLoading.value = false
      })
    }

    fetchData()

    function statusFilter(status: 'published' | 'draft' | 'deleted') {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }

    return { list, listLoading, statusFilter }

  }
})
</script>
