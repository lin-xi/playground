import Vue from 'vue'
import api from 'api'
import script from './scriptjs'

export default {

    data(){
        return {
            components: []
        };
    },

    methods: {
        showProperty(){
            alert('hello');
        }
    },

    render(h) {
        return (
            <div class="header">
                real time compile
                {
                    this.components.map((compo) => {
                        return h(compo, {
                            props: {age: '30'},
                            nativeOn: {
                                click: this.showProperty
                            }
                        }, []);
                    })
                }
            </div>
        )
    },

    mounted(){
        this.hideLoading();

        api.compile().then((data)=>{
            let reqjs =  window['require'];
            reqjs.config({
                paths: {
                    compo: data.result.js
                }
            });
            reqjs(['compo'], (Compo)=>{
                Vue.component(Compo.name, Compo);
                this.components.push(Compo.name);
            });
        });

        // var compo = {
        //     template: '<div class="admin">{{name}},<b>{{age}}</b></div>',
        //     data(){
        //         return {
        //             name: 'linxi'
        //         }
        //     },
        //     props: {
        //         age: {
        //             type: String,
        //             default: '',
        //         }
        //     }
        // }

        // loadCssFile(content.css); //加载css
        // let compo = content.opts;
        // Vue.component(compo.name, {
        //     name: compo.name, //
        //     template: compo.template,
        //     data: compo.data,
        //     computed: compo.computed,
        //     props: compo.props,
        //     methods: compo.methods,
        //     ....
        // });
        // ...

        // this.components.push('XQuestion');
    
    }
}
