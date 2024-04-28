import parseError from "~/server/utils/errorParser";
import Product from "../../models/productModel";

export default defineEventHandler(async (event: any) => {
    try {
        const query = getQuery(event);
        if (typeof query !== "object" || query === null) {
          throw createError({
            statusCode: 400,
            statusMessage: "Invalid filter parameter",
            stack: "Bad Request",
          });
        }
        const result = await Product.get();
        const res = JSON.parse(JSON.stringify(result))
        return { statusCode: 200, data :res };
      } catch (error) {
        return parseError(error);
      }
});
