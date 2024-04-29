import productModel from "~/server/models/productModel";
import parseError from "~/server/utils/errorParser";

export default defineEventHandler(async (event: any) => {
    try {
        
        // Read the body of the request
        const reqbody = await readBody(event);
        const exists = await productModel.findOne({
            name: reqbody.name,
          });
      
          if (exists) {
            throw createError({
              statusCode: 400,
              statusMessage: "Name already exist",
              fatal: false,
              data: { name: exists.name },
              stack: "",
            });
          }
          const savedUser = await productModel.add(reqbody);
          return { statusCode: 200, message : "Product created successfully." , ...savedUser.toJSON() };
      } catch (error: any) {
        return parseError(error);
      }
});
