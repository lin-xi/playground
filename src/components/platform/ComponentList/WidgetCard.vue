<template>
    <div class="widget-card" @click="click" draggable="true" @dragstart="dragstart" effectAllowed="copy" dropEffect="copy">
        <p><img :src="image"/></p>
        <span class="widget-title">{{title}}</span>
    </div>
</template>

<script>
export default {
    name: 'xp-widget-card',
    props: {
        image: {
            type: String,
            default: 'icon-component',
            require: false
        },
        name: {
            type: String,
            default: '',
            require: false
        },
        path: {
            type: String,
            default: '',
            require: true
        },
        title: {
            type: String,
            default: '',
            require: false
        },
        componentData: {
            type: Object,
            default: {},
            require: true
        }
    },
    methods: {
        click(e){
            //eventHub.$emit('create-component', {name: this.name, path: this.path});
        },
        dragstart(e){
            e.dataTransfer.setData("mod-name", this.name);
            e.dataTransfer.setData("mod-path", this.path);
            e.dataTransfer.setData("mod-type", 'widget');
            e.dataTransfer.setData("widget-data", JSON.stringify(this.componentData));
        }
    },
    created(){
    }
}
</script>

<style lang="less-loader">
    .widget-card{
        position: relative;
        width: 48%;
        cursor: pointer;
        border: 1px #e0e0e0 solid;
        height: 90px;
        margin: 1%;
        vertical-align: middle;
        border-radius: 4px;
        overflow: hidden;

        img{
            width: 100%;
        }

        .widget-title{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100;
            background: rgba(0,0,0, 0.5);
            color: #fff;
            padding: 2px 5px;
            transition: all 500ms cubic-bezier(0.29, 0.01, 0, 0.99);
            border-radius: 4px;
        }
    }
    .widget-card:hover{
        border: 1px #20A0FF solid;
        .widget-title{
            bottom: -42px;
        }
    }
</style>
