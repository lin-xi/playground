<template>
    <div class="compo-icon-menu">
      <ul class="icon-menu-list">
          <li @click="doSave"><i class="icon-save"></i>保存</li>
          <li @click="doUndo"><i class="icon-undo"></i>撤销</li>
          <li @click="doRedo"><i class="icon-redo"></i>重做</li>
      </ul>
    </div>
</template>

<script>
import Utils from "utils";

export default {
  name: "xp-icon-menu",
  methods: {
    doSave() {
      this.save();
    },
    doUndo() {
      eventHub.$emit("xp-undo");
    },
    doRedo() {
      eventHub.$emit("xp-redo");
    },
    save() {
      eventHub.$emit("xp-save");
    }
  },

  mounted() {
    window.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case 83:
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            e.stopPropagation();
            this.save();
            return false;
          }
          break;
        case 90:
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            e.stopPropagation();
            this.doUndo();
            return false;
          }
          break;
        case 89:
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            e.stopPropagation();
            this.doRedo();
            return false;
          }
          break;
      }
    });
  }
};
</script>

<style lang="less-loader">
.compo-icon-menu {
  .icon-menu-list {
    display: flex;
    li {
      font-size: 12px;
      color: #20a0ff;
      flex: 0 0 60px;
      i {
        font-size: 20px;
        vertical-align: middle;
      }
      cursor: pointer;
      text-align: center;
    }
    li:hover {
      background-color: #f0f0f0;
    }
  }
}
</style>
