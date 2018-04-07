//fonction d'indication que l'historique est effacé
function themeNoHistory() {
	console.log("héhéhéhéh");
	browser.theme.update({
 		images: {
   			headerURL: 'pasdimage.jpg',
 		},
 		colors: {
   			accentcolor: '#F00',
   			textcolor: '#111',
 		}
	});
}


function notify(message) {
	console.log(message)
	if(message.IsPorn) {
		themeNoHistory();
		browser.history.deleteUrl({url: message.url});
	}else {
		browser.theme.reset();
	}
}

browser.runtime.onMessage.addListener(notify);
