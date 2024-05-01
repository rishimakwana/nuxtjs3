<script setup lang="ts">
const props = defineProps(["data", "val"]);

const payload: any = ref<any>({ ...props.data });
const isOpen = ref(props.val);

console.log(isOpen,"isOpenisOpenisOpenisOpenisOpen",props.val);

// Emit the updated value on change
const updateOrder = () => {
  console.log(payload, "6+6666666");
};
</script>
<template>
  <UModal v-model="isOpen">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800 text-center',
      }"
    >
      <!-- Products Dropdown -->
      <UFormGroup label="Selected Product">
        <UInput disabled v-model="payload.productname" type="number" />
      </UFormGroup>

      <UFormGroup label="Price" name="price">
        <UInput disabled v-model="payload.price" type="number" />
      </UFormGroup>

      <UFormGroup label="Name" name="name">
        <UInput v-model="payload.name" />
      </UFormGroup>

      <UFormGroup label="Address" name="address">
        <UInput v-model="payload.address" type="text" />
      </UFormGroup>

      <UFormGroup label="Quantity" name="quantity">
        <UInput v-model="payload.quantity" type="number" />
      </UFormGroup>

      <UFormGroup label="Shipping Method" name="shippingMethod">
        <UInput v-model="payload.shippingMethod" type="text" />
      </UFormGroup>

      <UFormGroup label="Notes" name="notes">
        <UInput v-model="payload.notes" type="text" />
      </UFormGroup>
      <UFormGroup label="Payment Status" name="paymentStatus">
        <UInput v-model="payload.paymentStatus" type="text" />
      </UFormGroup>
      <UFormGroup label="Tracking Number" name="trackingNumber">
        <UInput v-model="payload.trackingNumber" type="text" />
      </UFormGroup>

      <!-- save and cancel button -->
      <UButton class="px-5 py-2 rounded-md" @click=""> Cancel </UButton>
      <UButton class="px-5 py-2 rounded-md ml-2" @click="updateOrder">
        Update
      </UButton>
    </UCard>
  </UModal>
</template>
