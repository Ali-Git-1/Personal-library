<script setup>
import AppHeader from '@/components/AppHeader.vue'
import BookList from '@/components/BookList.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <main class="mx-auto max-w-6xl px-5 py-10">
      <div class="mb-8">
        <h2 class="mb-2 text-2xl font-bold text-gray-800">کتابخانه من</h2>

        <p class="text-sm text-gray-500">کتاب‌هایی که می‌خوانم یا خوانده‌ام را مدیریت کن.</p>
      </div>

      <BookList />
    </main>
  </div>
</template>
