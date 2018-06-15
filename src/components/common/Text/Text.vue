<template>
    <span >{{text}}</span>
</template>

<script>
export default {
  name: "xp-text",
  props: {
    text: {
      type: String,
      default: "文本"
    }
  }
};
</script>

<style>
.compo-text {
  display: inline-block;
  vertical-align: middle;
}
</style>
