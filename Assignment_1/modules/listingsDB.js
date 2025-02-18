/********************************************************************************
 * WEB422 – Assignment 2
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Diego B Soares Student ID: ____145820239____ Date: __feb - 17 - 2025_______
 * Published URL: _________________https://github.com/dbarbozasoares/WEB422__________________________________________
 ********************************************************************************/
const { MongoClient } = require("mongodb");

let db = null;
let listingsCollection = null;

async function initialize(mongoURI) {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();
    db = client.db(); // Get the database instance
    console.log("MongoDB connected successfully.");
    listingsCollection = db.collection("listingsAndReviews");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

// GET all orders
async function getAllListings({ skip = 0, limit = 10, searchName = "" }) {
  try {
    const query = searchName
      ? { name: { $regex: searchName, $options: "i" } }
      : {}; // regex to match case-insensitive names

    // fetch listings with pagination
    const listings = await listingsCollection
      .find(query)
      .skip(skip) // skip the records based on the page
      .limit(limit)
      .toArray(); // limit the number of records returned

    return listings;
  } catch (err) {
    console.log("Error in fetching all data", err); // it doesnt throw error so it doesnt break
  }
}

// GET order by id
async function getListingById(id) {
  try {
    console.log("Received ID:", id);
    const listing = await listingsCollection.findOne({ _id: id });
    if (listing === null) console.log("Couldnt find id: " + id);
    return listing;
  } catch (err) {
    console.log("Error in fetching listing by id", err);
  }
}

// INSERT new order
async function addListing(order) {
  try {
    const newList = await listingsCollection.insertOne(order);
    return newList; // LOG
  } catch (err) {
    console.log("Error adding new listing" + err);
  }
}

// UPDATE order by id
async function updateListing(id, data) {
  try {
    const result = await listingsCollection.updateOne(
      {
        _id: id,
      },
      { $set: data }
    );
    return result.modifiedCount > 0;
  } catch (err) {
    console.log("Error updating listing" + err);
  }
}

// DELETE order by id
async function deleteListing(id) {
  try {
    const result = await listingsCollection.deleteOne({ _id: id });
    console.log(result);
    return result.deletedCount > 0;
  } catch (err) {
    console.log("Error during delete listing" + err);
  }
}

module.exports = {
  initialize,
  getAllListings,
  getListingById,
  addListing,
  updateListing,
  deleteListing,
};
