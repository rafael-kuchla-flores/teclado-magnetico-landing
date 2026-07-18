const btnSaibaMais = document.querySelector('#btn-saiba-mais')

btnSaibaMais.addEventListener('click', () => {
  document.querySelector('#recursos').scrollIntoView({ behavior: 'smooth' })
})
