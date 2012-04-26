/*
 *  
 */

var APP = {
	
	//config
	appName: 'App Name',	
	platform : Ti.Platform.osname,
	height : Ti.Platform.displayCaps.platformHeight,
	width : Ti.Platform.displayCaps.platformWidth,
	currentOrientation: (Ti.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT) ? 'landscape' : 'portrait',
	//formFactor: App.Platform.is.devicetype,  // The form factor (handheld / tablet)
	//isretina: App.Platform.is.iosretina,
	
	user: null,
	
	//Styling
	Win:
	{
		backgroundImage : '/background.png',
		barColor: '#BE2121',
		backgroundColor:'white'
	},//end Window
	
	View:
	{
		
	},//endView
	
	Button:
	{
		height: '35dp',
		width: '210dp',
		color: '#000',
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
		borderWidth: 0,
		font: {
			fontSize: 20,
		},
		left: 10
	},//end Button
	
	Label:
	{
		color: '#000',
		font: {fontFamily:'Helvetica Neue', fontSize:15,fontWeight:'bold'}		
	}//end label
}//end APP

if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}//end if
else if (Ti.Platform.osname === 'mobileweb') {
	alert('Mobile web is not yet supported by this template');
}//end else if 
else {
	
	//Ti.UI.iPhone.StatusBar.TRANSLUCENT_BLACK;
	
	APP.AppTabGroup = require('/ui/UIAppTabGroup');APP.AppTabGroup.APP = APP;
	APP.AppTabGroup.init({});
	
	//start the APP
	APP.AppTabGroup.open();	
	
	//shutdown
	//APP.AppTabGroup.shutdown();
	
	// Global system Events
	//Ti.Gesture.addEventListener('orientationchange', App.orientationObserverUpdate);
	//Ti.Network.addEventListener('change', App.networkObserverUpdate);
	//Ti.App.addEventListener('resume', App.resumeObserverUpdate);
	//Ti.App.addEventListener('pause', App.pauseObserverUpdate);

}//end else
