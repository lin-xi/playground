<template>
    <div class="line-item">
        <span class="label">{{title}}</span>
        <ul class="compo-input-group" ref="groupList">
            <li v-for="item in values" :key="item.value" :data-val="item.value" @click="doSelect">{{item.label}}</li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "xp-input-group",
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
      default: "",
      required: false
    },
    items: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  data() {
    return {
      val: this.value
    };
  },
  methods: {
    doSelect(e) {
      let val = e.target.getAttribute("data-val");
      this.val = val;
      this.$refs.groupList.querySelectorAll("li").forEach(li => {
        li.classList.remove("active");
      });
      e.target.classList.add("active");
      this.valueChange &&
        this.valueChange(this.cid, this.name, this.val, "InputGroup");
    }
  }
};
</script>

<style lang="less-loader">
.compo-input-group {
  display: inline-block;
  li {
    display: inline-block;
    padding: 5px 10px;
    border-top: 1px solid #bfcbd9;
    border-bottom: 1px solid #bfcbd9;
    border-right: 1px solid #bfcbd9;
    cursor: pointer;
  }
  li.active {
    background-color: #20a0ff;
    color: #fff;
  }
  li:first-child {
    border-left: 1px solid #bfcbd9;
    border-radius: 4px 0 0 4px;
  }
  li:last-child {
    border-radius: 0 4px 4px 0;
  }
}
</style>
