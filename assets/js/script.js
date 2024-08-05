window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 130);
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu");
    const closeButton = document.querySelector(".colse");
    const openMenu = document.querySelector(".open-menu");
  
    menuButton.addEventListener("click", function () {
      openMenu.classList.add("active");
      closeButton.style.display = "block";
      menuButton.style.display = "none";
    });
  
    closeButton.addEventListener("click", function () {
      openMenu.classList.remove("active");
      closeButton.style.display = "none";
      menuButton.style.display = "block";
    });
  });