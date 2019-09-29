<template>
  <div id="chat-messages" ref="messages">

    <chat-message
      v-for="(message, index) in GetMessages"
      v-bind:message="message"
      v-bind:key="index">
    </chat-message>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ChatMessages',
    computed: {
        ...mapGetters(['GetMessages'])
    },
    watch: {
        GetMessages: function () {
            // before the messages array changes, this function will be fired.
            const container = this.$refs.messages;

            // check if we need to scroll to the bottom after updating messages
            if (container.scrollHeight - container.scrollTop === container.clientHeight) {
                this.$nextTick(() => { container.scrollTop = container.scrollHeight; });
            }
        }
    },
    methods: {
        ScrollUp() {
            const container = this.$refs.messages;
            const newScroll = container.scrollTop - 20;
            container.scrollTop = newScroll < 0 ? 0 : newScroll;
        },
        ScrollDown() {
            const container = this.$refs.messages;
            const newScroll = container.scrollTop + 20;
            container.scrollTop = newScroll > container.scrollHeight ? container.scrollHeight : newScroll;
        }
    }
};
</script>

<style lang="scss" scoped>
  #chat-messages {
    width: 100%;
    height: 110px;
    overflow-y: hidden;
    overflow-x: hidden;
    word-wrap: break-word;

    &:hover {
      overflow-y: overlay;
    }

    &::-webkit-scrollbar {
      visibility: visible;
      background: rgba(231, 235, 239, 0.1);
      width: 5px;
      -webkit-border-radius: 10px;
      border-radius: 10px;
    }

    &::-webkit-scrollbar * {
      background: transparent;
    }

    &::-webkit-scrollbar-track {
      -webkit-border-radius: 10px;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px;
      border-radius: 10px;
      background: rgba(231, 235, 239, 0.4);
    }
  }
</style>
