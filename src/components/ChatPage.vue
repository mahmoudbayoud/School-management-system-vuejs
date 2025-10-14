<template>
  <div class="chat-page" dir="rtl">
    <!-- الهيدر -->
    <header class="chat-header">
      <img class="avatar" src="@/assets/Untitled.png" width="50" height="50" />
      <div>
        <h3>{{ receiverName }}</h3>
        <span v-if="isReceiverTyping">يكتب...</span>
      </div>
    </header>

    <!-- الرسائل -->
    <div class="chat-messages" ref="messagesContainer" dir="rtl">
      <div
        v-for="msg in messages"
        :key="msg.messageId"
        :class="[
          'bubble',
          msg.senderId === currentUserId && msg.senderRole === 'school'
            ? 'me'
            : 'other',
        ]"
      >
        <p>{{ msg.text }}</p>
        <small>{{ formatTime(msg.createdAt) }}</small>
      </div>
    </div>

    <!-- الإدخال -->
    <footer class="chat-input">
      <input
        v-model="newMessage"
        type="text"
        placeholder="اكتب رسالة..."
        @input="setTyping(newMessage.length > 0)"
        @keyup.enter="sendMessage"
      />
      <v-btn
        @click="sendMessage"
        style="margin-right: 40px; margin-top: 5px"
        icon
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </footer>
  </div>
</template>

<script>
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export default {
  name: "ChatPage",
  props: {
    chatId: String,
    currentUserId: String,
    currentUserName: String,
    currentUserRole: String,
    receiverId: String,
    receiverName: String,
    receiverRole: String,
  },
  data() {
    return {
      newMessage: "",
      messages: [],
      isReceiverTyping: false,
    };
  },
  mounted() {
    this.listenMessages();
    this.listenTyping();
  },
  methods: {
    listenMessages() {
      const messagesRef = collection(db, "chats", this.chatId, "messages");
      const q = query(messagesRef, orderBy("createdAt", "asc"));
      onSnapshot(q, (snap) => {
        this.messages = snap.docs.map((d) => ({
          messageId: d.id,
          ...d.data(),
        }));
        this.scrollToBottom();
      });
    },
    listenTyping() {
      const chatRef = doc(db, "chats", this.chatId);
      onSnapshot(chatRef, (snap) => {
        const data = snap.data();
        if (data) {
          this.isReceiverTyping =
            data[`${this.receiverId}_${this.receiverRole}_typing`] === true;
        }
      });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    async setTyping(typing) {
      const chatRef = doc(db, "chats", this.chatId);
      await updateDoc(chatRef, {
        [`${this.currentUserId}_${this.currentUserRole}_typing`]: typing,
      });
    },
    async sendMessage() {
      if (!this.newMessage.trim()) return;

      const text = this.newMessage.trim();
      this.newMessage = "";

      const msgRef = collection(db, "chats", this.chatId, "messages");
      await addDoc(msgRef, {
        text,
        senderId: this.currentUserId,
        senderName: this.currentUserName,
        senderRole: this.currentUserRole,
        createdAt: serverTimestamp(),
      });

      const chatRef = doc(db, "chats", this.chatId);
      await updateDoc(chatRef, {
        lastMessage: text,
        updatedAt: serverTimestamp(),
      });

      this.setTyping(false);
    },
    formatTime(timestamp) {
      if (!timestamp) return "";
      return new Date(timestamp.toDate()).toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 90%;
}
.chat-header {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #ddd;
  background: #fff;
}
.chat-header .avatar {
  border-radius: 50%;
  margin-left: 10px;
}
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: #f4f4f8;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.bubble {
  max-width: 60%;
  padding: 10px 14px;
  border-radius: 16px;
  line-height: 1.4;
  position: relative;
}
.bubble.me {
  align-self: flex-end;
  background: #800080;
  color: white;
  border-bottom-right-radius: 4px;
}
.bubble.other {
  align-self: flex-start;
  background: #e0e0e0;
  color: black;
  border-bottom-left-radius: 4px;
}
.chat-input {
  display: flex;
  padding: 10px;
  background: #fff;
  border-top: 1px solid #ddd;
}
.chat-input input {
  flex: 1;
  border-radius: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}
.chat-input button {
  margin-left: 8px;
  background: #800080;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
</style>
