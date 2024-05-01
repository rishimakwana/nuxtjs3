import productModel from "~/server/models/productModel";
import { findAllEntity } from "~/server/utils/common";

export default defineEventHandler(async (event: any) => {
  const query: any = getQuery(event);
  //used common function for getting all entities
  const list = findAllEntity(productModel, query);
  return list;
});
