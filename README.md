![GitHub last commit](https://img.shields.io/github/last-commit/egyjs/api-translator?logo=api-translator%20%7C%20egyjs&logoColor=image%3Ahttps%3A%2F%2Fimg.shields.io%2Fgithub%2Flast-commit%2Fegyjs%2Fapi-translator%3Flogo%3Dapi-translator%2520%257C%2520egyjs%26style%3Dflat-square%5BGitHub%20last%20commit%5D&style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/min/api-translator?style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/egyjs/API-Translator/npm-publish?style=flat-square)
<div align="center">
<img src="https://i.ibb.co/Lk9wGxF/app-store-icon.png" alt="free translate" width="40%"/>
</div>

# A free and unlimited translator for Node.js

> 🈂️ ⠀free text translator for Node.js.

## **Install**

To install **api-translator**, you can use:

```bash
# npm
npm i api-translator
```

```bash
# or with yarn
yarn add api-translator
```

```bash
#or with pnpm
pnpm add api-translator
```

## **Quick examples**

```js
const { translate } = require("api-translator");

(async () => {
	const translatedText = await translate("Hello World", {
		from: "en",
		to: "ar",
	});

	console.log(translatedText); // اهلا بالعالم
})();
```

### **Automatic language recognition**

If the language informed in the `from` is dynamic, just do not send it and the translator will automatically recognize it:

```js
const { translate } = require("api-translator");

(async () => {
	const translatedText = await translate("This is cool!", { to: "ar" });

	console.log(translatedText); // هذا رائع!
})();
```

### **Multiple texts**

You can also translate multiple texts at the same time:

```js
const { translate } = require("api-translator");

(async () => {
	const translatedText = await translate(["Hello World", "This is cool!"], {
		to: "ar",
	});

	console.log(translatedText); // [ 'اهلا بالعالم', 'هذا رائع!' ]
})();
```

---

## Contributing

-   If you want to contribute to the project, you can do it by opening a pull request or opening an issue.

---

## Contact me!

-   E-mail <a href="mailto:el3zahaby@gmail.com" target="_blank">`el3zahaby@gmail.com`</a>
-   Instagram <a href="https://www.instagram.com/egyjs/" target="_blank">`@egyjs`</a>
