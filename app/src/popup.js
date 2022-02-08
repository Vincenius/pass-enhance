import { generateSlug } from 'random-word-slugs';
import { LS_PASSLENGTH, LS_PASSPHRASE } from './constants'

const passphraseInput = document.querySelector('#passphrase')
const passlengthInput = document.querySelector('#passlength')
const passlengthRangeInput = document.querySelector('#passlength-range')

let passphrase = localStorage.getItem(LS_PASSPHRASE);
let passLength = localStorage.getItem(LS_PASSLENGTH);

if (!passphrase) {
  passphrase = generateSlug();
  passLength = 12;
  localStorage.setItem(LS_PASSPHRASE, passphrase);
  localStorage.setItem(LS_PASSLENGTH, passLength)
}

passphraseInput.value = passphrase
passlengthInput.value = passLength
passlengthRangeInput.value = passLength

passphraseInput.addEventListener('input', e => {
  localStorage.setItem(LS_PASSPHRASE, e.target.value)
})

passlengthRangeInput.addEventListener('input', e => {
  passlengthInput.value = e.target.value;
  localStorage.setItem(LS_PASSLENGTH, e.target.value)
})

passlengthInput.addEventListener('change', e => {
  if (e.target.value !== '') {
    if (parseInt(e.target.value) < parseInt(e.target.min)){
      e.target.value = e.target.min;
    }
    if (parseInt(e.target.value) > parseInt(e.target.max)){
      e.target.value = e.target.max;
    }
  }

  passlengthRangeInput.value = e.target.value
  localStorage.setItem(LS_PASSLENGTH, e.target.value)
})
