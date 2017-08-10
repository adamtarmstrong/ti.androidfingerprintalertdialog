# ti.androidfingerprintalertdialog
Titanium Alloy Widget - Android Fingerprint AlertDialog

The purpose of this widget is to simply apply all the Material Style Guidelines for presenting a UI to request fingerprint authentication, failure, and success into a widget that could be added to any Titanium project.
https://material.io/guidelines/patterns/fingerprint.html#fingerprint-behavior


![Alt text](/android_fingerprint_states.png)


### 'Requirement'
**Some form of Android Fingerprint Authentication**

> **NOTE**: The example below is using the opensource Ti.Reprint Hyperloop module (free/open-source from: https://github.com/loop-modules/Ti.Reprint )


### Usage
* Download the latest release of the widget.
* Unzip the folder to your project under app/widgets/ti.androidfingerprintalertdialog
* Add the widget as a dependency to your app/config.json
* Add widget to your project view (typically a login page)
```javascript
<Widget id="androidFingerprint" src="ti.androidfingerprintalertdialog" />
```
* Use the 'show' method to display the AlertDialog from the Widget - as well as define the methods to use for click events:
	* 'Use Password'
	* 'Cancel'
```javascript
$.androidFingerprint.show(fingerprintUsePassword, fingerprintCancel);
```
* Use the events, 'success' or 'failure', to update the AlertDialog UI accordingly.
```javascript
$.androidFingerprint.success();
```
	or
```javascript
$.androidFingerprint.failure();
```
	


### Example
#### index.xml
```javascript
<Alloy>
	<Window class="container">
		<Label id="label" text="Android Fingerprint AlertDialog Example" />
		
		<Widget id="androidFingerprint" src="ti.androidfingerprintalertdialog" />
	</Window>
</Alloy>
```

#### index.js
```javascript
/*
 * Initialize Reprint library
 */
if (OS_ANDROID) {
	var Reprint = require('reprint');
	Reprint.initialize();
}
					
function postLayout(){
	if (OS_ANDROID) {
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
					 * Show Alert Dialog and set callbacks for click events 'Use Password' & 'Cancel'
					 * Add Reprint listener for fingerprint authentication
					 */
					Reprint.authenticate(successCallback, failureCallback);
					$.androidFingerprint.show(fingerprintUsePassword, fingerprintCancel);
					
					/*
					 * Define success | failure | UsePassword | Cancel
					 */
					function successCallback(moduleTag) {
						$.androidFingerprint.success();
						//Continue login process
					}
					function failureCallback(failureReason, fatal, errorMessage, moduleTag, errorCode) {
						$.androidFingerprint.failure();
					}
					function fingerprintUsePassword(){
						Reprint.cancelAuthentication();
					}
					function fingerprintCancel(){
						Reprint.cancelAuthentication();
					}
			}
	}
}

$.index.open();
```

#### config.json
```javascript
"dependencies": {
        "ti.androidfingerprintalertdialog": "1.0"
    }
```

