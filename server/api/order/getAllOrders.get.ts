import parseError from "~/server/utils/errorParser";
import Order from "../../models/orderModel";

export default defineEventHandler(async (event: any) => {
    try {
        const result = await Order.get();
        const res = JSON.parse(JSON.stringify(result))
        return { statusCode: 200, data :res };
      } catch (error) {
        return parseError(error);
      }
});
