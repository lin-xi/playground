<template>
    <div>
        <el-menu mode="horizontal" @select="handleSelect">
            <el-submenu index="1">
                <template slot="title">
                    <i class="icon-save"></i>文件</template>
                <el-menu-item index="1-1">
                    <i class="icon-save"></i>保存</el-menu-item>
                <el-menu-item index="1-2">
                    <i class="icon-get_app"></i>导出</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">编辑</template>
                <el-menu-item index="2-1">
                    <i class="icon-undo"></i>撤销</el-menu-item>
                <el-menu-item index="2-2">
                    <i class="icon-redo"></i>重做</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">代码</template>
                <el-menu-item index="3-1" :route="{path: '/publish'}">
                    <i class="icon-settings_input_composite"></i>显示代码</el-menu-item>
                <el-menu-item index="3-2" :route="{path: '/download'}">
                    <i class="icon-settings_input_composite"></i>下载代码</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">关于</template>
                <el-menu-item index="4-1" :route="{path: '/publish'}">
                    <i class="icon-settings_input_composite"></i>关于Playground</el-menu-item>
                <el-menu-item index="4-2" :route="{path: '/download'}">
                    <i class="icon-settings_input_composite"></i>github</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import Vue from "vue";
import { Message, Menu, Submenu, MenuItem } from "element-ui";
import utils from "utils";

export default {
  name: "xp-toolmenu",
  components: {
    "el-menu": Menu,
    "el-submenu": Submenu,
    "el-menu-item": MenuItem
  },
  methods: {
    handleSelect: function(key, keyPath) {
      switch (key) {
        case "2":
          eventHub.$emit("publish-page");
          break;
        case "1-1":
          this.save();
          break;
        case "3-1":
          NewComponent();
          break;
        case "3-2":
          location.hash = "#/mineComponent";
          break;
        case "4-1":
          location.hash = "#/mineWidget";
          break;
      }
    },

    save() {
      eventHub.$emit("xp-save");
    }
  }
};
</script>
