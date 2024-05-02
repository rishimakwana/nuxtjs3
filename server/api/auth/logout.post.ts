import userModal from "~/server/models/userModel.js";

export default defineEventHandler(async (event: any) => {
  try {
    // Read the body of the request
    const body = await readBody(event);
    // Query the Users model (assuming this is a MongoDB model)
    // Log the event and return the result
    return { statusCode: 200, body: JSON.stringify({ body }) };
  } catch (error) {
    return { statusCode: 500, body: "Internal Server Error" };
  }
});
