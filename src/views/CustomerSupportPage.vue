<template>
  <v-container fluid style="font-family: Cairo, sans-serif; direction: rtl">
    <h2 class="mb-6 text-center">الأسئلة الشائعة</h2>

    <v-row dense style="display: flex; justify-content: center">
      <v-col v-for="(faq, index) in faqs" :key="index" cols="6" md="5">
        <v-card
          elevation="2"
          class="pa-4 rounded-xl"
          style="width: 600px; margin-bottom: 22px"
        >
          <v-card-title
            style="font-family: Cairo, sans-serif; font-weight: bold"
          >
            {{ faq.question }}
          </v-card-title>
          <v-card-text style="color: gray">
            {{ faq.answer }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CustomerSupportFAQ",
  data() {
    return {
      faqs: [
        {
          question: "كيف يمكنني إضافة مدرس جديد إلى المدرسة؟",
          answer:
            "يمكنك ذلك من خلال الذهاب إلى قسم المعلمين ثم الضغط على زر إضافة مدرس جديد.",
        },
        {
          question: "كيف يمكن لأولياء الأمور متابعة أبنائهم؟",
          answer:
            "عبر تسجيل الدخول بحساب ولي الأمر ومتابعة الدرجات والأنشطة من لوحة التحكم.",
        },
        {
          question: "هل يمكن تعديل بيانات المدرسة؟",
          answer:
            "نعم، من خلال صفحة الإعدادات يمكنك تعديل بيانات المدرسة وحفظ التغييرات.",
        },
        {
          question: "ماذا أفعل إذا نسيت كلمة المرور؟",
          answer:
            "يمكنك استرجاع كلمة المرور من خلال خيار (نسيت كلمة المرور) عند تسجيل الدخول.",
        },
        {
          question: "كيف أرسل إشعاراً لجميع أولياء الأمور؟",
          answer:
            "من خلال قسم الإشعارات يمكنك كتابة رسالة وتحديد المستلمين ليتم إرسالها دفعة واحدة.",
        },
        {
          question: "هل يمكن للمدرس رفع ملفات أو واجبات للطلاب؟",
          answer:
            "نعم، يمكن للمدرس الدخول إلى صفحة الصف ورفع الملفات أو إضافة واجبات للطلاب.",
        },
        {
          question: "كيف أتابع الحضور والغياب للطلاب؟",
          answer:
            "من خلال قسم الحضور والغياب حيث يمكن تسجيل الغياب وعرض تقارير مفصلة لكل طالب.",
        },
        {
          question: "هل يمكن للمدرسين التواصل مع أولياء الأمور؟",
          answer:
            "نعم، يوجد نظام رسائل يتيح التواصل المباشر بين المعلمين وأولياء الأمور.",
        },
        {
          question: "كيف يمكنني إضافة نشاط مدرسي جديد؟",
          answer:
            "انتقل إلى قسم الأنشطة ثم اضغط على إضافة نشاط جديد مع تحديد التفاصيل المطلوبة.",
        },
        {
          question: "هل يمكنني استخراج تقارير الدرجات بشكل ملف؟",
          answer:
            "نعم، يمكن تصدير الدرجات والتقارير على شكل ملف Excel أو PDF بسهولة.",
        },
      ],
    };
  },
};
</script>
