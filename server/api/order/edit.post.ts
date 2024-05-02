import Order from "~/server/models/orderModel";
import { updateEntity } from "~/server/utils/common";

/*
 * Handles the updation of an order entity.
 * calls a common module to update the entity.
 * @param event The incoming request event object
 * @returns {Object} The updated order entity
 */
export default defineEventHandler(async (event: any) => {
  const reqbody = await readBody(event);
  const updatedData = updateEntity(Order, reqbody);
  return updatedData;
});
