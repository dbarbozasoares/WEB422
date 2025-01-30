const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

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
async function getAllListings() {
  try {
    const listings = await listingsCollection.find().toArray();
    return listings;
  } catch (err) {
    console.log("Error in fetching all data", err);
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
