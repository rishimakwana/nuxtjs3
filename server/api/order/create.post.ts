import orderModel from "~/server/models/orderModel";

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
    if (error?.cause) {
      return error;
    } else if (error.errors) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
        data: error.errors,
        stack: "",
      });
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal server error",
        stack: "",
      });
    }
  }
});
