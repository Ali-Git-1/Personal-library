<script setup>
import { ref, watch } from 'vue'
import api from '@/services/api'

const props = defineProps({
  editingBook: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['book-added', 'book-updated', 'cancel-edit'])

const title = ref('')
const author = ref('')
const description = ref('')
const status = ref('reading')

const isLoading = ref(false)
const errorMessage = ref('')

const resetForm = () => {
  title.value = ''
  author.value = ''
  description.value = ''
  status.value = 'reading'
  errorMessage.value = ''
}

watch(
  () => props.editingBook,
  (book) => {
    if (book) {
      title.value = book.title
      author.value = book.author
      description.value = book.description || ''
      status.value = book.status
      errorMessage.value = ''
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  errorMessage.value = ''

  if (!title.value.trim() || !author.value.trim()) {
    errorMessage.value = 'عنوان کتاب و نام نویسنده الزامی هستند.'
    return
  }

  try {
    isLoading.value = true

    const bookData = {
      title: title.value.trim(),
      author: author.value.trim(),
      description: description.value.trim(),
      status: status.value,
    }

    if (props.editingBook) {
      const response = await api.put(`/books/${props.editingBook._id}`, bookData)

      emit('book-updated', response.data.data)
    } else {
      const response = await api.post('/books', bookData)

      emit('book-added', response.data.data)
    }

    resetForm()
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'عملیات با خطا مواجه شد.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mb-8 rounded-xl border border-gray-200 bg-white p-6">
    <h3 class="mb-5 text-lg font-bold text-gray-800">
      {{ editingBook ? 'ویرایش کتاب' : 'افزودن کتاب جدید' }}
    </h3>

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

    <div class="mt-5 flex gap-3">
      <button
        type="submit"
        :disabled="isLoading"
        class="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-50"
      >
        {{ isLoading ? 'در حال ذخیره...' : editingBook ? 'ذخیره تغییرات' : 'ثبت کتاب' }}
      </button>

      <button
        v-if="editingBook"
        type="button"
        @click="emit('cancel-edit')"
        class="rounded-lg border border-gray-200 px-5 py-3 text-sm text-gray-600 hover:bg-gray-50"
      >
        انصراف
      </button>
    </div>
  </form>
</template>
