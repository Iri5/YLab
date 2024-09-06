const rightUser = {
  login: "right",
  password: "right",
};
let currentUser = {
  login: "",
  password: "",
};

document.addEventListener('DOMContentLoaded', ()=>{
    alert("Для прохождения авторизации необходимо ввести right/right")
})
function serializeForm(formNode) {
  //для работы без сервера
  currentUser.login = formNode.auth_login.value;
  currentUser.password = formNode.auth_pass.value;
  //

  let dataToServer = {};
  dataToServer.login = formNode.auth_login.value;
  dataToServer.pass = formNode.auth_pass.value;
  dataToServer = JSON.stringify(dataToServer);
  return dataToServer;
}

async function sendData(data) {
  //для работы с сервером
  /*return await fetch("/auth", {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: data,
  });*/

  //для работы без сервера
  if (currentUser.login == rightUser.login && currentUser.password == rightUser.password) {
    return { status: 200, data: "Авторизация прошла успешно" };
  } else {
    return { status: 403, data: "Авторизация провалена" };
  }
}

function onError(err) {
  alert(err.data);
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const data = serializeForm(event.target);
  const response = await sendData(data);
  if (response.status === 403) {
    onError(response);
  } else if (response.status === 200) {
    //let response = await response.json();
    alert(response.data);
  }
}
const form = document.querySelector(".auth__form");
form.addEventListener("submit", handleFormSubmit);
