<template>
    <div class="compo-controll" @mousedown="mouseDown">
        <div class="sizer lt" type="lt"  @mousedown="mouseDown"></div>
        <div class="sizer lm" type="lm"  @mousedown="mouseDown"></div>
        <div class="sizer lb" type="lb"  @mousedown="mouseDown"></div>

        <div class="sizer ct" type="ct"  @mousedown="mouseDown"></div>
        <div class="sizer cb" type="cb"  @mousedown="mouseDown"></div>

        <div class="sizer rt" type="rt"  @mousedown="mouseDown"></div>
        <div class="sizer rm" type="rm"  @mousedown="mouseDown"></div>
        <div class="sizer rb" type="rb"  @mousedown="mouseDown"></div>

        <div class="moverH bt" @mousedown="mMouseDown"></div>
        <div class="moverH bb" @mousedown="mMouseDown"></div>
        <div class="moverV bl" @mousedown="mMouseDown"></div>
        <div class="moverV br" @mousedown="mMouseDown"></div>
    </div>
</template>

<script>
import uuid from 'uuid/v4';
export default {
    name: 'xp-controll',
    data(){
        return {
            showLink: false,
            start: {x: 0, y: 0 },
            move: {x: 0, y: 0},
            isMove: false,
            isScale: false,
            width: 0,
            height: 0,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            mode: ''
        }
    },
    methods: {
        mouseDown(e){
            e.preventDefault();
            e.stopPropagation();
            let me = this;
            this.start.x = e.pageX;
            this.start.y = e.pageY;
            this.isScale = true;

            let move = 'ce_' + uuid();
            let up = 'ce_' + uuid();
            this.mode = e.target.getAttribute('type');

            me.width = me.$el.offsetWidth;
            me.height = me.$el.offsetHeight;
            me.left = me.$el.offsetLeft;
            me.top = me.$el.offsetTop;

            let cb = document.querySelector('.components-body');
            let maxW = cb.offsetWidth;

            window[move] = function(e){
                if(!me.isScale) return;
                e.preventDefault();
                e.stopPropagation();

                let offX = e.pageX - me.start.x;
                let offY = e.pageY - me.start.y;

                switch(me.mode){
                    case 'lt':
                        me.$el.style.width = Math.min(maxW, Math.max(20, me.width - offX)) + 'px';
                        me.$el.style.left  = (me.left + offX) +'px';
                        me.$el.style.height = Math.max(20, me.height - offY) + 'px';
                        me.$el.style.top  = (me.top + offY) +'px';
                    break;
                    case 'lm':
                        me.$el.style.width = Math.min(maxW, Math.max(20, me.width - offX)) + 'px';
                        me.$el.style.left  = (me.left + offX) +'px';
                    break;
                    case 'lb':
                        me.$el.style.width = Math.min(maxW, Math.max(20, me.width - offX)) + 'px';
                        me.$el.style.left  = (me.left + offX) +'px';
                        me.$el.style.height = Math.max(20, me.height + offY) + 'px';
                    break;
                    case 'ct':
                        me.$el.style.height = Math.max(20, (me.height - offY)) + 'px';
                        me.$el.style.top  = (me.top + offY) +'px';
                    break;
                    case 'cb':
                        me.$el.style.height = Math.max(20, me.height + offY) + 'px';
                    break;
                    case 'rt':
                        me.$el.style.width = Math.min(maxW, Math.max(20, me.width + offX)) + 'px';
                        me.$el.style.height = Math.max(20, me.height - offY) + 'px';
                        me.$el.style.top  = (me.top + offY) +'px';
                    break;
                    case 'rm':
                        me.$el.style.width = Math.min(maxW, Math.max(20, me.width + offX)) + 'px';
                    break;
                    case 'rb':
                        me.$el.style.width = Math.min(maxW, Math.max(20, me.width + offX)) + 'px';
                        me.$el.style.height = Math.max(20, me.height + offY) + 'px';
                    break;
                }
            };
            window[up] = function(e){
                e.preventDefault();
                e.stopPropagation();
                me.isScale = false;
                me.width = me.$el.offsetWidth;
                me.height = me.$el.offsetHeight;
                me.left = me.$el.offsetLeft;
                me.top = me.$el.offsetTop;
                window.removeEventListener('mousemove', window[move]);
                window.removeEventListener('mouseup', window[up]);
                me.psChange();
            };
            window.addEventListener('mousemove', window[move]);
            window.addEventListener('mouseup', window[up]);
        },

        mMouseDown(e){
            e.preventDefault();
            e.stopPropagation();
            let me = this;
            this.move.x = e.pageX;
            this.move.y = e.pageY;
            this.isMove = true;

            let move = 'ce_' + uuid();
            let up = 'ce_' + uuid();

            me.left = me.$el.offsetLeft;
            me.top = me.$el.offsetTop;

            window[move] = function(e){
                if(!me.isMove) return;
                e.preventDefault();
                e.stopPropagation();
                let offX = e.pageX - me.move.x;
                let offY = e.pageY - me.move.y;
                me.$el.style.left  = (me.left + offX) +'px';
                me.$el.style.top  = (me.top + offY) +'px';
            };

            window[up] = function(e){
                e.preventDefault();
                e.stopPropagation();
                me.isMove = false;
                me.left = me.$el.offsetLeft;
                me.top = me.$el.offsetTop;
                window.removeEventListener('mousemove', window[move]);
                window.removeEventListener('mouseup', window[up]);
                if(me.left || me.top || me.width || me.height){
                    me.psChange();
                }
            };
            window.addEventListener('mousemove', window[move]);
            window.addEventListener('mouseup', window[up]);
        },

        psChange(){
            let val = {
                width: this.width,
                height: this.height,
            };
            this.left && (val.left = this.left);
            this.top && (val.top = this.top);
            this.$emit('change', val);

            if(this.left){
                this.$el.style.left  = '0px';
                this.left = 0;
            }
            if(this.top){
                this.$el.style.top  = '0px';
                this.top = 0;
            }
        }

    }
}
</script>
<style lang="less-loader">
    .compo-controll{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        .sizer{
            position: absolute;
            width: 6px;
            height: 6px;
            background: #fff;
            border: 1px #000 solid;
            margin-left: -3px;
            margin-top: -3px;
            pointer-events: all;
            z-index: 20;
        }
        .lt{left: 0; top: 0; cursor: nwse-resize;}
        .lm{left: 0; top: 50%; cursor: ew-resize;}
        .lb{left: 0; bottom: 0; cursor: nesw-resize}

        .ct{left: 50%; top: 0; cursor: ns-resize}
        .cb{left: 50%; bottom: 0; cursor: ns-resize}

        .rt{right: 0; top: 0; cursor: nesw-resize}
        .rm{right: 0; top: 50%; cursor: ew-resize;}
        .rb{right: 0; bottom: 0; cursor: nwse-resize;}

        .moverH {
            position: absolute;
            width: 100%;
            height: 2px;
            border-top: 2px #000 solid;
            cursor: move;
        }
        .moverV {
            position: absolute;
            width: 2px;
            height: 100%;
            border-left: 2px #000 solid;
            cursor: move;
        }
        .bt{left: 0; top: 0}
        .bb{left: 0; bottom: 0}
        .bl{left: 0; top: 0}
        .br{right: 0; top: 0}

    }

</style>
