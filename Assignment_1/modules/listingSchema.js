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
const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  access: {
    type: String,
  },
  accommodates: { type: Number },
  address: {
    country: { type: String },
    country_code: { type: String },
    government_area: { type: String },
  },

  amenities: {
    type: [String],
    validate: {
      validator: function (value) {
        return value.length <= 68;
      },
    },
  },
  availability: {
    availability_30: { type: Number },
    availability_365: { type: Number },
    availability_60: { type: Number },
    availability_90: { type: Number },
  },
  bathrooms: {
    type: Number,
  },
  bed_type: { type: String },
  bedrooms: { type: Number },
  beds: { type: Number },
  calendar_last_scraped: { type: Date },
  cancellation_policy: { type: String },
  cleaning_fee: { type: Number },
  description: { type: String },
  extra_people: { type: Number },
  first_review: { type: Date },
  guests_included: { type: Number },
  host: {
    host_about: { type: String },
    host_has_profile_pic: { type: Boolean },
    host_id: { type: String },
    host_identity_verified: { type: Boolean },
    host_is_superhost: { type: Boolean },
    host_listings_count: { type: Number },
    host_location: { type: String },
    host_name: { type: String },
    host_neighbourhood: { type: String },
    host_picture_url: { type: String },
    host_response_rate: { type: Number },
    host_response_time: { type: String },
    host_thumbnail_url: { type: String },
    host_total_listings_count: { type: Number },
    host_url: { type: String },
    host_verifications: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.length <= 11;
        },
      },
    },
  },
  house_rules: { type: String },
  images: {
    medium_url: { type: String },
    picture_url: { type: String },
    thumbnail_url: { type: String },
    xl_picture_url: { type: String },
  },
  interaction: { type: String },
  last_review: { type: Date },
  last_scraped: { type: Date },
  listing_url: { type: String },
  maximum_nights: { type: String },
  minimum_nights: { type: String },
  monthly_price: { type: Number, required: true },
  name: { type: String, required: true },
  neighborhood_overview: { type: String },
  notes: { type: String },
  number_of_reviews: { type: Number },
  price: { type: Number },
  property_type: { type: String },
  review_scores: {
    review_scores_accuracy: { type: Number },
    review_scores_checkin: { type: Number },
    review_scores_cleanliness: { type: Number },
    review_scores_communication: { type: Number },
    review_scores_location: { type: Number },
    review_scores_rating: { type: Number },
    review_scores_value: { type: Number },
  },
  reviews: [
    {
      id: { type: String },
      date: { type: Date },
      listing_id: { type: String },
      reviewer_id: { type: String },
      reviewer_name: { type: String },
      comments: { type: String },
    },
  ],
  reviews_per_month: { type: Number },
  room_type: { type: String },
  security_deposit: { type: Number },
  space: { type: String },
  summary: { type: String },
  transit: { type: String },
  weekly_price: { type: Number },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
