// Функция загрузки main без перезагрузки всей страницы
function showContent(link, index) {
  var cont = document.getElementById("content");

  var loading = document.getElementById("loading");

  cont.innerHTML = loading.innerHTML;

  var http = createRequestObject();
  if (http) {
    http.open("get", link);
    http.onreadystatechange = function () {
      if (http.readyState == 4) {
        cont.innerHTML = http.responseText;
        // после загрузки контента запускаем функции обновления меню и формирования подменю бокового меню
        updateMenuButton(index);
        submenuConstruct(index);
      }
    };
    http.send(null);
  } else {
    document.location = link;
  }
}

// Функция создания ajax объекта
function createRequestObject() {
  try {
    return new XMLHttpRequest();
  } catch (e) {
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        return new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        return null;
      }
    }
  }
}

// Функция актуализации класса active у кнопок меню в заголовке и в меню сбоку
function updateMenuButton(index) {
  const menuButton = document.querySelectorAll(".header__menu-link");
  const sideMenuButton = document.querySelectorAll(".side__left-menu-link");
  for (let buttons of menuButton) {
    buttons.classList.remove("active");
  }
  for (let buttons of sideMenuButton) {
    buttons.classList.remove("active");
  }
  menuButton[index].classList.add("active");
  sideMenuButton[index].classList.add("active");
}

// Функция смены слайдов у слайдеров
function showSlides(sliderClass, direction) {
  let slides = document.getElementsByClassName(sliderClass);
  let slideIndex = 0;
  while (
    slides[slideIndex].style.display == "none" &&
    slideIndex <= slides.length
  ) {
    slideIndex++;
  }
  slideIndex = slideIndex + direction;
  if (slideIndex > slides.length - 1) {
    slideIndex = 0;
  }
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  for (let slide of slides) {
    slide.style.display = "none";
  }
  slides[slideIndex].style.display = "block";
}

// Функция сборки в боковом меню подменю активного пункта из заголовков h3
function submenuConstruct(index) {
  // Удаляем существующие подменю в боковом меню
  sideSubMenu = document.getElementsByClassName("side__left-submenu");
  for (let row = 0; row < sideSubMenu.length; row++) {
    sideSubMenu[row].remove();
  }
  // Формируем подменю из заголовков h3, заголовки преобразуем в ссылки, заголовкам и ссылкам сопоставляем, id сгенерированные по шаблону
  let ulNewSubMenu = document.createElement("ul");
  ulNewSubMenu.setAttribute("class", "side__left-submenu");
  const list = document.querySelectorAll("h3");
  for (let row = 0; row < list.length; row++) {
    let a = document.createElement("a");
    a.textContent = list[row].textContent;
    a.setAttribute("class", "side__left-submenu-link");
    a.setAttribute("href", "#h3_link_" + String(row));
    list[row].setAttribute("id", "h3_link_" + String(row));
    let li = document.createElement("li");
    li.setAttribute("class", "side__left-submenu-item");
    li.append(a);
    ulNewSubMenu.append(li);
  }
  // Формируем фрагмент бокового меню из пунктов, находящихся после активного пункта
  let newFragSideMenu = new DocumentFragment();
  // добавляем во фрагмент подменю
  newFragSideMenu.append(ulNewSubMenu);
  // перемещаем во фрагмент пункты меню, расположенные после активного пункта
  const sideMenuItem = document.querySelectorAll(".side__left-menu-item");
  for (let row = index + 1; row < sideMenuItem.length; row++) {
    newFragSideMenu.append(sideMenuItem[row]);
  }
  // Вставляем фрагмент в меню
  document.querySelectorAll(".side__left-menu")[0].append(newFragSideMenu);
}

// Модальное окно регистрации участника мероприятия
function openRegisterModal() {
  const modal = document.getElementsByClassName("modal-registration");
  // modal[0].setAttribute("display", "block");
  modal[0].style.display = "block";
  // modal[0].classList.add("modal-registration_active");
  // closeBtn.addEventListener("click", closeRegisterModal);

  // function closeRegisterModal() {
  //   modal.classList.remove("modal-registration_active");
  //   // удаляем всех слушателей: кнопки закрытия окна после закрытия, и модальной области, тем самым экономим память
  //   closeBtn.removeEventListener("click", closeRegisterModal);
  //   // modal.removeEventListener("click", hideModal);
  // }
  let i;
  i++;
}
