<script setup lang="ts">
const { t } = useI18n()
definePageMeta({
  middleware: 'auth'
})
useHead({
  title: `${t("menu.teamMembers")} | Nuxt App`,
})
</script>

<template>
  {{ $t("menu.teamMembers") }}
</template>
