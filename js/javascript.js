const menu_btn = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');
const close_btn = document.querySelector('.close-button');
menu_btn.addEventListener('click', () => {
   sidebar.classList.toggle('open'); 
});
close_btn.addEventListener('click', () => {
    sidebar.classList.toggle('open'); 
 });