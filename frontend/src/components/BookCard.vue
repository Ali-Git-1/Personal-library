<script setup>
defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <article class="rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md">
    <div class="mb-4 flex items-start justify-between gap-3">
      <h3 class="text-lg font-bold text-gray-800">
        {{ book.title }}
      </h3>

      <span
        class="shrink-0 rounded-full px-3 py-1 text-xs font-medium"
        :class="
          book.status === 'read' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
        "
      >
        {{ book.status === 'read' ? 'خوانده شده' : 'در حال مطالعه' }}
      </span>
    </div>

    <p class="mb-3 text-sm text-gray-500">نویسنده: {{ book.author }}</p>

    <p class="text-sm leading-7 text-gray-600">
      {{ book.description || 'توضیحاتی برای این کتاب ثبت نشده است.' }}
    </p>

    <div class="mt-5 flex gap-3 border-t border-gray-100 pt-4">
      <button
        @click="emit('edit', book)"
        class="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
      >
        ویرایش
      </button>

      <button
        @click="emit('delete', book._id)"
        class="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
      >
        حذف
      </button>
    </div>
  </article>
</template>
