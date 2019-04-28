<template>
  <!--数据源配置界面-->
  <div>
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item label="类型">
        <el-select v-model="form.dbType" placeholder="请选择数据库类型" style="width: 100%;">
          <el-option label="MySQL" value="MySQL"></el-option>
          <el-option label="Oracle" value="Oracle"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主机">
        <el-input v-model="form.host"></el-input>
      </el-form-item>
      <el-form-item label="端口">
        <el-input v-model="form.port" type="number"></el-input>
      </el-form-item>
      <el-form-item label="用户">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="数据库">
        <el-input v-model="form.dbName"></el-input>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="6">
        <el-button size="small" type="primary" :loading="testLoading"
                   @click="testConn">{{$t('action.test')}}
        </el-button>
      </el-col>
      <!--            <el-button size="small" @click="visible = false">{{$t('action.cancel')}}</el-button>-->
      <el-col :span="6">
        <el-button size="small" type="primary" :loading="saveLoading"
                   @click="saveConfig">{{$t('action.save')}}
        </el-button>
      </el-col>
    </el-row>
  </div>

</template>

<script>

import { testConn } from '@api/sys.database'

export default {
  props: {
    visible: {
      type: Boolean
    }
  },
  watch: {
    visible (newValue) {

    }
  },
  data () {
    return {
      form: {
        dbType: 'MySQL',
        host: '127.0.0.1',
        port: 3306,
        userName: 'root',
        password: '123456',
        dbName: 'kitty'
      },
      testLoading: false,
      saveLoading: false,
      baseUrl: process.env.VUE_APP_URL,
      isShow: this.visible
    }
  },
  methods: {
    // 加载配置
    loadConfig: function () {
      let dsStr = localStorage.getItem('datasource')
      if (dsStr != null) {
        // 如果本地存储有数据源配置，则加载
        this.form = JSON.parse(dsStr)
      }
    },
    // 保存配置
    saveConfig: function () {
      this.saveLoading = true
      localStorage.setItem('datasource', JSON.stringify(this.form))
      let dsStr = localStorage.getItem('datasource')
      if (dsStr != null) {
        this.$message({ message: '保存成功', type: 'success' })
        this.$emit('update:visible', false)
      } else {
        // eslint-disable-next-line no-undef
        this.$message({ message: '保存失败, ' + res.msg, type: 'error' })
      }
      this.saveLoading = false
    },
    // 测试连接
    testConn: function () {
      this.testLoading = true
      testConn(this.form).then((res) => {
        this.$message({ message: '测试连接成功', type: 'success' })
        this.testLoading = false
      }).catch(err => {
        this.$message({ message: JSON.stringify(err), type: 'error' })
        this.testLoading = false
      })
    }

  },
  mounted () {
    this.loadConfig()
  }
}
</script>

<style lang="scss" scoped>

.theme-preview {
  height: 50px;
  width: 100px;
  border-radius: 4px;
  background-size: cover;
  border: 1px solid $color-border-1;
}
</style>
