var usePasswordCallback, cancelCallback;

exports.show = function(UsePasswordCB,CancelCB){
	$.alertDialog.show();
	usePasswordCallback = UsePasswordCB || {};
	cancelCallback = CancelCB || {};
};

exports.success = function(){
	$.fingerprintIcon.image = "/android_fingerprint_success.png";
	$.fingerprintLabel.color = "#009689";
	$.fingerprintLabel.text = "Fingerprint recognized";
	setTimeout(function() {
		$.alertDialog.hide();
	}, 300);	
};

exports.failure = function(){
	$.fingerprintIcon.image = "/android_fingerprint_failure.png";
	$.fingerprintLabel.color = "#f4511f";
	$.fingerprintLabel.text = "Fingerprint not recognized.\nTry again.";
};

function fingerprintButtonPressed(e){
	//Ti.API.info("Clicked: " + JSON.stringify(e));
	if (e.index === 1) {			//"Use Password"
		usePasswordCallback();
	} else if (e.index === 0) {		//"Cancel"
		cancelCallback();
	}
};
exports.fingerprintButtonPressed = fingerprintButtonPressed;
