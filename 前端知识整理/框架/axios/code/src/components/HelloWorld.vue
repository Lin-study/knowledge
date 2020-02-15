<template>
  <div></div>
</template>

<script>
export default {
  name: "HelloWorld",
  methods: {
    loginout: function() {
      this.qa.login.loginOut();
    }
  },
  mounted: function() {
    //告诉qa现在处理的是那个组件
    this.qa.v(this);
    this.qa.login.loginIn({
      success: function(res) {}
    });
  }
};
</script>
