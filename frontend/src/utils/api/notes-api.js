const url = "http://localhost:3000/notes";

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
