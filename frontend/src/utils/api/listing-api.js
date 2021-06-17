const url = "http://localhost:3000/listings";

export const createListing = async (
  token,
  address,
  price,
  image,
  latitude,
  longitude
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var formdata = new FormData();
  formdata.append("image", image);

  const data = {
    address: address,
    price: price,
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  };

  formdata.append("data", JSON.stringify(data));

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return await fetch(`${url}`, requestOptions);
};

export const deleteListing = async (token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(`${url}`, requestOptions);
};

export const searchListings = async (token, queryParams) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let queryArray = [];

  if (queryParams.minPrice) {
    queryArray.push(`minPrice=${queryParams.minPrice}`);
  }

  if (queryParams.maxPrice) {
    queryArray.push(`maxPrice=${queryParams.maxPrice}`);
  }

  if (queryParams.coordinates) {
    queryArray.push(
      `coordinates=${queryParams.coordinates[0]},${queryParams.coordinates[1]}`
    );
  }

  if (queryParams.radius) {
    queryArray.push(`radius=${queryParams.minPrice}`);
  }

  const queryString = queryArray.join("&");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(`${url}/search?${queryString}`, requestOptions);
};
