<template>
  <v-list>
    <v-list-item
      v-for="conv in conversations"
      :key="conv.id"
      @click="$emit('select', conv)"
    >
      <v-list-item-content>
        <v-list-item-title>{{ conv.lastMessage }}</v-list-item-title>
        <v-list-item-subtitle>{{
          conv.updatedAt?.toDate().toLocaleString()
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { auth, db } from "@/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export default {
  data() {
    return {
      conversations: [],
      user: null,
    };
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      console.log("User auth state changed:", user);
      if (user) {
        this.user = user;
        this.loadConversations(user.uid);
      } else {
        this.user = null;
        this.conversations = [];
      }
    });
  },
  methods: {
    loadConversations(uid) {
      const convRef = collection(db, "conversations");
      const q = query(
        convRef,
        where("schoolId", "==", uid),
        orderBy("updatedAt", "desc")
      );

      onSnapshot(q, (snapshot) => {
        this.conversations = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    },
  },
};
</script>
