import orderModel from "~/server/models/orderModel";
import parseError from "~/server/utils/errorParser";

export default defineEventHandler(async (event: any) => {
    try {
        // Read the body of the request
        const reqbody = await readBody(event);

        // Extract the order ID from the request body
        const orderId = reqbody.id;
        if (!orderId) {
        throw new Error("Order ID is required.");
        }

        // Find the existing order by ID
        const existingOrder = await orderModel.findById(orderId);
        if (!existingOrder) {
        throw createError({
            statusCode: 404,
            statusMessage: "Order not found",
            fatal: false,
            data: { id: orderId },
            stack: "",
        });
        }

        // Delete the existing order
        await orderModel.delete({ _id: orderId });

        return {
        statusCode: 200,
        message: "Order deleted successfully.",
        orderId: orderId,
        };
    } catch (error: any) {
        console.log(error,"error/*-*******************");
        
        return parseError(error);
    }
});
