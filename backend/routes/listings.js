const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const listingController = require("../controllers/listing-controller");

/**
 * Creating a new listing. Note a user can only have 1 active listing at a time.
 */
router.post("/", authentication, listingController.listingCreateNew);

/**
 * Deleting a user's listing.
 */
router.delete("/", authentication, listingController.listingDelete);

/**
 * Search for listings
 */
router.get("/search", listingController.listingSearch);

module.exports = router;
