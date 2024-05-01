import productModel from "~/server/models/productModel";
import { updateEntity } from "~/server/utils/common";

export default defineEventHandler(async (event: any) => {
  const reqbody = await readBody(event);
  //use common update function
  const updatedData = updateEntity(productModel, reqbody);
  return updatedData;
});
