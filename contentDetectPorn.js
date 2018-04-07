// récupère les mots clés dans meta
function getMetaKeywords() {
	var metas = document.getElementsByTagName('meta');
	for (var i=0; i<metas.length; i++) {
		if (metas[i].getAttribute("name") == "keywords") {
			return metas[i].getAttribute("content");
		}
	}

	return false;
}

// teste si ça contient porn
function detectionPornBG() {
	var detector = getMetaKeywords();
	if(detector != false) {
		if(detector.includes("porn")) {
			return true;
		}
	}
	return false;
}

function notifyExtension(e) {
  if (detectionPornBG()) {
    	browser.runtime.sendMessage({"IsPorn": true,
    					"url": document.URL });
  }else {
	browser.runtime.sendMessage({"IsPorn": false});
  }
}

window.addEventListener("load", notifyExtension);
