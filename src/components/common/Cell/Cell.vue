<template>
    <div class="compo-cell">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: "xp-cell",
  props: {
    flex: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style>
.compo-cell {
  position: relative;
}
</style>
