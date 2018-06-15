<template>
    <el-switch :width="90" v-model="val" on-text="是" off-text="否"></el-switch>
</template>

<script>
import { Switch } from "element-ui";
export default {
  name: "xp-input-switch",
  components: {
    "el-switch": Switch
  },
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: "",
      required: false
    },
    value: {
      type: Boolean,
      required: false
    },
    valueChange: {
      type: Function,
      require: false
    },
    validate: {
      type: String,
      default: () => "",
      required: false
    }
  },
  data() {
    return {
      val: this.value
    };
  },
  watch: {
    val: function(val, oldVal) {
      this.valueChange && this.valueChange(this.name, this.val, "InputSwitch");
    }
  }
};
</script>
