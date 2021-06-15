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
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({
  //     firstName: "Domenic",
  //     lastName: "Labbate",
  //     email: "dom91@gmail.com",
  //     password: "dom91",
  //     phoneNumber: "123-123-123",
  //   });

  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch("http://localhost:3000/users/signup", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
};
