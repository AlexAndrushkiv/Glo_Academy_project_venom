
 const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".nav-menu");
const menuButtonClose = document.querySelector(".menu-button-close");
menuButton.addEventListener("click", () => {
  menu.classList.add("is-open");
  menuButtonClose.classList.add("is-active");
});
menuButtonClose.addEventListener("click", () => {
  menu.classList.remove("is-open");
  menuButtonClose.classList.remove("is-active");
});


/*Всплывающая форма */

const hideForm = document.querySelector('.hide-form');
const orderTicket = document.querySelector('.order-ticket');
const orderTrigger = document.querySelector('.order-trigger');
const orderTicketForm = document.querySelector('.order-ticket__form');

const orderTicketFormWrapper = document.querySelector('.order-ticket__form-wrapper');
const orderTicketPreloaderWrapper = document.querySelector('.order-ticket__preloader-wrapper');
const orderTicketThanksWrapper = document.querySelector('.order-ticket__thanks-wrapper');
const orderTicketThanksame = document.querySelector('.order-ticket__thanks-name');

//функция отправки данных на сервер
const sendData = (data, callBack, callBefore) => {

  if (callBefore) callBefore();//проверка, если есть то вызвать такую ф-ю

  //фейковый сервер - jsonplaceholder(адрес куда отправляюдся данные формы)
  fetch('http://localhost:3000/api', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data), //переводит данные в json формат
  })
    .then((response) => response.json())    //ответ от сервера в формате json
    .then(callBack);
}

const showPreloader = () => {
  orderTicketFormWrapper.style.display = 'none';
  orderTicketPreloaderWrapper.style.display = 'block';
}

//ф-я выводит сообщение про отправку данных юзера на сервер
const showThankYou = (data) => {
  orderTicketFormWrapper.style.display = 'none';
  orderTicketPreloaderWrapper.style.display = 'none';
  orderTicketThanksWrapper.style.display = 'block';
  orderTicketThanksame.textContent = data.name;
}

//форма выезжает на фиксированную высоту + с задержкой 1 сек.
setTimeout(() => {
  const heigtForm = orderTicket.offsetHeight;
  hideForm.style.bottom = -heigtForm + 'px';
}, 1000)
//создание события *клик*
orderTrigger.addEventListener('click', () => {
  hideForm.classList.toggle('hide-form-active')
});

//ф-я проверяет внесены ли данные в инпуты и если да -> меняет 
//класс для label(plaсeholder не опускается после внесения данных в инпут)
orderTicketForm.addEventListener('change', (event) => {
  const target = event.target;
  const label = target.labels[0];
  if (label && target.value) {
    label.classList.add('order-ticket__label-focus')
  } else {
    label.classList.remove('order-ticket__label-focus')

  }
})

//отправка формы
orderTicketForm.addEventListener('submit', (event) => {
  event.preventDefault(); //метод блокировки средств отправки формы c с данными юзера браузером

  const formData = new FormData(orderTicketForm);

  const data = {};

  for (const [name, value] of formData) {
    data[name] = value;
  }

  sendData(data, showThankYou, showPreloader);

})