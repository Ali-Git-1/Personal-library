<script setup>
import { ref } from 'vue'
import api from '@/services/api'

const emit = defineEmits(['book-added'])

const title = ref('')
const author = ref('')
const description = ref('')
const status = ref('reading')

const isLoading = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  errorMessage.value = ''

  if (!title.value.trim() || !author.value.trim()) {
    errorMessage.value = 'عنوان کتاب و نام نویسنده الزامی هستند.'
    return
  }

  try {
    isLoading.value = true

    const response = await api.post('/books', {
      title: title.value,
      author: author.value,
      description: description.value,
      status: status.value,
    })

    emit('book-added', response.data.data)

    title.value = ''
    author.value = ''
    description.value = ''
    status.value = 'reading'
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'ثبت کتاب با خطا مواجه شد.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mb-8 rounded-xl border border-gray-200 bg-white p-6">
    <h3 class="mb-5 text-lg font-bold text-gray-800">افزودن کتاب جدید</h3>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <input
        v-model="title"
        type="text"
        placeholder="عنوان کتاب"
        class="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
      />

      <input
        v-model="author"
        type="text"
        placeholder="نام نویسنده"
        class="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
      />

      <textarea
        v-model="description"
        placeholder="توضیحات کتاب (اختیاری)"
        rows="3"
        class="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400 sm:col-span-2"
      ></textarea>

      <select
        v-model="status"
        class="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400"
      >
        <option value="reading">در حال مطالعه</option>
        <option value="read">خوانده شده</option>
      </select>
    </div>

    <p v-if="errorMessage" class="mt-4 text-sm text-red-600">
      {{ errorMessage }}
    </p>

    <button
      type="submit"
      :disabled="isLoading"
      class="mt-5 rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {{ isLoading ? 'در حال ثبت...' : 'ثبت کتاب' }}
    </button>
  </form>
</template>
