
var UIWinAppDetail = (function() {
	
  	var STYLE = require('ui/STYLE');
  	var UTILS = require('utils/utils');
	
	var API = {};
	API.APP = null;
	API.RECORD = null;
	
	API.name = "App Detail";
	API.icon = "/images/Radio-Features-Decoded.png";

	API.defaultColorBlue = '#035385';
  	API.defaultColorRed = '#9a0707';
  	API.rowColor = '#EBEBEB';
	API.iconColor = "#5C3711";
	API.defaultColor = API.defaultColorRed;
	
	API.osname = Ti.Platform.osname;
	
	// const values
	API.BOTTOM_DELTA = 20;
	API.BTN_HEIGHT = 40;
	API.BTN_WIDTH = 200;
	API.SPACING = 10;
	
	API.win = null;
	
	API.data = [];
		
  	API.factoryView = function(args){
  		
    	var topView = Ti.UI.createView(STYLE.View);
		
		Ti.API.info( " API.RECORD.name ?:"+ API.RECORD.name );
		
		// color scheme
		var defaultColorBlue = '#035385';
  		var defaultColorRed = '#9a0707';
  		var rowColor = '#EBEBEB';
  		var iconColor = "#5C3711";
  		var defaultColor = defaultColorRed;
  		
  		// const values
  		var BOTTOM_DELTA = 20;
  		var BTN_HEIGHT = 40;
  		var BTN_WIDTH = 200;
  		var SPACING = 10;
		
		var icon = Ti.UI.createImageView({
	  		borderRadius: 34,
	  		borderWidth: 0,
	  		borderColor: iconColor,
	  		image: API.RECORD.itunesIcon,
	  		width: 200,
	  		height: 200,
	  		top: 5
		});
		topView.add(icon);
		
		var appTable = Ti.UI.createTableView({
			backgroundColor: 'transparent',
  			rowBackgroundColor: rowColor,
  			style: Ti.UI.iPhone.TableViewStyle.GROUPED,
  			width: API.TV_ROW_WIDTH,
  			top: 205,
  			scrollable: false,
		});//end appTable
 		topView.add(appTable);
 		
 		//appTable.removeEventListener('click', listeners);
 		appTable.setData([]);
 		
 		// Add table data
		var tableData = [
      		Ti.UI.createTableViewRow({title: 'About', hasChild: true, height: API.TV_ROW_HEIGHT}),
      		Ti.UI.createTableViewRow({ title: 'install', hasChild: true, height: API.TV_ROW_HEIGHT })
    	];//end tableData
    	
		appTable.setData(tableData);
		appTable.setHeight(API.TV_ROW_HEIGHT * tableData.length + 40);
		
		listeners = function (e) {
		    switch(e.index) {
		      case 0:
		        API.factoryAboutWindow({ text:API.RECORD.description}).open({modal: true});
		        break;
		      case 1:
		          Ti.API.log('Opening AppStore');
		          Ti.Platform.openURL(API.RECORD.itunesURL);
		        break;
		      default:
		        alert('Invalid Selection');
		    }//end switch
		  };//end listeners
		
		appTable.addEventListener('click', listeners);
		
		return topView;
  	};//end factoryView
  	
	API.factoryScreenshotWindow = function(args){
		Ti.API.log('Creating Screenshot Views: ' + args.screenshots);
		
		var menusHidden = true;
		  
		var win = Ti.UI.createWindow({
		    title: 'Screenshots',
		    backgroundColor: API.rowColor,
		    barColor: API.defaultColorRed,
		    navBarHidden: true,
		  });
		  Ti.UI.iPhone.hideStatusBar({animationStyle:Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_FADE});
		  var screenViews = [];
		  for (var i=0; i<args.screenshots.length; i++) {
		    var screenshot = Ti.UI.createImageView({
		      image: args.screenshots[i],
		      widht: 320,
		      height: 480,
		    });
		    screenViews.push(screenshot);
		  }
		  
		  var screenScroll = Ti.UI.createScrollableView({
		    views: screenViews,
		    showPagingControl: true,
		    pagingControlHeight: 20,
		    width: 320,
		    height: 480,
		  });
		  
		  win.add(screenScroll);
		  
		  win.addEventListener('singletap', function(e) {
		    if (menusHidden) {
		      Ti.UI.iPhone.showStatusBar({animate: true});
		      win.showNavBar();  
		    }
		    else {
		      Ti.UI.iPhone.hideStatusBar({animate: true});
		      win.hideNavBar({animate: true});
		    }
		    menusHidden = !menusHidden;
		  });
		  
		 if (Ti.Platform.osname === 'iphone') {
      			var b = Ti.UI.createButton({
        			title: 'Close',
        			style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
      			});
      			
      			b.addEventListener('click', function() {
        			win.close();
     	 		});
      			win.setRightNavButton(b);
		}//end if
		
		return win;
  	};//end factoryScreenshotWindow
  	
  	API.factoryAboutWindow = function(args){
  		Ti.API.info ( " DESCRIPTION " + args.text );
  		
		var win = Ti.UI.createWindow({
	    		title: 'About',
	    		layout: 'vertical',
	    		backgroundColor: API.rowColor,
	    		barColor: API.defaultColorRed,
	  		});
	  		
			var description = Ti.UI.createTextArea({
		      	value: args.text,
		      	top: 20,
		      	color: 'black',
		      	backgroundColor: API.rowColor,
		      	font: {
		        	fontSize: 16,
		        	fontWeight: 'bold',
		      	},
		      	textAlign: 'center',
		      	bottom: 50,
		      	width: 320,
		      	editable: false
		    });
		    
		    win.add(description);
    		
    		if (Ti.Platform.osname === 'iphone') {
      			var b = Ti.UI.createButton({
        			title: 'Close',
        			style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
      			});
      			
      			b.addEventListener('click', function() {
        			win.close();
     	 		});
      			win.setRightNavButton(b);
    		}//end if
    		
    	return win;
  	};//end factoryAboutWindow
  	
	API.factoryWindow = function(args){
     	API.win = Ti.UI.createWindow( UTILS.combine( STYLE.Win , {title : API.RECORD.name } ) );     	
		API.win.add( API.factoryView( {parentNav:API.win} ) );
     	return API.win;
  	};//end factoryWindow
  	
  	return API;
})(); //end UIWinAppDetail

module.exports = UIWinAppDetail;

