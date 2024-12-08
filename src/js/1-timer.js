// Імпортуємо бібліотеки
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//  DOM
const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let timerInterval = null;
let userSelectedDate = null;

// Налаштування Flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    // Проверка дата
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Invalid Date',
        message: 'Please choose a date in the future.',
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

//Иницилизация Flatpickr
flatpickr(dateTimePicker, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

// Запуска таймер
function startTimer() {
  if (!userSelectedDate) return;

  startButton.disabled = true;
  dateTimePicker.disabled = true;

  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const remainingTime = userSelectedDate - currentTime;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      updateTimer(0);
      dateTimePicker.disabled = false;
      iziToast.success({
        title: 'Timer Finished',
        message: 'The countdown has ended.',
      });
      return;
    }

    updateTimer(remainingTime);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startButton.addEventListener('click', startTimer);

startButton.disabled = true;
