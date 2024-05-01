import Order from "~/server/models/orderModel";
import { deleteEntity } from "~/server/utils/common";

export default defineEventHandler(async (event: any) => {
  // Read the body of the request
  const reqbody = await readBody(event);
  //Use the common delete function
  const res = deleteEntity(Order, reqbody.id);
  return res;
});
