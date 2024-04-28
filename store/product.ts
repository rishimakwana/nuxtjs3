// import { defineStore } from "pinia";

// interface Product {
//   name: string;
//   price: number;
//   priceCompare: number;
//   costPerItem: number;
//   formOption: string;
//   images: string[];
//   url: string;
//   category: string;
//   category2: string;
//   category3: string;
//   status: string;
// }

// export const useProductStore = defineStore('product', {
//   state: () => ({
//     products: [] as Product[],
//     loading: false,
//   }),
//   actions: {
//     async saveProduct(payload: Product) {
//       try {
//         this.loading = true;

//         // Assuming useFetch is a custom function or plugin for handling API requests
//         const response = await useFetch('/api/products/save', {
//           method: 'post',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload),
//         });

//         if (response.ok) {
//           // Product saved successfully, update local state or perform any necessary actions
//           // For example, you might want to update the product list
//           await this.fetchProducts();
//         } else {
//           // Handle error, maybe display a notification to the user
//           console.error('Failed to save product:', response.statusText);
//         }
//       } catch (error) {
//         console.error('An error occurred while saving product:', error);
//       } finally {
//         this.loading = false;
//       }
//     },
//     async fetchProducts() {
//       try {
//         this.loading = true;

//         // Fetch products from API
//         const response = await useFetch('/api/products');

//         if (response.statusCode === 200) {
//           const products = await response.json();
//           this.products = products;
//         } else {
//           // Handle error
//           console.error('Failed to fetch products:', response.statusText);
//         }
//       } catch (error) {
//         console.error('An error occurred while fetching products:', error);
//       }
//     },
//   },
// });
