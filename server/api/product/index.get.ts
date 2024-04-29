import productModel from "~/server/models/productModel";
import parseError from "~/server/utils/errorParser";

export default defineEventHandler(async (event: any) => {
    try {
        const query: any = getQuery(event);

        // Extracting dynamic parameters from the event object
        const { q, page, pageCount, sort } = query;

        // Constructing the search query
        let searchQuery: any = {};
        if (q && q.trim() !== '') {
            const dataRegex = { '$regex': new RegExp(q.replace(/\s+/g, "\\s+"), "gi") }
            searchQuery = { "name": dataRegex };
        }

        // Constructing the options for pagination and sorting
        const options = {
            page: page || 1,
            limit: pageCount || 10,
            sort: { [sort?.column]: sort?.direction === 'asc' ? 1 : -1 }
        };

        // Fetch products based on the constructed query
        const products = await productModel.get(searchQuery, options);
        const res = JSON.parse(JSON.stringify(products))
        // Respond with the found products
        return { statusCode: 200, data: res };
    } catch (error) {
        return parseError(error);
    }
});
