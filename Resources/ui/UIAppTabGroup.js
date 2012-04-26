var AppTabGroup = (function() {
	
	var API = {};
	
	API.APP = null;
	API.tabGroup = null;
	API.currentUser = null;
	
	API.init = function(args) {
		
		var UIWinAppList = require('ui/UIWinAppList'); UIWinAppList.APP = API.APP;
		
		//create module instance
		API.tabGroup = Ti.UI.createTabGroup();
			
			var winAppListing = new UIWinAppList.factoryWindow({});
			var tabAppListing = Ti.UI.createTab({ title: L(UIWinAppList.name), icon: UIWinAppList.icon, window: winAppListing });
			winAppListing.parentNav = tabAppListing;
			API.tabGroup.addTab(tabAppListing);
		
		API.tabGroup.addEventListener('open',function()
		{
			
		});//end open
		
	};//end init
	
	API.open = function()
	{
		if ( API.tabGroup == null) { API.init({}); }
		API.tabGroup.open();
	}//end open
	
  	return API;
})(); //end AppTabGroup
module.exports = AppTabGroup;