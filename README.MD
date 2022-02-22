# Pass Enhance

This browser plugin adds a small icon to every password field.

It encrypts what you enter, based on a passphrase and the domain you're on. So you have to memorize only one password and still have a different one stored on every website you visit.


## Dev Setup

- run `npm i` to install dependencies

- run `npm run dev`

This will watch the `/app` folder. It includes an `index.html` to test the plugin on an password field. It also includes a `popup.html` to work on the view of the plugin.

The `/app/src` includes the JavaScript and CSS files for the add on popup (`popup.css`, `popup.js`) and the code which will be injected into the browser (`pass-enhance.css`, `pass-enhance.js`).


[pass-enhance.com](https://pass-enhance.com/)

## License

[MIT](https://choosealicense.com/licenses/mit/)

---

*created by [Vincent Will](https://wweb.dev/)*