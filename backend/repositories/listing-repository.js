const Listing = require("../models/listing");

/**
 * Queries a single listing via the ownerId
 */
exports.getListingByOwnerId = async (ownerId) => {
  return await Listing.findOne({ owner: ownerId }).select("-__v").exec();
};

/**
 * Creates a new listing document
 */
exports.createNewListing = async (listing) => {
  return await listing.save();
};

/**
 * Deletes a listing document
 */
exports.deleteListing = async (listingId) => {
  return await Listing.deleteOne({ _id: listingId }).exec();
};

/**
 * Search for listings with optional filtering
 */
exports.searchListings = async (queryParams) => {
  // Optional filter for listings
  const filter = {};

  // We have several optional query parameters
  if (queryParams.ownerId) {
    filter.owner = queryParams.ownerId;
  }
  if (queryParams.minPrice) {
    filter.price = { $gte: queryParams.minPrice };
  }
  if (queryParams.maxPrice) {
    filter.price = { ...filter.price, $lte: queryParams.maxPrice };
  }

  if (queryParams.coordinates && queryParams.radius) {
    const coordinatesArray = queryParams.coordinates.split(",");
    const maxDistanceInteger = parseInt(queryParams.radius);
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
    .populate("owner", "firstName lastName email phoneNumber")
    .select("-__v")
    .exec();
  return listings;
};
