function getTotalValueOfAvailableBooks(books) {
  const totalValue = books.reduce((accumulator, currentValue) => {
    console.log(`R$${accumulator} + R$${Number(currentValue.preco)}`)
    return accumulator + Number(currentValue.preco)
  }, 0)
  return totalValue
}

async function sortAvailableBooks() {
  const books = await getBooksFromApi()

  const sortedBooks = books.filter(book => {
    return book.quantidade > 0
  })

  const totalValueOfAvailableBooks = getTotalValueOfAvailableBooks(sortedBooks)
  showBooks(sortedBooks)
  showTotalValueAvailableBooksContainer(totalValueOfAvailableBooks)
}

async function sortBooksByPrice() {
  const books = await getBooksFromApi()

  const sortedBooks = books.sort((a, b) => {
    return a.preco - b.preco
  })
  showBooks(sortedBooks)
}

async function filterBooks(sortValue) {
  const books = await getBooksFromApi()

  const sortedBooks = books.filter(book => {
    return book.categoria === sortValue
  })
  showBooks(sortedBooks)
}

function applyDiscountOnBooks(books) {
  const discountPercentage = 0.3
  booksWithDiscountApplied = books.map(book => {
    return {
      ...book,
      preco: (book.preco - book.preco * discountPercentage).toFixed(2)
    }
  })
  return booksWithDiscountApplied
}

async function getBooksFromApi() {
  const req = await fetch(urlApi)
  const books = await req.json()

  const booksWithDiscountApplied = applyDiscountOnBooks(books)
  showBooks(booksWithDiscountApplied)
  return booksWithDiscountApplied
}

const urlApi = 'https://guilhermeonrails.github.io/casadocodigo/livros.json'
const booksContainer = document.querySelector('#books')

const filterButtons = document.querySelectorAll('[data-filter]')
filterButtons.forEach(button => {
  button.addEventListener('click', () => filterBooks(button.value))
})

const sortAvailableButton = document.querySelector('[data-available]')
sortAvailableButton.addEventListener('click', sortAvailableBooks)

const sortByPriceButton = document.querySelector('[data-price]')
sortByPriceButton.addEventListener('click', sortBooksByPrice)

const totalValueAvailableBooksContainer = document.querySelector(
  '#total-value-available-books'
)

getBooksFromApi()
