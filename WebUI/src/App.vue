<template>
  <div id="app">

    <div id="chat-container" v-show="IsVisible">
      <chat-messages></chat-messages>
      <chat-form></chat-form>
    </div>

    <div id="toggle-message" v-show="IsVisible">Display Mode: {{ DisplayModeText }}</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'IsVisible',
        'GetDisplayMode'
      ]),
      DisplayModeText () {
        let displayText = "PopUp";
        switch (this.GetDisplayMode) {
          case 1:
            displayText = "Active";
            break;
          case 2:
            displayText = "Hidden";
            break;
        }

        return displayText;
      }
    },

    methods: {
      ShowChatBox(){

      },
      HideChatBox(){

      }
    }
  }
</script>

<style lang="scss">
  #app {
    // background-color: transparent;
    background: #000 url('assets/img/bf3bg-spawnscreen.png') no-repeat;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-family: '$MENU_medium';
    color: #FFF;
    -webkit-font-smoothing: antialiased;
    //@include user-select(none);
  }


  * {
    -webkit-font-smoothing: antialiased;
  }

  #toggle-message {
    position: absolute;
    top: 212px;
    left: 60px;
    text-transform: uppercase;
    font-size: 13px;
    transition: opacity 200ms ease;
    text-shadow: 0 0 6px #1551a0;

    &.hidden {
      opacity: 0;
    }

    &.visible {
      opacity: 1;
    }
  }

  #chat-container {
    position: absolute;
    top: 24px;
    left: 60px;
    // background-image: -webkit-linear-gradient(90deg, transparent, rgba(11, 148, 255, 0.2) 10%, rgba(11, 148, 255, 0.2) 90%, transparent 100%);
    // ^ This has a really good result in Chrome 41, but has a gray-ish look in WebUI.
    background-image: -webkit-linear-gradient(90deg, transparent, rgba(0, 173, 255, 0.36) 10%, rgba(0, 173, 255, 0.36) 90%, transparent 100%);
    box-shadow: inset 0 0 24px 13px rgba(110, 191, 255, 0.04), 0 0 24px 13px rgba(110, 191, 255, 0.04);
    border-radius: 2px;
    width: 400px;
    height: 190px;
    //transform: skewX(1deg) rotate(1deg);
    padding: 30px 15px;
    box-sizing: border-box;
    transition: opacity 200ms ease;

    &::before {
      content: '';
      position: absolute;
      top: 13px;
      left: 0;
      right: 0;
      bottom: 9px;
      width: 400px;
      height: 164px;
      background: transparent;
      box-shadow: inset 0 0 20px 5px rgba(0, 37, 60, 0.17), 0 0 20px 5px rgba(0, 37, 60, 0.17);
      z-index: -1;
    }

    &.hidden {
      opacity: 0;
    }

    &.visible {
      opacity: 1;
    }
  }
</style>
