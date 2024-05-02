import Order from "~/server/models/orderModel";
import { deleteEntity } from "~/server/utils/common";

/*
 * Handles the delete of an order entity.
 * calls a common module to delete the entity
 * @param event The incoming request event object
 */
export default defineEventHandler(async (event: any) => {
  const reqbody = await readBody(event);
  const res = deleteEntity(Order, reqbody.id);
  return res;
});
