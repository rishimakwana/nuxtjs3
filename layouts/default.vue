<script setup lang="ts">
useHead({
  title: `Nuxt App`,
})
// Initialize sidebar state
const sidebarExpanded = ref(true);

// Function to toggle the sidebar state
const toggleSidebar = () => {
  sidebarExpanded.value = !sidebarExpanded.value;
};

</script>

<template>
  <no-ssr>
    <div>
    <!-- Begin page -->
    <AppHeader :toggleSidebar="toggleSidebar" :sidebarExpanded="sidebarExpanded" />

    <!-- Sidebar -->
    <div :class="`max-h-[calc(100vh-130px)] overflow-y-scroll z-20 overflow-x-visible fixed ${sidebarExpanded ? 'w-[300px]' : 'w-[70px]'} top-16 bg-transparent`">
    <AppSidebar :sidebarExpanded="sidebarExpanded"/>
    </div>

    <div :class="`relative ${sidebarExpanded ? 'ml-[300px]' : 'ml-[70px]'} pt-[70px] min-h-screen`">
          <slot />
    </div>

    <!-- END layout-wrapper -->
    <AppFooter />
    <UNotifications />
  </div>
  </no-ssr>
</template>