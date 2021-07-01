const url = `${process.env.REACT_APP_BACKEND_URL}/notes`;

export const getNotesByUser = async (token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(`${url}`, requestOptions);
};
