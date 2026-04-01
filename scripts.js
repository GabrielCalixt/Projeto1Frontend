/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/produtos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.produtos.forEach(item => insertList(item.nome, item.quantidade, item.valor))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
// getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputProduct, inputQuantity, inputPrice) => {
  const formData = new FormData();
  formData.append('nome', inputProduct);
  formData.append('quantidade', inputQuantity);
  formData.append('valor', inputPrice);

  let url = 'http://127.0.0.1:5000/produto';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close-button";
  span.appendChild(txt);
  parent.appendChild(span);
  span.onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteProperty(nomeItem)
        alert("Removido!")
      }
    }
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close-button");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/produto?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

const deleteProperty = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/property?title=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputProduct = document.getElementById("newInput").value;
  let inputQuantity = document.getElementById("newQuantity").value;
  let inputPrice = document.getElementById("newPrice").value;

  if (inputProduct === '') {
    alert("Escreva o nome de um item!");
  } else if (isNaN(inputQuantity) || isNaN(inputPrice)) {
    alert("Quantidade e valor precisam ser números!");
  } else {
    insertList(inputProduct, inputQuantity, inputPrice)
    postItem(inputProduct, inputQuantity, inputPrice)
    alert("Item adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nameProduct, quantity, price) => {
  var item = [nameProduct, quantity, price]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newInput").value = "";
  document.getElementById("newQuantity").value = "";
  document.getElementById("newPrice").value = "";

  removeElement()
}

const property_container = document.getElementById("property_container");
const owner_container = document.getElementById("owner_container");

function openPropertyModal() {
  property_container.classList.add('show');
}

function closePropertyModal() {
  property_container.classList.remove('show');
}

function openOwnerModal() {
  owner_container.classList.add('show');
}

function closeOwnerModal() {
  owner_container.classList.remove('show');
}

function newOwner() {
  const name = document.getElementById("o_name").value;
  const email = document.getElementById("o_email").value;
  const phone = document.getElementById("o_phone").value;

  const allFields = [name, email, phone];
  console.log(name, email, phone);

  if (allFields.some(field => field === '' || field === null || field === undefined)) {
    alert("Preencha todos os campos!");
    return;
  }

  postOwner(name, email, phone);
  alert("Proprietário adicionado!");
  closeOwnerModal();
  clearForm("owner_form");
}

function postOwner(name, email, phone) {
  let formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('phone', phone);
  fetch('http://127.0.0.1:5000/owner', {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

let owners = [];
function fillOwners(responseData) {
  owners = responseData.map(owner => ({ id: owner.id, name: owner.name }));

  let ownersList = document.getElementById("owners");

  responseData.forEach(owner => {
    let ownerCard = document.createElement("div");
    ownerCard.className = "owner-card";
    let ownerName = document.createElement("div");
    ownerName.className = "owner-name";
    ownerName.innerHTML = owner.name;
    let ownerEmail = document.createElement("div");
    ownerEmail.className = "owner-attributes";
    ownerEmail.innerHTML = owner.email;
    let ownerPhone = document.createElement("div");
    ownerPhone.className = "owner-attributes";
    ownerPhone.innerHTML = owner.phone;
    ownerCard.appendChild(ownerName);
    ownerCard.appendChild(ownerEmail);
    ownerCard.appendChild(ownerPhone);
    ownersList.appendChild(ownerCard);
    addOwnerToSelect(owner);
  });
}

function addOwnerToSelect(owner) {
  let select = document.getElementById("p_owner");
  let option = document.createElement("option");
  option.value = owner.id;
  option.textContent = owner.name;
  select.appendChild(option);
}

const getOwners = async () => {
  let url = 'http://127.0.0.1:5000/owner';
  fetch(url, {
    method: 'get',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      fillOwners(data.owners);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function newProperty() {
  const title = document.getElementById("p_title").value;
  const address = document.getElementById("p_addr").value;
  const value = document.getElementById("p_value").value;
  const rooms = document.getElementById("p_beds").value;
  const bathrooms = document.getElementById("p_baths").value;
  const ownerId = document.getElementById("p_owner").value;
  const type = document.getElementById("p_type").value;
  const status = document.getElementById("p_status").value;
  const area = document.getElementById("p_area").value;

  const allFields = [title, address, value, rooms, bathrooms, ownerId, type, status, area];
  console.log(title, address, value, rooms, bathrooms, ownerId, type, status, area);

  if (allFields.some(field => field === '' || field === null || field === undefined)) {
    alert("Preencha todos os campos!");
    return;
  }

  postProperty(title, address, value, rooms, bathrooms, ownerId, type, status, area);
  alert("Propriedade adicionada!");
  closePropertyModal();
  clearForm("property_form");
}

function postProperty(title, address, value, rooms, bathrooms, ownerId, type, status, area) {
  let formData = new FormData();
  formData.append('title', title);
  formData.append('address', address);
  formData.append('value', value);
  formData.append('rooms', rooms);
  formData.append('bathrooms', bathrooms);
  formData.append('owner_id', ownerId);
  formData.append('type', type);
  formData.append('status', status);
  formData.append('area', area);
  fetch('http://127.0.0.1:5000/property', {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

const getProperties = async () => {
  let url = 'http://127.0.0.1:5000/property';
  fetch(url, {
    method: 'get',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      fillProperties(data.properties);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function fillProperties(responseData) {
  let tableBody = document.querySelector("#properties_table_body");
  const columns = ["title", "address", "type", "status", "value", "area", "rooms", "bathrooms", "owner_name"];
  const numberOfRows = responseData.length;
  const dictType = {
    "apartment": "Apartamento",
    "house": "Casa",
    "land": "Terreno"
  }
  const dictStatus = {
    "rented": "Alugado",
    "sale": "À venda",
    "available": "Disponível"
  }

  responseData.forEach(property => {
    let row = tableBody.insertRow();
    for (let i = 0; i < columns.length; i++) {
      // add delete button
      if (i === columns.length - 1) {
        insertButton(row.insertCell(-1));
      }
      let cell = row.insertCell(i);
      if (columns[i] === "owner_name") {
        cell.innerHTML = getOwnerName(property.owner_id);
      } else if (columns[i] === "type") {
        cell.innerHTML = dictType[property[columns[i]]] || property[columns[i]];
      } else if (columns[i] === "status") {
        cell.innerHTML = dictStatus[property[columns[i]]] || property[columns[i]];
      } else {
        cell.innerHTML = property[columns[i]];
      }
    }
  })
}

function getOwnerName(ownerId) {
  if (owners.length === 0) return 'N/A';
  const owner = owners.find(o => o.id === ownerId);
  return owner ? owner.name : 'N/A';
}

function render() {
  getOwners();
  getProperties();
}

function clearForm(formId) {
  document.getElementById(formId).reset()
}

render();