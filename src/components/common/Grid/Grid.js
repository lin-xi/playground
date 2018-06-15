import './grid.less'
import Vue from 'vue'
import Utils from 'utils';

const config = [
    {
        name: 'cid',
        title: 'cid',
        type: String,
        default: false,
        require: false,
        component: 'none'
    },
    {
        name: 'columns',
        title: '列数',
        type: Number,
        default: 2,
        require: false,
        component: 'InputNumber'
    },
    {
        component: 'split'
    },
    {
        name: 'width',
        title: '宽度',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'height',
        title: '高度',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        component: 'split'
    },
    {
        name: 'margin',
        title: '外边距',
        type: String,
        default: '',
        require: false,
        component: 'InputLRTB'
    },
    {
        name: 'padding',
        title: '内边距',
        type: String,
        default: '',
        require: false,
        component: 'InputLRTB'
    },
    {
        component: 'split'
    },
    {
        name: 'border',
        title: '边框',
        type: String,
        default: '0px #cccccc solid',
        require: false,
        component: 'InputBorder'
    },
    {
        name: 'borderRadius',
        title: '圆角',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        component: 'split'
    },
    {
        name: 'background',
        title: '背景',
        type: String,
        default: 'none',
        require: false,
        component: 'InputBackground'
    },
    {
        name: 'boxShadow',
        title: '阴影',
        type: String,
        default: 'none',
        require: false,
        component: 'InputShadow'
    }
];


export default {
    name: 'xp-grid',
    props: Utils.toProps(config),
    render(h) {
        // postcss and uglify will rm -webkit, so add it
        // TODO update webpack config to fix it
        return (
            <div class="compo-grid" style="display: -webkit-flex;">
                {this.$slots.default}
            </div>
        )
    },
    mounted() {
        this.padCells(this.columns);
    },

    watch: {
        columns: function(val, oldVal){
            this.padCells(val);
        }
    },
    methods: {
        padCells(val){
            let data = this.getModelData();
            if(data){
                if(val >= data.children.length){
                    let newCols = val - data.children.length;
                    for(let i=0; i<newCols; i++){
                        this.addComponent({
                            name: 'xp-cell',
                            path: 'common/Cell/Cell',
                            props: {}
                        });
                    }
                } else {
                    let newCols = data.children.length - val;
                    for(let i=0; i<newCols; i++){
                        let child = data.children.pop();
                        this.removeComponent(child.cid);
                    }
                }
            }
        }
    }
}

