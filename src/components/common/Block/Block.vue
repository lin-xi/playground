<template>
    <div>
      <slot></slot>
    </div>
</template>

<script>
import Utils from "utils";
import Controll from "../Controll/Controll";

export default {
  name: "xp-block",
  components: {
    "xp-controll": Controll
  }
};
</script>

<style>
.compo-text {
  display: inline-block;
  vertical-align: middle;
}
</style>
