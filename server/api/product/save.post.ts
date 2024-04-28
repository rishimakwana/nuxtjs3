import productModel from "~/server/models/productModel";

export default defineEventHandler(async (event: any) => {
    try {
        
        // Read the body of the request
        const reqbody = await readBody(event);
        console.log(reqbody,'`-----------reqbody`');
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
          return { statusCode: 200, message : "Product savesd successfully." , ...savedUser.toJSON() };
      } catch (error: any) {
        console.error("Error in API handler:", error);
  
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
