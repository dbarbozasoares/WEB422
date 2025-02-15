/********************************************************************************
 * WEB422 – Assignment 1
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Diego B Soares Student ID: ____145820239____ Date: __feb - 03 - 2025_______
 * Published URL: _________________https://github.com/dbarbozasoares/WEB422__________________________________________
 ********************************************************************************/
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const db = require("./modules/listingsDB.js");
const Listing = require("./modules/listingSchema");

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

db.initialize(process.env.MONGODB_CONN_STRING)
  .then(() => {
    app.get("/", (req, res) => {
      const pathFile = path.join(__dirname, "views", "index.html");
      res.sendFile(pathFile);
    });

    // RETRIEVE all listings
    app.get("/api/listings", async (req, res) => {
      try {
        // Get page and limit from query parameters
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

        // Adjust pagination logic depending on your database or query logic
        const skip = (page - 1) * limit;
        const listings = await getAllListings({ skip, limit });
        res.status(200).json(listings);
      } catch (err) {
        console.log("Error fetching listings: " + err);
        res.status(500).send("Error fetching listings");
      }
    });

    // FIND listing by ID from URL
    app.get("/api/listings/:id", (req, res) => {
      const { id } = req.params; // Get the ID from the URL params

      db.getListingById(id)
        .then((order) => {
          res.status(200).json(order);
        })
        .catch((err) => {
          console.error("Error fetching order by ID:", err);
          res.status(500).json({ error: "Unable to fetch listings" });
        });
    });

    // DELETE one listing by ID from URL
    app.delete("/api/listings/:id", (req, res) => {
      const { id } = req.params;
      db.deleteListing(id)
        .then((result) => {
          console.log(`Delete successful ` + result);
          res.status(200).send(`<h1>Listing (${id}) deleted  ${result}</h1>`);
        })
        .catch((err) => {
          res.status(500).json({ error: `Failed to delete listing ${id}` });
        });
    });

    // POST new data into database from body data
    app.post("/api/listings", (req, res) => {
      const data = req.body;
      if (!data) {
        return res.status(400).json({ error: "Missing listing data" });
      }
      const newListing = new Listing(data);
      db.addListing(newListing)
        .then(() => {
          res.status(200).send(`<h1>Listing inserted success`);
        })
        .catch((err) => {
          res
            .status(500)
            .json({ error: `Failed to insert new listing ${data}` });
        });
    });

    // UPDATE a listing by id from URL and parameters from body
    app.put("/api/listings/:id", (req, res) => {
      const { id } = req.params;
      const updatedData = req.body;
      console.log(updatedData);
      db.updateListing(id, updatedData).then((result) => {
        if (result > 0) {
          res.status(200).json({
            message: `Listing ${id} updated successful = ${updatedData._id}`,
          });
        } else {
          res.status(500).json({
            message: `Listing ${id} NOT updated successful = ${updatedData}`,
          });
        }
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
