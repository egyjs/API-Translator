![API-Translator build](https://img.shields.io/appveyor/build/egyjs/API-Translator?style=flat-square)

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

- If you want to contribute to the project, you can do it by opening a pull request or opening an issue.


---
## Contact me!

- E-mail <a href="mailto:el3zahaby@gmail.com" target="_blank">`el3zahaby@gmail.com`</a>
- Instagram <a href="https://www.instagram.com/egyjs/" target="_blank">`@egyjs`</a>
