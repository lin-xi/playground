<template>
    <div class="page-publish">
        <xp-header active="mineModel"></xp-header>

        <div class="publish-body">

            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="component_name" label="名称" width="300"></el-table-column>
                <el-table-column prop="component_discription" label="描述"></el-table-column>
                <el-table-column prop="component_version" label="版本" width="160"></el-table-column>
                <el-table-column prop="component_update_time" label="更新时间" width="160"></el-table-column>
                <el-table-column label="操作" width="140" inline-template>
                    <span>
                        <el-button @click="handleDelete(row)" size="small">删除</el-button>
                    </span>
                </el-table-column>
            </el-table>

        </div>

    </div>
</template>

<script>
import Header from 'components/platform/Header/Header'
import api from 'api'
import utils from 'utils'
import {Message} from 'element-ui'

export default {
    data(){
        return {
            tableData: []
        }
    },

    components: {
        'xp-header': Header
    },

    methods: {
        refresh(){
            let me = this;
            api.getComponentList().then((result) => {
                if(result.error_no == 0){
                    me.tableData = result.result.component_list.map(item => {
                        item.component_create_time = new Date(item.component_create_time * 1000).toLocaleString().replace(/[\u4E00-\u9FFF]+/, '');
                        item.component_update_time = new Date(item.component_update_time * 1000).toLocaleString().replace(/[\u4E00-\u9FFF]+/, '');
                        return item;
                    })
                    me.hideLoading();
                }
            })
        },

        handleDelete(row) {
            api.deleteComponent(row.component_id)
            .then(ires => {
                Message({
                    message: '删除成功',
                    type: 'success'
                });
                this.refresh();
            })
        },

    },

    created(){
        this.refresh();
    }

}
</script>

<style lang="less-loader">
    .page-publish{
        .publish-body{
            padding: 20px;

            .steps{
                padding: 20px 30px;
            }

            .logs{
                padding: 20px 30px;
                border: 1px #d0d0d0 solid;
                border-radius: 6px;
            }

            .publish{
                padding: 20px 30px;
                border: 1px #d0d0d0 solid;
                border-radius: 6px;
                margin-top: 30px;
            }

        }
    }
</style>