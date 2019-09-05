<template>
    <div id="chat-form"
         :class="IsTypingActive ? 'active' : 'inactive'"
         v-on:input="inputMessage = $event.target.value"
         v-on:keyup.enter="OnSubmit">
		  <input type="text" ref="message" class="message-input" maxLength="127" v-if="IsTypingActive" />
		  <!--onKeyDown={this.OnKeyDown} onBlur={this.OnBlur}-->
		  <label ref="target" class="chat-target">{{GetTarget}}</label>
    </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';

  export default {
    data: () => ({
      inputMessage: ''
    }),
    computed: {
      ...mapGetters(['IsTypingActive', 'GetTarget']),
      ...mapMutations(['EnableTyping', 'DisableTyping'])
    },
    methods:{
      OnSubmit(event) {
        // console.log(this.inputMessage);

        event.preventDefault();

        this.$vext.DispatchEventLocal('AC:SendChatMessage', this.GetTarget + ':' + this.inputMessage);

        /** Why doesn't this.DisableTyping() work???? creates infinite loop of errors**/
        this.$store.commit('DisableTyping')

        this.ResetInputMessage();
      },
      ResetInputMessage() {
        this.inputMessage = '';
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
