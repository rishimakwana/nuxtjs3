import Order from "~/server/models/orderModel";
import { createEntity } from "~/server/utils/common";

/*
 * Handles the creation of an order entity.
 * calls a common module to create the entity, and returns the created order.
 * @param event The incoming request event object
 * @returns {Object} The created order entity
 */
export default defineEventHandler(async (event: any) => {
  const reqbody = await readBody(event);
  const order = createEntity(Order, reqbody, "");
  return order;
});
