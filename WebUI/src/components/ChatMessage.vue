<template>
  <div class="chat-message" :class="message.target">

    <label class="author">{{ message.author}}:</label>
    <span class="content">{{ message.content}}</span>
  </div>
</template>

<script>
export default {
    props: {
        message: null
    }
};
</script>

<style lang="scss" scoped>
  .chat-message {
    width: 100%;
    margin-bottom: 4px;
    text-shadow: 0 0 6px #1551a0;

    .author {
      font-family: '$MENU_medium';
      font-size: 14px;
      margin-right: 8px;
    }

    .content {
      font-family: '$MENU_medium';
      font-size: 13px;
    }

    &.all {
      .author {
        text-shadow: 0 0 6px #002A61;
      }
    }

    &.team {
      .author {
        color: #74edff;
        text-shadow: 0 0 6px #0055AA;
      }
    }

    &.enemy {
      .author {
        color: #FFBE7B;
        text-shadow: 0 0 6px #B33800;
      }
    }

    &.squad {
      .author {
        color: #D8FF80;
        text-shadow: 0 0 6px #245C00;
      }
    }
    &.squadLeader {
      .author {
        color: #D8FF80;
        text-shadow: 0 0 6px #245C00;
      }
      .author:before {
        content: "★ "
      }
    }

    &.spectator {
      .author {
        color: #ffed08;
        text-shadow: 0 0 6px #5c5c06;
      }
    }

    &.admin {
      .author {
        color: #e1001e;
        text-shadow: 0 0 6px #5c0010;
      }
    }
  }
</style>
