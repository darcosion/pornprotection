function learnRegExp(s) {    
      var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return regexp.test(s);    
 }

function requestForUrl(bookmark) {
	if(learnRegExp(bookmark.url)) {
		//console.log(bookmark.url);
		let req = new XMLHttpRequest();
		req.onreadystatechange = function(event) {
			if (this.readyState === XMLHttpRequest.DONE) {
				if(this.status != 200) {
					console.log("erreur avec  : " + bookmark.url + ", " + this.status + ", " + this.statusText);
					resultat_angry = this;
				}
			}
		}
		req.open('HEAD', bookmark.url, true);
		req.setRequestHeader("Access-Control-Allow-Origin", "*");
		req.setRequestHeader("Access-Control-Allow-Methods", "HEAD");
		//req.setRequestHeader("Origin", bookmark.url);
		req.send(null);
	}
	if(bookmark.children) {
		for(child of bookmark.children) {
			requestForUrl(child);
		}
	}
}


function printTree(bookmarkItems) {
  globalTree = bookmarkItems[0];
  requestForUrl(globalTree);
}

function onRejected(error) {
  alert(error);
}

function printbookmark() {
	test = browser.bookmarks.getTree();
	t = test.then(printTree, onRejected);
}



document.querySelector("#test").addEventListener("click", printbookmark);
