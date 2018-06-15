<template>
    <input class="input-item" type="Number" :placeholder="title" v-model="val" @change="inputChange" @blur="inputChange" @input="inputChange"></input>
</template>

<script>
export default {
  name: "xp-input-number",
  props: {
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
  methods: {
    inputChange(e) {
      if (this.val != "") {
        this.valueChange &&
          this.valueChange(
            this.cid,
            this.name,
            parseInt(this.val),
            "InputNumber"
          );
      }
    }
  }
};
</script>
