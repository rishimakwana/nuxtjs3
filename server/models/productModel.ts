import productSchema from "./schema/productSchema";
import getConnection from "../utils/dbConnection";

const connection: any = getConnection();
const Product = connection.model("Product", productSchema);

export default {
  findById: async (id: string, fields: any = null) => {
    try {
      return await Product.findById(id, fields);
    } catch (error) {
      throw error;
    }
  },
  findOne: async (params: any, fields: any = null) => {
    try {
      return await Product.findOne(params, fields);
    } catch (error) {
      throw error;
    }
  },

  get: async (searchQuery: any, options: any = {}) => {
    try {
      const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;

      const products = await Product.find(searchQuery)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);

      return products;
    } catch (error) {
      throw error;
    }
  },

  getPages: async (params: any, fields: any = null) => {
    try {
      let size = params.size ? parseInt(params.size) : 10000;
      let page = params.page ? parseInt(params.page) : 1;
      let query = params.query ? params.query : params;
      return await Product.find(query, fields)
        .populate("domain")
        .sort(params && params.sort ? params.sort : { createdAt: -1 })
        .limit(size)
        .skip(size * (page - 1));
    } catch (error) {
      throw error;
    }
  },

  getCount: async (params: any) => {
    try {
      return await Product.countDocuments(params.query ? params.query : params);
    } catch (error) {
      throw error;
    }
  },


  add: async (params: any) => {
    try {
      let newProduct = new Product(params);
      return await newProduct.save();
    } catch (error) {
      throw error;
    }
  },

  update: async (params: any) => {
    try {
      return await Product.updateOne(params.selector, { $set: params.data });
    } catch (error) {
      throw error;
    }
  },

  updateMany: async (params: any) => {
    try {
      return await Product.updateMany(params.selector, { $set: params.data });
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: any) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  },
};
