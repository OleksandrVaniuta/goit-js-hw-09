function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

const colorChanger = {
  isActive: false,
  changeCl: null,

  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.changeClr = setInterval(() => {
      refs.startBtn.parentNode.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);
  },
  stop() {
    clearInterval(this.changeClr);
    this.isActive = false;
  },
};

refs.startBtn.addEventListener('click', () => {
  colorChanger.start();
});

refs.stopBtn.addEventListener('click', () => {
  colorChanger.stop();
});
