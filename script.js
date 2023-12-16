// Elements
const sections = document.querySelectorAll('.section');
const intro = document.querySelector('.intro');
const game = document.querySelector('.game');
const gameForm = document.querySelector('.game__form');
const userGuess = document.querySelector('#userGuess');
const win = document.querySelector('.win');
const lose = document.querySelector('.lose');
const loseBtns = document.querySelector('.lose__btns');
const loseBtnYes = document.querySelector('.lose__btn--yes');
const loseBtnNo = document.querySelector('.lose__btn--no');
const announcement = document.querySelector('.announcement');

// Variables
const GUESS_WORD = 'game';

class app {
  trialCount = 0;
  newUser = true;

  constructor() {
    this.init();
  }

  showSection = (section) => {
    sections.forEach((sec) => sec.classList.add('hide'));
    document.querySelector('body').classList.add('contain');
    section.classList.remove('hide');
    section.addEventListener('animationend', () => {
      document.querySelector('body').classList.remove('contain');
    });
  };

  setInputInvalid = (invalid = false) => {
    userGuess.setAttribute('aria-invalid', invalid);
  };

  init = () => {
    this.trialCount = 0;
    this.showSection(intro);
    this.monitorIntro();
  };

  startGame = () => {
    this.trialCount = 0;
    this.showSection(game);
    if (this.newUser) this.monitorForm();
  };

  monitorIntro = () => {
    ['click', 'keydown'].forEach((event) =>
      document.addEventListener(event, () => this.startGame(), { once: true })
    );
  };

  monitorForm = () => {
    gameForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const guess = userGuess.value.trim().toLowerCase();

      if (!guess) return;

      this.validateGuess(guess) ? this.manageWin() : this.manageLose();
    });
  };

  validateGuess = (guess) => {
    return guess === GUESS_WORD;
  };

  manageWin = () => {
    this.showSection(win);
    setTimeout(() => {
      this.showSection(announcement);
    }, 2500);
    userGuess.value = '';
  };

  manageLose = () => {
    this.trialCount++;
    this.setInputInvalid(true);
    if (this.trialCount >= 3) {
      this.showSection(lose);
      this.monitorRetry();
      userGuess.value = '';
      this.setInputInvalid();
    }
  };

  monitorRetry = () => {
    loseBtns.addEventListener('click', (e) => {
      const btn = e.target.closest('.lose__btn');

      if (!btn) return;

      this.newUser = false;

      btn === loseBtnYes ? this.startGame() : document.location.reload();
    });
  };
}

new app();
