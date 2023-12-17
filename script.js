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
const failSound = new Audio('./sounds/fail.mp3');
const winSound = new Audio('./sounds/victory.mp3');

// Helpers
const playSound = (sound) => {
  sound.play();
};

const showSection = (section) => {
  sections.forEach((sec) => sec.classList.add('hide'));
  document.querySelector('body').classList.add('contain');
  section.classList.remove('hide');
  section.addEventListener('animationend', () => {
    document.querySelector('body').classList.remove('contain');
  });
};

const setInputInvalid = (invalid = false) => {
  userGuess.setAttribute('aria-invalid', invalid);
};

const clearError = () => {
  userGuess.addEventListener('input', () => setInputInvalid());
};

class app {
  trialCount = 0;
  newUser = true;

  constructor() {
    this.init();
  }

  init = () => {
    this.trialCount = 0;
    showSection(intro);
    this.monitorIntro();
    this.startGame();
    clearError();
  };

  startGame = () => {
    this.trialCount = 0;
    if (!this.newUser) showSection(game);
    if (this.newUser) this.monitorForm();
  };

  monitorIntro = () => {
    ['click', 'keydown'].forEach((event) =>
      document.addEventListener(event, () => showSection(game), { once: true })
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
    playSound(winSound);

    showSection(win);

    setTimeout(() => {
      showSection(announcement);
    }, 2500);
    userGuess.value = '';
  };

  manageLose = () => {
    this.trialCount++;

    setInputInvalid(true);

    if (this.trialCount >= 3) {
      playSound(failSound);
      showSection(lose);
      this.monitorRetry();
      userGuess.value = '';
      setInputInvalid();
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
