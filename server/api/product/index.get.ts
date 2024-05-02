import productModel from "~/server/models/productModel";
import { findAllEntity } from "~/server/utils/common";

/*
 * Retrieves a list of products based on the provided query parameters.
 * A common utility function to find all entities of the productModel 
 * @param event The incoming request event object
 * @returns {Array} An array containing the list of products
 */
export default defineEventHandler(async (event: any) => {
  const query: any = getQuery(event);
  const list = findAllEntity(productModel, query);
  return list;
});
