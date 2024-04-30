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

        // Update the existing order with the new data, excluding productId and price
        const { productId, price, ...updatedData } = reqbody; // Exclude productId and price
        Object.assign(existingOrder, updatedData);
        const updatedOrder = await existingOrder.save();

        return {
        statusCode: 200,
        message: "Order updated successfully.",
        ...updatedOrder.toJSON(),
        };
    } catch (error: any) {
        return parseError(error);
    }
});
