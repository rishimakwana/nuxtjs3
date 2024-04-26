import User from "~/server/models/userModel.js";
export default {
    allowAccess: async (cookie: any, key: string | string[], callback?: (arg: boolean) => {}) => {
        let allowAccess = true;
        // key= typeof key=="string" ? key : 
        let adminKey = "";
        let newKey = "";
        if (typeof key == "object" && key && key.length > 1) {
            adminKey = key[1];
            newKey = key[0];
        } else if (typeof key === "string") {
            newKey = key;
        }
        const cUser = cookie.user ? JSON.parse(cookie.user) : "";
        let [user]: any = "";
        if (cUser) {
            [user] = await User.get({ _id: cUser.id })
            if (user) {
                user = user.toJSON()
            }
        }
        // if (cookie.user && JSON.parse(cookie.user) && JSON.parse(cookie.user).formPermissions && !JSON.parse(cookie.user).formPermissions[newKey]) {
        if (user && user.formPermissions && !user.formPermissions[newKey]) {
            allowAccess = false;
        }

        // Check array type permission passed for viewAllProducts and viewAllorders.
        if (user && user.subuserRole == "Admin" && adminKey) {
            if (user && user.formPermissions && user.formPermissions[adminKey]) {
                allowAccess = true;
            }
        }
        if (callback && typeof callback == "function") {
            callback(allowAccess);
        } else {
            return allowAccess;
        }

    },
};
