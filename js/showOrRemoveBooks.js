function removeTotalValueAvailableBooksElement() {
  while (totalValueAvailableBooksContainer.lastChild) {
    totalValueAvailableBooksContainer.removeChild(
      totalValueAvailableBooksContainer.lastChild
    )
  }
}

function showTotalValueAvailableBooksContainer(totalValueOfAvailableBooks) {
  const totalValueDiv = document.createElement('div')
  totalValueDiv.classList.add('books-available')

  const totalValueParagraph = document.createElement('p')
  totalValueParagraph.textContent = 'Todos os livros disponíveis por R$'

  const totalValueSpan = document.createElement('span')
  totalValueSpan.textContent = totalValueOfAvailableBooks

  totalValueAvailableBooksContainer.appendChild(totalValueDiv)
  totalValueDiv.appendChild(totalValueParagraph)
  totalValueParagraph.appendChild(totalValueSpan)
}

function removeAllBooks() {
  while (booksContainer.lastChild) {
    booksContainer.removeChild(booksContainer.lastChild)
  }
}

function showBooks(books) {
  removeTotalValueAvailableBooksElement()
  removeAllBooks()

  books.map(book => {
    const bookDiv = document.createElement('div')
    bookDiv.classList.add('book')

    const bookImg = document.createElement('img')
    bookImg.classList.add('book-img')
    if (book.quantidade <= 0) bookImg.classList.add('unavailable')
    bookImg.src = book.imagem
    bookImg.alt = book.alt

    const bookTitle = document.createElement('h2')
    bookTitle.classList.add('book-title')
    bookTitle.textContent = book.titulo

    const bookDescription = document.createElement('p')
    bookDescription.classList.add('book-description')
    bookDescription.textContent = book.autor

    const bookPrice = document.createElement('p')
    bookPrice.classList.add('book-price')
    bookPrice.textContent = `R$${book.preco}`

    const bookTags = document.createElement('div')
    bookTags.classList.add('tags')

    const bookTag = document.createElement('span')
    bookTag.classList.add('tag')
    bookTag.textContent = book.categoria

    booksContainer.appendChild(bookDiv)
    bookDiv.appendChild(bookImg)
    bookDiv.appendChild(bookTitle)
    bookDiv.appendChild(bookDescription)
    bookDiv.appendChild(bookPrice)
    bookDiv.appendChild(bookTags)
    bookTags.appendChild(bookTag)
  })
}
