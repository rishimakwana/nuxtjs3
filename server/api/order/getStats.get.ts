import parseError from "~/server/utils/errorParser";
import Order from "../../models/orderModel";
import Product from "~/server/models/productModel";

export default defineEventHandler(async (event: any) => {
  try {
    //get all products entities
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
