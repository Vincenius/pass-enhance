import sha256 from 'crypto-js/sha256';
import { generateSlug } from 'random-word-slugs';
import { LS_PASSLENGTH, LS_PASSPHRASE } from './constants'

console.log('YO')

let passphrase = localStorage.getItem(LS_PASSPHRASE);
let passLength = localStorage.getItem(LS_PASSLENGTH);

if (!passLength) {
  passLength = 12;
  localStorage.setItem(LS_PASSLENGTH, passLength)
} else {
  passLength = parseInt(passLength)
}

if (!passphrase) {
  passphrase = generateSlug();
  localStorage.setItem(LS_PASSPHRASE, passphrase);
}

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

const encryptInput = input => {
  const ciphertext = sha256(`${input.value}_${passphrase}_${url}`).toString()
  let passwordArray = []
  let password = ''
  let i = 0

  while (passwordArray.length !== passLength) {
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

  password = shuffle(passwordArray, ciphertext).join('')
  input.value = password
}

const mouseIsOnIcon = e => {
  const positionInfo = e.target.getBoundingClientRect();
  const mouseX = e.pageX - e.target.offsetLeft;
  const mouseY = e.pageY - e.target.offsetTop;

  const iconTop = (positionInfo.height / 2) - 10;
  const iconBottom = (positionInfo.height / 2) + 10;
  const iconLeft = (positionInfo.width * 0.95) - 12;
  const iconRight = (positionInfo.width * 0.95) + 4;

  return (mouseX >= iconLeft &&
    mouseX <= iconRight &&
    mouseY >= iconTop &&
    mouseY <= iconBottom)
}

const trackInputMousePos = e => {
  if (mouseIsOnIcon(e)) {
    e.target.classList.add('pass-enhance-hover');
  } else {
    e.target.classList.remove('pass-enhance-hover');
  }
}

const onInputMouseClick = e => {
  if (mouseIsOnIcon(e)) {
    e.preventDefault()
    encryptInput(e.target)
  }
}

for (let i of inputs) {
  i.classList.add('pass-enhance');
  i.addEventListener('mousemove', trackInputMousePos)
  i.addEventListener('click', onInputMouseClick)
}
