const hamburguerMenu = document.querySelector('.hamburguer')
const navigationMenu = document.querySelector('.navigation')

const menuIsActive = () => {
  hamburguerMenu.classList.toggle('active')
  navigationMenu.classList.toggle('active')
}

hamburguerMenu.addEventListener('click', menuIsActive)

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,

  pagination: {
    el: '.swiper-pagination'
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },

  breakpoints: {
    375: {
      slidesPerView: 2.5,
      spaceBetween: 10
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40
    }
  }
})
