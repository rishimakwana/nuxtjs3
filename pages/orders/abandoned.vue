<script setup lang="ts">
const { t } = useI18n()
definePageMeta({
  middleware: 'auth'
})
useHead({
  title: `${t("menu.abandoned")} | Nuxt App`,
})

</script>
<template>
  {{ $t("menu.abandoned") }} page
</template>