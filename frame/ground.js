/*
* author : sylvain.gandini 
*/
var getValuesUrl = function () {
	var variableAlAcon = false;
	if (window.location.toString().indexOf('?') === -1) {
		return;
	}
	var get = {};
	var query = window.location
		.toString()
		// get the query string
		.replace(/^.*?\?/, '')
		.replace(/#.*$/, '')
		.split('&');
	for (var i = 0, l = query.length; i < l; i++) {
		var aux = decodeURIComponent(query[i]).split('=');
		get[aux[0]] = aux[1];
	}
	stream.getValues = get;
	getValues = get;
	var string = window.location.toString().split('?');
	if (string[1].indexOf('#') !== -1) {
		var subString = string[1].split('#');
		string[1] = subString[0];
	}
	stream.stringGetValues = '?' + string[1];
	stringGetValues = stream.stringGetValues;
	return;
};
var getPathName = function () {
	var url = window.location.pathname;
	var urlParts = url.split('/');
	var path = [];
	var nbPath = urlParts.length;
	for (var u = 0; u < nbPath; u++) {
		if (urlParts[u] !== '' && urlParts[u] !== 'office') {
			path.push(urlParts[u]);
		}
	}
	return path;
};
/*
* source : reprise de code personnel,
* author : sylvain.gandini,
* date : 14.10.2019,
*/
var constructDomElement = function (type, className, options) {
	//options
	/*
		*{
		* 	parent[domElement]
		* 	title(hover)[txt]
		* 	content[txt][array(objects/txt)]
		* 	extraAttributes[object] (attribute: value)
		* 	translateContent[bool]
		* 	//dev
		* 	name[str] +
		* 	scope[obj] +
		* 	styles {styleName: style}
		*}
	*/
	var parent, title, content, name, scope, extraAttributes = false, extraStyles = false, translateContent = true;
	if (typeof (options) !== 'undefined') {
		if (options.parent) {
			parent = options.parent;
		}
		if (options.title) {
			title = options.title;
		}
		if (options.content) {
			content = options.content;
		}
		if (options.name) {
			name = options.name;
		}
		if (options.scope) {
			scope = options.scope;
		}
		if (options.extraAttributes) {
			extraAttributes = options.extraAttributes;
		}
		if (options.styles) {
			extraStyles = options.styles;
		}

		if (options.translateContent === false) {
			translateContent = false;
		}
	}
	if (typeof (type) == 'undefined') {
		var type = 'div';
	}

	var elem = document.createElement(type);
	if (type == 'video') {
		if (!options.src || !options.subType) {
			return;
		}
		var elemSrc = document.createElement('source');
		elemSrc.setAttribute('src', options.src);
		elemSrc.setAttribute('type', options.subType);
		elem.appendChild(elemSrc);
	}
	if (className) {
		elem.setAttribute("class", className);
	}
	if (parent) {
		parent.appendChild(elem);
	}
	if (title) {
		if (translateContent) {
			var str = stream.translator.getString(title);
			if (str) {
				elem.setAttribute('title', str);
			} else {
				elem.setAttribute('title', title);
			}
		} else {
			elem.setAttribute('title', title);
		}
	}
	if (name && scope) {
		scope[name] = elem;
	}
	if (content) {
		if (Array.isArray(content)) {
			for (var indContent in content) {
				if (typeof (content[indContent]) === 'object') {
					elem.appendChild(content[indContent]);
				} else if (typeof (content[indContent]) === 'string') {
					elem.innerHTML = content[indContent];
				}
			}
		} else {
			elem.innerHTML = content;
		}
	}
	if (extraAttributes) {
		for (var indAttribute in extraAttributes) {
			elem.setAttribute(indAttribute, extraAttributes[indAttribute]);
			//elem[indAttribute] = extraAttributes[indAttribute];
		}
	}
	if (extraStyles) {
		for (indStyle in extraStyles) {
			elem.style[indStyle] = extraStyles[indStyle];
		}
	}
	return elem;
};
var createActivityLink = function () {

}
var constructActivityLink = function (data, container, options) {
	var className = "", extraRender = '';
	if (typeof (options) !== 'undefined') {
		if (options.className) {
			className = options.className;
		}
	}
	//content
	var text = "";
	if (data.text) {
		text = data.text;
	}
	//href
	var href = "#";
	if (data.href) {
		href = data.href;
	}
	if (data.get) {
		href = "/" + href + "/?" + data.get;
		forceUrl = "?" + data.get;
	}
	//construct
	var linkDom = constructDomElement('a', 'activityLink ' + className, { parent: container, content: text, extraAttributes: { href: href } });
	//event
	var optionsEvent = {};
	if (options.extraRender) {
		optionsEvent.extraRender = options.extraRender;
	}

	if (data.activity) {
		addActivityLinkEvent(linkDom, data.activity, optionsEvent);
	}
	//return
	return linkDom;
};
/**
 * 
 * @param {*} dom 
 * @param {*} activityId 
 * @param {*} options 
 */
var addActivityLinkEvent = function (dom, activityId, options) {
	var hrefLink = dom.href;
	dom.addEventListener('click', function (evt) {
		evt.stopPropagation();
		dom.href = 'javascript:';
		stream.activityManager.changeActivity(activityId);
		if (options) {
			if (options.extraRender) {
				options.extraRender(activityId);
			}
		}
		setTimeout(function () {
			dom.href = hrefLink;
		}, 0);
	});
};