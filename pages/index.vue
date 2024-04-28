<script lang="ts" setup>
definePageMeta({
    middleware: 'auth'
})
</script>
<template>
    <div>
        <!-- component -->
        <div class="sm:px-6 lg:px-8 py-7 px-5">
            <div class="flex justify-start items-start">
                    <p class="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-white ">Dashboard</p>
            </div>
            <div class="custom-grid-container mt-4 gap-4">
                <div class="card section_card p-4 bg-white rounded-md flex w-full space-y-8 ">
                    <div class="card-body">
                    <div class="card_wrapper">
                        <div class="flex items-center gap-4 border-b border-blue-100 mb-4 pb-4">
                        <img src="~/assets/img/icon/captcha-settings-icon.svg" />
                        <p class="text-[#203551] font-medium text-md">Total Products :</p>
                        78
                        </div>
                    </div>
                    </div>
                </div>
                <div class="card section_card p-4 bg-white rounded-md flex w-full space-y-8">
                    <div class="card-body">
                    <div class="card_wrapper">
                        <div class="flex items-center gap-4 border-b border-blue-100 mb-4 pb-4">
                        <img src="~/assets/img/icon/captcha-settings-icon.svg" />
                        <p class="text-[#203551] font-medium text-md">Total Orders :</p>
                        78
                        </div>
                    </div>
                    </div>
                </div>
                <div class="card section_card p-4 bg-white rounded-md flex w-full space-y-8">
                    <div class="card-body">
                    <div class="card_wrapper">
                        <div class="flex items-center gap-4 border-b border-blue-100 mb-4 pb-4">
                        <img src="~/assets/img/icon/captcha-settings-icon.svg" />
                        <p class="text-[#203551] font-medium text-md">Total Paid Orders :</p>
                        78
                        </div>
                    </div>
                    </div>
                </div>
                <div class="card section_card p-4 bg-white rounded-md flex w-full space-y-8">
                    <div class="card-body">
                    <div class="card_wrapper">
                        <div class="flex items-center gap-4 border-b border-blue-100 mb-4 pb-4">
                        <img src="~/assets/img/icon/captcha-settings-icon.svg" />
                        <p class="text-[#203551] font-medium text-md">Total Unpaid Orders :</p>
                        78
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.custom-grid-container{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
</style>