import Order from "~/server/models/orderModel";
import { updateEntity } from "~/server/utils/common";

export default defineEventHandler(async (event: any) => {
  const reqbody = await readBody(event);
  //use common update function
  const updatedData = updateEntity(Order, reqbody);
  return updatedData;
});
