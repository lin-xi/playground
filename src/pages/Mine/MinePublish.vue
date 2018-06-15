<template>
    <div class="page-publish">
        <xp-header active="mineModel"></xp-header>

        <div class="publish-body">

            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="release_id" label="版本号" width="140"></el-table-column>
                <el-table-column prop="release_content" label="描述"></el-table-column>
                <el-table-column label="预览" width="100" inline-template>
                    <span>
                        <a v-if="row.release_status == 0 || row.release_status == 2"
                           :href=" '/preview.html?modelId=' + modelId + '&t=' + Date.now() " target="_blank">线下预览</a>
                        <a v-else
                           :href=" 'http://waimai.baidu.com/static/h5/index.html?modelId=' + modelId + '&t=' + Date.now() "
                           target="_blank">线上预览</a>
                    </span>
                </el-table-column>
                <el-table-column label="二维码" width="100" inline-template>
                    <a :href="row.qrcodeUrl" target="_blank">二维码</a>
                </el-table-column>
                <el-table-column prop="release_create_user" label="创建人" width="80"></el-table-column>
                <el-table-column prop="release_create_time" label="创建时间" width="100"></el-table-column>
                <el-table-column prop="release_update_user" label="操作人" width="80"></el-table-column>
                <el-table-column prop="release_update_time" label="操作时间" width="100"></el-table-column>
                <el-table-column label="操作" width="140" inline-template>
                    <span>
                        <el-button v-if="row.release_status == 0 || row.release_status == 2" @click="handleOnline(row)"
                                   size="small">上线</el-button>
                        <el-button v-else @click="handleOffline(row)" type="primary" size="small">下线</el-button>
                        <el-button @click="handleDelete(row)" size="small">删除</el-button>
                    </span>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script type="es6">
  import Vue from 'vue'
  import Header from 'components/platform/Header/Header'
  import api from 'api'
  import utils from 'utils'
  import {Table, TableColumn, Button, Message} from 'element-ui'

  export default {
    data(){
      return {
        modelId: utils.getQueryString('modelId'),
        tableData: []
      }
    },

    components: {
      'xp-header': Header,
      'el-table': Table,
      'el-table-column': TableColumn,
      'el-button': Button
    },

    methods: {
      refresh(){
        let me = this;
        api.getReleaseInfo(this.modelId).then((result) => {
          if (result.error_no == 0) {
            me.tableData = result.result.list.map(item => {
              item.release_create_time = new Date(item.release_create_time * 1000).toLocaleString().replace(/[\u4E00-\u9FFF]+/, '');
              item.release_update_time = new Date(item.release_update_time * 1000).toLocaleString().replace(/[\u4E00-\u9FFF]+/, '');
              let originUrl = '';
              if (item.release_status == 0 || item.release_status == 2) {
                originUrl = `http://${location.host}/preview.html#/?modelId=${this.modelId}&t=${Date.now()}`;
              } else {
                originUrl = `http://waimai.baidu.com/static/h5/index.html?modelId=${this.modelId}&t=${Date.now()}`;
              }
              item.qrcodeUrl = `http://family.waimai.baidu.com/fe/static/index.html#result/${encodeURIComponent(originUrl)}`;

              return item;
            })
            me.$forceUpdate();
            me.hideLoading();
          }
        })
      },

      handleOnline(row) {
        api.online({
          model_id: this.modelId,
          release_id: row.release_id
        }).then(ires => {
          Message({
            message: '上线成功',
            type: 'success'
          });
          this.refresh();
        })
      },

      handleOffline(row) {
        api.offline({
          model_id: this.modelId,
          release_id: row.release_id
        }).then(ires => {
          Message({
            message: '下线成功',
            type: 'success'
          });
          this.refresh();
        })
      },

      handleDelete(row) {
        this.$confirm('您确认删除该模版？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.deleteRelease({
            model_id: this.modelId,
            release_id: row.release_id
          }).then(ires => {
            Message({
              message: '删除成功',
              type: 'success'
            });
            this.refresh();
          })
        })
      },

    },

    created(){
      this.refresh();
    }
  }
</script>

<style lang="less">
    .page-publish {

        .publish-body {
            padding: 20px;

            .steps {
                padding: 20px 30px;
            }

            .logs {
                padding: 20px 30px;
                border: 1px #d0d0d0 solid;
                border-radius: 6px;
            }

            .publish {
                padding: 20px 30px;
                border: 1px #d0d0d0 solid;
                border-radius: 6px;
                margin-top: 30px;
            }

        }
    }
</style>