<script lang="ts" setup>
// Columns
import { OrderColumns } from '~/constants/columns';
const selectedColumns = ref(OrderColumns)
const columnsTable = computed(() => OrderColumns.filter((column) => selectedColumns?.value?.includes(column)))

// Selected Rows
const selectedRows = ref<any>([])

function select (row:any) {
  const index = selectedRows.value.findIndex((item:any) => item.id === row.id)
  if (index === -1) {
    selectedRows.value.push(row)
  } else {
    selectedRows.value.splice(index, 1)
  }
}

const search = ref('')
const filtersModal = ref(false)

async function edit(row:any) {
  console.log(row,"row");
}
async function deleteOrder(row:any) {
  console.log(row._id,"row._id00000000000000");
  try {
    if(row._id){
      await $fetch('/api/order/delete', {
          method: 'POST',
          body: {
            id: row._id
          }
        })
    }
  } catch (error) {
    console.log(error,"error");
  }
}

// Pagination
const sort = ref({ column: 'id', direction: 'asc' as const })
const page = ref(1)
const pageCount = ref(20)
const items = (row:any) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
  }]
]
// Data
const { data: orders, pending } = await useLazyAsyncData('orders', () => ($fetch as any)(`/api/order`, {
  query: {
    q: search.value,
    'page': page.value,
    'limit': pageCount.value,
    'sort': sort.value.column,
    'order': sort.value.direction
  }
}), {
  default: () => [],
  watch: [page, search, pageCount, sort]
})
</script>

<template>
  <UCard
    class="w-full"
    :ui="{
      base: '',
      ring: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-4 py-5' },
      body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
      footer: { padding: 'p-4' }
    }"
  >

    <!-- Filters -->
    <div class="flex items-center justify-between gap-3 px-4 py-3">
      <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />

      <div class="flex items-center">
        <UButton class="w-24 ml-2 " color="white" @click="() =>  { filtersModal = true }">
        <UIcon name="i-heroicons-bars-3-bottom-right"/> Filters
        </UButton>
      </div>
    </div>

    <!-- Table -->
    <UTable
      v-model="selectedRows" 
      @select="select"
      v-model:sort="sort"
      :rows="orders.data"
      :columns="columnsTable"
      :loading="pending"
      sort-asc-icon="i-heroicons-arrow-up"
      sort-desc-icon="i-heroicons-arrow-down"
      sort-mode="manual"
      class="w-full"
      :ui="{ td: { base: 'max-w-[0] truncate' } }"
    >
    <template #name-data="{ row }">
      <span :class="[selectedRows.find((item:any) => item._id == row._id) && 'text-primary-500 dark:text-primary-400']">{{ row.name }}</span>
    </template>

      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton @click="deleteOrder(row)"  color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>

    <!-- Number of rows & Pagination -->
    <template #footer>
      <div class="flex flex-wrap justify-between items-center">
            <div class="flex items-center gap-1.5">
              <span class="text-sm leading-5">Rows per page:</span>
      
              <USelect
                v-model="pageCount"
                :options="[3, 5, 10, 20, 30, 40]"
                class="me-2 w-20"
                size="xs"
              />
            </div>

        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="orders && orders?.data && orders?.data.length"
          :ui="{
            wrapper: 'flex items-center gap-1',
            rounded: '!rounded-full min-w-[32px] justify-center',
            default: {
              activeButton: {
                variant: 'outline'
              }
            }
          }"
        />
      </div>
    </template>
  </UCard>
</template>