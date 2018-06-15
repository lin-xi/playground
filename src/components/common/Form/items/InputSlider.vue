<template>
  <el-slider class="item-slide" v-model="val" :min="min" :max="max" :step="step"
                   @input="inputChange"></el-slider>
</template>

<script>
import { Slider } from "element-ui";
export default {
  name: "xp-input-slider",
  components: {
    "el-slider": Slider
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
    name: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: false
    },
    values: {
      type: Array,
      required: true
    },
    valueChange: {
      type: Function,
      require: false
    },
    validate: {
      type: String,
      default: () => "",
      required: false
    },
    min: {
      type: Number,
      default: 0,
      required: false
    },
    max: {
      type: Number,
      default: 1,
      required: false
    },
    step: {
      type: Number,
      default: 0.1,
      required: false
    }
  },
  data() {
    return {
      val: this.value
    };
  },
  methods: {
    inputChange(e) {
      if (this.val != "") {
        this.valueChange &&
          this.valueChange(
            this.cid,
            this.name,
            parseInt(this.val),
            "InputSlider"
          );
      }
    }
  }
};
</script>

<style lang="less-loader">
</style>