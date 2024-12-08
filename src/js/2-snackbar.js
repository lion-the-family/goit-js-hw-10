// Подключаем iziToast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

// Cобытия отправки формы
form.addEventListener('submit', event => {
  event.preventDefault();

  // Получаем  из формы
  const delayInput = form.elements['delay'].value;
  const state = form.elements['state'].value;

  // Преобразуем задержку в число
  const delay = Number(delayInput);

  // Создаём промис
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // Обрабатываем результат выполнения промиса
  promise
    .then(delay => {
      iziToast.success({
        title: '✅ Success',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌ Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
});
