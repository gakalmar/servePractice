const url = 'http://127.0.0.1:3000/users';

const userHTML = user => `<div class="user"><span class="user-id">${user.id}</span> ${user.name}</div>`;
const usersHTML = users => `<div id="users">${users.map(user => userHTML(user)).join("")}</div>`;

const inputHTML = name => `<input placeholder="Write the name here" value="${name}">`;
const buttonHTML = (text, method) => `<button type="submit" data-method="${method}">${text}</button>`;

const formHTML = (user) => `
    <form id="form" data-id="${user.id}">
        ${inputHTML(user.name)}
        ${buttonHTML("Save", "PATCH")}
    </form>
`;

const fetchData = async (url, id, method = "GET", body = {name: ""}) => {
  
    try {
        const response = await fetch(id !== undefined ? `${url}/${id}` : url, method === "GET" ? {method} : {method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)} );
        return await response.json();
    
    } catch (error) {
        console.error(error);
    }
}

const handleInput = ({target}) => {
    target.setAttribute("value", target.value);
}

const handleSubmit = async e => {
    e.preventDefault();
    const method = e.submitter.getAttribute("data-method");
    const id = parseInt(e.target.getAttribute("data-id"));

    const result = await fetchData(url, id, method, method === "PATCH" ? {name: e.target.querySelector("input").value} : {name: ""});
    if (result.state === "DONE") {
        const users = await fetchData(url);
        document.getElementById("users").outerHTML = usersHTML(users);
    }
}

const main = async _ => {
    const root = document.getElementById("root");
    const users = await fetchData(url);
    root.insertAdjacentHTML("beforeend", usersHTML(users));
    root.insertAdjacentHTML("beforeend", formHTML({id: 0, name: ""}));

    window.addEventListener("input", handleInput);
    // window.addEventListener("submit", e => handleSubmit(e));
    window.addEventListener("submit", e => handleSubmit(e));

};

window.addEventListener("load", main);

// window.addEventListener("click", async event => {
//     if (event.target.classList[0] === "user-id"){   // We extract the user ID from the element with the class "user-id"
//         let userId = event.target.textContent;
        
//         const response = await fetch(`${url}/${userId}`);   // Here we will call the API with the user's ID just extracted
//         const data = await response.json();
    
//         const inputElement = document.querySelector('input');     // Get input element, to add the data
//         inputElement.value = data.name;                             // ...and add the data as its value
    
//         document.getElementById('form').dataset.id = userId;        // Update the data-id attribute of the form to match the userId

//     }
// });

window.addEventListener("click", async event => {
    const userTarget = event.target.classList.contains('user') ? event.target : event.target.closest('.user');
    if (userTarget) {
        
        // const response = await fetch(`${url}/${userId}`);            // This was the original
        // const data = await response.json();
        
        // const inputElement = document.querySelector('input');
        // inputElement.value = data.name;
        
        // document.getElementById('form').dataset.id = userId;

        const userId = userTarget.querySelector('.user-id').textContent;       // This was modified in the end
        const userData = await fetchData(url, userId);
        
        document.getElementById("form").outerHTML = formHTML(userData);
    };
});

// What is it supposed to do?