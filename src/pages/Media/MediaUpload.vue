<template>
    <div class="page-mediauplad">
        <xp-header active="minePublish"></xp-header>

        <el-row :gutter="20" style="margin: 10px 0;">
            <el-col :span="3">
                <el-upload action="/api/upload/audio" :multiple="true" :with-credentials="true" accept="audio/*"
                           :show-upload-list="false"
                           :on-success="handleSuccess" :on-error="handleError">
                    <el-button type="primary">点击上传音频</el-button>
                </el-upload>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="doRefresh">刷新</el-button>
            </el-col>
        </el-row>

        <ul style="padding: 0 0 10px 10px;">
            <li>音频/视频文件上传后需花一定时间解码，所以不能立即得到 url</li>
            <li>可以刷新页面，或点击刷新按钮来重新加载数据，当有了 url 后可进行复制操作</li>
            <li>规范上传文件的文件名，需要你按照文件名来寻找上传的文件</li>
            <li>支持翻页，但总页数不准，需后端接口完善，后续若需按照文件名搜索也需新增后端接口</li>
        </ul>

        <el-table
                :data="list"
                style="width: 100%">
            <el-table-column
                    prop="filename"
                    label="文件名"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="url"
                    label="url">
                <template scope="scope">
                    <a :href="scope.row.url" target="_blank">{{scope.row.url}}</a>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="180">
                <template scope="scope">
                    <el-button
                            size="small"
                            @click="doCopy(scope.$index, scope.row)">复制</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="create_time"
                    label="创建时间"
                    width="180">
                <template scope="scope">
                    <span>{{scope.row.create_time | date}}</span>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page.sync="condition.pn"
                :page-size="condition.rn"
                :total="500">
        </el-pagination>
    </div>
</template>

<script>
    import Header from 'components/platform/Header/Header'
    import api from 'api'
    import utils from 'utils'
    import {Message} from 'element-ui'

    export default {
        data() {
            return {
                condition: {
                    pn: 1,
                    rn: 20
                },
                list: []
            }
        },

        components: {
            'xp-header': Header
        },

        mounted() {
            this.getMediaList()
        },

        watch: {
            'condition': {
                handler(val, oldVal) {
                    this.getMediaList()
                },
                deep: true
            }
        },

        methods: {
            handleSuccess(data) {
                if (data.error_no == '0') {
                    // do stuff
                } else {
                    Message(data.error_msg);
                }
            },

            handleError(data) {

            },

            getMediaList() {
                this.showLoading()
                api.getUploadMediaList(this.condition)
                    .then(data => {
                        this.list = data.result
                        this.hideLoading()
                        window.scroll(0, 0)
                    })
                    .catch(e => {
                        this.hideLoading()
                        console.error(e)
                    })
            },

            doRefresh() {
                this.getMediaList()
            },

            handleCurrentChange(val) {
                this.condition.pn = val
            },

            doCopy(index, row) {
                try {
                    const x = window.scrollX
                    const y = window.scrollY
                    const input = document.createElement('textarea')
                    document.body.appendChild(input)
                    input.value = row.url
                    input.focus()
                    input.select()
                    document.execCommand('Copy')
                    input.remove()
                    window.scrollTo(x, y)
                    Message('成功复制到剪贴板')
                }
                catch (err) {
                    console.error(err)
                    alert('please press Ctrl/Cmd+C to copy')
                }
            },
        }
    }

</script>

<style>

</style>
