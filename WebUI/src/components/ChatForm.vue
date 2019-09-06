<template>
    <div id="chat-form" ref="inputContainer"
         :class="IsTypingActive ? 'active' : 'inactive'"
         v-on:input="inputMessage = $event.target.value">

		  <input ref="messageInput" autofocus type="text" class="message-input" maxLength="127" id="fuckit"
                 v-model="inputMessage" v-if="IsTypingActive" v-on:keyup="OnKeyPressed" v-on:blur="OnBlur"/>
		  <label ref="target" class="chat-target">{{ GetTarget }}</label>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

  export default {
    data: () => ({
      inputMessage: ''
    }),
    computed: {
      ...mapGetters(['IsTypingActive', 'GetTarget']),
      ...mapActions(['EnableTyping', 'DisableTyping'])
    },
    methods:{
      OnSubmit(event) {
        if (this.inputMessage.length === 0) {
            this.$store.dispatch('DisableTyping');
            return;
        }

        event.preventDefault();

        this.$vext.DispatchEventLocal('AC:SendChatMessage', this.GetTarget + ':' + this.inputMessage);

        this.ResetInputMessage();
      },
      ResetInputMessage() {
        this.inputMessage = '';
      },

      OnKeyPressed(event) {
        switch (event.key) {
          case 'Enter':
            console.log("enter key was pressed!");

            this.OnSubmit(event);
            break;
          case 'Escape':
            console.log("escape key was pressed!");
            this.$store.dispatch('DisableTyping');
            break;
          case 'ArrowUp':
            //TODO
            console.log("up key was pressed!");
            break;
          case 'ArrowDown':
            //TODO
            console.log("down key was pressed!");
            break;
        }
      },
        OnBlur(){
            this.$store.dispatch('DisableTyping');
        }
    },
      watch: {
          IsTypingActive: function (oldValue, newValue) {
              // this.$nextTick(() => this.$refs.inputContainer.focus());
          }
      }
  }
</script>

<style lang="scss" scoped>
  #chat-form {
    width: 380px;
    position: absolute;
    bottom: 24px;
    left: 10px;
    right: 10px;
    color: #fff;
    height: 25px;

    .message-input {
      width: 100%;
      box-sizing: border-box;
      background: rgba(3, 10, 15, 0.2);
      border: none;
      color: #fff;
      line-height: 20px;
      font-family: '$MENU_medium';
      font-size: 13px;
      padding: 0 10px 0 45px;

      &:focus, &:active {
        border: none;
        outline: 0;
      }
    }

    .chat-target {
      position: absolute;
      top: 5px;
      left: 5px;
      text-transform: uppercase;
      font-family: '$MENU_medium';
      font-size: 13px;
    }

    &.inactive {
      .chat-target {
        display: none;
      }
    }
  }
</style>
