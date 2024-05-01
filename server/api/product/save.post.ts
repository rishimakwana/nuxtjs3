import productModel from "~/server/models/productModel";
import { createEntity } from "~/server/utils/common";

export default defineEventHandler(async (event: any) => {
  const reqbody = await readBody(event);
  //calling the common module for create entity
  const product = createEntity(productModel, reqbody, "Product");
  return product
});
