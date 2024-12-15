const burgerBtn = document.querySelector('.burger-menu');
const sidebarElement = document.querySelector('.sidebar');

burgerBtn.addEventListener('click', e => {
    burgerBtn.classList.toggle('active');
    sidebarElement.classList.toggle('active');
})