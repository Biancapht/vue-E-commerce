<template>
  <div class="message-alert">
    <div class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      // 5秒後自動刪除
      setTimeout(() => {
        this.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            this.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
  created() {
    /**
     * @param {String} messsage:push 自定義名稱
     * @param {String} message 傳入參數
     * @param {String} status 樣式，預設值為 warning
     */
    // 針對掛載的(bus.js) $bus 去做註冊 ($on) 事件，並且事件叫做 message:push 的方法，
    // 外層是使用 $on 去註冊
    this.$bus.$on('message:push', (message, status = 'warning') => {
      this.updateMessage(message, status);
    });
    // 內層要使用的話就是使用 $emit 去觸發
    //this.$bus.$emit('message:push', '訊息', status);
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>