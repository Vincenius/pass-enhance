import 'crypto-js'; // improves native Math.random(), which affects random-word-slugs
import sha256 from 'crypto-js/sha256';
import { generateSlug } from 'random-word-slugs';

const passphraseStorage = browser.storage.sync.get('passphrase')
const passLengthStorage = browser.storage.sync.get('passLength')
let passphrase
let passLength

// TODO move get as promise to some utils.js ??
passphraseStorage.then((res) => {
  if (res && res.passphrase) {
    passphrase = res.passphrase
  } else {
      const newPassphrase = generateSlug();
      browser.storage.sync.set({ passphrase: newPassphrase })
      passphrase = newPassphrase
  }
});

passLengthStorage.then((res) => {
  if (res && res.passLength) {
    passLength = parseInt(res.passLength)
  } else {
    const newPassLength = 12;

    browser.storage.sync.set({ passLength: newPassLength })
    passLength = newPassLength
  }
});

const SPECIAL_CHARS = ['!', '@', '#', '$', '%' ,'&' , '*']
const CHARS = 'abcdefghijklmnopqrstuvwxyz'

const urlParts = location.hostname.split('.');
urlParts.shift();
const url = urlParts.join('.');

const inputs = document.querySelectorAll('input[type="password"]')

const shuffle = (a, ciphertext) => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = ciphertext.charCodeAt(i) % passLength;
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const encryptInput = e => {
  const input = e.target.parentNode.previousSibling

  const ciphertext = sha256(`${input.value}_${passphrase}_${url}`).toString()
  let passwordArray = []
  let password = ''
  let i = 0

  while (passwordArray.length < passLength) {
    const randomDigit = ciphertext.charCodeAt(i) % 10;
    i++

    const charIndex = ciphertext.charCodeAt(i) % CHARS.length;
    i++

    const specialCharIndex = ciphertext.charCodeAt(i) % SPECIAL_CHARS.length;
    i++

    const charUpperIndex = ciphertext.charCodeAt(i) % CHARS.length;
    i++

    passwordArray.push(randomDigit)
    passwordArray.push(CHARS[charIndex])
    passwordArray.push(SPECIAL_CHARS[specialCharIndex])
    passwordArray.push(CHARS[charUpperIndex].toUpperCase())
  }

  password = shuffle(passwordArray.slice(0, passLength), ciphertext).join('')

  input.value = password
}

const calcIconPosition = (icon, input) => {
  const style = input.currentStyle || window.getComputedStyle(input);
  const top = `calc(-${input.offsetHeight}px - ${style.marginBottom})`
  const left = `calc(${input.offsetWidth}px + ${style.marginLeft})`
  icon.style.top = top;
  icon.style.left = left;
}

// TODO rerender on resize
for (let i of inputs) {
  const container = document.createElement('div');
  container.classList.add('pass-enhance-container');

  const icon = document.createElement('div')
  icon.classList.add('pass-enhance')

  calcIconPosition(icon, i)
  window.onresize = function(event) {
    calcIconPosition(icon, i)
  }

  icon.addEventListener('click', encryptInput)
  container.appendChild(icon)
  i.after(container)
}
