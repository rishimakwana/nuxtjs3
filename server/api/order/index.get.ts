import parseError from "~/server/utils/errorParser";
import Order from "../../models/orderModel";

export default defineEventHandler(async (event: any) => {
    try {
        const query: any = getQuery(event);
        // Extracting dynamic parameters from the event object

        //in the sort it has field name "sort: id" and in the order it has order: asc
        const { q, page, limit, sort, order } = query;

        // Constructing the search query
        let searchQuery: any = {};
        if (q && q.trim() !== '') {
            const dataRegex = { '$regex': new RegExp(q.replace(/\s+/g, "\\s+"), "gi") }
            searchQuery = { "name": dataRegex };
        }

        // Constructing the options for pagination and sorting
        let options:any = {
            page: page || 1,
            limit: limit || 10,
            sort: {}  //[sort?.column]: sort?.direction === 'asc' ? 1 : -1
        };
        if (sort && order) {
            options.sort[sort] = order === 'asc' ? 1 : -1;
        } else {
            // Default sorting if not provided
            options.sort['_id'] = 1; // Assuming 'id' as the default field to sort by
        }

        // Fetch products based on the constructed query
        const result = await Order.get(searchQuery, options);

        // const result = await Order.get();
        const res = JSON.parse(JSON.stringify(result))
        return { statusCode: 200, data: res };
    } catch (error) {
        return parseError(error);
    }
});
