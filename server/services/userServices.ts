import User from "../schema/usersSchema";

export default {
  findOne: async (params: any, fields: any = null) => {
    try {
      return await User.findOne(params, fields);
    } catch (error) {
      throw error;
    }
  },
  get: async (params: any, fields: any = null) => {
    try {
      return await User.find(params, fields).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  },

  add: async (params: any) => {
    try {
      let newUser = new User(params);
      return await newUser.save();
    } catch (error) {
      throw error;
    }
  },

  update: async (params: any) => {
    try {
      return await User.updateOne(params.selector, { $set: params.data });
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: any) => {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  },
};
