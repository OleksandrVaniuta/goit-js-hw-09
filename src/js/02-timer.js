import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
Notiflix.Notify.init({ position: 'right-top' });

const refs = {
  selectedDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timerEl: document.querySelector('.timer'),
  timerTextEl: document.querySelectorAll('span'),
  countEl: document.querySelectorAll('.value'),
};
refs.timerEl.style.display = 'flex';
refs.timerTextEl.forEach(span => {
  span.style.display = 'block';
  span.style.marginRight = '10px';
  span.style.textAlign = 'center';
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
let selectedSaleDate = null;
flatpickr('#datetime-picker', options);
let isActive = true;

refs.selectedDate.addEventListener('input', evt => {
  if (new Date(evt.currentTarget.value).getTime() < new Date()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    isActive = true;
    refs.startBtn.setAttribute('disabled', true);
    return;
  }
  isActive = false;
  refs.startBtn.removeAttribute('disabled');
  selectedSaleDate = new Date(evt.currentTarget.value).getTime();
});

refs.startBtn.addEventListener('click', () => {
  if (isActive) {
    return;
  }
  refs.startBtn.setAttribute('disabled', true);
  isActive = true;
  setInterval(() => {
    let timeToSale = selectedSaleDate - new Date().getTime();
    if (timeToSale < 0) {
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeToSale);
    updateTimer({ days, hours, minutes, seconds });
  }, 1000);
});

function updateTimer({ days, hours, minutes, seconds }) {
  refs.countEl[0].textContent = addLeadingZero(days);
  refs.countEl[1].textContent = addLeadingZero(hours);
  refs.countEl[2].textContent = addLeadingZero(minutes);
  refs.countEl[3].textContent = addLeadingZero(seconds);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
