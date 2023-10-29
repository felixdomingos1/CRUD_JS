const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const FNome = document.querySelector('#m-nome')
const FFuncao = document.querySelector('#m-funcao')
const FSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')
  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }
  if (edit) {
    FNome.value = itens[index].nome
    FFuncao.value = itens[index].funcao
    FSalario.value = itens[index].salario
    id = index
  } else {
    FNome.value = ''
    FFuncao.value = ''
    FSalario.value = ''
  } 
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (FNome.value == '' || FFuncao.value == '' || FSalario.value == '') {
    return 
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = FNome.value
    itens[id].funcao = FFuncao.value
    itens[id].salario = FSalario.value
  } else {
    itens.push({'nome': FNome.value, 'funcao': FFuncao.value, 'salario': FSalario.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()











 