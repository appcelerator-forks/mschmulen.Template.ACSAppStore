/**
* Appcelerator Titanium Platform
* Copyright (c) 2009-2011 by Appcelerator, Inc. All Rights Reserved.
* Licensed under the terms of the Apache Public License
* Please see the LICENSE included with this distribution for details.
**/

// Code is stripped-down version of Tweetanium, to expose new structure paradigm

var UTILS = {};

(function(){
	UTILS.app = {};
	
/*
 * 
 * https://gist.github.com/1551558
 * Mixin properties of n objects into the given object - pass in as many objects to mix in as you like.  
 * Can perform a shallow or deep copy (deep is default).
 * 
 * Usage:
 * mixin([Boolean deepCopy,] objectToExtend, objectToMixIn [, as many other objects as needed])
 * 
 * Examples:
 * 
 * var o1 = {
 * 	 foo:'bar',
 *   anObject: {
 * 	   some:'value'
 *     clobber:false
 *   }
 * };
 * 
 * var o2 = {
 * 	 foo:'bar',
 *   aNewProperty:'something',
 *   anObject: {
 * 	   some:'other value'
 *   }
 * };
 * 
 * //merge properties of o2 into o1
 * mixin(o1,o2)
 * 
 * //clone o1:
 * var clone = mixin({},o1);
 * alert(clone.foo); //gives 'bar'
 * 
 */
/*
//helper function for mixin - adapted from jQuery core
function _isPlainObject(obj) {
	if(!obj || typeof obj !== 'object' || obj.nodeType) {
		return false;
	}
	try {
		// Not own constructor property must be Object
		if(obj.constructor && !Object.prototype.hasOwnProperty.call(obj, "constructor") && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
			return false;
		}
	} catch ( e ) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for(key in obj ) {}

	return key === undefined || Object.prototype.hasOwnProperty.call(obj, key);
}

//helper for main mixin function interface, defined below this function as "mixin"
function _merge(obj1, obj2, recursive) {
	for(var p in obj2) {
		if(obj2.hasOwnProperty(p)) {
			try {
				if(recursive && _isPlainObject(obj2[p])) {
					obj1[p] = _merge(obj1[p], obj2[p]);
				} 
				else {
					obj1[p] = obj2[p];
				}
			} 
			catch(e) {
				obj1[p] = obj2[p];
			}
		}
	}
	return obj1;
}

//main interface, exposed in module
function mixin() {
	var obj, mixins, deep = true;
	if (typeof arguments[0] === 'boolean') {
		deep = arguments[0];
		obj = arguments[1];
		mixins = Array.prototype.slice.call(arguments,2);
	}
	else {
		obj = arguments[0];
		mixins = Array.prototype.slice.call(arguments,1);
	}

	//mix in properties of given objects
	for (var i = 0, l = mixins.length; i<l; i++) {
		_merge(obj,mixins[i],deep);
	}

	return obj;
}
module.exports = mixin;

*/
	
	var empty = {};
	
	function mixin(/*Object*/ target, /*Object*/ source){
		var name, s, i;
		for(name in source){
			s = source[name];
			if(!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))){
				target[name] = s;
			}
		}
		return target; // Object
	};
	
	UTILS.mixin = function(/*Object*/ obj, /*Object...*/ props){
		if(!obj){ obj = {}; }
		for(var i=1, l=arguments.length; i<l; i++){
			mixin(obj, arguments[i]);
		}
		return obj; // Object
	};
	
	//create a new object, combining the properties of the passed objects with the last arguments having
	//priority over the first ones
	UTILS.combine = function(/*Object*/ obj, /*Object...*/ props) {
		var newObj = {};
		for(var i=0, l=arguments.length; i<l; i++){
			mixin(newObj, arguments[i]);
		}
		return newObj;
	};

	/*
		Branching logic based on OS
	*/
	var osname = Ti.Platform.osname;
	UTILS.os = function(/*Object*/ map) {
		var def = map.def||null; //default function or value
		if (typeof map[osname] != 'undefined') {
			if (typeof map[osname] == 'function') { return map[osname](); }
			else { return map[osname]; }
		}
		else {
			if (typeof def == 'function') { return def(); }
			else { return def; }
		}
	};
	
	/*
	 
//single calls over bridge
var osname = Ti.Platform.osname,
	version = parseInt(Ti.Platform.version);

//simple boolean checks
var isandroid = function() {
	return osname === 'android';
};

var isios = function() {
	return osname === 'iphone' || osname === 'ipad';
};

var isretina = function() {
	if (Ti.Platform.displayCaps.density === 'high' || Ti.Platform.displayCaps.density === 'xhigh') {
		return true;
	}
};

var ismobileweb = function() {
	return osname === 'mobileweb';
};

var ishandheld = function() {
	return (osname === 'android' && (version < 3 || version > 3)) || osname === 'iphone';
};

var istablet = function() {
	return (osname === 'android' && version > 2 && version < 4) || osname === 'ipad';
};

//adding further namespaced functions to handheld and tablet checks
ishandheld.android = function() {
	return osname === 'android' && (version < 3 || version > 3);
};

ishandheld.ios = function() {
	return osname === 'iphone';
};

istablet.android = function() {
	return osname === 'android' && version > 2 && version < 4;
};

istablet.ios = function() {
	return osname === 'ipad';
};

 * Branch values or logic based on platform - examples:
 *
 * var orientationModes = is({
 *   handheld:[Ti.UI.PORTRAIT],
 *   tablet:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
 * });
 *
 * var pointOffset = is({
 *   ios:100,
 *   android:120
 * });
 *
 * is({
 * 	 handheld: {
 * 	   ios: function() {
 * 	     //do iphone/ipod stuff
 *     },
 * 	   android: function() {
 * 	     //do android handheld stuff
 *     }
 *   },
 *   tablet: {
 * 	   ios: function() {
 * 	     //do ipad stuff
 *     },
 * 	   android: function() {
 * 	     //do android tablet stuff
 *     }
 *   }
 * });
 *

var is = function(params) {
	var statement; //either the value or the func

	//check for platform branches first
	if (isandroid() && params.android) {
		statement = params.android;
	}
	else if (isios() && params.ios) {
		statement = params.ios;
	} else if (ismobileweb() && params.mobileweb) {
		statement = params.mobileweb;
	}

	//next, check handheld versus tablet
	else if (ishandheld() && params.handheld) {
		if (params.handheld.ios || params.handheld.android) {
			statement = (isios()) ? params.handheld.ios : params.handheld.android;
		}
		else {
			statement = params.handheld;
		}
	}
	else if (istablet() && params.tablet) {
		if (params.tablet.ios || params.tablet.android) {
			statement = (isios()) ? params.tablet.ios : params.tablet.android;
		}
		else {
			statement = params.tablet;
		}
	}

	//if we actually resolve to anything, take care of it
	if (statement) {
		if (typeof statement === 'function') {
			statement();
		}
		else {
			return statement;
		}
	}
};

//add boolean checks
is.iosretina = isretina();
is.android = isandroid;
is.ios = isios;
is.handheld = ishandheld;
is.tablet = istablet;
is.mobileweb = ismobileweb;
is.devicetype = is({
	handheld: 'handheld',
	tablet: 'tablet'
});
is.ics = (parseInt(Ti.Platform.version) < 4) && is.android() || is.ios() ? false : true;

exports.osname = osname;
exports.version = version;
exports.is = is;	 
	 
	 
	 */
	
}());

module.exports = UTILS;


