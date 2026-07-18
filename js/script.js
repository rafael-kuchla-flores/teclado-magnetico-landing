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
