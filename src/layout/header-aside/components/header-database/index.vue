<template>
  <div>
    <el-tooltip
        effect="dark"
        content="数据库配置"
        placement="bottom">
      <el-button
          class="d2-ml-0 d2-mr btn-text can-hover"
          type="text"
          @click="dialogVisible = true">
        <d2-icon
            name="database"
            style="font-size: 16px"/>
      </el-button>
    </el-tooltip>
    <el-dialog
        title="数据库配置"
        width="600px"
        :visible.sync="dialogVisible"
        :append-to-body="true">
      <d2-database-from :visible.sync="dialogVisible" style="margin-top: -25px;"/>
    </el-dialog>
  </div>
</template>

<script>
import databaseFrom from './components/d2-database-from'

export default {
  components: {
    'd2-database-from': databaseFrom
  },
  name: 'd2-header-database',
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    onClick () {
      this.$message('这是一条消息提示')
    }
  }
}
</script>

<style scoped>

</style>
