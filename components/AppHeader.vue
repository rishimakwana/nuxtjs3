<script lang="ts" setup>
import { useAuthStore } from '~/store/auth'; // import the auth store we just created
const props = defineProps(['toggleSidebar', 'sidebarExpanded']);

const { toggleSidebar } = props;

const router = useRouter();
const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
// const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const { locale } = useI18n()

const logout = () => {
  logUserOut();
  router.push('/login');
};

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const items = [
  [{
    label: 'Account Settings',
    icon: 'i-heroicons-cog-6-tooth-20-solid',
    to: "/settings/account"
  }], [{
    label: 'Logout',
    icon: 'i-heroicons-arrow-down-tray-20-solid',
    // shortcuts: ['⌘', 'D'],
    click: () => {
      logout()
    }
  }],
]
</script>
<template>
  <header>
    <nav class="bg-primary border-gray-200 fixed pr-6 w-full z-10 h-[64px] overflow-visible max-w-screen-2xl">
      <UContainer :ui="{ padding: 'px-0 sm:px-0 lg:px-0' }" class="flex flex-wrap items-center justify-between py-4">
        <div class="flex">
          <NuxtLink to="/" class="flex items-center ml-[10px]">
            <img src="~/assets/images/e-commerce-favicon-color.png" :class="`${props.sidebarExpanded ? 'md:hidden' : ''} h-[20px] block`" alt="Logo" />
            <img src="~/assets/images/e-commerce-high-resolution-logo.png" :class="`h-[35px] w-[150px] hidden ${props.sidebarExpanded ? 'md:block' : ''}`"
              alt="Logo" />
          </NuxtLink>
          <UButton class="ml-3 sm:ml-10" @click="toggleSidebar()">
            
            <!-- v-click-outside="vcoConfig"> -->
            <img class="" src="~/assets/img/icon/menu_icon.svg" />
          </UButton>
        </div>
        <div class="block w-auto" id="navbar-default">
          <ul class="font-medium flex p-0 flex-row space-x-3 md:space-x-6 rtl:space-x-reverse mt-0 border-0">
            <li>
              <UPopover>
                <UChip text="24" size="2xl" color="red">
                  <img src="~/assets/images/notifi.svg" alt="icon noti">
                </UChip>
                <template #panel>
                  <div class="max-w-sm">
                    <div class="flex justify-between p-4 border-b border-custom-100">
                      <span class="font-[500] text-sm text-custom-800 dark:text-white tracking-tight">Notification</span>
                      <span class="font-[500] text-xs text-primary dark:text-[#8397f0] leading-5 tracking-tight cursor-pointer">Mark all as
                        read</span>
                    </div>
                    <ul class="max-h-96 overflow-y-scroll">
                      <li href="#">
                        <div class="py-4 mx-4 flex items-start border-b border-custom-100">
                          <img src="~/assets/img/icon/notif-new-order.svg" alt="">
                          <div class="ml-4">
                            <h4 class="font-[600] text-sm tracking-tight color-custom-800 mb-2">New Order</h4>
                            <span class="font-[400] text-xs leading-5 tracking-tight text-custom">
                              noti.data.name ? noti.data.name : "" has ordered
                              noti.data.product_name , Order ID :
                              noti.data.ORDER_ID ? noti.data.ORDER_ID : ""
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </template>
              </UPopover>
            </li>
            <div class="balance-box cursor-pointer">
              <!-- v-if='$store.state.authfack.user && $store.state.authfack.user.role !== "admin"' -->
              <div
                class="nav-item flex b-nav-dropdown dropdown notification-list topbar-dropdown balance pl-2 pr-2 price-section">
                <NuxtLink to="/settings/balance">
                  <div class="nav-link dropdown-toggle p-0 pr-1 flex text-white">
                    <img src="~/assets/img/icon/ic-balance-navbar.svg" alt="icon balance" class="mr-1">
                    <span>
                      <!-- {{ $t('settings.currency') }} {{ ($store.state.authfack.user && $store.state.authfack.user.adminBalance ? parseInt($store.state.authfack.user.adminBalance) : $store.state.authfack.user.balance ?
                    parseInt($store.state.authfack.user.balance) : 0) | g_number_format }} -->
                      IDR 0
                    </span>
                  </div>
                </NuxtLink>
                <UPopover mode="hover">
                  <!-- v-if='$store.state.authfack.user && $store.state.authfack.user.isReservedBalance' -->
                  <img class="icon-info" src="~/assets/img/icon/ic-information-black.svg" alt="">
                  <template #panel>
                    <span class="max-w-sm p-5 block">
                      Balance
                    </span>
                  </template>
                </UPopover>
              </div>
            </div>
            <li>
              <template>
                <UDropdown :items="items" >

                  <button
                    class="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                    <div class="mr-0 text-white">
                      <span class="pro-user-name ml-1 flex">
                        <img src="~/assets/img/icon/ic-profile-navbar.svg" alt="icon profile">
                        <span class="mx-1 hidden md:block">User</span>
                        <!-- {{ $store.state.authfack.user ? $store.state.authfack.user.name : "" }} -->
                        <img src="~/assets/img/icon/ic-arrow-white-bottom-18.svg" alt="" class="arrow">

                      </span>
                      <span class="profile-icon ml-1 flex md:hidden">
                      <img src="~/assets/img/icon/profile-dropdown.svg" alt="">
                      <img src="~/assets/img/icon/ic-arrow-white-bottom-18.svg" alt="" class="arrow">
                    </span>
                    </div>
                  </button>
                </UDropdown>
              </template>
            </li>
            <li class="sm:pr-4 md:pr-8 pr-1">
              <UToggle v-model="isDark" off-icon="i-heroicons-sun-20-solid h-3 w-3 text-gray-400 dark:text-gray-500"
                on-icon="i-heroicons-moon-20-solid h-3 w-3 text-primary-500" color="primary" />
            </li>
            <form>
              <select v-model="locale">
                <option value="en">en</option>
                <option value="id">id</option>
              </select>
            </form>
          </ul>
        </div>
      </UContainer>
    </nav>
  </header>
</template>