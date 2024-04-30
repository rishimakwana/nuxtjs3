<script lang="ts" setup>
interface Row {
  _id: string;
}
// Columns
import { ProductColumns } from '~/constants/columns';
const selectedColumns = ref([...ProductColumns]);
const columnsTable = computed(() => selectedColumns.value);

// Selected Rows
const selectedRows = ref<Row[]>([]);

function select (row:any) {
  console.log(row,"/////////////////////////////********************************");
  const index = selectedRows.value.findIndex((item:any) => item._id == row._id)
  if (index === -1) {
    selectedRows.value.push(row)
  } else {
    selectedRows.value.splice(index, 1)
  }
  console.log(selectedRows,"selectedRows*9999999999999999999999999999999");
}

const search = ref('')
const filtersModal = ref(false)
// Pagination
const sort = ref({ column: 'id', direction: 'asc' as const })
const page = ref(1)
const pageCount = ref(20)

// Data
const { data: products, pending } = await useLazyAsyncData<{
  id: number
  title: string
  completed: string
}[]>('products', () => ($fetch as any)(`/api/product`, {
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

watch(selectedRows, (val) => {
console.log(val,"oooooooooooooooooooooooooooooooooooooooo");
}, { immediate: true });

</script>

<template>
  <UCard
    class="w-full" :ui="{ base: '', ring: '', divide: 'divide-y divide-gray-200 dark:divide-gray-700', header: { padding: 'px-4 py-5' }, body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' }, footer: { padding: 'p-4' } }">

    <!-- Filters -->
    <div class="flex items-center justify-between gap-3 px-4 py-3">
      <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />
      <UButton class="w-24" color="white" @click="() =>  { filtersModal = true }">
        <UIcon name="i-heroicons-bars-3-bottom-right"/> Filters
      </UButton>
    </div>

    <!-- Table -->
    <UTable
      @click="select"
      v-model="selectedRows" @select="select"
      v-model:sort="sort"
      :rows="products.data"
      :columns="columnsTable"
      :loading="pending"
      sort-asc-icon="i-heroicons-arrow-up"
      sort-desc-icon="i-heroicons-arrow-down"
      sort-mode="manual"
      class="w-full"
      :ui="{ td: { base: 'max-w-[0] truncate' } }" 
    />

    <!-- Number of rows & Pagination -->
    <template #footer>
      <div v-if="products?.data && products?.data.length > 0" class="flex flex-wrap justify-between items-center">
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
          :total="products?.data.length"
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

    <UModal v-model="filtersModal" prevent-close>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                Modal
              </h3>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                @click="filtersModal = false" />
            </div>
          </template>

          <!-- <Placeholder class="h-32" /> -->
        </UCard>
    </UModal>
  </UCard>
</template>