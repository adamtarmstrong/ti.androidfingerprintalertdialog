# ti.androidfingerprintalertdialog
Titanium - Android Fingerprint AlertDialog Alloy Widget


### index.js
```
if (OS_ANDROID) {
	/*
	 * Include Android reprint library methods
	 */
	var Reprint = require('reprint');
	
	
	/*
	 * Check for Fingerprint HW as well as registered fingerprints
	 */
	if (!Reprint.isHardwarePresent()) {
	    alert('Your device does not support fingerprint recognition.');
	}
	if (!Reprint.hasFingerprintRegistered()) {
	    alert('You do not have any fingerprint registered in this device.');
	}
	if (Reprint.isHardwarePresent() && Reprint.hasFingerprintRegistered()) {
			/*
			 * Initialize Reprint library
			 */
			Ti.API.info("Initializing Reprint");
			Reprint.initialize();
			
			/*
			 * Show Alert Dialog and set callbacks for click events 'Use Password' & 'Cancel'
			 * Add Reprint listener for fingerprint authentication
			 */
			setTimeout(function() {
				$.androidFingerprint.show(fingerprintUsePassword, fingerprintCancel);
				Reprint.authenticate(successCallback, failureCallback);
			}, 300);
			
			/*
			 * Define success | failure | UsePassword | Cancel
			 */
			function successCallback(moduleTag) {
				$.androidFingerprint.success();
				//Continue login process
			}
			function failureCallback(failureReason, fatal, errorMessage, moduleTag, errorCode) {
				$.androidFingerprint.failure();
				//alert(errorMessage);
			}
			function fingerprintUsePassword(){
				//alert("User Pressed - Use Password");
				Reprint.cancelAuthentication();
			}
			function fingerprintCancel(){
				//alert("User Pressed - Cancel");
				Reprint.cancelAuthentication();
			}
	}
}
```
	
