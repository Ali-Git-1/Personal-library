<script setup>
import BookCard from './BookCard.vue'

const books = [
  {
    _id: '1',
    title: 'اثر مرکب',
    author: 'دارن هاردی',
    description: 'کتابی درباره تأثیر تصمیم‌های کوچک و مداوم در زندگی.',
    status: 'read',
  },
  {
    _id: '2',
    title: 'عادت‌های اتمی',
    author: 'جیمز کلیر',
    description: 'راهکارهایی برای ایجاد عادت‌های مثبت و حذف عادت‌های بد.',
    status: 'reading',
  },
  {
    _id: '3',
    title: 'چهار اثر از فلورانس',
    author: 'فلورانس اسکاول شین',
    description: 'نگاهی به نگرش، باورها و تأثیر آن‌ها بر زندگی.',
    status: 'read',
  },
]
</script>

<template>
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <BookCard v-for="book in books" :key="book._id" :book="book" />
  </div>
</template>
