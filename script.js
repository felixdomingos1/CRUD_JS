const modalElement = document.querySelector('.modal-container')
const tableBody = document.querySelector('tbody')
const inputName = document.querySelector('#m-nome')
const inputFunction = document.querySelector('#m-funcao')
const inputSalary = document.querySelector('#m-salario')
const btnSave = document.querySelector('#btnSalvar')

let itemsList
let itemId

function openModal(editMode = false, index = 0) {
  modalElement.classList.add('active')
  modalElement.onclick = event => {
    if (event.target.className.includes('modal-container')) {
      modalElement.classList.remove('active')
    }
  }
  if (editMode) {
    const { nome, funcao, salario } = itemsList[index]
    inputName.value = nome
    inputFunction.value = funcao
    inputSalary.value = salario
    itemId = index
  } else {
    inputName.value = ''
    inputFunction.value = ''
    inputSalary.value = ''
  }
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itemsList.splice(index, 1)
  updateItemList()
  loadItems()
}

function createTableRow(item, index) {
  const tableRow = document.createElement('tr')

  tableRow.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="action">
      <button data-index="${index}" class="edit-button"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="action">
      <button data-index="${index}" class="delete-button"><i class='bx bx-trash'></i></button>
    </td>
  `
  tableBody.appendChild(tableRow)
}

btnSave.onclick = event => {
  if (inputName.value === '' || inputFunction.value === '' || inputSalary.value === '') {
    return 
  }

  event.preventDefault()

  if (itemId !== undefined) {
    itemsList[itemId].nome = inputName.value
    itemsList[itemId].funcao = inputFunction.value
    itemsList[itemId].salario = inputSalary.value
  } else {
    itemsList.push({ 'nome': inputName.value, 'funcao': inputFunction.value, 'salario': inputSalary.value })
  }

  updateItemList()

  modalElement.classList.remove('active')
  loadItems()
  itemId = undefined
}

function loadItems() {
  itemsList = getItemListFromLocalStorage()
  tableBody.innerHTML = ''
  itemsList.forEach((item, index) => {
    createTableRow(item, index)
  })
  addEditAndDeleteListeners()
}

function addEditAndDeleteListeners() {
  const editButtons = document.querySelectorAll('.edit-button')
  const deleteButtons = document.querySelectorAll('.delete-button')

  editButtons.forEach(button => {
    button.addEventListener('click', () => editItem(parseInt(button.dataset.index)))
  })

  deleteButtons.forEach(button => {
    button.addEventListener('click', () => deleteItem(parseInt(button.dataset.index)))
  })
}

const getItemListFromLocalStorage = () => JSON.parse(localStorage.getItem('dbfunc')) || []
const updateItemList = () => localStorage.setItem('dbfunc', JSON.stringify(itemsList))

loadItems()
