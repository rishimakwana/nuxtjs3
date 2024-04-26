// Import the necessary modules
import { readBody } from "h3";
import Product from '../models/productModel';
import parseError from '../utils/errorParser';

// Define the event handler
export default {

  //get all produts
  getAll: async (event: any) => {
    try {
      //   const reqbody = await readBody(event);
      // const name = getRouterParam(event, 'name')
    const query = "getQuery(event);"
    if (typeof query !== 'object' || query === null) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid filter parameter',
        stack: "Bad Request",
      });
    }
    const result = await Product.get(query,query)
    console.log('result=====',result);
    return { result:result };
    } catch (error) {
    return parseError(error)
    }
  },

  //create the product
  save: async (event: any) => {
    try {
      // Read the body of the request
      const reqbody = await readBody(event);
      // const name = getRouterParam(event, 'name')
      const query = getQuery(event);
      const cookies = parseCookies(event);

      return { reqbody: reqbody, query: query, cookies: cookies };
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
  },
};
