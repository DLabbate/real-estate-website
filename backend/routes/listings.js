const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const listingController = require("../controllers/listing-controller");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * Creating a new listing. Note a user can only have 1 active listing at a time.
 */
router.post(
  "/",
  authentication,
  upload.single("image"),
  listingController.listingCreateNew
);

router.delete("/", authentication, listingController.listingDelete);

router.get("/search", listingController.listingSearch);

module.exports = router;
