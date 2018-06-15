import './panel.less'

import Vue from 'vue'
import utils from 'utils'

export default Vue.component('Panel', {
    props: {
        title: {
            type: String,
            require: true
        }
    },
    render(h) {
        return (
            <div class="compo-panel">
                <div class="title-area">
                    {this.title}
                </div>
                {this.$slots.default ?
                    <div class="content-area">
                        {this.$slots.default}
                    </div>
                    :
                    ''
                }
            </div>
        )
    }

})
