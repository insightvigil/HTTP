const listElement = document.querySelector(".posts");

const postTemplate = document.getElementById("single-post");

const form = document.querySelector("#new-post form");

const fetchButton = document.querySelector("#available-posts button");

const postList = document.querySelector("#posts-container");

// Usa el método HTTP especificado (GET, POST, PUT, DELETE, etc.) para enviar una solicitud a la URL con los datos proporcionados
function sendHTTPRequest(method, url, data) {
  // Devuelve la promesa que resulta de hacer la solicitud con fetch
  return fetch(
    url, // Recupera datos del recurso ubicado en esta URL
    {   // Agrega esta configuración (método, cuerpo y cabeceras) a la solicitud
      method: method, // Define el tipo de método HTTP (por ejemplo: 'POST', 'GET', etc.)
      body: JSON.stringify(data), // Convierte los datos de JavaScript a formato JSON para enviarlos en el cuerpo de la solicitud
      headers: {
        "Content-Type": "application/json", // Indica que el contenido enviado es de tipo JSON
      },
    }
  ).then((response) => {
    // Cuando se recibe la respuesta, la convierte desde JSON a un objeto JavaScript
    return response.json();
  });
}



async function fetchPosts() {
  const responseData = await sendHTTPRequest(
    "GET",
    "https://jsonplaceholder.typicode.com/posts"
  );
  console.log(responseData);
  const listOfPosts = responseData;

  for (const post of listOfPosts) {
    const postContainer = document.createElement("article");
    postContainer.id = post.id;
    postContainer.classList.add("post-item");

    const title = document.createElement("h2");
    title.textContent = post.title;

    const body = document.createElement("p");
    body.textContent = post.body;

    const button = document.createElement("button");
    button.textContent = "DELETE Content";

    postContainer.append(title);
    postContainer.append(body);
    postContainer.append(button);

    listElement.append(postContainer);
  }
}

fetchButton.addEventListener("click", fetchPosts);

async function createPost(title,content) {
  const userId = Math.random();
  const post = {
    title:title,
    body:content,
    userId:userId
  };

  sendHTTPRequest("POST","https://jsonplaceholder.typicode.com/posts",post);

}

form.addEventListener("submit",(event) => {
  event.preventDefault();
  const title= event.currentTarget.querySelector("#title").value;
  const content= event.currentTarget.querySelector("#content").value;

  createPost(title,content);

})


postList.addEventListener("click",(event => {
  if (event.target.tagName === "BUTTON"){
    const postId = event.target.closest("article").id;
    sendHTTPRequest("DELETE",`https://jsonplaceholder.typicode.com/posts/${postId}`)
  }
}))