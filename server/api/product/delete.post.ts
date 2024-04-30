import productModel from "~/server/models/productModel";
import parseError from "~/server/utils/errorParser";

export default defineEventHandler(async (event: any) => {
    try {
        // Read the body of the request
        const reqbody = await readBody(event);

        // Extract the product ID from the request body
        const productId = reqbody.id;
        if (!productId) {
        throw new Error("Product ID is required.");
        }

        // Find the existing product by ID
        const existingProduct = await productModel.findById(productId);
        if (!existingProduct) {
        throw createError({
            statusCode: 404,
            statusMessage: "Product not found",
            fatal: false,
            data: { id: productId },
            stack: "",
        });
        }

        // Delete the existing product
        await productModel.delete({ _id: productId });

        return {
        statusCode: 200,
        message: "Product deleted successfully.",
        productId: productId,
        };
    } catch (error: any) {
        return parseError(error);
    }
});
