<template>
  <div class="ml-6 mb-2">
    <!-- Node utama -->
    <div class="flex items-center gap-2 p-2 rounded-lg border hover:bg-gray-50">
      <span class="font-semibold">{{ node.name }}</span>
      <span 
        class="text-xs px-2 py-1 rounded-full"
        :class="progressColor"
      >
        {{ node.progress }}%
      </span>
    </div>

    <!-- Anak-anak -->
    <div v-if="node.children" class="ml-6 border-l-2 border-gray-300 pl-4">
      <TreeNode v-for="(child, index) in node.children" :key="index" :node="child" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  node: {
    type: Object,
    required: true
  }
})

const progressColor = computed(() => {
  if (props.node.progress >= 75) return "bg-green-200 text-green-700"
  if (props.node.progress >= 50) return "bg-yellow-200 text-yellow-700"
  return "bg-red-200 text-red-700"
})
</script>
