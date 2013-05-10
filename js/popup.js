function PopupPage(){
	var popup={
		init:function(){
			setEvent();
		}
	
		
	
	};
	
	function setEvent(){
		console.log('setEvent');
		$("#options").click(function () {
			chrome.tabs.getAllInWindow(null, function a(c) {
				for (var b = 0; b < c.length; b++) {
					var d = c[b];
					if (d.url.indexOf(chrome.extension.getURL("options.html")) >= 0) {
						chrome.tabs.update(d.id, {
							selected : true
						});
						return
					}
				}
				chrome.tabs.create({
					url : chrome.extension.getURL("options.html")
				});
			});
		});
	}
	
	return popup;
}