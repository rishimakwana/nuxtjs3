import orderSchema from "./schema/orderSchema";
import getConnection from "../utils/dbConnection";

const connection: any = getConnection();
const Order = connection.model("Order", orderSchema);

export default {
  findOne: async (params: any, fields: any = null) => {
    try {
        return await Order.findOne(params, fields);
    } catch (error) {
        console.error("Error in findOne query:", error);
        throw error;
    }
  },

  get: async () => {
    try {
      return await Order.find();
    } catch (error) {
      console.error("Error in get query:", error);
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
      console.error("Error in getPages query:", error);
      throw error;
    }
  },

  getCount: async (params: any) => {
    try {
      return await Order.countDocuments(params.query ? params.query : params);
    } catch (error) {
      console.error("Error in getCount query:", error);
      throw error;
    }
  },

  add: async (params: any) => {
    try {
      let newOrder = new Order(params);
      return await newOrder.save();
    } catch (error) {
      console.error("Error in add query:", error);
      throw error;
    }
  },

  update: async (params: any) => {
    try {
      return await Order.updateOne(params.selector, { $set: params.data });
    } catch (error) {
      console.error("Error in update query:", error);
      throw error;
    }
  },

  updateMany: async (params: any) => {
    try {
      return await Order.updateMany(params.selector, { $set: params.data });
    } catch (error) {
      console.error("Error in updateMany query:", error);
      throw error;
    }
  },

  delete: async (id: any) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(id);
      return deletedOrder;
    } catch (error) {
      console.error("Error in delete query:", error);
      throw error;
    }
  },
};
