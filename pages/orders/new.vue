<script setup lang="ts">
import { reactive, ref } from "vue";
const { t } = useI18n();
import type { FormError, FormSubmitEvent } from "#ui/types";

definePageMeta({
  middleware: "auth",
});
useHead({
  title: `Create Order | Nuxt App`,
});
const payload = ref<any>({});

const state = reactive({
  name: undefined,
  productname: undefined,
  address: undefined,
  price: 0,
  productId: undefined,
  quantity: 0,
  shippingMethod: undefined,
  notes: undefined,
});

const validate = (state: any): FormError[] => {
  const errors: any = [];
  if (!state.name) errors.push({ path: "name", message: "Required" });
  if (!state.price) errors.push({ path: "price", message: "Required" });
  if (!state.quantity) errors.push({ path: "quantity", message: "Required" });
  return errors;
};

const loading = ref(false)
// const selected = ref()
const selected = ref({})


async function search (q: string) {
  loading.value = true
  const products = await $fetch<any[]>('/api/products/getall', { params: { q } })
  loading.value = false
  console.log(products,"products--------------");
  
  return products
}
async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data);
}
const cancel = () => {
  navigateTo("/orders");
};
const save = async () => {
  if (payload.value.productId) {
    return;
  }
  const data = {
    name: payload.value.name,
    price: payload.value.price,
    productname: payload.value.productname,
    address: payload.value.address,
    productId: payload.value.productId,
    quantity: payload.value.quantity,
    shippingMethod: payload.value.shippingMethod,
    notes: payload.value.notes,
  };
  console.log("data-------**************-", data);
  const res = await $fetch("/api/order/create", {
    method: "post",
    body: data,
  });
  if (res.statusCode == 200) {
    navigateTo("/orders");
  }
  console.log(res, "application-----------------------------");
};
</script>

<template>
  <div class="w-full max-w-screen-2xl m-auto">
    <section class="relative w-full max-w-screen-2xl m-auto flex bg-blue-50">
      <div class="w-full min-h-full p-7 border-r border-[#bfcee0]">
        <div class="section_title mt-0 mb-7 add-new-product__header-title">
          <div
            class="text-2xl font-medium leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight"
          >
            {{ $t("common.createOrder") }}
          </div>
        </div>

        <UForm
          :validate="validate"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="Name" name="name">
            <UInput v-model="state.name" />
          </UFormGroup>

          <UFormGroup label="Price" name="price">
            <UInput v-model="state.price" type="number" />
          </UFormGroup>

          <UFormGroup label="Address" name="address">
            <UInput v-model="state.address" type="text" />
          </UFormGroup>

          <UFormGroup label="Quantity" name="quantity">
            <UInput v-model="state.quantity" type="number" />
          </UFormGroup>

          <UFormGroup label="Shipping Method" name="shippingMethod">
            <UInput v-model="state.shippingMethod" type="text" />
          </UFormGroup>

          <UFormGroup label="Notes" name="notes">
            <UInput v-model="state.notes" type="text" />
          </UFormGroup>

          <!-- Products Dropdown -->
          <UInputMenu
            v-model="selected"
            :search="search"
            :loading="loading"
            placeholder="Search for a product..."
            option-attribute="name"
            trailing
            by="id"
          />

          <!-- save and cancel button -->
          <UButton class="px-5 py-2 rounded-md" @click="cancel">
            Cancel
          </UButton>
          <UButton class="px-5 py-2 rounded-md ml-2" @click="save">
            Save
          </UButton>
        </UForm>
      </div>
    </section>
  </div>
</template>
