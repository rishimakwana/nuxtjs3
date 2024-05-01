import productModel from "~/server/models/productModel";
import { deleteEntity } from "~/server/utils/common";

export default defineEventHandler(async (event: any) => {
  // Read the body of the request
  const reqbody = await readBody(event);
  //Use the common delete function
  const res = deleteEntity(productModel, reqbody.id);
  return res;
});
