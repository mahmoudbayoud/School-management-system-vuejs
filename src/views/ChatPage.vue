<template>
  <conversations-view @select="selectConversation" />
  <chat-box-view v-if="selectedConv" :conversationId="selectedConv.id" />
</template>

<script>
import ConversationsView from "./ConversationsView.vue";
import ChatBoxView from "./ChatBoxView.vue";

export default {
  components: {
    ConversationsView,
    ChatBoxView,
  },
  data() {
    return {
      selectedConv: null,
    };
  },
  methods: {
    selectConversation(conv) {
      this.selectedConv = conv;
      console.log(conv);
    },
  },
};
</script>
