import orderModel from "~/server/models/orderModel";
import parseError from "~/server/utils/errorParser";

export default defineEventHandler(async (event: any) => {
  try {
    // Read the body of the request
    const reqbody = await readBody(event);
    const savedUser = await orderModel.add(reqbody);
    return {
      statusCode: 200,
      message: "Order created successfully.",
      ...savedUser.toJSON(),
    };
  } catch (error: any) {
    return parseError(error);
  }
});
