import Notiflix from 'notiflix';
Notiflix.Notify.init({ position: 'right-top' });

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', evt => {
  evt.preventDefault();
  let delay = Number(formEl.elements.delay.value);
  let position = 1;
  setInterval(() => {
    if (position > Number(formEl.elements.amount.value)) {
      return;
    }
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    position += 1;
    delay += Number(formEl.elements.step.value);
  }, delay);
});
