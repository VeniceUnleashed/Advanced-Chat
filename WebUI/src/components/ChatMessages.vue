<template>
  <div id="chat-messages">
  </div>
</template>

<script>
    export default {
        name: "ChatMessages"
    }
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
