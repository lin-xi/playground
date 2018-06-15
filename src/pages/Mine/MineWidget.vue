<template>
    <div class="page-publish">
        <xp-header active="mineModel"></xp-header>

        <div class="publish-body">

            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="widget_name" label="名称" width="300"></el-table-column>
                <el-table-column label="截图" width="120"inline-template>
                    <a :href="row.widget_image" target='_blank'><img width="100" :src="row.widget_image"/></a>
                </el-table-column>
                <el-table-column prop="widget_discription" label="描述"></el-table-column>
                <el-table-column label="预览" width="70" inline-template>
                    <a :href=" '/preview.html?widgetId=' + row.widget_id " target="_blank">预览</a>
                </el-table-column>
                <el-table-column prop="widget_create_time" label="创建时间" width="160"></el-table-column>
                <el-table-column label="操作" width="140" inline-template>
                    <span>
                        <el-button @click="handleSnapChat(row)" size="small">截图</el-button>
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
            widgetId: utils.getQueryString('widgetId'),
            tableData: []
        }
    },

    components: {
        'xp-header': Header
    },

    methods: {
        refresh(){
            let me = this;
            api.getWidgetList().then((result) => {
                if(result.error_no == 0){
                    me.tableData = result.result.widget_list.map(item => {
                        item.widget_create_time = new Date(item.widget_create_time * 1000).toLocaleString().replace(/[\u4E00-\u9FFF]+/, '');
                        return item;
                    })
                    me.hideLoading();
                }
            })
        },

        handleSnapChat(row) {
            Message({
                message: '截图后台运行中，请耐心等待',
                type: 'success'
            });
            api.snapShot(row.widget_id, 'widget').then(ires => {
                api.updateWidget({
                    widget_id: row.widget_id,
                    widget_image: ires.result.url
                }).then(res => {
                    Message({
                        message: '截图成功',
                        type: 'success'
                    });

                    this.refresh();
                })
            })
        },

        handleDelete(row) {
            api.deleteWidget(row.widget_id)
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