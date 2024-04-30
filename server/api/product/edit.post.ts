import productModel from "~/server/models/productModel";
import parseError from "~/server/utils/errorParser";

export default defineEventHandler(async (event: any) => {
    try {
        // Read the body of the request
        const reqbody = await readBody(event);

        // Find the existing product by ID
        const existingProduct = await productModel.findById(reqbody.id);
        if (!existingProduct) {
            throw createError({
                statusCode: 404,
                statusMessage: "Product not found",
                fatal: false,
                data: { id: reqbody.id },
                stack: "",
            });
        }

        // Update the existing product with the new data
        Object.assign(existingProduct, reqbody);
        const updatedProduct = await existingProduct.save();

        return { statusCode: 200, message: "Product updated successfully.", ...updatedProduct.toJSON() };
    } catch (error: any) {
        return parseError(error);
    }
});
