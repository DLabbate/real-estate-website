const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");

exports.listingCreateNew = async (req, res, next) => {
  try {
    // User Data from JWT
    const userData = req.userData;

    let exists = await Listing.findOne({ owner: userData._id });

    // Ensure that a user can have only one listing at a time
    if (exists) {
      console.log("User can only have one listing at a time!");
      return res.status(409).json({
        error: { message: "User can only have one listing at a time!" },
      });
    }

    const listing = new Listing({
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
      owner: userData._id,
    });

    // Create a new listing
    let result = await listing.save();
    console.log("Listing created");

    // We should now update the reference in the User model
    await User.updateOne(
      { _id: userData._id },
      { $set: { publishedListing: result._id } }
    ).exec();

    return res.status(201).json(listing);
  } catch (err) {
    console.log("Error with listing post", err);
    return res.status(500).json({ error: err });
  }
};

exports.listingDelete = async (req, res, next) => {
  try {
    // User Data from JWT
    const userData = req.userData;

    // Find the listing that belongs to the user making the request
    const listing = await Listing.findOne({ owner: userData._id });
    if (!listing) {
      console.log("User does not have a published listing");
      return res
        .status(404)
        .json({ error: { message: "User does not have a published listing" } });
    }
    const listingId = listing._id;
    console.log("Preparing to delete listing: ", listing);

    /*
      When we delete a listing, we must do the following
      1) Delete the listing that belongs to the user making the request
      2) Unset the "publishedListing" field in the user document (of the user that owns the listing)
      3) Delete this listingId from the favoritedListings array of all users
  
      This can be executed with 3 promises done in parallel
      */

    // Promise #1) Delete the listing that belongs to the user making the request
    const deleteListingPromise = Listing.deleteOne({ _id: listingId }).exec();

    // Promise #2) Unset the "publishedListing" ref in the user document (of the user that owns the listing)
    const updateUserListingPromise = User.updateOne(
      { publishedListing: listingId },
      { $unset: { publishedListing: listingId } }
    ).exec();

    // Promise #3) Delete this listingId from the favoritedListings array of all users
    const updateUserFavoritesPromise = User.updateMany(
      { favoriteListings: listingId },
      { $pull: { favoriteListings: listingId } }
    ).exec();

    // We execute all promises at the same time
    await Promise.all([
      deleteListingPromise,
      updateUserListingPromise,
      updateUserFavoritesPromise,
    ]);

    console.log("Listing deleted");
    return res.status(200).json({
      message: "Listing deleted",
    });
  } catch (err) {
    console.log("Error with listing delete", err);
    return res.status(500).json({ error: err });
  }
};

exports.listingSearch = async (req, res, next) => {
  try {
    // Optional filter for listings
    const filter = {};

    // We have several optional query parameters
    if (req.query.ownerId) {
      filter.owner = req.query.ownerId;
    }
    if (req.query.minPrice) {
      filter.price = { $gte: req.query.minPrice };
    }
    if (req.query.maxPrice) {
      filter.price = { ...filter.price, $lte: req.query.maxPrice };
    }

    if (req.query.coordinates && req.query.radius) {
      const coordinatesArray = req.query.coordinates.split(",");
      const maxDistanceInteger = parseInt(req.query.radius);
      const radiusQuery = {
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: coordinatesArray,
            },
            // In metres
            $maxDistance: maxDistanceInteger,
          },
        },
      };

      filter.location = radiusQuery.location;
    }

    // Search for all listings that match the filter
    console.log("Searching for listings with the following filter: ", filter);
    const listings = await Listing.find(filter)
      .populate("owner", "email phoneNumber")
      .exec();
    return res.status(200).json(listings);
  } catch (err) {
    console.log("Error with searching for listings", err);
    return res.status(500).json({ error: err });
  }
};
