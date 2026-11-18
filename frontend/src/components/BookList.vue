<script setup>
import { ref, computed, onMounted } from 'vue'
import BookCard from './BookCard.vue'
import AddBookForm from './AddBookForm.vue'
import api from '@/services/api'

const books = ref([])

const searchQuery = ref('')
const selectedStatus = ref('all')

const isLoading = ref(false)
const errorMessage = ref('')

const deleteBook = async (bookId) => {
  const isConfirmed = window.confirm('آیا از حذف این کتاب اطمینان داری؟')

  if (!isConfirmed) return

  try {
    await api.delete(`/books/${bookId}`)

    books.value = books.value.filter((book) => book._id !== bookId)

    if (editingBook.value?._id === bookId) {
      editingBook.value = null
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'حذف کتاب با خطا مواجه شد.'
  }
}

const fetchBooks = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await api.get('/books')

    books.value = response.data.data
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'دریافت کتاب‌ها با خطا مواجه شد.'
  } finally {
    isLoading.value = false
  }
}

const addBook = (newBook) => {
  books.value.unshift(newBook)
}

const filteredBooks = computed(() => {
  return books.value.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.value.trim().toLowerCase())

    const matchesStatus = selectedStatus.value === 'all' || book.status === selectedStatus.value

    return matchesSearch && matchesStatus
  })
})

const editingBook = ref(null)

const startEditing = (book) => {
  editingBook.value = book
}

const updateBook = (updatedBook) => {
  const index = books.value.findIndex((book) => book._id === updatedBook._id)

  if (index !== -1) {
    books.value[index] = updatedBook
  }

  editingBook.value = null
}

const cancelEdit = () => {
  editingBook.value = null
}

onMounted(() => {
  fetchBooks()
})
</script>

<template>
  <section>
    <AddBookForm
      :editing-book="editingBook"
      @book-added="addBook"
      @book-updated="updateBook"
      @cancel-edit="cancelEdit"
    />

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

    <div v-if="isLoading" class="py-10 text-center text-gray-500">در حال دریافت کتاب‌ها...</div>

    <div v-else-if="errorMessage" class="rounded-xl bg-red-50 p-6 text-center">
      <p class="mb-4 text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <button @click="fetchBooks" class="rounded-lg bg-gray-900 px-5 py-2 text-sm text-white">
        تلاش مجدد
      </button>
    </div>

    <div
      v-else-if="filteredBooks.length"
      class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <BookCard
        v-for="book in filteredBooks"
        :key="book._id"
        :book="book"
        @edit="startEditing"
        @delete="deleteBook"
      />
    </div>

    <div v-else class="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
      کتابی با این مشخصات پیدا نشد!
    </div>
  </section>
</template>
