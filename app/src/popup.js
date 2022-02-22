import 'crypto-js'; // improves native Math.random(), which affects random-word-slugs
import { generateSlug } from 'random-word-slugs';

const passphraseInput = document.querySelector('#passphrase')
const passlengthInput = document.querySelector('#passlength')
const passlengthRangeInput = document.querySelector('#passlength-range')
const infoIcons = document.querySelectorAll('.info-icon')
const showPassphrase = document.querySelector('.show-passphrase')
const hidePassphrase = document.querySelector('.hide-passphrase')

// Get or create passphrase
passphraseStorage.then((res) => {
  if (res && res.passphrase) {
    passphraseInput.value = res.passphrase
  } else {
      const passphrase = generateSlug();

      browser.storage.sync.set({ passphrase })

      passphraseInput.value = passphrase
  }
});

// Get or create passlength
passLengthStorage.then((res) => {
  if (res && res.passLength) {
    passlengthInput.value = res.passLength
    passlengthRangeInput.value = res.passLength
  } else {
    const passLength = 12;

    browser.storage.sync.set({ passLength })

    passlengthInput.value = passLength
    passlengthRangeInput.value = passLength
  }
});

// input handler
passphraseInput.addEventListener('input', e => {
  browser.storage.sync.set({ passphrase: e.target.value })
})

passlengthRangeInput.addEventListener('input', e => {
  passlengthInput.value = e.target.value;
  browser.storage.sync.set({ passLength: e.target.value })
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
  browser.storage.sync.set({ passLength: e.target.value })
})

// show password handler
for (let icon of infoIcons) {
  icon.addEventListener('mouseenter', () => {
    icon.parentNode.querySelector('.info-popup').classList.add('visible')
  })
  icon.addEventListener('mouseleave', () => {
    icon.parentNode.querySelector('.info-popup').classList.remove('visible')
  })
}

showPassphrase.addEventListener('click', () => {
  passphraseInput.setAttribute('type', 'text')
  showPassphrase.classList.add('hidden')
  hidePassphrase.classList.remove('hidden')
})

hidePassphrase.addEventListener('click', () => {
  passphraseInput.setAttribute('type', 'password')
  showPassphrase.classList.remove('hidden')
  hidePassphrase.classList.add('hidden')
})
