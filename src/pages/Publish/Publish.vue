<template>
    <div class="page-publish">
        <xp-header active="minePublish"></xp-header>

        <div class="publish-body">
            <div class="steps">
                <el-steps :space="150" :active="activeStep" finish-status="success">
                    <el-step title="排队"></el-step>
                    <el-step title="准备"></el-step>
                    <el-step title="代码拷贝"></el-step>
                    <el-step title="编译"></el-step>
                    <el-step title="静态资源发布"></el-step>
                    <el-step title="完成"></el-step>
                </el-steps>
            </div>

            <div class="process-area">
                <div class="info">
                    <span v-if="activeStep == 5" class="all-done"><i class="icon-done"></i></span>
                    <img v-else :src="loading"/>

                    <p @click="toogleLogs" :class=" showLog ? 'flip' : '' ">
                        <i class="icon-arrow_drop_down_circle" ></i>
                    </p>
                </div>
                <div v-if="showLog" class="logs">
                    <div v-for="log in logsData" v-html="log"></div>
                </div>

                <div v-if="activeStep == 5" class="publish">
                    <el-form>
                        <el-form-item label="资源地址" label-width="120px">
                            <el-input v-model="jsPath" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="上线描述" label-width="120px">
                            <el-input placeholder="请输入上线描述" v-model="description"></el-input>
                        </el-form-item>
                        <el-form-item label-width="120px">
                            <el-button type="primary" class="create" @click="publish">发布</el-button>
                        </el-form-item>
                    </el-form>
                </div>

            </div>

            

        </div>

    </div>
</template>

<script>
import Vue from 'vue'
import Header from 'components/platform/Header/Header'
import api from 'api'
import utils from 'utils'
import {Steps, Step, Form, FormItem, Input, Button, Message} from 'element-ui'

export default {
    data(){
        return {
            activeStep: 1,
            logsData: [],
            jsPath: '',
            description: '',
            modelId: utils.getQueryString('modelId'),
            loading: require('../../images/ellipsis.svg'),
            showLog: false
        }
    },

    components: {
        'xp-header': Header,
        'el-steps': Steps,
        'el-step': Step,
        'el-form': Form,
        'el-form-item': FormItem,
        'el-input': Input,
        'el-button': Button
    },

    methods: {
        updateThumb(){
            api.snapShot(this.modelId).then(res => {
                if(res.error_no == 0){
                    api.updateModel({
                        model_id: this.modelId,
                        model_image: res.result.url
                    }).then(ires => {
                        Message.success({
                            message: '更新成功',
                        });
                    })
                } else {
                    utils.handleError(res, this);
                }
            })
        },

        publish(){
            if(!this.jsPath){
                this.$alert('发布过程失败, 请刷新页面重新发布');
                return;
            }

            if(!this.description){
                Message({
                    message: '描述不能为空',
                    type: 'warning',
                });
                return;
            }
            this.release();
        },

        release() {
            api.release({
                model_id: this.modelId,
                release_js: this.jsPath,
                release_path: 'http://waimai.baidu.com/static/h5p/index.html?mid=' + this.modelId,
                release_content: this.description
            }).then(ires => {
                Message({
                    message: '发布成功',
                    type: 'success'
                });
                setTimeout(() => {
                    location.hash = "/minePublish?modelId=" + this.modelId;
                }, 1000);
            })
        },

        toogleLogs(){
            this.showLog = !this.showLog;
        }
    },

    created(){
        let me = this;
        me.logsData.push('😊:-------------waiting--------------');
        let source = new EventSource("/api/build?modelId=" + utils.getQueryString('modelId'));
        source.onmessage = function(env){
            let msg = JSON.parse(env.data);
            if(msg.type == 'message'){
                me.logsData.push(msg.data.replace(/\n/g, '<br>'));
            } else if(msg.type == 'finish'){
                me.activeStep = parseInt(msg.data) + 1;
            } else if(msg.type == 'done'){
                me.activeStep = 5
                me.jsPath = msg.data;
                me.logsData.push('url  : ' + msg.data);
                me.logsData.push('⏫:-------------upload finish--------------');
                source.close();
            }
        };
        me.hideLoading();
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

            .process-area{
                padding: 0px 20px 20px 20px;
                min-height: 550px;
                border-radius: 6px;

                .info{
                    position: relative;
                    height: 100px;
                    text-align: center;
                    border: 1px #e0e0e0 solid;
                    border-radius: 6px;

                    .all-done{
                        background: #13ce66;
                        border-radius: 100%;
                        display: inline-block;
                        width: 60px;
                        height: 60px;
                        line-height: 100px;
                        margin-top: 10px;
                        i{
                            font-size: 50px;
                            color: #fff;
                        }
                    }

                    img{
                        width: 80px;
                    }
                    p{
                        font-size: 24px;
                        color: #e0e0e0;
                        position: absolute;
                        width: 30px;
                        height: 30px;
                        line-height: 30px;
                        left: 50%;
                        bottom: -15px;
                        background: #fff;
                        transform-origin: center center;
                        transform: translate(-15px, 0);
                        transition: all .5s ease-in-out;
                        z-index: 2;
                        cursor: pointer;
                    }
                    .flip{
                        transform: translate(-15px, 0) rotate(180deg);
                    }
                }

                .logs{
                    padding: 20px 30px;
                    border-left: 1px #e0e0e0 solid;
                    border-right: 1px #e0e0e0 solid;
                    border-bottom: 1px #e0e0e0 solid;
                    border-radius: 6px;
                }

                .publish{
                    padding: 20px 30px;
                    border: 1px #e0e0e0 solid;
                    border-radius: 6px;
                    margin-top: 30px;
                }
            }
        }
    }
</style>