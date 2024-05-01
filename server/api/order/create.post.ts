import Order from "~/server/models/orderModel";
import { createEntity } from "~/server/utils/common";

export default defineEventHandler(async (event: any) => {
  const reqbody = await readBody(event);
  //calling the common module for create entity
  const order = createEntity(Order, reqbody, "");
  return order;
});
