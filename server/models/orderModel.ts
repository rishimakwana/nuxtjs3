import orderSchema from "./schema/orderSchema";
import getConnection from "../utils/dbConnection";
import order from "./schema/orderSchema";

const connection: any = getConnection();
const Order = connection.model("Order", orderSchema);

export default {
  findById: async (id: string, fields: any = null) => {
    try {
      return await Order.findById(id, fields);
    } catch (error) {
      throw error;
    }
  },
  findOne: async (params: any, fields: any = null) => {
    try {
        return await Order.findOne(params, fields);
    } catch (error) {
        throw error;
    }
  },

  get: async (searchQuery: any, options: any = {}) => {
    try {
      const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;

      const orders = await Order.find(searchQuery)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);

      return orders;
    } catch (error) {
      throw error;
    }
  },

  getPages: async (params: any, fields: any = null) => {
    try {
      let size = params.size ? parseInt(params.size) : 10000;
      let page = params.page ? parseInt(params.page) : 1;
      let query = params.query ? params.query : params;
      return await Order.find(query, fields)
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
      return await Order.countDocuments(params.query ? params.query : params);
    } catch (error) {
      throw error;
    }
  },

  add: async (params: any) => {
    try {
      let newOrder = new Order(params);
      return await newOrder.save();
    } catch (error) {
      throw error;
    }
  },

  update: async (params: any) => {
    try {
      return await Order.updateOne(params.selector, { $set: params.data });
    } catch (error) {
      throw error;
    }
  },

  updateMany: async (params: any) => {
    try {
      return await Order.updateMany(params.selector, { $set: params.data });
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: any) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(id);
      return deletedOrder;
    } catch (error) {
      throw error;
    }
  },
};
