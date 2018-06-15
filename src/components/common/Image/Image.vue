<template>
  <span>
    <img :src="src"/>
    <xp-controll v-if="showControll" @change="psChange"></xp-controll>
  </span>
</template>

<script>
import Utils from "utils";

export default {
  name: "xp-image",
  props: {
    src: {
      type: String,
      default: "/public/images/no-image-icon.png"
    }
  },
  computed: {
    showControll() {
      if (this.isEditMode() && this.display) {
        return true;
      }
      return false;
    }
  },
  methods: {
    psChange(data) {
      let val = {};
      let left = 0,
        top = 0,
        width = 0,
        height = 0;
      let pos = Utils.parsePosition(this.position);
      data.width && (val.width = data.width);
      data.height && (val.height = data.height);
      if (data.left != undefined || data.top != undefined) {
        left = (data.left || 0) + pos.left;
        top = (daa.top || 0) + pos.top;
        val.position = top + "px 0px 0px " + left + "px";
      }
      this.dispatchPropertyChange(val);
    }
  }
};
</script>
<style lang="less-loader">
.compo-image {
  display: inline-block;
  vertical-align: top;
  width: 100%;
  text-align: center;
  text-align: center;

  img {
    width: 100%;
    vertical-align: top;
  }
}
</style>
