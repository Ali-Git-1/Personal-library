<script setup>
import { ref, computed } from 'vue'
import BookCard from './BookCard.vue'

const searchQuery = ref('')
const selectedStatus = ref('all')

const books = ref([
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
])

const filteredBooks = computed(() => {
  return books.value.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.value.trim().toLowerCase())

    const matchesStatus = selectedStatus.value === 'all' || book.status === selectedStatus.value

    return matchesSearch && matchesStatus
  })
})
</script>

<template>
  <section>
    <div class="mb-7 flex flex-col gap-4 sm:flex-row">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="جستجوی نام کتاب..."
        class="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-400"
      />

      <select
        v-model="selectedStatus"
        class="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400"
      >
        <option value="all">همه کتاب‌ها</option>
        <option value="reading">در حال مطالعه</option>
        <option value="read">خوانده شده</option>
      </select>
    </div>

    <div class="mb-5 text-sm text-gray-500">تعداد کتاب‌ها: {{ filteredBooks.length }}</div>

    <div v-if="filteredBooks.length" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <BookCard v-for="book in filteredBooks" :key="book._id" :book="book" />
    </div>

    <div v-else class="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
      کتابی با این مشخصات پیدا نشد!
    </div>
  </section>
</template>
