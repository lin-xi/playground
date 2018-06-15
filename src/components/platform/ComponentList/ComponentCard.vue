<template>
    <div class="component-card" @click="click" draggable="true" @dragstart="dragstart" effectAllowed="copy" dropEffect="copy">
        <img v-if="image" :src="image"/>

        <i v-if="className" :class="className" />
        <div v-else class="letter">{{firtLetter}}</div>
        <span>{{title}}</span>
    </div>
</template>

<script>
export default {
  name: "w-component-card",
  props: {
    image: {
      type: String,
      default: "",
      require: true
    },
    className: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: "",
      require: true
    },
    title: {
      type: String,
      default: "",
      require: true
    },
    path: {
      type: String,
      default: "",
      require: true
    },
    property: {
      type: Array
    },
    comType: {
      type: String
    }
  },
  data() {
    let firtLetter = this.name.substr(0, 1);
    return { firtLetter };
  },
  methods: {
    click(e) {
      //eventHub.$emit('create-component', {name: this.name, path: this.path});
    },
    dragstart(e) {
      if (e.currentTarget === e.target) {
        e.dataTransfer.setData("mod-type", this.comType);
        e.dataTransfer.setData("mod-name", this.name);
        e.dataTransfer.setData("mod-path", this.name);
        console.log("dragstart:", this.property);
        e.dataTransfer.setData("mod-props", JSON.stringify(this.property));
      }
    }
  }
};
</script>

<style lang="less-loader">
.component-card {
  display: inline-block;
  padding: 2px 10px;
  cursor: pointer;
  border: 1px #e0e0e0 solid;
  margin: 5px 3px;
  border-radius: 4px;
  text-align: center;
  img {
    width: 40px;
    height: 40px;
  }
  .letter {
    color: #20a0ff;
    font-size: 30px;
    width: 40px;
    height: 40px;
  }
  i {
    display: block;
    font-size: 30px;
    width: 40px;
    height: 40px;
    background-size: 100% 100%;
  }
  .i-text {
    background-image: url(./icon-text.png);
  }
  .i-image {
    background-image: url(./icon-image.png);
  }
  .i-block {
    background-image: url(./icon-block.png);
  }
  .i-grid {
    background-image: url(./icon-grid.png);
  }
  .i-tab {
    background-image: url(./icon-tab.png);
  }
  .i-iscroll {
    background-image: url(./icon-iscroll.png);
  }
}
.component-card:hover {
  background-color: #f0f0f0;
  border: 1px #20a0ff solid;
}
</style>
