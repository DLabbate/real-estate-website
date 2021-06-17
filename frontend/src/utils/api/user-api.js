const url = "http://localhost:3000/users";

export const signup = async (values) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(values);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return await fetch(`${url}/signup`, requestOptions);
};

export const login = async (values) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(values);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return await fetch(`${url}/login`, requestOptions);
};

export const addFavorite = async (token, listingId) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(`${url}/favorites/${listingId}`, requestOptions);
};

export const removeFavorite = async (token, listingId) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(`${url}/favorites/${listingId}`, requestOptions);
};
