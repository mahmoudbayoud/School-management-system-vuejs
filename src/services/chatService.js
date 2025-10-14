// src/services/chatService.js
import { db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

/**
 * إنشاء غرفة محادثة بين المدرسة وولي الأمر
 */
export async function createOrGetChat(
  schoolId,
  schoolName,
  parentId,
  parentName
) {
  const ids = [schoolId, parentId].sort(); // ثابت مثل Flutter
  const chatId = ids.join("parent_school");

  const chatRef = doc(db, "chats", chatId);
  const chatSnap = await getDoc(chatRef);

  if (!chatSnap.exists()) {
    await setDoc(chatRef, {
      participants: [
        { id: parentId, name: parentName, role: "parent" },
        { id: schoolId, name: schoolName, role: "school" },
      ],
      participantIds: [parentId, schoolId],
      lastMessage: "",
      updatedAt: serverTimestamp(),
      [`${parentId}_parent_typing`]: false,
      [`${schoolId}_school_typing`]: false,
    });
  }

  return chatId;
}
