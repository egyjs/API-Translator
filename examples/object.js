const { translate } = require("../dist"); // ir

// translate Object
(async () => {
	const obj = {
		Home: "Home",
		About: "About",
		Contact: "Contact",
		Login: "Login",
	};
	const result = await translate(obj, { to: "fr" });
	console.log(result); // { Home: 'Maison', About: 'Maison', Contact: 'Contact', Login: 'Connexion' }
})();
