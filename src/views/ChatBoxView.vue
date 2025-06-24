<template>
  <div>
    <div class="messages" ref="messagesContainer">
      <div v-for="msg in messages" :key="msg.id" :class="msgClass(msg)">
        {{ msg.text }}
      </div>
    </div>

    <v-text-field
      v-model="newMessage"
      label="اكتب رسالة"
      @keyup.enter="sendMessage"
    />
    <v-btn @click="sendMessage">إرسال</v-btn>
  </div>
</template>

<script>
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/firebase";

export default {
  props: ["conversationId"],
  data() {
    return {
      messages: [],
      newMessage: "",
      unsubscribe: null,
    };
  },
  watch: {
    conversationId: {
      immediate: true,
      handler(id) {
        if (this.unsubscribe) this.unsubscribe();
        if (!id) return;

        const messagesRef = collection(db, "conversations", id, "messages");
        const q = query(messagesRef, orderBy("timestamp"));

        this.unsubscribe = onSnapshot(q, (snapshot) => {
          this.messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.$nextTick(() => this.scrollToBottom()); // تمرير للأسفل
        });
      },
    },
  },
  beforeUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  },
  methods: {
    async sendMessage() {
      if (!this.newMessage.trim()) return;
      const user = auth.currentUser;
      if (!user) return;

      const messagesRef = collection(
        db,
        "conversations",
        this.conversationId,
        "messages"
      );

      await addDoc(messagesRef, {
        senderId: user.uid,
        senderType: "school",
        text: this.newMessage,
        timestamp: Timestamp.now(),
      });

      const convDocRef = doc(db, "conversations", this.conversationId);
      await updateDoc(convDocRef, {
        updatedAt: Timestamp.fromDate(new Date()),
        lastMessage: this.newMessage,
      });

      this.newMessage = "";
      this.$nextTick(() => this.scrollToBottom()); // تمرير للأسفل بعد إرسال الرسالة
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
    msgClass(msg) {
      return msg.senderType === "school" ? "me" : "them";
    },
  },
};
</script>

<style scoped>
.me {
  background-color: #e0f7fa;
  align-self: flex-end;
  padding: 5px;
  border-radius: 8px;
  margin: 2px;
  max-width: 70%;
}
.them {
  background-color: #fce4ec;
  align-self: flex-start;
  padding: 5px;
  border-radius: 8px;
  margin: 2px;
  max-width: 70%;
}
</style>
