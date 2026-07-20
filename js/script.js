const btnSaibaMais = document.querySelector('#btn-saiba-mais')

btnSaibaMais.addEventListener('click', () => {
  document.querySelector('#recursos').scrollIntoView({ behavior: 'smooth' })
})

const inputCep = document.querySelector('#cep')
const inputEndereco = document.querySelector('#endereco')

inputCep.addEventListener('blur', async () => {
  const cep = inputCep.value.replace('-', '')

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const dados = await resposta.json()

    if (dados.erro) {
      alert('CEP não encontrado')
      return
    }
    inputEndereco.value = `${dados.logradouro}, ${dados.bairro} - ${dados.localidade}/${dados.uf}`
  } catch (erro) {
    console.error('Deu erro:', erro)
  }
})

const formContato = document.querySelector('#form-contato')
const modal = document.querySelector('#modal-agradecimento')
const modalMensagem = document.querySelector('#modal-mensagem')
const btnFecharModal = document.querySelector('#btn-fechar-modal')

formContato.addEventListener('submit', event => {
  event.preventDefault() // impede o recarregamento padrão do formulário

  // 1. Captura os dados digitados
  const nome = document.querySelector('#nome').value
  const email = document.querySelector('#email').value
  const mensagem = document.querySelector('#mensagem').value
  const endereco = document.querySelector('#endereco').value

  const novoContato = {
    nome,
    email,
    mensagem,
    endereco,
    data: new Date().toISOString() // guarda quando o contato foi enviado
  }

  // 2. Recupera a lista já salva (ou cria uma vazia, se for o primeiro contato)
  const contatosSalvos = JSON.parse(localStorage.getItem('contatos')) || []

  // 3. Adiciona o novo contato na lista e salva de volta
  contatosSalvos.push(novoContato)
  localStorage.setItem('contatos', JSON.stringify(contatosSalvos))

  // 4. Personaliza a mensagem da modal com o nome digitado
  modalMensagem.textContent = `Obrigado, ${nome}! Recebemos sua mensagem e em breve retornaremos.`

  // 5. Exibe a modal
  modal.classList.add('ativo')
})

btnFecharModal.addEventListener('click', () => {
  location.reload() // recarrega a página, limpando o formulário
})
