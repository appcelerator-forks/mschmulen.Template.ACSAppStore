var UIWinAppList = (function() {
	
	var STYLE = require('ui/STYLE');
	var UTILS = require('utils/utils');
	var CLOUD = require('ti.cloud');
	CLOUD.debug = true;
	
	var API = {};
	API.APP = null;
	API.name = "Apps";
	API.icon = "/KS_nav_ui.png";
	API.parentNav = null;
	API.win = null;
	
	API.defaultColorBlue = '#035385';
  	API.defaultColorRed = '#9a0707';
 	API.rowColor = '#EBEBEB';
  	API.defaultColor = API.defaultColorRed;
	
	API.table = null;
	API.data = [];
	
	API.factoryView = function(args) {
		
		var topView = Ti.UI.createView(UTILS.combine(STYLE.View, {
			backgroundImage : '/images/Screen-Banner.png'
		})); //end topView
		
		var footerLabel = Ti.UI.createLabel({
		    backgroundColor:API.defaultColor,
		    color:"white",
		    font: {fontSize:10},
		    text:"[Some Great Apps]",
		    textAlign:"center",
		    height:25,
		    width:320
		  });
		
		API.table = Ti.UI.createTableView({
			footerView: footerLabel,
			backgroundColor: API.defaultColorRed
		}); //end table
		topView.add(API.table);
		
		//add behavior
		API.table.addEventListener('click', function(e) {
			var DETAIL = require('ui/UIWinAppDetail'); DETAIL.APP = API.APP;
			DETAIL.RECORD = e.rowData.payload;
			var detailWin = DETAIL.factoryWindow({});
			API.win.parentNav.open( detailWin );
		});//end table
		
		/*
		for (var i=0; i < API.APP.INVENTORY.data.length; i++) {
			var row = API.factoryRow({data: API.APP.INVENTORY.data[i] });
			API.data.push(row);
		}//end for
		table.setData(API.data);
		*/
		
		API.updateTableView({});
		
		return topView;
	};//end factoryView
	
	API.factoryRow = function(args) {
		
		var row = Ti.UI.createTableViewRow({
        	title: args.data.name,
          	hasChild: true,
          	payload: args.data,
		    height: 100,
		    backgroundColor: API.rowColor,
		    selectedBackgroundColor: API.defaultColorRed,
		    indentionLevel: 10
		});//end row
		
		var rowView = Ti.UI.createView({
        	height: 'auto',
          	layout: 'vertical',
          	left: 5,
          	top: 5,
          	bottom: 5,
          	right: 5,
          	backgroundGradient: {
            	type: 'linear',
            	colors: [{color:'#d4d4d4',position:0.0},{color:'#c4c4c4',position:0.50}],
          	}
        });
        
        var icon = Ti.UI.createImageView({
          	borderRadius: 17,
          	borderWidth: 0,
          	borderColor: API.rowColor,
          	image: args.data.itunesIcon,
          	left: 20,
          	top: 10,
          	width: 70,
          	height: 70
        });//end icon
        
        row.add(icon);
        
		return row;
	}; //end factoryRow
	
	API.updateTableView = function(args){
		
		API.data = [];
		
		CLOUD.Objects.query({
   			classname: 'apps'
       		}, function (e) {
				
        		if (e.success) {
            		var apps = e.apps;
        			for (var i=0; i<apps.length; i++) {
        				
						var row = Ti.UI.createTableViewRow({
		        			title: apps[i].name,
		         	 		hasChild: true,
				          	appDetails: apps[i],
				          	payload: apps[i],
						    height: 100,
						    backgroundColor: API.rowColor,
						    selectedBackgroundColor: API.defaultColorRed,
						    indentionLevel: 10
						});//end row
						
						var rowView = Ti.UI.createView({
						          height: 'auto',
						          layout: 'vertical',
						          left: 5,
						          top: 5,
						          bottom: 5,
						          right: 5,
						          backgroundGradient: {
						            type: 'linear',
						            colors: [{color:'#d4d4d4',position:0.0},{color:'#c4c4c4',position:0.50}],
						          },
						        });
						        
						 var icon = Ti.UI.createImageView({
						          borderRadius: 17,
						          borderWidth: 0,
						          borderColor: API.rowColor,
						          image: apps[i].itunesIcon,
						          left: 20,
						          top: 10,
						          width: 70,
						          height: 70,
						        });
						    
						    row.add(icon);
						    API.data.push(row);
			       		}//end for
			       		
						API.table.setData(API.data);
				    }//end if
				    else {
				      alert('ACS called failed');
				    }//end else
            //content.remove(status);
            //button.show();
         });//end query
         
	};//end updateTableView
	
	
	
	
	API.factoryWindow = function(args) {
		API.win = Ti.UI.createWindow(UTILS.combine(STYLE.Win, {
			title : API.name
		}));
		
		var osname = Ti.Platform.osname;
		if ( osname === 'android' ){}
		else if ( osname === 'mobileweb' ){}
		else
		{
			var RefreshButton = Ti.UI.createButton({
				systemButton: Ti.UI.iPhone.SystemButton.REFRESH
			});
			RefreshButton.addEventListener('click', function(e) {
				API.updateTableView();
			});
			API.win.rightNavButton = RefreshButton;
		}//end if iOS iphone/ipad
		
		API.win.add(API.factoryView({ }));
		return API.win;
	};//end factoryWindow
	
	return API;
})();//end UIWinAppList

module.exports = UIWinAppList;
