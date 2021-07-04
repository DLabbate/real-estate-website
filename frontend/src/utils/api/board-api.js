const url = `${process.env.REACT_APP_BACKEND_URL}/boards`;
console.log(url);

export const getBoard = async (token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(`${url}`, requestOptions);
};

export const editBoard = async (token, newBoard) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(newBoard);

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return await fetch(`${url}`, requestOptions);
};
