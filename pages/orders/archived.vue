<script setup lang="ts">
const { t } = useI18n()
definePageMeta({
  middleware: 'auth'
})

useHead({
  title: `${ t("menu.archived")} | Nuxt App`,
})
</script>

<template>
  {{ $t("menu.archived") }} page
</template>