const listingService = require("../services/listing-service");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

exports.listingCreateNew = async (req, res, next) => {
  try {
    // User Data from JWT
    const userData = req.userData;

    // Files
    let image = req.file;
    console.log("Image File", req.file);

    let fileName = image.originalname.split(".");
    let fileType = fileName[fileName.length - 1];
    console.log("File Type: ", fileType);

    // Generate a unique Key --> e.g. "9d387198-5504-48da-bd51-09da33c58082.jpg"
    let uniqueKey = `${uuidv4()}.${fileType}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: uniqueKey,
      Body: image.buffer,
    };

    // Listing Data (e.g. address, location, ...)
    let listingData = JSON.parse(req.body.data);
    console.log("Listing Data", listingData);

    let exists = await listingService.getListingByOwnerId(userData._id);

    // Ensure that a user can have only one listing at a time
    if (exists) {
      console.log("User can only have one listing at a time!");
      return res.status(409).json({
        error: { message: "User can only have one listing at a time!" },
      });
    }

    s3.upload(params, (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to upload to AWS S3" });
      }
      console.log("Image Data", data);
    });

    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${uniqueKey}`;

    // Create a new listing
    let result = await listingService.createNewListing(
      userData._id,
      listingData,
      imageUrl
    );
    console.log("Listing created");

    return res.status(201).json(result);
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
    const listing = await listingService.getListingByOwnerId(userData._id);

    if (!listing) {
      console.log("User does not have a published listing");
      return res
        .status(404)
        .json({ error: { message: "User does not have a published listing" } });
    }
    const listingId = listing._id;
    const imageUrl = listing.imageUrl;
    console.log("Preparing to delete listing: ", listing);

    listingService.deleteListing(listingId, imageUrl);

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
    const listings = await listingService.searchListings(req.query);
    return res.status(200).json(listings);
  } catch (err) {
    console.log("Error with searching for listings", err);
    return res.status(500).json({ error: err });
  }
};
