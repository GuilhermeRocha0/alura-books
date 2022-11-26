function cleanErrorMessage() {
  while (errorMessageDiv.lastChild) {
    errorMessageDiv.removeChild(errorMessageDiv.lastChild)
  }
}

function showErrorMessage() {
  cleanErrorMessage()

  const errorMessageElement = document.createElement('p')
  errorMessageElement.classList.add('error-text')
  errorMessageElement.textContent = 'CEP inválido'
  errorMessageDiv.appendChild(errorMessageElement)
}

function cleanAddressForm() {
  addressElements.forEach(element => {
    element.value = ''
    element.removeAttribute('disabled')
  })
}

function showAddressOnForm(addressData) {
  addressElements.forEach(element => {
    if (element.dataset.address !== 'cep') {
      element.disabled = true
      const addressInfoType = element.dataset.address
      element.value = addressData[addressInfoType]
    }
  })
}

async function getAddressData(cep) {
  try {
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const data = await fetch(url)
    const addressData = await data.json()
    if (addressData.erro) {
      throw Error('CEP inválido')
    }

    cleanErrorMessage()
    return addressData
  } catch (e) {
    console.log(e)
  }
}

async function findAddress(cep) {
  cep = cep.replace(onlyCharsRegex, '')

  if (cep !== '' && validateCepRegex.test(cep)) {
    cepInput.value = cep
    const addressData = await getAddressData(cep)

    if (!addressData) {
      showErrorMessage()
      cleanAddressForm()
      return
    }

    showAddressOnForm(addressData)
    return
  }

  cleanAddressForm()
}

const cepInput = document.querySelector('[data-address="cep"]')
cepInput.addEventListener('focusout', () => findAddress(cepInput.value))

const addressElements = document.querySelectorAll('[data-address]')

const errorMessageDiv = document.querySelector('#error')

const validateCepRegex = /^[0-9]{8}$/
const onlyCharsRegex = /\D/g
