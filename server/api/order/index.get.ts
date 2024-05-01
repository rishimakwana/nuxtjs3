import Order from "../../models/orderModel";
import { findAllEntity } from "~/server/utils/common";

export default defineEventHandler(async (event: any) => {
    const query: any = getQuery(event);
    //used common function for getting all entities
    const list = findAllEntity(Order, query);
    return list
});
