<template>
  <div class="chat-layout">
    <!-- قائمة المحادثات -->
    <aside class="chat-sidebar" v-if="!showParentList">
      <h3>محادثات</h3>
      <input v-model="search" placeholder="بحث عن محادثة" dir="rtl" />

      <!-- زر إضافة محادثة جديدة -->
      <button class="add-chat-btn" @click="openParentList">
        ➕ إضافة محادثة
      </button>

      <ul dir="rtl">
        <li
          v-for="p in filteredParents"
          :key="p.id"
          :class="{ active: p.id === selectedParentId }"
          @click="openChat(p.id, p.name)"
        >
          <img
            class="avatar"
            src="@/assets/Untitled.png"
            width="50"
            height="50"
          />
          <div class="info">
            <strong>{{ p.name }}</strong>
            <small>{{ p.lastMessage }}</small>
          </div>
        </li>
      </ul>
    </aside>

    <!-- شاشة اختيار ولي أمر -->
    <aside class="chat-sidebar" v-else>
      <h3>اختيار ولي أمر</h3>
      <!-- زر رجوع -->
      <button class="back-btn" @click="showParentList = false">↩️ رجوع</button>

      <ul dir="rtl">
        <li
          v-for="parent in allParents"
          :key="parent.id"
          @click="startNewChat(parent)"
        >
          <img
            class="avatar"
            src="@/assets/Untitled.png"
            width="50"
            height="50"
          />
          <div class="info">
            <strong>{{ parent.name }}</strong>
          </div>
        </li>
      </ul>
    </aside>

    <!-- شاشة المحادثة -->
    <main class="chat-main" v-if="chatId">
      <Chat
        :chatId="chatId"
        :currentUserId="schoolId"
        :currentUserName="schoolName"
        currentUserRole="school"
        :receiverId="selectedParentId"
        :receiverName="selectedParentName"
        receiverRole="parent"
      />
    </main>

    <main class="chat-empty" v-else>
      <p>اختر محادثة من القائمة</p>
    </main>
  </div>
</template>

<script>
import Chat from "../components/ChatPage.vue";
import { createOrGetChat } from "../services/chatService";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import useGetDataMixin from "@/mixins/useGetDataMixin";
import usePostDataMixin from "@/mixins/usePostDataMixin";
export default {
  mixins: [useGetDataMixin, usePostDataMixin],
  components: { Chat },
  data() {
    return {
      schoolId: "1",
      schoolName: "مدرسة النجاح",
      parents: [],
      allParents: [],
      showParentList: false, // ← يتحكم في عرض نافذة الأهالي
      chatId: null,
      selectedParentId: null,
      selectedParentName: null,
      search: "",
    };
  },
  computed: {
    filteredParents() {
      return this.parents.filter(
        (p) =>
          p.chatId.includes("parent_school") &&
          p.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  mounted() {
    const chatsRef = collection(db, "chats");
    onSnapshot(chatsRef, (snap) => {
      this.parents = snap.docs.map((doc) => {
        const data = doc.data();
        const parent = data.participants.find((p) => p.role === "parent");
        return {
          id: parent.id,
          name: parent.name,
          role: parent.role,
          lastMessage: data.lastMessage || "",
          chatId: doc.id,
        };
      });
    });
  },
  methods: {
    async openChat(parentId, parentName) {
      this.selectedParentId = parentId;
      this.selectedParentName = parentName;
      this.chatId = await createOrGetChat(
        this.schoolId,
        this.schoolName,
        parentId,
        parentName
      );
    },
    async openParentList() {
      try {
        await this.fetchData("/getParentsForSchool")
          .then(() => {
            this.allParents = this.getData.data;
            this.showParentList = true;
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        this.loading = false;
      } catch (e) {
        // API ترجع قائمة الأهالي

        console.error("Error fetching parents:", e);
      }
    },
    async startNewChat(parent) {
      this.selectedParentId = parent.id;
      this.selectedParentName = parent.name;
      this.chatId = await createOrGetChat(
        this.schoolId,
        this.schoolName,
        parent.id,
        parent.name
      );
      this.showParentList = false; // إغلاق النافذة بعد بدء محادثة
    },
  },
};
</script>

<style scoped>
.chat-layout {
  display: flex;
  height: 100vh;
  background: #f9f9f9;
}
.chat-sidebar {
  width: 300px;
  border-left: 1px solid #ddd;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.chat-sidebar h3 {
  margin: 0;
  padding: 16px;
  font-size: 18px;
  border-bottom: 1px solid #ddd;
}
.chat-sidebar input {
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.chat-sidebar ul {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  flex: 1;
}
.chat-sidebar li {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;
}
.chat-sidebar li:hover {
  background: #f8f8f8;
}
.chat-sidebar li.active {
  background: #eee;
}
.chat-sidebar .avatar {
  border-radius: 50%;
  margin-left: 10px;
}
.chat-sidebar .info {
  display: flex;
  flex-direction: column;
}
.add-chat-btn {
  margin: 10px;
  padding: 6px 10px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.back-btn {
  margin: 10px;
  padding: 6px 10px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fafafa;
}
.chat-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
}
</style>
