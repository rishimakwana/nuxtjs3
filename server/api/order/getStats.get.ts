import parseError from "~/server/utils/errorParser";
import Order from "../../models/orderModel";
import Product from "~/server/models/productModel";

/*
 * This function retrieves the total count of paid and unpaid orders, 
 * total orders, and total products from the database.
 * @param event The incoming request event object
 * @returns {Object} An object containing the statistics data
 */
export default defineEventHandler(async (event: any) => {
  try {
    const totalPaid = await Order.getCount({ paid: { $eq: true } });
    const totalUnPaid = await Order.getCount({ paid: { $ne: true } });
    const totalOrder = await Order.getCount({});
    const totalProducts = await Product.getCount({});
    const res = { totalPaid, totalUnPaid, totalOrder, totalProducts };
    return { statusCode: 200, data: res };
  } catch (error) {
    return parseError(error);
  }
});
