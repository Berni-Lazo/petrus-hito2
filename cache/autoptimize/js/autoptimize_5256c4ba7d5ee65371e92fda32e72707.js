/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {
	"use strict";
	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
"use strict";
var arr = [];
var document = window.document;
var getProto = Object.getPrototypeOf;
var slice = arr.slice;
var concat = arr.concat;
var push = arr.push;
var indexOf = arr.indexOf;
var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call( Object );
var support = {};
var isFunction = function isFunction( obj ) {
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };
var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};
	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};
	function DOMEval( code, doc, node ) {
		doc = doc || document;
		var i,
			script = doc.createElement( "script" );
		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
var
	version = "3.3.1",
	jQuery = function( selector, context ) {
		return new jQuery.fn.init( selector, context );
	},
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
jQuery.fn = jQuery.prototype = {
	jquery: version,
	constructor: jQuery,
	length: 0,
	toArray: function() {
		return slice.call( this );
	},
	get: function( num ) {
		if ( num == null ) {
			return slice.call( this );
		}
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},
	pushStack: function( elems ) {
		var ret = jQuery.merge( this.constructor(), elems );
		ret.prevObject = this;
		return ret;
	},
	each: function( callback ) {
		return jQuery.each( this, callback );
	},
	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},
	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},
	first: function() {
		return this.eq( 0 );
	},
	last: function() {
		return this.eq( -1 );
	},
	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},
	end: function() {
		return this.prevObject || this.constructor();
	},
	push: push,
	sort: arr.sort,
	splice: arr.splice
};
jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[ i ] || {};
		i++;
	}
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}
	if ( i === length ) {
		target = this;
		i--;
	}
	for ( ; i < length; i++ ) {
		if ( ( options = arguments[ i ] ) != null ) {
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];
				if ( target === copy ) {
					continue;
				}
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];
					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}
					target[ name ] = jQuery.extend( deep, clone, copy );
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}
	return target;
};
jQuery.extend( {
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
	isReady: true,
	error: function( msg ) {
		throw new Error( msg );
	},
	noop: function() {},
	isPlainObject: function( obj ) {
		var proto, Ctor;
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}
		proto = getProto( obj );
		if ( !proto ) {
			return true;
		}
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},
	isEmptyObject: function( obj ) {
		/* eslint-disable no-unused-vars */
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},
	globalEval: function( code ) {
		DOMEval( code );
	},
	each: function( obj, callback ) {
		var length, i = 0;
		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}
		return obj;
	},
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},
	makeArray: function( arr, results ) {
		var ret = results || [];
		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}
		return ret;
	},
	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;
		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}
		first.length = i;
		return first;
	},
	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}
		return matches;
	},
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );
				if ( value != null ) {
					ret.push( value );
				}
			}
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );
				if ( value != null ) {
					ret.push( value );
				}
			}
		}
		return concat.apply( [], ret );
	},
	guid: 1,
	support: support
} );
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );
function isArrayLike( obj ) {
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );
	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}
	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},
	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	whitespace = "[\\x20\\t\\r\\n\\f]",
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		"*([*^$|!~]?=)" + whitespace +
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",
	pseudos = ":(" + identifier + ")(?:\\((" +
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		".*" +
		")\\)|)",
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),
	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,
	rnative = /^[^{]+\{\s*\[native \w/,
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	rsibling = /[+~]/,
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {
			if ( ch === "\0" ) {
				return "\uFFFD";
			}
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}
		return "\\" + ch;
	},
	unloadHandler = function() {
		setDocument();
	},
	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :
		function( target, els ) {
			var j = target.length,
				i = 0;
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}
function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,
		nodeType = context ? context.nodeType : 9;
	results = results || [];
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
		return results;
	}
	if ( !seed ) {
		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;
		if ( documentIsHTML ) {
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
				if ( (m = match[1]) ) {
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}
					} else {
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {
							results.push( elem );
							return results;
						}
					}
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;
				} else if ( context.nodeName.toLowerCase() !== "object" ) {
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}
				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}
/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];
	function cache( key, value ) {
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}
/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}
/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");
	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		el = null;
	}
}
/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;
	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}
/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;
	if ( diff ) {
		return diff;
	}
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}
	return a ? 1 : -1;
}
/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}
/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}
/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {
	return function( elem ) {
		if ( "form" in elem ) {
			if ( elem.parentNode && elem.disabled === false ) {
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}
				return elem.isDisabled === disabled ||
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}
			return elem.disabled === disabled;
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}
		return false;
	};
}
/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}
/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}
support = Sizzle.support = {};
/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};
/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}
	/* Attributes
	---------------------------------------------------------------------- */
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});
	/* getElement(s)By*
	---------------------------------------------------------------------- */
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );
				if ( elem ) {
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}
				return [];
			}
		};
	}
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}
				return tmp;
			}
			return results;
		};
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};
	/* QSA/matchesSelector
	---------------------------------------------------------------------- */
	rbuggyMatches = [];
	rbuggyQSA = [];
	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		assert(function( el ) {
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});
		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}
	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {
		assert(function( el ) {
			support.disconnectedMatch = matches.call( el, "*" );
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}
	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};
	/* Sorting
	---------------------------------------------------------------------- */
	sortOrder = hasCompare ?
	function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :
			1;
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}
		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}
		while ( ap[i] === bp[i] ) {
			i++;
		}
		return i ?
			siblingCheck( ap[i], bp[i] ) :
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};
	return document;
};
Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};
Sizzle.matchesSelector = function( elem, expr ) {
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}
	expr = expr.replace( rattributeQuotes, "='$1']" );
	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
		try {
			var ret = matches.call( elem, expr );
			if ( ret || support.disconnectedMatch ||
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}
	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};
Sizzle.contains = function( context, elem ) {
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};
Sizzle.attr = function( elem, name ) {
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}
	var fn = Expr.attrHandle[ name.toLowerCase() ],
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;
	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};
Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};
Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};
/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );
	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}
	sortInput = null;
	return results;
};
/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;
	if ( !nodeType ) {
		while ( (node = elem[i++]) ) {
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	return ret;
};
Expr = Sizzle.selectors = {
	cacheLength: 50,
	createPseudo: markFunction,
	match: matchExpr,
	attrHandle: {},
	find: {},
	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},
	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );
			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}
			return match.slice( 0, 4 );
		},
		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();
			if ( match[1].slice( 0, 3 ) === "nth" ) {
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}
			return match;
		},
		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];
			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				(excess = tokenize( unquoted, true )) &&
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}
			return match.slice( 0, 3 );
		}
	},
	filter: {
		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},
		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];
			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},
		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );
				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}
				result += "";
				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},
		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";
			return first === 1 && last === 0 ?
				function( elem ) {
					return !!elem.parentNode;
				} :
				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;
					if ( parent ) {
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {
										return false;
									}
								}
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}
						start = [ forward ? parent.firstChild : parent.lastChild ];
						if ( forward && useCache ) {
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});
							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}
						} else {
							if ( useCache ) {
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});
								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}
							if ( diff === false ) {
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {
									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});
											uniqueCache[ type ] = [ dirruns, diff ];
										}
										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},
		"PSEUDO": function( pseudo, argument ) {
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );
			if ( fn[ expando ] ) {
				return fn( argument );
			}
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}
			return fn;
		}
	},
	pseudos: {
		"not": markFunction(function( selector ) {
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );
			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					input[0] = null;
					return !results.pop();
				};
		}),
		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),
		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),
		"lang": markFunction( function( lang ) {
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},
		"root": function( elem ) {
			return elem === docElem;
		},
		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),
		"checked": function( elem ) {
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},
		"selected": function( elem ) {
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}
			return elem.selected === true;
		},
		"empty": function( elem ) {
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},
		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},
		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},
		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},
		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),
		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),
		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),
		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),
		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),
		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),
		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};
Expr.pseudos["nth"] = Expr.pseudos["eq"];
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();
tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];
	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}
	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;
	while ( soFar ) {
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}
		matched = false;
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}
		if ( !matched ) {
			break;
		}
	}
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			tokenCache( selector, groups ).slice( 0 );
};
function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}
function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;
	return combinator.first ?
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});
						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							uniqueCache[ key ] = newCache;
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}
function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}
function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}
function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;
	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}
	return newUnmatched;
}
function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,
			matcherOut = matcher ?
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
					[] :
					results :
				matcherIn;
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}
		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {
						seed[temp] = !(results[temp] = elem);
					}
				}
			}
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}
function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			checkContext = null;
			return ret;
		} ];
	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
			if ( matcher[ expando ] ) {
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}
	return elementMatcher( matchers );
}
function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;
			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}
				if ( bySet ) {
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}
				if ( seed ) {
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}
					setMatched = condense( setMatched );
				}
				push.apply( results, setMatched );
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {
					Sizzle.uniqueSort( results );
				}
			}
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}
			return unmatched;
		};
	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}
compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];
	if ( !cached ) {
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
		cached.selector = selector;
	}
	return cached;
};
/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );
	results = results || [];
	if ( match.length === 1 ) {
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {
			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;
			} else if ( compiled ) {
				context = context.parentNode;
			}
			selector = selector.slice( tokens.shift().value.length );
		}
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}
					break;
				}
			}
		}
	}
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
support.detectDuplicates = !!hasDuplicate;
setDocument();
support.sortDetached = assert(function( el ) {
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}
return Sizzle;
})( window );
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;
var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;
	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};
var siblings = function( n, elem ) {
	var matched = [];
	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}
	return matched;
};
var rneedsContext = jQuery.expr.match.needsContext;
function nodeName( elem, name ) {
  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}
	return jQuery.filter( qualifier, elements, not );
}
jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];
	if ( not ) {
		expr = ":not(" + expr + ")";
	}
	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}
	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};
jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;
		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}
		ret = this.pushStack( [] );
		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}
		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );
var rootjQuery,
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;
		if ( !selector ) {
			return this;
		}
		root = root || rootjQuery;
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {
				match = [ null, selector, null ];
			} else {
				match = rquickExpr.exec( selector );
			}
			if ( match && ( match[ 1 ] || !context ) ) {
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}
					return this;
				} else {
					elem = document.getElementById( match[ 2 ] );
					if ( elem ) {
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );
			} else {
				return this.constructor( context ).find( selector );
			}
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :
				selector( jQuery );
		}
		return jQuery.makeArray( selector, this );
	};
init.prototype = jQuery.fn;
rootjQuery = jQuery( document );
var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};
jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;
		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},
	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {
						matched.push( cur );
						break;
					}
				}
			}
		}
		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},
	index: function( elem ) {
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}
		return indexOf.call( this,
			elem.jquery ? elem[ 0 ] : elem
		);
	},
	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},
	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );
function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}
jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }
        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );
		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}
		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}
		if ( this.length > 1 ) {
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}
		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}
/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );
	var // Flag to know if list is currently firing
		firing,
		memory,
		fired,
		locked,
		list = [],
		queue = [],
		firingIndex = -1,
		fire = function() {
			locked = locked || options.once;
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {
						firingIndex = list.length;
						memory = false;
					}
				}
			}
			if ( !options.memory ) {
				memory = false;
			}
			firing = false;
			if ( locked ) {
				if ( memory ) {
					list = [];
				} else {
					list = "";
				}
			}
		},
		self = {
			add: function() {
				if ( list ) {
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}
					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {
								add( arg );
							}
						} );
					} )( arguments );
					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			fired: function() {
				return !!fired;
			}
		};
	return self;
};
function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}
function adoptValue( value, resolve, reject, noValue ) {
	var method;
	try {
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );
		} else {
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}
	} catch ( value ) {
		reject.apply( undefined, [ value ] );
	}
}
jQuery.extend( {
	Deferred: function( func ) {
		var tuples = [
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;
									if ( depth < maxDepth ) {
										return;
									}
									returned = handler.apply( that, args );
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}
									then = returned &&
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;
									if ( isFunction( then ) ) {
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);
										} else {
											maxDepth++;
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}
									} else {
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}
										( special || deferred.resolveWith )( that, args );
									}
								},
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {
											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}
											if ( depth + 1 >= maxDepth ) {
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}
												deferred.rejectWith( that, args );
											}
										}
									};
							if ( depth ) {
								process();
							} else {
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}
					return jQuery.Deferred( function( newDefer ) {
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];
			promise[ tuple[ 1 ] ] = list.add;
			if ( stateString ) {
				list.add(
					function() {
						state = stateString;
					},
					tuples[ 3 - i ][ 2 ].disable,
					tuples[ 3 - i ][ 3 ].disable,
					tuples[ 0 ][ 2 ].lock,
					tuples[ 0 ][ 3 ].lock
				);
			}
			list.add( tuple[ 3 ].fire );
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );
		promise.promise( deferred );
		if ( func ) {
			func.call( deferred, deferred );
		}
		return deferred;
	},
	when: function( singleValue ) {
		var
			remaining = arguments.length,
			i = remaining,
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),
			master = jQuery.Deferred(),
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {
				return master.then();
			}
		}
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}
		return master.promise();
	}
} );
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
jQuery.Deferred.exceptionHook = function( error, stack ) {
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};
jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};
var readyList = jQuery.Deferred();
jQuery.fn.ready = function( fn ) {
	readyList
		.then( fn )
		.catch( function( error ) {
			jQuery.readyException( error );
		} );
	return this;
};
jQuery.extend( {
	isReady: false,
	readyWait: 1,
	ready: function( wait ) {
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}
		jQuery.isReady = true;
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}
		readyList.resolveWith( document, [ jQuery ] );
	}
} );
jQuery.ready.then = readyList.then;
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {
	window.setTimeout( jQuery.ready );
} else {
	document.addEventListener( "DOMContentLoaded", completed );
	window.addEventListener( "load", completed );
}
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}
	} else if ( value !== undefined ) {
		chainable = true;
		if ( !isFunction( value ) ) {
			raw = true;
		}
		if ( bulk ) {
			if ( raw ) {
				fn.call( elems, value );
				fn = null;
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}
		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}
	if ( chainable ) {
		return elems;
	}
	if ( bulk ) {
		return fn.call( elems );
	}
	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};
function Data() {
	this.expando = jQuery.expando + Data.uid++;
}
Data.uid = 1;
Data.prototype = {
	cache: function( owner ) {
		var value = owner[ this.expando ];
		if ( !value ) {
			value = {};
			if ( acceptData( owner ) ) {
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}
		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;
		} else {
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {
			return this.get( owner, key );
		}
		this.set( owner, key, value );
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];
		if ( cache === undefined ) {
			return;
		}
		if ( key !== undefined ) {
			if ( Array.isArray( key ) ) {
				key = key.map( camelCase );
			} else {
				key = camelCase( key );
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}
			i = key.length;
			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();
var dataUser = new Data();
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;
function getData( data ) {
	if ( data === "true" ) {
		return true;
	}
	if ( data === "false" ) {
		return false;
	}
	if ( data === "null" ) {
		return null;
	}
	if ( data === +data + "" ) {
		return +data;
	}
	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}
	return data;
}
function dataAttr( elem, key, data ) {
	var name;
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );
		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}
jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},
	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},
	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},
	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );
jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );
				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}
			return data;
		}
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}
		return access( this, function( value ) {
			var data;
			if ( elem && value === undefined ) {
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}
				return;
			}
			this.each( function() {
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},
	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );
jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;
		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},
	dequeue: function( elem, type ) {
		type = type || "fx";
		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}
		if ( fn ) {
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}
		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );
jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}
		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}
		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );
				jQuery._queueHooks( this, type );
				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};
		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";
		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;
var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );
var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
var isHiddenWithinTree = function( elem, el ) {
		elem = el || elem;
		return elem.style.display === "none" ||
			elem.style.display === "" &&
			jQuery.contains( elem.ownerDocument, elem ) &&
			jQuery.css( elem, "display" ) === "none";
	};
var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}
	ret = callback.apply( elem, args || [] );
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}
	return ret;
};
function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );
	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {
		initial = initial / 2;
		unit = unit || initialInUnit[ 3 ];
		initialInUnit = +initial || 1;
		while ( maxIterations-- ) {
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;
		}
		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );
		valueParts = valueParts || [];
	}
	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var defaultDisplayMap = {};
function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];
	if ( display ) {
		return display;
	}
	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );
	temp.parentNode.removeChild( temp );
	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;
	return display;
}
function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		display = elem.style.display;
		if ( show ) {
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";
				dataPriv.set( elem, "display", display );
			}
		}
	}
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}
	return elements;
}
jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}
		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );
var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );
var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	_default: [ 0, "", "" ]
};
wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;
function getAll( context, tag ) {
	var ret;
	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );
	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );
	} else {
		ret = [];
	}
	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}
	return ret;
}
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;
	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}
var rhtml = /<|&#?\w+;/;
function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;
	for ( ; i < l; i++ ) {
		elem = elems[ i ];
		if ( elem || elem === 0 ) {
			if ( toType( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}
				jQuery.merge( nodes, tmp.childNodes );
				tmp = fragment.firstChild;
				tmp.textContent = "";
			}
		}
	}
	fragment.textContent = "";
	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}
		contains = jQuery.contains( elem.ownerDocument, elem );
		tmp = getAll( fragment.appendChild( elem ), "script" );
		if ( contains ) {
			setGlobalEval( tmp );
		}
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}
	return fragment;
}
( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );
	div.appendChild( input );
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;
var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
function returnTrue() {
	return true;
}
function returnFalse() {
	return false;
}
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}
function on( elem, types, selector, data, fn, one ) {
	var origFn, type;
	if ( typeof types === "object" ) {
		if ( typeof selector !== "string" ) {
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}
	if ( data == null && fn == null ) {
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {
			fn = data;
			data = undefined;
		} else {
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}
	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}
/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {
	global: {},
	add: function( elem, types, handler, data, selector ) {
		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );
		if ( !elemData ) {
			return;
		}
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
			if ( !type ) {
				continue;
			}
			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			special = jQuery.event.special[ type ] || {};
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}
			if ( special.add ) {
				special.add.call( elem, handleObj );
				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}
			jQuery.event.global[ type ] = true;
		}
	},
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );
		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}
			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];
				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );
					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}
				delete events[ type ];
			}
		}
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},
	dispatch: function( nativeEvent ) {
		var event = jQuery.event.fix( nativeEvent );
		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};
		args[ 0 ] = event;
		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}
		event.delegateTarget = this;
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;
			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {
					event.handleObj = handleObj;
					event.data = handleObj.data;
					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );
					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}
		return event.result;
	},
	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;
		if ( delegateCount &&
			cur.nodeType &&
			!( event.type === "click" && event.button >= 1 ) ) {
			for ( ; cur !== this; cur = cur.parentNode || this ) {
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];
						sel = handleObj.selector + " ";
						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}
		return handlerQueue;
	},
	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,
			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},
			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},
	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},
	special: {
		load: {
			noBubble: true
		},
		focus: {
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},
		beforeunload: {
			postDispatch: function( event ) {
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};
jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};
jQuery.Event = function( src, props ) {
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				src.returnValue === false ?
			returnTrue :
			returnFalse;
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;
		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;
	} else {
		this.type = src;
	}
	if ( props ) {
		jQuery.extend( this, props );
	}
	this.timeStamp = src && src.timeStamp || Date.now();
	this[ jQuery.expando ] = true;
};
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,
	preventDefault: function() {
		var e = this.originalEvent;
		this.isDefaultPrevented = returnTrue;
		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;
		this.isPropagationStopped = returnTrue;
		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;
		this.isImmediatePropagationStopped = returnTrue;
		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}
		this.stopPropagation();
	}
};
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: function( event ) {
		var button = event.button;
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}
			if ( button & 2 ) {
				return 3;
			}
			if ( button & 4 ) {
				return 2;
			}
			return 0;
		}
		return event.which;
	}
}, jQuery.event.addProp );
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,
		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );
jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );
var
	/* eslint-disable max-len */
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
	/* eslint-enable */
	rnoInnerhtml = /<script|<style|<link/i,
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {
		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}
	return elem;
}
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}
function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	if ( dest.nodeType !== 1 ) {
		return;
	}
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;
		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};
			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );
		dataUser.set( dest, udataCur );
	}
}
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}
function domManip( collection, args, callback, ignored ) {
	args = concat.apply( [], args );
	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}
	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;
		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;
			for ( ; i < l; i++ ) {
				node = fragment;
				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );
					if ( hasScripts ) {
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}
				callback.call( collection[ i ], node, i );
			}
			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;
				jQuery.map( scripts, restoreScript );
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {
						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}
	return collection;
}
function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;
	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}
		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}
	return elem;
}
jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {
			destElements = getAll( clone );
			srcElements = getAll( elem );
			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );
				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}
		return clone;
	},
	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;
		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );
jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},
	remove: function( selector ) {
		return remove( this, selector );
	},
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},
	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},
	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},
	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},
	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},
	empty: function() {
		var elem,
			i = 0;
		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
				elem.textContent = "";
			}
		}
		return this;
	},
	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},
	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;
			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
				value = jQuery.htmlPrefilter( value );
				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}
					elem = 0;
				} catch ( e ) {}
			}
			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},
	replaceWith: function() {
		var ignored = [];
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;
			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}
		}, ignored );
	}
} );
jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;
		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );
			push.apply( ret, elems.get() );
		}
		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
var getStyles = function( elem ) {
		var view = elem.ownerDocument.defaultView;
		if ( !view || !view.opener ) {
			view = window;
		}
		return view.getComputedStyle( elem );
	};
var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );
( function() {
	function computeStyleTests() {
		if ( !div ) {
			return;
		}
		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );
		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";
		documentElement.removeChild( container );
		div = null;
	}
	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}
	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );
	if ( !div.style ) {
		return;
	}
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";
	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();
function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;
	computed = computed || getStyles( elem );
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}
	return ret !== undefined ?
		ret + "" :
		ret;
}
function addGetHookIf( conditionFn, hookFn ) {
	return {
		get: function() {
			if ( conditionFn() ) {
				delete this.get;
				return;
			}
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}
var
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;
function vendorPropName( name ) {
	if ( name in emptyStyle ) {
		return name;
	}
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;
	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}
function setPositiveNumber( elem, value, subtract ) {
	var matches = rcssNum.exec( value );
	return matches ?
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}
function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}
	for ( ; i < 4; i += 2 ) {
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}
		if ( !isBorderBox ) {
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}
	if ( !isBorderBox && computedVal >= 0 ) {
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}
	return delta;
}
function getWidthOrHeight( elem, dimension, extra ) {
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {
		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];
		valueIsBorderBox = true;
	}
	val = parseFloat( val ) || 0;
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,
			val
		)
	) + "px";
}
jQuery.extend( {
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},
	cssProps: {},
	style: function( elem, name, value, extra ) {
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
		if ( value !== undefined ) {
			type = typeof value;
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );
				type = "number";
			}
			if ( value == null || value !== value ) {
				return;
			}
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {
				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}
		} else {
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {
				return ret;
			}
			return style[ name ];
		}
	},
	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );
jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},
		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {
				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}
			return setPositiveNumber( elem, value, subtract );
		}
	};
} );
jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},
				parts = typeof value === "string" ? value.split( " " ) : [ value ];
			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}
			return expanded;
		}
	};
	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );
jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;
			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;
				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}
				return map;
			}
			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );
function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;
Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];
		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];
		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}
		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};
Tween.prototype.init.prototype = Tween.prototype;
Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}
			result = jQuery.css( tween.elem, tween.prop, "" );
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};
jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};
jQuery.fx = Tween.prototype.init;
jQuery.fx.step = {};
var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;
function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}
		jQuery.fx.tick();
	}
}
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}
	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}
	return attrs;
}
function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {
			return tween;
		}
	}
}
function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;
		anim.always( function() {
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}
	if ( isBox && elem.nodeType === 1 ) {
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}
	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}
	propTween = false;
	for ( prop in orig ) {
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				showHide( [ elem ], true );
			}
			/* eslint-disable no-loop-func */
			anim.done( function() {
			/* eslint-enable no-loop-func */
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}
function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}
		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}
		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}
function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;
			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}
			deferred.notifyWith( elem, [ animation, percent, remaining ] );
			if ( percent < 1 && length ) {
				return remaining;
			}
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;
	propFilter( props, animation.opts.specialEasing );
	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}
	jQuery.map( props, createTween, animation );
	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);
	return animation;
}
jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},
	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}
		var prop,
			index = 0,
			length = props.length;
		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},
	prefilters: [ defaultPrefilter ],
	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );
jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};
	if ( jQuery.fx.off ) {
		opt.duration = 0;
	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];
			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}
	opt.old = opt.complete;
	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}
		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};
	return opt;
};
jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;
		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};
		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}
		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );
			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;
			data.finish = true;
			jQuery.queue( this, type, [] );
			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}
			delete data.finish;
		} );
	}
} );
jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );
jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;
	fxNow = Date.now();
	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}
	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};
jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};
jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}
	inProgress = true;
	schedule();
};
jQuery.fx.stop = function() {
	inProgress = null;
};
jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	_default: 400
};
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";
	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};
( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );
	input.type = "checkbox";
	support.checkOn = input.value !== "";
	support.optSelected = opt.selected;
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();
var boolHook,
	attrHandle = jQuery.expr.attrHandle;
jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},
	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );
jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}
		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}
			elem.setAttribute( name, value + "" );
			return value;
		}
		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}
		ret = jQuery.find.attr( elem, name );
		return ret == null ? undefined : ret;
	},
	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},
	removeAttr: function( elem, value ) {
		var name,
			i = 0,
			attrNames = value && value.match( rnothtmlwhite );
		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;
	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();
		if ( !isXML ) {
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );
var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;
jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},
	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );
jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}
		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}
			return ( elem[ name ] = value );
		}
		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}
		return elem[ name ];
	},
	propHooks: {
		tabIndex: {
			get: function( elem ) {
				var tabindex = jQuery.find.attr( elem, "tabindex" );
				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}
				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}
				return -1;
			}
		}
	},
	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			/* eslint no-unused-expressions: "off" */
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			/* eslint no-unused-expressions: "off" */
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}
jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}
function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}
function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}
jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;
		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}
		classes = classesToArray( value );
		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );
				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}
		return this;
	},
	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;
		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}
		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}
		classes = classesToArray( value );
		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );
				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}
		return this;
	},
	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );
		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}
		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}
		return this.each( function() {
			var className, i, self, classNames;
			if ( isValidValue ) {
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );
				while ( ( className = classNames[ i++ ] ) ) {
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {
					dataPriv.set( this, "__className__", className );
				}
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},
	hasClass: function( selector ) {
		var className, elem,
			i = 0;
		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}
		return false;
	}
} );
var rreturn = /\r/g;
jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];
		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];
				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}
				ret = elem.value;
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}
				return ret == null ? "" : ret;
			}
			return;
		}
		valueIsFunction = isFunction( value );
		return this.each( function( i ) {
			var val;
			if ( this.nodeType !== 1 ) {
				return;
			}
			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}
			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );
jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;
				if ( index < 0 ) {
					i = max;
				} else {
					i = one ? index : 0;
				}
				for ( ; i < max; i++ ) {
					option = options[ i ];
					if ( ( option.selected || i === index ) &&
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {
						value = jQuery( option ).val();
						if ( one ) {
							return value;
						}
						values.push( value );
					}
				}
				return values;
			},
			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;
				while ( i-- ) {
					option = options[ i ];
					/* eslint-disable no-cond-assign */
					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
					/* eslint-enable no-cond-assign */
				}
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );
support.focusin = "onfocusin" in window;
var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};
jQuery.extend( jQuery.event, {
	trigger: function( event, data, elem, onlyHandlers ) {
		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];
		cur = lastElement = tmp = elem = elem || document;
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}
		if ( type.indexOf( "." ) > -1 ) {
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {
			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {
			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {
					tmp = elem[ ontype ];
					if ( tmp ) {
						elem[ ontype ] = null;
					}
					jQuery.event.triggered = type;
					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}
					elem[ type ]();
					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}
					jQuery.event.triggered = undefined;
					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}
		return event.result;
	},
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);
		jQuery.event.trigger( e, null, elem );
	}
} );
jQuery.fn.extend( {
	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};
		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );
				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;
				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );
				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;
var nonce = Date.now();
var rquery = ( /\?/ );
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};
var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;
function buildParams( prefix, obj, traditional, add ) {
	var name;
	if ( Array.isArray( obj ) ) {
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				add( prefix, v );
			} else {
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );
	} else if ( !traditional && toType( obj ) === "object" ) {
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}
	} else {
		add( prefix, obj );
	}
}
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;
			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );
	} else {
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}
	return s.join( "&" );
};
jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();
			if ( val == null ) {
				return null;
			}
			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}
			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );
var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},
	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},
	allTypes = "*/".concat( "*" ),
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;
function addToPrefiltersOrTransports( structure ) {
	return function( dataTypeExpression, func ) {
		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}
		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];
		if ( isFunction( func ) ) {
			while ( ( dataType = dataTypes[ i++ ] ) ) {
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	var inspected = {},
		seekingTransport = ( structure === transports );
	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}
	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
	return target;
}
/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		finalDataType = finalDataType || firstDataType;
	}
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}
/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		dataTypes = s.dataTypes.slice();
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}
	current = dataTypes.shift();
	while ( current ) {
		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}
		prev = current;
		current = dataTypes.shift();
		if ( current ) {
			if ( current === "*" ) {
				current = prev;
			} else if ( prev !== "*" && prev !== current ) {
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];
				if ( !conv ) {
					for ( conv2 in converters ) {
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								if ( conv === true ) {
									conv = converters[ conv2 ];
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}
				if ( conv !== true ) {
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}
	return { state: "success", data: response };
}
jQuery.extend( {
	active: 0,
	lastModified: {},
	etag: {},
	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/
		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},
		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},
		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},
		converters: {
			"* text": String,
			"text html": true,
			"text json": JSON.parse,
			"text xml": jQuery.parseXML
		},
		flatOptions: {
			url: true,
			context: true
		}
	},
	ajaxSetup: function( target, settings ) {
		return settings ?
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
			ajaxExtend( jQuery.ajaxSettings, target );
	},
	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),
	ajax: function( url, options ) {
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}
		options = options || {};
		var transport,
			cacheURL,
			responseHeadersString,
			responseHeaders,
			timeoutTimer,
			urlAnchor,
			completed,
			fireGlobals,
			i,
			uncached,
			s = jQuery.ajaxSetup( {}, options ),
			callbackContext = s.context || s,
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			statusCode = s.statusCode || {},
			requestHeaders = {},
			requestHeadersNames = {},
			strAbort = "canceled",
			jqXHR = {
				readyState: 0,
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {
							jqXHR.always( map[ jqXHR.status ] );
						} else {
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};
		deferred.promise( jqXHR );
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );
		s.type = options.method || options.type || s.method || s.type;
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );
			try {
				urlAnchor.href = s.url;
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {
				s.crossDomain = true;
			}
		}
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
		if ( completed ) {
			return jqXHR;
		}
		fireGlobals = jQuery.event && s.global;
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}
		s.type = s.type.toUpperCase();
		s.hasContent = !rnoContent.test( s.type );
		cacheURL = s.url.replace( rhash, "" );
		if ( !s.hasContent ) {
			uncached = s.url.slice( cacheURL.length );
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;
				delete s.data;
			}
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}
			s.url = cacheURL + uncached;
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {
			return jqXHR.abort();
		}
		strAbort = "abort";
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			if ( completed ) {
				return jqXHR;
			}
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}
			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				if ( completed ) {
					throw e;
				}
				done( -1, e );
			}
		}
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;
			if ( completed ) {
				return;
			}
			completed = true;
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}
			transport = undefined;
			responseHeadersString = headers || "";
			jqXHR.readyState = status > 0 ? 4 : 0;
			isSuccess = status >= 200 && status < 300 || status === 304;
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}
			response = ajaxConvert( s, response, jqXHR, isSuccess );
			if ( isSuccess ) {
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";
				} else if ( status === 304 ) {
					statusText = "notmodified";
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}
			jqXHR.statusCode( statusCode );
			statusCode = undefined;
			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}
		return jqXHR;
	},
	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},
	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );
jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );
jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};
jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;
		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}
			wrap.map( function() {
				var elem = this;
				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}
				return elem;
			} ).append( this );
		}
		return this;
	},
	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}
		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();
			if ( contents.length ) {
				contents.wrapAll( html );
			} else {
				self.append( html );
			}
		} );
	},
	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );
		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},
	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );
jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};
jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};
var xhrSuccessStatus = {
		0: 200,
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;
jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();
				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;
							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {
						if ( xhr.readyState === 4 ) {
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}
				callback = callback( "abort" );
				try {
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					if ( callback ) {
						throw e;
					}
				}
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );
jQuery.ajaxTransport( "script", function( s ) {
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};
		s.dataTypes[ 0 ] = "json";
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};
		jqXHR.always( function() {
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );
			} else {
				window[ callbackName ] = overwritten;
			}
			if ( s[ callbackName ] ) {
				s.jsonpCallback = originalSettings.jsonpCallback;
				oldCallbacks.push( callbackName );
			}
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}
			responseContainer = overwritten = undefined;
		} );
		return "script";
	}
} );
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	var base, parsed, scripts;
	if ( !context ) {
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}
	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}
	parsed = buildFragment( [ data ], context, scripts );
	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}
	return jQuery.merge( [], parsed.childNodes );
};
/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );
	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}
	if ( isFunction( params ) ) {
		callback = params;
		params = undefined;
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {
			response = arguments;
			self.html( selector ?
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :
				responseText );
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}
	return this;
};
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );
jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};
jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};
		if ( position === "static" ) {
			elem.style.position = "relative";
		}
		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}
		if ( isFunction( options ) ) {
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}
		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}
		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};
jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}
		var rect, win,
			elem = this[ 0 ];
		if ( !elem ) {
			return;
		}
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}
		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			offset = elem.getBoundingClientRect();
		} else {
			offset = this.offset();
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;
			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;
	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}
			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}
			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);
			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
			return access( this, function( elem, type, value ) {
				var doc;
				if ( isWindow( elem ) ) {
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}
				return value === undefined ?
					jQuery.css( elem, type, extra ) :
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );
jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );
jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );
jQuery.fn.extend( {
	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},
	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;
	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}
	if ( !isFunction( fn ) ) {
		return undefined;
	}
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	return proxy;
};
jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;
jQuery.now = Date.now;
jQuery.isNumeric = function( obj ) {
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&
		!isNaN( obj - parseFloat( obj ) );
};
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}
var
	_jQuery = window.jQuery,
	_$ = window.$;
jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}
	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}
	return jQuery;
};
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}
return jQuery;
} );

(function(factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
})(function ($) {
  'namespace sumo';
  $.fn.SumoSelect = function (options) {
    /* This is the easiest way to have default options.*/
    var settings = $.extend({
      placeholder: 'Select Here',   /* Dont change it here.*/
      csvDispCount: 3,              /* display no. of items in multiselect. 0 to display all.*/
      captionFormat:'{0} Selected', /* format of caption text. you can set your locale.*/
      captionFormatAllSelected:'{0} all selected!', /* format of caption text when all elements are selected. set null to use captionFormat. It will not work if there are disabled elements in select.*/
      floatWidth: 400,              /* Screen width of device at which the list is rendered in floating popup fashion.*/
      forceCustomRendering: false,  /* force the custom modal on all devices below floatWidth resolution.*/
      nativeOnDevice: ['Android', 'BlackBerry', 'iPhone', 'iPad', 'iPod', 'Opera Mini', 'IEMobile', 'Silk'],
      outputAsCSV: false,           /* true to POST data as csv ( false for Html control array ie. default select )*/
      csvSepChar: ',',              /* separation char in csv mode*/
      okCancelInMulti: false,       /* display ok cancel buttons in desktop mode multiselect also.*/
      isClickAwayOk: false,         /* for okCancelInMulti=true. sets whether click outside will trigger Ok or Cancel (default is cancel).*/
      triggerChangeCombined: true,  /* im multi select mode whether to trigger change event on individual selection or combined selection.*/
      selectAll: false,             /* to display select all button in multiselect mode.|| also select all will not be available on mobile devices.*/
      search: false,                /* to display input for filtering content. selectAlltext will be input text placeholder*/
      searchText: 'Search...',      /* placeholder for search input*/
      noMatch: 'No matches for "{0}"',
      prefix: '',                   /* some prefix usually the field name. eg. '<b>Hello</b>'*/
      locale: ['OK', 'Cancel', 'Select All'],  /* all text that is used. don't change the index.*/
      up: false,                    /* set true to open upside.*/
      showTitle: true               /* set to false to prevent title (tooltip) from appearing*/
    }, options);
    var ret = this.each(function () {
      var selObj = this; /* the original select object.*/
      if (this.sumo || !$(this).is('select')) return; /* already initialized*/
      this.sumo = {
        E: $(selObj), /* the jquery object of original select element.*/
        is_multi: $(selObj).attr('multiple'),  /* if its a multiple select*/
        select: '',
        caption: '',
        placeholder: '',
        optDiv: '',
        CaptionCont: '',
        ul:'',
        is_floating: false,
        is_opened: false,
        /* backdrop: '', */
        mob:false, /* if to open device default select */
        Pstate: [],
        createElems: function () {
          var O = this;
          O.E.wrap('<div class="SumoSelect" tabindex="0" role="button" aria-expanded="false">');
          O.select = O.E.parent();
          O.caption = $('<span>');
          O.CaptionCont = $('<p class="CaptionCont SelectBox" ><label><i></i></label></p>')
            .attr('style', O.E.attr('style'))
            .prepend(O.caption);
          O.select.append(O.CaptionCont);
          /* default turn off if no multiselect */
          if(!O.is_multi)settings.okCancelInMulti = false
          if(O.E.attr('disabled'))
            O.select.addClass('disabled').removeAttr('tabindex');
          /* if output as csv and is a multiselect.*/
          if (settings.outputAsCSV && O.is_multi && O.E.attr('name')) {
            /* create a hidden field to store csv value.*/
            O.select.append($('<input class="HEMANT123" type="hidden" />').attr('name', O.E.attr('name')).val(O.getSelStr()));
            /* so it can not post the original select.*/
            O.E.removeAttr('name');
          }
          /* break for mobile rendring.. if forceCustomRendering is false*/
          if (O.isMobile() && !settings.forceCustomRendering) {
            O.setNativeMobile();
            return;
          }
          /* if there is a name attr in select add a class to container div*/
          if(O.E.attr('name')) O.select.addClass('sumo_'+O.E.attr('name').replace(/\[\]/, ''))
          /* hide original select */
          O.E.addClass('SumoUnder').attr('tabindex','-1');
          /* Creating the list... */
          O.optDiv = $('<div class="optWrapper '+ (settings.up?'up':'') +'">');
          /* branch for floating list in low res devices.*/
          O.floatingList();
          /* Creating the markup for the available options*/
          O.ul = $('<ul class="options">');
          O.optDiv.append(O.ul);
          /* Select all functionality*/
          if(settings.selectAll && O.is_multi) O.SelAll();
          /* search functionality*/
          if(settings.search) O.Search();
          O.ul.append(O.prepItems(O.E.children()));
          /* if multiple then add the class multiple and add OK / CANCEL button */
          if (O.is_multi) O.multiSelelect();
          O.select.append(O.optDiv);
          O.basicEvents();
          O.selAllState();
        },
        prepItems: function(opts, d){
          var lis = [], O=this;
          $(opts).each(function (i, opt) { /* parsing options to li */
            opt = $(opt);
            lis.push(opt.is('optgroup')?
              $('<li class="group '+ (opt[0].disabled?'disabled':'') +'"><label>' + opt.attr('label') +'</label><ul></ul></li>')
                .find('ul')
                .append(O.prepItems(opt.children(), opt[0].disabled))
                .end()
              :
              O.createLi(opt, d)
            );
          });
          return lis;
        },
        /* Creates a LI element from a given option and binds events to it*/
        /*returns the jquery instance of li (not inserted in dom)*/
        createLi: function (opt, d) {
          var O = this;
          if(!opt.attr('value'))opt.attr('value',opt.val());
          var li = $('<li class="opt"><label>' + opt.text() + '</label></li>');
          li.data('opt', opt); /* store a direct reference to option.*/
          opt.data('li', li); /* store a direct reference to list item.*/
          if (O.is_multi) li.prepend('<span><i></i></span>');
          if (opt[0].disabled || d)
            li = li.addClass('disabled');
          O.onOptClick(li);
          if (opt[0].selected)
            li.addClass('selected');
          if (opt.attr('class'))
            li.addClass(opt.attr('class'));
          if (opt.attr('title'))
            li.attr('title', opt.attr('title'));
          return li;
        },
        /* Returns the selected items as string in a Multiselect.*/
        getSelStr: function () {
          /* get the pre selected items.*/
          sopt = [];
          this.E.find('option:selected').each(function () { sopt.push($(this).val()); });
          return sopt.join(settings.csvSepChar);
        },
        /* THOSE OK/CANCEL BUTTONS ON MULTIPLE SELECT.*/
        multiSelelect: function () {
          var O = this;
          O.optDiv.addClass('multiple');
          O.okbtn = $('<p tabindex="0" class="btnOk">'+settings.locale[0]+'</p>').click(function () {
            /* if combined change event is set.*/
            O._okbtn();
            O.hideOpts();
          });
          O.cancelBtn = $('<p tabindex="0" class="btnCancel">'+settings.locale[1]+'</p>').click(function () {
            O._cnbtn();
            O.hideOpts();
          });
          var btns = O.okbtn.add(O.cancelBtn);
          O.optDiv.append($('<div class="MultiControls">').append(btns));
          /* handling keyboard navigation on ok cancel buttons. */
          btns.on('keydown.sumo', function (e) {
            var el = $(this);
            switch (e.which) {
              case 32: /* space */
              case 13: /* enter */
                el.trigger('click');
                break;
              case 9:  /* tab */
                if(el.hasClass('btnOk'))return;
              case 27: /* esc */
                O._cnbtn();
                O.hideOpts();
                return;
            }
            e.stopPropagation();
            e.preventDefault();
          });
        },
        _okbtn:function(){
          var O = this, cg = 0;
          /* if combined change event is set. */
          if (settings.triggerChangeCombined) {
            /* check for a change in the selection. */
            if (O.E.find('option:selected').length != O.Pstate.length) {
              cg = 1;
            }
            else {
              O.E.find('option').each(function (i,e) {
                if(e.selected && O.Pstate.indexOf(i) < 0) cg = 1;
              });
            }
            if (cg) {
              O.callChange();
              O.setText();
            }
          }
        },
        _cnbtn:function(){
          var O = this;
          /* remove all selections */
          O.E.find('option:selected').each(function () { this.selected = false; });
          O.optDiv.find('li.selected').removeClass('selected')
          /* restore selections from saved state. */
          for(var i = 0; i < O.Pstate.length; i++) {
            O.E.find('option')[O.Pstate[i]].selected = true;
            O.ul.find('li.opt').eq(O.Pstate[i]).addClass('selected');
          }
          O.selAllState();
        },
        SelAll:function(){
          var O = this;
          if(!O.is_multi)return;
          O.selAll = $('<p class="select-all"><span><i></i></span><label>' + settings.locale[2] + '</label></p>');
          O.optDiv.addClass('selall');
          O.selAll.on('click',function(){
            O.selAll.toggleClass('selected');
            O.toggSelAll(O.selAll.hasClass('selected'), 1);
          });
          O.optDiv.prepend(O.selAll);
        },
        /* search module (can be removed if not required.) */
        Search: function(){
          var O = this,
            cc = O.CaptionCont.addClass('search'),
            P = $('<p class="no-match">');
          O.ftxt = $('<input type="text" class="search-txt" value="" placeholder="' + settings.searchText + '">')
            .on('click', function(e){
              e.stopPropagation();
            });
          cc.append(O.ftxt);
          O.optDiv.children('ul').after(P);
          O.ftxt.on('keyup.sumo',function(){
            var hid = O.optDiv.find('ul.options li.opt').each(function(ix,e){
              var e = $(e),
                opt = e.data('opt')[0];
              opt.hidden = e.text().toLowerCase().indexOf(O.ftxt.val().toLowerCase()) < 0;
              e.toggleClass('hidden', opt.hidden);
            }).not('.hidden');
            P.html(settings.noMatch.replace(/\{0\}/g, '<em></em>')).toggle(!hid.length);
            P.find('em').text(O.ftxt.val());
            O.selAllState();
          });
        },
        selAllState: function () {
          var O = this;
          if (settings.selectAll && O.is_multi) {
            var sc = 0, vc = 0;
            O.optDiv.find('li.opt').not('.hidden').each(function (ix, e) {
              if ($(e).hasClass('selected')) sc++;
              if (!$(e).hasClass('disabled')) vc++;
            });
            /* select all checkbox state change. */
            if (sc == vc) O.selAll.removeClass('partial').addClass('selected');
            else if (sc == 0) O.selAll.removeClass('selected partial');
            else O.selAll.addClass('partial') /* .removeClass('selected'); */
          }
        },
        showOpts: function () {
          var O = this;
          if (O.E.attr('disabled')) return; /* if select is disabled then retrun */
          O.E.trigger('sumo:opening', O);
          O.is_opened = true;
          O.select.addClass('open').attr('aria-expanded', 'true');
          O.E.trigger('sumo:opened', O);
          if(O.ftxt)O.ftxt.focus();
          else O.select.focus();
          /* hide options on click outside.*/
          $(document).on('click.sumo', function (e) {
            if (!O.select.is(e.target)                  /* if the target of the click isn't the container... */
              && O.select.has(e.target).length === 0){ /* ... nor a descendant of the container */
              if(!O.is_opened)return;
              O.hideOpts();
              if (settings.okCancelInMulti){
                if(settings.isClickAwayOk)
                  O._okbtn();
                else
                  O._cnbtn();
              }
            }
          });
          if (O.is_floating) {
            H = O.optDiv.children('ul').outerHeight() + 2;  /* +2 is clear fix*/
            if (O.is_multi) H = H + parseInt(O.optDiv.css('padding-bottom'));
            O.optDiv.css('height', H);
            $('body').addClass('sumoStopScroll');
          }
          O.setPstate();
        },
        /* maintain state when ok/cancel buttons are available storing the indexes. */
        setPstate: function(){
          var O = this;
          if (O.is_multi && (O.is_floating || settings.okCancelInMulti)){
            O.Pstate = [];
            /* assuming that find returns elements in tree order */
            O.E.find('option').each(function (i, e){if(e.selected) O.Pstate.push(i);});
          }
        },
        callChange:function(){
          this.E.trigger('change').trigger('click');
        },
        hideOpts: function () {
          var O = this;
          if(O.is_opened){
            O.E.trigger('sumo:closing', O);
            O.is_opened = false;
            O.select.removeClass('open').attr('aria-expanded', 'true').find('ul li.sel').removeClass('sel');
            O.E.trigger('sumo:closed', O);
            $(document).off('click.sumo');
            O.select.focus();
            $('body').removeClass('sumoStopScroll');
            /* clear the search */
            if(settings.search){
              O.ftxt.val('');
              O.ftxt.trigger('keyup.sumo');
            }
          }
        },
        setOnOpen: function () {
          var O = this,
            li = O.optDiv.find('li.opt:not(.hidden)').eq(settings.search?0:O.E[0].selectedIndex);
          if(li.hasClass('disabled')){
            li = li.next(':not(disabled)')
            if(!li.length) return;
          }
          O.optDiv.find('li.sel').removeClass('sel');
          li.addClass('sel');
          O.showOpts();
        },
        nav: function (up) {
          var O = this, c,
            s=O.ul.find('li.opt:not(.disabled, .hidden)'),
            sel = O.ul.find('li.opt.sel:not(.hidden)'),
            idx = s.index(sel);
          if (O.is_opened && sel.length) {
            if (up && idx > 0)
              c = s.eq(idx-1);
            else if(!up && idx < s.length-1 && idx > -1)
              c = s.eq(idx+1);
            else return; /* if no items before or after*/
            sel.removeClass('sel');
            sel = c.addClass('sel');
            /* setting sel item to visible view. */
            var ul = O.ul,
              st = ul.scrollTop(),
              t = sel.position().top + st;
            if(t >= st + ul.height()-sel.outerHeight())
              ul.scrollTop(t - ul.height() + sel.outerHeight());
            if(t<st)
              ul.scrollTop(t);
          }
          else
            O.setOnOpen();
        },
        basicEvents: function () {
          var O = this;
          O.CaptionCont.click(function (evt) {
            O.E.trigger('click');
            if (O.is_opened) O.hideOpts(); else O.showOpts();
            evt.stopPropagation();
          });
          O.select.on('keydown.sumo', function (e) {
            switch (e.which) {
              case 38: /* up */
                O.nav(true);
                break;
              case 40: /* down */
                O.nav(false);
                break;
              case 65: /* shortcut ctrl + a to select all and ctrl + shift + a to unselect all.*/
                if (O.is_multi && e.ctrlKey){
                  O.toggSelAll(!e.shiftKey, 1);
                  break;
                }
                else
                  return;
              case 32: /* space*/
                if(settings.search && O.ftxt.is(e.target))return;
              case 13: /* enter*/
                if (O.is_opened)
                  O.optDiv.find('ul li.sel').trigger('click');
                else
                  O.setOnOpen();
                break;
              case 9:	 /* tab*/
                if(!settings.okCancelInMulti)
                  O.hideOpts();
                return;
              case 27: /* esc*/
                if(settings.okCancelInMulti)O._cnbtn();
                O.hideOpts();
                return;
              default:
                return; /* exit this handler for other keys */
            }
            e.preventDefault(); /* prevent the default action (scroll / move caret) */
          });
          $(window).on('resize.sumo', function () {
            O.floatingList();
          });
        },
        onOptClick: function (li) {
          var O = this;
          li.click(function () {
            var li = $(this);
            if(li.hasClass('disabled'))return;
            var txt = "";
            if (O.is_multi) {
              li.toggleClass('selected');
              li.data('opt')[0].selected = li.hasClass('selected');
              O.selAllState();
            }
            else {
              li.parent().find('li.selected').removeClass('selected'); //if not multiselect then remove all selections from this list
              li.toggleClass('selected');
              li.data('opt')[0].selected = true;
            }
            if (!(O.is_multi && settings.triggerChangeCombined && (O.is_floating || settings.okCancelInMulti))) {
              O.setText();
              O.callChange();
            }
            if (!O.is_multi) O.hideOpts(); //if its not a multiselect then hide on single select.
          });
        },
        setText: function () {
          var O = this;
          O.placeholder = "";
          if (O.is_multi) {
            sels = O.E.find(':selected').not(':disabled'); //selected options.
            for (i = 0; i < sels.length; i++) {
              if (i + 1 >= settings.csvDispCount && settings.csvDispCount) {
                if (sels.length == O.E.find('option').length && settings.captionFormatAllSelected) {
                  O.placeholder = settings.captionFormatAllSelected.replace(/\{0\}/g, sels.length)+',';
                } else {
                  O.placeholder = settings.captionFormat.replace(/\{0\}/g, sels.length)+',';
                }
                break;
              }
              else O.placeholder += $(sels[i]).text() + ", ";
            }
            O.placeholder = O.placeholder.replace(/,([^,]*)$/, '$1'); //remove unexpected "," from last.
          }
          else {
            O.placeholder = O.E.find(':selected').not(':disabled').text();
          }
          var is_placeholder = false;
          if (!O.placeholder) {
            is_placeholder = true;
            O.placeholder = O.E.attr('placeholder');
            if (!O.placeholder)                  //if placeholder is there then set it
              O.placeholder = O.E.find('option:disabled:selected').text();
          }
          O.placeholder = O.placeholder ? (settings.prefix + ' ' + O.placeholder) : settings.placeholder
          O.caption.html(O.placeholder);
          if (settings.showTitle) O.CaptionCont.attr('title', O.placeholder);
          var csvField = O.select.find('input.HEMANT123');
          if (csvField.length) csvField.val(O.getSelStr());
          if (is_placeholder) O.caption.addClass('placeholder'); else O.caption.removeClass('placeholder');
          return O.placeholder;
        },
        isMobile: function () {
          /* Adapted from http://www.detectmobilebrowsers.com */
          var ua = navigator.userAgent || navigator.vendor || window.opera;
          /* Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices */
          for (var i = 0; i < settings.nativeOnDevice.length; i++) if (ua.toString().toLowerCase().indexOf(settings.nativeOnDevice[i].toLowerCase()) > 0) return settings.nativeOnDevice[i];
          return false;
        },
        setNativeMobile: function () {
          var O = this;
          O.E.addClass('SelectClass'); /* .css('height', O.select.outerHeight()); */
          O.mob = true;
          O.E.change(function () {
            O.setText();
          });
        },
        floatingList: function () {
          var O = this;
          /*called on init and also on resize.*/
          /*O.is_floating = true if window width is < specified float width*/
          O.is_floating = $(window).width() <= settings.floatWidth;
          /*set class isFloating*/
          O.optDiv.toggleClass('isFloating', O.is_floating);
          /*remove height if not floating*/
          if (!O.is_floating) O.optDiv.css('height', '');
          /*toggle class according to okCancelInMulti flag only when it is not floating*/
          O.optDiv.toggleClass('okCancelInMulti', settings.okCancelInMulti && !O.is_floating);
        },
        /* HELPERS FOR OUTSIDERS*/
        /* validates range of given item operations*/
        vRange: function (i) {
          var O = this;
          var opts = O.E.find('option');
          if (opts.length <= i || i < 0) throw "index out of bounds"
          return O;
        },
        /*toggles selection on c as boolean.*/
        toggSel: function (c, i) {
          var O = this;
          var opt;
          if (typeof(i) === "number"){
            O.vRange(i);
            opt = O.E.find('option')[i];
          }
          else{
            opt = O.E.find('option[value="'+i+'"]')[0]||0;
          }
          if (!opt || opt.disabled)
            return;
          if(opt.selected != c){
            opt.selected = c;
            if(!O.mob) $(opt).data('li').toggleClass('selected',c);
            O.callChange();
            O.setPstate();
            O.setText();
            O.selAllState();
          }
        },
        /*toggles disabled on c as boolean.*/
        toggDis: function (c, i) {
          var O = this.vRange(i);
          O.E.find('option')[i].disabled = c;
          if(c)O.E.find('option')[i].selected = false;
          if(!O.mob)O.optDiv.find('ul.options li').eq(i).toggleClass('disabled', c).removeClass('selected');
          O.setText();
        },
        /* toggle disable/enable on complete select control*/
        toggSumo: function(val) {
          var O = this;
          O.enabled = val;
          O.select.toggleClass('disabled', val);
          if (val) {
            O.E.attr('disabled', 'disabled');
            O.select.removeAttr('tabindex');
          }
          else{
            O.E.removeAttr('disabled');
            O.select.attr('tabindex','0');
          }
          return O;
        },
        /* toggles all option on c as boolean.*/
        /* set direct=false/0 bypasses okCancelInMulti behaviour.*/
        toggSelAll: function (c, direct) {
          var O = this;
          O.E.find('option:not(:disabled,:hidden)')
           .each(function(ix,e){
             var is_selected=e.selected,
               e = $(e).data('li');
             if(e.hasClass('hidden'))return;
             if(!!c){
               if(!is_selected)e.trigger('click');
             }
             else{
               if(is_selected)e.trigger('click');
             }
           });
          if(!direct){
            if(!O.mob && O.selAll)O.selAll.removeClass('partial').toggleClass('selected',!!c);
            O.callChange();
            O.setText();
            O.setPstate();
          }
        },
        /* outside accessibility options
         which can be accessed from the element instance.
         */
        reload:function(){
          var elm = this.unload();
          return $(elm).SumoSelect(settings);
        },
        unload: function () {
          var O = this;
          O.select.before(O.E);
          O.E.show();
          if (settings.outputAsCSV && O.is_multi && O.select.find('input.HEMANT123').length) {
            O.E.attr('name', O.select.find('input.HEMANT123').attr('name')); /* restore the name; */
          }
          O.select.remove();
          delete selObj.sumo;
          return selObj;
        },
        /* add a new option to select at a given index.*/
        add: function (val, txt, i) {
          if (typeof val == "undefined") throw "No value to add"
          var O = this;
          opts=O.E.find('option')
          if (typeof txt == "number") { i = txt; txt = val; }
          if (typeof txt == "undefined") { txt = val; }
          opt = $("<option></option>").val(val).html(txt);
          if (opts.length < i) throw "index out of bounds"
          if (typeof i == "undefined" || opts.length == i) { /* add it to the last if given index is last no or no index provides.*/
            O.E.append(opt);
            if(!O.mob)O.ul.append(O.createLi(opt));
          }
          else {
            opts.eq(i).before(opt);
            if(!O.mob)O.ul.find('li.opt').eq(i).before(O.createLi(opt));
          }
          return selObj;
        },
        /* removes an item at a given index. */
        remove: function (i) {
          var O = this.vRange(i);
          O.E.find('option').eq(i).remove();
          if(!O.mob)O.optDiv.find('ul.options li').eq(i).remove();
          O.setText();
        },
        /* Select an item at a given index.*/
        selectItem: function (i) { this.toggSel(true, i); },
        /* UnSelect an iten at a given index.*/
        unSelectItem: function (i) { this.toggSel(false, i); },
        /* Select all items  of the select.*/
        selectAll: function () { this.toggSelAll(true); },
        /* UnSelect all items of the select.*/
        unSelectAll: function () { this.toggSelAll(false); },
        /* Disable an iten at a given index.*/
        disableItem: function (i) { this.toggDis(true, i) },
        /* Removes disabled an iten at a given index.*/
        enableItem: function (i) { this.toggDis(false, i) },
        /* New simple methods as getter and setter are not working fine in ie8-*/
        /* variable to check state of control if enabled or disabled.*/
        enabled : true,
        /* Enables the control*/
        enable: function(){return this.toggSumo(false)},
        /* Disables the control*/
        disable: function(){return this.toggSumo(true)},
        init: function () {
          var O = this;
          O.createElems();
          O.setText();
          return O
        }
      };
      selObj.sumo.init();
    });
    return ret.length == 1 ? ret[0] : ret;
  };
});
/*! jQuery Mobile v1.3.2 | Copyright 2010, 2013 jQuery Foundation, Inc. | jquery.org/license */
(function(e,t,n){typeof define=="function"&&define.amd?define(["jquery"],function(r){return n(r,e,t),r.mobile}):n(e.jQuery,e,t)})(this,document,function(e,t,n,r){(function(e,t,n,r){function x(e){while(e&&typeof e.originalEvent!="undefined")e=e.originalEvent;return e}function T(t,n){var i=t.type,s,o,a,l,c,h,p,d,v;t=e.Event(t),t.type=n,s=t.originalEvent,o=e.event.props,i.search(/^(mouse|click)/)>-1&&(o=f);if(s)for(p=o.length,l;p;)l=o[--p],t[l]=s[l];i.search(/mouse(down|up)|click/)>-1&&!t.which&&(t.which=1);if(i.search(/^touch/)!==-1){a=x(s),i=a.touches,c=a.changedTouches,h=i&&i.length?i[0]:c&&c.length?c[0]:r;if(h)for(d=0,v=u.length;d<v;d++)l=u[d],t[l]=h[l]}return t}function N(t){var n={},r,s;while(t){r=e.data(t,i);for(s in r)r[s]&&(n[s]=n.hasVirtualBinding=!0);t=t.parentNode}return n}function C(t,n){var r;while(t){r=e.data(t,i);if(r&&(!n||r[n]))return t;t=t.parentNode}return null}function k(){g=!1}function L(){g=!0}function A(){E=0,v.length=0,m=!1,L()}function O(){k()}function M(){_(),c=setTimeout(function(){c=0,A()},e.vmouse.resetTimerDuration)}function _(){c&&(clearTimeout(c),c=0)}function D(t,n,r){var i;if(r&&r[t]||!r&&C(n.target,t))i=T(n,t),e(n.target).trigger(i);return i}function P(t){var n=e.data(t.target,s);if(!m&&(!E||E!==n)){var r=D("v"+t.type,t);r&&(r.isDefaultPrevented()&&t.preventDefault(),r.isPropagationStopped()&&t.stopPropagation(),r.isImmediatePropagationStopped()&&t.stopImmediatePropagation())}}function H(t){var n=x(t).touches,r,i;if(n&&n.length===1){r=t.target,i=N(r);if(i.hasVirtualBinding){E=w++,e.data(r,s,E),_(),O(),d=!1;var o=x(t).touches[0];h=o.pageX,p=o.pageY,D("vmouseover",t,i),D("vmousedown",t,i)}}}function B(e){if(g)return;d||D("vmousecancel",e,N(e.target)),d=!0,M()}function j(t){if(g)return;var n=x(t).touches[0],r=d,i=e.vmouse.moveDistanceThreshold,s=N(t.target);d=d||Math.abs(n.pageX-h)>i||Math.abs(n.pageY-p)>i,d&&!r&&D("vmousecancel",t,s),D("vmousemove",t,s),M()}function F(e){if(g)return;L();var t=N(e.target),n;D("vmouseup",e,t);if(!d){var r=D("vclick",e,t);r&&r.isDefaultPrevented()&&(n=x(e).changedTouches[0],v.push({touchID:E,x:n.clientX,y:n.clientY}),m=!0)}D("vmouseout",e,t),d=!1,M()}function I(t){var n=e.data(t,i),r;if(n)for(r in n)if(n[r])return!0;return!1}function q(){}function R(t){var n=t.substr(1);return{setup:function(r,s){I(this)||e.data(this,i,{});var o=e.data(this,i);o[t]=!0,l[t]=(l[t]||0)+1,l[t]===1&&b.bind(n,P),e(this).bind(n,q),y&&(l.touchstart=(l.touchstart||0)+1,l.touchstart===1&&b.bind("touchstart",H).bind("touchend",F).bind("touchmove",j).bind("scroll",B))},teardown:function(r,s){--l[t],l[t]||b.unbind(n,P),y&&(--l.touchstart,l.touchstart||b.unbind("touchstart",H).unbind("touchmove",j).unbind("touchend",F).unbind("scroll",B));var o=e(this),u=e.data(this,i);u&&(u[t]=!1),o.unbind(n,q),I(this)||o.removeData(i)}}}var i="virtualMouseBindings",s="virtualTouchID",o="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),u="clientX clientY pageX pageY screenX screenY".split(" "),a=e.event.mouseHooks?e.event.mouseHooks.props:[],f=e.event.props.concat(a),l={},c=0,h=0,p=0,d=!1,v=[],m=!1,g=!1,y="addEventListener"in n,b=e(n),w=1,E=0,S;e.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};for(var U=0;U<o.length;U++)e.event.special[o[U]]=R(o[U]);y&&n.addEventListener("click",function(t){var n=v.length,r=t.target,i,o,u,a,f,l;if(n){i=t.clientX,o=t.clientY,S=e.vmouse.clickDistanceThreshold,u=r;while(u){for(a=0;a<n;a++){f=v[a],l=0;if(u===r&&Math.abs(f.x-i)<S&&Math.abs(f.y-o)<S||e.data(u,s)===f.touchID){t.preventDefault(),t.stopPropagation();return}}u=u.parentNode}}},!0)})(e,t,n),function(e){e.mobile={}}(e),function(e,t){var r={touch:"ontouchend"in n};e.mobile.support=e.mobile.support||{},e.extend(e.support,r),e.extend(e.mobile.support,r)}(e),function(e,t,r){function l(t,n,r){var i=r.type;r.type=n,e.event.dispatch.call(t,r),r.type=i}var i=e(n);e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(t,n){e.fn[n]=function(e){return e?this.bind(n,e):this.trigger(n)},e.attrFn&&(e.attrFn[n]=!0)});var s=e.mobile.support.touch,o="touchmove scroll",u=s?"touchstart":"mousedown",a=s?"touchend":"mouseup",f=s?"touchmove":"mousemove";e.event.special.scrollstart={enabled:!0,setup:function(){function s(e,n){r=n,l(t,r?"scrollstart":"scrollstop",e)}var t=this,n=e(t),r,i;n.bind(o,function(t){if(!e.event.special.scrollstart.enabled)return;r||s(t,!0),clearTimeout(i),i=setTimeout(function(){s(t,!1)},50)})}},e.event.special.tap={tapholdThreshold:750,setup:function(){var t=this,n=e(t);n.bind("vmousedown",function(r){function a(){clearTimeout(u)}function f(){a(),n.unbind("vclick",c).unbind("vmouseup",a),i.unbind("vmousecancel",f)}function c(e){f(),s===e.target&&l(t,"tap",e)}if(r.which&&r.which!==1)return!1;var s=r.target,o=r.originalEvent,u;n.bind("vmouseup",a).bind("vclick",c),i.bind("vmousecancel",f),u=setTimeout(function(){l(t,"taphold",e.Event("taphold",{target:s}))},e.event.special.tap.tapholdThreshold)})}},e.event.special.swipe={scrollSupressionThreshold:10,durationThreshold:1000,horizontalDistanceThreshold:10,verticalDistanceThreshold:475,start:function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t;return{time:(new Date).getTime(),coords:[n.pageX,n.pageY],origin:e(t.target)}},stop:function(e){var t=e.originalEvent.touches?e.originalEvent.touches[0]:e;return{time:(new Date).getTime(),coords:[t.pageX,t.pageY]}},handleSwipe:function(t,n){n.time-t.time<e.event.special.swipe.durationThreshold&&Math.abs(t.coords[0]-n.coords[0])>e.event.special.swipe.horizontalDistanceThreshold&&Math.abs(t.coords[1]-n.coords[1])<e.event.special.swipe.verticalDistanceThreshold&&t.origin.trigger("swipe").trigger(t.coords[0]>n.coords[0]?"swipeleft":"swiperight")},setup:function(){var t=this,n=e(t);n.bind(u,function(t){function o(t){if(!i)return;s=e.event.special.swipe.stop(t),Math.abs(i.coords[0]-s.coords[0])>e.event.special.swipe.scrollSupressionThreshold&&t.preventDefault()}var i=e.event.special.swipe.start(t),s;n.bind(f,o).one(a,function(){n.unbind(f,o),i&&s&&e.event.special.swipe.handleSwipe(i,s),i=s=r})})}},e.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe",swiperight:"swipe"},function(t,n){e.event.special[t]={setup:function(){e(this).bind(n,e.noop)}}})}(e,this)});

(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);
/*custom scrollbar*/
(function(c){var b={init:function(e){var f={set_width:false,set_height:false,horizontalScroll:false,scrollInertia:950,mouseWheel:true,mouseWheelPixels:"auto",autoDraggerLength:true,autoHideScrollbar:false,snapAmount:null,snapOffset:0,scrollButtons:{enable:false,scrollType:"continuous",scrollSpeed:"auto",scrollAmount:40},advanced:{updateOnBrowserResize:true,updateOnContentResize:false,autoExpandHorizontalScroll:false,autoScrollOnFocus:true,normalizeMouseWheelDelta:false},contentTouchScroll:true,callbacks:{onScrollStart:function(){},onScroll:function(){},onTotalScroll:function(){},onTotalScrollBack:function(){},onTotalScrollOffset:0,onTotalScrollBackOffset:0,whileScrolling:function(){}},theme:"light"},e=c.extend(true,f,e);return this.each(function(){var m=c(this);if(e.set_width){m.css("width",e.set_width)}if(e.set_height){m.css("height",e.set_height)}if(!c(document).data("mCustomScrollbar-index")){c(document).data("mCustomScrollbar-index","1")}else{var t=parseInt(c(document).data("mCustomScrollbar-index"));c(document).data("mCustomScrollbar-index",t+1)}m.wrapInner("<div class='mCustomScrollBox mCS-"+e.theme+"' id='mCSB_"+c(document).data("mCustomScrollbar-index")+"' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_"+c(document).data("mCustomScrollbar-index"));var g=m.children(".mCustomScrollBox");if(e.horizontalScroll){g.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");var k=g.children(".mCSB_h_wrapper");k.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({width:k.children().outerWidth(),position:"relative"}).unwrap()}else{g.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />")}var o=g.children(".mCSB_container");if(c.support.touch){o.addClass("mCS_touch")}o.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer'><div class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");var l=g.children(".mCSB_scrollTools"),h=l.children(".mCSB_draggerContainer"),q=h.children(".mCSB_dragger");if(e.horizontalScroll){q.data("minDraggerWidth",q.width())}else{q.data("minDraggerHeight",q.height())}if(e.scrollButtons.enable){if(e.horizontalScroll){l.prepend("<a class='mCSB_buttonLeft' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonRight' oncontextmenu='return false;'></a>")}else{l.prepend("<a class='mCSB_buttonUp' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonDown' oncontextmenu='return false;'></a>")}}g.bind("scroll",function(){if(!m.is(".mCS_disabled")){g.scrollTop(0).scrollLeft(0)}});m.data({mCS_Init:true,mCustomScrollbarIndex:c(document).data("mCustomScrollbar-index"),horizontalScroll:e.horizontalScroll,scrollInertia:e.scrollInertia,scrollEasing:"mcsEaseOut",mouseWheel:e.mouseWheel,mouseWheelPixels:e.mouseWheelPixels,autoDraggerLength:e.autoDraggerLength,autoHideScrollbar:e.autoHideScrollbar,snapAmount:e.snapAmount,snapOffset:e.snapOffset,scrollButtons_enable:e.scrollButtons.enable,scrollButtons_scrollType:e.scrollButtons.scrollType,scrollButtons_scrollSpeed:e.scrollButtons.scrollSpeed,scrollButtons_scrollAmount:e.scrollButtons.scrollAmount,autoExpandHorizontalScroll:e.advanced.autoExpandHorizontalScroll,autoScrollOnFocus:e.advanced.autoScrollOnFocus,normalizeMouseWheelDelta:e.advanced.normalizeMouseWheelDelta,contentTouchScroll:e.contentTouchScroll,onScrollStart_Callback:e.callbacks.onScrollStart,onScroll_Callback:e.callbacks.onScroll,onTotalScroll_Callback:e.callbacks.onTotalScroll,onTotalScrollBack_Callback:e.callbacks.onTotalScrollBack,onTotalScroll_Offset:e.callbacks.onTotalScrollOffset,onTotalScrollBack_Offset:e.callbacks.onTotalScrollBackOffset,whileScrolling_Callback:e.callbacks.whileScrolling,bindEvent_scrollbar_drag:false,bindEvent_content_touch:false,bindEvent_scrollbar_click:false,bindEvent_mousewheel:false,bindEvent_buttonsContinuous_y:false,bindEvent_buttonsContinuous_x:false,bindEvent_buttonsPixels_y:false,bindEvent_buttonsPixels_x:false,bindEvent_focusin:false,bindEvent_autoHideScrollbar:false,mCSB_buttonScrollRight:false,mCSB_buttonScrollLeft:false,mCSB_buttonScrollDown:false,mCSB_buttonScrollUp:false});if(e.horizontalScroll){if(m.css("max-width")!=="none"){if(!e.advanced.updateOnContentResize){e.advanced.updateOnContentResize=true}}}else{if(m.css("max-height")!=="none"){var s=false,r=parseInt(m.css("max-height"));if(m.css("max-height").indexOf("%")>=0){s=r,r=m.parent().height()*s/100}m.css("overflow","hidden");g.css("max-height",r)}}m.mCustomScrollbar("update");if(e.advanced.updateOnBrowserResize){var i,j=c(window).width(),u=c(window).height();c(window).bind("resize."+m.data("mCustomScrollbarIndex"),function(){if(i){clearTimeout(i)}i=setTimeout(function(){if(!m.is(".mCS_disabled")&&!m.is(".mCS_destroyed")){var w=c(window).width(),v=c(window).height();if(j!==w||u!==v){if(m.css("max-height")!=="none"&&s){g.css("max-height",m.parent().height()*s/100)}m.mCustomScrollbar("update");j=w;u=v}}},150)})}if(e.advanced.updateOnContentResize){var p;if(e.horizontalScroll){var n=o.outerWidth()}else{var n=o.outerHeight()}p=setInterval(function(){if(e.horizontalScroll){if(e.advanced.autoExpandHorizontalScroll){o.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:o.outerWidth(),position:"relative"}).unwrap()}var v=o.outerWidth()}else{var v=o.outerHeight()}if(v!=n){m.mCustomScrollbar("update");n=v}},300)}})},update:function(){var n=c(this),k=n.children(".mCustomScrollBox"),q=k.children(".mCSB_container");q.removeClass("mCS_no_scrollbar");n.removeClass("mCS_disabled mCS_destroyed");k.scrollTop(0).scrollLeft(0);var y=k.children(".mCSB_scrollTools"),o=y.children(".mCSB_draggerContainer"),m=o.children(".mCSB_dragger");if(n.data("horizontalScroll")){var A=y.children(".mCSB_buttonLeft"),t=y.children(".mCSB_buttonRight"),f=k.width();if(n.data("autoExpandHorizontalScroll")){q.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:q.outerWidth(),position:"relative"}).unwrap()}var z=q.outerWidth()}else{var w=y.children(".mCSB_buttonUp"),g=y.children(".mCSB_buttonDown"),r=k.height(),i=q.outerHeight()}if(i>r&&!n.data("horizontalScroll")){y.css("display","block");var s=o.height();if(n.data("autoDraggerLength")){var u=Math.round(r/i*s),l=m.data("minDraggerHeight");if(u<=l){m.css({height:l})}else{if(u>=s-10){var p=s-10;m.css({height:p})}else{m.css({height:u})}}m.children(".mCSB_dragger_bar").css({"line-height":m.height()+"px"})}var B=m.height(),x=(i-r)/(s-B);n.data("scrollAmount",x).mCustomScrollbar("scrolling",k,q,o,m,w,g,A,t);var D=Math.abs(q.position().top);n.mCustomScrollbar("scrollTo",D,{scrollInertia:0,trigger:"internal"})}else{if(z>f&&n.data("horizontalScroll")){y.css("display","block");var h=o.width();if(n.data("autoDraggerLength")){var j=Math.round(f/z*h),C=m.data("minDraggerWidth");if(j<=C){m.css({width:C})}else{if(j>=h-10){var e=h-10;m.css({width:e})}else{m.css({width:j})}}}var v=m.width(),x=(z-f)/(h-v);n.data("scrollAmount",x).mCustomScrollbar("scrolling",k,q,o,m,w,g,A,t);var D=Math.abs(q.position().left);n.mCustomScrollbar("scrollTo",D,{scrollInertia:0,trigger:"internal"})}else{k.unbind("mousewheel focusin");if(n.data("horizontalScroll")){m.add(q).css("left",0)}else{m.add(q).css("top",0)}y.css("display","none");q.addClass("mCS_no_scrollbar");n.data({bindEvent_mousewheel:false,bindEvent_focusin:false})}}},scrolling:function(h,p,m,j,w,e,A,v){var k=c(this);if(!k.data("bindEvent_scrollbar_drag")){var n,o;if(c.support.msPointer){j.bind("MSPointerDown",function(H){H.preventDefault();k.data({on_drag:true});j.addClass("mCSB_dragger_onDrag");var G=c(this),J=G.offset(),F=H.originalEvent.pageX-J.left,I=H.originalEvent.pageY-J.top;if(F<G.width()&&F>0&&I<G.height()&&I>0){n=I;o=F}});c(document).bind("MSPointerMove."+k.data("mCustomScrollbarIndex"),function(H){H.preventDefault();if(k.data("on_drag")){var G=j,J=G.offset(),F=H.originalEvent.pageX-J.left,I=H.originalEvent.pageY-J.top;D(n,o,I,F)}}).bind("MSPointerUp."+k.data("mCustomScrollbarIndex"),function(x){k.data({on_drag:false});j.removeClass("mCSB_dragger_onDrag")})}else{j.bind("mousedown touchstart",function(H){H.preventDefault();H.stopImmediatePropagation();var G=c(this),K=G.offset(),F,J;if(H.type==="touchstart"){var I=H.originalEvent.touches[0]||H.originalEvent.changedTouches[0];F=I.pageX-K.left;J=I.pageY-K.top}else{k.data({on_drag:true});j.addClass("mCSB_dragger_onDrag");F=H.pageX-K.left;J=H.pageY-K.top}if(F<G.width()&&F>0&&J<G.height()&&J>0){n=J;o=F}}).bind("touchmove",function(H){H.preventDefault();H.stopImmediatePropagation();var K=H.originalEvent.touches[0]||H.originalEvent.changedTouches[0],G=c(this),J=G.offset(),F=K.pageX-J.left,I=K.pageY-J.top;D(n,o,I,F)});c(document).bind("mousemove."+k.data("mCustomScrollbarIndex"),function(H){if(k.data("on_drag")){var G=j,J=G.offset(),F=H.pageX-J.left,I=H.pageY-J.top;D(n,o,I,F)}}).bind("mouseup."+k.data("mCustomScrollbarIndex"),function(x){k.data({on_drag:false});j.removeClass("mCSB_dragger_onDrag")})}k.data({bindEvent_scrollbar_drag:true})}function D(G,H,I,F){if(k.data("horizontalScroll")){k.mCustomScrollbar("scrollTo",(j.position().left-(H))+F,{moveDragger:true,trigger:"internal"})}else{k.mCustomScrollbar("scrollTo",(j.position().top-(G))+I,{moveDragger:true,trigger:"internal"})}}if(c.support.touch&&k.data("contentTouchScroll")){if(!k.data("bindEvent_content_touch")){var l,B,r,s,u,C,E;p.bind("touchstart",function(x){x.stopImmediatePropagation();l=x.originalEvent.touches[0]||x.originalEvent.changedTouches[0];B=c(this);r=B.offset();u=l.pageX-r.left;s=l.pageY-r.top;C=s;E=u});p.bind("touchmove",function(x){x.preventDefault();x.stopImmediatePropagation();l=x.originalEvent.touches[0]||x.originalEvent.changedTouches[0];B=c(this).parent();r=B.offset();u=l.pageX-r.left;s=l.pageY-r.top;if(k.data("horizontalScroll")){k.mCustomScrollbar("scrollTo",E-u,{trigger:"internal"})}else{k.mCustomScrollbar("scrollTo",C-s,{trigger:"internal"})}})}}if(!k.data("bindEvent_scrollbar_click")){m.bind("click",function(F){var x=(F.pageY-m.offset().top)*k.data("scrollAmount"),y=c(F.target);if(k.data("horizontalScroll")){x=(F.pageX-m.offset().left)*k.data("scrollAmount")}if(y.hasClass("mCSB_draggerContainer")||y.hasClass("mCSB_draggerRail")){k.mCustomScrollbar("scrollTo",x,{trigger:"internal",scrollEasing:"draggerRailEase"})}});k.data({bindEvent_scrollbar_click:true})}if(k.data("mouseWheel")){if(!k.data("bindEvent_mousewheel")){h.bind("mousewheel",function(H,J){var G,F=k.data("mouseWheelPixels"),x=Math.abs(p.position().top),I=j.position().top,y=m.height()-j.height();if(k.data("normalizeMouseWheelDelta")){if(J<0){J=-1}else{J=1}}if(F==="auto"){F=100+Math.round(k.data("scrollAmount")/2)}if(k.data("horizontalScroll")){I=j.position().left;y=m.width()-j.width();x=Math.abs(p.position().left)}if((J>0&&I!==0)||(J<0&&I!==y)){H.preventDefault();H.stopImmediatePropagation()}G=x-(J*F);k.mCustomScrollbar("scrollTo",G,{trigger:"internal"})});k.data({bindEvent_mousewheel:true})}}if(k.data("scrollButtons_enable")){if(k.data("scrollButtons_scrollType")==="pixels"){if(k.data("horizontalScroll")){v.add(A).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend",i,g);k.data({bindEvent_buttonsContinuous_x:false});if(!k.data("bindEvent_buttonsPixels_x")){v.bind("click",function(x){x.preventDefault();q(Math.abs(p.position().left)+k.data("scrollButtons_scrollAmount"))});A.bind("click",function(x){x.preventDefault();q(Math.abs(p.position().left)-k.data("scrollButtons_scrollAmount"))});k.data({bindEvent_buttonsPixels_x:true})}}else{e.add(w).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend",i,g);k.data({bindEvent_buttonsContinuous_y:false});if(!k.data("bindEvent_buttonsPixels_y")){e.bind("click",function(x){x.preventDefault();q(Math.abs(p.position().top)+k.data("scrollButtons_scrollAmount"))});w.bind("click",function(x){x.preventDefault();q(Math.abs(p.position().top)-k.data("scrollButtons_scrollAmount"))});k.data({bindEvent_buttonsPixels_y:true})}}function q(x){if(!j.data("preventAction")){j.data("preventAction",true);k.mCustomScrollbar("scrollTo",x,{trigger:"internal"})}}}else{if(k.data("horizontalScroll")){v.add(A).unbind("click");k.data({bindEvent_buttonsPixels_x:false});if(!k.data("bindEvent_buttonsContinuous_x")){v.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=z();k.data({mCSB_buttonScrollRight:setInterval(function(){k.mCustomScrollbar("scrollTo",Math.abs(p.position().left)+x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var i=function(x){x.preventDefault();clearInterval(k.data("mCSB_buttonScrollRight"))};v.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",i);A.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=z();k.data({mCSB_buttonScrollLeft:setInterval(function(){k.mCustomScrollbar("scrollTo",Math.abs(p.position().left)-x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var g=function(x){x.preventDefault();clearInterval(k.data("mCSB_buttonScrollLeft"))};A.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",g);k.data({bindEvent_buttonsContinuous_x:true})}}else{e.add(w).unbind("click");k.data({bindEvent_buttonsPixels_y:false});if(!k.data("bindEvent_buttonsContinuous_y")){e.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=z();k.data({mCSB_buttonScrollDown:setInterval(function(){k.mCustomScrollbar("scrollTo",Math.abs(p.position().top)+x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var t=function(x){x.preventDefault();clearInterval(k.data("mCSB_buttonScrollDown"))};e.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",t);w.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=z();k.data({mCSB_buttonScrollUp:setInterval(function(){k.mCustomScrollbar("scrollTo",Math.abs(p.position().top)-x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var f=function(x){x.preventDefault();clearInterval(k.data("mCSB_buttonScrollUp"))};w.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",f);k.data({bindEvent_buttonsContinuous_y:true})}}function z(){var x=k.data("scrollButtons_scrollSpeed");if(k.data("scrollButtons_scrollSpeed")==="auto"){x=Math.round((k.data("scrollInertia")+100)/40)}return x}}}if(k.data("autoScrollOnFocus")){if(!k.data("bindEvent_focusin")){h.bind("focusin",function(){h.scrollTop(0).scrollLeft(0);var x=c(document.activeElement);if(x.is("input,textarea,select,button,a[tabindex],area,object")){var G=p.position().top,y=x.position().top,F=h.height()-x.outerHeight();if(k.data("horizontalScroll")){G=p.position().left;y=x.position().left;F=h.width()-x.outerWidth()}if(G+y<0||G+y>F){k.mCustomScrollbar("scrollTo",y,{trigger:"internal"})}}});k.data({bindEvent_focusin:true})}}if(k.data("autoHideScrollbar")){if(!k.data("bindEvent_autoHideScrollbar")){h.bind("mouseenter",function(x){h.addClass("mCS-mouse-over");d.showScrollbar.call(h.children(".mCSB_scrollTools"))}).bind("mouseleave touchend",function(x){h.removeClass("mCS-mouse-over");if(x.type==="mouseleave"){d.hideScrollbar.call(h.children(".mCSB_scrollTools"))}});k.data({bindEvent_autoHideScrollbar:true})}}},scrollTo:function(e,f){var i=c(this),o={moveDragger:false,trigger:"external",callbacks:true,scrollInertia:i.data("scrollInertia"),scrollEasing:i.data("scrollEasing")},f=c.extend(o,f),p,g=i.children(".mCustomScrollBox"),k=g.children(".mCSB_container"),r=g.children(".mCSB_scrollTools"),j=r.children(".mCSB_draggerContainer"),h=j.children(".mCSB_dragger"),t=draggerSpeed=f.scrollInertia,q,s,m,l;if(!k.hasClass("mCS_no_scrollbar")){i.data({mCS_trigger:f.trigger});if(i.data("mCS_Init")){f.callbacks=false}if(e||e===0){if(typeof(e)==="number"){if(f.moveDragger){p=e;if(i.data("horizontalScroll")){e=h.position().left*i.data("scrollAmount")}else{e=h.position().top*i.data("scrollAmount")}draggerSpeed=0}else{p=e/i.data("scrollAmount")}}else{if(typeof(e)==="string"){var v;if(e==="top"){v=0}else{if(e==="bottom"&&!i.data("horizontalScroll")){v=k.outerHeight()-g.height()}else{if(e==="left"){v=0}else{if(e==="right"&&i.data("horizontalScroll")){v=k.outerWidth()-g.width()}else{if(e==="first"){v=i.find(".mCSB_container").find(":first")}else{if(e==="last"){v=i.find(".mCSB_container").find(":last")}else{v=i.find(e)}}}}}}if(v.length===1){if(i.data("horizontalScroll")){e=v.position().left}else{e=v.position().top}p=e/i.data("scrollAmount")}else{p=e=v}}}if(i.data("horizontalScroll")){if(i.data("onTotalScrollBack_Offset")){s=-i.data("onTotalScrollBack_Offset")}if(i.data("onTotalScroll_Offset")){l=g.width()-k.outerWidth()+i.data("onTotalScroll_Offset")}if(p<0){p=e=0;clearInterval(i.data("mCSB_buttonScrollLeft"));if(!s){q=true}}else{if(p>=j.width()-h.width()){p=j.width()-h.width();e=g.width()-k.outerWidth();clearInterval(i.data("mCSB_buttonScrollRight"));if(!l){m=true}}else{e=-e}}var n=i.data("snapAmount");if(n){e=Math.round(e/n)*n-i.data("snapOffset")}d.mTweenAxis.call(this,h[0],"left",Math.round(p),draggerSpeed,f.scrollEasing);d.mTweenAxis.call(this,k[0],"left",Math.round(e),t,f.scrollEasing,{onStart:function(){if(f.callbacks&&!i.data("mCS_tweenRunning")){u("onScrollStart")}if(i.data("autoHideScrollbar")){d.showScrollbar.call(r)}},onUpdate:function(){if(f.callbacks){u("whileScrolling")}},onComplete:function(){if(f.callbacks){u("onScroll");if(q||(s&&k.position().left>=s)){u("onTotalScrollBack")}if(m||(l&&k.position().left<=l)){u("onTotalScroll")}}h.data("preventAction",false);i.data("mCS_tweenRunning",false);if(i.data("autoHideScrollbar")){if(!g.hasClass("mCS-mouse-over")){d.hideScrollbar.call(r)}}}})}else{if(i.data("onTotalScrollBack_Offset")){s=-i.data("onTotalScrollBack_Offset")}if(i.data("onTotalScroll_Offset")){l=g.height()-k.outerHeight()+i.data("onTotalScroll_Offset")}if(p<0){p=e=0;clearInterval(i.data("mCSB_buttonScrollUp"));if(!s){q=true}}else{if(p>=j.height()-h.height()){p=j.height()-h.height();e=g.height()-k.outerHeight();clearInterval(i.data("mCSB_buttonScrollDown"));if(!l){m=true}}else{e=-e}}var n=i.data("snapAmount");if(n){e=Math.round(e/n)*n-i.data("snapOffset")}d.mTweenAxis.call(this,h[0],"top",Math.round(p),draggerSpeed,f.scrollEasing);d.mTweenAxis.call(this,k[0],"top",Math.round(e),t,f.scrollEasing,{onStart:function(){if(f.callbacks&&!i.data("mCS_tweenRunning")){u("onScrollStart")}if(i.data("autoHideScrollbar")){d.showScrollbar.call(r)}},onUpdate:function(){if(f.callbacks){u("whileScrolling")}},onComplete:function(){if(f.callbacks){u("onScroll");if(q||(s&&k.position().top>=s)){u("onTotalScrollBack")}if(m||(l&&k.position().top<=l)){u("onTotalScroll")}}h.data("preventAction",false);i.data("mCS_tweenRunning",false);if(i.data("autoHideScrollbar")){if(!g.hasClass("mCS-mouse-over")){d.hideScrollbar.call(r)}}}})}if(i.data("mCS_Init")){i.data({mCS_Init:false})}}}function u(w){this.mcs={top:k.position().top,left:k.position().left,draggerTop:h.position().top,draggerLeft:h.position().left,topPct:Math.round((100*Math.abs(k.position().top))/Math.abs(k.outerHeight()-g.height())),leftPct:Math.round((100*Math.abs(k.position().left))/Math.abs(k.outerWidth()-g.width()))};switch(w){case"onScrollStart":i.data("mCS_tweenRunning",true).data("onScrollStart_Callback").call(i,this.mcs);break;case"whileScrolling":i.data("whileScrolling_Callback").call(i,this.mcs);break;case"onScroll":i.data("onScroll_Callback").call(i,this.mcs);break;case"onTotalScrollBack":i.data("onTotalScrollBack_Callback").call(i,this.mcs);break;case"onTotalScroll":i.data("onTotalScroll_Callback").call(i,this.mcs);break}}},stop:function(){var g=c(this),e=g.children().children(".mCSB_container"),f=g.children().children().children().children(".mCSB_dragger");d.mTweenAxisStop.call(this,e[0]);d.mTweenAxisStop.call(this,f[0])},disable:function(e){var j=c(this),f=j.children(".mCustomScrollBox"),h=f.children(".mCSB_container"),g=f.children(".mCSB_scrollTools"),i=g.children().children(".mCSB_dragger");f.unbind("mousewheel focusin mouseenter mouseleave touchend");h.unbind("touchstart touchmove");if(e){if(j.data("horizontalScroll")){i.add(h).css("left",0)}else{i.add(h).css("top",0)}}g.css("display","none");h.addClass("mCS_no_scrollbar");j.data({bindEvent_mousewheel:false,bindEvent_focusin:false,bindEvent_content_touch:false,bindEvent_autoHideScrollbar:false}).addClass("mCS_disabled")},destroy:function(){var e=c(this);e.removeClass("mCustomScrollbar _mCS_"+e.data("mCustomScrollbarIndex")).addClass("mCS_destroyed").children().children(".mCSB_container").unwrap().children().unwrap().siblings(".mCSB_scrollTools").remove();c(document).unbind("mousemove."+e.data("mCustomScrollbarIndex")+" mouseup."+e.data("mCustomScrollbarIndex")+" MSPointerMove."+e.data("mCustomScrollbarIndex")+" MSPointerUp."+e.data("mCustomScrollbarIndex"));c(window).unbind("resize."+e.data("mCustomScrollbarIndex"))}},d={showScrollbar:function(){this.stop().animate({opacity:1},"fast")},hideScrollbar:function(){this.stop().animate({opacity:0},"fast")},mTweenAxis:function(g,i,h,f,o,y){var y=y||{},v=y.onStart||function(){},p=y.onUpdate||function(){},w=y.onComplete||function(){};var n=t(),l,j=0,r=g.offsetTop,s=g.style;if(i==="left"){r=g.offsetLeft}var m=h-r;q();e();function t(){if(window.performance&&window.performance.now){return window.performance.now()}else{if(window.performance&&window.performance.webkitNow){return window.performance.webkitNow()}else{if(Date.now){return Date.now()}else{return new Date().getTime()}}}}function x(){if(!j){v.call()}j=t()-n;u();if(j>=g._time){g._time=(j>g._time)?j+l-(j-g._time):j+l-1;if(g._time<j+1){g._time=j+1}}if(g._time<f){g._id=_request(x)}else{w.call()}}function u(){if(f>0){g.currVal=k(g._time,r,m,f,o);s[i]=Math.round(g.currVal)+"px"}else{s[i]=h+"px"}p.call()}function e(){l=1000/60;g._time=j+l;_request=(!window.requestAnimationFrame)?function(z){u();return setTimeout(z,0.01)}:window.requestAnimationFrame;g._id=_request(x)}function q(){if(g._id==null){return}if(!window.requestAnimationFrame){clearTimeout(g._id)}else{window.cancelAnimationFrame(g._id)}g._id=null}function k(B,A,F,E,C){switch(C){case"linear":return F*B/E+A;break;case"easeOutQuad":B/=E;return -F*B*(B-2)+A;break;case"easeInOutQuad":B/=E/2;if(B<1){return F/2*B*B+A}B--;return -F/2*(B*(B-2)-1)+A;break;case"easeOutCubic":B/=E;B--;return F*(B*B*B+1)+A;break;case"easeOutQuart":B/=E;B--;return -F*(B*B*B*B-1)+A;break;case"easeOutQuint":B/=E;B--;return F*(B*B*B*B*B+1)+A;break;case"easeOutCirc":B/=E;B--;return F*Math.sqrt(1-B*B)+A;break;case"easeOutSine":return F*Math.sin(B/E*(Math.PI/2))+A;break;case"easeOutExpo":return F*(-Math.pow(2,-10*B/E)+1)+A;break;case"mcsEaseOut":var D=(B/=E)*B,z=D*B;return A+F*(0.499999999999997*z*D+-2.5*D*D+5.5*z+-6.5*D+4*B);break;case"draggerRailEase":B/=E/2;if(B<1){return F/2*B*B*B+A}B-=2;return F/2*(B*B*B+2)+A;break}}},mTweenAxisStop:function(e){if(e._id==null){return}if(!window.requestAnimationFrame){clearTimeout(e._id)}else{window.cancelAnimationFrame(e._id)}e._id=null},rafPolyfill:function(){var f=["ms","moz","webkit","o"],e=f.length;while(--e>-1&&!window.requestAnimationFrame){window.requestAnimationFrame=window[f[e]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[f[e]+"CancelAnimationFrame"]||window[f[e]+"CancelRequestAnimationFrame"]}}};d.rafPolyfill.call();c.support.touch=!!("ontouchstart" in window);c.support.msPointer=window.navigator.msPointerEnabled;var a=("https:"==document.location.protocol)?"https:":"http:";c.event.special.mousewheel||document.write('<script src="'+a+'//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.0.6/jquery.mousewheel.min.js"><\/script>');c.fn.mCustomScrollbar=function(e){if(b[e]){return b[e].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof e==="object"||!e){return b.init.apply(this,arguments)}else{c.error("Method "+e+" does not exist")}}}})(jQuery);

;(function($) {
function defined(a) {
	return typeof a !== 'undefined';
}
function extend(child, parent, prototype) {
    var F = function() {};
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
	parent.prototype.constructor = parent;
    child._super = parent.prototype;
    if (prototype) {
        $.extend(child.prototype, prototype);
    }
}
var SUBST = [
    ['', ''],               /* spec*/
    ['exit', 'cancel'],     /* firefox & old webkits expect cancelFullScreen instead of exitFullscreen*/
    ['screen', 'Screen']    /* firefox expects FullScreen instead of Fullscreen*/
];
var VENDOR_PREFIXES = ['', 'o', 'ms', 'moz', 'webkit', 'webkitCurrent'];
function native(obj, name) {
    var prefixed;
    if (typeof obj === 'string') {
        name = obj;
        obj = document;
    }
    for (var i = 0; i < SUBST.length; ++i) {
        name = name.replace(SUBST[i][0], SUBST[i][1]);
        for (var j = 0; j < VENDOR_PREFIXES.length; ++j) {
            prefixed = VENDOR_PREFIXES[j];
            prefixed += j === 0 ? name : name.charAt(0).toUpperCase() + name.substr(1);
            if (defined(obj[prefixed])) {
                return obj[prefixed];
            }
        }
    }
    return void 0;
}var ua = navigator.userAgent;
var fsEnabled = native('fullscreenEnabled');
var IS_ANDROID_CHROME = ua.indexOf('Android') !== -1 && ua.indexOf('Chrome') !== -1; 
var IS_NATIVELY_SUPPORTED = 
		!IS_ANDROID_CHROME &&
		 defined(native('fullscreenElement')) && 
		(!defined(fsEnabled) || fsEnabled === true);
var version = $.fn.jquery.split('.');
var JQ_LT_17 = (parseInt(version[0]) < 2 && parseInt(version[1]) < 7);
var FullScreenAbstract = function() {
	this.__options = null;
	this._fullScreenElement = null;
	this.__savedStyles = {};
};
FullScreenAbstract.prototype = {
	_DEFAULT_OPTIONS: {
		styles: {
			'boxSizing': 'border-box',
			'MozBoxSizing': 'border-box',
			'WebkitBoxSizing': 'border-box'
		},
		toggleClass: null
	},
	__documentOverflow: '',
	__htmlOverflow: '',
	_preventDocumentScroll: function() {
		this.__documentOverflow = $('body')[0].style.overflow;
		this.__htmlOverflow = $('html')[0].style.overflow;
		/* $('body, html').css('overflow', 'hidden');*/
	},
	_allowDocumentScroll: function() {
		/* $('body')[0].style.overflow = this.__documentOverflow;*/
		/* $('html')[0].style.overflow = this.__htmlOverflow; */
	},
	_fullScreenChange: function() {
		if (!this.isFullScreen()) {
			this._allowDocumentScroll();
			this._revertStyles();
			this._triggerEvents();
			this._fullScreenElement = null;
		} else {
			this._preventDocumentScroll();
			this._triggerEvents();
		}
	},
	_fullScreenError: function(e) {
		this._revertStyles();
		this._fullScreenElement = null;
		if (e) {
			$(document).trigger('fscreenerror', [e]);
		}
	},
	_triggerEvents: function() {
		$(this._fullScreenElement).trigger(this.isFullScreen() ? 'fscreenopen' : 'fscreenclose');
		$(document).trigger('fscreenchange', [this.isFullScreen(), this._fullScreenElement]);
	},
	_saveAndApplyStyles: function() {
		var $elem = $(this._fullScreenElement);
		this.__savedStyles = {};
		for (var property in this.__options.styles) {
			/* save */
			this.__savedStyles[property] = this._fullScreenElement.style[property];
			/* apply */
			this._fullScreenElement.style[property] = this.__options.styles[property];
		}
		if (this.__options.toggleClass) {
			$elem.addClass(this.__options.toggleClass);
		}
	},
	_revertStyles: function() {
		var $elem = $(this._fullScreenElement);
		for (var property in this.__options.styles) {
			this._fullScreenElement.style[property] = this.__savedStyles[property];
		}
		if (this.__options.toggleClass) {
			$elem.removeClass(this.__options.toggleClass);
		}
	},
	open: function(elem, options) {
		/* do nothing if request is for already fullscreened element */
		if (elem === this._fullScreenElement) {
			return;
		}
		/* exit active fullscreen before opening another one */
		if (this.isFullScreen()) {
			this.exit();
		}
		/* save fullscreened element */
		this._fullScreenElement = elem;
		/* apply options, if any */
		this.__options = $.extend(true, {}, this._DEFAULT_OPTIONS, options);
		/* save current element styles and apply new */
		this._saveAndApplyStyles();
	},
	exit: null,
	isFullScreen: null,
	isNativelySupported: function() {
		return IS_NATIVELY_SUPPORTED;
	}
};
var FullScreenNative = function() {
	FullScreenNative._super.constructor.apply(this, arguments);
	this.exit = $.proxy(native('exitFullscreen'), document);
	this._DEFAULT_OPTIONS = $.extend(true, {}, this._DEFAULT_OPTIONS, {
		'styles': {
			'width': '100%',
			'height': '100%'
		}
	});
	$(document)
		.bind(this._prefixedString('fullscreenchange') + ' MSFullscreenChange', $.proxy(this._fullScreenChange, this))
		.bind(this._prefixedString('fullscreenerror') + ' MSFullscreenError', $.proxy(this._fullScreenError, this));
};
extend(FullScreenNative, FullScreenAbstract, {
	VENDOR_PREFIXES: ['', 'o', 'moz', 'webkit'],
	_prefixedString: function(str) {
		return $.map(this.VENDOR_PREFIXES, function(s) {
			return s + str;
		}).join(' ');
	},
	open: function(elem, options) {
		FullScreenNative._super.open.apply(this, arguments);
		var requestFS = native(elem, 'requestFullscreen');
		requestFS.call(elem);
	},
	exit: $.noop,
	isFullScreen: function() {
		return native('fullscreenElement') !== null;
	},
	element: function() {
		return native('fullscreenElement');
	}
});
var FullScreenFallback = function() {
	FullScreenFallback._super.constructor.apply(this, arguments);
	this._DEFAULT_OPTIONS = $.extend({}, this._DEFAULT_OPTIONS, {
		'styles': {
			'position': 'fixed',
			'zIndex': '2147483647',
			'left': 0,
			'top': 0,
			'bottom': 0,
			'right': 0
		}
	});
	this.__delegateKeydownHandler();
};
extend(FullScreenFallback, FullScreenAbstract, {
	__isFullScreen: false,
	__delegateKeydownHandler: function() {
		var $doc = $(document);
		$doc.delegate('*', 'keydown.fullscreen', $.proxy(this.__keydownHandler, this));
		var data = JQ_LT_17 ? $doc.data('events') : $._data(document).events;
		var events = data['keydown'];
		if (!JQ_LT_17) {
			events.splice(0, 0, events.splice(events.delegateCount - 1, 1)[0]);
		} else {
			data.live.unshift(data.live.pop());
		}
	},
	__keydownHandler: function(e) {
		if (this.isFullScreen() && e.which === 27) {
			this.exit();
			return false;
		}
		return true;
	},
	_revertStyles: function() {
		FullScreenFallback._super._revertStyles.apply(this, arguments);
		/* force redraw (fixes bug in IE7 with content dissapearing) */
		this._fullScreenElement.offsetHeight;
	},
	open: function(elem) {
		FullScreenFallback._super.open.apply(this, arguments);
		this.__isFullScreen = true;
		this._fullScreenChange();
	},
	exit: function() {
		this.__isFullScreen = false;
		this._fullScreenChange();
	},
	isFullScreen: function() {
		return this.__isFullScreen;
	},
	element: function() {
		return this.__isFullScreen ? this._fullScreenElement : null;
	}
});$.fullscreen = IS_NATIVELY_SUPPORTED 
				? new FullScreenNative() 
				: new FullScreenFallback();
$.fn.fullscreen = function(options) {
	var elem = this[0];
	options = $.extend({
		toggleClass: null,
		/* overflow: 'hidden'*/
	}, options);
	options.styles = {
		/* overflow: options.overflow */
	};
	/* delete options.overflow; */
	if (elem) {
		$.fullscreen.open(elem, options);
	}
	return this;
};
})(jQuery);
var bwg_current_filmstrip_pos,total_thumbnail_count,key,startPoint,endPoint,bwg_image_info_pos,filmstrip_width,preloadCount,filmstrip_thumbnail_width,filmstrip_thumbnail_height,addthis_share,lightbox_comment_pos,bwg_transition_duration,bwg_playInterval,isPopUpOpened=!1,bwg_overflow_initial_value=!1,bwg_overflow_x_initial_value=!1,bwg_overflow_y_initial_value=!1;function gallery_box_ready(){filmstrip_thumbnail_width=jQuery(".bwg_filmstrip_thumbnail").width(),filmstrip_thumbnail_height=jQuery(".bwg_filmstrip_thumbnail").height(),1==gallery_box_data.open_with_fullscreen?(filmstrip_width=jQuery(window).width(),filmstrip_height=jQuery(window).height()):(filmstrip_width=jQuery(".bwg_filmstrip_container").width(),filmstrip_height=jQuery(".bwg_filmstrip_container").height()),preloadCount="horizontal"==gallery_box_data.filmstrip_direction?parseInt(filmstrip_width/filmstrip_thumbnail_width)+gallery_box_data.preload_images_count:parseInt(filmstrip_height/filmstrip_thumbnail_height)+gallery_box_data.preload_images_count,total_thumbnail_count=jQuery(".bwg_filmstrip_thumbnail").length,key=parseInt(jQuery("#bwg_current_image_key").val()),startPoint=0,endPoint=key+preloadCount,jQuery(document).ready(function(){bwg_load_visible_images(key,preloadCount,total_thumbnail_count),jQuery(".pge_tabs li a").on("click",function(){return jQuery(".pge_tabs_container > div").hide(),jQuery(".pge_tabs li").removeClass("pge_active"),jQuery(jQuery(this).attr("href")).show(),jQuery(this).closest("li").addClass("pge_active"),jQuery("[name=type]").val(jQuery(this).attr("href").substr(1)),!1});var e=jQuery("#bwg_rated").attr("data-params");bwg_rating((e=JSON.parse(e)).current_rate,e.current_rate_count,e.current_avg_rating,e.current_image_key)}),1==gallery_box_data.is_pro&&1==gallery_box_data.enable_addthis&&gallery_box_data.addthis_profile_id&&(addthis_share={url:gallery_box_data.share_url}),lightbox_comment_pos=gallery_box_data.lightbox_comment_pos,bwg_image_info_pos=jQuery(".bwg_ctrl_btn_container").length?jQuery(".bwg_ctrl_btn_container").height():0,bwg_transition_duration=gallery_box_data.slideshow_interval<4*gallery_box_data.slideshow_effect_duration&&0!=gallery_box_data.slideshow_interval?1e3*gallery_box_data.slideshow_interval/4:1e3*gallery_box_data.slideshow_effect_duration,gallery_box_data.bwg_transition_duration=bwg_transition_duration,gallery_box_data.bwg_trans_in_progress=!1,(jQuery("#spider_popup_wrap").width()>=jQuery(window).width()||jQuery("#spider_popup_wrap").height()>=jQuery(window).height())&&jQuery(".spider_popup_close").attr("class","bwg_ctrl_btn spider_popup_close_fullscreen"),window.clearInterval(bwg_playInterval),bwg_current_filmstrip_pos=gallery_box_data.current_pos,jQuery(document).on("keydown",function(e){jQuery("#bwg_name").is(":focus")||jQuery("#bwg_email").is(":focus")||jQuery("#bwg_comment").is(":focus")||jQuery("#bwg_captcha_input").is(":focus")||(39===e.keyCode?bwg_change_image(parseInt(jQuery("#bwg_current_image_key").val()),parseInt(jQuery("#bwg_current_image_key").val())+1):37===e.keyCode?bwg_change_image(parseInt(jQuery("#bwg_current_image_key").val()),parseInt(jQuery("#bwg_current_image_key").val())-1):27===e.keyCode?spider_destroypopup(1e3):32===e.keyCode&&jQuery(".bwg_play_pause").trigger("click"))}),jQuery(window).resize(function(){void 0!==jQuery().fullscreen&&jQuery.isFunction(jQuery().fullscreen)&&(jQuery.fullscreen.isFullScreen()||bwg_popup_resize())});var r=gallery_box_data.image_width,_=gallery_box_data.image_height;if(1==gallery_box_data.is_pro){1==gallery_box_data.enable_addthis&&gallery_box_data.addthis_profile_id&&jQuery(".at4-share-outer").show(),spider_set_input_value("rate_ajax_task","save_hit_count"),spider_rate_ajax_save("bwg_rate_form");var e=gallery_box_data.data,t=gallery_box_data.current_image_key;jQuery(".bwg_image_hits span").html(++e[t].hit_count);var i=window.location.hash;i&&"-1"!=i.indexOf("bwg")||(location.replace("#bwg"+gallery_box_data.gallery_id+"/"+gallery_box_data.current_image_id),history.replaceState(void 0,void 0,"#bwg"+gallery_box_data.gallery_id+"/"+gallery_box_data.current_image_id))}1==gallery_box_data.image_right_click&&(jQuery(".bwg_image_wrap").bind("contextmenu",function(e){return!1}),jQuery(".bwg_image_wrap").css("webkitTouchCallout","none")),jQuery("#spider_popup_wrap").bind("touchmove",function(e){e.preventDefault()}),void 0!==jQuery().swiperight&&jQuery.isFunction(jQuery().swiperight)&&jQuery("#spider_popup_wrap .bwg_image_wrap").swiperight(function(){return bwg_change_image(parseInt(jQuery("#bwg_current_image_key").val()),(parseInt(jQuery("#bwg_current_image_key").val())+gallery_box_data.data.length-1)%gallery_box_data.data.length),!1}),void 0!==jQuery().swipeleft&&jQuery.isFunction(jQuery().swipeleft)&&jQuery("#spider_popup_wrap .bwg_image_wrap").swipeleft(function(){return bwg_change_image(parseInt(jQuery("#bwg_current_image_key").val()),(parseInt(jQuery("#bwg_current_image_key").val())+1)%gallery_box_data.data.length),!1}),bwg_reset_zoom();var a=/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())?"touchend":"click";jQuery("#spider_popup_left").on(a,function(){return bwg_change_image(parseInt(jQuery("#bwg_current_image_key").val()),(parseInt(jQuery("#bwg_current_image_key").val())+gallery_box_data.data.length-1)%gallery_box_data.data.length),!1}),jQuery("#spider_popup_right").on(a,function(){return bwg_change_image(parseInt(jQuery("#bwg_current_image_key").val()),(parseInt(jQuery("#bwg_current_image_key").val())+1)%gallery_box_data.data.length),!1}),-1!=navigator.appVersion.indexOf("MSIE 10")||-1!=navigator.appVersion.indexOf("MSIE 9")?setTimeout(function(){bwg_popup_resize()},1):bwg_popup_resize(),jQuery(".bwg_watermark").css({display:"none"}),setTimeout(function(){bwg_change_watermark_container()},500),void 0!==jQuery().fullscreen&&jQuery.isFunction(jQuery().fullscreen)&&(jQuery.fullscreen.isNativelySupported()||jQuery(".bwg_fullscreen").hide()),"horizontal"==gallery_box_data.filmstrip_direction?(jQuery(".bwg_image_container").height(jQuery(".bwg_image_wrap").height()-gallery_box_data.image_filmstrip_height),jQuery(".bwg_image_container").width(jQuery(".bwg_image_wrap").width())):(jQuery(".bwg_image_container").height(jQuery(".bwg_image_wrap").height()),jQuery(".bwg_image_container").width(jQuery(".bwg_image_wrap").width()-gallery_box_data.image_filmstrip_width)),void 0!==jQuery().mCustomScrollbar&&jQuery.isFunction(jQuery().mCustomScrollbar)&&jQuery(".bwg_comments,.bwg_ecommerce_panel, .bwg_image_info").mCustomScrollbar({scrollInertia:150,advanced:{updateOnContentResize:!0}});var s=/Firefox/i.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel";jQuery(".bwg_filmstrip").on(s,function(e){var t=window.event||e,i=(t=t.originalEvent?t.originalEvent:t).detail?-40*t.detail:t.wheelDelta,a=/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());0<i?jQuery(".bwg_filmstrip_left").trigger(a?"touchend":"click"):jQuery(".bwg_filmstrip_right").trigger(a?"touchend":"click")}),jQuery(".bwg_filmstrip_right").on(a,function(){jQuery(".bwg_filmstrip_thumbnails").stop(!0,!1),"left"==gallery_box_data.left_or_top?"width"==gallery_box_data.width_or_height?(jQuery(".bwg_filmstrip_thumbnails").position().left>=-(jQuery(".bwg_filmstrip_thumbnails").width()-jQuery(".bwg_filmstrip").width())&&(jQuery(".bwg_filmstrip_left").css({opacity:1}),jQuery(".bwg_filmstrip_thumbnails").position().left<-(jQuery(".bwg_filmstrip_thumbnails").width()-jQuery(".bwg_filmstrip").width()-(gallery_box_data.filmstrip_thumb_right_left_space+gallery_box_data.image_filmstrip_width+gallery_box_data.all_images_right_left_space))?jQuery(".bwg_filmstrip_thumbnails").animate({left:-(jQuery(".bwg_filmstrip_thumbnails").width()-jQuery(".bwg_filmstrip").width()-gallery_box_data.all_images_right_left_space)},500,"linear"):jQuery(".bwg_filmstrip_thumbnails").animate({left:jQuery(".bwg_filmstrip_thumbnails").position().left-(gallery_box_data.filmstrip_thumb_right_left_space+gallery_box_data.image_filmstrip_width)},500,"linear")),window.setTimeout(function(){jQuery(".bwg_filmstrip_thumbnails").position().left==-(jQuery(".bwg_filmstrip_thumbnails").width()-jQuery(".bwg_filmstrip").width())&&jQuery(".bwg_filmstrip_right").css({opacity:.3})},500)):(jQuery(".bwg_filmstrip_thumbnails").position().left>=-(jQuery(".bwg_filmstrip_thumbnails").height()-jQuery(".bwg_filmstrip").height())&&(jQuery(".bwg_filmstrip_left").css({opacity:1}),jQuery(".bwg_filmstrip_thumbnails").position().left<-(jQuery(".bwg_filmstrip_thumbnails").height()-jQuery(".bwg_filmstrip").height()-(gallery_box_data.filmstrip_thumb_right_left_space+gallery_box_data.image_filmstrip_width+gallery_box_data.all_images_right_left_space))?jQuery(".bwg_filmstrip_thumbnails").animate({left:-(jQuery(".bwg_filmstrip_thumbnails").height()-jQuery(".bwg_filmstrip").height()-gallery_box_data.all_images_right_left_space)},500,"linear"):jQuery(".bwg_filmstrip_thumbnails").animate({left:jQuery(".bwg_filmstrip_thumbnails").position().left-(gallery_box_data.filmstrip_thumb_right_left_space+gallery_box_data.image_filmstrip_width)},500,"linear")),window.setTimeout(function(){jQuery(".bwg_filmstrip_thumbnails").position().left==-(jQuery(".bwg_filmstrip_thumbnails").height()-jQuery(".bwg_filmstrip").height())&&jQuery(".bwg_filmstrip_right").css({opacity:.3})},500)):"width"==gallery_box_data.width_or_height?(jQuery(".bwg_filmstrip_thumbnails").position().top>=-(jQuery(".bwg_filmstrip_thumbnails").width()-jQuery(".bwg_filmstrip").width())&&(jQuery(".bwg_filmstrip_left").css({opacity:1}),jQuery(".bwg_filmstrip_thumbnails").position().top<-(jQuery(".bwg_filmstrip_thumbnails").width()-jQuery(".bwg_filmstrip").width()-(gallery_box_data.filmstrip_thumb_right_left_space+gallery_box_data.image_filmstrip_width+gallery_box_data.all_images_right_left_space))?jQuery(".bwg_filmstrip_thumbnails").animate({left:-(jQuery(".bwg_filmstrip_thumbnails").width()-jQuery(".bwg_filmstrip").width()-gallery_box_data.all_images_right_left_space)},500,"linear"):jQuery(".bwg_filmstrip_thumbnails").animate({left:jQuery(".bwg_filmstrip_thumbnails").position().top-(gallery_box_data.filmstrip_thumb_right_left_space+gallery_box_data.image_filmstrip_width)},500,"linear")),window.setTimeout(function(){jQuery(".bwg_filmstrip_thumbnails").position().left==-(jQuery(".bwg_filmstrip_thumbnails").width()-jQuery(".bwg_filmstrip").width())&&jQuery(".bwg_filmstrip_right").css({opacity:.3})},500)):(jQuery(".bwg_filmstrip_thumbnails").position().top>=-(jQuery(".bwg_filmstrip_thumbnails").height()-jQuery(".bwg_filmstrip").height())&&(jQuery(".bwg_filmstrip_left").css({opacity:1}),jQuery(".bwg_filmstrip_thumbnails").position().top<-(jQuery(".bwg_filmstrip_thumbnails").height()-jQuery(".bwg_filmstrip").height()-(gallery_box_data.filmstrip_thumb_right_left_space+gallery_box_data.image_filmstrip_width+gallery_box_data.all_images_right_left_space))?jQuery(".bwg_filmstrip_thumbnails").animate({top:-(jQuery(".bwg_filmstrip_thumbnails").height()-jQuery(".bwg_filmstrip").height()-gallery_box_data.all_images_right_left_space)},500,"linear"):jQuery(".bwg_filmstrip_thumbnails").animate({top:jQuery(".bwg_filmstrip_thumbnails").position().top-(gallery_box_data.filmstrip_thumb_right_left_space+gallery_box_data.image_filmstrip_width)},500,"linear")),window.setTimeout(function(){jQuery(".bwg_filmstrip_thumbnails").position().left==-(jQuery(".bwg_filmstrip_thumbnails").height()-jQuery(".bwg_filmstrip").height())&&jQuery(".bwg_filmstrip_right").css({opacity:.3})},500))}),"left"==gallery_box_data.left_or_top?jQuery(".bwg_filmstrip_left").on(a,function(){jQuery(".bwg_filmstrip_thumbnails").stop(!0,!1),jQuery(".bwg_filmstrip_thumbnails").position().left<0&&(jQuery(".bwg_filmstrip_right").css({opacity:1}),jQuery(".bwg_filmstrip_thumbnails").position().left>-(gallery_box_data.filmstrip_thumb_right_left_space+gallery_box_data.image_filmstrip_width)?jQuery(".bwg_filmstrip_thumbnails").animate({left:0},500,"linear"):jQuery(".bwg_filmstrip_thumbnails").animate({left:jQuery(".bwg_filmstrip_thumbnails").position().left+gallery_box_data.image_filmstrip_width+gallery_box_data.filmstrip_thumb_right_left_space},500,"linear")),window.setTimeout(function(){0==jQuery(".bwg_filmstrip_thumbnails").position().left&&jQuery(".bwg_filmstrip_left").css({opacity:.3})},500)}):jQuery(".bwg_filmstrip_left").on(a,function(){jQuery(".bwg_filmstrip_thumbnails").stop(!0,!1),jQuery(".bwg_filmstrip_thumbnails").position().top<0&&(jQuery(".bwg_filmstrip_right").css({opacity:1}),jQuery(".bwg_filmstrip_thumbnails").position().top>-(gallery_box_data.filmstrip_thumb_right_left_space+gallery_box_data.image_filmstrip_width)?jQuery(".bwg_filmstrip_thumbnails").animate({top:0},500,"linear"):jQuery(".bwg_filmstrip_thumbnails").animate({top:jQuery(".bwg_filmstrip_thumbnails").position().top+gallery_box_data.image_filmstrip_width+gallery_box_data.filmstrip_thumb_right_left_space},500,"linear")),window.setTimeout(function(){0==jQuery(".bwg_filmstrip_thumbnails").position().top&&jQuery(".bwg_filmstrip_left").css({opacity:.3})},500)}),"width"==gallery_box_data.width_or_height?bwg_set_filmstrip_pos(jQuery(".bwg_filmstrip").width(),"",gallery_box_data):bwg_set_filmstrip_pos(jQuery(".bwg_filmstrip").height(),"",gallery_box_data),jQuery(".bwg_info").on(a,function(){if("none"==jQuery(".bwg_image_info_container1").css("display")){jQuery(".bwg_image_info_container1").css("display","table-cell"),jQuery(".bwg_info").attr("title",bwg_objectsL10n.bwg_hide_info);jQuery(".bwg_ctrl_btn_container").length&&jQuery(".bwg_ctrl_btn_container").height();jQuery(".bwg_image_info").css("height","auto"),bwg_info_height_set()}else jQuery(".bwg_image_info_container1").css("display","none"),jQuery(".bwg_info").attr("title",bwg_objectsL10n.bwg_show_info)}),jQuery(".bwg_rate").on(a,function(){"none"==jQuery(".bwg_image_rate_container1").css("display")?(jQuery(".bwg_image_rate_container1").css("display","table-cell"),jQuery(".bwg_rate").attr("title",bwg_objectsL10n.bwg_hide_rating)):(jQuery(".bwg_image_rate_container1").css("display","none"),jQuery(".bwg_rate").attr("title",bwg_objectsL10n.bwg_show_rating))}),jQuery(".bwg_comment, .bwg_comments_close_btn").on(a,function(){bwg_comment()}),jQuery(".bwg_ecommerce, .bwg_ecommerce_close_btn").on(a,function(){bwg_ecommerce()}),jQuery(".bwg_toggle_container").on(a,function(){var e="top"==gallery_box_data.lightbox_ctrl_btn_pos?"bwg-icon-caret-up":"bwg-icon-caret-down",t="top"==gallery_box_data.lightbox_ctrl_btn_pos?"bwg-icon-caret-down":"bwg-icon-caret-up";jQuery(".bwg_toggle_container i").hasClass(e)?(gallery_box_data.enable_image_filmstrip&&"bottom"==gallery_box_data.lightbox_filmstrip_pos||"bottom"!=gallery_box_data.lightbox_ctrl_btn_pos||"bottom"!=gallery_box_data.lightbox_rate_pos?gallery_box_data.enable_image_filmstrip&&"top"==gallery_box_data.lightbox_filmstrip_pos||"top"!=gallery_box_data.lightbox_ctrl_btn_pos||"top"!=gallery_box_data.lightbox_rate_pos||jQuery(".bwg_image_rate").animate({top:0},500):jQuery(".bwg_image_rate").animate({bottom:0},500),gallery_box_data.enable_image_filmstrip&&"bottom"==gallery_box_data.lightbox_filmstrip_pos||"bottom"!=gallery_box_data.lightbox_ctrl_btn_pos||"bottom"!=gallery_box_data.lightbox_hit_pos?gallery_box_data.enable_image_filmstrip&&"top"==gallery_box_data.lightbox_filmstrip_pos||"top"!=gallery_box_data.lightbox_ctrl_btn_pos||"top"!=gallery_box_data.lightbox_hit_pos||jQuery(".bwg_image_hit").animate({top:0},500):jQuery(".bwg_image_hit").animate({bottom:0},500),"bottom"==gallery_box_data.lightbox_ctrl_btn_pos?(jQuery(".bwg_ctrl_btn_container").animate({bottom:"-"+jQuery(".bwg_ctrl_btn_container").height()},500).addClass("closed"),jQuery(".bwg_toggle_container").animate({bottom:0},{duration:500,complete:function(){jQuery(".bwg_toggle_container i").attr("class","bwg_toggle_btn "+t)}})):(jQuery(".bwg_ctrl_btn_container").animate({top:"-"+jQuery(".bwg_ctrl_btn_container").height()},500).addClass("closed"),jQuery(".bwg_toggle_container").animate({top:0},{duration:500,complete:function(){jQuery(".bwg_toggle_container i").attr("class","bwg_toggle_btn "+t)}}))):(gallery_box_data.enable_image_filmstrip&&"bottom"==gallery_box_data.lightbox_filmstrip_pos||"bottom"!=gallery_box_data.lightbox_ctrl_btn_pos||"bottom"!=gallery_box_data.lightbox_rate_pos?gallery_box_data.enable_image_filmstrip&&"top"==gallery_box_data.lightbox_filmstrip_pos||"top"!=gallery_box_data.lightbox_ctrl_btn_pos||"top"!=gallery_box_data.lightbox_rate_pos||jQuery(".bwg_image_rate").animate({top:jQuery(".bwg_ctrl_btn_container").height()},500):jQuery(".bwg_image_rate").animate({bottom:jQuery(".bwg_ctrl_btn_container").height()},500),gallery_box_data.enable_image_filmstrip&&"bottom"==gallery_box_data.lightbox_filmstrip_pos||"bottom"!=gallery_box_data.lightbox_ctrl_btn_pos||"bottom"!=gallery_box_data.lightbox_hit_pos?gallery_box_data.enable_image_filmstrip&&"top"==gallery_box_data.lightbox_filmstrip_pos||"top"!=gallery_box_data.lightbox_ctrl_btn_pos||"top"!=gallery_box_data.lightbox_hit_pos||jQuery(".bwg_image_hit").animate({top:jQuery(".bwg_ctrl_btn_container").height()},500):jQuery(".bwg_image_hit").animate({bottom:jQuery(".bwg_ctrl_btn_container").height()},500),"bottom"==gallery_box_data.lightbox_ctrl_btn_pos?(jQuery(".bwg_ctrl_btn_container").animate({bottom:0},500).removeClass("closed"),jQuery(".bwg_toggle_container").animate({bottom:jQuery(".bwg_ctrl_btn_container").height()},{duration:500,complete:function(){jQuery(".bwg_toggle_container i").attr("class","bwg_toggle_btn "+e)}})):(jQuery(".bwg_ctrl_btn_container").animate({top:0},500).removeClass("closed"),jQuery(".bwg_toggle_container").animate({top:jQuery(".bwg_ctrl_btn_container").height()},{duration:500,complete:function(){jQuery(".bwg_toggle_container i").attr("class","bwg_toggle_btn "+e)}}))),bwg_info_position(!0)});var o=window.innerHeight;jQuery(".bwg_resize-full").on(a,function(){bwg_resize_full()}),jQuery(".bwg_fullscreen").on(a,function(){jQuery(".bwg_watermark").css({display:"none"});var e,t=0;if((jQuery(".bwg_comment_container").hasClass("bwg_open")||jQuery(".bwg_ecommerce_container").hasClass("bwg_open"))&&(t=jQuery(".bwg_comment_container").width()||jQuery(".bwg_ecommerce_container").width()),void 0!==jQuery().fullscreen&&jQuery.isFunction(jQuery().fullscreen))if(jQuery.fullscreen.isFullScreen())jQuery.fullscreen.exit(),e=o,jQuery(window).width()>gallery_box_data.image_width&&(r=gallery_box_data.image_width),window.innerHeight>gallery_box_data.image_height&&(_=gallery_box_data.image_height),gallery_box_data.open_with_fullscreen&&(r=jQuery(window).width(),_=e),jQuery("#spider_popup_wrap").on("fscreenclose",function(){jQuery("#spider_popup_wrap").css({width:r,height:_,left:"50%",top:"50%",marginLeft:-r/2,marginTop:-_/2,zIndex:1e5}),jQuery(".bwg_image_wrap").css({width:r-t}),jQuery(".bwg_image_container").css({height:_-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0),width:r-t-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)}),jQuery(".bwg_image_info").css("height","auto"),bwg_info_height_set(),jQuery(".bwg_popup_image").css({maxWidth:r-t-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0),maxHeight:_-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)}),jQuery(".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video").css({maxWidth:r-t-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0),maxHeight:_-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)}),bwg_resize_instagram_post(),bwg_change_watermark_container(),"width"==gallery_box_data.width_or_height?(jQuery(".bwg_filmstrip_container").css({width:r-("horizontal"==gallery_box_data.filmstrip_direction?"comment_container_width":0)}),jQuery(".bwg_filmstrip").css({width:r-("horizontal"==gallery_box_data.filmstrip_direction?"comment_container_width":0)-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())}),bwg_set_filmstrip_pos(r-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height()),"",gallery_box_data)):(jQuery(".bwg_filmstrip_container").css({height:_-("horizontal"==gallery_box_data.filmstrip_direction?"comment_container_width":0)}),jQuery(".bwg_filmstrip").css({height:_-("horizontal"==gallery_box_data.filmstrip_direction?"comment_container_width":0)-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())}),bwg_set_filmstrip_pos(_-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height()),"",gallery_box_data),"horizontal"!=gallery_box_data.filmstrip_direction&&jQuery(".bwg_filmstrip_right").css({top:_-jQuery(".bwg_filmstrip_right").height()})),jQuery(".bwg_resize-full").show(),jQuery(".bwg_resize-full").attr("class","bwg-icon-expand bwg_ctrl_btn bwg_resize-full"),jQuery(".bwg_resize-full").attr("title",bwg_objectsL10n.bwg_maximize),jQuery(".bwg_fullscreen").attr("class","bwg-icon-arrows-out bwg_ctrl_btn bwg_fullscreen"),jQuery(".bwg_fullscreen").attr("title",bwg_objectsL10n.bwg_fullscreen),jQuery("#spider_popup_wrap").width()<jQuery(window).width()&&jQuery("#spider_popup_wrap").height()<window.innerHeight&&jQuery(".spider_popup_close_fullscreen").attr("class","spider_popup_close")});else{jQuery("#spider_popup_wrap").fullscreen();var i=screen.width,a=screen.height;jQuery("#spider_popup_wrap").css({width:i,height:a,left:0,top:0,margin:0,zIndex:1e5}),jQuery(".bwg_image_wrap").css({width:i-t}),jQuery(".bwg_image_container").css({height:a-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0),width:i-t-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)}),jQuery(".bwg_image_info").css("height","auto"),bwg_info_height_set(),jQuery(".bwg_popup_image").css({maxWidth:i-t-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0),maxHeight:a-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)}),jQuery(".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video").css({maxWidth:i-t-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0),maxHeight:a-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)}),bwg_resize_instagram_post(),bwg_change_watermark_container(),"width"==gallery_box_data.width_or_height?(jQuery(".bwg_filmstrip_container").css({width:i-("horizontal"==gallery_box_data.filmstrip_direction?t:0)},500),jQuery(".bwg_filmstrip").css({width:i-("horizontal"==gallery_box_data.filmstrip_direction?t:0)-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())},500),bwg_set_filmstrip_pos(i-("horizontal"==gallery_box_data.filmstrip_direction?t:0)-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height()),"",gallery_box_data)):(jQuery(".bwg_filmstrip_container").css({height:a-("horizontal"==gallery_box_data.filmstrip_direction)?"comment_container_width":0}),jQuery(".bwg_filmstrip").css({height:a-("horizontal"==gallery_box_data.filmstrip_direction?"comment_container_width":0)-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())}),bwg_set_filmstrip_pos(a-("horizontal"==gallery_box_data.filmstrip_direction?"comment_container_width":0)-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height()),"",gallery_box_data),"horizontal"!=gallery_box_data.filmstrip_direction&&jQuery(".bwg_filmstrip_right").css({top:a-jQuery(".bwg_filmstrip_right").height()})),jQuery(".bwg_resize-full").hide(),jQuery(".bwg_fullscreen").attr("class","bwg-icon-compress bwg_ctrl_btn bwg_fullscreen"),jQuery(".bwg_fullscreen").attr("title",bwg_objectsL10n.bwg_exit_fullscreen),jQuery(".spider_popup_close").attr("class","bwg_ctrl_btn spider_popup_close_fullscreen")}return!1}),jQuery(".bwg_play_pause, .bwg_popup_image").on(a,function(){jQuery(".bwg_play_pause").length&&jQuery(".bwg_play_pause").hasClass("bwg-icon-play")&&!jQuery(".bwg_comment_container").hasClass("bwg_open")?(bwg_play(gallery_box_data.data),jQuery(".bwg_play_pause").attr("title",bwg_objectsL10n.bwg_pause),jQuery(".bwg_play_pause").attr("class","bwg-icon-pause bwg_ctrl_btn bwg_play_pause")):(window.clearInterval(bwg_playInterval),jQuery(".bwg_play_pause").attr("title",bwg_objectsL10n.bwg_play),jQuery(".bwg_play_pause").attr("class","bwg-icon-play bwg_ctrl_btn bwg_play_pause"))}),gallery_box_data.open_with_autoplay&&(bwg_play(gallery_box_data.data),jQuery(".bwg_play_pause").attr("title",bwg_objectsL10n.bwg_pause),jQuery(".bwg_play_pause").attr("class","bwg-icon-pause bwg_ctrl_btn bwg_play_pause")),gallery_box_data.open_with_fullscreen&&bwg_open_with_fullscreen(),jQuery(".bwg_popup_image").removeAttr("width"),jQuery(".bwg_popup_image").removeAttr("height"),jQuery(window).focus(function(){jQuery(".bwg_play_pause").length&&!jQuery(".bwg_play_pause").hasClass("bwg-icon-play")&&bwg_play(gallery_box_data.data)}),jQuery(window).blur(function(){event_stack=[],window.clearInterval(bwg_playInterval)});gallery_box_data.lightbox_ctrl_btn_pos;1==gallery_box_data.open_ecommerce&&setTimeout(function(){bwg_ecommerce()},400),1==gallery_box_data.open_comment&&bwg_comment()}function spider_createpopup(e,t,i,a,r,_,s,o){e=e.replace(/&#038;/g,"&"),isPopUpOpened||(isPopUpOpened=!0,spider_hasalreadyreceivedpopup(_)||spider_isunsupporteduseragent()||(bwg_overflow_initial_value=jQuery("html").css("overflow"),bwg_overflow_x_initial_value=jQuery("html").css("overflow-x"),bwg_overflow_y_initial_value=jQuery("html").css("overflow-y"),jQuery("html").attr("style","overflow:hidden !important;"),jQuery("#bwg_spider_popup_loading_"+t).show(),jQuery("#spider_popup_overlay_"+t).css({display:"block"}),jQuery.ajax({type:"GET",url:e,success:function(e){var t=jQuery('<div id="spider_popup_wrap" class="spider_popup_wrap" style=" width:'+i+"px; height:"+a+"px; margin-top:-"+a/2+"px; margin-left: -"+i/2+'px; ">'+e+"</div>").hide().appendTo("body");gallery_box_ready(),spider_showpopup(_,s,t,r,o)},beforeSend:function(){},complete:function(){}})))}function spider_showpopup(e,t,i,a,r){var _=gallery_box_data.data,s=parseInt(jQuery("#bwg_current_image_key").val());void 0!==_[s]&&(isPopUpOpened=!0,-1<_[s].filetype.indexOf("EMBED_")?bwg_first_image_load(i):jQuery("#spider_popup_wrap .bwg_popup_image_spun img").prop("complete")?bwg_first_image_load(i):jQuery("#spider_popup_wrap .bwg_popup_image_spun img").on("load error",function(){bwg_first_image_load(i)}),spider_receivedpopup(e,t,r))}function bwg_first_image_load(e){e.show(),jQuery(".bwg_spider_popup_loading").hide(),1==gallery_box_data.preload_images&&bwg_preload_images(parseInt(jQuery("#bwg_current_image_key").val())),bwg_load_filmstrip(),bwg_info_height_set()}function spider_hasalreadyreceivedpopup(e){return-1<document.cookie.indexOf(e)&&delete document.cookie[document.cookie.indexOf(e)],!1}function spider_receivedpopup(e,t,i){var a=new Date;a.setDate(a.getDate()+t),document.cookie=e+"=true;expires="+a.toUTCString()+";path=/";var r=gallery_box_data.bwg_ctrl_btn_container_height;"bottom"==i?jQuery(".bwg_toggle_container").css("bottom",r+"px"):"top"==i&&jQuery(".bwg_toggle_container").css("top",r+"px")}function spider_isunsupporteduseragent(){return!window.XMLHttpRequest}function spider_destroypopup(e){null!=document.getElementById("spider_popup_wrap")&&(void 0!==jQuery().fullscreen&&jQuery.isFunction(jQuery().fullscreen)&&jQuery.fullscreen.isFullScreen()&&jQuery.fullscreen.exit(),"undefined"!=typeof enable_addthis&&enable_addthis&&jQuery(".at4-share-outer").hide(),setTimeout(function(){jQuery(".spider_popup_wrap").remove(),jQuery(".bwg_spider_popup_loading").css({display:"none"}),jQuery(".spider_popup_overlay").css({display:"none"}),jQuery(document).off("keydown"),!1!==bwg_overflow_initial_value&&jQuery("html").css("overflow",bwg_overflow_initial_value),!1!==bwg_overflow_x_initial_value&&jQuery("html").css("overflow-x",bwg_overflow_x_initial_value),!1!==bwg_overflow_y_initial_value&&jQuery("html").css("overflow-y",bwg_overflow_y_initial_value)},20)),isPopUpOpened=!1;var t=/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()),i=document.querySelector('meta[name="viewport"]');t&&i&&(i.content="width=device-width, initial-scale=1");var a=jQuery(document).scrollTop();bwg_objectsL10n.is_pro&&location.replace("#"),jQuery(document).scrollTop(a),void 0!==gallery_box_data.bwg_playInterval&&clearInterval(gallery_box_data.bwg_playInterval)}function get_ajax_pricelist(){var e={};return jQuery(".add_to_cart_msg").html(""),e.ajax_task="display",e.image_id=jQuery("#bwg_popup_image").attr("image_id"),jQuery("#ecommerce_ajax_loading").css("height",jQuery(".bwg_ecommerce_panel").css("height")),jQuery("#ecommerce_opacity_div").css("width",jQuery(".bwg_ecommerce_panel").css("width")),jQuery("#ecommerce_opacity_div").css("height",jQuery(".bwg_ecommerce_panel").css("height")),jQuery("#ecommerce_loading_div").css("width",jQuery(".bwg_ecommerce_panel").css("width")),jQuery("#ecommerce_loading_div").css("height",jQuery(".bwg_ecommerce_panel").css("height")),jQuery("#ecommerce_opacity_div").css("display","block"),jQuery("#ecommerce_loading_div").css("display","table-cell"),jQuery.ajax({type:"POST",url:jQuery("#bwg_ecommerce_form").attr("action"),data:e,success:function(e){jQuery(".pge_tabs li a").on("click",function(){return jQuery(".pge_tabs_container > div").hide(),jQuery(".pge_tabs li").removeClass("pge_active"),jQuery(jQuery(this).attr("href")).show(),jQuery(this).closest("li").addClass("pge_active"),jQuery("[name=type]").val(jQuery(this).attr("href").substr(1)),!1});var t=jQuery(e).find(".manual").html();jQuery(".manual").html(t);var i=jQuery(e).find(".downloads").html();jQuery(".downloads").html(i);var a=jQuery(e).find(".pge_options").html();jQuery(".pge_options").html(a);var r=jQuery(e).find(".pge_add_to_cart").html();jQuery(".pge_add_to_cart").html(r)},beforeSend:function(){},complete:function(){jQuery("#ecommerce_opacity_div").css("display","none"),jQuery("#ecommerce_loading_div").css("display","none")}}),!1}function spider_ajax_save(e){var t={};return t.bwg_name=jQuery("#bwg_name").val(),t.bwg_comment=jQuery("#bwg_comment").val(),t.bwg_email=jQuery("#bwg_email").val(),t.bwg_captcha_input=jQuery("#bwg_captcha_input").val(),t.ajax_task=jQuery("#ajax_task").val(),t.image_id=jQuery("#image_id").val(),t.comment_id=jQuery("#comment_id").val(),jQuery("#ajax_loading").css("height",jQuery(".bwg_comments").css("height")),jQuery("#opacity_div").css("width",jQuery(".bwg_comments").css("width")),jQuery("#opacity_div").css("height",jQuery(".bwg_comments").css("height")),jQuery("#loading_div").css("width",jQuery(".bwg_comments").css("width")),jQuery("#loading_div").css("height",jQuery(".bwg_comments").css("height")),document.getElementById("opacity_div").style.display="",document.getElementById("loading_div").style.display="table-cell",jQuery.ajax({type:"POST",url:jQuery("#"+e).attr("action"),data:t,success:function(e){var t=jQuery(e).find(".bwg_comments").html();jQuery(".bwg_comments").html(t)},beforeSend:function(){},complete:function(){document.getElementById("opacity_div").style.display="none",document.getElementById("loading_div").style.display="none",jQuery(".bwg_comments").mCustomScrollbar({scrollInertia:150,advanced:{updateOnContentResize:!0}}),jQuery(".bwg_comments_close_btn").click(bwg_comment),bwg_captcha_refresh("bwg_captcha")}}),!1}function spider_rate_ajax_save(i){var e={};return e.image_id=jQuery("#"+i+" input[name='image_id']").val(),e.rate=jQuery("#"+i+" input[name='score']").val(),e.ajax_task=jQuery("#rate_ajax_task").val(),jQuery.ajax({type:"POST",url:jQuery("#"+i).attr("action"),data:e,success:function(e){var t=jQuery(e).find("#"+i).html();jQuery("#"+i).html(t)},beforeSend:function(){},complete:function(){}})}function spider_set_input_value(e,t){document.getElementById(e)&&(document.getElementById(e).value=t)}function spider_form_submit(e,t){document.getElementById(t)&&document.getElementById(t).submit(),e.preventDefault?e.preventDefault():e.returnValue=!1}function spider_check_required(e,t){return""==jQuery("#"+e).val()&&(alert(t+" "+bwg_objectsL10n.bwg_field_required),jQuery("#"+e).attr("style","border-color: #FF0000;"),jQuery("#"+e).focus(),!0)}function comment_check_privacy_policy(){var e=jQuery("#bwg_submit");e.removeClass("bwg-submit-disabled"),e.removeAttr("disabled"),jQuery("#bwg_comment_privacy_policy").is(":checked")||(e.addClass("bwg-submit-disabled"),e.attr("disabled","disabled"))}function spider_check_email(e){if(""!=jQuery("#"+e).val())return-1==jQuery("#"+e).val().replace(/^\s+|\s+$/g,"").search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)&&(alert(bwg_objectsL10n.bwg_mail_validation),!0)}function bwg_captcha_refresh(e){document.getElementById(e+"_img")&&document.getElementById(e+"_input")&&(srcArr=document.getElementById(e+"_img").src.split("&r="),document.getElementById(e+"_img").src=srcArr[0]+"&r="+Math.floor(100*Math.random()),document.getElementById(e+"_img").style.display="inline-block",document.getElementById(e+"_input").value="")}function bwg_play_instagram_video(e,t){jQuery(e).parent().find("video").each(function(){jQuery(this).get(0).paused?(jQuery(this).get(0).play(),jQuery(e).children().hide()):(jQuery(this).get(0).pause(),jQuery(e).children().show())})}function bwg_add_comment(){var t=jQuery("#bwg_comment_form"),e=t.attr("action"),i={ajax_task:"add_comment"};return i.comment_name=t.find("#bwg_name").val(),i.comment_email=t.find("#bwg_email").val(),i.comment_text=t.find("#bwg_comment").val(),i.comment_captcha=t.find("#bwg_captcha_input").val(),i.privacy_policy=t.find("#bwg_comment_privacy_policy").is(":checked")?1:0,i.comment_image_id=jQuery("#bwg_popup_image").attr("image_id"),i.comment_moderation=t.find("#bwg_comment_moderation").val(),jQuery(".bwg_spider_ajax_loading").hide(),jQuery.ajax({url:e,type:"POST",dataType:"json",data:i,success:function(e){jQuery(".bwg_comment_error").text(""),1==e.error?jQuery.each(e.error_messages,function(e,t){t&&jQuery(".bwg_comment_"+e+"_error").text(t)}):(t.find("#bwg_comment").val(""),jQuery(".bwg_comment_waiting_message").hide(),0==e.published&&jQuery(".bwg_comment_waiting_message").show(),""!=e.html_comments_block&&jQuery("#bwg_added_comments").html(e.html_comments_block).show())},beforeSend:function(){jQuery(".bwg_spider_ajax_loading").show()},complete:function(){0<t.find("#bwg_comment_privacy_policy").length&&(t.find("#bwg_comment_privacy_policy").prop("checked",!1),comment_check_privacy_policy()),bwg_captcha_refresh("bwg_captcha"),jQuery(".bwg_spider_ajax_loading").hide()},error:function(){}}),!1}function bwg_remove_comment(t){var e=jQuery("#bwg_comment_form").attr("action"),i={ajax_task:"delete_comment"};return i.id_image=jQuery("#bwg_popup_image").attr("image_id"),i.id_comment=t,jQuery.ajax({url:e,type:"POST",dataType:"json",data:i,success:function(e){0==e.error&&jQuery("#bwg_comment_block_"+t).fadeOut("slow").remove()},beforeSend:function(){},complete:function(){},error:function(){}}),!1}function bwg_gallery_box(e,t,i,a){jQuery(".bwg-validate").each(function(){jQuery(this).on("keypress change",function(){jQuery(this).parent().next().find(".bwg_comment_error").html("")})}),void 0===i&&(i=!1);var r,_=t.data("bwg");r=t.find(".bwg-container").data("lightbox-url")?t.find(".bwg-container").data("lightbox-url"):t.data("lightbox-url");var s=jQuery("#bwg_tag_id_"+_).val();s=s||0;var o=1==i?"&open_ecommerce=1":"",l=jQuery("#bwg_search_input_"+_).val(),n=jQuery("#bwg_order_"+_).val()?"&filtersortby="+jQuery("#bwg_order_"+_).val():"";l=l||"",void 0!==a&&(r+="&gallery_id="+a);var g="",w=jQuery("#bwg_blog_style_share_buttons_"+e).attr("data-open-comment");void 0!==w&&!1!==w&&(g="&open_comment=1"),spider_createpopup(r+"&bwg_random_seed="+jQuery("#bwg_random_seed_"+_).val()+"&image_id="+e+"&filter_tag="+s+o+g+"&filter_search_name="+l+n,_,t.data("popup-width"),t.data("popup-height"),1,"testpopup",5,t.data("buttons-position"))}function bwg_change_image_lightbox(e,a,r,t){if(jQuery("#bwg_rate_form input[name='image_id']").val(r[a].id),bwg_current_key=gallery_box_data.bwg_current_key,jQuery(".bwg_image_info").css("height","auto"),setTimeout(function(){bwg_info_height_set(),jQuery(".bwg_image_description").height()>jQuery(".bwg_image_info").height()&&jQuery(".mCSB_container").hasClass("mCS_no_scrollbar")&&jQuery(".bwg_image_info").mCustomScrollbar("destroy"),jQuery(".bwg_image_info").hasClass("mCustomScrollbar")||void 0!==jQuery().mCustomScrollbar&&jQuery.isFunction(jQuery().mCustomScrollbar)&&jQuery(".bwg_image_info").mCustomScrollbar({scrollInertia:150,advanced:{updateOnContentResize:!0}})},200),jQuery("#spider_popup_left").show(),jQuery("#spider_popup_right").show(),jQuery(".bwg_image_info").hide(),0==gallery_box_data.enable_loop&&(a==parseInt(r.length)-1&&jQuery("#spider_popup_right").hide(),0==a&&jQuery("#spider_popup_left").hide()),1==gallery_box_data.ecommerceACtive&&1==gallery_box_data.enable_image_ecommerce)if(0==gallery_box_data.data[a].pricelist)jQuery(".bwg_ecommerce").hide();else{jQuery(".bwg_ecommerce").show(),jQuery(".pge_tabs li").hide(),jQuery("#downloads").hide(),jQuery("#manual").hide();var i=gallery_box_data.data[a].pricelist_sections.split(",");if(i)if(jQuery("#"+i[0]).show(),jQuery("[name=type]").val(i[0]),1<i.length)for(jQuery(".pge_tabs").show(),k=0;k<i.length;k++)jQuery("#"+i[k]+"_li").show();else jQuery(".pge_tabs").hide();else jQuery("[name=type]").val("")}if(jQuery("#bwg_image_container").find("iframe").each(function(){jQuery(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*"),jQuery(this)[0].contentWindow.postMessage('{ "method": "pause" }',"*"),jQuery(this)[0].contentWindow.postMessage("pause","*")}),jQuery("#bwg_image_container").find("video").each(function(){jQuery(this).trigger("pause")}),void 0===r&&(r=gallery_box_data.data),void 0!==r[a]&&void 0!==r[e]){if(jQuery(".bwg_play_pause").length&&!jQuery(".bwg_play_pause").hasClass("bwg-icon-play")&&bwg_play(r),t||jQuery("#bwg_current_image_key").val(a),gallery_box_data.bwg_trans_in_progress)return void gallery_box_data.event_stack.push(e+"-"+a);var _="right";if(bwg_current_key>a)_="left";else if(bwg_current_key==a)return;jQuery(".bwg_image_count").html(r[a].number),jQuery(".bwg_watermark").css({display:"none"}),"width"==gallery_box_data.width_or_height?bwg_current_filmstrip_pos=a*(jQuery(".bwg_filmstrip_thumbnail").width()+2+2*gallery_box_data.lightbox_filmstrip_thumb_border_width):"height"==gallery_box_data.width_or_height&&(bwg_current_filmstrip_pos=a*(jQuery(".bwg_filmstrip_thumbnail").height()+2+2*gallery_box_data.lightbox_filmstrip_thumb_border_width)),gallery_box_data.bwg_current_key=a,bwg_objectsL10n.is_pro&&(location.replace("#bwg"+gallery_box_data.gallery_id+"/"+r[a].id),history.replaceState(void 0,void 0,"#bwg"+gallery_box_data.gallery_id+"/"+r[a].id)),gallery_box_data.popup_enable_rate&&(jQuery("#bwg_star").attr("data-score",r[a].avg_rating),jQuery("#bwg_star").removeAttr("title"),r[a].cur_key=a,bwg_rating(r[a].rate,r[a].rate_count,r[a].avg_rating,a)),spider_set_input_value("rate_ajax_task","save_hit_count"),spider_rate_ajax_save("bwg_rate_form"),jQuery(".bwg_image_hits span").html(++r[a].hit_count),jQuery("#bwg_popup_image").attr("image_id",r[a].id),jQuery(".bwg_image_title").html(jQuery("<span />").html(r[a].alt).text()),jQuery(".bwg_image_description").html(jQuery("<span />").html(r[a].description).text()),jQuery(".bwg_filmstrip_thumbnail").removeClass("bwg_thumb_active").addClass("bwg_thumb_deactive"),jQuery("#bwg_filmstrip_thumbnail_"+a).removeClass("bwg_thumb_deactive").addClass("bwg_thumb_active"),jQuery(".bwg_image_info").css("opacity",1),""==r[a].alt.trim()&&""==r[a].description.trim()&&jQuery(".bwg_image_info").css("opacity",0),"none"!=jQuery(".bwg_image_info_container1").css("display")?jQuery(".bwg_image_info_container1").css("display","table-cell"):jQuery(".bwg_image_info_container1").css("display","none"),"none"!=jQuery(".bwg_image_rate_container1").css("display")?jQuery(".bwg_image_rate_container1").css("display","table-cell"):jQuery(".bwg_image_rate_container1").css("display","none");var s=2==jQuery(".bwg_popup_image_spun").css("zIndex")?".bwg_popup_image_spun":".bwg_popup_image_second_spun",o=".bwg_popup_image_second_spun"==s?".bwg_popup_image_spun":".bwg_popup_image_second_spun",l=-1<r[a].filetype.indexOf("EMBED_"),n=-1<r[a].filetype.indexOf("INSTAGRAM_POST"),g=-1<r[a].filetype.indexOf("INSTAGRAM_VIDEO"),w=-1!==jQuery.inArray(r[a].filetype,["EMBED_OEMBED_YOUTUBE_VIDEO","EMBED_OEMBED_VIMEO_VIDEO","EMBED_OEMBED_FACEBOOK_VIDEO","EMBED_OEMBED_DAILYMOTION_VIDEO"]),b=jQuery(s).height(),u=jQuery(s).width(),d='<span class="bwg_popup_image_spun1" style="display: '+(l?"block":"table")+'; width: inherit; height: inherit;"><span class="bwg_popup_image_spun2" style="display:'+(l?"block":"table-cell")+'; vertical-align: middle;text-align: center;height: 100%;">';if(l){if(jQuery("#bwg_download").addClass("hidden"),d+='<span class="bwg_popup_embed bwg_popup_watermark" style="display: '+(w?"block":"table")+'; table-layout: fixed; height: 100%;">'+(g?'<div class="bwg_inst_play_btn_cont" onclick="bwg_play_instagram_video(this)" ><div class="bwg_inst_play"></div></div>':" "),n){var h=0,m=0;b<u+88?h=(m=b)-88:m=(h=u)+88,d+=spider_display_embed(r[a].filetype,r[a].image_url,r[a].filename,{class:"bwg_embed_frame","data-width":r[a].image_width,"data-height":r[a].image_height,frameborder:"0",allowfullscreen:"allowfullscreen",style:"width:"+h+"px; height:"+m+"px; vertical-align:middle; display:inline-block; position:relative;"})}else d+=spider_display_embed(r[a].filetype,r[a].image_url,r[a].filename,{class:"bwg_embed_frame",frameborder:"0",allowfullscreen:"allowfullscreen",style:"display:"+(w?"block":"table-cell")+"; width:inherit; height:inherit; vertical-align:middle;"});d+="</span>"}else jQuery(".bwg-loading").removeClass("hidden"),jQuery("#bwg_download").removeClass("hidden"),d+='<img style="max-height: '+b+"px; max-width: "+u+'px;" class="bwg_popup_image bwg_popup_watermark" src="'+gallery_box_data.site_url+jQuery("<span />").html(r[a].image_url).text()+'" alt="'+r[a].alt+'" />';function p(){gallery_box_data.preload_images&&bwg_preload_images(a),window["bwg_"+gallery_box_data.bwg_image_effect](s,o,_),jQuery(s).find(".bwg_fb_video").each(function(){jQuery(this).attr("src","")}),l?jQuery("#bwg_fullsize_image").attr("href",r[a].image_url):(jQuery("#bwg_fullsize_image").attr("href",gallery_box_data.site_url+r[a].image_url),jQuery("#bwg_download").attr("href",gallery_box_data.site_url+r[a].thumb_url.replace("/thumb/","/.original/")));var e=r[a].image_url.split("/");jQuery("#bwg_download").attr("download",e[e.length-1].replace(/\?bwg=(\d+)$/,""));var t=encodeURIComponent(gallery_box_data.bwg_share_url)+"="+r[a].id+encodeURIComponent("#bwg"+gallery_box_data.gallery_id+"/")+r[a].id;if(l)var i=encodeURIComponent(r[a].thumb_url);else i=gallery_box_data.bwg_share_image_url+encodeURIComponent(encodeURIComponent(r[a].image_url));i=i.replace(/%252F/g,"%2F"),void 0!==addthis_share&&(addthis_share.url=t),jQuery("#bwg_facebook_a").attr("href","https://www.facebook.com/sharer/sharer.php?u="+t),jQuery("#bwg_twitter_a").attr("href","https://twitter.com/share?url="+t),jQuery("#bwg_pinterest_a").attr("href","http://pinterest.com/pin/create/button/?s=100&url="+t+"&media="+i+"&description="+r[a].alt+"%0A"+r[a].description),jQuery("#bwg_tumblr_a").attr("href","https://www.tumblr.com/share/photo?source="+i+"&caption="+r[a].alt+"&clickthru="+t),jQuery(".bwg_comment_container").hasClass("bwg_open")&&(jQuery(".bwg_comments .mCSB_container").css("top","0"),0==r[a].comment_count?jQuery("#bwg_added_comments").hide():(jQuery("#bwg_added_comments").show(),spider_set_input_value("ajax_task","display"),spider_set_input_value("image_id",jQuery("#bwg_popup_image").attr("image_id")),spider_ajax_save("bwg_comment_form"))),jQuery(".bwg_ecommerce_container").hasClass("bwg_open")&&(0==r[a].pricelist?(bwg_popup_sidebar_close(jQuery(".bwg_ecommerce_container")),bwg_animate_image_box_for_hide_sidebar(),jQuery(".bwg_ecommerce_container").attr("class","bwg_ecommerce_container bwg_close"),jQuery(".bwg_ecommerce").attr("title",bwg_objectsL10n.bwg_show_ecommerce),jQuery(".spider_popup_close_fullscreen").show()):get_ajax_pricelist()),void 0!==jQuery().mCustomScrollbar&&jQuery.isFunction(jQuery().mCustomScrollbar)&&jQuery(".bwg_comments").mCustomScrollbar({advanced:{updateOnContentResize:!0}}),jQuery(".bwg_comments .mCSB_scrollTools").hide(),gallery_box_data.enable_image_filmstrip&&bwg_move_filmstrip(),bwg_resize_instagram_post()}if(d+="</span></span>",jQuery(o).html(d),jQuery(o).find("img").on("load error",function(){jQuery(".bwg-loading").addClass("hidden")}),jQuery(".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video").css({maxWidth:u,maxHeight:b,height:"auto"}),l)p();else jQuery(o).find("img").one("load",function(){p()}).each(function(){this.complete&&jQuery(this).load()})}}function bwg_preload_images_lightbox(e){for(var t=gallery_box_data.data,i=t.length,a=0==gallery_box_data.preload_images_count||gallery_box_data.preload_images_count>=i?i:gallery_box_data.preload_images_count,r=0,_=1;r<a;_++){var s=1;do{var o=(e+_*s+i)%i;if(void 0!==t[o])-1<t[o].filetype.indexOf("EMBED_")||jQuery("<img/>").attr("src",gallery_box_data.site_url+jQuery("<span />").html(t[o].image_url).text());s*=-1,r++}while(1!=s)}}function bwg_popup_sidebar_open(e){var t=gallery_box_data.lightbox_comment_width,i=gallery_box_data.lightbox_comment_pos;if(t>jQuery(window).width()){if(t=jQuery(window).width(),e.css({width:t}),jQuery(".spider_popup_close_fullscreen").hide(),jQuery(".spider_popup_close").hide(),jQuery(".bwg_ctrl_btn").hasClass("bwg-icon-pause")){var a=/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());jQuery(".bwg_play_pause").trigger(a?"touchend":"click")}}else jQuery(".spider_popup_close_fullscreen").show();"left"==i?e.animate({left:0},100):e.animate({right:0},100)}function bwg_comment(){if(jQuery(".bwg_watermark").css({display:"none"}),jQuery(".bwg_ecommerce_wrap").css("z-index","-1"),jQuery(".bwg_comment_wrap").css("z-index","25"),jQuery(".bwg_ecommerce_container").hasClass("bwg_open")&&(bwg_popup_sidebar_close(jQuery(".bwg_ecommerce_container")),jQuery(".bwg_ecommerce_container").attr("class","bwg_ecommerce_container bwg_close"),jQuery(".bwg_ecommerce").attr("title",bwg_objectsL10n.bwg_show_ecommerce)),jQuery(".bwg_comment_container").hasClass("bwg_open"))"1"==jQuery(".bwg_comment_container").attr("data-play-status")&&jQuery(".bwg_ctrl_btn.bwg_play_pause").removeClass("bwg-icon-play").addClass("bwg-icon-pause").attr("title",bwg_objectsL10n.bwg_pause),bwg_popup_sidebar_close(jQuery(".bwg_comment_container")),bwg_animate_image_box_for_hide_sidebar(),jQuery(".bwg_comment_wrap").css("z-index","-1"),jQuery(".bwg_comment_container").attr("class","bwg_comment_container bwg_close"),jQuery(".bwg_comment").attr("title",bwg_objectsL10n.bwg_show_comments),jQuery(".spider_popup_close_fullscreen").show();else{jQuery(".bwg_play_pause").hasClass("bwg-icon-pause")?jQuery(".bwg_comment_container").attr("data-play-status","1"):jQuery(".bwg_comment_container").attr("data-play-status","0"),jQuery(".bwg_ctrl_btn.bwg_play_pause").removeClass("bwg-icon-pause").addClass("bwg-icon-play").attr("title",bwg_objectsL10n.bwg_play),bwg_popup_sidebar_open(jQuery(".bwg_comment_container")),bwg_animate_image_box_for_show_sidebar(),jQuery(".bwg_comment_container").attr("class","bwg_comment_container bwg_open"),jQuery(".bwg_comment").attr("title",bwg_objectsL10n.bwg_hide_comments);var e=parseInt(jQuery("#bwg_current_image_key").val());void 0!==gallery_box_data[e]&&0!=gallery_box_data[e].comment_count&&(jQuery("#bwg_added_comments").show(),spider_set_input_value("ajax_task","display"),spider_set_input_value("image_id",jQuery("#bwg_popup_image").attr("image_id")),spider_ajax_save("bwg_comment_form"))}jQuery(".bwg_comments").mCustomScrollbar("update",{scrollInertia:150,advanced:{updateOnContentResize:!0}})}function bwg_ecommerce(){jQuery(".bwg_watermark").css({display:"none"}),jQuery(".bwg_ecommerce_wrap").css("z-index","25"),jQuery(".bwg_comment_wrap").css("z-index","-1"),jQuery(".bwg_comment_container").hasClass("bwg_open")&&(bwg_popup_sidebar_close(jQuery(".bwg_comment_container")),jQuery(".bwg_comment_container").attr("class","bwg_comment_container bwg_close"),jQuery(".bwg_comment").attr("title",bwg_objectsL10n.bwg_show_comments)),jQuery(".bwg_ecommerce_container").hasClass("bwg_open")?(bwg_popup_sidebar_close(jQuery(".bwg_ecommerce_container")),bwg_animate_image_box_for_hide_sidebar(),jQuery(".bwg_ecommerce_container").attr("class","bwg_ecommerce_container bwg_close"),jQuery(".bwg_ecommerce").attr("title",bwg_objectsL10n.bwg_show_ecommerce)):(bwg_popup_sidebar_open(jQuery(".bwg_ecommerce_container")),bwg_animate_image_box_for_show_sidebar(),jQuery(".bwg_ecommerce_container").attr("class","bwg_ecommerce_container bwg_open"),jQuery(".bwg_ecommerce").attr("title",bwg_objectsL10n.bwg_hide_ecommerce),get_ajax_pricelist())}function bwg_popup_sidebar_close(e){var t=parseInt(e.css("borderRightWidth"));t||(t=0),"left"==lightbox_comment_pos?e.animate({left:-e.width()-t},100):"right"==lightbox_comment_pos&&e.animate({right:-e.width()-t},100)}function bwg_animate_image_box_for_hide_sidebar(){"left"==lightbox_comment_pos?jQuery(".bwg_image_wrap").animate({left:0,width:jQuery("#spider_popup_wrap").width()},100):"right"==lightbox_comment_pos&&jQuery(".bwg_image_wrap").animate({right:0,width:jQuery("#spider_popup_wrap").width()},100),jQuery(".bwg_image_container").animate({width:jQuery("#spider_popup_wrap").width()-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)},100),jQuery(".bwg_popup_image").animate({maxWidth:jQuery("#spider_popup_wrap").width()-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)},{duration:100,complete:function(){bwg_change_watermark_container()}}),jQuery(".bwg_popup_embed").animate({width:jQuery("#spider_popup_wrap").width()-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)},{duration:100,complete:function(){bwg_resize_instagram_post(),bwg_change_watermark_container()}}),"width"==gallery_box_data.width_or_height?(jQuery(".bwg_filmstrip_container").animate({width:jQuery(".spider_popup_wrap").width()},100),jQuery(".bwg_filmstrip").animate({width:jQuery(".spider_popup_wrap").width()-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())},100)):"height"==gallery_box_data.width_or_height&&(jQuery(".bwg_filmstrip_container").animate({height:jQuery(".spider_popup_wrap").width()},100),jQuery(".bwg_filmstrip").animate({height:jQuery(".spider_popup_wrap").width()-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())},100)),bwg_set_filmstrip_pos(jQuery(".spider_popup_wrap").width()-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height()),"",gallery_box_data),jQuery(".spider_popup_close_fullscreen").show(100)}function bwg_animate_image_box_for_show_sidebar(){var e=jQuery(".bwg_comment_container").width()||jQuery(".bwg_ecommerce_container").width();"left"==lightbox_comment_pos?jQuery(".bwg_image_wrap").animate({left:e,width:jQuery("#spider_popup_wrap").width()-e},100):"right"==lightbox_comment_pos&&jQuery(".bwg_image_wrap").animate({right:e,width:jQuery("#spider_popup_wrap").width()-e},100),jQuery(".bwg_image_container").animate({width:jQuery("#spider_popup_wrap").width()-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)-e},100),jQuery(".bwg_popup_image").animate({maxWidth:jQuery("#spider_popup_wrap").width()-e-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)},{duration:100,complete:function(){bwg_change_watermark_container()}}),jQuery(".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video").animate({maxWidth:jQuery("#spider_popup_wrap").width()-e-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)},{duration:100,complete:function(){bwg_resize_instagram_post(),bwg_change_watermark_container()}}),"width"==gallery_box_data.width_or_height&&(jQuery(".bwg_filmstrip_container").css({width:jQuery("#spider_popup_wrap").width()-("vertical"==gallery_box_data.filmstrip_direction?0:e)}),jQuery(".bwg_filmstrip").animate({width:jQuery(".bwg_filmstrip_container").width()-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())},100),bwg_set_filmstrip_pos(jQuery(".bwg_filmstrip_container").width()-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height()),"",gallery_box_data))}function bwg_reset_zoom(){var e=/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()),t=document.querySelector('meta[name="viewport"]');e&&t&&(t.content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0")}function bwg_open_with_fullscreen(){jQuery(".bwg_watermark").css({display:"none"});var e=0;(jQuery(".bwg_comment_container").hasClass("bwg_open")||jQuery(".bwg_ecommerce_container").hasClass("bwg_open"))&&(e=jQuery(".bwg_comment_container").width()||jQuery(".bwg_ecommerce_container").width()),bwg_popup_current_width=jQuery(window).width(),bwg_popup_current_height=window.innerHeight,jQuery("#spider_popup_wrap").css({width:jQuery(window).width(),height:window.innerHeight,left:0,top:0,margin:0,zIndex:100002}),jQuery(".bwg_image_wrap").css({width:jQuery(window).width()-e}),jQuery(".bwg_image_container").css({height:bwg_popup_current_height-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0),width:bwg_popup_current_width-e-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)}),jQuery(".bwg_popup_image").css({maxWidth:jQuery(window).width()-e-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0),maxHeight:window.innerHeight-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)},{complete:function(){bwg_change_watermark_container()}}),jQuery(".bwg_popup_video").css({width:jQuery(window).width()-e-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0),height:window.innerHeight-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)},{complete:function(){bwg_change_watermark_container()}}),jQuery(".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video").css({maxWidth:jQuery(window).width()-e-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0),maxHeight:window.innerHeight-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)},{complete:function(){bwg_resize_instagram_post(),bwg_change_watermark_container()}}),"width"==gallery_box_data.width_or_height?(jQuery(".bwg_filmstrip_container").css({width:jQuery(window).width()-("horizontal"==gallery_box_data.filmstrip_direction?"comment_container_width":0)}),jQuery(".bwg_filmstrip").css({width:jQuery(window).width()-("horizontal"==gallery_box_data.filmstrip_direction?"comment_container_width":0)-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())}),bwg_set_filmstrip_pos(jQuery(window).width()-("horizontal"==gallery_box_data.filmstrip_direction?"comment_container_width":0)-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height()),"",gallery_box_data)):(jQuery(".bwg_filmstrip_container").css({height:window.innerHeight-("horizontal"==gallery_box_data.filmstrip_direction?"comment_container_width":0)}),jQuery(".bwg_filmstrip").css({height:window.innerHeight-("horizontal"==gallery_box_data.filmstrip_direction?"comment_container_width":0)-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())}),bwg_set_filmstrip_pos(window.innerHeight-("horizontal"==gallery_box_data.filmstrip_direction?"comment_container_width":0)-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height()),"",gallery_box_data)),jQuery(".bwg_resize-full").attr("class","bwg-icon-compress bwg_ctrl_btn bwg_resize-full"),jQuery(".bwg_resize-full").attr("title",bwg_objectsL10n.bwg_restore),jQuery(".spider_popup_close").attr("class","bwg_ctrl_btn spider_popup_close_fullscreen")}function bwg_resize_full(){jQuery(".bwg_watermark").css({display:"none"});var e=0;(jQuery(".bwg_comment_container").hasClass("bwg_open")||jQuery(".bwg_ecommerce_container").hasClass("bwg_open"))&&(e=jQuery(".bwg_comment_container").width()||jQuery(".bwg_ecommerce_container").width()),jQuery(".bwg_resize-full").hasClass("bwg-icon-compress")?(jQuery(window).width()>gallery_box_data.image_width&&(bwg_popup_current_width=gallery_box_data.image_width),window.innerHeight>gallery_box_data.image_height&&(bwg_popup_current_height=gallery_box_data.image_height),jQuery("#spider_popup_wrap").animate({width:bwg_popup_current_width,height:bwg_popup_current_height,left:"50%",top:"50%",marginLeft:-bwg_popup_current_width/2,marginTop:-bwg_popup_current_height/2,zIndex:100002},500),jQuery(".bwg_image_wrap").animate({width:bwg_popup_current_width-e},500),jQuery(".bwg_image_container").animate({height:bwg_popup_current_height-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0),width:bwg_popup_current_width-e-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)},500),jQuery(".bwg_popup_image").animate({maxWidth:bwg_popup_current_width-e-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0),maxHeight:bwg_popup_current_height-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)},{duration:500,complete:function(){bwg_change_watermark_container(),jQuery("#spider_popup_wrap").width()<jQuery(window).width()&&jQuery("#spider_popup_wrap").height()<window.innerHeight&&jQuery(".spider_popup_close_fullscreen").attr("class","spider_popup_close")}}),jQuery(".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video").animate({maxWidth:bwg_popup_current_width-e-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0),maxHeight:bwg_popup_current_height-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)},{duration:500,complete:function(){bwg_resize_instagram_post(),bwg_change_watermark_container(),jQuery("#spider_popup_wrap").width()<jQuery(window).width()&&jQuery("#spider_popup_wrap").height()<window.innerHeight&&jQuery(".spider_popup_close_fullscreen").attr("class","spider_popup_close")}}),"width"==gallery_box_data.width_or_height?(jQuery(".bwg_filmstrip_container").animate({width:bwg_popup_current_width-("horizontal"==gallery_box_data.filmstrip_direction?e:0)},500),jQuery(".bwg_filmstrip").animate({width:bwg_popup_current_width-("horizontal"==gallery_box_data.filmstrip_direction?e:0)-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())},500),bwg_set_filmstrip_pos(bwg_popup_current_width-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height()),"",gallery_box_data)):(jQuery(".bwg_filmstrip_container").animate({height:bwg_popup_current_height-("horizontal"==gallery_box_data.filmstrip_direction?e:0)},500),jQuery(".bwg_filmstrip").animate({height:bwg_popup_current_height-("horizontal"==gallery_box_data.filmstrip_direction?e:0)-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())},500),bwg_set_filmstrip_pos(bwg_popup_current_height-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height()),"",gallery_box_data),"horizontal"!=gallery_box_data.filmstrip_direction&&jQuery(".bwg_filmstrip_right").css({top:bwg_popup_current_height-jQuery(".bwg_filmstrip_right").height()})),jQuery(".bwg_resize-full").attr("class","bwg-icon-expand bwg_ctrl_btn bwg_resize-full"),jQuery(".bwg_resize-full").attr("title",bwg_objectsL10n.bwg_maximize),setTimeout(function(){bwg_info_height_set()},500)):(bwg_popup_current_width=jQuery(window).width(),bwg_popup_current_height=window.innerHeight,jQuery("#spider_popup_wrap").animate({width:jQuery(window).width(),height:window.innerHeight,left:0,top:0,margin:0,zIndex:100002},500),jQuery(".bwg_image_wrap").animate({width:jQuery(window).width()-e},500),jQuery(".bwg_image_container").animate({height:bwg_popup_current_height-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0),width:bwg_popup_current_width-e-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)},500),jQuery(".bwg_popup_image").animate({maxWidth:jQuery(window).width()-e-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0),maxHeight:window.innerHeight-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)},{duration:500,complete:function(){bwg_change_watermark_container()}}),jQuery(".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video").animate({maxWidth:jQuery(window).width()-e-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0),maxHeight:window.innerHeight-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)},{duration:500,complete:function(){bwg_resize_instagram_post(),bwg_change_watermark_container()}}),"width"==gallery_box_data.width_or_height?(jQuery(".bwg_filmstrip_container").animate({width:jQuery(window).width()-("horizontal"==gallery_box_data.filmstrip_direction?e:0)},500),jQuery(".bwg_filmstrip").animate({width:jQuery(window).width()-("horizontal"==gallery_box_data.filmstrip_direction?e:0)-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())},500),bwg_set_filmstrip_pos(jQuery(window).width()-("horizontal"==gallery_box_data.filmstrip_direction?e:0)-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height()),"",gallery_box_data)):(jQuery(".bwg_filmstrip_container").animate({height:window.innerHeight-("horizontal"==gallery_box_data.filmstrip_direction?e:0)},500),jQuery(".bwg_filmstrip").animate({height:window.innerHeight-("horizontal"==gallery_box_data.filmstrip_direction?e:0)-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())},500),bwg_set_filmstrip_pos(window.innerHeight-("horizontal"==gallery_box_data.filmstrip_direction?e:0)-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height()),"",gallery_box_data),"horizontal"!=gallery_box_data.filmstrip_direction&&jQuery(".bwg_filmstrip_right").css({top:window.innerHeight-jQuery(".bwg_filmstrip_right").height()})),jQuery(".bwg_resize-full").attr("class","bwg-icon-compress bwg_ctrl_btn bwg_resize-full"),jQuery(".bwg_resize-full").attr("title",bwg_objectsL10n.bwg_restore),jQuery(".spider_popup_close").attr("class","bwg_ctrl_btn spider_popup_close_fullscreen")),setTimeout(function(){bwg_info_height_set()},500)}function bwg_popup_resize_lightbox(){void 0!==jQuery().fullscreen&&jQuery.isFunction(jQuery().fullscreen)&&(jQuery.fullscreen.isFullScreen()||(jQuery(".bwg_resize-full").show(),jQuery(".bwg_resize-full").hasClass("bwg-icon-compress")||jQuery(".bwg_resize-full").attr("class","bwg-icon-expand bwg_ctrl_btn bwg_resize-full"),jQuery(".bwg_resize-full").attr("title",bwg_objectsL10n.bwg_maximize),jQuery(".bwg_fullscreen").attr("class","bwg-icon-arrows-out bwg_ctrl_btn bwg_fullscreen"),jQuery(".bwg_fullscreen").attr("title",bwg_objectsL10n.fullscreen)));var e=0;(jQuery(".bwg_comment_container").hasClass("bwg_open")||jQuery(".bwg_ecommerce_container").hasClass("bwg_open"))&&(e=gallery_box_data.lightbox_comment_width),e>jQuery(window).width()?(e=jQuery(window).width(),jQuery(".bwg_comment_container").css({width:e}),jQuery(".bwg_ecommerce_container").css({width:e}),jQuery(".spider_popup_close_fullscreen").hide()):jQuery(".spider_popup_close_fullscreen").show(),window.innerHeight>gallery_box_data.image_height&&1!=gallery_box_data.open_with_fullscreen&&!jQuery(".bwg_resize-full").hasClass("bwg-icon-compress")?(jQuery("#spider_popup_wrap").css({height:gallery_box_data.image_height,top:"50%",marginTop:-gallery_box_data.image_height/2,zIndex:100002}),jQuery(".bwg_image_container").css({height:gallery_box_data.image_height-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)}),jQuery(".bwg_image_info").css("height","auto"),bwg_info_height_set(),jQuery(".bwg_popup_image").css({maxHeight:gallery_box_data.image_height-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)}),jQuery(".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video").css({maxHeight:gallery_box_data.image_height-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)}),"vertical"==gallery_box_data.filmstrip_direction&&(jQuery(".bwg_filmstrip_container").css({height:gallery_box_data.image_height}),jQuery(".bwg_filmstrip").css({height:gallery_box_data.image_height-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())})),bwg_popup_current_height=gallery_box_data.image_height):(jQuery("#spider_popup_wrap").css({height:window.innerHeight,top:0,marginTop:0,zIndex:100002}),jQuery(".bwg_image_container").css({height:window.innerHeight-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)}),jQuery(".bwg_image_info").css("height","auto"),bwg_info_height_set(),jQuery(".bwg_popup_image").css({maxHeight:window.innerHeight-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)}),jQuery(".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video").css({maxHeight:window.innerHeight-("horizontal"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_height:0)}),"vertical"==gallery_box_data.filmstrip_direction&&(jQuery(".bwg_filmstrip_container").css({height:window.innerHeight}),jQuery(".bwg_filmstrip").css({height:window.innerHeight-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())})),bwg_popup_current_height=window.innerHeight),jQuery(window).width()>=gallery_box_data.image_width&&1!=gallery_box_data.open_with_fullscreen?(jQuery("#spider_popup_wrap").css({width:gallery_box_data.image_width,left:"50%",marginLeft:-gallery_box_data.image_width/2,zIndex:100002}),jQuery(".bwg_image_wrap").css({width:gallery_box_data.image_width-e}),jQuery(".bwg_image_container").css({width:gallery_box_data.image_width-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)-e}),jQuery(".bwg_image_info").css("height","auto"),bwg_info_height_set(),jQuery(".bwg_popup_image").css({maxWidth:gallery_box_data.image_width-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)-e}),jQuery(".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video").css({maxWidth:gallery_box_data.image_width-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)-e}),"horizontal"==gallery_box_data.filmstrip_direction&&(jQuery(".bwg_filmstrip_container").css({width:gallery_box_data.image_width-e}),jQuery(".bwg_filmstrip").css({width:gallery_box_data.image_width-e-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())})),bwg_popup_current_width=gallery_box_data.image_width):(jQuery("#spider_popup_wrap").css({width:jQuery(window).width(),left:0,marginLeft:0,zIndex:100002}),jQuery(".bwg_image_wrap").css({width:jQuery(window).width()-e}),jQuery(".bwg_image_container").css({width:jQuery(window).width()-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)-e}),jQuery(".bwg_popup_image").css({maxWidth:jQuery(window).width()-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)-e}),jQuery(".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video").css({maxWidth:jQuery(window).width()-("vertical"==gallery_box_data.filmstrip_direction?gallery_box_data.image_filmstrip_width:0)-e}),"horizontal"==gallery_box_data.filmstrip_direction&&(jQuery(".bwg_filmstrip_container").css({width:jQuery(window).width()-e}),jQuery(".bwg_filmstrip").css({width:jQuery(window).width()-e-2*("horizontal"==gallery_box_data.filmstrip_direction?jQuery(".bwg_filmstrip_right").width():jQuery(".bwg_filmstrip_right").height())})),bwg_popup_current_width=jQuery(window).width()),bwg_resize_instagram_post(),bwg_change_watermark_container(),window.innerHeight>gallery_box_data.image_height-2*gallery_box_data.lightbox_close_btn_top&&jQuery(window).width()>=gallery_box_data.image_width-2*gallery_box_data.lightbox_close_btn_right&&1!=gallery_box_data.open_with_fullscreen?jQuery(".spider_popup_close_fullscreen").attr("class","spider_popup_close"):jQuery("#spider_popup_wrap").width()<jQuery(window).width()&&jQuery("#spider_popup_wrap").height()<jQuery(window).height()&&jQuery(".spider_popup_close").attr("class","bwg_ctrl_btn spider_popup_close_fullscreen");var t=gallery_box_data.bwg_ctrl_btn_container_height;"bottom"==gallery_box_data.lightbox_ctrl_btn_pos&&jQuery(".bwg_toggle_container i").hasClass("bwg-icon-caret-down")&&jQuery(".bwg_toggle_container").css("bottom",t+"px"),"top"==gallery_box_data.lightbox_ctrl_btn_pos&&jQuery(".bwg_toggle_container i").hasClass("bwg-icon-caret-up")&&jQuery(".bwg_toggle_container").css("top",t+"px")}function bwg_rating(e,t,i,a){lightbox_rate_stars_count=gallery_box_data.lightbox_rate_stars_count,lightbox_rate_size=gallery_box_data.lightbox_rate_size,lightbox_rate_icon=gallery_box_data.lightbox_rate_icon;var r="Not rated yet.";0!=i&&""!=i&&(r=parseFloat(i).toFixed(1)+"\n Votes: "+t),void 0!==jQuery().raty&&jQuery.isFunction(jQuery().raty)&&jQuery("#bwg_star").raty({score:function(){return jQuery(this).attr("data-score")},starType:"i",number:lightbox_rate_stars_count,size:lightbox_rate_size,readOnly:function(){return!!e},noRatedMsg:"Not rated yet.",click:function(t,e){jQuery("#bwg_star").hide(),jQuery("#bwg_rated").show(),spider_set_input_value("rate_ajax_task","save_rate"),jQuery.when(spider_rate_ajax_save("bwg_rate_form")).then(function(){gallery_box_data.data[a].rate=t,++gallery_box_data.data[a].rate_count;var e=parseFloat(jQuery("#bwg_star").attr("data-score"));gallery_box_data.data[a].avg_rating=e?((e+t)/2).toFixed(1):t.toFixed(1),bwg_rating(gallery_box_data.data[a].rate,gallery_box_data.data[a].rate_count,gallery_box_data.data[a].avg_rating,gallery_box_data.current_image_key)})},starHalf:"bwg-icon-"+lightbox_rate_icon+("star"==lightbox_rate_icon?"-half":"")+"-o",starOff:"bwg-icon-"+lightbox_rate_icon+"-o",starOn:"bwg-icon-"+lightbox_rate_icon,cancelOff:"bwg-icon-minus-square-o",cancelOn:"bwg-icon-minus-square-o",cancel:!1,cancelHint:"Cancel your rating.",hints:[r,r,r,r,r],alreadyRatedMsg:parseFloat(i).toFixed(1)+"\nYou have already rated.\nVotes: "+t})}function changeDownloadsTotal(e){var t=0;0==jQuery("[name=option_show_digital_items_count]").val()?jQuery("[name=selected_download_item]:checked").each(function(){t+=Number(jQuery(this).closest("tr").attr("data-price"))}):jQuery(".digital_image_count").each(function(){0!=Number(jQuery(this).val())&&(t+=Number(jQuery(this).closest("tr").attr("data-price"))*Number(jQuery(this).val()))}),t=t.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,"),jQuery(".product_downloads_price").html(t)}function changeMenualTotal(e){Number(jQuery(e).val())<=0&&jQuery(e).val("1");var t=Number(jQuery(e).val()),i=Number(jQuery(".product_manual_price").attr("data-actual-price"));i=(i*=t).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,"),jQuery(".product_manual_price").html(i)}function onSelectableParametersChange(e){var t=0,i=gallery_box_data.data[jQuery("#bwg_current_image_key").val()].pricelist_manual_price?gallery_box_data.data[jQuery("#bwg_current_image_key").val()].pricelist_manual_price:"0";i=parseFloat(i.replace(",",""));var a=jQuery(e).closest(".image_selected_parameter").attr("data-parameter-type"),r=jQuery(e).val();r=r.split("*");var _=parseFloat(r[1]),s=r[0],o=Number(jQuery(e).closest(".image_selected_parameter").find(".already_selected_values").val());if("4"==a||"5"==a){var l=parseFloat(s+_);jQuery(e).closest(".image_selected_parameter").find(".already_selected_values").val(l)}else if("6"==a){if(0==jQuery(e).is(":checked"))var n=o-parseFloat(s+_);else n=o+parseFloat(s+_);jQuery(e).closest(".image_selected_parameter").find(".already_selected_values").val(n)}jQuery(".already_selected_values").each(function(){t+=Number(jQuery(this).val())}),i+=t,jQuery(".product_manual_price").attr("data-actual-price",i),i=(i*=Number(jQuery(".image_count").val())<=0?1:Number(jQuery(".image_count").val())).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,"),jQuery(".product_manual_price").html(i)}function onBtnClickAddToCart(){var e=jQuery("[name=type]").val();if(""!=e){var t={};if("manual"==e){var i=jQuery(".image_count").val(),a={};jQuery(".manual").find(".image_selected_parameter").each(function(){var e=jQuery(this).attr("data-parameter-id"),t="";switch(jQuery(this).attr("data-parameter-type")){case"2":t=jQuery(this).find("input").val();break;case"3":t=jQuery(this).find("textarea").val();break;case"4":t=jQuery(this).find("select :selected").val();break;case"5":t=jQuery(this).find("[type=radio]:checked").val();break;case"6":var i=[];jQuery(this).find("[type=checkbox]:checked").each(function(){i.push(jQuery(this).val())}),t=i}a[e]=t}),t.count=i,t.parameters=a,t.price=jQuery(".product_manual_price").attr("data-price").replace(",","")}else{var r=[];if(0==jQuery("[name=option_show_digital_items_count]").val()){if(0==jQuery("[name=selected_download_item]:checked").length)return void jQuery(".add_to_cart_msg").html("You must select at least one item.");jQuery("[name=selected_download_item]:checked").each(function(){var e={};e.id=jQuery(this).val(),e.count=1,e.price=jQuery(this).closest("tr").attr("data-price"),r.push(e)})}else jQuery(".digital_image_count").each(function(){var e={};0<jQuery(this).val()&&(e.id=jQuery(this).closest("tr").attr("data-id"),e.price=jQuery(this).closest("tr").attr("data-price"),e.count=jQuery(this).val(),r.push(e))});if(0==(t.downloadItems=r).length)return void jQuery(".add_to_cart_msg").html("Please select at least one item")}var _=jQuery("#ajax_url").val(),s={action:"add_cart",task:"add_cart",controller:"checkout",image_id:jQuery("#bwg_popup_image").attr("image_id"),type:e,data:JSON.stringify(t)};jQuery.ajax({type:"POST",url:_,data:s,success:function(e){responseData=JSON.parse(e),jQuery(".add_to_cart_msg").html(responseData.msg),jQuery(".products_in_cart").html(responseData.products_in_cart),1==responseData.redirect&&(window.location.href="<?php echo get_permalink($options->checkout_page);?>")},beforeSend:function(){},complete:function(){}})}else jQuery(".add_to_cart_msg").html("Please select Prints and products or Downloads")}function onBtnViewCart(){var e=jQuery("[name=option_checkout_page]").val();jQuery("#bwg_ecommerce_form").attr("action",e),jQuery("#bwg_ecommerce_form").submit()}function bwg_load_visible_images(e,t,i){0<=e-t&&(startPoint=e-t),i<e+t&&(endPoint=i);for(var a=startPoint;a<=endPoint;a++){var r=jQuery("#bwg_filmstrip_thumbnail_"+a+" img");r.removeClass("hidden"),r.attr("src",r.data("url"))}}function bwg_load_filmstrip(){for(var e=1;e<=total_thumbnail_count;e++){var t;if(leftIndex=startPoint-e,rightIndex=endPoint+e,rightIndex<total_thumbnail_count)(t=jQuery("#bwg_filmstrip_thumbnail_"+rightIndex+" img")).removeClass("hidden"),t.attr("src",t.data("url"));if(0<=leftIndex)(t=jQuery("#bwg_filmstrip_thumbnail_"+leftIndex+" img")).removeClass("hidden"),t.attr("src",t.data("url"))}jQuery(".bwg_filmstrip_thumbnail").each(function(){var e=jQuery(this).find("img");void 0===e.attr("style")&&(0==e.width()?e.on("load",function(){jQuery(this).find(".bwg_filmstrip_thumbnail_img_wrap"),bwg_filmstrip_thumb_view(e)}):(jQuery(this).find(".bwg_filmstrip_thumbnail_img_wrap"),bwg_filmstrip_thumb_view(e)))})}function bwg_filmstrip_thumb_view(e){var t=gallery_box_data.image_filmstrip_height,i=gallery_box_data.image_filmstrip_width,a=i-gallery_box_data.filmstrip_thumb_right_left_space,r=t,_=Math.max(i/e.width(),t/e.height()),s=e.width()*_,o=e.height()*_;e.css({width:s,height:o,marginLeft:(a-s)/2,marginTop:(r-o)/2})}function bwg_info_height_set(){bwg_info_position(!1),jQuery(".mCustomScrollBox").length&&jQuery(".bwg_image_info_container1").height()<jQuery(".mCustomScrollBox").height()+jQuery(".bwg_toggle_container").height()+bwg_image_info_pos+2*parseInt(gallery_box_data.lightbox_info_margin)&&jQuery(".bwg_image_info").css({height:jQuery(".bwg_image_info_container1").height()-jQuery(".bwg_toggle_container").height()-bwg_image_info_pos-2*parseInt(gallery_box_data.lightbox_info_margin)})}function bwg_info_position(e){var t=0,i="none";"top"==gallery_box_data.lightbox_ctrl_btn_pos?"top"==gallery_box_data.lightbox_info_pos&&(i="top"):"bottom"==gallery_box_data.lightbox_info_pos&&(i="bottom"),jQuery(".bwg_ctrl_btn_container").hasClass("closed")||("top"==gallery_box_data.lightbox_ctrl_btn_pos?"top"==gallery_box_data.lightbox_info_pos&&(t=jQuery(".bwg_ctrl_btn_container").height()):"bottom"==gallery_box_data.lightbox_info_pos&&(t=jQuery(".bwg_ctrl_btn_container").height())),"top"==i?0==e?jQuery(".bwg_image_info").css("top",t):jQuery(".bwg_image_info").animate({top:t+"px"},500):"bottom"==i&&(0==e?jQuery(".bwg_image_info").css("bottom",t):jQuery(".bwg_image_info").animate({bottom:t+"px"},500))}function spider_display_embed(e,t,i,a){var r="";switch(e){case"EMBED_OEMBED_YOUTUBE_VIDEO":var _="<iframe ";for(attr in""!=i&&(_+=' src="//www.youtube.com/embed/'+i+'?enablejsapi=1&wmode=transparent"'),a)/src/i.test(attr)||""!=attr&&""!=a[attr]&&(_+=" "+attr+'="'+a[attr]+'"');r+=_+=" ></iframe>";break;case"EMBED_OEMBED_VIMEO_VIDEO":var s="<iframe ";for(attr in""!=i&&(s+=' src="//player.vimeo.com/video/'+i+'?enablejsapi=1"'),a)/src/i.test(attr)||""!=attr&&""!=a[attr]&&(s+=" "+attr+'="'+a[attr]+'"');r+=s+=" ></iframe>";break;case"EMBED_OEMBED_FLICKR_IMAGE":var o="<div ";for(attr in a)/src/i.test(attr)||""!=attr&&""!=a[attr]&&(o+=" "+attr+'="'+a[attr]+'"');o+=" >",""!=i&&(o+='<img src="'+i+'" style="max-width:100% !important; max-height:100% !important; width:auto !important; height:auto !important;">'),r+=o+="</div>";break;case"EMBED_OEMBED_FLICKR_VIDEO":break;case"EMBED_OEMBED_INSTAGRAM_VIDEO":var l="<div ";for(attr in a)/src/i.test(attr)||""!=attr&&""!=a[attr]&&(l+=" "+attr+'="'+a[attr]+'"');l+=" >",""!=i&&(l+='<video style="width:auto !important; height:auto !important; max-width:100% !important; max-height:100% !important; margin:0 !important;" controls><source src="'+i+'" type="video/mp4"> Your browser does not support the video tag. </video>'),r+=l+="</div>";break;case"EMBED_OEMBED_INSTAGRAM_IMAGE":l="<div ";for(attr in a)/src/i.test(attr)||""!=attr&&""!=a[attr]&&(l+=" "+attr+'="'+a[attr]+'"');l+=" >",""!=i&&(l+='<img src="//instagram.com/p/'+i+'/media/?size=l" style=" max-width:100% !important; max-height:100% !important; width:auto; height:auto;">'),r+=l+="</div>";break;case"EMBED_OEMBED_INSTAGRAM_POST":l="<div ";for(attr in a)/src/i.test(attr)||""!=attr&&""!=a[attr]&&(l+=" "+attr+'="'+a[attr]+'"',"CLASS"!=attr&&"class"!=attr&&"Class"!=attr||(obj_class=a[attr]));l+=" >",""!=i&&(l+='<iframe class="inner_instagram_iframe_'+obj_class+'" src="//instagr.am/p/'+i+'/embed/?enablejsapi=1" style="max-width:100% !important; max-height:100% !important; width:100%; height:100%; margin:0; display:table-cell; vertical-align:middle;"frameborder="0" scrolling="no" allowtransparency="false" allowfullscreen></iframe>'),r+=l+="</div>";break;case"EMBED_OEMBED_FACEBOOK_IMAGE":var n="<span ";for(attr in a)/src/i.test(attr)||""!=attr&&""!=a[attr]&&(n+=" "+attr+'="'+a[attr]+'"');n+=" >",""!=i&&(n+='<img src="'+t+'" style=" max-width:100% !important; max-height:100% !important; width:auto; height:100%;">'),r+=n+="</span>";break;case"EMBED_OEMBED_FACEBOOK_VIDEO":var g="<div ";for(attr in a)/src/i.test(attr)||""!=attr&&""!=a[attr]&&(g+=" "+attr+'="'+a[attr]+'"');g+=" >",""!=i&&(g+='<iframe src="//www.facebook.com/video/embed?video_id='+t+'&enablejsapi=1&wmode=transparent" style="max-width:100% !important; max-height:100% !important; width:100%; height:100%; margin:0; display:table-cell; vertical-align:middle;"frameborder="0" class="bwg_fb_video" scrolling="no" allowtransparency="false" allowfullscreen></iframe>'),r+=g+="</div>";break;case"EMBED_OEMBED_DAILYMOTION_VIDEO":var w="<iframe ";for(attr in""!=i&&(w+=' src="//www.dailymotion.com/embed/video/'+i+'?api=postMessage"'),a)/src/i.test(attr)||""!=attr&&""!=a[attr]&&(w+=" "+attr+'="'+a[attr]+'"');r+=w+=" ></iframe>";break;case"EMBED_OEMBED_IMGUR":var b="<div ";for(attr in a)/src/i.test(attr)||""!=attr&&""!=a[attr]&&(l+=" "+attr+'="'+a[attr]+'"');b+=" >",""!=i&&(b+='<img src="'+i+'" style="max-width:100% !important; max-height:100% !important; width:auto; height:auto !important;">'),r+=b+="</div>";break;case"EMBED_OEMBED_GOOGLE_PHOTO_IMAGE":var u="<div ";for(attr in a)/src/i.test(attr)||""!=attr&&""!=a[attr]&&(u+=" "+attr+'="'+a[attr]+'"');u+=" >",""!=i&&(u+='<img src="'+t+'" style=" max-width:100% !important; max-height:100% !important; width:auto; height:auto;">'),r+=u+="</div>";break;default:var d={content:""};jQuery(document).trigger("bwg_display_embed",[d,e,t,i,a]),r=d.content}return r}function bwg_add_instagram_gallery(e,s){if(!0===(s=void 0!==s&&s)){if(bwg_check_instagram_gallery_input(e,s))return!1;var t="0";1==jQuery("input[name=popup_instagram_post_gallery]:checked").val()&&(t="1");var i=encodeURI(jQuery("#popup_instagram_gallery_source").val()),a=encodeURI(jQuery("#popup_instagram_image_number").val())}else{if(bwg_check_instagram_gallery_input(e,s))return!1;if(!bwg_check_gallery_empty(!1,!0))return!1;t="0";1==jQuery("input[name=instagram_post_gallery]:checked").val()&&(t="1");i=encodeURI(jQuery("#gallery_source").val());var r=jQuery("input[name=update_flag]:checked").val();a=encodeURI(jQuery("#autogallery_image_number").val())}jQuery("#bulk_embed").hide(),jQuery("#loading_div").show();var o=[],_={action:"addInstagramGallery",instagram_user:i,instagram_access_token:e,whole_post:t,autogallery_image_number:a,update_flag:r,async:!0};jQuery.post(ajax_url,_,function(e){if(0==e)return alert("Error: cannot get response from the server."),jQuery("#loading_div").hide(),s&&jQuery("#bulk_embed").show(),!1;var t=e.indexOf("WD_delimiter_start"),i=e.indexOf("WD_delimiter_end");if(-1==t||-1==i)return jQuery("#loading_div").hide(),s&&jQuery("#bulk_embed").show(),!1;if(e=e.substring(t+18,i),response_JSON=jQuery.parseJSON(e),response_JSON){if("error"==response_JSON[0])return alert("Error: "+jQuery.parseJSON(e)[1]),jQuery("#loading_div").hide(),s&&jQuery("#bulk_embed").show(),!1;for(var a=response_JSON.length,r=1;r<=a;r++)if(0!=response_JSON[a-r]){var _=response_JSON[a-r];o.push(_)}return bwg_add_image(o),s||(bwg_gallery_update_flag(),jQuery("#tr_instagram_gallery_add_button").hide()),jQuery("#loading_div").hide(),s&&jQuery(".opacity_bulk_embed").hide(),"ok"}return alert("There is some error. Cannot add Instagram gallery."),jQuery("#loading_div").hide(),s&&jQuery("#bulk_embed").show(),!1})}var bwg=0,isMobile=/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()),bwg_click=isMobile?"touchend":"click",bwg_params=[],bwg_params_ib=[],bwg_params_carousel=[];function bwg_main_ready(){1==bwg_objectsL10n.lazy_load&&jQuery(function(){jQuery("img.bwg_lazyload").lazy({onFinishedAll:function(){jQuery(".lazy_loader").removeClass("lazy_loader")}})}),jQuery(".bwg_container").each(function(){0<jQuery(this).find(".wd_error").length&&bwg_container_loaded(jQuery(this).data("bwg"))}),bwg_document_ready(),jQuery(".bwg-thumbnails, .bwg-masonry-thumbnails, .bwg-album-thumbnails").each(function(){bwg_all_thumnails_loaded(this)}),jQuery(".bwg-mosaic-thumbnails").each(function(){bwg_thumbnail_mosaic(this)}),bwg_slideshow_ready(),bwg_carousel_ready(),bwg_carousel_onload(),bwg_image_browser_ready()}function bwg_resize_search_line(){jQuery(".search_line").each(function(){var e=jQuery(this);e.width()<410?e.addClass("bwg-search-line-responsive"):e.removeClass("bwg-search-line-responsive")})}function bwg_slideshow_resize(){jQuery(".bwg_slideshow").each(function(){bwg=jQuery(this).attr("data-bwg"),jQuery("#bwg_slideshow_image_container_"+bwg).length&&(bwg_params[bwg]=JSON.parse(jQuery("#bwg_slideshow_image_container_"+bwg).attr("data-params")),bwg_params[bwg].event_stack=[],bwg_popup_resize(bwg))})}function bwg_blog_style_resize(){jQuery(".bwg_blog_style").each(function(){bwg=jQuery(this).attr("data-bwg"),jQuery(".bwg_embed_frame_16x9_"+bwg).each(function(e){jQuery(this).width(jQuery(this).parent().width()),jQuery(this).height(.5625*jQuery(this).width())}),jQuery(".bwg_embed_frame_instapost_"+bwg).each(function(e){jQuery(this).width(jQuery(this).parent().width()),jQuery(this).height((jQuery(this).width()-16)*jQuery(this).attr("data-height")/jQuery(this).attr("data-width")+96)})})}function bwg_blog_style_onload(){jQuery(".bwg_blog_style").each(function(){bwg=jQuery(this).attr("data-bwg");jQuery("#bwg_blog_style_"+bwg);jQuery(".bwg_embed_frame_16x9_"+bwg).each(function(e){if(jQuery(".bwg_blog_style_image_"+bwg).find(".fluid-width-video-wrapper").length){jQuery(".fluid-width-video-wrapper").removeAttr("style");var t=jQuery(this).parents(".bwg_blog_style_image_"+bwg).find(".fluid-width-video-wrapper").contents();jQuery(this).parents(".fluid-width-video-wrapper").replaceWith(t)}jQuery(this).width(jQuery(this).parents(".bwg_blog_style_image_"+bwg).width()),jQuery(this).height(.5625*jQuery(this).width())}),jQuery(".bwg_embed_frame_instapost_"+bwg).each(function(e){jQuery(this).width(jQuery(this).parents(".bwg_blog_style_image_"+bwg).width()),jQuery(this).height((jQuery(this).width()-16)*jQuery(this).attr("data-height")/jQuery(this).attr("data-width")+96)}),bwg_container_loaded(bwg)})}function bwg_blog_style_ready(){jQuery(".bwg_blog_style").each(function(){var e=jQuery(this).attr("data-bwg");bwg_container_loaded(e);var t=!1;jQuery(this).find(".bwg_lightbox_"+e).on("click",function(){var e=jQuery(this).attr("data-image-id");if(jQuery("#bwg_blog_style_share_buttons_"+e).removeAttr("data-open-comment"),!t)return t=!0,setTimeout(function(){t=!1},100),bwg_gallery_box(e,jQuery(this).closest(".bwg_container")),!1}),jQuery(".bwg_lightbox_"+e+" .bwg_ecommerce").on("click",function(e){if(e.stopPropagation(),!t)return t=!0,setTimeout(function(){t=!1},100),bwg_gallery_box(jQuery(this).attr("data-image-id"),jQuery(this).closest(".bwg_container"),!0),!1});var i=window.location.hash.substring(1);i&&"-1"!=i.indexOf("bwg")&&(bwg_hash_array=i.replace("bwg","").split("/"),"<?php echo $params_array['gallery_id']; ?>"==bwg_hash_array[0]&&bwg_gallery_box(bwg_hash_array[1]))})}function bwg_slideshow_focus(){jQuery(".bwg_slideshow").each(function(){bwg=jQuery(this).attr("data-bwg"),jQuery("#bwg_slideshow_image_container_"+bwg).length&&(bwg_params[bwg]=JSON.parse(jQuery("#bwg_slideshow_image_container_"+bwg).attr("data-params")),bwg_params[bwg].event_stack=[],window.clearInterval(window["bwg_playInterval"+bwg]),jQuery(".bwg_ctrl_btn_"+bwg).hasClass("bwg-icon-play")||bwg_play(bwg_params[bwg].data,bwg))})}function bwg_slideshow_blur(){jQuery(".bwg_slideshow").each(function(){bwg=jQuery(this).attr("data-bwg"),jQuery("#bwg_slideshow_image_container_"+bwg).length&&(bwg_params[bwg]=JSON.parse(jQuery("#bwg_slideshow_image_container_"+bwg).attr("data-params")),bwg_params[bwg].event_stack=[],window.clearInterval(window["bwg_playInterval"+bwg]))})}function bwg_carousel_ready(){jQuery(".bwg-carousel").each(function(){var t=jQuery(this).data("bwg");bwg_params_carousel[t]=[],bwg_params_carousel[t].bwg_currentCenterNum=1,bwg_params_carousel[t].bwg_currentlyMoving=!1,bwg_params_carousel[t].data=[],jQuery("#spider_carousel_left-ico_"+t).on("click",function(){bwg_params_carousel[t].carousel.prev()}),jQuery("#spider_carousel_right-ico_"+t).on("click",function(){bwg_params_carousel[t].carousel.next()}),parseInt(bwg_params_carousel[t].carousel_enable_autoplay)&&(jQuery(".bwg_carousel_play_pause_"+t).attr("title",bwg_objectsL10n.pause),jQuery(".bwg_carousel_play_pause_"+t).attr("class","bwg-icon-pause bwg_ctrl_btn_"+t+" bwg_carousel_play_pause_"+t)),jQuery(".bwg_carousel_play_pause_"+t).on(bwg_click,function(e){jQuery(".bwg_ctrl_btn_"+t).hasClass("bwg-icon-play")?(jQuery(".bwg_carousel_play_pause_"+t).attr("title",bwg_objectsL10n.pause),jQuery(".bwg_carousel_play_pause_"+t).attr("class","bwg-icon-pause bwg_ctrl_btn_"+t+" bwg_carousel_play_pause_"+t),bwg_params_carousel[t].bwg_currentlyMoving=!1,bwg_params_carousel[t].carousel.start()):(jQuery(".bwg_carousel_play_pause_"+t).attr("title",bwg_objectsL10n.play),jQuery(".bwg_carousel_play_pause_"+t).attr("class","bwg-icon-play bwg_ctrl_btn_"+t+" bwg_carousel_play_pause_"+t),bwg_params_carousel[t].bwg_currentlyMoving=!0,bwg_params_carousel[t].carousel.pause()),e.stopPropagation(),e.stopImmediatePropagation()}),void 0!==jQuery().swiperight&&jQuery.isFunction(jQuery().swiperight)&&jQuery("#bwg_container1_"+t).swiperight(function(){bwg_params_carousel[t].carousel.prev()}),void 0!==jQuery().swipeleft&&jQuery.isFunction(jQuery().swipeleft)&&jQuery("#bwg_container1_"+t).swipeleft(function(){bwg_params_carousel[t].carousel.next()})})}function bwg_carousel_resize(){jQuery(".bwg-carousel").each(function(){var e=jQuery(this).data("bwg");bwg_carousel_params(e),bwg_params_carousel[e].carousel.pause(),bwg_carousel_watermark(e),jQuery(".bwg_ctrl_btn_"+e).hasClass("bwg-icon-play")||bwg_params_carousel[e].carousel.start()})}function bwg_carousel_onload(){jQuery(".bwg-carousel").each(function(){var e=jQuery(this).data("bwg");bwg_params_carousel[e]=jQuery(this).data("params"),bwg_carousel_watermark(e),bwg_carousel_params(e),bwg_container_loaded(e)})}function bwg_carousel_params(t){var e=jQuery("#bwg_container1_"+t).parent().width(),i=1;e<bwg_params_carousel[t].carousel_r_width?i=e/bwg_params_carousel[t].carousel_r_width:e=bwg_params_carousel[t].carousel_r_width,bwg_params_carousel[t].carousel_image_column_number>bwg_params_carousel[t].count&&(bwg_params_carousel[t].carousel_image_column_number=bwg_params_carousel[t].count),jQuery(".bwg_carousel_play_pause_"+t).css({display:parseInt(bwg_params_carousel[t].carousel_play_pause_butt)?"":"none"}),parseInt(bwg_params_carousel[t].carousel_prev_next_butt)?(jQuery("#bwg_carousel-right"+t).css({display:""}),jQuery("#bwg_carousel-left"+t).css({display:""})):(jQuery("#bwg_carousel-left"+t).css({display:"none"}),jQuery("#bwg_carousel-right"+t).css({display:"none"})),jQuery(".inner_instagram_iframe_bwg_embed_frame_"+t).each(function(){var e=jQuery(this).parent();bwg_params_carousel[t].image_height/(parseInt(e.attr("data-height"))+96)<bwg_params_carousel[t].image_width/parseInt(e.attr("data-width"))?(e.height(bwg_params_carousel[t].image_height*i),e.width((e.height()-96)*e.attr("data-width")/e.attr("data-height")+16)):(e.width(bwg_params_carousel[t].image_width*i),e.height((e.width()-16)*e.attr("data-height")/e.attr("data-width")+96))}),jQuery(".bwg_carousel_image_container_"+t).css({width:bwg_params_carousel[t].image_width*i,height:bwg_params_carousel[t].image_height*i}),jQuery(".bwg_carousel_watermark_text_"+t+", .bwg_carousel_watermark_text_"+t+":hover").css({fontSize:e*(bwg_params_carousel[t].watermark_font_size/bwg_params_carousel[t].image_width)*i}),jQuery(".bwg_carousel-image "+t).css({width:bwg_params_carousel[t].image_width*i,height:bwg_params_carousel[t].image_height*i}),jQuery(".bwg_carousel_watermark_container_"+t).css({width:bwg_params_carousel[t].image_width*i,height:bwg_params_carousel[t].image_height*i}),jQuery(".bwg_carousel_embed_video_"+t).css({width:bwg_params_carousel[t].image_width*i,height:bwg_params_carousel[t].image_height*i}),jQuery(".bwg_carousel_watermark_spun_"+t).css({width:bwg_params_carousel[t].image_width*i,height:bwg_params_carousel[t].image_height*i}),jQuery(".bwg_carousel-container"+t).css({width:e,height:bwg_params_carousel[t].image_height*i}),jQuery(".bwg_video_hide"+t).css({width:bwg_params_carousel[t].image_width*i,height:bwg_params_carousel[t].image_height*i}),bwg_params_carousel[t].carousel=jQuery("#bwg_carousel"+t).featureCarousel({containerWidth:e*i,containerHeight:bwg_params_carousel[t].image_height*i,fit_containerWidth:bwg_params_carousel[t].carousel_fit_containerWidth,largeFeatureWidth:bwg_params_carousel[t].image_width*i,largeFeatureHeight:bwg_params_carousel[t].image_height*i,smallFeaturePar:bwg_params_carousel[t].carousel_image_par,currentlyMoving:!1,startingFeature:bwg_params_carousel[t].bwg_currentCenterNum,featuresArray:[],timeoutVar:null,rotationsRemaining:0,autoPlay:1e3*bwg_params_carousel[t].car_inter,interval:1e3*bwg_params_carousel[t].carousel_interval,imagecount:bwg_params_carousel[t].carousel_image_column_number,bwg_number:t,enable_image_title:bwg_params_carousel[t].enable_image_title,borderWidth:0})}function bwg_carousel_watermark(e){var t=1,i=jQuery("#bwg_container1_"+e).parent().width();if(i<bwg_params_carousel[e].carousel_r_width&&(t=i/bwg_params_carousel[e].carousel_r_width),i>=bwg_params_carousel[e].image_width)bwg_carousel_change_watermark_container(e),jQuery("#bwg_carousel_play_pause-ico_"+e).css({fontSize:bwg_params_carousel[e].carousel_play_pause_btn_size}),jQuery(".bwg_carousel_watermark_image_"+e).css({maxWidth:bwg_params_carousel[e].watermark_width*t,maxHeight:bwg_params_carousel[e].watermark_height*t}),jQuery(".bwg_carousel_watermark_text_"+e+", .bwg_carousel_watermark_text_"+e+":hover").css({fontSize:t*bwg_params_carousel[e].watermark_font_size});else{var a=bwg_params_carousel[e].image_width/t;bwg_carousel_change_watermark_container(e),jQuery("#bwg_carousel_play_pause-ico_"+e).css({fontSize:i*bwg_params_carousel[e].carousel_play_pause_btn_size/a}),jQuery(".bwg_carousel_watermark_image_"+e).css({maxWidth:i*bwg_params_carousel[e].watermark_width/a,maxHeight:i*bwg_params_carousel[e].watermark_height/a}),jQuery(".bwg_carousel_watermark_text_"+e+", .bwg_carousel_watermark_text_"+e+":hover").css({fontSize:i*bwg_params_carousel[e].watermark_font_size/a})}}function bwg_carousel_change_watermark_container(a){jQuery(".bwg_carousel"+a).children().each(function(){if(2==jQuery(this).css("zIndex")){var e=jQuery(this).find("img");e.length||(e=jQuery(this).find("iframe"));var t=e.width(),i=e.height();jQuery(".bwg_carousel_watermark_spun_"+a).width(t),jQuery(".bwg_carousel_watermark_spun_"+a).height(i),jQuery(".bwg_carousel_title_spun_"+a).width(t),jQuery(".bwg_carouel_title_spun_"+a).height(i),jQuery(".bwg_carousel_watermark_"+a).css({display:"none"})}})}function bwg_carousel_preload(e,t){var i=jQuery(".bwg_carousel_preload").get();t||i.reverse();var a=0;jQuery(i).each(function(){if(1<++a)return!1;jQuery(this).parent().hasClass("bwg_carousel_embed_video_"+e)||jQuery(this).parent().hasClass("bwg_embed_frame_"+e)||jQuery(this).parent().hasClass("bwg_carousel_video")?(jQuery(this).attr("src",jQuery(this).attr("data-src")),jQuery(this).on("load",function(){jQuery(this).removeClass("bwg_carousel_preload")}),jQuery(this).parent().hasClass("bwg_carousel_video")&&(jQuery(".bwg_carousel_video")[0].load(),jQuery(this).parent().parent().removeClass("bwg_carousel_preload")),jQuery(this).removeAttr("data-src")):(jQuery(this).css({"background-image":"url('"+jQuery(this).attr("data-background")+"')",height:"100%"}),jQuery(this).removeClass("bwg_carousel_preload"),jQuery(this).removeAttr("data-background"))})}function bwg_slideshow_ready(){jQuery(".bwg_slideshow").each(function(){var i=jQuery(this).data("bwg");if(jQuery("#bwg_slideshow_image_container_"+i).length){bwg_params[i]=JSON.parse(jQuery("#bwg_slideshow_image_container_"+i).attr("data-params")),bwg_params[i].event_stack=[],bwg_container_loaded(i);var e=bwg_params[i].data;void 0!==jQuery().swiperight&&jQuery.isFunction(jQuery().swiperight)&&jQuery("#bwg_container1_"+i).swiperight(function(){return bwg_change_image(parseInt(jQuery("#bwg_current_image_key_"+i).val()),0<=parseInt(jQuery("#bwg_current_image_key_"+i).val())-bwg_iterator(i)?(parseInt(jQuery("#bwg_current_image_key_"+i).val())-bwg_iterator(i))%e.length:e.length-1,e,"",i),!1}),void 0!==jQuery().swipeleft&&jQuery.isFunction(jQuery().swipeleft)&&jQuery("#bwg_container1_"+i).swipeleft(function(){return bwg_change_image(parseInt(jQuery("#bwg_current_image_key_"+i).val()),parseInt(jQuery("#bwg_current_image_key_"+i).val())+bwg_iterator(i)%e.length,e,"",i),!1});var t=/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())?"touchend":"click";bwg_popup_resize(i),jQuery(".bwg_slideshow_watermark_"+i).css({display:"none"}),jQuery(".bwg_slideshow_title_text_"+i).css({display:"none"}),jQuery(".bwg_slideshow_description_text_"+i).css({display:"none"}),setTimeout(function(){bwg_change_watermark_container(i)},500),"horizontal"==bwg_params[i].filmstrip_direction?jQuery(".bwg_slideshow_image_container_"+i).height(jQuery(".bwg_slideshow_image_wrap_"+i).height()-bwg_params[i].slideshow_filmstrip_height):jQuery(".bwg_slideshow_image_container_"+i).width(jQuery(".bwg_slideshow_image_wrap_"+i).width()-bwg_params[i].slideshow_filmstrip_width);var a=/Firefox/i.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel";jQuery(".bwg_slideshow_filmstrip_"+i).bind(a,function(e){var t=window.event||e;return 0<((t=t.originalEvent?t.originalEvent:t).detail?-40*t.detail:t.wheelDelta)?jQuery(".bwg_slideshow_filmstrip_left_"+i).trigger("click"):jQuery(".bwg_slideshow_filmstrip_right_"+i).trigger("click"),!1}),jQuery(".bwg_slideshow_filmstrip_right_"+i).on(t,function(){jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).stop(!0,!1),"left"==bwg_params[i].left_or_top?"width"==bwg_params[i].width_or_height?(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().left>=-(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).width()-jQuery(".bwg_slideshow_filmstrip_"+i).width())&&(jQuery(".bwg_slideshow_filmstrip_left_"+i).css({opacity:1}),jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().left<-(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).width()-jQuery(".bwg_slideshow_filmstrip_"+i).width()-(parseInt(bwg_params[i].filmstrip_thumb_margin_hor)+parseInt(bwg_params[i].slideshow_filmstrip_width)))?jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).animate({left:-(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).width()-jQuery(".bwg_slideshow_filmstrip_"+i).width())},500,"linear"):jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).animate({left:jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().left-(parseInt(bwg_params[i].filmstrip_thumb_margin_hor)+parseInt(bwg_params[i].slideshow_filmstrip_width))},500,"linear")),window.setTimeout(function(){jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().left==-(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).width()-jQuery(".bwg_slideshow_filmstrip_"+i).width())&&jQuery(".bwg_slideshow_filmstrip_right_"+i).css({opacity:.3})},500)):(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().left>=-(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).height()-jQuery(".bwg_slideshow_filmstrip_"+i).height())&&(jQuery(".bwg_slideshow_filmstrip_left_"+i).css({opacity:1}),jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().left<-(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).height()-jQuery(".bwg_slideshow_filmstrip_"+i).height()-(parseInt(bwg_params[i].filmstrip_thumb_margin_hor)+parseInt(bwg_params[i].slideshow_filmstrip_width)))?jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).animate({left:-(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).height()-jQuery(".bwg_slideshow_filmstrip_"+i).height())},500,"linear"):jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).animate({left:jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().left-(parseInt(bwg_params[i].filmstrip_thumb_margin_hor)+parseInt(bwg_params[i].slideshow_filmstrip_width))},500,"linear")),window.setTimeout(function(){jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().left==-(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).height()-jQuery(".bwg_slideshow_filmstrip_"+i).height())&&jQuery(".bwg_slideshow_filmstrip_right_"+i).css({opacity:.3})},500)):"width"==bwg_params[i].width_or_height?(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().top>=-(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).width()-jQuery(".bwg_slideshow_filmstrip_"+i).width())&&(jQuery(".bwg_slideshow_filmstrip_left_"+i).css({opacity:1}),jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().top<-(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).width()-jQuery(".bwg_slideshow_filmstrip_"+i).width()-parseInt(bwg_params[i].filmstrip_thumb_margin_hor)+parseInt(bwg_params[i].slideshow_filmstrip_width))?jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).animate({top:-(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).width()-jQuery(".bwg_slideshow_filmstrip_"+i).width())},500,"linear"):jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).animate({top:jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().top-parseInt(bwg_params[i].filmstrip_thumb_margin_hor)+parseInt(bwg_params[i].slideshow_filmstrip_width)},500,"linear")),window.setTimeout(function(){jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().top==-(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).width()-jQuery(".bwg_slideshow_filmstrip_"+i).width())&&jQuery(".bwg_slideshow_filmstrip_right_"+i).css({opacity:.3})},500)):(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().top>=-(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).height()-jQuery(".bwg_slideshow_filmstrip_"+i).height())&&(jQuery(".bwg_slideshow_filmstrip_left_"+i).css({opacity:1}),jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().top<-(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).height()-jQuery(".bwg_slideshow_filmstrip_"+i).height()-(parseInt(bwg_params[i].filmstrip_thumb_margin_hor)+parseInt(bwg_params[i].slideshow_filmstrip_width)))?jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).animate({top:-(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).height()-jQuery(".bwg_slideshow_filmstrip_"+i).height())},500,"linear"):jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).animate({top:jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().top-(parseInt(bwg_params[i].filmstrip_thumb_margin_hor)+parseInt(bwg_params[i].slideshow_filmstrip_width))},500,"linear")),window.setTimeout(function(){jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().top==-(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).height()-jQuery(".bwg_slideshow_filmstrip_"+i).height())&&jQuery(".bwg_slideshow_filmstrip_right_"+i).css({opacity:.3})},500))}),jQuery(".bwg_slideshow_filmstrip_left_"+i).on(t,function(){jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).stop(!0,!1),"left"==bwg_params[i].left_or_top?(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().left<0&&(jQuery(".bwg_slideshow_filmstrip_right_"+i).css({opacity:1}),jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().left>-(bwg_params[i].filmstrip_thumb_margin_hor+bwg_params[i].slideshow_filmstrip_width)?jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).animate({left:0},500,"linear"):jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).animate({left:jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().left+parseInt(bwg_params[i].filmstrip_thumb_margin_hor)+parseInt(bwg_params[i].slideshow_filmstrip_width)},500,"linear")),window.setTimeout(function(){0==jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().left&&jQuery(".bwg_slideshow_filmstrip_left_"+i).css({opacity:.3})},500)):(jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().top<0&&(jQuery(".bwg_slideshow_filmstrip_right_"+i).css({opacity:1}),jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().top>-(bwg_params[i].filmstrip_thumb_margin_hor+bwg_params[i].slideshow_filmstrip_width)?jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).animate({top:0},500,"linear"):jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).animate({top:jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().top+parseInt(bwg_params[i].filmstrip_thumb_margin_hor)+parseInt(bwg_params[i].slideshow_filmstrip_width)},500,"linear")),window.setTimeout(function(){0==jQuery(".bwg_slideshow_filmstrip_thumbnails_"+i).position().top&&jQuery(".bwg_slideshow_filmstrip_left_"+i).css({opacity:.3})},500))}),"width"==bwg_params[i].width_or_height?bwg_set_filmstrip_pos(jQuery(".bwg_slideshow_filmstrip_"+i).width(),i):bwg_set_filmstrip_pos(jQuery(".bwg_slideshow_filmstrip_"+i).height(),i),jQuery("#bwg_slideshow_play_pause_"+i).off(t).on(t,function(){jQuery(".bwg_ctrl_btn_"+i).hasClass("bwg-icon-play")?(bwg_play(bwg_params[i].data,i),jQuery(".bwg_slideshow_play_pause_"+i).attr("title",bwg_objectsL10n.pause),jQuery(".bwg_slideshow_play_pause_"+i).attr("class","bwg-icon-pause bwg_ctrl_btn_"+i+" bwg_slideshow_play_pause_"+i),1==bwg_params[i].enable_slideshow_music&&document.getElementById("bwg_audio_"+i).play()):(window.clearInterval(window["bwg_playInterval"+i]),jQuery(".bwg_slideshow_play_pause_"+i).attr("title","Play"),jQuery(".bwg_slideshow_play_pause_"+i).attr("class","bwg-icon-play bwg_ctrl_btn_"+i+" bwg_slideshow_play_pause_"+i),1==bwg_params[i].enable_slideshow_music&&document.getElementById("bwg_audio_"+i).pause())}),0!=bwg_params[i].enable_slideshow_autoplay&&(bwg_play(bwg_params[i].data,i),jQuery(".bwg_slideshow_play_pause_"+i).attr("title",bwg_objectsL10n.pause),jQuery(".bwg_slideshow_play_pause_"+i).attr("class","bwg-icon-pause bwg_ctrl_btn_"+i+" bwg_slideshow_play_pause_"+i),1==bwg_params[i].enable_slideshow_music&&jQuery("#bwg_audio_"+i).length&&document.getElementById("bwg_audio_"+i).play()),bwg_params[i].preload_images&&bwg_preload_images(parseInt(jQuery("#bwg_current_image_key_".$bwg).val()),i),jQuery(".bwg_slideshow_image_"+i).removeAttr("width"),jQuery(".bwg_slideshow_image_"+i).removeAttr("height")}})}function bwg_image_browser_resize(){jQuery(".bwg_image_browser").each(function(){var e=jQuery(this).attr("data-bwg");jQuery(".image_browser_images_conteiner_"+e).length&&(bwg_params_ib[e]=JSON.parse(jQuery("#bwg_container1_"+e+" .image_browser_images_conteiner_"+e).attr("data-params")),bwg_image_browser(e))})}function bwg_image_browser_ready(){jQuery(".bwg_image_browser").each(function(){var e=jQuery(this).attr("data-bwg");bwg_container_loaded(e),jQuery(".image_browser_images_conteiner_"+e).length&&(bwg_params_ib[e]=JSON.parse(jQuery(".image_browser_images_conteiner_"+e).attr("data-params")),setTimeout(function(){bwg_image_browser(e)},3))})}function bwg_search_focus(e){jQuery(e).parent().find(".bwg_search_input").focus(),jQuery(e).hide()}function bwg_key_press(e){jQuery(e).parent().find(".bwg_search_reset_container").removeClass("hidden"),jQuery(e).parent().find(".bwg_search_loupe_container1").removeClass("hidden")}function bwg_all_thumnails_loaded(t){var i=0,a=jQuery(t).find("img").length;return 0==a?bwg_all_thumbnails_loaded_callback(t):jQuery(t).find("img").each(function(){var e=jQuery(this).attr("src");jQuery("<img/>").attr("src",e).on("load error",function(){++i>=a&&bwg_all_thumbnails_loaded_callback(t)})}),0==a}function bwg_all_thumbnails_loaded_callback(e){jQuery(e).hasClass("bwg-thumbnails")&&!jQuery(e).hasClass("bwg-masonry-thumbnails")&&bwg_thumbnail(e),jQuery(e).hasClass("bwg-masonry-thumbnails")&&bwg_thumbnail_masonry(e),jQuery(e).hasClass("bwg-album-extended")&&bwg_album_extended(e)}function bwg_container_loaded(e){jQuery("#gal_front_form_"+e).removeClass("bwg-hidden"),jQuery("#ajax_loading_"+e).addClass("bwg-hidden")}function bwg_album_thumbnail(e){bwg_container_loaded(jQuery(e).data("bwg"))}function bwg_album_extended(e){var t=jQuery(e).width(),i=jQuery(e).data("thumbnail-width"),a=jQuery(e).data("spacing"),r=jQuery(e).data("max-count"),_=parseInt(t/(2*i));_<1&&(_=1),r<_&&(_=r);var s=100/_,o=jQuery(e).find(".bwg-extended-item"),l=parseInt(o.css("margin-left")),n=parseInt(o.css("margin-right"));o.css({width:"calc("+s+"% - "+(l+n)+"px)"}),o.width()<i?o.find(".bwg-extended-item0, .bwg-extended-item1").css({width:"calc(100% - "+a+"px)"}):o.width()>2*i?(o.find(".bwg-extended-item0").css({width:"calc(50% - "+a+"px)"}),o.find(".bwg-extended-item1").css({width:"calc(100% - "+(i+2*a)+"px)"})):o.find(".bwg-extended-item0, .bwg-extended-item1").css({width:"calc(50% - "+a+"px)"}),jQuery(e).children(".bwg-extended-item").each(function(){var e=jQuery(this).find("img"),t=jQuery(this).find(".bwg-item0"),i=jQuery(this).find(".bwg-item2"),a=e.data("width"),r=e.data("height");""!=a&&""!=r||(a=e.width(),r=e.height());var _=a/r;i.width()/i.height()>a/r?(i.width()>a?e.css({width:"100%",height:i.width()/_}):e.css({maxWidth:"100%",height:i.width()/_}),a=i.width(),r=i.width()/_):(i.height()>r?e.css({height:"100%",width:i.height()*_,maxWidth:"initial"}):e.css({maxHeight:"100%",width:i.height()*_,maxWidth:"initial"}),r=i.height(),a=i.height()*_),jQuery(this).find(".bwg-item2").css({marginLeft:(t.width()-a)/2,marginTop:(t.height()-r)/2})}),bwg_container_loaded(jQuery(e).data("bwg"))}function bwg_thumbnail(e){var t=jQuery(e).width(),i=jQuery(e).data("thumbnail-width"),a=jQuery(e).data("max-count"),r=parseInt(t/i)+1;a<r&&(r=a);var _=100/r;jQuery(e).find(".bwg-item").css({width:_+"%"}),jQuery(e).children(".bwg-item").each(function(){var e=jQuery(this).find("img"),t=jQuery(this).find(".bwg-item2"),i=jQuery(this).find(".bwg-item1"),a=0<t.width()?t.width():i.width(),r=0<t.height()?t.height():i.height(),_=e.data("width"),s=e.data("height");""!=_&&""!=s&&void 0!==_&&void 0!==s||(_=e.width(),s=e.height());var o=_/s;e.removeAttr("style"),o<a/r?(_<a?e.css({width:"100%",height:a/o}):e.css({maxWidth:"100%",height:Math.ceil(a/o)}),s=(_=a)/o):(r>e.height()?e.css({height:"100%",width:r*o,maxWidth:"initial"}):e.css({maxHeight:"100%",width:r*o,maxWidth:"initial"}),_=(s=r)*o),jQuery(this).find(".bwg-item2").css({marginLeft:(a-_)/2,marginTop:(r-s)/2})}),bwg_container_loaded(jQuery(e).data("bwg"))}function bwg_thumbnail_masonry(e){var t=jQuery(e);if(t.find(".bwg-empty-item").remove(),"horizontal"==t.data("masonry-type")){var a=t.data("thumbnail-height"),r=t.data("max-count"),_=[];for(i=0;i<r;i++)_.push(0);t.find(".bwg-item").each(function(){var e=_.indexOf(Math.min.apply(Math,_));jQuery(this).css({height:a,order:e+1}),_[e]+=jQuery(this)[0].getBoundingClientRect().width});var s=Math.max.apply(Math,_);for(t.width(s),i=0;i<r;i++)_[i]<s&&t.append(jQuery('<div class="bwg-item bwg-empty-item"></div>').css({height:a,order:i+1,width:s-_[i]}))}else{t.removeAttr("style");s=t.width();var o=t.data("thumbnail-width"),l=(r=t.data("max-count"),parseInt(s/o)+("0"==t.data("resizable-thumbnails")?0:1));r<l&&(l=r);var n=t.find(".bwg-item").length;n<l&&(l=n);var g,w,b=100/l,u=[];for(i=0;i<l;i++)u.push(0);t.find(".bwg-item").each(function(){var e=u.indexOf(Math.min.apply(Math,u));if(jQuery(this).css({width:b+"%",order:e+1}),0<jQuery(this).find("img").attr("data-width").length&&0<jQuery(this).find("img").attr("data-height").length){w=jQuery(this).find("img").data("width")/jQuery(this).find("img").data("height"),g=jQuery(this).width()/w;var t=+(jQuery(this).find(".bwg-title1").height()+jQuery(this).find(".bwg-masonry-thumb-description").height());jQuery(this).height(g+t)}u[e]+=jQuery(this)[0].getBoundingClientRect().height});var d=Math.max.apply(Math,u);for(i=0;i<l;i++)u[i]<d&&t.append(jQuery('<div class="bwg-item bwg-empty-item"></div>').css({width:b+"%",order:i+1,height:d-u[i]}));t.outerWidth(l*o),t.height(d)}bwg_container_loaded(t.data("bwg"))}function bwg_thumbnail_mosaic_logic(e){var t=e.attr("data-bwg"),i=e.attr("data-block-id"),a=parseInt(e.attr("data-thumb-padding"))/2,r=parseInt(e.attr("data-thumb-border"))+a;if("horizontal"==e.attr("data-mosaic-direction")){var _=parseInt(e.attr("data-height"));if("1"==e.attr("data-resizable"))if(1920<=jQuery(window).width())var s=(1+jQuery(window).width()/1920)*_;else if(jQuery(window).width()<=640)s=jQuery(window).width()/640*_;else s=_;else s=_;(c=jQuery(".bwg_mosaic_thumb_"+t)).each(function(e){var t=jQuery(this).data("width"),i=jQuery(this).data("height");""!=t&&""!=i&&void 0!==t&&void 0!==i||(t=c.get(e).naturalWidth,i=c.get(e).naturalHeight),t=t*s/i,c.eq(e).height(s),c.eq(e).width(t)});var o=jQuery("#bwg_mosaic_thumbnails_div_"+t).width()/100*parseInt(e.attr("data-total-width"));jQuery("#"+i).width(o);var l=s+2*r,n=0,g=[];g[0]=0;var w=[],b=w[0]=0;c.each(function(e){row_cum_width2=b+c.eq(e).width()+2*r,row_cum_width2-o<0?(b=row_cum_width2,g[e]=n,w[n]++):e!==c.length-1?Math.abs(b-o)>Math.abs(row_cum_width2-o)||Math.abs(b-o)<=Math.abs(row_cum_width2-o)&&0==w[n]?e!==c.length-2?(b=row_cum_width2,g[e]=n,w[n]++,w[++n]=0,b=0):(b=row_cum_width2,g[e]=n,w[n]++):(w[++n]=1,g[e]=n,b=row_cum_width2-b):(b=row_cum_width2,g[e]=n,w[n]++)});for(var u=[],d=[],h=0;h<=n;h++)u[h]=1,d[h]=l;for(h=0;h<=n;h++)b=0,c.each(function(e){g[e]==h&&(b+=c.eq(e).width())}),u[h]=z=(o-2*w[h]*r)/b,d[h]=(l-2*r)*u[h]+2*r;(S=[])[0]=0;var m=[],p=[];m[0]=0,p[0]=0;for(h=1;h<=n;h++)m[h]=m[0],p[h]=p[h-1]+d[h-1];c.each(function(e){var t=c.eq(e).width(),i=c.eq(e).height();c.eq(e).width(t*u[g[e]]),c.eq(e).height(i*u[g[e]]),c.eq(e).parent().css({top:p[g[e]],left:m[g[e]]}),m[g[e]]+=t*u[g[e]]+2*r,S[g[e]]=e}),jQuery("#"+i).height(p[n]+d[n]-p[0])}else{var c,y=parseInt(e.attr("data-width"));if("1"==e.attr("data-resizable")){if(1920<=jQuery(window).width())var f=(1+jQuery(window).width()/1920)*y;else if(jQuery(window).width()<=640)f=jQuery(window).width()/640*y;else f=y;if(0<jQuery(".header-content-with_tab").length)f=jQuery(".header-content-with_tab").width()/4-10}else f=y;(c=jQuery(".bwg_mosaic_thumb_"+t)).each(function(e){var t=jQuery(this).data("width"),i=jQuery(this).data("height");""!=t&&""!=i&&void 0!==t&&void 0!==i||(t=c.get(e).naturalWidth,i=c.get(e).naturalHeight),c.eq(e).height(i*f/t),c.eq(e).width(f)});o=jQuery("#bwg_mosaic_thumbnails_div_"+t).width()/100*parseInt(e.attr("data-total-width"));jQuery("#"+i).width(o);var j=f+2*r<o?f:o-2*r,Q=Math.floor(o/(j+2*r)),v=[];v[0]=0;for(var x=[],k=[],z=0;z<Q;z++)k[z]=0,x[z]=0;c.each(function(e){for(var t=0,i=k[0],a=0;a<Q;a++)i>k[a]&&(i=k[a],t=a);v[e]=t,x[t]++,B=i,T=0+t*(j+2*r),c.eq(e).parent().css({top:B,left:T}),k[t]+=c.eq(e).height()+2*r}),(u=[])[0]=1;var C=0,I=[],E=0,O=0;for(z=0;z<Q;z++)C+=j,I[z]=0,c.each(function(e){v[e]==z&&(I[z]+=c.eq(e).height())}),0!=I[z]&&(E+=j/I[z],O+=j*x[z]*2*r/I[z]);var M=0;0!=E&&(M=(C+O)/E);for(z=0;z<Q;z++)0!=I[z]&&(u[z]=(M-2*x[z]*r)/I[z]);var S,T=[];T[0]=0;for(z=1;z<=Q;z++)T[z]=T[z-1]+j*u[z-1]+2*r;var B=[];for(z=0;z<Q;z++)B[z]=0;(S=[])[0]=0,c.each(function(e){var t=c.eq(e).width(),i=c.eq(e).height();c.eq(e).width(t*u[v[e]]),c.eq(e).height(i*u[v[e]]),c.eq(e).parent().css({top:B[v[e]],left:T[v[e]]}),B[v[e]]+=i*u[v[e]]+2*r,S[v[e]]=e}),jQuery("#"+i).width(T[Q]).height(B[0])}}function bwg_thumbnail_mosaic(e){var t=jQuery(e),i=jQuery.Deferred();if(i.done([bwg_thumbnail_mosaic_logic]).done(function(e){"1"!=e.data("mosaic-thumb-transition")&&jQuery(".bwg_mosaic_thumb_spun_"+t).css({transition:"all 0.3s ease 0s","-webkit-transition":"all 0.3s ease 0s"});var t=e.data("bwg");jQuery(".bwg_mosaic_thumbnails_"+t).css({visibility:"visible"}),jQuery(".tablenav-pages_"+t).css({visibility:"visible"}),bwg_container_loaded(t),jQuery(".bwg_mosaic_thumb_"+t).removeClass("bwg-hidden"),jQuery("#bwg_mosaic_thumbnails_div_"+t).removeClass("bwg-hidden")}),i.resolve(t),"hover"==t.attr("data-image-title")){var a=parseInt(t.attr("data-thumb-padding"))/2,r=parseInt(t.attr("data-thumb-border"))+a;bwg_mosaic_title_on_hover(bwg,t,r)}"hover"==t.attr("data-ecommerce-icon")&&(jQuery(".bwg_mosaic_thumb_spun_"+bwg).on("mouseenter",function(){var e=jQuery(this).parents(".bwg-mosaic-thumb-span").children(".bwg_mosaic_thumb_"+bwg).width(),t=jQuery(this).parents(".bwg-mosaic-thumb-span").children(".bwg_mosaic_thumb_"+bwg).height();jQuery(this).children(".bwg_ecommerce_spun1_"+bwg).width(e);var i=jQuery(this).children(".bwg_ecommerce_spun1_"+bwg).width(),a=jQuery(this).children(".bwg_ecommerce_spun1_"+bwg).height();jQuery(this).children(".bwg_ecommerce_spun1_"+bwg).css({top:r+.5*t-.5*a,left:r+.5*e-.5*i,opacity:1})}),jQuery(".bwg_mosaic_thumb_spun_"+bwg).on("mouseleave",function(){jQuery(this).children(".bwg_ecommerce_spun1_"+bwg).css({top:0,left:-1e4,opacity:0,padding:t.attr("data-title-margin")})}))}function bwg_mosaic_title_on_hover(r,e,_){jQuery(".bwg-mosaic-thumb-span").on("mouseenter",function(){var e=jQuery(this).children(".bwg_mosaic_thumb_"+r).width(),t=jQuery(this).children(".bwg_mosaic_thumb_"+r).height();jQuery(this).find(".bwg_mosaic_title_spun1_"+r).width(e);var i=jQuery(this).find(".bwg_mosaic_title_spun1_"+r).width(),a=jQuery(this).find(".bwg_mosaic_title_spun1_"+r).height();jQuery(this).find(".bwg_mosaic_title_spun1_"+r).css({top:_+.5*t-.5*a<0?_:_+.5*t-.5*a,left:_+.5*e-.5*i,opacity:1,"max-height":"calc(100% - "+2*_+"px)",overflow:"hidden"})}),jQuery(".bwg-mosaic-thumb-span").on("mouseleave",function(){jQuery(this).find(".bwg_mosaic_title_spun1_"+r).css({top:0,left:-1e4,opacity:0,padding:e.attr("data-title-margin"),"max-height":"calc(100% - "+2*_+"px)",overflow:"hidden"})})}function bwg_mosaic_ajax(e,t){var i=0;jQuery(".bwg_mosaic_thumb_spun_"+e+" img").on("load",function(){++i>=t&&bwg_thumbnail_mosaic(jQuery(".bwg-mosaic-thumbnails[data-bwg="+e+"]"))}),jQuery(".bwg_mosaic_thumb_spun_"+e+" img").on("error",function(){jQuery(this).height(100),jQuery(this).width(100),++i>=t&&bwg_thumbnail_mosaic(jQuery(".bwg-mosaic-thumbnails[data-bwg="+e+"]"))})}function bwg_add_album(){var t=!1;"1"!=bwg_objectsL10n.front_ajax&&jQuery(".bwg-album").off("click").on("click",function(){if(!t){var e=jQuery(this).attr("data-bwg");return t=!0,setTimeout(function(){t=!1},100),bwg_ajax("gal_front_form_"+e,e,jQuery(this).attr("data-container_id"),jQuery(this).attr("data-alb_gal_id"),jQuery(this).attr("data-album_gallery_id"),jQuery(this).attr("data-def_type"),"",jQuery(this).attr("data-title")),!1}}),jQuery(".bwg_description_more").on("click",function(){jQuery(this).hasClass("bwg_more")?(jQuery(this).parent().find(".bwg_description_full").show(),jQuery(this).addClass("bwg_hide").removeClass("bwg_more"),jQuery(this).html(jQuery(this).data("hide-msg"))):(jQuery(this).parent().find(".bwg_description_full").hide(),jQuery(this).addClass("bwg_more").removeClass("bwg_hide"),jQuery(this).html(jQuery(this).data("more-msg")))})}function bwg_add_lightbox(){var i=!1;jQuery(".bwg_lightbox .bwg-item0, .bwg_lightbox .bwg_slide, .bwg_lightbox .bwg-carousel-image, .bwg_lightbox .bwg-title1").on("click",function(e){e.stopPropagation(),e.preventDefault();var t=jQuery(this).closest("a");if(!i)return i=!0,setTimeout(function(){i=!1},100),bwg_gallery_box(jQuery(t).attr("data-image-id"),jQuery(t).closest(".bwg_container")),!1}),jQuery(".bwg_lightbox .bwg_ecommerce").on("click",function(e){if(e.stopPropagation(),!i)return i=!0,setTimeout(function(){i=!1},100),bwg_gallery_box(jQuery(this).closest(".bwg_lightbox").attr("data-image-id"),jQuery(this).closest(".bwg_container"),!0),!1})}function bwg_filter_by_tag(e){var t="",i=jQuery(e).parent().parent(),a=i.find(".current_view").val(),r=i.find(".form_id").val(),_=i.find(".cur_gal_id").val(),s=i.find(".album_gallery_id").val(),o=i.find(".type").val();jQuery(e).parent().find(".opt.selected").each(function(){t=t+jQuery(e).text()+","}),""==(t=t.slice(0,-1))&&(t=bwg_objectsL10n.bwg_select_tag),jQuery(e).parent().find(".CaptionCont").attr("title",t),jQuery(e).parent().find(".CaptionCont .placeholder").html(t),jQuery("#bwg_tag_id_"+a).val(jQuery("#bwg_tag_id_"+_).val()),bwg_select_tag(a,r,_,s,o,!1)}function bwg_document_ready(){bwg_add_lightbox(),jQuery('div[id^="bwg_container1_"]').each(function(){var e=jQuery(this);e.data("right-click-protection")&&bwg_disable_right_click(e),jQuery(".SumoSelect > .CaptionCont > label > i").addClass("bwg-icon-angle-down closed");var t=e.find(".search_tags");if("1"==bwg_objectsL10n.front_ajax&&t.length)for(var i=0;i<t[0].length;i++)void 0===t[0][i].attributes.selected&&(t[0][i].selected=!1);t.length&&(t.SumoSelect({triggerChangeCombined:!0,placeholder:bwg_objectsL10n.bwg_select_tag,search:!0,searchText:bwg_objectsL10n.bwg_search,forceCustomRendering:!0,noMatch:bwg_objectsL10n.bwg_tag_no_match,captionFormatAllSelected:bwg_objectsL10n.bwg_all_tags_selected,captionFormat:"{0} "+bwg_objectsL10n.bwg_tags_selected,okCancelInMulti:!0,locale:[bwg_objectsL10n.ok,bwg_objectsL10n.cancel,bwg_objectsL10n.select_all]}),t.off("change").on("change",function(){bwg_filter_by_tag(this)}));var a=e.find(".bwg_order");a.length&&a.SumoSelect({triggerChangeCombined:!0,forceCustomRendering:!0}),jQuery(this).find("search_placeholder_title").hide(),""==jQuery(this).find(".bwg_search_input").val()&&jQuery(this).find("search_placeholder_title").show(),jQuery(".bwg_thumbnail .bwg_search_container_2").focusout(function(e){""==jQuery(this).find(".bwg_search_input").val()&&(jQuery(this).find(".search_placeholder_title").show(),jQuery(this).find(".bwg_search_loupe_container1").addClass("hidden"),jQuery(this).find(".bwg_search_reset_container").addClass("hidden"))})}),jQuery(".search_tags").on("sumo:opened",function(){0==jQuery(this).parent().find("ul li").length&&(jQuery(".no-match").html(bwg_objectsL10n.bwg_tag_no_match),jQuery(".no-match").show())}),jQuery(".bwg_thumbnail .SumoSelect").on("sumo:closed",function(){jQuery(this).find("label i").removeClass("bwg-icon-angle-up opened"),jQuery(this).find("label i").addClass("bwg-icon-angle-down closed")}),jQuery(".bwg_thumbnail .SumoSelect").on("sumo:opened",function(){jQuery(this).find("label i").removeClass("bwg-icon-angle-down closed"),jQuery(this).find("label i").addClass("bwg-icon-angle-up opened")}),bwg_add_album();var e=window.location.hash.substring(1);if(e&&"-1"!=e.indexOf("bwg")){bwg_hash_array=e.replace("bwg","").split("/");var t=jQuery(".bwg_container");t&&bwg_gallery_box(bwg_hash_array[1],t,!1,bwg_hash_array[0])}bwg_blog_style_ready(),bwg_image_browser_ready(),bwg_resize_search_line()}function bwg_clear_search_input(e){if("1"!=bwg_objectsL10n.front_ajax)jQuery("#bwg_search_input_"+e).val(""),jQuery("#bwg_search_container_1_"+e+" .bwg_search_loupe_container1").addClass("hidden"),jQuery("#bwg_search_container_1_"+e+" .bwg_search_reset_container").addClass("hidden");else{var t=window.location.href,i=bwg_remove_url_parameter("bwg_search_"+e,t,t);window.location.replace(i)}}function bwg_check_search_input_enter(e,t){return 13!=(t.which||t.keyCode)||(jQuery(e).closest(".bwg_search_container_1").find(".bwg_search").trigger("click"),!1)}function bwg_ajax(t,i,a,r,e,_,s,o,l,n,g){if("1"!=bwg_objectsL10n.front_ajax||!0===n){jQuery("#ajax_loading_"+i).removeClass("bwg-hidden"),jQuery(".bwg_load_more_ajax_loading").css({top:jQuery("#bwg_container1_"+bwg).height()-jQuery(".bwg_load_more_ajax_loading").height()}),"function"==typeof bwg_scroll_load_action&&jQuery(window).off("scroll",bwg_scroll_load_action),jQuery(".bwg_thumbnail .search_tags").off("sumo:closed");var w=jQuery("#"+t).data("ajax-url"),b=0;if(void 0===n)n=!1;var u=jQuery("#page_number_"+i).val(),d=jQuery("#bwg_search_input_"+i).val(),h={},m=jQuery("#bwg_album_breadcrumb_"+i).val();if(m&&!0!==n){var p=JSON.parse(m);if("back"==r){p.splice(-1,1);var c=p.slice(-1)[0];r=c.id,u=c.page,h["action_"+i]="back"}else"numeric"===n||s?(p.splice(-1,1),p.push({id:r,page:u,search:d})):(p.push({id:r,page:1}),u=1);h["bwg_album_breadcrumb_"+i]=JSON.stringify(p)}if(h.gallery_type=jQuery("#"+t).data("gallery-type"),h.gallery_id=jQuery("#"+t).data("gallery-id"),h.tag=jQuery("#"+t).data("tag"),h.album_id=jQuery("#"+t).data("album-id"),h.theme_id=jQuery("#"+t).data("theme-id"),h.shortcode_id=jQuery("#"+t).data("shortcode-id"),h.bwg=i,h.current_url=encodeURI(jQuery("#bwg_container1_"+i).data("current-url")),s&&(u=1),void 0===o||""==o)o="";if(void 0===g||""==g)g="";if(void 0===l||""==l)l=jQuery(".bwg_order_"+i).val();if(h["page_number_"+i]=u,h["bwg_load_more_"+i]=jQuery("#bwg_load_more_"+i).val(),h["album_gallery_id_"+i]=r,h["type_"+i]=_,h["title_"+i]=o,h["description_"+i]=g,h["sortImagesByValue_"+i]=l,0<jQuery("#bwg_search_input_"+i).length&&(h["bwg_search_"+i]=jQuery("#bwg_search_input_"+i).val()),void 0!==h["bwg_album_breadcrumb_"+i]){var y=jQuery.parseJSON(h["bwg_album_breadcrumb_"+i]);jQuery.each(y,function(e,t){h["bwg_search_"+i]="",r==t.id&&(h["bwg_search_"+i]=t.search)})}return h["bwg_tag_id_"+a]=jQuery("#bwg_tag_id_"+a).val(),jQuery("#ajax_loading_"+i).removeClass("bwg-hidden"),jQuery(".bwg_load_more_ajax_loading").css({top:jQuery("#bwg_container1_"+bwg).height()-jQuery(".bwg_load_more_ajax_loading").height()}),jQuery.ajax({type:"POST",url:w,data:h,success:function(e){jQuery(e).find(".bwg_masonry_thumb_spun_"+i+" img").length,b=jQuery(e).find(".bwg_mosaic_thumb_spun_"+i+" img").length,!0===n?(a=="bwg_thumbnails_mosaic_"+i?jQuery("#"+a).append(jQuery(e).closest(".bwg-container-"+i).find("#"+a).html()):a=="bwg_album_compact_"+i?jQuery("#"+a).append(jQuery(e).closest(".bwg-album-thumbnails").html()):jQuery("#"+a).append(jQuery(e).closest(".bwg-container-"+i).html()),jQuery(".bwg_nav_cont_"+i).html(jQuery(e).closest(".bwg_nav_cont_"+i).html())):jQuery("#bwg_container3_"+i).html(e)},complete:function(){jQuery("div[id^='bwg_container1_'] img").each(function(){null!=jQuery(this).attr("data-lazy-src")&&""!=jQuery(this).attr("data-lazy-src")?jQuery(this).attr("src",jQuery(this).attr("data-lazy-src")):null!=jQuery(this).attr("data-src")&&""!=jQuery(this).attr("data-src")&&jQuery(this).attr("src",jQuery(this).attr("data-src"))}),jQuery(".blog_style_image_buttons_conteiner_"+i).find(jQuery(".bwg_blog_style_img_"+i)).on("load",function(){jQuery(".bwg_blog_style_img_"+i).closest(jQuery(".blog_style_image_buttons_conteiner_"+i)).show()}),jQuery("#bwg_tags_id_"+a).val(jQuery("#bwg_tag_id_"+a).val()),jQuery(".pagination-links_"+i).length&&jQuery("html, body").animate({scrollTop:jQuery("#"+t).offset().top-150},500),bwg_document_ready(),bwg_mosaic_ajax(i,b),bwg_all_thumnails_loaded(".bwg-container-"+i)&&bwg_container_loaded(i),jQuery(".blog_style_images_conteiner_"+i+" .bwg_embed_frame_16x9_"+i).each(function(e){jQuery(this).width(jQuery(this).parent().width()),jQuery(this).height(.5625*jQuery(this).width())}),jQuery(".blog_style_images_conteiner_"+i+" .bwg_embed_frame_instapost_"+i).each(function(e){jQuery(this).width(jQuery(this).parent().width()),jQuery(this).height((jQuery(this).width()-16)*jQuery(this).attr("data-height")/jQuery(this).attr("data-width")+96)}),jQuery("#bwg_embed_frame_16x9_"+i).width(jQuery("#bwg_embed_frame_16x9_"+i).parent().width()),jQuery("#bwg_embed_frame_16x9_"+i).height(.5625*jQuery("#bwg_embed_frame_16x9_"+i).width()),jQuery("#bwg_embed_frame_instapost_"+i).width(jQuery("#bwg_embed_frame_16x9_"+i).parent().width()),jQuery(".bwg_embed_frame_instapost_"+i).height((jQuery(".bwg_embed_frame_instapost_"+i).width()-16)*jQuery(".bwg_embed_frame_instapost_"+i).attr("data-height")/jQuery(".bwg_embed_frame_instapost_"+i).attr("data-width")+96),jQuery("#bwg_search_input_"+i).val(h["bwg_search_"+i]),""!=jQuery("#bwg_search_input_"+i).val()?(jQuery("#bwg_search_input_"+i).parent().find(".search_placeholder_title").hide(),jQuery("#bwg_search_input_"+i).parent().parent().find(".bwg_search_reset_container").show(),jQuery("#bwg_search_input_"+i).parent().parent().find(".bwg_search_loupe_container1").show()):jQuery("#bwg_search_input_"+i).parent().find(".search_placeholder_title").show();var e=jQuery("#bwg_container2_"+i+" .cur_gal_id").val();jQuery("#bwg_tag_id_"+i).val(jQuery("#bwg_tag_id_"+e).val())}}),!1}if("back"!==r){var f=jQuery("#bwg_search_input_"+i).val(),j=window.location.href,Q="",v=jQuery("#bwg_tag_id_"+a).val();if(""!==window.location.hash&&(j=j.replace("#","")),""!==f?!1!==(Q=bwg_add_url_parameter(Q=bwg_remove_url_parameter("page_number_"+i,j),"bwg_search_"+i,f))&&(j=Q):!1!==(Q=bwg_remove_url_parameter("bwg_search_"+i,j))&&(j=Q),void 0!==l&&""!==l&&!1!==(Q=bwg_add_url_parameter(j,"sort_by_"+i,l))&&(j=Q),null!=v&&0<v.length){var x="";jQuery.each(v,function(e){var t=",";e===v.length-1&&(t=""),x+=v[e]+t}),""!==x&&!1!==(Q=bwg_add_url_parameter(j,"filter_tag_"+i,x))&&(j=Q)}else!1!==(Q=bwg_remove_url_parameter("filter_tag_"+i,Q))&&(j=Q);window.location.href=j}else window.history.back()}function bwg_add_url_parameter(e,t,i){var a=new RegExp("([?&])"+t+"=.*?(&|$)","i"),r=-1!==e.indexOf("?")?"&":"?";return e.match(a)?e.replace(a,"$1"+t+"="+i+"$2"):e+r+t+"="+i}function bwg_remove_url_parameter(e,t){var i=t.split("?"),a=i[0]+"?",r="";if(void 0!==i[1]&&(r=i[1]),""===r)return t;var _,s,o=decodeURIComponent(r).split("&");for(s=0;s<o.length;s++)(_=o[s].split("="))[0]!=e&&(a=a+_[0]+"="+_[1]+"&");return a.substring(0,a.length-1)}function bwg_select_tag(e,t,i,a,r,_){_&&jQuery("#bwg_tag_id_"+i).val(""),bwg_ajax(t,e,i,a,"",r,1,"")}function bwg_cube(e,t,i,a,r,_,s,o,l,n,g){var w,b=!1,u="";if(void 0!==g&&""!==g){b=!0,bwg_params[g].bwg_trans_in_progress=!0,u="_"+g,w=bwg_params[g].bwg_transition_duration;bwg_params[g].event_stack}else w=bwg_transition_duration;if(!bwg_testBrowser_cssTransitions(g))return bwg_fallback(o,l,n,g);if(!bwg_testBrowser_cssTransforms3d(g))return bwg_fallback3d(o,l,n,g);function d(){if(jQuery(o).removeAttr("style"),jQuery(l).removeAttr("style"),jQuery(".bwg_slider"+u).removeAttr("style"),jQuery(o).css({opacity:0,"z-index":1}),jQuery(l).css({opacity:1,"z-index":2}),jQuery(".bwg_image_info").show(),jQuery(o).html(""),b){bwg_change_watermark_container(g),bwg_params[g].bwg_trans_in_progress=!1;var e=bwg_params[g].data,t=bwg_params[g].event_stack}else{e="";gallery_box_data.bwg_trans_in_progress=!1;t=gallery_box_data.event_stack}if(void 0!==t&&0<t.length){var i=t[0].split("-");t.shift(),bwg_change_image(i[0],i[1],e,!0,g)}bwg_change_watermark_container()}b?(jQuery(".bwg_slideshow_filmstrip_thumbnail_"+g).removeClass("bwg_slideshow_thumb_active_"+g).addClass("bwg_slideshow_thumb_deactive_"+g),jQuery("#bwg_filmstrip_thumbnail_"+bwg_params[g].bwg_current_key+"_"+g).removeClass("bwg_slideshow_thumb_deactive_"+g).addClass("bwg_slideshow_thumb_active_"+g),jQuery(".bwg_slideshow_dots_"+g).removeClass("bwg_slideshow_dots_active_"+g).addClass("bwg_slideshow_dots_deactive_"+g),jQuery("#bwg_dots_"+bwg_params[g].bwg_current_key+"_"+g).removeClass("bwg_slideshow_dots_deactive_"+g).addClass("bwg_slideshow_dots_active_"+g),jQuery(".bwg_slide_bg_"+g).css("perspective",1e3)):(gallery_box_data.bwg_trans_in_progress=!0,jQuery(".bwg_filmstrip_thumbnail").removeClass("bwg_thumb_active").addClass("bwg_thumb_deactive"),jQuery("#bwg_filmstrip_thumbnail_"+gallery_box_data.bwg_current_key).removeClass("bwg_thumb_deactive").addClass("bwg_thumb_active"),jQuery(".bwg_slide_bg").css("perspective",1e3)),jQuery(o).css({transform:"translateZ("+e+"px)",backfaceVisibility:"hidden"}),jQuery(l).css({opacity:1,backfaceVisibility:"hidden",transform:"translateY("+i+"px) translateX("+t+"px) rotateY("+r+"deg) rotateX("+a+"deg)"}),jQuery(".bwg_slider"+u).css({transform:"translateZ(-"+e+"px)",transformStyle:"preserve-3d"}),setTimeout(function(){jQuery(".bwg_slider"+u).css({transition:"all "+w+"ms ease-in-out",transform:"translateZ(-"+e+"px) rotateX("+_+"deg) rotateY("+s+"deg)"})},20),jQuery(".bwg_slider"+u).one("webkitTransitionEnd transitionend otransitionend oTransitionEnd mstransitionend",jQuery.proxy(d)),0==w&&d()}function bwg_fade(e,t,i,a){var r,_=!1;function s(){jQuery(".bwg_image_info").show(),bwg_change_watermark_container(a),_?bwg_params[a].bwg_trans_in_progress=!1:gallery_box_data.bwg_trans_in_progress=!1}r=void 0!==a&&""!==a?(_=!0,bwg_params[a].bwg_trans_in_progress=!0,bwg_params[a].bwg_transition_duration):(gallery_box_data.bwg_trans_in_progress=!0,gallery_box_data.bwg_transition_duration),_?(jQuery(".bwg_slideshow_filmstrip_thumbnail_"+a).removeClass("bwg_slideshow_thumb_active_"+a).addClass("bwg_slideshow_thumb_deactive_"+a),jQuery("#bwg_filmstrip_thumbnail_"+bwg_params[a].bwg_current_key+"_"+a).removeClass("bwg_slideshow_thumb_deactive_"+a).addClass("bwg_slideshow_thumb_active_"+a),jQuery(".bwg_slideshow_dots_"+a).removeClass("bwg_slideshow_dots_active_"+a).addClass("bwg_slideshow_dots_deactive_"+a),jQuery("#bwg_dots_"+bwg_params[a].bwg_current_key+"_"+a).removeClass("bwg_slideshow_dots_deactive_"+a).addClass("bwg_slideshow_dots_active_"+a)):(jQuery(".bwg_filmstrip_thumbnail").removeClass("bwg_thumb_active").addClass("bwg_thumb_deactive"),jQuery("#bwg_filmstrip_thumbnail_"+gallery_box_data.bwg_current_key).removeClass("bwg_thumb_deactive").addClass("bwg_thumb_active")),bwg_testBrowser_cssTransitions()?(jQuery(t).css("transition","opacity "+r+"ms linear"),jQuery(e).css({opacity:0,"z-index":1}),jQuery(t).css({opacity:1,"z-index":2}),jQuery(t).one("webkitTransitionEnd transitionend otransitionend oTransitionEnd mstransitionend",jQuery.proxy(s))):(jQuery(e).animate({opacity:0,"z-index":1},r),jQuery(t).animate({opacity:1,"z-index":2},{duration:r,complete:function(){_?bwg_params[a].bwg_trans_in_progress=!1:gallery_box_data.bwg_trans_in_progress=!1,jQuery(e).html(""),s()}}),jQuery(e).fadeTo(r,0),jQuery(t).fadeTo(r,1)),0==r&&s()}function bwg_change_watermark_container(t){jQuery(".bwg_slider"+(void 0!==t&&""!==t?"_"+t:"")).children().each(function(){if(2==jQuery(this).css("zIndex")){var e=jQuery(this).find("img");if(e.length)if(e.prop("complete"))bwg_change_each_watermark_container(e.width(),e.height(),t);else e.on("load",function(){bwg_change_each_watermark_container(e.width(),e.height(),t)});else(e=jQuery(this).find("iframe")).length||(e=jQuery(this).find("video")),bwg_change_each_watermark_container(e.width(),e.height(),t)}})}function bwg_change_each_watermark_container(e,t,i){var a=void 0!==i&&""!==i?"_"+i:"",r=void 0!==i&&""!==i?"_slideshow":"";if(jQuery(".bwg"+r+"_watermark_spun"+a).width(e),jQuery(".bwg"+r+"_watermark_spun"+a).height(t),jQuery(".bwg"+r+"_watermark"+a).css({display:""}),void 0===i||""===i){var _=0;(jQuery(".bwg_comment_container").hasClass("bwg_open")||jQuery(".bwg_ecommerce_container").hasClass("bwg_open"))&&(_=gallery_box_data.lightbox_comment_width),e<=jQuery(window).width()-_&&(jQuery(".bwg_watermark_image").css({width:(jQuery(".spider_popup_wrap").width()-_)*gallery_box_data.watermark_font_size/gallery_box_data.image_width}),jQuery(".bwg_watermark_text, .bwg_watermark_text:hover").css({fontSize:(jQuery(".spider_popup_wrap").width()-_)*gallery_box_data.watermark_font_size/gallery_box_data.image_width}))}else jQuery(".bwg"+r+"_title_spun"+a).width(e),jQuery(".bwg"+r+"_title_spun"+a).height(t),jQuery(".bwg"+r+"_description_spun"+a).width(e),jQuery(".bwg"+r+"_description_spun"+a).height(t);jQuery.trim(jQuery(".bwg"+r+"_title_text"+a).text())&&jQuery(".bwg_slideshow_title_text"+a).css({display:""}),jQuery.trim(jQuery(".bwg"+r+"_description_text"+a).text())&&jQuery(".bwg"+r+"_description_text"+a).css({display:""})}function bwg_set_filmstrip_pos(e,t,i){var a,r=void 0!==t&&""!==t?"_"+t:"",_=void 0!==t&&""!==t?"_slideshow":"";a=void 0!==t&&""!==t?bwg_params[t].left_or_top:gallery_box_data.left_or_top;var s=parseInt(jQuery(".bwg_filmstrip_thumbnails").attr("data-all-images-top-bottom-space")),o=parseInt(jQuery(".bwg_filmstrip_thumbnails").attr("data-all-images-right-left-space"));if(void 0===t||""===t){if("outerWidth"==gallery_box_data.outerWidth_or_outerHeight)var l=-bwg_current_filmstrip_pos-jQuery(".bwg_filmstrip_thumbnail").outerWidth(!0)/2;else if("outerHeight"==gallery_box_data.outerWidth_or_outerHeight)l=-bwg_current_filmstrip_pos-jQuery(".bwg_filmstrip_thumbnail").outerHeight(!0)/2;if("width"==gallery_box_data.width_or_height)var n=Math.min(0,Math.max(e-jQuery(".bwg_filmstrip_thumbnails").width(),l+e/2));else if("height"==gallery_box_data.width_or_height)n=Math.min(0,Math.max(e-jQuery(".bwg_filmstrip_thumbnails").height(),l+e/2))}else if("width"==bwg_params[t].width_or_height)l=-bwg_params[t].bwg_current_filmstrip_pos-(jQuery(".bwg_slideshow_filmstrip_thumbnail"+r).width()+bwg_params[t].filmstrip_thumb_margin_hor)/2,n=Math.min(0,Math.max(e-jQuery(".bwg_slideshow_filmstrip_thumbnails"+r).width(),l+e/2));else l=-bwg_params[t].bwg_current_filmstrip_pos-(jQuery(".bwg_slideshow_filmstrip_thumbnail"+r).height()+bwg_params[t].filmstrip_thumb_margin_hor)/2,n=Math.min(0,Math.max(e-jQuery(".bwg_slideshow_filmstrip_thumbnails"+r).height(),l+e/2));0<n+o&&(o=0),0<n+s&&(s=0),"left"==a?jQuery(".bwg"+_+"_filmstrip_thumbnails"+r).animate({left:n+o},{duration:500,complete:function(){bwg_filmstrip_arrows(t)}}):jQuery(".bwg"+_+"_filmstrip_thumbnails"+r).animate({top:n+s},{duration:500,complete:function(){bwg_filmstrip_arrows(t)}})}function bwg_filmstrip_arrows(e){var t=void 0!==e&&""!==e?"_"+e:"",i=void 0!==e&&""!==e?"_slideshow":"";if("width"==(void 0!==e&&""!==e?bwg_params[e].width_or_heigh:gallery_box_data.width_or_height))var a=jQuery(".bwg"+i+"_filmstrip_thumbnails"+t).width(),r=jQuery(".bwg"+i+"_filmstrip"+t).width();else a=jQuery(".bwg"+i+"_filmstrip_thumbnails"+t).height(),r=jQuery(".bwg"+i+"_filmstrip"+t).height();a<r?(jQuery(".bwg"+i+"_filmstrip_left"+t).hide(),jQuery(".bwg"+i+"_filmstrip_right"+t).hide()):(jQuery(".bwg"+i+"_filmstrip_left"+t).show(),jQuery(".bwg"+i+"_filmstrip_right"+t).show())}function bwg_move_filmstrip(e){var t,i,a,r,_,s,o=void 0!==e&&""!==e?"_"+e:"",l=void 0!==e&&""!==e?"_slideshow":"",n=void 0!==e&&""!==e?bwg_params[e].outerWidth_or_outerHeight:gallery_box_data.outerWidth_or_outerHeight,g=void 0!==e&&""!==e?bwg_params[e].left_or_top:gallery_box_data.left_or_top;i="outerWidth"==n?(t=jQuery(".bwg"+l+"_filmstrip"+o).outerWidth(!0),jQuery(".bwg"+l+"_filmstrip_thumbnails"+o).outerWidth(!0)):(t=jQuery(".bwg"+l+"_filmstrip"+o).outerHeight(!0),jQuery(".bwg"+l+"_filmstrip_thumbnails"+o).outerHeight(!0)),s="left"==g?(a=jQuery(".bwg"+l+"_thumb_active"+o).position().left,r="outerWidth"==n?jQuery(".bwg"+l+"_thumb_active"+o).position().left+jQuery(".bwg"+l+"_thumb_active"+o).outerWidth(!0):jQuery(".bwg"+l+"_thumb_active"+o).position().left+jQuery(".bwg"+l+"_thumb_active"+o).outerHeight(!0),_=jQuery(".bwg"+l+"_filmstrip_thumbnails"+o).position().left,Math.abs(jQuery(".bwg"+l+"_filmstrip_thumbnails"+o).position().left)+t):(a=jQuery(".bwg"+l+"_thumb_active"+o).position().top,r="outerWidth"==n?jQuery(".bwg"+l+"_thumb_active"+o).position().top+jQuery(".bwg"+l+"_thumb_active"+o).outerWidth(!0):jQuery(".bwg"+l+"_thumb_active"+o).position().top+jQuery(".bwg"+l+"_thumb_active"+o).outerHeight(!0),_=jQuery(".bwg"+l+"_filmstrip_thumbnails"+o).position().top,Math.abs(jQuery(".bwg"+l+"_filmstrip_thumbnails"+o).position().top)+t),i<t||(a<Math.abs(_)?"left"==g?jQuery(".bwg"+l+"_filmstrip_thumbnails"+o).animate({left:-a},{duration:500,complete:function(){bwg_filmstrip_arrows(e)}}):jQuery(".bwg"+l+"_filmstrip_thumbnails"+o).animate({top:-a},{duration:500,complete:function(){bwg_filmstrip_arrows(e)}}):s<r&&("left"==g?jQuery(".bwg"+l+"_filmstrip_thumbnails"+o).animate({left:-(r-t)},{duration:500,complete:function(){bwg_filmstrip_arrows(e)}}):jQuery(".bwg"+l+"_filmstrip_thumbnails"+o).animate({top:-(r-t)},{duration:500,complete:function(){bwg_filmstrip_arrows(e)}})))}function bwg_move_dots(e){var t=jQuery(".bwg_slideshow_dots_active_"+e).position().left,i=jQuery(".bwg_slideshow_dots_active_"+e).position().left+jQuery(".bwg_slideshow_dots_active_"+e).outerWidth(!0),a=jQuery(".bwg_slideshow_dots_container_"+e).outerWidth(!0),r=jQuery(".bwg_slideshow_dots_thumbnails_"+e).outerWidth(!1),_=jQuery(".bwg_slideshow_dots_thumbnails_"+e).position().left,s=Math.abs(jQuery(".bwg_slideshow_dots_thumbnails_"+e).position().left)+a;r<a||(t<Math.abs(_)?jQuery(".bwg_slideshow_dots_thumbnails_"+e).animate({left:-t},{duration:500,complete:function(){}}):s<i&&jQuery(".bwg_slideshow_dots_thumbnails_"+e).animate({left:-(i-a)},{duration:500,complete:function(){}}))}function bwg_testBrowser_cssTransitions(e){return bwg_testDom("Transition",e)}function bwg_testBrowser_cssTransforms3d(e){return bwg_testDom("Perspective",e)}function bwg_testDom(e,t){for(var i=["","Webkit","Moz","ms","O","Khtml"],a=i.length;a--;)if(void 0!==document.body.style[i[a]+e])return!0;return!1}function bwg_fallback(e,t,i,a){bwg_fade(e,t,i,a)}function bwg_fallback3d(e,t,i,a){bwg_sliceV(e,t,i,a)}function bwg_none(e,t,i,a){var r=void 0!==a&&""!==a?"_"+a:"";if(jQuery(e).css({opacity:0,"z-index":1}),jQuery(t).css({opacity:1,"z-index":2}),void 0!==a&&""!==a){var _=bwg_params[a].bwg_current_key;bwg_change_watermark_container(a),jQuery(".bwg_slideshow_filmstrip_thumbnail"+r).removeClass("bwg_slideshow_thumb_active"+r).addClass("bwg_slideshow_thumb_deactive"+r),jQuery("#bwg_filmstrip_thumbnail_"+_+r).removeClass("bwg_slideshow_thumb_deactive"+r).addClass("bwg_slideshow_thumb_active"+r),jQuery(".bwg_slideshow_dots"+r).removeClass("bwg_slideshow_dots_active"+r).addClass("bwg_slideshow_dots_deactive"+r),jQuery("#bwg_dots_"+_+r).removeClass("bwg_slideshow_dots_deactive"+r).addClass("bwg_slideshow_dots_active"+r)}else jQuery(".bwg_image_info").show(),gallery_box_data.bwg_trans_in_progress=!1,jQuery(e).html(""),bwg_change_watermark_container()}function bwg_iterator(e){var t=1;return void 0!==e&&""!==e&&void 0!==bwg_params[e]&&1==bwg_params[e].enable_slideshow_shuffle&&(t=Math.floor((bwg_params[e].data.length-1)*Math.random()+1)),t}function bwg_change_image_slideshow(e,t,i,a,r){i=bwg_params[r].data;if(jQuery("#bwg_slideshow_image_container_"+r).find("iframe").each(function(){jQuery(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*"),jQuery(this)[0].contentWindow.postMessage('{ "method": "pause" }',"*"),jQuery(this)[0].contentWindow.postMessage("pause","*")}),jQuery("#image_id_"+r+"_"+i[e].id).find(".bwg_fb_video").each(function(){jQuery(this).attr("src",jQuery(this).attr("src"))}),i[t]){if(jQuery(".bwg_ctrl_btn_"+r).hasClass("bwg-icon-pause")&&bwg_play(bwg_params[r].data,r),a||(jQuery("#bwg_current_image_key_"+r).val(t),"-1"==e?e=jQuery(".bwg_slideshow_thumb_active_"+r).children("img").attr("image_key"):"-2"==e&&(e=jQuery(".bwg_slideshow_dots_active_"+r).attr("image_key"))),bwg_params[r].bwg_trans_in_progress)return void bwg_params[r].event_stack.push(e+"-"+t);var _="right";if(t<e)_="left";else if(e==t)return;jQuery(".bwg_slideshow_watermark_"+r).css({display:"none"}),jQuery(".bwg_slideshow_title_text_"+r).css({display:"none"}),jQuery(".bwg_slideshow_description_text_"+r).css({display:"none"}),"width"==bwg_params[r].width_or_height?bwg_params[r].bwg_current_filmstrip_pos=t*(jQuery(".bwg_slideshow_filmstrip_thumbnail_"+r).width()+2+2*bwg_params[r].lightbox_filmstrip_thumb_border_width):bwg_params[r].bwg_current_filmstrip_pos=t*(jQuery(".bwg_slideshow_filmstrip_thumbnail_"+r).height()+2+2*bwg_params[r].lightbox_filmstrip_thumb_border_width),e=t,bwg_params[r].bwg_current_key=e,jQuery("#bwg_slideshow_image_"+r).attr("image_id",i[t].id),jQuery(".bwg_slideshow_title_text_"+r).html(jQuery('<span style="display: block;" />').html(i[t].alt).text()),jQuery(".bwg_slideshow_description_text_"+r).html(jQuery('<span style="display: block;" />').html(i[t].description).text());var s=2==jQuery(".bwg_slideshow_image_spun_"+r).css("zIndex")?".bwg_slideshow_image_spun_"+r:".bwg_slideshow_image_second_spun_"+r,o=s==".bwg_slideshow_image_second_spun_"+r?".bwg_slideshow_image_spun_"+r:".bwg_slideshow_image_second_spun_"+r,l=-1<i[t].filetype.indexOf("EMBED_"),n=-1<i[t].filetype.indexOf("INSTAGRAM_POST"),g=-1<i[t].filetype.indexOf("INSTAGRAM_VIDEO"),w=jQuery(s).height(),b=jQuery(s).width(),u='<span class="bwg_slideshow_image_spun1_'+r+'" style="display:  '+(l?"block":"table")+' ;width: inherit; height: inherit;"><span class="bwg_slideshow_image_spun2_'+r+'" style="display: '+(l?"block":"table-cell")+'; vertical-align: middle; text-align: center; ">';if(l){if(u+='<span style="height: '+w+"px; width: "+b+'px;" class="bwg_popup_embed bwg_popup_watermark">',g&&(u+='<span class="bwg_inst_play_btn_cont" onclick="bwg_play_instagram_video(this)"><span class="bwg_inst_play"></span></span>'),n){var d=0,h=0;w<b+88?d=(h=w)-88:h=(d=b)+88,u+=spider_display_embed(i[t].filetype,i[t].image_url,i[t].filename,{class:"bwg_embed_frame","data-width":i[t].image_width,"data-height":i[t].image_height,frameborder:"0",allowfullscreen:"allowfullscreen",style:"width:"+d+"px; height:"+h+"px; vertical-align:middle; display:inline-block; position:relative;"})}else u+=spider_display_embed(i[t].filetype,i[t].image_url,i[t].filename,{class:"bwg_embed_frame",frameborder:"0",allowfullscreen:"allowfullscreen",style:"width:inherit; height:inherit; vertical-align:middle; display:table-cell;"});u+="</span>"}else{if("do_nothing"!=bwg_params[r].thumb_click_action){var m="";"open_lightbox"==bwg_params[r].thumb_click_action?m+=' class="bwg_lightbox" data-image-id="'+i[t].id+'"':"redirect_to_url"==bwg_params[r].thumb_click_action&&i[t].redirect_url&&(m+='href="'+i[t].redirect_url+'"'+(bwg_params[r].thumb_link_target&&1==bwg_params[r].thumb_link_target?' target="_blank"':"")),u+="<a "+m+">"}u+='<img style="max-height: '+w+"px !important; max-width: "+b+'px !important; display:inline-block;" ',u+=' class="bwg_slide bwg_slideshow_image_'+r+'" ',u+=' id="bwg_slideshow_image_'+r+'" ',u+=' src="'+bwg_params[r].upload_url+jQuery("<span style='display: block;' />").html(i[t].image_url).text()+'" alt="'+i[t].alt+'" image_id="'+i[t].id+'" /></a>'}u+="</span></span>",jQuery(o).html(u),bwg_params[r].preload_images&&bwg_preload_images(t,r),window["bwg_"+bwg_params[r].slideshow_effect](s,o,_,r),0<bwg_params[r].enable_slideshow_filmstrip?bwg_move_filmstrip(r):bwg_move_dots(r),i[t].is_embed_video?jQuery("#bwg_slideshow_play_pause_"+r).css({display:"none"}):jQuery("#bwg_slideshow_play_pause_"+r).css({display:""})}bwg_add_lightbox()}function bwg_preload_images_slideshow(e,t){var i=bwg_params[t].data;count=bwg_params[t].preload_images_count/2;var a=i.length;if(a<bwg_params[t].preload_images_count&&(count=0),0!=count)for(var r=e-count;r<e+count;r++){var _=parseInt((r+a)%a),s=-1<i[_].filetype.indexOf("EMBED_");void 0!==i[_]&&(s||jQuery("<img/>").attr("src",bwg_params[t].upload_url+jQuery('<span style="display: block;" />').html(i[_].image_url).text()))}else for(r=0;r<i.length;r++){s=-1<i[r].filetype.indexOf("EMBED_");void 0!==i[r]&&(s||jQuery("<img/>").attr("src",bwg_params[t].upload_url+jQuery('<span style="display: block;" />').html(i[r].image_url).text()))}}function bwg_preload_images(e,t){void 0!==t&&""!==t?bwg_preload_images_slideshow(e,t):bwg_preload_images_lightbox(e)}function bwg_popup_resize_slidshow(e){var t=jQuery(".bwg_slideshow_image_wrap_"+e).parent().width(),i=bwg_params[e].data;if(t>=bwg_params[e].image_width){jQuery(".bwg_slideshow_image_wrap_"+e).css({width:bwg_params[e].image_width}),jQuery(".bwg_slideshow_image_wrap_"+e).css({height:bwg_params[e].image_height}),jQuery(".bwg_slideshow_image_container_"+e).css({width:"horizontal"==bwg_params[e].filmstrip_direction?bwg_params[e].image_width:bwg_params[e].image_width-bwg_params[e].slideshow_filmstrip_width}),jQuery(".bwg_slideshow_image_container_"+e).css({height:"horizontal"==bwg_params[e].filmstrip_direction?bwg_params[e].image_height-bwg_params[e].slideshow_filmstrip_height:bwg_params[e].image_height}),jQuery(".bwg_slideshow_image_"+e).css({cssText:(bwg_params[e].filmstrip_direction,bwg_params[e].image_width)}),jQuery(".bwg_slideshow_embed_"+e).css({cssText:(bwg_params[e].filmstrip_direction,bwg_params[e].image_width)}),bwg_resize_instagram_post(e),bwg_change_watermark_container(e);var a="horizontal"==bwg_params[e].filmstrip_direction?"width: "+bwg_params[e].image_width:"height: "+bwg_params[e].image_height,r="horizontal"==bwg_params[e].filmstrip_direction?"width: "+(bwg_params[e].image_width-40):"height: "+(bwg_params[e].image_height-40);jQuery(".bwg_slideshow_filmstrip_container_"+e).css({cssText:a}),jQuery(".bwg_slideshow_filmstrip_"+e).css({cssText:r}),jQuery(".bwg_slideshow_dots_container_"+e).css({width:bwg_params[e].image_width}),jQuery("#bwg_slideshow_play_pause-ico_"+e).css({fontSize:bwg_params[e].slideshow_play_pause_btn_size}),"image"==bwg_params[e].watermark_type&&jQuery(".bwg_slideshow_watermark_image_"+e).css({maxWidth:bwg_params[e].watermark_width,maxHeight:bwg_params[e].watermark_height}),"text"==bwg_params[e].watermark_type&&jQuery(".bwg_slideshow_watermark_text_"+e+", .bwg_slideshow_watermark_text_"+e+" : hover").css({fontSize:bwg_params[e].watermark_font_size}),jQuery(".bwg_slideshow_title_text_"+e).css({fontSize:2*bwg_params[e].slideshow_title_font_size}),jQuery(".bwg_slideshow_description_text_"+e).css({fontSize:2*bwg_params[e].slideshow_description_font_size})}else jQuery(".bwg_slideshow_image_wrap_"+e).css({width:t}),jQuery(".bwg_slideshow_image_wrap_"+e).css({height:t*bwg_params[e].image_height/bwg_params[e].image_width}),jQuery(".bwg_slideshow_image_container_"+e).css({width:t-("horizontal"==bwg_params[e].filmstrip_direction?0:bwg_params[e].slideshow_filmstrip_width)}),jQuery(".bwg_slideshow_image_container_"+e).css({height:t*bwg_params[e].image_height/bwg_params[e].image_width-("horizontal"==bwg_params[e].filmstrip_direction?bwg_params[e].slideshow_filmstrip_height:0)}),jQuery(".bwg_slideshow_image_"+e).css({cssText:"max-width: "+(t-("horizontal"==bwg_params[e].filmstrip_direction?0:bwg_params[e].slideshow_filmstrip_width))+"px !important; max-height: "+(t*(bwg_params[e].image_height/bwg_params[e].image_width)-("horizontal"==bwg_params[e].filmstrip_direction?bwg_params[e].slideshow_filmstrip_height:0)-1)+"px !important;"}),jQuery(".bwg_slideshow_embed_"+e).css({cssText:"width: "+(t-("horizontal"==bwg_params[e].filmstrip_direction?0:bwg_params[e].slideshow_filmstrip_width))+"px !important; height: "+(t*(bwg_params[e].image_height/bwg_params[e].image_width)-("horizontal"==bwg_params[e].filmstrip_direction?bwg_params[e].slideshow_filmstrip_height:0)-1)+"px !important;"}),bwg_resize_instagram_post(e),bwg_change_watermark_container(e),"horizontal"==bwg_params[e].filmstrip_direction?(jQuery(".bwg_slideshow_filmstrip_container_"+e).css({width:t}),jQuery(".bwg_slideshow_filmstrip_"+e).css({width:t-40})):(jQuery(".bwg_slideshow_filmstrip_container_"+e).css({height:t*bwg_params[e].image_height/bwg_params[e].image_width}),jQuery(".bwg_slideshow_filmstrip_"+e).css({height:t*bwg_params[e].image_height/bwg_params[e].image_width-40})),jQuery(".bwg_slideshow_dots_container_"+e).css({width:t}),jQuery("#bwg_slideshow_play_pause-ico_"+e).css({fontSize:t*bwg_params[e].slideshow_play_pause_btn_size/bwg_params[e].image_width}),jQuery(".bwg_slideshow_watermark_image_"+e).css({maxWidth:t*bwg_params[e].watermark_width/bwg_params[e].image_width,maxHeight:t*bwg_params[e].watermark_height/bwg_params[e].image_width}),jQuery(".bwg_slideshow_watermark_text_"+e+", .bwg_slideshow_watermark_text_"+e+":hover").css({fontSize:t*bwg_params[e].watermark_font_size/bwg_params[e].image_width}),jQuery(".bwg_slideshow_title_text_"+e).css({fontSize:2*t*bwg_params[e].slideshow_title_font_size/bwg_params[e].image_width}),jQuery(".bwg_slideshow_description_text_"+e).css({fontSize:2*t*bwg_params[e].slideshow_description_font_size/bwg_params[e].image_width}),jQuery(".bwg_slideshow_image_"+e).css({display:"inline-block"});i[parseInt(jQuery("#bwg_current_image_key_"+e).val())].is_embed_video?jQuery("#bwg_slideshow_play_pause_"+e).css({display:"none"}):jQuery("#bwg_slideshow_play_pause_"+e).css({display:""})}function bwg_popup_resize(e){void 0!==e&&""!==e?bwg_popup_resize_slidshow(e):bwg_popup_resize_lightbox()}function bwg_change_image(e,t,i,a,r){void 0!==r&&""!==r?bwg_change_image_slideshow(e,t,i,a,r):bwg_change_image_lightbox(e,t,i=gallery_box_data.data,a)}function bwg_resize_instagram_post(e){if(void 0!==e&&""!==e){if(jQuery(".inner_instagram_iframe_bwg_embed_frame_"+e).length){var t=jQuery(".bwg_slideshow_embed_"+e).width(),i=jQuery(".bwg_slideshow_embed_").height();jQuery(".inner_instagram_iframe_bwg_embed_frame_"+e).each(function(){var e=jQuery(this).parent();i/(parseInt(e.attr("data-height"))+96)<t/parseInt(e.attr("data-width"))?(e.height(i),e.width((e.height()-96)*e.attr("data-width")/e.attr("data-height")+16)):(e.width(t),e.height((e.width()-16)*e.attr("data-height")/e.attr("data-width")+96))}),bwg_change_watermark_container(e)}}else if(jQuery(".inner_instagram_iframe_bwg_embed_frame").length){t=jQuery(".bwg_image_container").width(),i=jQuery(".bwg_image_container").height();jQuery(".inner_instagram_iframe_bwg_embed_frame").each(function(){var e=jQuery(this).parent();i/(parseInt(e.attr("data-height"))+176)<t/parseInt(e.attr("data-width"))?(e.height(i),e.width((e.height()-176)*e.attr("data-width")/e.attr("data-height")+16)):(e.width(t),e.height((e.width()-16)*e.attr("data-height")/e.attr("data-width")+96)),e.css({top:.5*(i-e.height())})}),bwg_change_watermark_container()}}function bwg_play(t,i){if(void 0!==i&&""!==i)t=bwg_params[i].data;void 0!==i&&""!==i?(window.clearInterval(window["bwg_playInterval"+i]),window["bwg_playInterval"+i]=setInterval(function(){var e=1;1==bwg_params[i].enable_slideshow_shuffle&&(e=Math.floor((t.length-1)*Math.random()+1)),bwg_change_image(parseInt(jQuery("#bwg_current_image_key_"+i).val()),(parseInt(jQuery("#bwg_current_image_key_"+i).val())+e)%t.length,t,"",i)},1e3*bwg_params[i].slideshow_interval)):(window.clearInterval(gallery_box_data.bwg_playInterval),gallery_box_data.bwg_playInterval=setInterval(function(){jQuery(".bwg_comment_container").hasClass("bwg_open")||jQuery(".bwg_play_pause").length&&jQuery(".bwg_play_pause").hasClass("bwg-icon-play")||(void 0===t||void 0!==t[parseInt(jQuery("#bwg_current_image_key").val())+1]?bwg_change_image(parseInt(jQuery("#bwg_current_image_key").val()),parseInt(jQuery("#bwg_current_image_key").val())+1):1==gallery_box_data.enable_loop&&bwg_change_image(parseInt(jQuery("#bwg_current_image_key").val()),0))},1e3*gallery_box_data.slideshow_interval))}function bwg_image_browser(e){if(jQuery("#bwg_embed_frame_16x9_"+e).width(jQuery("#bwg_embed_frame_16x9_"+e).parents(".image_browser_image_buttons_"+e).width()),jQuery("#bwg_embed_frame_16x9_"+e).height(.5625*jQuery("#bwg_embed_frame_16x9_"+e).width()),jQuery("#bwg_embed_frame_instapost_"+e).width(jQuery("#bwg_embed_frame_16x9_"+e).parents(".image_browser_image_buttons_"+e).width()),jQuery(".image_browser_images_conteiner_"+e).find(".fluid-width-video-wrapper").length){var t=jQuery(".image_browser_images_conteiner_"+e).find(".fluid-width-video-wrapper").contents();jQuery(".image_browser_images_conteiner_"+e).find(".fluid-width-video-wrapper").replaceWith(t)}jQuery(".bwg_embed_frame_instapost_"+e).height((jQuery(".bwg_embed_frame_instapost_"+e).width()-16)*jQuery(".bwg_embed_frame_instapost_"+e).attr("data-height")/jQuery(".bwg_embed_frame_instapost_"+e).attr("data-width")+96);var i=jQuery(".image_browser_images_"+e).width();i<=108?jQuery(".paging-input_"+e).css("display","none"):(i<=200?(jQuery(".paging-input_"+e).css("margin","0% 0% 0% 0%"),jQuery(".paging-input_"+e).css("display","inline")):i<=580?(jQuery(".paging-input_"+e).css("display","inline"),jQuery(".tablenav-pages_"+e+" a").css("font-size","13px"),jQuery(".paging-input_"+e).css("margin","0% 7% 0% 7%")):(jQuery(".tablenav-pages_"+e+" a").css("font-size","15px"),jQuery(".paging-input_"+e).css("margin","0%  14% 0%  14%"),jQuery(".paging-input_"+e).css("display","inline")),jQuery(".tablenav-pages_"+e+" .next-page").css("margin","0% 0% 0% 0%"),jQuery(".tablenav-pages_"+e+" .prev-page").css("margin","0% 0% 0% 0%"))}function bwg_disable_right_click(e){e.bind("contextmenu",function(){return!1}),e.css("webkitTouchCallout","none")}jQuery(document).ready(function(){document.addEventListener("visibilitychange",function(){var e=!1;jQuery(".bwg_container").each(function(){0<jQuery(this).find(".wd_error").length&&(e=!0)}),e||("visible"==document.visibilityState&&bwg_slideshow_focus(),"hidden"==document.visibilityState&&bwg_slideshow_blur())}),bwg_main_ready(),jQuery.fn.extend({hideShow:function(e){return this.checkForVisiblilityChange(e),this},checkForVisiblilityChange:function(e){if(this.length>>>0){for(var t,i,a,r=0;t=this[r++];){var _=jQuery(t).is(":visible");void 0===t.lastVisibility&&(t.lastVisibility=_),_!==t.lastVisibility&&(t.lastVisibility=_,"function"==typeof e&&e.apply(this,[new jQuery.Event("visibilityChanged"),_?"shown":"hidden"]),function(e,t){setTimeout(function(){jQuery(e).trigger("visibilityChanged",[t?"shown":"hidden"])},10)}(t,_))}i=this,a=arguments,setTimeout(function(){i.checkForVisiblilityChange.apply(i,a)},10)}}}),jQuery(this).hideShow(function(e,t){"shown"==t&&bwg_main_ready()})}),jQuery(window).on("resize",function(){var e=!1;jQuery(".bwg_container").each(function(){0<jQuery(this).find(".wd_error").length&&(e=!0)}),e||(jQuery(".bwg-thumbnails, .bwg-masonry-thumbnails, .bwg-album-thumbnails").each(function(){bwg_all_thumnails_loaded(this)}),bwg_slideshow_resize(),bwg_image_browser_resize(),bwg_carousel_resize(),bwg_blog_style_resize(),jQuery(".bwg-mosaic-thumbnails").each(function(){bwg_thumbnail_mosaic(this)})),bwg_resize_search_line()}),jQuery(window).on("load",function(){var e=!1;jQuery(".bwg_container").each(function(){0<jQuery(this).find(".wd_error").length&&(e=!0)}),e||(bwg_blog_style_onload(),jQuery(".bwg-mosaic-thumbnails").each(function(){bwg_thumbnail_mosaic(this)}))}),jQuery(".bwg-masonry-thumb-span img, .bwg-mosaic-thumb-span img").on("error",function(){jQuery(this).height(100),jQuery(this).width(100)});
(function($){'use strict';if(typeof wpcf7==='undefined'||wpcf7===null){return;}
wpcf7=$.extend({cached:0,inputs:[]},wpcf7);$(function(){wpcf7.supportHtml5=(function(){var features={};var input=document.createElement('input');features.placeholder='placeholder'in input;var inputTypes=['email','url','tel','number','range','date'];$.each(inputTypes,function(index,value){input.setAttribute('type',value);features[value]=input.type!=='text';});return features;})();$('div.wpcf7 > form').each(function(){var $form=$(this);wpcf7.initForm($form);if(wpcf7.cached){wpcf7.refill($form);}});});wpcf7.getId=function(form){return parseInt($('input[name="_wpcf7"]',form).val(),10);};wpcf7.initForm=function(form){var $form=$(form);$form.submit(function(event){if(!wpcf7.supportHtml5.placeholder){$('[placeholder].placeheld',$form).each(function(i,n){$(n).val('').removeClass('placeheld');});}
if(typeof window.FormData==='function'){wpcf7.submit($form);event.preventDefault();}});$('.wpcf7-submit',$form).after('<span class="ajax-loader"></span>');wpcf7.toggleSubmit($form);$form.on('click','.wpcf7-acceptance',function(){wpcf7.toggleSubmit($form);});$('.wpcf7-exclusive-checkbox',$form).on('click','input:checkbox',function(){var name=$(this).attr('name');$form.find('input:checkbox[name="'+name+'"]').not(this).prop('checked',false);});$('.wpcf7-list-item.has-free-text',$form).each(function(){var $freetext=$(':input.wpcf7-free-text',this);var $wrap=$(this).closest('.wpcf7-form-control');if($(':checkbox, :radio',this).is(':checked')){$freetext.prop('disabled',false);}else{$freetext.prop('disabled',true);}
$wrap.on('change',':checkbox, :radio',function(){var $cb=$('.has-free-text',$wrap).find(':checkbox, :radio');if($cb.is(':checked')){$freetext.prop('disabled',false).focus();}else{$freetext.prop('disabled',true);}});});if(!wpcf7.supportHtml5.placeholder){$('[placeholder]',$form).each(function(){$(this).val($(this).attr('placeholder'));$(this).addClass('placeheld');$(this).focus(function(){if($(this).hasClass('placeheld')){$(this).val('').removeClass('placeheld');}});$(this).blur(function(){if(''===$(this).val()){$(this).val($(this).attr('placeholder'));$(this).addClass('placeheld');}});});}
if(wpcf7.jqueryUi&&!wpcf7.supportHtml5.date){$form.find('input.wpcf7-date[type="date"]').each(function(){$(this).datepicker({dateFormat:'yy-mm-dd',minDate:new Date($(this).attr('min')),maxDate:new Date($(this).attr('max'))});});}
if(wpcf7.jqueryUi&&!wpcf7.supportHtml5.number){$form.find('input.wpcf7-number[type="number"]').each(function(){$(this).spinner({min:$(this).attr('min'),max:$(this).attr('max'),step:$(this).attr('step')});});}
$('.wpcf7-character-count',$form).each(function(){var $count=$(this);var name=$count.attr('data-target-name');var down=$count.hasClass('down');var starting=parseInt($count.attr('data-starting-value'),10);var maximum=parseInt($count.attr('data-maximum-value'),10);var minimum=parseInt($count.attr('data-minimum-value'),10);var updateCount=function(target){var $target=$(target);var length=$target.val().length;var count=down?starting-length:length;$count.attr('data-current-value',count);$count.text(count);if(maximum&&maximum<length){$count.addClass('too-long');}else{$count.removeClass('too-long');}
if(minimum&&length<minimum){$count.addClass('too-short');}else{$count.removeClass('too-short');}};$(':input[name="'+name+'"]',$form).each(function(){updateCount(this);$(this).keyup(function(){updateCount(this);});});});$form.on('change','.wpcf7-validates-as-url',function(){var val=$.trim($(this).val());if(val&&!val.match(/^[a-z][a-z0-9.+-]*:/i)&&-1!==val.indexOf('.')){val=val.replace(/^\/+/,'');val='http://'+val;}
$(this).val(val);});};wpcf7.submit=function(form){if(typeof window.FormData!=='function'){return;}
var $form=$(form);$('.ajax-loader',$form).addClass('is-active');wpcf7.clearResponse($form);var formData=new FormData($form.get(0));var detail={id:$form.closest('div.wpcf7').attr('id'),status:'init',inputs:[],formData:formData};$.each($form.serializeArray(),function(i,field){if('_wpcf7'==field.name){detail.contactFormId=field.value;}else if('_wpcf7_version'==field.name){detail.pluginVersion=field.value;}else if('_wpcf7_locale'==field.name){detail.contactFormLocale=field.value;}else if('_wpcf7_unit_tag'==field.name){detail.unitTag=field.value;}else if('_wpcf7_container_post'==field.name){detail.containerPostId=field.value;}else if(field.name.match(/^_wpcf7_\w+_free_text_/)){var owner=field.name.replace(/^_wpcf7_\w+_free_text_/,'');detail.inputs.push({name:owner+'-free-text',value:field.value});}else if(field.name.match(/^_/)){}else{detail.inputs.push(field);}});wpcf7.triggerEvent($form.closest('div.wpcf7'),'beforesubmit',detail);var ajaxSuccess=function(data,status,xhr,$form){detail.id=$(data.into).attr('id');detail.status=data.status;detail.apiResponse=data;var $message=$('.wpcf7-response-output',$form);switch(data.status){case'validation_failed':$.each(data.invalidFields,function(i,n){$(n.into,$form).each(function(){wpcf7.notValidTip(this,n.message);$('.wpcf7-form-control',this).addClass('wpcf7-not-valid');$('[aria-invalid]',this).attr('aria-invalid','true');});});$message.addClass('wpcf7-validation-errors');$form.addClass('invalid');wpcf7.triggerEvent(data.into,'invalid',detail);break;case'acceptance_missing':$message.addClass('wpcf7-acceptance-missing');$form.addClass('unaccepted');wpcf7.triggerEvent(data.into,'unaccepted',detail);break;case'spam':$message.addClass('wpcf7-spam-blocked');$form.addClass('spam');wpcf7.triggerEvent(data.into,'spam',detail);break;case'aborted':$message.addClass('wpcf7-aborted');$form.addClass('aborted');wpcf7.triggerEvent(data.into,'aborted',detail);break;case'mail_sent':$message.addClass('wpcf7-mail-sent-ok');$form.addClass('sent');wpcf7.triggerEvent(data.into,'mailsent',detail);break;case'mail_failed':$message.addClass('wpcf7-mail-sent-ng');$form.addClass('failed');wpcf7.triggerEvent(data.into,'mailfailed',detail);break;default:var customStatusClass='custom-'
+data.status.replace(/[^0-9a-z]+/i,'-');$message.addClass('wpcf7-'+customStatusClass);$form.addClass(customStatusClass);}
wpcf7.refill($form,data);wpcf7.triggerEvent(data.into,'submit',detail);if('mail_sent'==data.status){$form.each(function(){this.reset();});wpcf7.toggleSubmit($form);}
if(!wpcf7.supportHtml5.placeholder){$form.find('[placeholder].placeheld').each(function(i,n){$(n).val($(n).attr('placeholder'));});}
$message.html('').append(data.message).slideDown('fast');$message.attr('role','alert');$('.screen-reader-response',$form.closest('.wpcf7')).each(function(){var $response=$(this);$response.html('').attr('role','').append(data.message);if(data.invalidFields){var $invalids=$('<ul></ul>');$.each(data.invalidFields,function(i,n){if(n.idref){var $li=$('<li></li>').append($('<a></a>').attr('href','#'+n.idref).append(n.message));}else{var $li=$('<li></li>').append(n.message);}
$invalids.append($li);});$response.append($invalids);}
$response.attr('role','alert').focus();});};$.ajax({type:'POST',url:wpcf7.apiSettings.getRoute('/contact-forms/'+wpcf7.getId($form)+'/feedback'),data:formData,dataType:'json',processData:false,contentType:false}).done(function(data,status,xhr){ajaxSuccess(data,status,xhr,$form);$('.ajax-loader',$form).removeClass('is-active');}).fail(function(xhr,status,error){var $e=$('<div class="ajax-error"></div>').text(error.message);$form.after($e);});};wpcf7.triggerEvent=function(target,name,detail){var $target=$(target);var event=new CustomEvent('wpcf7'+name,{bubbles:true,detail:detail});$target.get(0).dispatchEvent(event);$target.trigger('wpcf7:'+name,detail);$target.trigger(name+'.wpcf7',detail);};wpcf7.toggleSubmit=function(form,state){var $form=$(form);var $submit=$('input:submit',$form);if(typeof state!=='undefined'){$submit.prop('disabled',!state);return;}
if($form.hasClass('wpcf7-acceptance-as-validation')){return;}
$submit.prop('disabled',false);$('.wpcf7-acceptance',$form).each(function(){var $span=$(this);var $input=$('input:checkbox',$span);if(!$span.hasClass('optional')){if($span.hasClass('invert')&&$input.is(':checked')||!$span.hasClass('invert')&&!$input.is(':checked')){$submit.prop('disabled',true);return false;}}});};wpcf7.notValidTip=function(target,message){var $target=$(target);$('.wpcf7-not-valid-tip',$target).remove();$('<span role="alert" class="wpcf7-not-valid-tip"></span>').text(message).appendTo($target);if($target.is('.use-floating-validation-tip *')){var fadeOut=function(target){$(target).not(':hidden').animate({opacity:0},'fast',function(){$(this).css({'z-index':-100});});};$target.on('mouseover','.wpcf7-not-valid-tip',function(){fadeOut(this);});$target.on('focus',':input',function(){fadeOut($('.wpcf7-not-valid-tip',$target));});}};wpcf7.refill=function(form,data){var $form=$(form);var refillCaptcha=function($form,items){$.each(items,function(i,n){$form.find(':input[name="'+i+'"]').val('');$form.find('img.wpcf7-captcha-'+i).attr('src',n);var match=/([0-9]+)\.(png|gif|jpeg)$/.exec(n);$form.find('input:hidden[name="_wpcf7_captcha_challenge_'+i+'"]').attr('value',match[1]);});};var refillQuiz=function($form,items){$.each(items,function(i,n){$form.find(':input[name="'+i+'"]').val('');$form.find(':input[name="'+i+'"]').siblings('span.wpcf7-quiz-label').text(n[0]);$form.find('input:hidden[name="_wpcf7_quiz_answer_'+i+'"]').attr('value',n[1]);});};if(typeof data==='undefined'){$.ajax({type:'GET',url:wpcf7.apiSettings.getRoute('/contact-forms/'+wpcf7.getId($form)+'/refill'),beforeSend:function(xhr){var nonce=$form.find(':input[name="_wpnonce"]').val();if(nonce){xhr.setRequestHeader('X-WP-Nonce',nonce);}},dataType:'json'}).done(function(data,status,xhr){if(data.captcha){refillCaptcha($form,data.captcha);}
if(data.quiz){refillQuiz($form,data.quiz);}});}else{if(data.captcha){refillCaptcha($form,data.captcha);}
if(data.quiz){refillQuiz($form,data.quiz);}}};wpcf7.clearResponse=function(form){var $form=$(form);$form.removeClass('invalid spam sent failed');$form.siblings('.screen-reader-response').html('').attr('role','');$('.wpcf7-not-valid-tip',$form).remove();$('[aria-invalid]',$form).attr('aria-invalid','false');$('.wpcf7-form-control',$form).removeClass('wpcf7-not-valid');$('.wpcf7-response-output',$form).hide().empty().removeAttr('role').removeClass('wpcf7-mail-sent-ok wpcf7-mail-sent-ng wpcf7-validation-errors wpcf7-spam-blocked');};wpcf7.apiSettings.getRoute=function(path){var url=wpcf7.apiSettings.root;url=url.replace(wpcf7.apiSettings.namespace,wpcf7.apiSettings.namespace+path);return url;};})(jQuery);(function(){if(typeof window.CustomEvent==="function")return false;function CustomEvent(event,params){params=params||{bubbles:false,cancelable:false,detail:undefined};var evt=document.createEvent('CustomEvent');evt.initCustomEvent(event,params.bubbles,params.cancelable,params.detail);return evt;}
CustomEvent.prototype=window.Event.prototype;window.CustomEvent=CustomEvent;})();
!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=29)}({29:function(e,t,n){!function(t,n){var i=function(e,t){"use strict";var n,i;if(function(){var t,n={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};for(t in i=e.lazySizesConfig||e.lazysizesConfig||{},n)t in i||(i[t]=n[t])}(),!t||!t.getElementsByClassName)return{init:function(){},cfg:i,noSupport:!0};var r=t.documentElement,a=e.Date,o=e.HTMLPictureElement,s=e.addEventListener,l=e.setTimeout,u=e.requestAnimationFrame||l,c=e.requestIdleCallback,d=/^picture$/i,f=["load","error","lazyincluded","_lazyloaded"],y={},g=Array.prototype.forEach,v=function(e,t){return y[t]||(y[t]=new RegExp("(\\s|^)"+t+"(\\s|$)")),y[t].test(e.getAttribute("class")||"")&&y[t]},m=function(e,t){v(e,t)||e.setAttribute("class",(e.getAttribute("class")||"").trim()+" "+t)},p=function(e,t){var n;(n=v(e,t))&&e.setAttribute("class",(e.getAttribute("class")||"").replace(n," "))},z=function(e,t,n){var i=n?"addEventListener":"removeEventListener";n&&z(e,t),f.forEach((function(n){e[i](n,t)}))},h=function(e,i,r,a,o){var s=t.createEvent("Event");return r||(r={}),r.instance=n,s.initEvent(i,!a,!o),s.detail=r,e.dispatchEvent(s),s},b=function(t,n){var r;!o&&(r=e.picturefill||i.pf)?(n&&n.src&&!t.getAttribute("srcset")&&t.setAttribute("srcset",n.src),r({reevaluate:!0,elements:[t]})):n&&n.src&&(t.src=n.src)},A=function(e,t){return(getComputedStyle(e,null)||{})[t]},C=function(e,t,n){for(n=n||e.offsetWidth;n<i.minSize&&t&&!e._lazysizesWidth;)n=t.offsetWidth,t=t.parentNode;return n},E=(ye=[],ge=[],ve=ye,me=function(){var e=ve;for(ve=ye.length?ge:ye,de=!0,fe=!1;e.length;)e.shift()();de=!1},pe=function(e,n){de&&!n?e.apply(this,arguments):(ve.push(e),fe||(fe=!0,(t.hidden?l:u)(me)))},pe._lsFlush=me,pe),_=function(e,t){return t?function(){E(e)}:function(){var t=this,n=arguments;E((function(){e.apply(t,n)}))}},M=function(e){var t,n,i=function(){t=null,e()},r=function(){var e=a.now()-n;e<99?l(r,99-e):(c||i)(i)};return function(){n=a.now(),t||(t=l(r,99))}},w=(U=/^img$/i,G=/^iframe$/i,J="onscroll"in e&&!/(gle|ing)bot/.test(navigator.userAgent),K=0,Q=0,V=-1,X=function(e){Q--,(!e||Q<0||!e.target)&&(Q=0)},Y=function(e){return null==q&&(q="hidden"==A(t.body,"visibility")),q||!("hidden"==A(e.parentNode,"visibility")&&"hidden"==A(e,"visibility"))},Z=function(e,n){var i,a=e,o=Y(e);for(k-=n,I+=n,H-=n,$+=n;o&&(a=a.offsetParent)&&a!=t.body&&a!=r;)(o=(A(a,"opacity")||1)>0)&&"visible"!=A(a,"overflow")&&(i=a.getBoundingClientRect(),o=$>i.left&&H<i.right&&I>i.top-1&&k<i.bottom+1);return o},ee=function(){var e,a,o,s,l,u,c,d,f,y,g,v,m=n.elements;if((F=i.loadMode)&&Q<8&&(e=m.length)){for(a=0,V++;a<e;a++)if(m[a]&&!m[a]._lazyRace)if(!J||n.prematureUnveil&&n.prematureUnveil(m[a]))se(m[a]);else if((d=m[a].getAttribute("data-expand"))&&(u=1*d)||(u=K),y||(y=!i.expand||i.expand<1?r.clientHeight>500&&r.clientWidth>500?500:370:i.expand,n._defEx=y,g=y*i.expFactor,v=i.hFac,q=null,K<g&&Q<1&&V>2&&F>2&&!t.hidden?(K=g,V=0):K=F>1&&V>1&&Q<6?y:0),f!==u&&(j=innerWidth+u*v,D=innerHeight+u,c=-1*u,f=u),o=m[a].getBoundingClientRect(),(I=o.bottom)>=c&&(k=o.top)<=D&&($=o.right)>=c*v&&(H=o.left)<=j&&(I||$||H||k)&&(i.loadHidden||Y(m[a]))&&(P&&Q<3&&!d&&(F<3||V<4)||Z(m[a],u))){if(se(m[a]),l=!0,Q>9)break}else!l&&P&&!s&&Q<4&&V<4&&F>2&&(W[0]||i.preloadAfterLoad)&&(W[0]||!d&&(I||$||H||k||"auto"!=m[a].getAttribute(i.sizesAttr)))&&(s=W[0]||m[a]);s&&!l&&se(s)}},te=function(e){var t,n=0,r=i.throttleDelay,o=i.ricTimeout,s=function(){t=!1,n=a.now(),e()},u=c&&o>49?function(){c(s,{timeout:o}),o!==i.ricTimeout&&(o=i.ricTimeout)}:_((function(){l(s)}),!0);return function(e){var i;(e=!0===e)&&(o=33),t||(t=!0,(i=r-(a.now()-n))<0&&(i=0),e||i<9?u():l(u,i))}}(ee),ne=function(e){var t=e.target;t._lazyCache?delete t._lazyCache:(X(e),m(t,i.loadedClass),p(t,i.loadingClass),z(t,re),h(t,"lazyloaded"))},ie=_(ne),re=function(e){ie({target:e.target})},ae=function(e){var t,n=e.getAttribute(i.srcsetAttr);(t=i.customMedia[e.getAttribute("data-media")||e.getAttribute("media")])&&e.setAttribute("media",t),n&&e.setAttribute("srcset",n)},oe=_((function(e,t,n,r,a){var o,s,u,c,f,y;(f=h(e,"lazybeforeunveil",t)).defaultPrevented||(r&&(n?m(e,i.autosizesClass):e.setAttribute("sizes",r)),s=e.getAttribute(i.srcsetAttr),o=e.getAttribute(i.srcAttr),a&&(c=(u=e.parentNode)&&d.test(u.nodeName||"")),y=t.firesLoad||"src"in e&&(s||o||c),f={target:e},m(e,i.loadingClass),y&&(clearTimeout(B),B=l(X,2500),z(e,re,!0)),c&&g.call(u.getElementsByTagName("source"),ae),s?e.setAttribute("srcset",s):o&&!c&&(G.test(e.nodeName)?function(e,t){try{e.contentWindow.location.replace(t)}catch(n){e.src=t}}(e,o):e.src=o),a&&(s||c)&&b(e,{src:o})),e._lazyRace&&delete e._lazyRace,p(e,i.lazyClass),E((function(){var t=e.complete&&e.naturalWidth>1;y&&!t||(t&&m(e,"ls-is-cached"),ne(f),e._lazyCache=!0,l((function(){"_lazyCache"in e&&delete e._lazyCache}),9)),"lazy"==e.loading&&Q--}),!0)})),se=function(e){if(!e._lazyRace){var t,n=U.test(e.nodeName),r=n&&(e.getAttribute(i.sizesAttr)||e.getAttribute("sizes")),a="auto"==r;(!a&&P||!n||!e.getAttribute("src")&&!e.srcset||e.complete||v(e,i.errorClass)||!v(e,i.lazyClass))&&(t=h(e,"lazyunveilread").detail,a&&x.updateElem(e,!0,e.offsetWidth),e._lazyRace=!0,Q++,oe(e,t,a,r,n))}},le=M((function(){i.loadMode=3,te()})),ue=function(){3==i.loadMode&&(i.loadMode=2),le()},ce=function(){P||(a.now()-R<999?l(ce,999):(P=!0,i.loadMode=3,te(),s("scroll",ue,!0)))},{_:function(){R=a.now(),n.elements=t.getElementsByClassName(i.lazyClass),W=t.getElementsByClassName(i.lazyClass+" "+i.preloadClass),s("scroll",te,!0),s("resize",te,!0),e.MutationObserver?new MutationObserver(te).observe(r,{childList:!0,subtree:!0,attributes:!0}):(r.addEventListener("DOMNodeInserted",te,!0),r.addEventListener("DOMAttrModified",te,!0),setInterval(te,999)),s("hashchange",te,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach((function(e){t.addEventListener(e,te,!0)})),/d$|^c/.test(t.readyState)?ce():(s("load",ce),t.addEventListener("DOMContentLoaded",te),l(ce,2e4)),n.elements.length?(ee(),E._lsFlush()):te()},checkElems:te,unveil:se,_aLSL:ue}),x=(S=_((function(e,t,n,i){var r,a,o;if(e._lazysizesWidth=i,i+="px",e.setAttribute("sizes",i),d.test(t.nodeName||""))for(a=0,o=(r=t.getElementsByTagName("source")).length;a<o;a++)r[a].setAttribute("sizes",i);n.detail.dataAttr||b(e,n.detail)})),O=function(e,t,n){var i,r=e.parentNode;r&&(n=C(e,r,n),(i=h(e,"lazybeforesizes",{width:n,dataAttr:!!t})).defaultPrevented||(n=i.detail.width)&&n!==e._lazysizesWidth&&S(e,r,i,n))},T=M((function(){var e,t=L.length;if(t)for(e=0;e<t;e++)O(L[e])})),{_:function(){L=t.getElementsByClassName(i.autosizesClass),s("resize",T)},checkElems:T,updateElem:O}),N=function(){!N.i&&t.getElementsByClassName&&(N.i=!0,x._(),w._())};var L,S,O,T;var W,P,B,F,R,j,D,k,H,$,I,q,U,G,J,K,Q,V,X,Y,Z,ee,te,ne,ie,re,ae,oe,se,le,ue,ce;var de,fe,ye,ge,ve,me,pe;return l((function(){i.init&&N()})),n={cfg:i,autoSizer:x,loader:w,init:N,uP:b,aC:m,rC:p,hC:v,fire:h,gW:C,rAF:E}}(t,t.document);t.lazySizes=i,e.exports&&(e.exports=i)}("undefined"!=typeof window?window:{})}});
;
/*! jQuery Migrate v3.0.0 | (c) jQuery Foundation and other contributors | jquery.org/license */
"undefined"==typeof jQuery.migrateMute&&(jQuery.migrateMute=!0),function(a,b){"use strict";function c(c){var d=b.console;e[c]||(e[c]=!0,a.migrateWarnings.push(c),d&&d.warn&&!a.migrateMute&&(d.warn("JQMIGRATE: "+c),a.migrateTrace&&d.trace&&d.trace()))}function d(a,b,d,e){Object.defineProperty(a,b,{configurable:!0,enumerable:!0,get:function(){return c(e),d}})}a.migrateVersion="3.0.0",function(){var c=b.console&&b.console.log&&function(){b.console.log.apply(b.console,arguments)},d=/^[12]\./;c&&(a&&!d.test(a.fn.jquery)||c("JQMIGRATE: jQuery 3.0.0+ REQUIRED"),a.migrateWarnings&&c("JQMIGRATE: Migrate plugin loaded multiple times"),c("JQMIGRATE: Migrate is installed"+(a.migrateMute?"":" with logging active")+", version "+a.migrateVersion))}();var e={};a.migrateWarnings=[],void 0===a.migrateTrace&&(a.migrateTrace=!0),a.migrateReset=function(){e={},a.migrateWarnings.length=0},"BackCompat"===document.compatMode&&c("jQuery is not compatible with Quirks Mode");var f=a.fn.init,g=a.isNumeric,h=a.find,i=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,j=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g;a.fn.init=function(a){var b=Array.prototype.slice.call(arguments);return"string"==typeof a&&"#"===a&&(c("jQuery( '#' ) is not a valid selector"),b[0]=[]),f.apply(this,b)},a.fn.init.prototype=a.fn,a.find=function(a){var b=Array.prototype.slice.call(arguments);if("string"==typeof a&&i.test(a))try{document.querySelector(a)}catch(d){a=a.replace(j,function(a,b,c,d){return"["+b+c+'"'+d+'"]'});try{document.querySelector(a),c("Attribute selector with '#' must be quoted: "+b[0]),b[0]=a}catch(e){c("Attribute selector with '#' was not fixed: "+b[0])}}return h.apply(this,b)};var k;for(k in h)Object.prototype.hasOwnProperty.call(h,k)&&(a.find[k]=h[k]);a.fn.size=function(){return c("jQuery.fn.size() is deprecated; use the .length property"),this.length},a.parseJSON=function(){return c("jQuery.parseJSON is deprecated; use JSON.parse"),JSON.parse.apply(null,arguments)},a.isNumeric=function(b){function d(b){var c=b&&b.toString();return!a.isArray(b)&&c-parseFloat(c)+1>=0}var e=g(b),f=d(b);return e!==f&&c("jQuery.isNumeric() should not be called on constructed objects"),f},d(a,"unique",a.uniqueSort,"jQuery.unique is deprecated, use jQuery.uniqueSort"),d(a.expr,"filters",a.expr.pseudos,"jQuery.expr.filters is now jQuery.expr.pseudos"),d(a.expr,":",a.expr.pseudos,'jQuery.expr[":"] is now jQuery.expr.pseudos');var l=a.ajax;a.ajax=function(){var a=l.apply(this,arguments);return a.promise&&(d(a,"success",a.done,"jQXHR.success is deprecated and removed"),d(a,"error",a.fail,"jQXHR.error is deprecated and removed"),d(a,"complete",a.always,"jQXHR.complete is deprecated and removed")),a};var m=a.fn.removeAttr,n=a.fn.toggleClass,o=/\S+/g;a.fn.removeAttr=function(b){var d=this;return a.each(b.match(o),function(b,e){a.expr.match.bool.test(e)&&(c("jQuery.fn.removeAttr no longer sets boolean properties: "+e),d.prop(e,!1))}),m.apply(this,arguments)},a.fn.toggleClass=function(b){return void 0!==b&&"boolean"!=typeof b?n.apply(this,arguments):(c("jQuery.fn.toggleClass( boolean ) is deprecated"),this.each(function(){var c=this.getAttribute&&this.getAttribute("class")||"";c&&a.data(this,"__className__",c),this.setAttribute&&this.setAttribute("class",c||b===!1?"":a.data(this,"__className__")||"")}))};var p=!1;a.swap&&a.each(["height","width","reliableMarginRight"],function(b,c){var d=a.cssHooks[c]&&a.cssHooks[c].get;d&&(a.cssHooks[c].get=function(){var a;return p=!0,a=d.apply(this,arguments),p=!1,a})}),a.swap=function(a,b,d,e){var f,g,h={};p||c("jQuery.swap() is undocumented and deprecated");for(g in b)h[g]=a.style[g],a.style[g]=b[g];f=d.apply(a,e||[]);for(g in b)a.style[g]=h[g];return f};var q=a.data;a.data=function(b,d,e){var f;return d&&d!==a.camelCase(d)&&(f=a.hasData(b)&&q.call(this,b),f&&d in f)?(c("jQuery.data() always sets/gets camelCased names: "+d),arguments.length>2&&(f[d]=e),f[d]):q.apply(this,arguments)};var r=a.Tween.prototype.run;a.Tween.prototype.run=function(b){a.easing[this.easing].length>1&&(c('easing function "jQuery.easing.'+this.easing.toString()+'" should use only first argument'),a.easing[this.easing]=a.easing[this.easing].bind(a.easing,b,this.options.duration*b,0,1,this.options.duration)),r.apply(this,arguments)};var s=a.fn.load,t=a.event.fix;a.event.props=[],a.event.fixHooks={},a.event.fix=function(b){var d,e=b.type,f=this.fixHooks[e],g=a.event.props;if(g.length)for(c("jQuery.event.props are deprecated and removed: "+g.join());g.length;)a.event.addProp(g.pop());if(f&&!f._migrated_&&(f._migrated_=!0,c("jQuery.event.fixHooks are deprecated and removed: "+e),(g=f.props)&&g.length))for(;g.length;)a.event.addProp(g.pop());return d=t.call(this,b),f&&f.filter?f.filter(d,b):d},a.each(["load","unload","error"],function(b,d){a.fn[d]=function(){var a=Array.prototype.slice.call(arguments,0);return"load"===d&&"string"==typeof a[0]?s.apply(this,a):(c("jQuery.fn."+d+"() is deprecated"),a.splice(0,0,d),arguments.length?this.on.apply(this,a):(this.triggerHandler.apply(this,a),this))}}),a(function(){a(document).triggerHandler("ready")}),a.event.special.ready={setup:function(){this===document&&c("'ready' event is deprecated")}},a.fn.extend({bind:function(a,b,d){return c("jQuery.fn.bind() is deprecated"),this.on(a,null,b,d)},unbind:function(a,b){return c("jQuery.fn.unbind() is deprecated"),this.off(a,null,b)},delegate:function(a,b,d,e){return c("jQuery.fn.delegate() is deprecated"),this.on(b,a,d,e)},undelegate:function(a,b,d){return c("jQuery.fn.undelegate() is deprecated"),1===arguments.length?this.off(a,"**"):this.off(b,a||"**",d)}});var u=a.fn.offset;a.fn.offset=function(){var b,d=this[0],e={top:0,left:0};return d&&d.nodeType?(b=(d.ownerDocument||document).documentElement,a.contains(b,d)?u.apply(this,arguments):(c("jQuery.fn.offset() requires an element connected to a document"),e)):(c("jQuery.fn.offset() requires a valid DOM element"),e)};var v=a.param;a.param=function(b,d){var e=a.ajaxSettings&&a.ajaxSettings.traditional;return void 0===d&&e&&(c("jQuery.param() no longer uses jQuery.ajaxSettings.traditional"),d=e),v.call(this,b,d)};var w=a.fn.andSelf||a.fn.addBack;a.fn.andSelf=function(){return c("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),w.apply(this,arguments)};var x=a.Deferred,y=[["resolve","done",a.Callbacks("once memory"),a.Callbacks("once memory"),"resolved"],["reject","fail",a.Callbacks("once memory"),a.Callbacks("once memory"),"rejected"],["notify","progress",a.Callbacks("memory"),a.Callbacks("memory")]];a.Deferred=function(b){var d=x(),e=d.promise();return d.pipe=e.pipe=function(){var b=arguments;return c("deferred.pipe() is deprecated"),a.Deferred(function(c){a.each(y,function(f,g){var h=a.isFunction(b[f])&&b[f];d[g[1]](function(){var b=h&&h.apply(this,arguments);b&&a.isFunction(b.promise)?b.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[g[0]+"With"](this===e?c.promise():this,h?[b]:arguments)})}),b=null}).promise()},b&&b.call(d,d),d}}(jQuery,window);
;(function($){var focused=true;$.flexslider=function(el,options){var slider=$(el);if(typeof options.rtl=='undefined'&&$('html').attr('dir')=='rtl'){options.rtl=true;}
slider.vars=$.extend({},$.flexslider.defaults,options);var namespace=slider.vars.namespace,msGesture=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,touch=(("ontouchstart"in window)||msGesture||window.DocumentTouch&&document instanceof DocumentTouch)&&slider.vars.touch,eventType="click touchend MSPointerUp keyup",watchedEvent="",watchedEventClearTimer,vertical=slider.vars.direction==="vertical",reverse=slider.vars.reverse,carousel=(slider.vars.itemWidth>0),fade=slider.vars.animation==="fade",asNav=slider.vars.asNavFor!=="",methods={};$.data(el,"flexslider",slider);methods={init:function(){slider.animating=false;slider.currentSlide=parseInt((slider.vars.startAt?slider.vars.startAt:0),10);if(isNaN(slider.currentSlide)){slider.currentSlide=0;}
slider.animatingTo=slider.currentSlide;slider.atEnd=(slider.currentSlide===0||slider.currentSlide===slider.last);slider.containerSelector=slider.vars.selector.substr(0,slider.vars.selector.search(' '));slider.slides=$(slider.vars.selector,slider);slider.container=$(slider.containerSelector,slider);slider.count=slider.slides.length;slider.syncExists=$(slider.vars.sync).length>0;if(slider.vars.animation==="slide"){slider.vars.animation="swing";}
slider.prop=(vertical)?"top":(slider.vars.rtl?"marginRight":"marginLeft");slider.args={};slider.manualPause=false;slider.stopped=false;slider.started=false;slider.startTimeout=null;slider.transitions=!slider.vars.video&&!fade&&slider.vars.useCSS&&(function(){var obj=document.createElement('div'),props=['perspectiveProperty','WebkitPerspective','MozPerspective','OPerspective','msPerspective'];for(var i in props){if(obj.style[props[i]]!==undefined){slider.pfx=props[i].replace('Perspective','').toLowerCase();slider.prop="-"+slider.pfx+"-transform";return true;}}
return false;}());slider.isFirefox=navigator.userAgent.toLowerCase().indexOf('firefox')>-1;slider.ensureAnimationEnd='';if(slider.vars.controlsContainer!=="")slider.controlsContainer=$(slider.vars.controlsContainer).length>0&&$(slider.vars.controlsContainer);if(slider.vars.manualControls!=="")slider.manualControls=$(slider.vars.manualControls).length>0&&$(slider.vars.manualControls);if(slider.vars.customDirectionNav!=="")slider.customDirectionNav=$(slider.vars.customDirectionNav).length===2&&$(slider.vars.customDirectionNav);if(slider.vars.randomize){slider.slides.sort(function(){return(Math.round(Math.random())-0.5);});slider.container.empty().append(slider.slides);}
slider.doMath();slider.setup("init");if(slider.vars.controlNav){methods.controlNav.setup();}
if(slider.vars.directionNav){methods.directionNav.setup();}
if(slider.vars.keyboard&&($(slider.containerSelector).length===1||slider.vars.multipleKeyboard)){$(document).bind('keyup',function(event){var keycode=event.keyCode;if(!slider.animating&&(keycode===39||keycode===37)){var target=(slider.vars.rtl?((keycode===37)?slider.getTarget('next'):(keycode===39)?slider.getTarget('prev'):false):((keycode===39)?slider.getTarget('next'):(keycode===37)?slider.getTarget('prev'):false));slider.flexAnimate(target,slider.vars.pauseOnAction);}});}
if(slider.vars.mousewheel){slider.bind('mousewheel',function(event,delta,deltaX,deltaY){event.preventDefault();var target=(delta<0)?slider.getTarget('next'):slider.getTarget('prev');slider.flexAnimate(target,slider.vars.pauseOnAction);});}
if(slider.vars.pausePlay){methods.pausePlay.setup();}
if(slider.vars.slideshow&&slider.vars.pauseInvisible){methods.pauseInvisible.init();}
if(slider.vars.slideshow){if(slider.vars.pauseOnHover){slider.hover(function(){if(!slider.manualPlay&&!slider.manualPause){slider.pause();}},function(){if(!slider.manualPause&&!slider.manualPlay&&!slider.stopped){slider.play();}});}
if(!slider.vars.pauseInvisible||!methods.pauseInvisible.isHidden()){(slider.vars.initDelay>0)?slider.startTimeout=setTimeout(slider.play,slider.vars.initDelay):slider.play();}}
if(asNav){methods.asNav.setup();}
if(touch&&slider.vars.touch){methods.touch();}
if(!fade||(fade&&slider.vars.smoothHeight)){$(window).bind("resize orientationchange focus",methods.resize);}
slider.find("img").attr("draggable","false");setTimeout(function(){slider.vars.start(slider);},200);},asNav:{setup:function(){slider.asNav=true;slider.animatingTo=Math.floor(slider.currentSlide/slider.move);slider.currentItem=slider.currentSlide;slider.slides.removeClass(namespace+"active-slide").eq(slider.currentItem).addClass(namespace+"active-slide");if(!msGesture){slider.slides.on(eventType,function(e){e.preventDefault();var $slide=$(this),target=$slide.index();var posFromX;if(slider.vars.rtl){posFromX=-1*($slide.offset().right-$(slider).scrollLeft());}
else
{posFromX=$slide.offset().left-$(slider).scrollLeft();}
if(posFromX<=0&&$slide.hasClass(namespace+'active-slide')){slider.flexAnimate(slider.getTarget("prev"),true);}else if(!$(slider.vars.asNavFor).data('flexslider').animating&&!$slide.hasClass(namespace+"active-slide")){slider.direction=(slider.currentItem<target)?"next":"prev";slider.flexAnimate(target,slider.vars.pauseOnAction,false,true,true);}});}else{el._slider=slider;slider.slides.each(function(){var that=this;that._gesture=new MSGesture();that._gesture.target=that;that.addEventListener("MSPointerDown",function(e){e.preventDefault();if(e.currentTarget._gesture){e.currentTarget._gesture.addPointer(e.pointerId);}},false);that.addEventListener("MSGestureTap",function(e){e.preventDefault();var $slide=$(this),target=$slide.index();if(!$(slider.vars.asNavFor).data('flexslider').animating&&!$slide.hasClass('active')){slider.direction=(slider.currentItem<target)?"next":"prev";slider.flexAnimate(target,slider.vars.pauseOnAction,false,true,true);}});});}}},controlNav:{setup:function(){if(!slider.manualControls){methods.controlNav.setupPaging();}else{methods.controlNav.setupManual();}},setupPaging:function(){var type=(slider.vars.controlNav==="thumbnails")?'control-thumbs':'control-paging',j=1,item,slide;slider.controlNavScaffold=$('<ol class="'+namespace+'control-nav '+namespace+type+'"></ol>');if(slider.pagingCount>1){for(var i=0;i<slider.pagingCount;i++){slide=slider.slides.eq(i);if(undefined===slide.attr('data-thumb-alt')){slide.attr('data-thumb-alt','');}
var altText=(''!==slide.attr('data-thumb-alt'))?altText=' alt="'+slide.attr('data-thumb-alt')+'"':'';item=(slider.vars.controlNav==="thumbnails")?'<img src="'+slide.attr('data-thumb')+'"'+altText+'/>':'<a href="#">'+j+'</a>';if('thumbnails'===slider.vars.controlNav&&true===slider.vars.thumbCaptions){var captn=slide.attr('data-thumbcaption');if(''!==captn&&undefined!==captn){item+='<span class="'+namespace+'caption">'+captn+'</span>';}}
slider.controlNavScaffold.append('<li>'+item+'</li>');j++;}}
(slider.controlsContainer)?$(slider.controlsContainer).append(slider.controlNavScaffold):slider.append(slider.controlNavScaffold);methods.controlNav.set();methods.controlNav.active();slider.controlNavScaffold.delegate('a, img',eventType,function(event){event.preventDefault();if(watchedEvent===""||watchedEvent===event.type){var $this=$(this),target=slider.controlNav.index($this);if(!$this.hasClass(namespace+'active')){slider.direction=(target>slider.currentSlide)?"next":"prev";slider.flexAnimate(target,slider.vars.pauseOnAction);}}
if(watchedEvent===""){watchedEvent=event.type;}
methods.setToClearWatchedEvent();});},setupManual:function(){slider.controlNav=slider.manualControls;methods.controlNav.active();slider.controlNav.bind(eventType,function(event){event.preventDefault();if(watchedEvent===""||watchedEvent===event.type){var $this=$(this),target=slider.controlNav.index($this);if(!$this.hasClass(namespace+'active')){(target>slider.currentSlide)?slider.direction="next":slider.direction="prev";slider.flexAnimate(target,slider.vars.pauseOnAction);}}
if(watchedEvent===""){watchedEvent=event.type;}
methods.setToClearWatchedEvent();});},set:function(){var selector=(slider.vars.controlNav==="thumbnails")?'img':'a';slider.controlNav=$('.'+namespace+'control-nav li '+selector,(slider.controlsContainer)?slider.controlsContainer:slider);},active:function(){slider.controlNav.removeClass(namespace+"active").eq(slider.animatingTo).addClass(namespace+"active");},update:function(action,pos){if(slider.pagingCount>1&&action==="add"){slider.controlNavScaffold.append($('<li><a href="#">'+slider.count+'</a></li>'));}else if(slider.pagingCount===1){slider.controlNavScaffold.find('li').remove();}else{slider.controlNav.eq(pos).closest('li').remove();}
methods.controlNav.set();(slider.pagingCount>1&&slider.pagingCount!==slider.controlNav.length)?slider.update(pos,action):methods.controlNav.active();}},directionNav:{setup:function(){var directionNavScaffold=$('<ul class="'+namespace+'direction-nav"><li class="'+namespace+'nav-prev"><a class="'+namespace+'prev" href="#">'+slider.vars.prevText+'</a></li><li class="'+namespace+'nav-next"><a class="'+namespace+'next" href="#">'+slider.vars.nextText+'</a></li></ul>');if(slider.customDirectionNav){slider.directionNav=slider.customDirectionNav;}else if(slider.controlsContainer){$(slider.controlsContainer).append(directionNavScaffold);slider.directionNav=$('.'+namespace+'direction-nav li a',slider.controlsContainer);}else{slider.append(directionNavScaffold);slider.directionNav=$('.'+namespace+'direction-nav li a',slider);}
methods.directionNav.update();slider.directionNav.bind(eventType,function(event){event.preventDefault();var target;if(watchedEvent===""||watchedEvent===event.type){target=($(this).hasClass(namespace+'next'))?slider.getTarget('next'):slider.getTarget('prev');slider.flexAnimate(target,slider.vars.pauseOnAction);}
if(watchedEvent===""){watchedEvent=event.type;}
methods.setToClearWatchedEvent();});},update:function(){var disabledClass=namespace+'disabled';if(slider.pagingCount===1){slider.directionNav.addClass(disabledClass).attr('tabindex','-1');}else if(!slider.vars.animationLoop){if(slider.animatingTo===0){slider.directionNav.removeClass(disabledClass).filter('.'+namespace+"prev").addClass(disabledClass).attr('tabindex','-1');}else if(slider.animatingTo===slider.last){slider.directionNav.removeClass(disabledClass).filter('.'+namespace+"next").addClass(disabledClass).attr('tabindex','-1');}else{slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');}}else{slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');}}},pausePlay:{setup:function(){var pausePlayScaffold=$('<div class="'+namespace+'pauseplay"><a href="#"></a></div>');if(slider.controlsContainer){slider.controlsContainer.append(pausePlayScaffold);slider.pausePlay=$('.'+namespace+'pauseplay a',slider.controlsContainer);}else{slider.append(pausePlayScaffold);slider.pausePlay=$('.'+namespace+'pauseplay a',slider);}
methods.pausePlay.update((slider.vars.slideshow)?namespace+'pause':namespace+'play');slider.pausePlay.bind(eventType,function(event){event.preventDefault();if(watchedEvent===""||watchedEvent===event.type){if($(this).hasClass(namespace+'pause')){slider.manualPause=true;slider.manualPlay=false;slider.pause();}else{slider.manualPause=false;slider.manualPlay=true;slider.play();}}
if(watchedEvent===""){watchedEvent=event.type;}
methods.setToClearWatchedEvent();});},update:function(state){(state==="play")?slider.pausePlay.removeClass(namespace+'pause').addClass(namespace+'play').html(slider.vars.playText):slider.pausePlay.removeClass(namespace+'play').addClass(namespace+'pause').html(slider.vars.pauseText);}},touch:function(){var startX,startY,offset,cwidth,dx,startT,onTouchStart,onTouchMove,onTouchEnd,scrolling=false,localX=0,localY=0,accDx=0;if(!msGesture){onTouchStart=function(e){if(slider.animating){e.preventDefault();}else if((window.navigator.msPointerEnabled)||e.touches.length===1){slider.pause();cwidth=(vertical)?slider.h:slider.w;startT=Number(new Date());localX=e.touches[0].pageX;localY=e.touches[0].pageY;offset=(carousel&&reverse&&slider.animatingTo===slider.last)?0:(carousel&&reverse)?slider.limit-(((slider.itemW+slider.vars.itemMargin)*slider.move)*slider.animatingTo):(carousel&&slider.currentSlide===slider.last)?slider.limit:(carousel)?((slider.itemW+slider.vars.itemMargin)*slider.move)*slider.currentSlide:(reverse)?(slider.last-slider.currentSlide+slider.cloneOffset)*cwidth:(slider.currentSlide+slider.cloneOffset)*cwidth;startX=(vertical)?localY:localX;startY=(vertical)?localX:localY;el.addEventListener('touchmove',onTouchMove,false);el.addEventListener('touchend',onTouchEnd,false);}};onTouchMove=function(e){localX=e.touches[0].pageX;localY=e.touches[0].pageY;dx=(vertical)?startX-localY:(slider.vars.rtl?-1:1)*(startX-localX);scrolling=(vertical)?(Math.abs(dx)<Math.abs(localX-startY)):(Math.abs(dx)<Math.abs(localY-startY));var fxms=500;if(!scrolling||Number(new Date())-startT>fxms){e.preventDefault();if(!fade&&slider.transitions){if(!slider.vars.animationLoop){dx=dx/((slider.currentSlide===0&&dx<0||slider.currentSlide===slider.last&&dx>0)?(Math.abs(dx)/cwidth+2):1);}
slider.setProps(offset+dx,"setTouch");}}};onTouchEnd=function(e){el.removeEventListener('touchmove',onTouchMove,false);if(slider.animatingTo===slider.currentSlide&&!scrolling&&!(dx===null)){var updateDx=(reverse)?-dx:dx,target=(updateDx>0)?slider.getTarget('next'):slider.getTarget('prev');if(slider.canAdvance(target)&&(Number(new Date())-startT<550&&Math.abs(updateDx)>50||Math.abs(updateDx)>cwidth/2)){slider.flexAnimate(target,slider.vars.pauseOnAction);}else{if(!fade){slider.flexAnimate(slider.currentSlide,slider.vars.pauseOnAction,true);}}}
el.removeEventListener('touchend',onTouchEnd,false);startX=null;startY=null;dx=null;offset=null;};el.addEventListener('touchstart',onTouchStart,false);}else{el.style.msTouchAction="none";el._gesture=new MSGesture();el._gesture.target=el;el.addEventListener("MSPointerDown",onMSPointerDown,false);el._slider=slider;el.addEventListener("MSGestureChange",onMSGestureChange,false);el.addEventListener("MSGestureEnd",onMSGestureEnd,false);function onMSPointerDown(e){e.stopPropagation();if(slider.animating){e.preventDefault();}else{slider.pause();el._gesture.addPointer(e.pointerId);accDx=0;cwidth=(vertical)?slider.h:slider.w;startT=Number(new Date());offset=(carousel&&reverse&&slider.animatingTo===slider.last)?0:(carousel&&reverse)?slider.limit-(((slider.itemW+slider.vars.itemMargin)*slider.move)*slider.animatingTo):(carousel&&slider.currentSlide===slider.last)?slider.limit:(carousel)?((slider.itemW+slider.vars.itemMargin)*slider.move)*slider.currentSlide:(reverse)?(slider.last-slider.currentSlide+slider.cloneOffset)*cwidth:(slider.currentSlide+slider.cloneOffset)*cwidth;}}
function onMSGestureChange(e){e.stopPropagation();var slider=e.target._slider;if(!slider){return;}
var transX=-e.translationX,transY=-e.translationY;accDx=accDx+((vertical)?transY:transX);dx=(slider.vars.rtl?-1:1)*accDx;scrolling=(vertical)?(Math.abs(accDx)<Math.abs(-transX)):(Math.abs(accDx)<Math.abs(-transY));if(e.detail===e.MSGESTURE_FLAG_INERTIA){setImmediate(function(){el._gesture.stop();});return;}
if(!scrolling||Number(new Date())-startT>500){e.preventDefault();if(!fade&&slider.transitions){if(!slider.vars.animationLoop){dx=accDx/((slider.currentSlide===0&&accDx<0||slider.currentSlide===slider.last&&accDx>0)?(Math.abs(accDx)/cwidth+2):1);}
slider.setProps(offset+dx,"setTouch");}}}
function onMSGestureEnd(e){e.stopPropagation();var slider=e.target._slider;if(!slider){return;}
if(slider.animatingTo===slider.currentSlide&&!scrolling&&!(dx===null)){var updateDx=(reverse)?-dx:dx,target=(updateDx>0)?slider.getTarget('next'):slider.getTarget('prev');if(slider.canAdvance(target)&&(Number(new Date())-startT<550&&Math.abs(updateDx)>50||Math.abs(updateDx)>cwidth/2)){slider.flexAnimate(target,slider.vars.pauseOnAction);}else{if(!fade){slider.flexAnimate(slider.currentSlide,slider.vars.pauseOnAction,true);}}}
startX=null;startY=null;dx=null;offset=null;accDx=0;}}},resize:function(){if(!slider.animating&&slider.is(':visible')){if(!carousel){slider.doMath();}
if(fade){methods.smoothHeight();}else if(carousel){slider.slides.width(slider.computedW);slider.update(slider.pagingCount);slider.setProps();}
else if(vertical){slider.viewport.height(slider.h);slider.setProps(slider.h,"setTotal");}else{if(slider.vars.smoothHeight){methods.smoothHeight();}
slider.newSlides.width(slider.computedW);slider.setProps(slider.computedW,"setTotal");}}},smoothHeight:function(dur){if(!vertical||fade){var $obj=(fade)?slider:slider.viewport;(dur)?$obj.animate({"height":slider.slides.eq(slider.animatingTo).innerHeight()},dur):$obj.innerHeight(slider.slides.eq(slider.animatingTo).innerHeight());}},sync:function(action){var $obj=$(slider.vars.sync).data("flexslider"),target=slider.animatingTo;switch(action){case"animate":$obj.flexAnimate(target,slider.vars.pauseOnAction,false,true);break;case"play":if(!$obj.playing&&!$obj.asNav){$obj.play();}break;case"pause":$obj.pause();break;}},uniqueID:function($clone){$clone.filter('[id]').add($clone.find('[id]')).each(function(){var $this=$(this);$this.attr('id',$this.attr('id')+'_clone');});return $clone;},pauseInvisible:{visProp:null,init:function(){var visProp=methods.pauseInvisible.getHiddenProp();if(visProp){var evtname=visProp.replace(/[H|h]idden/,'')+'visibilitychange';document.addEventListener(evtname,function(){if(methods.pauseInvisible.isHidden()){if(slider.startTimeout){clearTimeout(slider.startTimeout);}else{slider.pause();}}
else{if(slider.started){slider.play();}else{if(slider.vars.initDelay>0){setTimeout(slider.play,slider.vars.initDelay);}else{slider.play();}}}});}},isHidden:function(){var prop=methods.pauseInvisible.getHiddenProp();if(!prop){return false;}
return document[prop];},getHiddenProp:function(){var prefixes=['webkit','moz','ms','o'];if('hidden'in document){return'hidden';}
for(var i=0;i<prefixes.length;i++){if((prefixes[i]+'Hidden')in document){return prefixes[i]+'Hidden';}}
return null;}},setToClearWatchedEvent:function(){clearTimeout(watchedEventClearTimer);watchedEventClearTimer=setTimeout(function(){watchedEvent="";},3000);}};slider.flexAnimate=function(target,pause,override,withSync,fromNav){if(!slider.vars.animationLoop&&target!==slider.currentSlide){slider.direction=(target>slider.currentSlide)?"next":"prev";}
if(asNav&&slider.pagingCount===1)slider.direction=(slider.currentItem<target)?"next":"prev";if(!slider.animating&&(slider.canAdvance(target,fromNav)||override)&&slider.is(":visible")){if(asNav&&withSync){var master=$(slider.vars.asNavFor).data('flexslider');slider.atEnd=target===0||target===slider.count-1;master.flexAnimate(target,true,false,true,fromNav);slider.direction=(slider.currentItem<target)?"next":"prev";master.direction=slider.direction;if(Math.ceil((target+1)/slider.visible)-1!==slider.currentSlide&&target!==0){slider.currentItem=target;slider.slides.removeClass(namespace+"active-slide").eq(target).addClass(namespace+"active-slide");target=Math.floor(target/slider.visible);}else{slider.currentItem=target;slider.slides.removeClass(namespace+"active-slide").eq(target).addClass(namespace+"active-slide");return false;}}
slider.animating=true;slider.animatingTo=target;if(pause){slider.pause();}
slider.vars.before(slider);if(slider.syncExists&&!fromNav){methods.sync("animate");}
if(slider.vars.controlNav){methods.controlNav.active();}
if(!carousel){slider.slides.removeClass(namespace+'active-slide').eq(target).addClass(namespace+'active-slide');}
slider.atEnd=target===0||target===slider.last;if(slider.vars.directionNav){methods.directionNav.update();}
if(target===slider.last){slider.vars.end(slider);if(!slider.vars.animationLoop){slider.pause();}}
if(!fade){var dimension=(vertical)?slider.slides.filter(':first').height():slider.computedW,margin,slideString,calcNext;if(carousel){margin=slider.vars.itemMargin;calcNext=((slider.itemW+margin)*slider.move)*slider.animatingTo;slideString=(calcNext>slider.limit&&slider.visible!==1)?slider.limit:calcNext;}else if(slider.currentSlide===0&&target===slider.count-1&&slider.vars.animationLoop&&slider.direction!=="next"){slideString=(reverse)?(slider.count+slider.cloneOffset)*dimension:0;}else if(slider.currentSlide===slider.last&&target===0&&slider.vars.animationLoop&&slider.direction!=="prev"){slideString=(reverse)?0:(slider.count+1)*dimension;}else{slideString=(reverse)?((slider.count-1)-target+slider.cloneOffset)*dimension:(target+slider.cloneOffset)*dimension;}
slider.setProps(slideString,"",slider.vars.animationSpeed);if(slider.transitions){if(!slider.vars.animationLoop||!slider.atEnd){slider.animating=false;slider.currentSlide=slider.animatingTo;}
slider.container.unbind("webkitTransitionEnd transitionend");slider.container.bind("webkitTransitionEnd transitionend",function(){clearTimeout(slider.ensureAnimationEnd);slider.wrapup(dimension);});clearTimeout(slider.ensureAnimationEnd);slider.ensureAnimationEnd=setTimeout(function(){slider.wrapup(dimension);},slider.vars.animationSpeed+100);}else{slider.container.animate(slider.args,slider.vars.animationSpeed,slider.vars.easing,function(){slider.wrapup(dimension);});}}else{if(!touch){slider.slides.eq(slider.currentSlide).css({"zIndex":1}).animate({"opacity":0},slider.vars.animationSpeed,slider.vars.easing);slider.slides.eq(target).css({"zIndex":2}).animate({"opacity":1},slider.vars.animationSpeed,slider.vars.easing,slider.wrapup);}else{slider.slides.eq(slider.currentSlide).css({"opacity":0,"zIndex":1});slider.slides.eq(target).css({"opacity":1,"zIndex":2});slider.wrapup(dimension);}}
if(slider.vars.smoothHeight){methods.smoothHeight(slider.vars.animationSpeed);}}};slider.wrapup=function(dimension){if(!fade&&!carousel){if(slider.currentSlide===0&&slider.animatingTo===slider.last&&slider.vars.animationLoop){slider.setProps(dimension,"jumpEnd");}else if(slider.currentSlide===slider.last&&slider.animatingTo===0&&slider.vars.animationLoop){slider.setProps(dimension,"jumpStart");}}
slider.animating=false;slider.currentSlide=slider.animatingTo;slider.vars.after(slider);};slider.animateSlides=function(){if(!slider.animating&&focused){slider.flexAnimate(slider.getTarget("next"));}};slider.pause=function(){clearInterval(slider.animatedSlides);slider.animatedSlides=null;slider.playing=false;if(slider.vars.pausePlay){methods.pausePlay.update("play");}
if(slider.syncExists){methods.sync("pause");}};slider.play=function(){if(slider.playing){clearInterval(slider.animatedSlides);}
slider.animatedSlides=slider.animatedSlides||setInterval(slider.animateSlides,slider.vars.slideshowSpeed);slider.started=slider.playing=true;if(slider.vars.pausePlay){methods.pausePlay.update("pause");}
if(slider.syncExists){methods.sync("play");}};slider.stop=function(){slider.pause();slider.stopped=true;};slider.canAdvance=function(target,fromNav){var last=(asNav)?slider.pagingCount-1:slider.last;return(fromNav)?true:(asNav&&slider.currentItem===slider.count-1&&target===0&&slider.direction==="prev")?true:(asNav&&slider.currentItem===0&&target===slider.pagingCount-1&&slider.direction!=="next")?false:(target===slider.currentSlide&&!asNav)?false:(slider.vars.animationLoop)?true:(slider.atEnd&&slider.currentSlide===0&&target===last&&slider.direction!=="next")?false:(slider.atEnd&&slider.currentSlide===last&&target===0&&slider.direction==="next")?false:true;};slider.getTarget=function(dir){slider.direction=dir;if(dir==="next"){return(slider.currentSlide===slider.last)?0:slider.currentSlide+1;}else{return(slider.currentSlide===0)?slider.last:slider.currentSlide-1;}};slider.setProps=function(pos,special,dur){var target=(function(){var posCheck=(pos)?pos:((slider.itemW+slider.vars.itemMargin)*slider.move)*slider.animatingTo,posCalc=(function(){if(carousel){return(special==="setTouch")?pos:(reverse&&slider.animatingTo===slider.last)?0:(reverse)?slider.limit-(((slider.itemW+slider.vars.itemMargin)*slider.move)*slider.animatingTo):(slider.animatingTo===slider.last)?slider.limit:posCheck;}else{switch(special){case"setTotal":return(reverse)?((slider.count-1)-slider.currentSlide+slider.cloneOffset)*pos:(slider.currentSlide+slider.cloneOffset)*pos;case"setTouch":return(reverse)?pos:pos;case"jumpEnd":return(reverse)?pos:slider.count*pos;case"jumpStart":return(reverse)?slider.count*pos:pos;default:return pos;}}}());return(posCalc*((slider.vars.rtl)?1:-1))+"px";}());if(slider.transitions){if(slider.isFirefox){target=(vertical)?"translate3d(0,"+target+",0)":"translate3d("+(parseInt(target)+'px')+",0,0)";}else{target=(vertical)?"translate3d(0,"+target+",0)":"translate3d("+((slider.vars.rtl?-1:1)*parseInt(target)+'px')+",0,0)";}
dur=(dur!==undefined)?(dur/1000)+"s":"0s";slider.container.css("-"+slider.pfx+"-transition-duration",dur);slider.container.css("transition-duration",dur);}
slider.args[slider.prop]=target;if(slider.transitions||dur===undefined){slider.container.css(slider.args);}
slider.container.css('transform',target);};slider.setup=function(type){if(!fade){var sliderOffset,arr;if(type==="init"){slider.viewport=$('<div class="'+namespace+'viewport"></div>').css({"overflow":"hidden","position":"relative"}).appendTo(slider).append(slider.container);slider.cloneCount=0;slider.cloneOffset=0;if(reverse){arr=$.makeArray(slider.slides).reverse();slider.slides=$(arr);slider.container.empty().append(slider.slides);}}
if(slider.vars.animationLoop&&!carousel){slider.cloneCount=2;slider.cloneOffset=1;if(type!=="init"){slider.container.find('.clone').remove();}
slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden','true')).prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden','true'));}
slider.newSlides=$(slider.vars.selector,slider);sliderOffset=(reverse)?slider.count-1-slider.currentSlide+slider.cloneOffset:slider.currentSlide+slider.cloneOffset;if(vertical&&!carousel){slider.container.height((slider.count+slider.cloneCount)*200+"%").css("position","absolute").width("100%");setTimeout(function(){slider.newSlides.css({"display":"block"});slider.doMath();slider.viewport.height(slider.h);slider.setProps(sliderOffset*slider.h,"init");},(type==="init")?100:0);}else{slider.container.width((slider.count+slider.cloneCount)*200+"%");slider.setProps(sliderOffset*slider.computedW,"init");setTimeout(function(){slider.doMath();if(slider.vars.rtl){if(slider.isFirefox){slider.newSlides.css({"width":slider.computedW,"marginRight":slider.computedM,"float":"right","display":"block"});}else{slider.newSlides.css({"width":slider.computedW,"marginRight":slider.computedM,"float":"left","display":"block"});}}
else{slider.newSlides.css({"width":slider.computedW,"marginRight":slider.computedM,"float":"left","display":"block"});}
if(slider.vars.smoothHeight){methods.smoothHeight();}},(type==="init")?100:0);}}else{if(slider.vars.rtl){slider.slides.css({"width":"100%","float":'right',"marginLeft":"-100%","position":"relative"});}
else{slider.slides.css({"width":"100%","float":'left',"marginRight":"-100%","position":"relative"});}
if(type==="init"){if(!touch){if(slider.vars.fadeFirstSlide==false){slider.slides.css({"opacity":0,"display":"block","zIndex":1}).eq(slider.currentSlide).css({"zIndex":2}).css({"opacity":1});}else{slider.slides.css({"opacity":0,"display":"block","zIndex":1}).eq(slider.currentSlide).css({"zIndex":2}).animate({"opacity":1},slider.vars.animationSpeed,slider.vars.easing);}}else{slider.slides.css({"opacity":0,"display":"block","webkitTransition":"opacity "+slider.vars.animationSpeed/1000+"s ease","zIndex":1}).eq(slider.currentSlide).css({"opacity":1,"zIndex":2});}}
if(slider.vars.smoothHeight){methods.smoothHeight();}}
if(!carousel){slider.slides.removeClass(namespace+"active-slide").eq(slider.currentSlide).addClass(namespace+"active-slide");}
slider.vars.init(slider);};slider.doMath=function(){var slide=slider.slides.first(),slideMargin=slider.vars.itemMargin,minItems=slider.vars.minItems,maxItems=slider.vars.maxItems;slider.w=(slider.viewport===undefined)?slider.width():slider.viewport.width();if(slider.isFirefox){slider.w=slider.width();}
slider.h=slide.height();slider.boxPadding=slide.outerWidth()-slide.width();if(carousel){slider.itemT=slider.vars.itemWidth+slideMargin;slider.itemM=slideMargin;slider.minW=(minItems)?minItems*slider.itemT:slider.w;slider.maxW=(maxItems)?(maxItems*slider.itemT)-slideMargin:slider.w;slider.itemW=(slider.minW>slider.w)?(slider.w-(slideMargin*(minItems-1)))/minItems:(slider.maxW<slider.w)?(slider.w-(slideMargin*(maxItems-1)))/maxItems:(slider.vars.itemWidth>slider.w)?slider.w:slider.vars.itemWidth;slider.visible=Math.floor(slider.w/(slider.itemW));slider.move=(slider.vars.move>0&&slider.vars.move<slider.visible)?slider.vars.move:slider.visible;slider.pagingCount=Math.ceil(((slider.count-slider.visible)/slider.move)+1);slider.last=slider.pagingCount-1;slider.limit=(slider.pagingCount===1)?0:(slider.vars.itemWidth>slider.w)?(slider.itemW*(slider.count-1))+(slideMargin*(slider.count-1)):((slider.itemW+slideMargin)*slider.count)-slider.w-slideMargin;}else{slider.itemW=slider.w;slider.itemM=slideMargin;slider.pagingCount=slider.count;slider.last=slider.count-1;}
slider.computedW=slider.itemW-slider.boxPadding;slider.computedM=slider.itemM;};slider.update=function(pos,action){slider.doMath();if(!carousel){if(pos<slider.currentSlide){slider.currentSlide+=1;}else if(pos<=slider.currentSlide&&pos!==0){slider.currentSlide-=1;}
slider.animatingTo=slider.currentSlide;}
if(slider.vars.controlNav&&!slider.manualControls){if((action==="add"&&!carousel)||slider.pagingCount>slider.controlNav.length){methods.controlNav.update("add");}else if((action==="remove"&&!carousel)||slider.pagingCount<slider.controlNav.length){if(carousel&&slider.currentSlide>slider.last){slider.currentSlide-=1;slider.animatingTo-=1;}
methods.controlNav.update("remove",slider.last);}}
if(slider.vars.directionNav){methods.directionNav.update();}};slider.addSlide=function(obj,pos){var $obj=$(obj);slider.count+=1;slider.last=slider.count-1;if(vertical&&reverse){(pos!==undefined)?slider.slides.eq(slider.count-pos).after($obj):slider.container.prepend($obj);}else{(pos!==undefined)?slider.slides.eq(pos).before($obj):slider.container.append($obj);}
slider.update(pos,"add");slider.slides=$(slider.vars.selector+':not(.clone)',slider);slider.setup();slider.vars.added(slider);};slider.removeSlide=function(obj){var pos=(isNaN(obj))?slider.slides.index($(obj)):obj;slider.count-=1;slider.last=slider.count-1;if(isNaN(obj)){$(obj,slider.slides).remove();}else{(vertical&&reverse)?slider.slides.eq(slider.last).remove():slider.slides.eq(obj).remove();}
slider.doMath();slider.update(pos,"remove");slider.slides=$(slider.vars.selector+':not(.clone)',slider);slider.setup();slider.vars.removed(slider);};methods.init();};$(window).blur(function(e){focused=false;}).focus(function(e){focused=true;});$.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:false,animationLoop:true,smoothHeight:false,startAt:0,slideshow:true,slideshowSpeed:7000,animationSpeed:600,initDelay:0,randomize:false,fadeFirstSlide:true,thumbCaptions:false,pauseOnAction:true,pauseOnHover:false,pauseInvisible:true,useCSS:true,touch:true,video:false,controlNav:true,directionNav:true,prevText:"Previous",nextText:"Next",keyboard:true,multipleKeyboard:false,mousewheel:false,pausePlay:false,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",customDirectionNav:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:true,isFirefox:false,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){},rtl:false};$.fn.flexslider=function(options){if(options===undefined){options={};}
if(typeof options==="object"){return this.each(function(){var $this=$(this),selector=(options.selector)?options.selector:".slides > li",$slides=$this.find(selector);if(($slides.length===1&&options.allowOneSlide===false)||$slides.length===0){$slides.fadeIn(400);if(options.start){options.start($this);}}else if($this.data('flexslider')===undefined){new $.flexslider(this,options);}});}else{var $slider=$(this).data('flexslider');switch(options){case"play":$slider.play();break;case"pause":$slider.pause();break;case"stop":$slider.stop();break;case"next":$slider.flexAnimate($slider.getTarget("next"),true);break;case"prev":case"previous":$slider.flexAnimate($slider.getTarget("prev"),true);break;default:if(typeof options==="number"){$slider.flexAnimate(options,true);}}}};})(jQuery);
(function(e,t){'object'==typeof exports&&'undefined'!=typeof module?module.exports=t():'function'==typeof define&&define.amd?define(t):e.Popper=t()})(this,function(){'use strict';function e(e){return e&&'[object Function]'==={}.toString.call(e)}function t(e,t){if(1!==e.nodeType)return[];var o=e.ownerDocument.defaultView,n=o.getComputedStyle(e,null);return t?n[t]:n}function o(e){return'HTML'===e.nodeName?e:e.parentNode||e.host}function n(e){if(!e)return document.body;switch(e.nodeName){case'HTML':case'BODY':return e.ownerDocument.body;case'#document':return e.body;}var i=t(e),r=i.overflow,p=i.overflowX,s=i.overflowY;return /(auto|scroll|overlay)/.test(r+s+p)?e:n(o(e))}function r(e){return 11===e?pe:10===e?se:pe||se}function p(e){if(!e)return document.documentElement;for(var o=r(10)?document.body:null,n=e.offsetParent||null;n===o&&e.nextElementSibling;)n=(e=e.nextElementSibling).offsetParent;var i=n&&n.nodeName;return i&&'BODY'!==i&&'HTML'!==i?-1!==['TH','TD','TABLE'].indexOf(n.nodeName)&&'static'===t(n,'position')?p(n):n:e?e.ownerDocument.documentElement:document.documentElement}function s(e){var t=e.nodeName;return'BODY'!==t&&('HTML'===t||p(e.firstElementChild)===e)}function d(e){return null===e.parentNode?e:d(e.parentNode)}function a(e,t){if(!e||!e.nodeType||!t||!t.nodeType)return document.documentElement;var o=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,n=o?e:t,i=o?t:e,r=document.createRange();r.setStart(n,0),r.setEnd(i,0);var l=r.commonAncestorContainer;if(e!==l&&t!==l||n.contains(i))return s(l)?l:p(l);var f=d(e);return f.host?a(f.host,t):a(e,d(t).host)}function l(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:'top',o='top'===t?'scrollTop':'scrollLeft',n=e.nodeName;if('BODY'===n||'HTML'===n){var i=e.ownerDocument.documentElement,r=e.ownerDocument.scrollingElement||i;return r[o]}return e[o]}function f(e,t){var o=2<arguments.length&&void 0!==arguments[2]&&arguments[2],n=l(t,'top'),i=l(t,'left'),r=o?-1:1;return e.top+=n*r,e.bottom+=n*r,e.left+=i*r,e.right+=i*r,e}function m(e,t){var o='x'===t?'Left':'Top',n='Left'==o?'Right':'Bottom';return parseFloat(e['border'+o+'Width'],10)+parseFloat(e['border'+n+'Width'],10)}function h(e,t,o,n){return ee(t['offset'+e],t['scroll'+e],o['client'+e],o['offset'+e],o['scroll'+e],r(10)?parseInt(o['offset'+e])+parseInt(n['margin'+('Height'===e?'Top':'Left')])+parseInt(n['margin'+('Height'===e?'Bottom':'Right')]):0)}function c(e){var t=e.body,o=e.documentElement,n=r(10)&&getComputedStyle(o);return{height:h('Height',t,o,n),width:h('Width',t,o,n)}}function g(e){return fe({},e,{right:e.left+e.width,bottom:e.top+e.height})}function u(e){var o={};try{if(r(10)){o=e.getBoundingClientRect();var n=l(e,'top'),i=l(e,'left');o.top+=n,o.left+=i,o.bottom+=n,o.right+=i}else o=e.getBoundingClientRect()}catch(t){}var p={left:o.left,top:o.top,width:o.right-o.left,height:o.bottom-o.top},s='HTML'===e.nodeName?c(e.ownerDocument):{},d=s.width||e.clientWidth||p.right-p.left,a=s.height||e.clientHeight||p.bottom-p.top,f=e.offsetWidth-d,h=e.offsetHeight-a;if(f||h){var u=t(e);f-=m(u,'x'),h-=m(u,'y'),p.width-=f,p.height-=h}return g(p)}function b(e,o){var i=2<arguments.length&&void 0!==arguments[2]&&arguments[2],p=r(10),s='HTML'===o.nodeName,d=u(e),a=u(o),l=n(e),m=t(o),h=parseFloat(m.borderTopWidth,10),c=parseFloat(m.borderLeftWidth,10);i&&s&&(a.top=ee(a.top,0),a.left=ee(a.left,0));var b=g({top:d.top-a.top-h,left:d.left-a.left-c,width:d.width,height:d.height});if(b.marginTop=0,b.marginLeft=0,!p&&s){var w=parseFloat(m.marginTop,10),y=parseFloat(m.marginLeft,10);b.top-=h-w,b.bottom-=h-w,b.left-=c-y,b.right-=c-y,b.marginTop=w,b.marginLeft=y}return(p&&!i?o.contains(l):o===l&&'BODY'!==l.nodeName)&&(b=f(b,o)),b}function w(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],o=e.ownerDocument.documentElement,n=b(e,o),i=ee(o.clientWidth,window.innerWidth||0),r=ee(o.clientHeight,window.innerHeight||0),p=t?0:l(o),s=t?0:l(o,'left'),d={top:p-n.top+n.marginTop,left:s-n.left+n.marginLeft,width:i,height:r};return g(d)}function y(e){var n=e.nodeName;if('BODY'===n||'HTML'===n)return!1;if('fixed'===t(e,'position'))return!0;var i=o(e);return!!i&&y(i)}function E(e){if(!e||!e.parentElement||r())return document.documentElement;for(var o=e.parentElement;o&&'none'===t(o,'transform');)o=o.parentElement;return o||document.documentElement}function v(e,t,i,r){var p=4<arguments.length&&void 0!==arguments[4]&&arguments[4],s={top:0,left:0},d=p?E(e):a(e,t);if('viewport'===r)s=w(d,p);else{var l;'scrollParent'===r?(l=n(o(t)),'BODY'===l.nodeName&&(l=e.ownerDocument.documentElement)):'window'===r?l=e.ownerDocument.documentElement:l=r;var f=b(l,d,p);if('HTML'===l.nodeName&&!y(d)){var m=c(e.ownerDocument),h=m.height,g=m.width;s.top+=f.top-f.marginTop,s.bottom=h+f.top,s.left+=f.left-f.marginLeft,s.right=g+f.left}else s=f}i=i||0;var u='number'==typeof i;return s.left+=u?i:i.left||0,s.top+=u?i:i.top||0,s.right-=u?i:i.right||0,s.bottom-=u?i:i.bottom||0,s}function x(e){var t=e.width,o=e.height;return t*o}function O(e,t,o,n,i){var r=5<arguments.length&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf('auto'))return e;var p=v(o,n,r,i),s={top:{width:p.width,height:t.top-p.top},right:{width:p.right-t.right,height:p.height},bottom:{width:p.width,height:p.bottom-t.bottom},left:{width:t.left-p.left,height:p.height}},d=Object.keys(s).map(function(e){return fe({key:e},s[e],{area:x(s[e])})}).sort(function(e,t){return t.area-e.area}),a=d.filter(function(e){var t=e.width,n=e.height;return t>=o.clientWidth&&n>=o.clientHeight}),l=0<a.length?a[0].key:d[0].key,f=e.split('-')[1];return l+(f?'-'+f:'')}function L(e,t,o){var n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null,i=n?E(t):a(t,o);return b(o,i,n)}function S(e){var t=e.ownerDocument.defaultView,o=t.getComputedStyle(e),n=parseFloat(o.marginTop||0)+parseFloat(o.marginBottom||0),i=parseFloat(o.marginLeft||0)+parseFloat(o.marginRight||0),r={width:e.offsetWidth+i,height:e.offsetHeight+n};return r}function T(e){var t={left:'right',right:'left',bottom:'top',top:'bottom'};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function D(e,t,o){o=o.split('-')[0];var n=S(e),i={width:n.width,height:n.height},r=-1!==['right','left'].indexOf(o),p=r?'top':'left',s=r?'left':'top',d=r?'height':'width',a=r?'width':'height';return i[p]=t[p]+t[d]/2-n[d]/2,i[s]=o===s?t[s]-n[a]:t[T(s)],i}function C(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function N(e,t,o){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===o});var n=C(e,function(e){return e[t]===o});return e.indexOf(n)}function P(t,o,n){var i=void 0===n?t:t.slice(0,N(t,'name',n));return i.forEach(function(t){t['function']&&console.warn('`modifier.function` is deprecated, use `modifier.fn`!');var n=t['function']||t.fn;t.enabled&&e(n)&&(o.offsets.popper=g(o.offsets.popper),o.offsets.reference=g(o.offsets.reference),o=n(o,t))}),o}function k(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=L(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=O(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=D(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?'fixed':'absolute',e=P(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function W(e,t){return e.some(function(e){var o=e.name,n=e.enabled;return n&&o===t})}function H(e){for(var t=[!1,'ms','Webkit','Moz','O'],o=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<t.length;n++){var i=t[n],r=i?''+i+o:e;if('undefined'!=typeof document.body.style[r])return r}return null}function B(){return this.state.isDestroyed=!0,W(this.modifiers,'applyStyle')&&(this.popper.removeAttribute('x-placement'),this.popper.style.position='',this.popper.style.top='',this.popper.style.left='',this.popper.style.right='',this.popper.style.bottom='',this.popper.style.willChange='',this.popper.style[H('transform')]=''),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function A(e){var t=e.ownerDocument;return t?t.defaultView:window}function M(e,t,o,i){var r='BODY'===e.nodeName,p=r?e.ownerDocument.defaultView:e;p.addEventListener(t,o,{passive:!0}),r||M(n(p.parentNode),t,o,i),i.push(p)}function F(e,t,o,i){o.updateBound=i,A(e).addEventListener('resize',o.updateBound,{passive:!0});var r=n(e);return M(r,'scroll',o.updateBound,o.scrollParents),o.scrollElement=r,o.eventsEnabled=!0,o}function I(){this.state.eventsEnabled||(this.state=F(this.reference,this.options,this.state,this.scheduleUpdate))}function R(e,t){return A(e).removeEventListener('resize',t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener('scroll',t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function U(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=R(this.reference,this.state))}function Y(e){return''!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function j(e,t){Object.keys(t).forEach(function(o){var n='';-1!==['width','height','top','right','bottom','left'].indexOf(o)&&Y(t[o])&&(n='px'),e.style[o]=t[o]+n})}function V(e,t){Object.keys(t).forEach(function(o){var n=t[o];!1===n?e.removeAttribute(o):e.setAttribute(o,t[o])})}function q(e,t){var o=e.offsets,n=o.popper,i=o.reference,r=$,p=function(e){return e},s=r(i.width),d=r(n.width),a=-1!==['left','right'].indexOf(e.placement),l=-1!==e.placement.indexOf('-'),f=t?a||l||s%2==d%2?r:Z:p,m=t?r:p;return{left:f(1==s%2&&1==d%2&&!l&&t?n.left-1:n.left),top:m(n.top),bottom:m(n.bottom),right:f(n.right)}}function K(e,t,o){var n=C(e,function(e){var o=e.name;return o===t}),i=!!n&&e.some(function(e){return e.name===o&&e.enabled&&e.order<n.order});if(!i){var r='`'+t+'`';console.warn('`'+o+'`'+' modifier is required by '+r+' modifier in order to work, be sure to include it before '+r+'!')}return i}function z(e){return'end'===e?'start':'start'===e?'end':e}function G(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],o=ce.indexOf(e),n=ce.slice(o+1).concat(ce.slice(0,o));return t?n.reverse():n}function _(e,t,o,n){var i=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+i[1],p=i[2];if(!r)return e;if(0===p.indexOf('%')){var s;switch(p){case'%p':s=o;break;case'%':case'%r':default:s=n;}var d=g(s);return d[t]/100*r}if('vh'===p||'vw'===p){var a;return a='vh'===p?ee(document.documentElement.clientHeight,window.innerHeight||0):ee(document.documentElement.clientWidth,window.innerWidth||0),a/100*r}return r}function X(e,t,o,n){var i=[0,0],r=-1!==['right','left'].indexOf(n),p=e.split(/(\+|\-)/).map(function(e){return e.trim()}),s=p.indexOf(C(p,function(e){return-1!==e.search(/,|\s/)}));p[s]&&-1===p[s].indexOf(',')&&console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');var d=/\s*,\s*|\s+/,a=-1===s?[p]:[p.slice(0,s).concat([p[s].split(d)[0]]),[p[s].split(d)[1]].concat(p.slice(s+1))];return a=a.map(function(e,n){var i=(1===n?!r:r)?'height':'width',p=!1;return e.reduce(function(e,t){return''===e[e.length-1]&&-1!==['+','-'].indexOf(t)?(e[e.length-1]=t,p=!0,e):p?(e[e.length-1]+=t,p=!1,e):e.concat(t)},[]).map(function(e){return _(e,i,t,o)})}),a.forEach(function(e,t){e.forEach(function(o,n){Y(o)&&(i[t]+=o*('-'===e[n-1]?-1:1))})}),i}function J(e,t){var o,n=t.offset,i=e.placement,r=e.offsets,p=r.popper,s=r.reference,d=i.split('-')[0];return o=Y(+n)?[+n,0]:X(n,p,s,d),'left'===d?(p.top+=o[0],p.left-=o[1]):'right'===d?(p.top+=o[0],p.left+=o[1]):'top'===d?(p.left+=o[0],p.top-=o[1]):'bottom'===d&&(p.left+=o[0],p.top+=o[1]),e.popper=p,e}for(var Q=Math.min,Z=Math.floor,$=Math.round,ee=Math.max,te='undefined'!=typeof window&&'undefined'!=typeof document,oe=['Edge','Trident','Firefox'],ne=0,ie=0;ie<oe.length;ie+=1)if(te&&0<=navigator.userAgent.indexOf(oe[ie])){ne=1;break}var i=te&&window.Promise,re=i?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then(function(){t=!1,e()}))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},ne))}},pe=te&&!!(window.MSInputMethodContext&&document.documentMode),se=te&&/MSIE 10/.test(navigator.userAgent),de=function(e,t){if(!(e instanceof t))throw new TypeError('Cannot call a class as a function')},ae=function(){function e(e,t){for(var o,n=0;n<t.length;n++)o=t[n],o.enumerable=o.enumerable||!1,o.configurable=!0,'value'in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),le=function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e},fe=Object.assign||function(e){for(var t,o=1;o<arguments.length;o++)for(var n in t=arguments[o],t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},me=te&&/Firefox/i.test(navigator.userAgent),he=['auto-start','auto','auto-end','top-start','top','top-end','right-start','right','right-end','bottom-end','bottom','bottom-start','left-end','left','left-start'],ce=he.slice(3),ge={FLIP:'flip',CLOCKWISE:'clockwise',COUNTERCLOCKWISE:'counterclockwise'},ue=function(){function t(o,n){var i=this,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};de(this,t),this.scheduleUpdate=function(){return requestAnimationFrame(i.update)},this.update=re(this.update.bind(this)),this.options=fe({},t.Defaults,r),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=o&&o.jquery?o[0]:o,this.popper=n&&n.jquery?n[0]:n,this.options.modifiers={},Object.keys(fe({},t.Defaults.modifiers,r.modifiers)).forEach(function(e){i.options.modifiers[e]=fe({},t.Defaults.modifiers[e]||{},r.modifiers?r.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return fe({name:e},i.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(t){t.enabled&&e(t.onLoad)&&t.onLoad(i.reference,i.popper,i.options,t,i.state)}),this.update();var p=this.options.eventsEnabled;p&&this.enableEventListeners(),this.state.eventsEnabled=p}return ae(t,[{key:'update',value:function(){return k.call(this)}},{key:'destroy',value:function(){return B.call(this)}},{key:'enableEventListeners',value:function(){return I.call(this)}},{key:'disableEventListeners',value:function(){return U.call(this)}}]),t}();return ue.Utils=('undefined'==typeof window?global:window).PopperUtils,ue.placements=he,ue.Defaults={placement:'bottom',positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,o=t.split('-')[0],n=t.split('-')[1];if(n){var i=e.offsets,r=i.reference,p=i.popper,s=-1!==['bottom','top'].indexOf(o),d=s?'left':'top',a=s?'width':'height',l={start:le({},d,r[d]),end:le({},d,r[d]+r[a]-p[a])};e.offsets.popper=fe({},p,l[n])}return e}},offset:{order:200,enabled:!0,fn:J,offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var o=t.boundariesElement||p(e.instance.popper);e.instance.reference===o&&(o=p(o));var n=H('transform'),i=e.instance.popper.style,r=i.top,s=i.left,d=i[n];i.top='',i.left='',i[n]='';var a=v(e.instance.popper,e.instance.reference,t.padding,o,e.positionFixed);i.top=r,i.left=s,i[n]=d,t.boundaries=a;var l=t.priority,f=e.offsets.popper,m={primary:function(e){var o=f[e];return f[e]<a[e]&&!t.escapeWithReference&&(o=ee(f[e],a[e])),le({},e,o)},secondary:function(e){var o='right'===e?'left':'top',n=f[o];return f[e]>a[e]&&!t.escapeWithReference&&(n=Q(f[o],a[e]-('right'===e?f.width:f.height))),le({},o,n)}};return l.forEach(function(e){var t=-1===['left','top'].indexOf(e)?'secondary':'primary';f=fe({},f,m[t](e))}),e.offsets.popper=f,e},priority:['left','right','top','bottom'],padding:5,boundariesElement:'scrollParent'},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,o=t.popper,n=t.reference,i=e.placement.split('-')[0],r=Z,p=-1!==['top','bottom'].indexOf(i),s=p?'right':'bottom',d=p?'left':'top',a=p?'width':'height';return o[s]<r(n[d])&&(e.offsets.popper[d]=r(n[d])-o[a]),o[d]>r(n[s])&&(e.offsets.popper[d]=r(n[s])),e}},arrow:{order:500,enabled:!0,fn:function(e,o){var n;if(!K(e.instance.modifiers,'arrow','keepTogether'))return e;var i=o.element;if('string'==typeof i){if(i=e.instance.popper.querySelector(i),!i)return e;}else if(!e.instance.popper.contains(i))return console.warn('WARNING: `arrow.element` must be child of its popper element!'),e;var r=e.placement.split('-')[0],p=e.offsets,s=p.popper,d=p.reference,a=-1!==['left','right'].indexOf(r),l=a?'height':'width',f=a?'Top':'Left',m=f.toLowerCase(),h=a?'left':'top',c=a?'bottom':'right',u=S(i)[l];d[c]-u<s[m]&&(e.offsets.popper[m]-=s[m]-(d[c]-u)),d[m]+u>s[c]&&(e.offsets.popper[m]+=d[m]+u-s[c]),e.offsets.popper=g(e.offsets.popper);var b=d[m]+d[l]/2-u/2,w=t(e.instance.popper),y=parseFloat(w['margin'+f],10),E=parseFloat(w['border'+f+'Width'],10),v=b-e.offsets.popper[m]-y-E;return v=ee(Q(s[l]-u,v),0),e.arrowElement=i,e.offsets.arrow=(n={},le(n,m,$(v)),le(n,h,''),n),e},element:'[x-arrow]'},flip:{order:600,enabled:!0,fn:function(e,t){if(W(e.instance.modifiers,'inner'))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var o=v(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement,e.positionFixed),n=e.placement.split('-')[0],i=T(n),r=e.placement.split('-')[1]||'',p=[];switch(t.behavior){case ge.FLIP:p=[n,i];break;case ge.CLOCKWISE:p=G(n);break;case ge.COUNTERCLOCKWISE:p=G(n,!0);break;default:p=t.behavior;}return p.forEach(function(s,d){if(n!==s||p.length===d+1)return e;n=e.placement.split('-')[0],i=T(n);var a=e.offsets.popper,l=e.offsets.reference,f=Z,m='left'===n&&f(a.right)>f(l.left)||'right'===n&&f(a.left)<f(l.right)||'top'===n&&f(a.bottom)>f(l.top)||'bottom'===n&&f(a.top)<f(l.bottom),h=f(a.left)<f(o.left),c=f(a.right)>f(o.right),g=f(a.top)<f(o.top),u=f(a.bottom)>f(o.bottom),b='left'===n&&h||'right'===n&&c||'top'===n&&g||'bottom'===n&&u,w=-1!==['top','bottom'].indexOf(n),y=!!t.flipVariations&&(w&&'start'===r&&h||w&&'end'===r&&c||!w&&'start'===r&&g||!w&&'end'===r&&u);(m||b||y)&&(e.flipped=!0,(m||b)&&(n=p[d+1]),y&&(r=z(r)),e.placement=n+(r?'-'+r:''),e.offsets.popper=fe({},e.offsets.popper,D(e.instance.popper,e.offsets.reference,e.placement)),e=P(e.instance.modifiers,e,'flip'))}),e},behavior:'flip',padding:5,boundariesElement:'viewport'},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,o=t.split('-')[0],n=e.offsets,i=n.popper,r=n.reference,p=-1!==['left','right'].indexOf(o),s=-1===['top','left'].indexOf(o);return i[p?'left':'top']=r[o]-(s?i[p?'width':'height']:0),e.placement=T(t),e.offsets.popper=g(i),e}},hide:{order:800,enabled:!0,fn:function(e){if(!K(e.instance.modifiers,'hide','preventOverflow'))return e;var t=e.offsets.reference,o=C(e.instance.modifiers,function(e){return'preventOverflow'===e.name}).boundaries;if(t.bottom<o.top||t.left>o.right||t.top>o.bottom||t.right<o.left){if(!0===e.hide)return e;e.hide=!0,e.attributes['x-out-of-boundaries']=''}else{if(!1===e.hide)return e;e.hide=!1,e.attributes['x-out-of-boundaries']=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var o=t.x,n=t.y,i=e.offsets.popper,r=C(e.instance.modifiers,function(e){return'applyStyle'===e.name}).gpuAcceleration;void 0!==r&&console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');var s,d,a=void 0===r?t.gpuAcceleration:r,l=p(e.instance.popper),f=u(l),m={position:i.position},h=q(e,2>window.devicePixelRatio||!me),c='bottom'===o?'top':'bottom',g='right'===n?'left':'right',b=H('transform');if(d='bottom'==c?'HTML'===l.nodeName?-l.clientHeight+h.bottom:-f.height+h.bottom:h.top,s='right'==g?'HTML'===l.nodeName?-l.clientWidth+h.right:-f.width+h.right:h.left,a&&b)m[b]='translate3d('+s+'px, '+d+'px, 0)',m[c]=0,m[g]=0,m.willChange='transform';else{var w='bottom'==c?-1:1,y='right'==g?-1:1;m[c]=d*w,m[g]=s*y,m.willChange=c+', '+g}var E={"x-placement":e.placement};return e.attributes=fe({},E,e.attributes),e.styles=fe({},m,e.styles),e.arrowStyles=fe({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:'bottom',y:'right'},applyStyle:{order:900,enabled:!0,fn:function(e){return j(e.instance.popper,e.styles),V(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&j(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,o,n,i){var r=L(i,t,e,o.positionFixed),p=O(o.placement,r,t,e,o.modifiers.flip.boundariesElement,o.modifiers.flip.padding);return t.setAttribute('x-placement',p),j(t,{position:o.positionFixed?'fixed':'absolute'}),o},gpuAcceleration:void 0}}},ue});
/*!
  * Bootstrap v4.3.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function(global,factory){typeof exports==='object'&&typeof module!=='undefined'?factory(exports,require('jquery')):typeof define==='function'&&define.amd?define(['exports','jquery'],factory):(global=global||self,factory(global.bootstrap={},global.jQuery));}(this,function(exports,$){'use strict';$=$&&$.hasOwnProperty('default')?$['default']:$;function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}
function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}
function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}
return obj;}
function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};var ownKeys=Object.keys(source);if(typeof Object.getOwnPropertySymbols==='function'){ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable;}));}
ownKeys.forEach(function(key){_defineProperty(target,key,source[key]);});}
return target;}
function _inheritsLoose(subClass,superClass){subClass.prototype=Object.create(superClass.prototype);subClass.prototype.constructor=subClass;subClass.__proto__=superClass;}
var TRANSITION_END='transitionend';var MAX_UID=1000000;var MILLISECONDS_MULTIPLIER=1000;function toType(obj){return{}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();}
function getSpecialTransitionEndEvent(){return{bindType:TRANSITION_END,delegateType:TRANSITION_END,handle:function handle(event){if($(event.target).is(this)){return event.handleObj.handler.apply(this,arguments);}
return undefined;}};}
function transitionEndEmulator(duration){var _this=this;var called=false;$(this).one(Util.TRANSITION_END,function(){called=true;});setTimeout(function(){if(!called){Util.triggerTransitionEnd(_this);}},duration);return this;}
function setTransitionEndSupport(){$.fn.emulateTransitionEnd=transitionEndEmulator;$.event.special[Util.TRANSITION_END]=getSpecialTransitionEndEvent();}
var Util={TRANSITION_END:'bsTransitionEnd',getUID:function getUID(prefix){do{prefix+=~~(Math.random()*MAX_UID);}while(document.getElementById(prefix));return prefix;},getSelectorFromElement:function getSelectorFromElement(element){var selector=element.getAttribute('data-target');if(!selector||selector==='#'){var hrefAttr=element.getAttribute('href');selector=hrefAttr&&hrefAttr!=='#'?hrefAttr.trim():'';}
try{return document.querySelector(selector)?selector:null;}catch(err){return null;}},getTransitionDurationFromElement:function getTransitionDurationFromElement(element){if(!element){return 0;}
var transitionDuration=$(element).css('transition-duration');var transitionDelay=$(element).css('transition-delay');var floatTransitionDuration=parseFloat(transitionDuration);var floatTransitionDelay=parseFloat(transitionDelay);if(!floatTransitionDuration&&!floatTransitionDelay){return 0;}
transitionDuration=transitionDuration.split(',')[0];transitionDelay=transitionDelay.split(',')[0];return(parseFloat(transitionDuration)+parseFloat(transitionDelay))*MILLISECONDS_MULTIPLIER;},reflow:function reflow(element){return element.offsetHeight;},triggerTransitionEnd:function triggerTransitionEnd(element){$(element).trigger(TRANSITION_END);},supportsTransitionEnd:function supportsTransitionEnd(){return Boolean(TRANSITION_END);},isElement:function isElement(obj){return(obj[0]||obj).nodeType;},typeCheckConfig:function typeCheckConfig(componentName,config,configTypes){for(var property in configTypes){if(Object.prototype.hasOwnProperty.call(configTypes,property)){var expectedTypes=configTypes[property];var value=config[property];var valueType=value&&Util.isElement(value)?'element':toType(value);if(!new RegExp(expectedTypes).test(valueType)){throw new Error(componentName.toUpperCase()+": "+("Option \""+property+"\" provided type \""+valueType+"\" ")+("but expected type \""+expectedTypes+"\"."));}}}},findShadowRoot:function findShadowRoot(element){if(!document.documentElement.attachShadow){return null;}
if(typeof element.getRootNode==='function'){var root=element.getRootNode();return root instanceof ShadowRoot?root:null;}
if(element instanceof ShadowRoot){return element;}
if(!element.parentNode){return null;}
return Util.findShadowRoot(element.parentNode);}};setTransitionEndSupport();var NAME='alert';var VERSION='4.3.1';var DATA_KEY='bs.alert';var EVENT_KEY="."+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var Selector={DISMISS:'[data-dismiss="alert"]'};var Event={CLOSE:"close"+EVENT_KEY,CLOSED:"closed"+EVENT_KEY,CLICK_DATA_API:"click"+EVENT_KEY+DATA_API_KEY};var ClassName={ALERT:'alert',FADE:'fade',SHOW:'show'};var Alert=function(){function Alert(element){this._element=element;}
var _proto=Alert.prototype;_proto.close=function close(element){var rootElement=this._element;if(element){rootElement=this._getRootElement(element);}
var customEvent=this._triggerCloseEvent(rootElement);if(customEvent.isDefaultPrevented()){return;}
this._removeElement(rootElement);};_proto.dispose=function dispose(){$.removeData(this._element,DATA_KEY);this._element=null;};_proto._getRootElement=function _getRootElement(element){var selector=Util.getSelectorFromElement(element);var parent=false;if(selector){parent=document.querySelector(selector);}
if(!parent){parent=$(element).closest("."+ClassName.ALERT)[0];}
return parent;};_proto._triggerCloseEvent=function _triggerCloseEvent(element){var closeEvent=$.Event(Event.CLOSE);$(element).trigger(closeEvent);return closeEvent;};_proto._removeElement=function _removeElement(element){var _this=this;$(element).removeClass(ClassName.SHOW);if(!$(element).hasClass(ClassName.FADE)){this._destroyElement(element);return;}
var transitionDuration=Util.getTransitionDurationFromElement(element);$(element).one(Util.TRANSITION_END,function(event){return _this._destroyElement(element,event);}).emulateTransitionEnd(transitionDuration);};_proto._destroyElement=function _destroyElement(element){$(element).detach().trigger(Event.CLOSED).remove();};Alert._jQueryInterface=function _jQueryInterface(config){return this.each(function(){var $element=$(this);var data=$element.data(DATA_KEY);if(!data){data=new Alert(this);$element.data(DATA_KEY,data);}
if(config==='close'){data[config](this);}});};Alert._handleDismiss=function _handleDismiss(alertInstance){return function(event){if(event){event.preventDefault();}
alertInstance.close(this);};};_createClass(Alert,null,[{key:"VERSION",get:function get(){return VERSION;}}]);return Alert;}();$(document).on(Event.CLICK_DATA_API,Selector.DISMISS,Alert._handleDismiss(new Alert()));$.fn[NAME]=Alert._jQueryInterface;$.fn[NAME].Constructor=Alert;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Alert._jQueryInterface;};var NAME$1='button';var VERSION$1='4.3.1';var DATA_KEY$1='bs.button';var EVENT_KEY$1="."+DATA_KEY$1;var DATA_API_KEY$1='.data-api';var JQUERY_NO_CONFLICT$1=$.fn[NAME$1];var ClassName$1={ACTIVE:'active',BUTTON:'btn',FOCUS:'focus'};var Selector$1={DATA_TOGGLE_CARROT:'[data-toggle^="button"]',DATA_TOGGLE:'[data-toggle="buttons"]',INPUT:'input:not([type="hidden"])',ACTIVE:'.active',BUTTON:'.btn'};var Event$1={CLICK_DATA_API:"click"+EVENT_KEY$1+DATA_API_KEY$1,FOCUS_BLUR_DATA_API:"focus"+EVENT_KEY$1+DATA_API_KEY$1+" "+("blur"+EVENT_KEY$1+DATA_API_KEY$1)};var Button=function(){function Button(element){this._element=element;}
var _proto=Button.prototype;_proto.toggle=function toggle(){var triggerChangeEvent=true;var addAriaPressed=true;var rootElement=$(this._element).closest(Selector$1.DATA_TOGGLE)[0];if(rootElement){var input=this._element.querySelector(Selector$1.INPUT);if(input){if(input.type==='radio'){if(input.checked&&this._element.classList.contains(ClassName$1.ACTIVE)){triggerChangeEvent=false;}else{var activeElement=rootElement.querySelector(Selector$1.ACTIVE);if(activeElement){$(activeElement).removeClass(ClassName$1.ACTIVE);}}}
if(triggerChangeEvent){if(input.hasAttribute('disabled')||rootElement.hasAttribute('disabled')||input.classList.contains('disabled')||rootElement.classList.contains('disabled')){return;}
input.checked=!this._element.classList.contains(ClassName$1.ACTIVE);$(input).trigger('change');}
input.focus();addAriaPressed=false;}}
if(addAriaPressed){this._element.setAttribute('aria-pressed',!this._element.classList.contains(ClassName$1.ACTIVE));}
if(triggerChangeEvent){$(this._element).toggleClass(ClassName$1.ACTIVE);}};_proto.dispose=function dispose(){$.removeData(this._element,DATA_KEY$1);this._element=null;};Button._jQueryInterface=function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY$1);if(!data){data=new Button(this);$(this).data(DATA_KEY$1,data);}
if(config==='toggle'){data[config]();}});};_createClass(Button,null,[{key:"VERSION",get:function get(){return VERSION$1;}}]);return Button;}();$(document).on(Event$1.CLICK_DATA_API,Selector$1.DATA_TOGGLE_CARROT,function(event){event.preventDefault();var button=event.target;if(!$(button).hasClass(ClassName$1.BUTTON)){button=$(button).closest(Selector$1.BUTTON);}
Button._jQueryInterface.call($(button),'toggle');}).on(Event$1.FOCUS_BLUR_DATA_API,Selector$1.DATA_TOGGLE_CARROT,function(event){var button=$(event.target).closest(Selector$1.BUTTON)[0];$(button).toggleClass(ClassName$1.FOCUS,/^focus(in)?$/.test(event.type));});$.fn[NAME$1]=Button._jQueryInterface;$.fn[NAME$1].Constructor=Button;$.fn[NAME$1].noConflict=function(){$.fn[NAME$1]=JQUERY_NO_CONFLICT$1;return Button._jQueryInterface;};var NAME$2='carousel';var VERSION$2='4.3.1';var DATA_KEY$2='bs.carousel';var EVENT_KEY$2="."+DATA_KEY$2;var DATA_API_KEY$2='.data-api';var JQUERY_NO_CONFLICT$2=$.fn[NAME$2];var ARROW_LEFT_KEYCODE=37;var ARROW_RIGHT_KEYCODE=39;var TOUCHEVENT_COMPAT_WAIT=500;var SWIPE_THRESHOLD=40;var Default={interval:5000,keyboard:true,slide:false,pause:'hover',wrap:true,touch:true};var DefaultType={interval:'(number|boolean)',keyboard:'boolean',slide:'(boolean|string)',pause:'(string|boolean)',wrap:'boolean',touch:'boolean'};var Direction={NEXT:'next',PREV:'prev',LEFT:'left',RIGHT:'right'};var Event$2={SLIDE:"slide"+EVENT_KEY$2,SLID:"slid"+EVENT_KEY$2,KEYDOWN:"keydown"+EVENT_KEY$2,MOUSEENTER:"mouseenter"+EVENT_KEY$2,MOUSELEAVE:"mouseleave"+EVENT_KEY$2,TOUCHSTART:"touchstart"+EVENT_KEY$2,TOUCHMOVE:"touchmove"+EVENT_KEY$2,TOUCHEND:"touchend"+EVENT_KEY$2,POINTERDOWN:"pointerdown"+EVENT_KEY$2,POINTERUP:"pointerup"+EVENT_KEY$2,DRAG_START:"dragstart"+EVENT_KEY$2,LOAD_DATA_API:"load"+EVENT_KEY$2+DATA_API_KEY$2,CLICK_DATA_API:"click"+EVENT_KEY$2+DATA_API_KEY$2};var ClassName$2={CAROUSEL:'carousel',ACTIVE:'active',SLIDE:'slide',RIGHT:'carousel-item-right',LEFT:'carousel-item-left',NEXT:'carousel-item-next',PREV:'carousel-item-prev',ITEM:'carousel-item',POINTER_EVENT:'pointer-event'};var Selector$2={ACTIVE:'.active',ACTIVE_ITEM:'.active.carousel-item',ITEM:'.carousel-item',ITEM_IMG:'.carousel-item img',NEXT_PREV:'.carousel-item-next, .carousel-item-prev',INDICATORS:'.carousel-indicators',DATA_SLIDE:'[data-slide], [data-slide-to]',DATA_RIDE:'[data-ride="carousel"]'};var PointerType={TOUCH:'touch',PEN:'pen'};var Carousel=function(){function Carousel(element,config){this._items=null;this._interval=null;this._activeElement=null;this._isPaused=false;this._isSliding=false;this.touchTimeout=null;this.touchStartX=0;this.touchDeltaX=0;this._config=this._getConfig(config);this._element=element;this._indicatorsElement=this._element.querySelector(Selector$2.INDICATORS);this._touchSupported='ontouchstart'in document.documentElement||navigator.maxTouchPoints>0;this._pointerEvent=Boolean(window.PointerEvent||window.MSPointerEvent);this._addEventListeners();}
var _proto=Carousel.prototype;_proto.next=function next(){if(!this._isSliding){this._slide(Direction.NEXT);}};_proto.nextWhenVisible=function nextWhenVisible(){if(!document.hidden&&$(this._element).is(':visible')&&$(this._element).css('visibility')!=='hidden'){this.next();}};_proto.prev=function prev(){if(!this._isSliding){this._slide(Direction.PREV);}};_proto.pause=function pause(event){if(!event){this._isPaused=true;}
if(this._element.querySelector(Selector$2.NEXT_PREV)){Util.triggerTransitionEnd(this._element);this.cycle(true);}
clearInterval(this._interval);this._interval=null;};_proto.cycle=function cycle(event){if(!event){this._isPaused=false;}
if(this._interval){clearInterval(this._interval);this._interval=null;}
if(this._config.interval&&!this._isPaused){this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval);}};_proto.to=function to(index){var _this=this;this._activeElement=this._element.querySelector(Selector$2.ACTIVE_ITEM);var activeIndex=this._getItemIndex(this._activeElement);if(index>this._items.length-1||index<0){return;}
if(this._isSliding){$(this._element).one(Event$2.SLID,function(){return _this.to(index);});return;}
if(activeIndex===index){this.pause();this.cycle();return;}
var direction=index>activeIndex?Direction.NEXT:Direction.PREV;this._slide(direction,this._items[index]);};_proto.dispose=function dispose(){$(this._element).off(EVENT_KEY$2);$.removeData(this._element,DATA_KEY$2);this._items=null;this._config=null;this._element=null;this._interval=null;this._isPaused=null;this._isSliding=null;this._activeElement=null;this._indicatorsElement=null;};_proto._getConfig=function _getConfig(config){config=_objectSpread({},Default,config);Util.typeCheckConfig(NAME$2,config,DefaultType);return config;};_proto._handleSwipe=function _handleSwipe(){var absDeltax=Math.abs(this.touchDeltaX);if(absDeltax<=SWIPE_THRESHOLD){return;}
var direction=absDeltax/this.touchDeltaX;if(direction>0){this.prev();}
if(direction<0){this.next();}};_proto._addEventListeners=function _addEventListeners(){var _this2=this;if(this._config.keyboard){$(this._element).on(Event$2.KEYDOWN,function(event){return _this2._keydown(event);});}
if(this._config.pause==='hover'){$(this._element).on(Event$2.MOUSEENTER,function(event){return _this2.pause(event);}).on(Event$2.MOUSELEAVE,function(event){return _this2.cycle(event);});}
if(this._config.touch){this._addTouchEventListeners();}};_proto._addTouchEventListeners=function _addTouchEventListeners(){var _this3=this;if(!this._touchSupported){return;}
var start=function start(event){if(_this3._pointerEvent&&PointerType[event.originalEvent.pointerType.toUpperCase()]){_this3.touchStartX=event.originalEvent.clientX;}else if(!_this3._pointerEvent){_this3.touchStartX=event.originalEvent.touches[0].clientX;}};var move=function move(event){if(event.originalEvent.touches&&event.originalEvent.touches.length>1){_this3.touchDeltaX=0;}else{_this3.touchDeltaX=event.originalEvent.touches[0].clientX-_this3.touchStartX;}};var end=function end(event){if(_this3._pointerEvent&&PointerType[event.originalEvent.pointerType.toUpperCase()]){_this3.touchDeltaX=event.originalEvent.clientX-_this3.touchStartX;}
_this3._handleSwipe();if(_this3._config.pause==='hover'){_this3.pause();if(_this3.touchTimeout){clearTimeout(_this3.touchTimeout);}
_this3.touchTimeout=setTimeout(function(event){return _this3.cycle(event);},TOUCHEVENT_COMPAT_WAIT+_this3._config.interval);}};$(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START,function(e){return e.preventDefault();});if(this._pointerEvent){$(this._element).on(Event$2.POINTERDOWN,function(event){return start(event);});$(this._element).on(Event$2.POINTERUP,function(event){return end(event);});this._element.classList.add(ClassName$2.POINTER_EVENT);}else{$(this._element).on(Event$2.TOUCHSTART,function(event){return start(event);});$(this._element).on(Event$2.TOUCHMOVE,function(event){return move(event);});$(this._element).on(Event$2.TOUCHEND,function(event){return end(event);});}};_proto._keydown=function _keydown(event){if(/input|textarea/i.test(event.target.tagName)){return;}
switch(event.which){case ARROW_LEFT_KEYCODE:event.preventDefault();this.prev();break;case ARROW_RIGHT_KEYCODE:event.preventDefault();this.next();break;default:}};_proto._getItemIndex=function _getItemIndex(element){this._items=element&&element.parentNode?[].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)):[];return this._items.indexOf(element);};_proto._getItemByDirection=function _getItemByDirection(direction,activeElement){var isNextDirection=direction===Direction.NEXT;var isPrevDirection=direction===Direction.PREV;var activeIndex=this._getItemIndex(activeElement);var lastItemIndex=this._items.length-1;var isGoingToWrap=isPrevDirection&&activeIndex===0||isNextDirection&&activeIndex===lastItemIndex;if(isGoingToWrap&&!this._config.wrap){return activeElement;}
var delta=direction===Direction.PREV?-1:1;var itemIndex=(activeIndex+delta)%this._items.length;return itemIndex===-1?this._items[this._items.length-1]:this._items[itemIndex];};_proto._triggerSlideEvent=function _triggerSlideEvent(relatedTarget,eventDirectionName){var targetIndex=this._getItemIndex(relatedTarget);var fromIndex=this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));var slideEvent=$.Event(Event$2.SLIDE,{relatedTarget:relatedTarget,direction:eventDirectionName,from:fromIndex,to:targetIndex});$(this._element).trigger(slideEvent);return slideEvent;};_proto._setActiveIndicatorElement=function _setActiveIndicatorElement(element){if(this._indicatorsElement){var indicators=[].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));$(indicators).removeClass(ClassName$2.ACTIVE);var nextIndicator=this._indicatorsElement.children[this._getItemIndex(element)];if(nextIndicator){$(nextIndicator).addClass(ClassName$2.ACTIVE);}}};_proto._slide=function _slide(direction,element){var _this4=this;var activeElement=this._element.querySelector(Selector$2.ACTIVE_ITEM);var activeElementIndex=this._getItemIndex(activeElement);var nextElement=element||activeElement&&this._getItemByDirection(direction,activeElement);var nextElementIndex=this._getItemIndex(nextElement);var isCycling=Boolean(this._interval);var directionalClassName;var orderClassName;var eventDirectionName;if(direction===Direction.NEXT){directionalClassName=ClassName$2.LEFT;orderClassName=ClassName$2.NEXT;eventDirectionName=Direction.LEFT;}else{directionalClassName=ClassName$2.RIGHT;orderClassName=ClassName$2.PREV;eventDirectionName=Direction.RIGHT;}
if(nextElement&&$(nextElement).hasClass(ClassName$2.ACTIVE)){this._isSliding=false;return;}
var slideEvent=this._triggerSlideEvent(nextElement,eventDirectionName);if(slideEvent.isDefaultPrevented()){return;}
if(!activeElement||!nextElement){return;}
this._isSliding=true;if(isCycling){this.pause();}
this._setActiveIndicatorElement(nextElement);var slidEvent=$.Event(Event$2.SLID,{relatedTarget:nextElement,direction:eventDirectionName,from:activeElementIndex,to:nextElementIndex});if($(this._element).hasClass(ClassName$2.SLIDE)){$(nextElement).addClass(orderClassName);Util.reflow(nextElement);$(activeElement).addClass(directionalClassName);$(nextElement).addClass(directionalClassName);var nextElementInterval=parseInt(nextElement.getAttribute('data-interval'),10);if(nextElementInterval){this._config.defaultInterval=this._config.defaultInterval||this._config.interval;this._config.interval=nextElementInterval;}else{this._config.interval=this._config.defaultInterval||this._config.interval;}
var transitionDuration=Util.getTransitionDurationFromElement(activeElement);$(activeElement).one(Util.TRANSITION_END,function(){$(nextElement).removeClass(directionalClassName+" "+orderClassName).addClass(ClassName$2.ACTIVE);$(activeElement).removeClass(ClassName$2.ACTIVE+" "+orderClassName+" "+directionalClassName);_this4._isSliding=false;setTimeout(function(){return $(_this4._element).trigger(slidEvent);},0);}).emulateTransitionEnd(transitionDuration);}else{$(activeElement).removeClass(ClassName$2.ACTIVE);$(nextElement).addClass(ClassName$2.ACTIVE);this._isSliding=false;$(this._element).trigger(slidEvent);}
if(isCycling){this.cycle();}};Carousel._jQueryInterface=function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY$2);var _config=_objectSpread({},Default,$(this).data());if(typeof config==='object'){_config=_objectSpread({},_config,config);}
var action=typeof config==='string'?config:_config.slide;if(!data){data=new Carousel(this,_config);$(this).data(DATA_KEY$2,data);}
if(typeof config==='number'){data.to(config);}else if(typeof action==='string'){if(typeof data[action]==='undefined'){throw new TypeError("No method named \""+action+"\"");}
data[action]();}else if(_config.interval&&_config.ride){data.pause();data.cycle();}});};Carousel._dataApiClickHandler=function _dataApiClickHandler(event){var selector=Util.getSelectorFromElement(this);if(!selector){return;}
var target=$(selector)[0];if(!target||!$(target).hasClass(ClassName$2.CAROUSEL)){return;}
var config=_objectSpread({},$(target).data(),$(this).data());var slideIndex=this.getAttribute('data-slide-to');if(slideIndex){config.interval=false;}
Carousel._jQueryInterface.call($(target),config);if(slideIndex){$(target).data(DATA_KEY$2).to(slideIndex);}
event.preventDefault();};_createClass(Carousel,null,[{key:"VERSION",get:function get(){return VERSION$2;}},{key:"Default",get:function get(){return Default;}}]);return Carousel;}();$(document).on(Event$2.CLICK_DATA_API,Selector$2.DATA_SLIDE,Carousel._dataApiClickHandler);$(window).on(Event$2.LOAD_DATA_API,function(){var carousels=[].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));for(var i=0,len=carousels.length;i<len;i++){var $carousel=$(carousels[i]);Carousel._jQueryInterface.call($carousel,$carousel.data());}});$.fn[NAME$2]=Carousel._jQueryInterface;$.fn[NAME$2].Constructor=Carousel;$.fn[NAME$2].noConflict=function(){$.fn[NAME$2]=JQUERY_NO_CONFLICT$2;return Carousel._jQueryInterface;};var NAME$3='collapse';var VERSION$3='4.3.1';var DATA_KEY$3='bs.collapse';var EVENT_KEY$3="."+DATA_KEY$3;var DATA_API_KEY$3='.data-api';var JQUERY_NO_CONFLICT$3=$.fn[NAME$3];var Default$1={toggle:true,parent:''};var DefaultType$1={toggle:'boolean',parent:'(string|element)'};var Event$3={SHOW:"show"+EVENT_KEY$3,SHOWN:"shown"+EVENT_KEY$3,HIDE:"hide"+EVENT_KEY$3,HIDDEN:"hidden"+EVENT_KEY$3,CLICK_DATA_API:"click"+EVENT_KEY$3+DATA_API_KEY$3};var ClassName$3={SHOW:'show',COLLAPSE:'collapse',COLLAPSING:'collapsing',COLLAPSED:'collapsed'};var Dimension={WIDTH:'width',HEIGHT:'height'};var Selector$3={ACTIVES:'.show, .collapsing',DATA_TOGGLE:'[data-toggle="collapse"]'};var Collapse=function(){function Collapse(element,config){this._isTransitioning=false;this._element=element;this._config=this._getConfig(config);this._triggerArray=[].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#"+element.id+"\"],"+("[data-toggle=\"collapse\"][data-target=\"#"+element.id+"\"]")));var toggleList=[].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));for(var i=0,len=toggleList.length;i<len;i++){var elem=toggleList[i];var selector=Util.getSelectorFromElement(elem);var filterElement=[].slice.call(document.querySelectorAll(selector)).filter(function(foundElem){return foundElem===element;});if(selector!==null&&filterElement.length>0){this._selector=selector;this._triggerArray.push(elem);}}
this._parent=this._config.parent?this._getParent():null;if(!this._config.parent){this._addAriaAndCollapsedClass(this._element,this._triggerArray);}
if(this._config.toggle){this.toggle();}}
var _proto=Collapse.prototype;_proto.toggle=function toggle(){if($(this._element).hasClass(ClassName$3.SHOW)){this.hide();}else{this.show();}};_proto.show=function show(){var _this=this;if(this._isTransitioning||$(this._element).hasClass(ClassName$3.SHOW)){return;}
var actives;var activesData;if(this._parent){actives=[].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function(elem){if(typeof _this._config.parent==='string'){return elem.getAttribute('data-parent')===_this._config.parent;}
return elem.classList.contains(ClassName$3.COLLAPSE);});if(actives.length===0){actives=null;}}
if(actives){activesData=$(actives).not(this._selector).data(DATA_KEY$3);if(activesData&&activesData._isTransitioning){return;}}
var startEvent=$.Event(Event$3.SHOW);$(this._element).trigger(startEvent);if(startEvent.isDefaultPrevented()){return;}
if(actives){Collapse._jQueryInterface.call($(actives).not(this._selector),'hide');if(!activesData){$(actives).data(DATA_KEY$3,null);}}
var dimension=this._getDimension();$(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);this._element.style[dimension]=0;if(this._triggerArray.length){$(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded',true);}
this.setTransitioning(true);var complete=function complete(){$(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);_this._element.style[dimension]='';_this.setTransitioning(false);$(_this._element).trigger(Event$3.SHOWN);};var capitalizedDimension=dimension[0].toUpperCase()+dimension.slice(1);var scrollSize="scroll"+capitalizedDimension;var transitionDuration=Util.getTransitionDurationFromElement(this._element);$(this._element).one(Util.TRANSITION_END,complete).emulateTransitionEnd(transitionDuration);this._element.style[dimension]=this._element[scrollSize]+"px";};_proto.hide=function hide(){var _this2=this;if(this._isTransitioning||!$(this._element).hasClass(ClassName$3.SHOW)){return;}
var startEvent=$.Event(Event$3.HIDE);$(this._element).trigger(startEvent);if(startEvent.isDefaultPrevented()){return;}
var dimension=this._getDimension();this._element.style[dimension]=this._element.getBoundingClientRect()[dimension]+"px";Util.reflow(this._element);$(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);var triggerArrayLength=this._triggerArray.length;if(triggerArrayLength>0){for(var i=0;i<triggerArrayLength;i++){var trigger=this._triggerArray[i];var selector=Util.getSelectorFromElement(trigger);if(selector!==null){var $elem=$([].slice.call(document.querySelectorAll(selector)));if(!$elem.hasClass(ClassName$3.SHOW)){$(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded',false);}}}}
this.setTransitioning(true);var complete=function complete(){_this2.setTransitioning(false);$(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);};this._element.style[dimension]='';var transitionDuration=Util.getTransitionDurationFromElement(this._element);$(this._element).one(Util.TRANSITION_END,complete).emulateTransitionEnd(transitionDuration);};_proto.setTransitioning=function setTransitioning(isTransitioning){this._isTransitioning=isTransitioning;};_proto.dispose=function dispose(){$.removeData(this._element,DATA_KEY$3);this._config=null;this._parent=null;this._element=null;this._triggerArray=null;this._isTransitioning=null;};_proto._getConfig=function _getConfig(config){config=_objectSpread({},Default$1,config);config.toggle=Boolean(config.toggle);Util.typeCheckConfig(NAME$3,config,DefaultType$1);return config;};_proto._getDimension=function _getDimension(){var hasWidth=$(this._element).hasClass(Dimension.WIDTH);return hasWidth?Dimension.WIDTH:Dimension.HEIGHT;};_proto._getParent=function _getParent(){var _this3=this;var parent;if(Util.isElement(this._config.parent)){parent=this._config.parent;if(typeof this._config.parent.jquery!=='undefined'){parent=this._config.parent[0];}}else{parent=document.querySelector(this._config.parent);}
var selector="[data-toggle=\"collapse\"][data-parent=\""+this._config.parent+"\"]";var children=[].slice.call(parent.querySelectorAll(selector));$(children).each(function(i,element){_this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element),[element]);});return parent;};_proto._addAriaAndCollapsedClass=function _addAriaAndCollapsedClass(element,triggerArray){var isOpen=$(element).hasClass(ClassName$3.SHOW);if(triggerArray.length){$(triggerArray).toggleClass(ClassName$3.COLLAPSED,!isOpen).attr('aria-expanded',isOpen);}};Collapse._getTargetFromElement=function _getTargetFromElement(element){var selector=Util.getSelectorFromElement(element);return selector?document.querySelector(selector):null;};Collapse._jQueryInterface=function _jQueryInterface(config){return this.each(function(){var $this=$(this);var data=$this.data(DATA_KEY$3);var _config=_objectSpread({},Default$1,$this.data(),typeof config==='object'&&config?config:{});if(!data&&_config.toggle&&/show|hide/.test(config)){_config.toggle=false;}
if(!data){data=new Collapse(this,_config);$this.data(DATA_KEY$3,data);}
if(typeof config==='string'){if(typeof data[config]==='undefined'){throw new TypeError("No method named \""+config+"\"");}
data[config]();}});};_createClass(Collapse,null,[{key:"VERSION",get:function get(){return VERSION$3;}},{key:"Default",get:function get(){return Default$1;}}]);return Collapse;}();$(document).on(Event$3.CLICK_DATA_API,Selector$3.DATA_TOGGLE,function(event){if(event.currentTarget.tagName==='A'){event.preventDefault();}
var $trigger=$(this);var selector=Util.getSelectorFromElement(this);var selectors=[].slice.call(document.querySelectorAll(selector));$(selectors).each(function(){var $target=$(this);var data=$target.data(DATA_KEY$3);var config=data?'toggle':$trigger.data();Collapse._jQueryInterface.call($target,config);});});$.fn[NAME$3]=Collapse._jQueryInterface;$.fn[NAME$3].Constructor=Collapse;$.fn[NAME$3].noConflict=function(){$.fn[NAME$3]=JQUERY_NO_CONFLICT$3;return Collapse._jQueryInterface;};var isBrowser=typeof window!=='undefined'&&typeof document!=='undefined';var longerTimeoutBrowsers=['Edge','Trident','Firefox'];var timeoutDuration=0;for(var i=0;i<longerTimeoutBrowsers.length;i+=1){if(isBrowser&&navigator.userAgent.indexOf(longerTimeoutBrowsers[i])>=0){timeoutDuration=1;break;}}
function microtaskDebounce(fn){var called=false;return function(){if(called){return;}
called=true;window.Promise.resolve().then(function(){called=false;fn();});};}
function taskDebounce(fn){var scheduled=false;return function(){if(!scheduled){scheduled=true;setTimeout(function(){scheduled=false;fn();},timeoutDuration);}};}
var supportsMicroTasks=isBrowser&&window.Promise;var debounce=supportsMicroTasks?microtaskDebounce:taskDebounce;function isFunction(functionToCheck){var getType={};return functionToCheck&&getType.toString.call(functionToCheck)==='[object Function]';}
function getStyleComputedProperty(element,property){if(element.nodeType!==1){return[];}
var window=element.ownerDocument.defaultView;var css=window.getComputedStyle(element,null);return property?css[property]:css;}
function getParentNode(element){if(element.nodeName==='HTML'){return element;}
return element.parentNode||element.host;}
function getScrollParent(element){if(!element){return document.body;}
switch(element.nodeName){case'HTML':case'BODY':return element.ownerDocument.body;case'#document':return element.body;}
var _getStyleComputedProp=getStyleComputedProperty(element),overflow=_getStyleComputedProp.overflow,overflowX=_getStyleComputedProp.overflowX,overflowY=_getStyleComputedProp.overflowY;if(/(auto|scroll|overlay)/.test(overflow+overflowY+overflowX)){return element;}
return getScrollParent(getParentNode(element));}
var isIE11=isBrowser&&!!(window.MSInputMethodContext&&document.documentMode);var isIE10=isBrowser&&/MSIE 10/.test(navigator.userAgent);function isIE(version){if(version===11){return isIE11;}
if(version===10){return isIE10;}
return isIE11||isIE10;}
function getOffsetParent(element){if(!element){return document.documentElement;}
var noOffsetParent=isIE(10)?document.body:null;var offsetParent=element.offsetParent||null;while(offsetParent===noOffsetParent&&element.nextElementSibling){offsetParent=(element=element.nextElementSibling).offsetParent;}
var nodeName=offsetParent&&offsetParent.nodeName;if(!nodeName||nodeName==='BODY'||nodeName==='HTML'){return element?element.ownerDocument.documentElement:document.documentElement;}
if(['TH','TD','TABLE'].indexOf(offsetParent.nodeName)!==-1&&getStyleComputedProperty(offsetParent,'position')==='static'){return getOffsetParent(offsetParent);}
return offsetParent;}
function isOffsetContainer(element){var nodeName=element.nodeName;if(nodeName==='BODY'){return false;}
return nodeName==='HTML'||getOffsetParent(element.firstElementChild)===element;}
function getRoot(node){if(node.parentNode!==null){return getRoot(node.parentNode);}
return node;}
function findCommonOffsetParent(element1,element2){if(!element1||!element1.nodeType||!element2||!element2.nodeType){return document.documentElement;}
var order=element1.compareDocumentPosition(element2)&Node.DOCUMENT_POSITION_FOLLOWING;var start=order?element1:element2;var end=order?element2:element1;var range=document.createRange();range.setStart(start,0);range.setEnd(end,0);var commonAncestorContainer=range.commonAncestorContainer;if(element1!==commonAncestorContainer&&element2!==commonAncestorContainer||start.contains(end)){if(isOffsetContainer(commonAncestorContainer)){return commonAncestorContainer;}
return getOffsetParent(commonAncestorContainer);}
var element1root=getRoot(element1);if(element1root.host){return findCommonOffsetParent(element1root.host,element2);}else{return findCommonOffsetParent(element1,getRoot(element2).host);}}
function getScroll(element){var side=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'top';var upperSide=side==='top'?'scrollTop':'scrollLeft';var nodeName=element.nodeName;if(nodeName==='BODY'||nodeName==='HTML'){var html=element.ownerDocument.documentElement;var scrollingElement=element.ownerDocument.scrollingElement||html;return scrollingElement[upperSide];}
return element[upperSide];}
function includeScroll(rect,element){var subtract=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var scrollTop=getScroll(element,'top');var scrollLeft=getScroll(element,'left');var modifier=subtract?-1:1;rect.top+=scrollTop*modifier;rect.bottom+=scrollTop*modifier;rect.left+=scrollLeft*modifier;rect.right+=scrollLeft*modifier;return rect;}
function getBordersSize(styles,axis){var sideA=axis==='x'?'Left':'Top';var sideB=sideA==='Left'?'Right':'Bottom';return parseFloat(styles['border'+sideA+'Width'],10)+parseFloat(styles['border'+sideB+'Width'],10);}
function getSize(axis,body,html,computedStyle){return Math.max(body['offset'+axis],body['scroll'+axis],html['client'+axis],html['offset'+axis],html['scroll'+axis],isIE(10)?parseInt(html['offset'+axis])+parseInt(computedStyle['margin'+(axis==='Height'?'Top':'Left')])+parseInt(computedStyle['margin'+(axis==='Height'?'Bottom':'Right')]):0);}
function getWindowSizes(document){var body=document.body;var html=document.documentElement;var computedStyle=isIE(10)&&getComputedStyle(html);return{height:getSize('Height',body,html,computedStyle),width:getSize('Width',body,html,computedStyle)};}
var classCallCheck=function(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}};var createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}
return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var defineProperty=function(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}
return obj;};var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}
return target;};function getClientRect(offsets){return _extends({},offsets,{right:offsets.left+offsets.width,bottom:offsets.top+offsets.height});}
function getBoundingClientRect(element){var rect={};try{if(isIE(10)){rect=element.getBoundingClientRect();var scrollTop=getScroll(element,'top');var scrollLeft=getScroll(element,'left');rect.top+=scrollTop;rect.left+=scrollLeft;rect.bottom+=scrollTop;rect.right+=scrollLeft;}else{rect=element.getBoundingClientRect();}}catch(e){}
var result={left:rect.left,top:rect.top,width:rect.right-rect.left,height:rect.bottom-rect.top};var sizes=element.nodeName==='HTML'?getWindowSizes(element.ownerDocument):{};var width=sizes.width||element.clientWidth||result.right-result.left;var height=sizes.height||element.clientHeight||result.bottom-result.top;var horizScrollbar=element.offsetWidth-width;var vertScrollbar=element.offsetHeight-height;if(horizScrollbar||vertScrollbar){var styles=getStyleComputedProperty(element);horizScrollbar-=getBordersSize(styles,'x');vertScrollbar-=getBordersSize(styles,'y');result.width-=horizScrollbar;result.height-=vertScrollbar;}
return getClientRect(result);}
function getOffsetRectRelativeToArbitraryNode(children,parent){var fixedPosition=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var isIE10=isIE(10);var isHTML=parent.nodeName==='HTML';var childrenRect=getBoundingClientRect(children);var parentRect=getBoundingClientRect(parent);var scrollParent=getScrollParent(children);var styles=getStyleComputedProperty(parent);var borderTopWidth=parseFloat(styles.borderTopWidth,10);var borderLeftWidth=parseFloat(styles.borderLeftWidth,10);if(fixedPosition&&isHTML){parentRect.top=Math.max(parentRect.top,0);parentRect.left=Math.max(parentRect.left,0);}
var offsets=getClientRect({top:childrenRect.top-parentRect.top-borderTopWidth,left:childrenRect.left-parentRect.left-borderLeftWidth,width:childrenRect.width,height:childrenRect.height});offsets.marginTop=0;offsets.marginLeft=0;if(!isIE10&&isHTML){var marginTop=parseFloat(styles.marginTop,10);var marginLeft=parseFloat(styles.marginLeft,10);offsets.top-=borderTopWidth-marginTop;offsets.bottom-=borderTopWidth-marginTop;offsets.left-=borderLeftWidth-marginLeft;offsets.right-=borderLeftWidth-marginLeft;offsets.marginTop=marginTop;offsets.marginLeft=marginLeft;}
if(isIE10&&!fixedPosition?parent.contains(scrollParent):parent===scrollParent&&scrollParent.nodeName!=='BODY'){offsets=includeScroll(offsets,parent);}
return offsets;}
function getViewportOffsetRectRelativeToArtbitraryNode(element){var excludeScroll=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var html=element.ownerDocument.documentElement;var relativeOffset=getOffsetRectRelativeToArbitraryNode(element,html);var width=Math.max(html.clientWidth,window.innerWidth||0);var height=Math.max(html.clientHeight,window.innerHeight||0);var scrollTop=!excludeScroll?getScroll(html):0;var scrollLeft=!excludeScroll?getScroll(html,'left'):0;var offset={top:scrollTop-relativeOffset.top+relativeOffset.marginTop,left:scrollLeft-relativeOffset.left+relativeOffset.marginLeft,width:width,height:height};return getClientRect(offset);}
function isFixed(element){var nodeName=element.nodeName;if(nodeName==='BODY'||nodeName==='HTML'){return false;}
if(getStyleComputedProperty(element,'position')==='fixed'){return true;}
var parentNode=getParentNode(element);if(!parentNode){return false;}
return isFixed(parentNode);}
function getFixedPositionOffsetParent(element){if(!element||!element.parentElement||isIE()){return document.documentElement;}
var el=element.parentElement;while(el&&getStyleComputedProperty(el,'transform')==='none'){el=el.parentElement;}
return el||document.documentElement;}
function getBoundaries(popper,reference,padding,boundariesElement){var fixedPosition=arguments.length>4&&arguments[4]!==undefined?arguments[4]:false;var boundaries={top:0,left:0};var offsetParent=fixedPosition?getFixedPositionOffsetParent(popper):findCommonOffsetParent(popper,reference);if(boundariesElement==='viewport'){boundaries=getViewportOffsetRectRelativeToArtbitraryNode(offsetParent,fixedPosition);}else{var boundariesNode=void 0;if(boundariesElement==='scrollParent'){boundariesNode=getScrollParent(getParentNode(reference));if(boundariesNode.nodeName==='BODY'){boundariesNode=popper.ownerDocument.documentElement;}}else if(boundariesElement==='window'){boundariesNode=popper.ownerDocument.documentElement;}else{boundariesNode=boundariesElement;}
var offsets=getOffsetRectRelativeToArbitraryNode(boundariesNode,offsetParent,fixedPosition);if(boundariesNode.nodeName==='HTML'&&!isFixed(offsetParent)){var _getWindowSizes=getWindowSizes(popper.ownerDocument),height=_getWindowSizes.height,width=_getWindowSizes.width;boundaries.top+=offsets.top-offsets.marginTop;boundaries.bottom=height+offsets.top;boundaries.left+=offsets.left-offsets.marginLeft;boundaries.right=width+offsets.left;}else{boundaries=offsets;}}
padding=padding||0;var isPaddingNumber=typeof padding==='number';boundaries.left+=isPaddingNumber?padding:padding.left||0;boundaries.top+=isPaddingNumber?padding:padding.top||0;boundaries.right-=isPaddingNumber?padding:padding.right||0;boundaries.bottom-=isPaddingNumber?padding:padding.bottom||0;return boundaries;}
function getArea(_ref){var width=_ref.width,height=_ref.height;return width*height;}
function computeAutoPlacement(placement,refRect,popper,reference,boundariesElement){var padding=arguments.length>5&&arguments[5]!==undefined?arguments[5]:0;if(placement.indexOf('auto')===-1){return placement;}
var boundaries=getBoundaries(popper,reference,padding,boundariesElement);var rects={top:{width:boundaries.width,height:refRect.top-boundaries.top},right:{width:boundaries.right-refRect.right,height:boundaries.height},bottom:{width:boundaries.width,height:boundaries.bottom-refRect.bottom},left:{width:refRect.left-boundaries.left,height:boundaries.height}};var sortedAreas=Object.keys(rects).map(function(key){return _extends({key:key},rects[key],{area:getArea(rects[key])});}).sort(function(a,b){return b.area-a.area;});var filteredAreas=sortedAreas.filter(function(_ref2){var width=_ref2.width,height=_ref2.height;return width>=popper.clientWidth&&height>=popper.clientHeight;});var computedPlacement=filteredAreas.length>0?filteredAreas[0].key:sortedAreas[0].key;var variation=placement.split('-')[1];return computedPlacement+(variation?'-'+variation:'');}
function getReferenceOffsets(state,popper,reference){var fixedPosition=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;var commonOffsetParent=fixedPosition?getFixedPositionOffsetParent(popper):findCommonOffsetParent(popper,reference);return getOffsetRectRelativeToArbitraryNode(reference,commonOffsetParent,fixedPosition);}
function getOuterSizes(element){var window=element.ownerDocument.defaultView;var styles=window.getComputedStyle(element);var x=parseFloat(styles.marginTop||0)+parseFloat(styles.marginBottom||0);var y=parseFloat(styles.marginLeft||0)+parseFloat(styles.marginRight||0);var result={width:element.offsetWidth+y,height:element.offsetHeight+x};return result;}
function getOppositePlacement(placement){var hash={left:'right',right:'left',bottom:'top',top:'bottom'};return placement.replace(/left|right|bottom|top/g,function(matched){return hash[matched];});}
function getPopperOffsets(popper,referenceOffsets,placement){placement=placement.split('-')[0];var popperRect=getOuterSizes(popper);var popperOffsets={width:popperRect.width,height:popperRect.height};var isHoriz=['right','left'].indexOf(placement)!==-1;var mainSide=isHoriz?'top':'left';var secondarySide=isHoriz?'left':'top';var measurement=isHoriz?'height':'width';var secondaryMeasurement=!isHoriz?'height':'width';popperOffsets[mainSide]=referenceOffsets[mainSide]+referenceOffsets[measurement]/2-popperRect[measurement]/2;if(placement===secondarySide){popperOffsets[secondarySide]=referenceOffsets[secondarySide]-popperRect[secondaryMeasurement];}else{popperOffsets[secondarySide]=referenceOffsets[getOppositePlacement(secondarySide)];}
return popperOffsets;}
function find(arr,check){if(Array.prototype.find){return arr.find(check);}
return arr.filter(check)[0];}
function findIndex(arr,prop,value){if(Array.prototype.findIndex){return arr.findIndex(function(cur){return cur[prop]===value;});}
var match=find(arr,function(obj){return obj[prop]===value;});return arr.indexOf(match);}
function runModifiers(modifiers,data,ends){var modifiersToRun=ends===undefined?modifiers:modifiers.slice(0,findIndex(modifiers,'name',ends));modifiersToRun.forEach(function(modifier){if(modifier['function']){console.warn('`modifier.function` is deprecated, use `modifier.fn`!');}
var fn=modifier['function']||modifier.fn;if(modifier.enabled&&isFunction(fn)){data.offsets.popper=getClientRect(data.offsets.popper);data.offsets.reference=getClientRect(data.offsets.reference);data=fn(data,modifier);}});return data;}
function update(){if(this.state.isDestroyed){return;}
var data={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:false,offsets:{}};data.offsets.reference=getReferenceOffsets(this.state,this.popper,this.reference,this.options.positionFixed);data.placement=computeAutoPlacement(this.options.placement,data.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding);data.originalPlacement=data.placement;data.positionFixed=this.options.positionFixed;data.offsets.popper=getPopperOffsets(this.popper,data.offsets.reference,data.placement);data.offsets.popper.position=this.options.positionFixed?'fixed':'absolute';data=runModifiers(this.modifiers,data);if(!this.state.isCreated){this.state.isCreated=true;this.options.onCreate(data);}else{this.options.onUpdate(data);}}
function isModifierEnabled(modifiers,modifierName){return modifiers.some(function(_ref){var name=_ref.name,enabled=_ref.enabled;return enabled&&name===modifierName;});}
function getSupportedPropertyName(property){var prefixes=[false,'ms','Webkit','Moz','O'];var upperProp=property.charAt(0).toUpperCase()+property.slice(1);for(var i=0;i<prefixes.length;i++){var prefix=prefixes[i];var toCheck=prefix?''+prefix+upperProp:property;if(typeof document.body.style[toCheck]!=='undefined'){return toCheck;}}
return null;}
function destroy(){this.state.isDestroyed=true;if(isModifierEnabled(this.modifiers,'applyStyle')){this.popper.removeAttribute('x-placement');this.popper.style.position='';this.popper.style.top='';this.popper.style.left='';this.popper.style.right='';this.popper.style.bottom='';this.popper.style.willChange='';this.popper.style[getSupportedPropertyName('transform')]='';}
this.disableEventListeners();if(this.options.removeOnDestroy){this.popper.parentNode.removeChild(this.popper);}
return this;}
function getWindow(element){var ownerDocument=element.ownerDocument;return ownerDocument?ownerDocument.defaultView:window;}
function attachToScrollParents(scrollParent,event,callback,scrollParents){var isBody=scrollParent.nodeName==='BODY';var target=isBody?scrollParent.ownerDocument.defaultView:scrollParent;target.addEventListener(event,callback,{passive:true});if(!isBody){attachToScrollParents(getScrollParent(target.parentNode),event,callback,scrollParents);}
scrollParents.push(target);}
function setupEventListeners(reference,options,state,updateBound){state.updateBound=updateBound;getWindow(reference).addEventListener('resize',state.updateBound,{passive:true});var scrollElement=getScrollParent(reference);attachToScrollParents(scrollElement,'scroll',state.updateBound,state.scrollParents);state.scrollElement=scrollElement;state.eventsEnabled=true;return state;}
function enableEventListeners(){if(!this.state.eventsEnabled){this.state=setupEventListeners(this.reference,this.options,this.state,this.scheduleUpdate);}}
function removeEventListeners(reference,state){getWindow(reference).removeEventListener('resize',state.updateBound);state.scrollParents.forEach(function(target){target.removeEventListener('scroll',state.updateBound);});state.updateBound=null;state.scrollParents=[];state.scrollElement=null;state.eventsEnabled=false;return state;}
function disableEventListeners(){if(this.state.eventsEnabled){cancelAnimationFrame(this.scheduleUpdate);this.state=removeEventListeners(this.reference,this.state);}}
function isNumeric(n){return n!==''&&!isNaN(parseFloat(n))&&isFinite(n);}
function setStyles(element,styles){Object.keys(styles).forEach(function(prop){var unit='';if(['width','height','top','right','bottom','left'].indexOf(prop)!==-1&&isNumeric(styles[prop])){unit='px';}
element.style[prop]=styles[prop]+unit;});}
function setAttributes(element,attributes){Object.keys(attributes).forEach(function(prop){var value=attributes[prop];if(value!==false){element.setAttribute(prop,attributes[prop]);}else{element.removeAttribute(prop);}});}
function applyStyle(data){setStyles(data.instance.popper,data.styles);setAttributes(data.instance.popper,data.attributes);if(data.arrowElement&&Object.keys(data.arrowStyles).length){setStyles(data.arrowElement,data.arrowStyles);}
return data;}
function applyStyleOnLoad(reference,popper,options,modifierOptions,state){var referenceOffsets=getReferenceOffsets(state,popper,reference,options.positionFixed);var placement=computeAutoPlacement(options.placement,referenceOffsets,popper,reference,options.modifiers.flip.boundariesElement,options.modifiers.flip.padding);popper.setAttribute('x-placement',placement);setStyles(popper,{position:options.positionFixed?'fixed':'absolute'});return options;}
function getRoundedOffsets(data,shouldRound){var _data$offsets=data.offsets,popper=_data$offsets.popper,reference=_data$offsets.reference;var round=Math.round,floor=Math.floor;var noRound=function noRound(v){return v;};var referenceWidth=round(reference.width);var popperWidth=round(popper.width);var isVertical=['left','right'].indexOf(data.placement)!==-1;var isVariation=data.placement.indexOf('-')!==-1;var sameWidthParity=referenceWidth%2===popperWidth%2;var bothOddWidth=referenceWidth%2===1&&popperWidth%2===1;var horizontalToInteger=!shouldRound?noRound:isVertical||isVariation||sameWidthParity?round:floor;var verticalToInteger=!shouldRound?noRound:round;return{left:horizontalToInteger(bothOddWidth&&!isVariation&&shouldRound?popper.left-1:popper.left),top:verticalToInteger(popper.top),bottom:verticalToInteger(popper.bottom),right:horizontalToInteger(popper.right)};}
var isFirefox=isBrowser&&/Firefox/i.test(navigator.userAgent);function computeStyle(data,options){var x=options.x,y=options.y;var popper=data.offsets.popper;var legacyGpuAccelerationOption=find(data.instance.modifiers,function(modifier){return modifier.name==='applyStyle';}).gpuAcceleration;if(legacyGpuAccelerationOption!==undefined){console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');}
var gpuAcceleration=legacyGpuAccelerationOption!==undefined?legacyGpuAccelerationOption:options.gpuAcceleration;var offsetParent=getOffsetParent(data.instance.popper);var offsetParentRect=getBoundingClientRect(offsetParent);var styles={position:popper.position};var offsets=getRoundedOffsets(data,window.devicePixelRatio<2||!isFirefox);var sideA=x==='bottom'?'top':'bottom';var sideB=y==='right'?'left':'right';var prefixedProperty=getSupportedPropertyName('transform');var left=void 0,top=void 0;if(sideA==='bottom'){if(offsetParent.nodeName==='HTML'){top=-offsetParent.clientHeight+offsets.bottom;}else{top=-offsetParentRect.height+offsets.bottom;}}else{top=offsets.top;}
if(sideB==='right'){if(offsetParent.nodeName==='HTML'){left=-offsetParent.clientWidth+offsets.right;}else{left=-offsetParentRect.width+offsets.right;}}else{left=offsets.left;}
if(gpuAcceleration&&prefixedProperty){styles[prefixedProperty]='translate3d('+left+'px, '+top+'px, 0)';styles[sideA]=0;styles[sideB]=0;styles.willChange='transform';}else{var invertTop=sideA==='bottom'?-1:1;var invertLeft=sideB==='right'?-1:1;styles[sideA]=top*invertTop;styles[sideB]=left*invertLeft;styles.willChange=sideA+', '+sideB;}
var attributes={'x-placement':data.placement};data.attributes=_extends({},attributes,data.attributes);data.styles=_extends({},styles,data.styles);data.arrowStyles=_extends({},data.offsets.arrow,data.arrowStyles);return data;}
function isModifierRequired(modifiers,requestingName,requestedName){var requesting=find(modifiers,function(_ref){var name=_ref.name;return name===requestingName;});var isRequired=!!requesting&&modifiers.some(function(modifier){return modifier.name===requestedName&&modifier.enabled&&modifier.order<requesting.order;});if(!isRequired){var _requesting='`'+requestingName+'`';var requested='`'+requestedName+'`';console.warn(requested+' modifier is required by '+_requesting+' modifier in order to work, be sure to include it before '+_requesting+'!');}
return isRequired;}
function arrow(data,options){var _data$offsets$arrow;if(!isModifierRequired(data.instance.modifiers,'arrow','keepTogether')){return data;}
var arrowElement=options.element;if(typeof arrowElement==='string'){arrowElement=data.instance.popper.querySelector(arrowElement);if(!arrowElement){return data;}}else{if(!data.instance.popper.contains(arrowElement)){console.warn('WARNING: `arrow.element` must be child of its popper element!');return data;}}
var placement=data.placement.split('-')[0];var _data$offsets=data.offsets,popper=_data$offsets.popper,reference=_data$offsets.reference;var isVertical=['left','right'].indexOf(placement)!==-1;var len=isVertical?'height':'width';var sideCapitalized=isVertical?'Top':'Left';var side=sideCapitalized.toLowerCase();var altSide=isVertical?'left':'top';var opSide=isVertical?'bottom':'right';var arrowElementSize=getOuterSizes(arrowElement)[len];if(reference[opSide]-arrowElementSize<popper[side]){data.offsets.popper[side]-=popper[side]-(reference[opSide]-arrowElementSize);}
if(reference[side]+arrowElementSize>popper[opSide]){data.offsets.popper[side]+=reference[side]+arrowElementSize-popper[opSide];}
data.offsets.popper=getClientRect(data.offsets.popper);var center=reference[side]+reference[len]/2-arrowElementSize/2;var css=getStyleComputedProperty(data.instance.popper);var popperMarginSide=parseFloat(css['margin'+sideCapitalized],10);var popperBorderSide=parseFloat(css['border'+sideCapitalized+'Width'],10);var sideValue=center-data.offsets.popper[side]-popperMarginSide-popperBorderSide;sideValue=Math.max(Math.min(popper[len]-arrowElementSize,sideValue),0);data.arrowElement=arrowElement;data.offsets.arrow=(_data$offsets$arrow={},defineProperty(_data$offsets$arrow,side,Math.round(sideValue)),defineProperty(_data$offsets$arrow,altSide,''),_data$offsets$arrow);return data;}
function getOppositeVariation(variation){if(variation==='end'){return'start';}else if(variation==='start'){return'end';}
return variation;}
var placements=['auto-start','auto','auto-end','top-start','top','top-end','right-start','right','right-end','bottom-end','bottom','bottom-start','left-end','left','left-start'];var validPlacements=placements.slice(3);function clockwise(placement){var counter=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var index=validPlacements.indexOf(placement);var arr=validPlacements.slice(index+1).concat(validPlacements.slice(0,index));return counter?arr.reverse():arr;}
var BEHAVIORS={FLIP:'flip',CLOCKWISE:'clockwise',COUNTERCLOCKWISE:'counterclockwise'};function flip(data,options){if(isModifierEnabled(data.instance.modifiers,'inner')){return data;}
if(data.flipped&&data.placement===data.originalPlacement){return data;}
var boundaries=getBoundaries(data.instance.popper,data.instance.reference,options.padding,options.boundariesElement,data.positionFixed);var placement=data.placement.split('-')[0];var placementOpposite=getOppositePlacement(placement);var variation=data.placement.split('-')[1]||'';var flipOrder=[];switch(options.behavior){case BEHAVIORS.FLIP:flipOrder=[placement,placementOpposite];break;case BEHAVIORS.CLOCKWISE:flipOrder=clockwise(placement);break;case BEHAVIORS.COUNTERCLOCKWISE:flipOrder=clockwise(placement,true);break;default:flipOrder=options.behavior;}
flipOrder.forEach(function(step,index){if(placement!==step||flipOrder.length===index+1){return data;}
placement=data.placement.split('-')[0];placementOpposite=getOppositePlacement(placement);var popperOffsets=data.offsets.popper;var refOffsets=data.offsets.reference;var floor=Math.floor;var overlapsRef=placement==='left'&&floor(popperOffsets.right)>floor(refOffsets.left)||placement==='right'&&floor(popperOffsets.left)<floor(refOffsets.right)||placement==='top'&&floor(popperOffsets.bottom)>floor(refOffsets.top)||placement==='bottom'&&floor(popperOffsets.top)<floor(refOffsets.bottom);var overflowsLeft=floor(popperOffsets.left)<floor(boundaries.left);var overflowsRight=floor(popperOffsets.right)>floor(boundaries.right);var overflowsTop=floor(popperOffsets.top)<floor(boundaries.top);var overflowsBottom=floor(popperOffsets.bottom)>floor(boundaries.bottom);var overflowsBoundaries=placement==='left'&&overflowsLeft||placement==='right'&&overflowsRight||placement==='top'&&overflowsTop||placement==='bottom'&&overflowsBottom;var isVertical=['top','bottom'].indexOf(placement)!==-1;var flippedVariation=!!options.flipVariations&&(isVertical&&variation==='start'&&overflowsLeft||isVertical&&variation==='end'&&overflowsRight||!isVertical&&variation==='start'&&overflowsTop||!isVertical&&variation==='end'&&overflowsBottom);if(overlapsRef||overflowsBoundaries||flippedVariation){data.flipped=true;if(overlapsRef||overflowsBoundaries){placement=flipOrder[index+1];}
if(flippedVariation){variation=getOppositeVariation(variation);}
data.placement=placement+(variation?'-'+variation:'');data.offsets.popper=_extends({},data.offsets.popper,getPopperOffsets(data.instance.popper,data.offsets.reference,data.placement));data=runModifiers(data.instance.modifiers,data,'flip');}});return data;}
function keepTogether(data){var _data$offsets=data.offsets,popper=_data$offsets.popper,reference=_data$offsets.reference;var placement=data.placement.split('-')[0];var floor=Math.floor;var isVertical=['top','bottom'].indexOf(placement)!==-1;var side=isVertical?'right':'bottom';var opSide=isVertical?'left':'top';var measurement=isVertical?'width':'height';if(popper[side]<floor(reference[opSide])){data.offsets.popper[opSide]=floor(reference[opSide])-popper[measurement];}
if(popper[opSide]>floor(reference[side])){data.offsets.popper[opSide]=floor(reference[side]);}
return data;}
function toValue(str,measurement,popperOffsets,referenceOffsets){var split=str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);var value=+split[1];var unit=split[2];if(!value){return str;}
if(unit.indexOf('%')===0){var element=void 0;switch(unit){case'%p':element=popperOffsets;break;case'%':case'%r':default:element=referenceOffsets;}
var rect=getClientRect(element);return rect[measurement]/100*value;}else if(unit==='vh'||unit==='vw'){var size=void 0;if(unit==='vh'){size=Math.max(document.documentElement.clientHeight,window.innerHeight||0);}else{size=Math.max(document.documentElement.clientWidth,window.innerWidth||0);}
return size/100*value;}else{return value;}}
function parseOffset(offset,popperOffsets,referenceOffsets,basePlacement){var offsets=[0,0];var useHeight=['right','left'].indexOf(basePlacement)!==-1;var fragments=offset.split(/(\+|\-)/).map(function(frag){return frag.trim();});var divider=fragments.indexOf(find(fragments,function(frag){return frag.search(/,|\s/)!==-1;}));if(fragments[divider]&&fragments[divider].indexOf(',')===-1){console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');}
var splitRegex=/\s*,\s*|\s+/;var ops=divider!==-1?[fragments.slice(0,divider).concat([fragments[divider].split(splitRegex)[0]]),[fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider+1))]:[fragments];ops=ops.map(function(op,index){var measurement=(index===1?!useHeight:useHeight)?'height':'width';var mergeWithPrevious=false;return op.reduce(function(a,b){if(a[a.length-1]===''&&['+','-'].indexOf(b)!==-1){a[a.length-1]=b;mergeWithPrevious=true;return a;}else if(mergeWithPrevious){a[a.length-1]+=b;mergeWithPrevious=false;return a;}else{return a.concat(b);}},[]).map(function(str){return toValue(str,measurement,popperOffsets,referenceOffsets);});});ops.forEach(function(op,index){op.forEach(function(frag,index2){if(isNumeric(frag)){offsets[index]+=frag*(op[index2-1]==='-'?-1:1);}});});return offsets;}
function offset(data,_ref){var offset=_ref.offset;var placement=data.placement,_data$offsets=data.offsets,popper=_data$offsets.popper,reference=_data$offsets.reference;var basePlacement=placement.split('-')[0];var offsets=void 0;if(isNumeric(+offset)){offsets=[+offset,0];}else{offsets=parseOffset(offset,popper,reference,basePlacement);}
if(basePlacement==='left'){popper.top+=offsets[0];popper.left-=offsets[1];}else if(basePlacement==='right'){popper.top+=offsets[0];popper.left+=offsets[1];}else if(basePlacement==='top'){popper.left+=offsets[0];popper.top-=offsets[1];}else if(basePlacement==='bottom'){popper.left+=offsets[0];popper.top+=offsets[1];}
data.popper=popper;return data;}
function preventOverflow(data,options){var boundariesElement=options.boundariesElement||getOffsetParent(data.instance.popper);if(data.instance.reference===boundariesElement){boundariesElement=getOffsetParent(boundariesElement);}
var transformProp=getSupportedPropertyName('transform');var popperStyles=data.instance.popper.style;var top=popperStyles.top,left=popperStyles.left,transform=popperStyles[transformProp];popperStyles.top='';popperStyles.left='';popperStyles[transformProp]='';var boundaries=getBoundaries(data.instance.popper,data.instance.reference,options.padding,boundariesElement,data.positionFixed);popperStyles.top=top;popperStyles.left=left;popperStyles[transformProp]=transform;options.boundaries=boundaries;var order=options.priority;var popper=data.offsets.popper;var check={primary:function primary(placement){var value=popper[placement];if(popper[placement]<boundaries[placement]&&!options.escapeWithReference){value=Math.max(popper[placement],boundaries[placement]);}
return defineProperty({},placement,value);},secondary:function secondary(placement){var mainSide=placement==='right'?'left':'top';var value=popper[mainSide];if(popper[placement]>boundaries[placement]&&!options.escapeWithReference){value=Math.min(popper[mainSide],boundaries[placement]-(placement==='right'?popper.width:popper.height));}
return defineProperty({},mainSide,value);}};order.forEach(function(placement){var side=['left','top'].indexOf(placement)!==-1?'primary':'secondary';popper=_extends({},popper,check[side](placement));});data.offsets.popper=popper;return data;}
function shift(data){var placement=data.placement;var basePlacement=placement.split('-')[0];var shiftvariation=placement.split('-')[1];if(shiftvariation){var _data$offsets=data.offsets,reference=_data$offsets.reference,popper=_data$offsets.popper;var isVertical=['bottom','top'].indexOf(basePlacement)!==-1;var side=isVertical?'left':'top';var measurement=isVertical?'width':'height';var shiftOffsets={start:defineProperty({},side,reference[side]),end:defineProperty({},side,reference[side]+reference[measurement]-popper[measurement])};data.offsets.popper=_extends({},popper,shiftOffsets[shiftvariation]);}
return data;}
function hide(data){if(!isModifierRequired(data.instance.modifiers,'hide','preventOverflow')){return data;}
var refRect=data.offsets.reference;var bound=find(data.instance.modifiers,function(modifier){return modifier.name==='preventOverflow';}).boundaries;if(refRect.bottom<bound.top||refRect.left>bound.right||refRect.top>bound.bottom||refRect.right<bound.left){if(data.hide===true){return data;}
data.hide=true;data.attributes['x-out-of-boundaries']='';}else{if(data.hide===false){return data;}
data.hide=false;data.attributes['x-out-of-boundaries']=false;}
return data;}
function inner(data){var placement=data.placement;var basePlacement=placement.split('-')[0];var _data$offsets=data.offsets,popper=_data$offsets.popper,reference=_data$offsets.reference;var isHoriz=['left','right'].indexOf(basePlacement)!==-1;var subtractLength=['top','left'].indexOf(basePlacement)===-1;popper[isHoriz?'left':'top']=reference[basePlacement]-(subtractLength?popper[isHoriz?'width':'height']:0);data.placement=getOppositePlacement(placement);data.offsets.popper=getClientRect(popper);return data;}
var modifiers={shift:{order:100,enabled:true,fn:shift},offset:{order:200,enabled:true,fn:offset,offset:0},preventOverflow:{order:300,enabled:true,fn:preventOverflow,priority:['left','right','top','bottom'],padding:5,boundariesElement:'scrollParent'},keepTogether:{order:400,enabled:true,fn:keepTogether},arrow:{order:500,enabled:true,fn:arrow,element:'[x-arrow]'},flip:{order:600,enabled:true,fn:flip,behavior:'flip',padding:5,boundariesElement:'viewport'},inner:{order:700,enabled:false,fn:inner},hide:{order:800,enabled:true,fn:hide},computeStyle:{order:850,enabled:true,fn:computeStyle,gpuAcceleration:true,x:'bottom',y:'right'},applyStyle:{order:900,enabled:true,fn:applyStyle,onLoad:applyStyleOnLoad,gpuAcceleration:undefined}};var Defaults={placement:'bottom',positionFixed:false,eventsEnabled:true,removeOnDestroy:false,onCreate:function onCreate(){},onUpdate:function onUpdate(){},modifiers:modifiers};var Popper=function(){function Popper(reference,popper){var _this=this;var options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};classCallCheck(this,Popper);this.scheduleUpdate=function(){return requestAnimationFrame(_this.update);};this.update=debounce(this.update.bind(this));this.options=_extends({},Popper.Defaults,options);this.state={isDestroyed:false,isCreated:false,scrollParents:[]};this.reference=reference&&reference.jquery?reference[0]:reference;this.popper=popper&&popper.jquery?popper[0]:popper;this.options.modifiers={};Object.keys(_extends({},Popper.Defaults.modifiers,options.modifiers)).forEach(function(name){_this.options.modifiers[name]=_extends({},Popper.Defaults.modifiers[name]||{},options.modifiers?options.modifiers[name]:{});});this.modifiers=Object.keys(this.options.modifiers).map(function(name){return _extends({name:name},_this.options.modifiers[name]);}).sort(function(a,b){return a.order-b.order;});this.modifiers.forEach(function(modifierOptions){if(modifierOptions.enabled&&isFunction(modifierOptions.onLoad)){modifierOptions.onLoad(_this.reference,_this.popper,_this.options,modifierOptions,_this.state);}});this.update();var eventsEnabled=this.options.eventsEnabled;if(eventsEnabled){this.enableEventListeners();}
this.state.eventsEnabled=eventsEnabled;}
createClass(Popper,[{key:'update',value:function update$$1(){return update.call(this);}},{key:'destroy',value:function destroy$$1(){return destroy.call(this);}},{key:'enableEventListeners',value:function enableEventListeners$$1(){return enableEventListeners.call(this);}},{key:'disableEventListeners',value:function disableEventListeners$$1(){return disableEventListeners.call(this);}}]);return Popper;}();Popper.Utils=(typeof window!=='undefined'?window:global).PopperUtils;Popper.placements=placements;Popper.Defaults=Defaults;var NAME$4='dropdown';var VERSION$4='4.3.1';var DATA_KEY$4='bs.dropdown';var EVENT_KEY$4="."+DATA_KEY$4;var DATA_API_KEY$4='.data-api';var JQUERY_NO_CONFLICT$4=$.fn[NAME$4];var ESCAPE_KEYCODE=27;var SPACE_KEYCODE=32;var TAB_KEYCODE=9;var ARROW_UP_KEYCODE=38;var ARROW_DOWN_KEYCODE=40;var RIGHT_MOUSE_BUTTON_WHICH=3;var REGEXP_KEYDOWN=new RegExp(ARROW_UP_KEYCODE+"|"+ARROW_DOWN_KEYCODE+"|"+ESCAPE_KEYCODE);var Event$4={HIDE:"hide"+EVENT_KEY$4,HIDDEN:"hidden"+EVENT_KEY$4,SHOW:"show"+EVENT_KEY$4,SHOWN:"shown"+EVENT_KEY$4,CLICK:"click"+EVENT_KEY$4,CLICK_DATA_API:"click"+EVENT_KEY$4+DATA_API_KEY$4,KEYDOWN_DATA_API:"keydown"+EVENT_KEY$4+DATA_API_KEY$4,KEYUP_DATA_API:"keyup"+EVENT_KEY$4+DATA_API_KEY$4};var ClassName$4={DISABLED:'disabled',SHOW:'show',DROPUP:'dropup',DROPRIGHT:'dropright',DROPLEFT:'dropleft',MENURIGHT:'dropdown-menu-right',MENULEFT:'dropdown-menu-left',POSITION_STATIC:'position-static'};var Selector$4={DATA_TOGGLE:'[data-toggle="dropdown"]',FORM_CHILD:'.dropdown form',MENU:'.dropdown-menu',NAVBAR_NAV:'.navbar-nav',VISIBLE_ITEMS:'.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'};var AttachmentMap={TOP:'top-start',TOPEND:'top-end',BOTTOM:'bottom-start',BOTTOMEND:'bottom-end',RIGHT:'right-start',RIGHTEND:'right-end',LEFT:'left-start',LEFTEND:'left-end'};var Default$2={offset:0,flip:true,boundary:'scrollParent',reference:'toggle',display:'dynamic'};var DefaultType$2={offset:'(number|string|function)',flip:'boolean',boundary:'(string|element)',reference:'(string|element)',display:'string'};var Dropdown=function(){function Dropdown(element,config){this._element=element;this._popper=null;this._config=this._getConfig(config);this._menu=this._getMenuElement();this._inNavbar=this._detectNavbar();this._addEventListeners();}
var _proto=Dropdown.prototype;_proto.toggle=function toggle(){if(this._element.disabled||$(this._element).hasClass(ClassName$4.DISABLED)){return;}
var parent=Dropdown._getParentFromElement(this._element);var isActive=$(this._menu).hasClass(ClassName$4.SHOW);Dropdown._clearMenus();if(isActive){return;}
var relatedTarget={relatedTarget:this._element};var showEvent=$.Event(Event$4.SHOW,relatedTarget);$(parent).trigger(showEvent);if(showEvent.isDefaultPrevented()){return;}
if(!this._inNavbar){if(typeof Popper==='undefined'){throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');}
var referenceElement=this._element;if(this._config.reference==='parent'){referenceElement=parent;}else if(Util.isElement(this._config.reference)){referenceElement=this._config.reference;if(typeof this._config.reference.jquery!=='undefined'){referenceElement=this._config.reference[0];}}
if(this._config.boundary!=='scrollParent'){$(parent).addClass(ClassName$4.POSITION_STATIC);}
this._popper=new Popper(referenceElement,this._menu,this._getPopperConfig());}
if('ontouchstart'in document.documentElement&&$(parent).closest(Selector$4.NAVBAR_NAV).length===0){$(document.body).children().on('mouseover',null,$.noop);}
this._element.focus();this._element.setAttribute('aria-expanded',true);$(this._menu).toggleClass(ClassName$4.SHOW);$(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN,relatedTarget));};_proto.show=function show(){if(this._element.disabled||$(this._element).hasClass(ClassName$4.DISABLED)||$(this._menu).hasClass(ClassName$4.SHOW)){return;}
var relatedTarget={relatedTarget:this._element};var showEvent=$.Event(Event$4.SHOW,relatedTarget);var parent=Dropdown._getParentFromElement(this._element);$(parent).trigger(showEvent);if(showEvent.isDefaultPrevented()){return;}
$(this._menu).toggleClass(ClassName$4.SHOW);$(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN,relatedTarget));};_proto.hide=function hide(){if(this._element.disabled||$(this._element).hasClass(ClassName$4.DISABLED)||!$(this._menu).hasClass(ClassName$4.SHOW)){return;}
var relatedTarget={relatedTarget:this._element};var hideEvent=$.Event(Event$4.HIDE,relatedTarget);var parent=Dropdown._getParentFromElement(this._element);$(parent).trigger(hideEvent);if(hideEvent.isDefaultPrevented()){return;}
$(this._menu).toggleClass(ClassName$4.SHOW);$(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN,relatedTarget));};_proto.dispose=function dispose(){$.removeData(this._element,DATA_KEY$4);$(this._element).off(EVENT_KEY$4);this._element=null;this._menu=null;if(this._popper!==null){this._popper.destroy();this._popper=null;}};_proto.update=function update(){this._inNavbar=this._detectNavbar();if(this._popper!==null){this._popper.scheduleUpdate();}};_proto._addEventListeners=function _addEventListeners(){var _this=this;$(this._element).on(Event$4.CLICK,function(event){event.preventDefault();event.stopPropagation();_this.toggle();});};_proto._getConfig=function _getConfig(config){config=_objectSpread({},this.constructor.Default,$(this._element).data(),config);Util.typeCheckConfig(NAME$4,config,this.constructor.DefaultType);return config;};_proto._getMenuElement=function _getMenuElement(){if(!this._menu){var parent=Dropdown._getParentFromElement(this._element);if(parent){this._menu=parent.querySelector(Selector$4.MENU);}}
return this._menu;};_proto._getPlacement=function _getPlacement(){var $parentDropdown=$(this._element.parentNode);var placement=AttachmentMap.BOTTOM;if($parentDropdown.hasClass(ClassName$4.DROPUP)){placement=AttachmentMap.TOP;if($(this._menu).hasClass(ClassName$4.MENURIGHT)){placement=AttachmentMap.TOPEND;}}else if($parentDropdown.hasClass(ClassName$4.DROPRIGHT)){placement=AttachmentMap.RIGHT;}else if($parentDropdown.hasClass(ClassName$4.DROPLEFT)){placement=AttachmentMap.LEFT;}else if($(this._menu).hasClass(ClassName$4.MENURIGHT)){placement=AttachmentMap.BOTTOMEND;}
return placement;};_proto._detectNavbar=function _detectNavbar(){return $(this._element).closest('.navbar').length>0;};_proto._getOffset=function _getOffset(){var _this2=this;var offset={};if(typeof this._config.offset==='function'){offset.fn=function(data){data.offsets=_objectSpread({},data.offsets,_this2._config.offset(data.offsets,_this2._element)||{});return data;};}else{offset.offset=this._config.offset;}
return offset;};_proto._getPopperConfig=function _getPopperConfig(){var popperConfig={placement:this._getPlacement(),modifiers:{offset:this._getOffset(),flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};if(this._config.display==='static'){popperConfig.modifiers.applyStyle={enabled:false};}
return popperConfig;};Dropdown._jQueryInterface=function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY$4);var _config=typeof config==='object'?config:null;if(!data){data=new Dropdown(this,_config);$(this).data(DATA_KEY$4,data);}
if(typeof config==='string'){if(typeof data[config]==='undefined'){throw new TypeError("No method named \""+config+"\"");}
data[config]();}});};Dropdown._clearMenus=function _clearMenus(event){if(event&&(event.which===RIGHT_MOUSE_BUTTON_WHICH||event.type==='keyup'&&event.which!==TAB_KEYCODE)){return;}
var toggles=[].slice.call(document.querySelectorAll(Selector$4.DATA_TOGGLE));for(var i=0,len=toggles.length;i<len;i++){var parent=Dropdown._getParentFromElement(toggles[i]);var context=$(toggles[i]).data(DATA_KEY$4);var relatedTarget={relatedTarget:toggles[i]};if(event&&event.type==='click'){relatedTarget.clickEvent=event;}
if(!context){continue;}
var dropdownMenu=context._menu;if(!$(parent).hasClass(ClassName$4.SHOW)){continue;}
if(event&&(event.type==='click'&&/input|textarea/i.test(event.target.tagName)||event.type==='keyup'&&event.which===TAB_KEYCODE)&&$.contains(parent,event.target)){continue;}
var hideEvent=$.Event(Event$4.HIDE,relatedTarget);$(parent).trigger(hideEvent);if(hideEvent.isDefaultPrevented()){continue;}
if('ontouchstart'in document.documentElement){$(document.body).children().off('mouseover',null,$.noop);}
toggles[i].setAttribute('aria-expanded','false');$(dropdownMenu).removeClass(ClassName$4.SHOW);$(parent).removeClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN,relatedTarget));}};Dropdown._getParentFromElement=function _getParentFromElement(element){var parent;var selector=Util.getSelectorFromElement(element);if(selector){parent=document.querySelector(selector);}
return parent||element.parentNode;};Dropdown._dataApiKeydownHandler=function _dataApiKeydownHandler(event){if(/input|textarea/i.test(event.target.tagName)?event.which===SPACE_KEYCODE||event.which!==ESCAPE_KEYCODE&&(event.which!==ARROW_DOWN_KEYCODE&&event.which!==ARROW_UP_KEYCODE||$(event.target).closest(Selector$4.MENU).length):!REGEXP_KEYDOWN.test(event.which)){return;}
event.preventDefault();event.stopPropagation();if(this.disabled||$(this).hasClass(ClassName$4.DISABLED)){return;}
var parent=Dropdown._getParentFromElement(this);var isActive=$(parent).hasClass(ClassName$4.SHOW);if(!isActive||isActive&&(event.which===ESCAPE_KEYCODE||event.which===SPACE_KEYCODE)){if(event.which===ESCAPE_KEYCODE){var toggle=parent.querySelector(Selector$4.DATA_TOGGLE);$(toggle).trigger('focus');}
$(this).trigger('click');return;}
var items=[].slice.call(parent.querySelectorAll(Selector$4.VISIBLE_ITEMS));if(items.length===0){return;}
var index=items.indexOf(event.target);if(event.which===ARROW_UP_KEYCODE&&index>0){index--;}
if(event.which===ARROW_DOWN_KEYCODE&&index<items.length-1){index++;}
if(index<0){index=0;}
items[index].focus();};_createClass(Dropdown,null,[{key:"VERSION",get:function get(){return VERSION$4;}},{key:"Default",get:function get(){return Default$2;}},{key:"DefaultType",get:function get(){return DefaultType$2;}}]);return Dropdown;}();$(document).on(Event$4.KEYDOWN_DATA_API,Selector$4.DATA_TOGGLE,Dropdown._dataApiKeydownHandler).on(Event$4.KEYDOWN_DATA_API,Selector$4.MENU,Dropdown._dataApiKeydownHandler).on(Event$4.CLICK_DATA_API+" "+Event$4.KEYUP_DATA_API,Dropdown._clearMenus).on(Event$4.CLICK_DATA_API,Selector$4.DATA_TOGGLE,function(event){event.preventDefault();event.stopPropagation();Dropdown._jQueryInterface.call($(this),'toggle');}).on(Event$4.CLICK_DATA_API,Selector$4.FORM_CHILD,function(e){e.stopPropagation();});$.fn[NAME$4]=Dropdown._jQueryInterface;$.fn[NAME$4].Constructor=Dropdown;$.fn[NAME$4].noConflict=function(){$.fn[NAME$4]=JQUERY_NO_CONFLICT$4;return Dropdown._jQueryInterface;};var NAME$5='modal';var VERSION$5='4.3.1';var DATA_KEY$5='bs.modal';var EVENT_KEY$5="."+DATA_KEY$5;var DATA_API_KEY$5='.data-api';var JQUERY_NO_CONFLICT$5=$.fn[NAME$5];var ESCAPE_KEYCODE$1=27;var Default$3={backdrop:true,keyboard:true,focus:true,show:true};var DefaultType$3={backdrop:'(boolean|string)',keyboard:'boolean',focus:'boolean',show:'boolean'};var Event$5={HIDE:"hide"+EVENT_KEY$5,HIDDEN:"hidden"+EVENT_KEY$5,SHOW:"show"+EVENT_KEY$5,SHOWN:"shown"+EVENT_KEY$5,FOCUSIN:"focusin"+EVENT_KEY$5,RESIZE:"resize"+EVENT_KEY$5,CLICK_DISMISS:"click.dismiss"+EVENT_KEY$5,KEYDOWN_DISMISS:"keydown.dismiss"+EVENT_KEY$5,MOUSEUP_DISMISS:"mouseup.dismiss"+EVENT_KEY$5,MOUSEDOWN_DISMISS:"mousedown.dismiss"+EVENT_KEY$5,CLICK_DATA_API:"click"+EVENT_KEY$5+DATA_API_KEY$5};var ClassName$5={SCROLLABLE:'modal-dialog-scrollable',SCROLLBAR_MEASURER:'modal-scrollbar-measure',BACKDROP:'modal-backdrop',OPEN:'modal-open',FADE:'fade',SHOW:'show'};var Selector$5={DIALOG:'.modal-dialog',MODAL_BODY:'.modal-body',DATA_TOGGLE:'[data-toggle="modal"]',DATA_DISMISS:'[data-dismiss="modal"]',FIXED_CONTENT:'.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',STICKY_CONTENT:'.sticky-top'};var Modal=function(){function Modal(element,config){this._config=this._getConfig(config);this._element=element;this._dialog=element.querySelector(Selector$5.DIALOG);this._backdrop=null;this._isShown=false;this._isBodyOverflowing=false;this._ignoreBackdropClick=false;this._isTransitioning=false;this._scrollbarWidth=0;}
var _proto=Modal.prototype;_proto.toggle=function toggle(relatedTarget){return this._isShown?this.hide():this.show(relatedTarget);};_proto.show=function show(relatedTarget){var _this=this;if(this._isShown||this._isTransitioning){return;}
if($(this._element).hasClass(ClassName$5.FADE)){this._isTransitioning=true;}
var showEvent=$.Event(Event$5.SHOW,{relatedTarget:relatedTarget});$(this._element).trigger(showEvent);if(this._isShown||showEvent.isDefaultPrevented()){return;}
this._isShown=true;this._checkScrollbar();this._setScrollbar();this._adjustDialog();this._setEscapeEvent();this._setResizeEvent();$(this._element).on(Event$5.CLICK_DISMISS,Selector$5.DATA_DISMISS,function(event){return _this.hide(event);});$(this._dialog).on(Event$5.MOUSEDOWN_DISMISS,function(){$(_this._element).one(Event$5.MOUSEUP_DISMISS,function(event){if($(event.target).is(_this._element)){_this._ignoreBackdropClick=true;}});});this._showBackdrop(function(){return _this._showElement(relatedTarget);});};_proto.hide=function hide(event){var _this2=this;if(event){event.preventDefault();}
if(!this._isShown||this._isTransitioning){return;}
var hideEvent=$.Event(Event$5.HIDE);$(this._element).trigger(hideEvent);if(!this._isShown||hideEvent.isDefaultPrevented()){return;}
this._isShown=false;var transition=$(this._element).hasClass(ClassName$5.FADE);if(transition){this._isTransitioning=true;}
this._setEscapeEvent();this._setResizeEvent();$(document).off(Event$5.FOCUSIN);$(this._element).removeClass(ClassName$5.SHOW);$(this._element).off(Event$5.CLICK_DISMISS);$(this._dialog).off(Event$5.MOUSEDOWN_DISMISS);if(transition){var transitionDuration=Util.getTransitionDurationFromElement(this._element);$(this._element).one(Util.TRANSITION_END,function(event){return _this2._hideModal(event);}).emulateTransitionEnd(transitionDuration);}else{this._hideModal();}};_proto.dispose=function dispose(){[window,this._element,this._dialog].forEach(function(htmlElement){return $(htmlElement).off(EVENT_KEY$5);});$(document).off(Event$5.FOCUSIN);$.removeData(this._element,DATA_KEY$5);this._config=null;this._element=null;this._dialog=null;this._backdrop=null;this._isShown=null;this._isBodyOverflowing=null;this._ignoreBackdropClick=null;this._isTransitioning=null;this._scrollbarWidth=null;};_proto.handleUpdate=function handleUpdate(){this._adjustDialog();};_proto._getConfig=function _getConfig(config){config=_objectSpread({},Default$3,config);Util.typeCheckConfig(NAME$5,config,DefaultType$3);return config;};_proto._showElement=function _showElement(relatedTarget){var _this3=this;var transition=$(this._element).hasClass(ClassName$5.FADE);if(!this._element.parentNode||this._element.parentNode.nodeType!==Node.ELEMENT_NODE){document.body.appendChild(this._element);}
this._element.style.display='block';this._element.removeAttribute('aria-hidden');this._element.setAttribute('aria-modal',true);if($(this._dialog).hasClass(ClassName$5.SCROLLABLE)){this._dialog.querySelector(Selector$5.MODAL_BODY).scrollTop=0;}else{this._element.scrollTop=0;}
if(transition){Util.reflow(this._element);}
$(this._element).addClass(ClassName$5.SHOW);if(this._config.focus){this._enforceFocus();}
var shownEvent=$.Event(Event$5.SHOWN,{relatedTarget:relatedTarget});var transitionComplete=function transitionComplete(){if(_this3._config.focus){_this3._element.focus();}
_this3._isTransitioning=false;$(_this3._element).trigger(shownEvent);};if(transition){var transitionDuration=Util.getTransitionDurationFromElement(this._dialog);$(this._dialog).one(Util.TRANSITION_END,transitionComplete).emulateTransitionEnd(transitionDuration);}else{transitionComplete();}};_proto._enforceFocus=function _enforceFocus(){var _this4=this;$(document).off(Event$5.FOCUSIN).on(Event$5.FOCUSIN,function(event){if(document!==event.target&&_this4._element!==event.target&&$(_this4._element).has(event.target).length===0){_this4._element.focus();}});};_proto._setEscapeEvent=function _setEscapeEvent(){var _this5=this;if(this._isShown&&this._config.keyboard){$(this._element).on(Event$5.KEYDOWN_DISMISS,function(event){if(event.which===ESCAPE_KEYCODE$1){event.preventDefault();_this5.hide();}});}else if(!this._isShown){$(this._element).off(Event$5.KEYDOWN_DISMISS);}};_proto._setResizeEvent=function _setResizeEvent(){var _this6=this;if(this._isShown){$(window).on(Event$5.RESIZE,function(event){return _this6.handleUpdate(event);});}else{$(window).off(Event$5.RESIZE);}};_proto._hideModal=function _hideModal(){var _this7=this;this._element.style.display='none';this._element.setAttribute('aria-hidden',true);this._element.removeAttribute('aria-modal');this._isTransitioning=false;this._showBackdrop(function(){$(document.body).removeClass(ClassName$5.OPEN);_this7._resetAdjustments();_this7._resetScrollbar();$(_this7._element).trigger(Event$5.HIDDEN);});};_proto._removeBackdrop=function _removeBackdrop(){if(this._backdrop){$(this._backdrop).remove();this._backdrop=null;}};_proto._showBackdrop=function _showBackdrop(callback){var _this8=this;var animate=$(this._element).hasClass(ClassName$5.FADE)?ClassName$5.FADE:'';if(this._isShown&&this._config.backdrop){this._backdrop=document.createElement('div');this._backdrop.className=ClassName$5.BACKDROP;if(animate){this._backdrop.classList.add(animate);}
$(this._backdrop).appendTo(document.body);$(this._element).on(Event$5.CLICK_DISMISS,function(event){if(_this8._ignoreBackdropClick){_this8._ignoreBackdropClick=false;return;}
if(event.target!==event.currentTarget){return;}
if(_this8._config.backdrop==='static'){_this8._element.focus();}else{_this8.hide();}});if(animate){Util.reflow(this._backdrop);}
$(this._backdrop).addClass(ClassName$5.SHOW);if(!callback){return;}
if(!animate){callback();return;}
var backdropTransitionDuration=Util.getTransitionDurationFromElement(this._backdrop);$(this._backdrop).one(Util.TRANSITION_END,callback).emulateTransitionEnd(backdropTransitionDuration);}else if(!this._isShown&&this._backdrop){$(this._backdrop).removeClass(ClassName$5.SHOW);var callbackRemove=function callbackRemove(){_this8._removeBackdrop();if(callback){callback();}};if($(this._element).hasClass(ClassName$5.FADE)){var _backdropTransitionDuration=Util.getTransitionDurationFromElement(this._backdrop);$(this._backdrop).one(Util.TRANSITION_END,callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);}else{callbackRemove();}}else if(callback){callback();}};_proto._adjustDialog=function _adjustDialog(){var isModalOverflowing=this._element.scrollHeight>document.documentElement.clientHeight;if(!this._isBodyOverflowing&&isModalOverflowing){this._element.style.paddingLeft=this._scrollbarWidth+"px";}
if(this._isBodyOverflowing&&!isModalOverflowing){this._element.style.paddingRight=this._scrollbarWidth+"px";}};_proto._resetAdjustments=function _resetAdjustments(){this._element.style.paddingLeft='';this._element.style.paddingRight='';};_proto._checkScrollbar=function _checkScrollbar(){var rect=document.body.getBoundingClientRect();this._isBodyOverflowing=rect.left+rect.right<window.innerWidth;this._scrollbarWidth=this._getScrollbarWidth();};_proto._setScrollbar=function _setScrollbar(){var _this9=this;if(this._isBodyOverflowing){var fixedContent=[].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));var stickyContent=[].slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT));$(fixedContent).each(function(index,element){var actualPadding=element.style.paddingRight;var calculatedPadding=$(element).css('padding-right');$(element).data('padding-right',actualPadding).css('padding-right',parseFloat(calculatedPadding)+_this9._scrollbarWidth+"px");});$(stickyContent).each(function(index,element){var actualMargin=element.style.marginRight;var calculatedMargin=$(element).css('margin-right');$(element).data('margin-right',actualMargin).css('margin-right',parseFloat(calculatedMargin)-_this9._scrollbarWidth+"px");});var actualPadding=document.body.style.paddingRight;var calculatedPadding=$(document.body).css('padding-right');$(document.body).data('padding-right',actualPadding).css('padding-right',parseFloat(calculatedPadding)+this._scrollbarWidth+"px");}
$(document.body).addClass(ClassName$5.OPEN);};_proto._resetScrollbar=function _resetScrollbar(){var fixedContent=[].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));$(fixedContent).each(function(index,element){var padding=$(element).data('padding-right');$(element).removeData('padding-right');element.style.paddingRight=padding?padding:'';});var elements=[].slice.call(document.querySelectorAll(""+Selector$5.STICKY_CONTENT));$(elements).each(function(index,element){var margin=$(element).data('margin-right');if(typeof margin!=='undefined'){$(element).css('margin-right',margin).removeData('margin-right');}});var padding=$(document.body).data('padding-right');$(document.body).removeData('padding-right');document.body.style.paddingRight=padding?padding:'';};_proto._getScrollbarWidth=function _getScrollbarWidth(){var scrollDiv=document.createElement('div');scrollDiv.className=ClassName$5.SCROLLBAR_MEASURER;document.body.appendChild(scrollDiv);var scrollbarWidth=scrollDiv.getBoundingClientRect().width-scrollDiv.clientWidth;document.body.removeChild(scrollDiv);return scrollbarWidth;};Modal._jQueryInterface=function _jQueryInterface(config,relatedTarget){return this.each(function(){var data=$(this).data(DATA_KEY$5);var _config=_objectSpread({},Default$3,$(this).data(),typeof config==='object'&&config?config:{});if(!data){data=new Modal(this,_config);$(this).data(DATA_KEY$5,data);}
if(typeof config==='string'){if(typeof data[config]==='undefined'){throw new TypeError("No method named \""+config+"\"");}
data[config](relatedTarget);}else if(_config.show){data.show(relatedTarget);}});};_createClass(Modal,null,[{key:"VERSION",get:function get(){return VERSION$5;}},{key:"Default",get:function get(){return Default$3;}}]);return Modal;}();$(document).on(Event$5.CLICK_DATA_API,Selector$5.DATA_TOGGLE,function(event){var _this10=this;var target;var selector=Util.getSelectorFromElement(this);if(selector){target=document.querySelector(selector);}
var config=$(target).data(DATA_KEY$5)?'toggle':_objectSpread({},$(target).data(),$(this).data());if(this.tagName==='A'||this.tagName==='AREA'){event.preventDefault();}
var $target=$(target).one(Event$5.SHOW,function(showEvent){if(showEvent.isDefaultPrevented()){return;}
$target.one(Event$5.HIDDEN,function(){if($(_this10).is(':visible')){_this10.focus();}});});Modal._jQueryInterface.call($(target),config,this);});$.fn[NAME$5]=Modal._jQueryInterface;$.fn[NAME$5].Constructor=Modal;$.fn[NAME$5].noConflict=function(){$.fn[NAME$5]=JQUERY_NO_CONFLICT$5;return Modal._jQueryInterface;};var uriAttrs=['background','cite','href','itemtype','longdesc','poster','src','xlink:href'];var ARIA_ATTRIBUTE_PATTERN=/^aria-[\w-]*$/i;var DefaultWhitelist={'*':['class','dir','id','lang','role',ARIA_ATTRIBUTE_PATTERN],a:['target','href','title','rel'],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:['src','alt','title','width','height'],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]};var SAFE_URL_PATTERN=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;var DATA_URL_PATTERN=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;function allowedAttribute(attr,allowedAttributeList){var attrName=attr.nodeName.toLowerCase();if(allowedAttributeList.indexOf(attrName)!==-1){if(uriAttrs.indexOf(attrName)!==-1){return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN)||attr.nodeValue.match(DATA_URL_PATTERN));}
return true;}
var regExp=allowedAttributeList.filter(function(attrRegex){return attrRegex instanceof RegExp;});for(var i=0,l=regExp.length;i<l;i++){if(attrName.match(regExp[i])){return true;}}
return false;}
function sanitizeHtml(unsafeHtml,whiteList,sanitizeFn){if(unsafeHtml.length===0){return unsafeHtml;}
if(sanitizeFn&&typeof sanitizeFn==='function'){return sanitizeFn(unsafeHtml);}
var domParser=new window.DOMParser();var createdDocument=domParser.parseFromString(unsafeHtml,'text/html');var whitelistKeys=Object.keys(whiteList);var elements=[].slice.call(createdDocument.body.querySelectorAll('*'));var _loop=function _loop(i,len){var el=elements[i];var elName=el.nodeName.toLowerCase();if(whitelistKeys.indexOf(el.nodeName.toLowerCase())===-1){el.parentNode.removeChild(el);return"continue";}
var attributeList=[].slice.call(el.attributes);var whitelistedAttributes=[].concat(whiteList['*']||[],whiteList[elName]||[]);attributeList.forEach(function(attr){if(!allowedAttribute(attr,whitelistedAttributes)){el.removeAttribute(attr.nodeName);}});};for(var i=0,len=elements.length;i<len;i++){var _ret=_loop(i,len);if(_ret==="continue")continue;}
return createdDocument.body.innerHTML;}
var NAME$6='tooltip';var VERSION$6='4.3.1';var DATA_KEY$6='bs.tooltip';var EVENT_KEY$6="."+DATA_KEY$6;var JQUERY_NO_CONFLICT$6=$.fn[NAME$6];var CLASS_PREFIX='bs-tooltip';var BSCLS_PREFIX_REGEX=new RegExp("(^|\\s)"+CLASS_PREFIX+"\\S+",'g');var DISALLOWED_ATTRIBUTES=['sanitize','whiteList','sanitizeFn'];var DefaultType$4={animation:'boolean',template:'string',title:'(string|element|function)',trigger:'string',delay:'(number|object)',html:'boolean',selector:'(string|boolean)',placement:'(string|function)',offset:'(number|string|function)',container:'(string|element|boolean)',fallbackPlacement:'(string|array)',boundary:'(string|element)',sanitize:'boolean',sanitizeFn:'(null|function)',whiteList:'object'};var AttachmentMap$1={AUTO:'auto',TOP:'top',RIGHT:'right',BOTTOM:'bottom',LEFT:'left'};var Default$4={animation:true,template:'<div class="tooltip" role="tooltip">'+'<div class="arrow"></div>'+'<div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:false,selector:false,placement:'top',offset:0,container:false,fallbackPlacement:'flip',boundary:'scrollParent',sanitize:true,sanitizeFn:null,whiteList:DefaultWhitelist};var HoverState={SHOW:'show',OUT:'out'};var Event$6={HIDE:"hide"+EVENT_KEY$6,HIDDEN:"hidden"+EVENT_KEY$6,SHOW:"show"+EVENT_KEY$6,SHOWN:"shown"+EVENT_KEY$6,INSERTED:"inserted"+EVENT_KEY$6,CLICK:"click"+EVENT_KEY$6,FOCUSIN:"focusin"+EVENT_KEY$6,FOCUSOUT:"focusout"+EVENT_KEY$6,MOUSEENTER:"mouseenter"+EVENT_KEY$6,MOUSELEAVE:"mouseleave"+EVENT_KEY$6};var ClassName$6={FADE:'fade',SHOW:'show'};var Selector$6={TOOLTIP:'.tooltip',TOOLTIP_INNER:'.tooltip-inner',ARROW:'.arrow'};var Trigger={HOVER:'hover',FOCUS:'focus',CLICK:'click',MANUAL:'manual'};var Tooltip=function(){function Tooltip(element,config){if(typeof Popper==='undefined'){throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');}
this._isEnabled=true;this._timeout=0;this._hoverState='';this._activeTrigger={};this._popper=null;this.element=element;this.config=this._getConfig(config);this.tip=null;this._setListeners();}
var _proto=Tooltip.prototype;_proto.enable=function enable(){this._isEnabled=true;};_proto.disable=function disable(){this._isEnabled=false;};_proto.toggleEnabled=function toggleEnabled(){this._isEnabled=!this._isEnabled;};_proto.toggle=function toggle(event){if(!this._isEnabled){return;}
if(event){var dataKey=this.constructor.DATA_KEY;var context=$(event.currentTarget).data(dataKey);if(!context){context=new this.constructor(event.currentTarget,this._getDelegateConfig());$(event.currentTarget).data(dataKey,context);}
context._activeTrigger.click=!context._activeTrigger.click;if(context._isWithActiveTrigger()){context._enter(null,context);}else{context._leave(null,context);}}else{if($(this.getTipElement()).hasClass(ClassName$6.SHOW)){this._leave(null,this);return;}
this._enter(null,this);}};_proto.dispose=function dispose(){clearTimeout(this._timeout);$.removeData(this.element,this.constructor.DATA_KEY);$(this.element).off(this.constructor.EVENT_KEY);$(this.element).closest('.modal').off('hide.bs.modal');if(this.tip){$(this.tip).remove();}
this._isEnabled=null;this._timeout=null;this._hoverState=null;this._activeTrigger=null;if(this._popper!==null){this._popper.destroy();}
this._popper=null;this.element=null;this.config=null;this.tip=null;};_proto.show=function show(){var _this=this;if($(this.element).css('display')==='none'){throw new Error('Please use show on visible elements');}
var showEvent=$.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){$(this.element).trigger(showEvent);var shadowRoot=Util.findShadowRoot(this.element);var isInTheDom=$.contains(shadowRoot!==null?shadowRoot:this.element.ownerDocument.documentElement,this.element);if(showEvent.isDefaultPrevented()||!isInTheDom){return;}
var tip=this.getTipElement();var tipId=Util.getUID(this.constructor.NAME);tip.setAttribute('id',tipId);this.element.setAttribute('aria-describedby',tipId);this.setContent();if(this.config.animation){$(tip).addClass(ClassName$6.FADE);}
var placement=typeof this.config.placement==='function'?this.config.placement.call(this,tip,this.element):this.config.placement;var attachment=this._getAttachment(placement);this.addAttachmentClass(attachment);var container=this._getContainer();$(tip).data(this.constructor.DATA_KEY,this);if(!$.contains(this.element.ownerDocument.documentElement,this.tip)){$(tip).appendTo(container);}
$(this.element).trigger(this.constructor.Event.INSERTED);this._popper=new Popper(this.element,tip,{placement:attachment,modifiers:{offset:this._getOffset(),flip:{behavior:this.config.fallbackPlacement},arrow:{element:Selector$6.ARROW},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function onCreate(data){if(data.originalPlacement!==data.placement){_this._handlePopperPlacementChange(data);}},onUpdate:function onUpdate(data){return _this._handlePopperPlacementChange(data);}});$(tip).addClass(ClassName$6.SHOW);if('ontouchstart'in document.documentElement){$(document.body).children().on('mouseover',null,$.noop);}
var complete=function complete(){if(_this.config.animation){_this._fixTransition();}
var prevHoverState=_this._hoverState;_this._hoverState=null;$(_this.element).trigger(_this.constructor.Event.SHOWN);if(prevHoverState===HoverState.OUT){_this._leave(null,_this);}};if($(this.tip).hasClass(ClassName$6.FADE)){var transitionDuration=Util.getTransitionDurationFromElement(this.tip);$(this.tip).one(Util.TRANSITION_END,complete).emulateTransitionEnd(transitionDuration);}else{complete();}}};_proto.hide=function hide(callback){var _this2=this;var tip=this.getTipElement();var hideEvent=$.Event(this.constructor.Event.HIDE);var complete=function complete(){if(_this2._hoverState!==HoverState.SHOW&&tip.parentNode){tip.parentNode.removeChild(tip);}
_this2._cleanTipClass();_this2.element.removeAttribute('aria-describedby');$(_this2.element).trigger(_this2.constructor.Event.HIDDEN);if(_this2._popper!==null){_this2._popper.destroy();}
if(callback){callback();}};$(this.element).trigger(hideEvent);if(hideEvent.isDefaultPrevented()){return;}
$(tip).removeClass(ClassName$6.SHOW);if('ontouchstart'in document.documentElement){$(document.body).children().off('mouseover',null,$.noop);}
this._activeTrigger[Trigger.CLICK]=false;this._activeTrigger[Trigger.FOCUS]=false;this._activeTrigger[Trigger.HOVER]=false;if($(this.tip).hasClass(ClassName$6.FADE)){var transitionDuration=Util.getTransitionDurationFromElement(tip);$(tip).one(Util.TRANSITION_END,complete).emulateTransitionEnd(transitionDuration);}else{complete();}
this._hoverState='';};_proto.update=function update(){if(this._popper!==null){this._popper.scheduleUpdate();}};_proto.isWithContent=function isWithContent(){return Boolean(this.getTitle());};_proto.addAttachmentClass=function addAttachmentClass(attachment){$(this.getTipElement()).addClass(CLASS_PREFIX+"-"+attachment);};_proto.getTipElement=function getTipElement(){this.tip=this.tip||$(this.config.template)[0];return this.tip;};_proto.setContent=function setContent(){var tip=this.getTipElement();this.setElementContent($(tip.querySelectorAll(Selector$6.TOOLTIP_INNER)),this.getTitle());$(tip).removeClass(ClassName$6.FADE+" "+ClassName$6.SHOW);};_proto.setElementContent=function setElementContent($element,content){if(typeof content==='object'&&(content.nodeType||content.jquery)){if(this.config.html){if(!$(content).parent().is($element)){$element.empty().append(content);}}else{$element.text($(content).text());}
return;}
if(this.config.html){if(this.config.sanitize){content=sanitizeHtml(content,this.config.whiteList,this.config.sanitizeFn);}
$element.html(content);}else{$element.text(content);}};_proto.getTitle=function getTitle(){var title=this.element.getAttribute('data-original-title');if(!title){title=typeof this.config.title==='function'?this.config.title.call(this.element):this.config.title;}
return title;};_proto._getOffset=function _getOffset(){var _this3=this;var offset={};if(typeof this.config.offset==='function'){offset.fn=function(data){data.offsets=_objectSpread({},data.offsets,_this3.config.offset(data.offsets,_this3.element)||{});return data;};}else{offset.offset=this.config.offset;}
return offset;};_proto._getContainer=function _getContainer(){if(this.config.container===false){return document.body;}
if(Util.isElement(this.config.container)){return $(this.config.container);}
return $(document).find(this.config.container);};_proto._getAttachment=function _getAttachment(placement){return AttachmentMap$1[placement.toUpperCase()];};_proto._setListeners=function _setListeners(){var _this4=this;var triggers=this.config.trigger.split(' ');triggers.forEach(function(trigger){if(trigger==='click'){$(_this4.element).on(_this4.constructor.Event.CLICK,_this4.config.selector,function(event){return _this4.toggle(event);});}else if(trigger!==Trigger.MANUAL){var eventIn=trigger===Trigger.HOVER?_this4.constructor.Event.MOUSEENTER:_this4.constructor.Event.FOCUSIN;var eventOut=trigger===Trigger.HOVER?_this4.constructor.Event.MOUSELEAVE:_this4.constructor.Event.FOCUSOUT;$(_this4.element).on(eventIn,_this4.config.selector,function(event){return _this4._enter(event);}).on(eventOut,_this4.config.selector,function(event){return _this4._leave(event);});}});$(this.element).closest('.modal').on('hide.bs.modal',function(){if(_this4.element){_this4.hide();}});if(this.config.selector){this.config=_objectSpread({},this.config,{trigger:'manual',selector:''});}else{this._fixTitle();}};_proto._fixTitle=function _fixTitle(){var titleType=typeof this.element.getAttribute('data-original-title');if(this.element.getAttribute('title')||titleType!=='string'){this.element.setAttribute('data-original-title',this.element.getAttribute('title')||'');this.element.setAttribute('title','');}};_proto._enter=function _enter(event,context){var dataKey=this.constructor.DATA_KEY;context=context||$(event.currentTarget).data(dataKey);if(!context){context=new this.constructor(event.currentTarget,this._getDelegateConfig());$(event.currentTarget).data(dataKey,context);}
if(event){context._activeTrigger[event.type==='focusin'?Trigger.FOCUS:Trigger.HOVER]=true;}
if($(context.getTipElement()).hasClass(ClassName$6.SHOW)||context._hoverState===HoverState.SHOW){context._hoverState=HoverState.SHOW;return;}
clearTimeout(context._timeout);context._hoverState=HoverState.SHOW;if(!context.config.delay||!context.config.delay.show){context.show();return;}
context._timeout=setTimeout(function(){if(context._hoverState===HoverState.SHOW){context.show();}},context.config.delay.show);};_proto._leave=function _leave(event,context){var dataKey=this.constructor.DATA_KEY;context=context||$(event.currentTarget).data(dataKey);if(!context){context=new this.constructor(event.currentTarget,this._getDelegateConfig());$(event.currentTarget).data(dataKey,context);}
if(event){context._activeTrigger[event.type==='focusout'?Trigger.FOCUS:Trigger.HOVER]=false;}
if(context._isWithActiveTrigger()){return;}
clearTimeout(context._timeout);context._hoverState=HoverState.OUT;if(!context.config.delay||!context.config.delay.hide){context.hide();return;}
context._timeout=setTimeout(function(){if(context._hoverState===HoverState.OUT){context.hide();}},context.config.delay.hide);};_proto._isWithActiveTrigger=function _isWithActiveTrigger(){for(var trigger in this._activeTrigger){if(this._activeTrigger[trigger]){return true;}}
return false;};_proto._getConfig=function _getConfig(config){var dataAttributes=$(this.element).data();Object.keys(dataAttributes).forEach(function(dataAttr){if(DISALLOWED_ATTRIBUTES.indexOf(dataAttr)!==-1){delete dataAttributes[dataAttr];}});config=_objectSpread({},this.constructor.Default,dataAttributes,typeof config==='object'&&config?config:{});if(typeof config.delay==='number'){config.delay={show:config.delay,hide:config.delay};}
if(typeof config.title==='number'){config.title=config.title.toString();}
if(typeof config.content==='number'){config.content=config.content.toString();}
Util.typeCheckConfig(NAME$6,config,this.constructor.DefaultType);if(config.sanitize){config.template=sanitizeHtml(config.template,config.whiteList,config.sanitizeFn);}
return config;};_proto._getDelegateConfig=function _getDelegateConfig(){var config={};if(this.config){for(var key in this.config){if(this.constructor.Default[key]!==this.config[key]){config[key]=this.config[key];}}}
return config;};_proto._cleanTipClass=function _cleanTipClass(){var $tip=$(this.getTipElement());var tabClass=$tip.attr('class').match(BSCLS_PREFIX_REGEX);if(tabClass!==null&&tabClass.length){$tip.removeClass(tabClass.join(''));}};_proto._handlePopperPlacementChange=function _handlePopperPlacementChange(popperData){var popperInstance=popperData.instance;this.tip=popperInstance.popper;this._cleanTipClass();this.addAttachmentClass(this._getAttachment(popperData.placement));};_proto._fixTransition=function _fixTransition(){var tip=this.getTipElement();var initConfigAnimation=this.config.animation;if(tip.getAttribute('x-placement')!==null){return;}
$(tip).removeClass(ClassName$6.FADE);this.config.animation=false;this.hide();this.show();this.config.animation=initConfigAnimation;};Tooltip._jQueryInterface=function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY$6);var _config=typeof config==='object'&&config;if(!data&&/dispose|hide/.test(config)){return;}
if(!data){data=new Tooltip(this,_config);$(this).data(DATA_KEY$6,data);}
if(typeof config==='string'){if(typeof data[config]==='undefined'){throw new TypeError("No method named \""+config+"\"");}
data[config]();}});};_createClass(Tooltip,null,[{key:"VERSION",get:function get(){return VERSION$6;}},{key:"Default",get:function get(){return Default$4;}},{key:"NAME",get:function get(){return NAME$6;}},{key:"DATA_KEY",get:function get(){return DATA_KEY$6;}},{key:"Event",get:function get(){return Event$6;}},{key:"EVENT_KEY",get:function get(){return EVENT_KEY$6;}},{key:"DefaultType",get:function get(){return DefaultType$4;}}]);return Tooltip;}();$.fn[NAME$6]=Tooltip._jQueryInterface;$.fn[NAME$6].Constructor=Tooltip;$.fn[NAME$6].noConflict=function(){$.fn[NAME$6]=JQUERY_NO_CONFLICT$6;return Tooltip._jQueryInterface;};var NAME$7='popover';var VERSION$7='4.3.1';var DATA_KEY$7='bs.popover';var EVENT_KEY$7="."+DATA_KEY$7;var JQUERY_NO_CONFLICT$7=$.fn[NAME$7];var CLASS_PREFIX$1='bs-popover';var BSCLS_PREFIX_REGEX$1=new RegExp("(^|\\s)"+CLASS_PREFIX$1+"\\S+",'g');var Default$5=_objectSpread({},Tooltip.Default,{placement:'right',trigger:'click',content:'',template:'<div class="popover" role="tooltip">'+'<div class="arrow"></div>'+'<h3 class="popover-header"></h3>'+'<div class="popover-body"></div></div>'});var DefaultType$5=_objectSpread({},Tooltip.DefaultType,{content:'(string|element|function)'});var ClassName$7={FADE:'fade',SHOW:'show'};var Selector$7={TITLE:'.popover-header',CONTENT:'.popover-body'};var Event$7={HIDE:"hide"+EVENT_KEY$7,HIDDEN:"hidden"+EVENT_KEY$7,SHOW:"show"+EVENT_KEY$7,SHOWN:"shown"+EVENT_KEY$7,INSERTED:"inserted"+EVENT_KEY$7,CLICK:"click"+EVENT_KEY$7,FOCUSIN:"focusin"+EVENT_KEY$7,FOCUSOUT:"focusout"+EVENT_KEY$7,MOUSEENTER:"mouseenter"+EVENT_KEY$7,MOUSELEAVE:"mouseleave"+EVENT_KEY$7};var Popover=function(_Tooltip){_inheritsLoose(Popover,_Tooltip);function Popover(){return _Tooltip.apply(this,arguments)||this;}
var _proto=Popover.prototype;_proto.isWithContent=function isWithContent(){return this.getTitle()||this._getContent();};_proto.addAttachmentClass=function addAttachmentClass(attachment){$(this.getTipElement()).addClass(CLASS_PREFIX$1+"-"+attachment);};_proto.getTipElement=function getTipElement(){this.tip=this.tip||$(this.config.template)[0];return this.tip;};_proto.setContent=function setContent(){var $tip=$(this.getTipElement());this.setElementContent($tip.find(Selector$7.TITLE),this.getTitle());var content=this._getContent();if(typeof content==='function'){content=content.call(this.element);}
this.setElementContent($tip.find(Selector$7.CONTENT),content);$tip.removeClass(ClassName$7.FADE+" "+ClassName$7.SHOW);};_proto._getContent=function _getContent(){return this.element.getAttribute('data-content')||this.config.content;};_proto._cleanTipClass=function _cleanTipClass(){var $tip=$(this.getTipElement());var tabClass=$tip.attr('class').match(BSCLS_PREFIX_REGEX$1);if(tabClass!==null&&tabClass.length>0){$tip.removeClass(tabClass.join(''));}};Popover._jQueryInterface=function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY$7);var _config=typeof config==='object'?config:null;if(!data&&/dispose|hide/.test(config)){return;}
if(!data){data=new Popover(this,_config);$(this).data(DATA_KEY$7,data);}
if(typeof config==='string'){if(typeof data[config]==='undefined'){throw new TypeError("No method named \""+config+"\"");}
data[config]();}});};_createClass(Popover,null,[{key:"VERSION",get:function get(){return VERSION$7;}},{key:"Default",get:function get(){return Default$5;}},{key:"NAME",get:function get(){return NAME$7;}},{key:"DATA_KEY",get:function get(){return DATA_KEY$7;}},{key:"Event",get:function get(){return Event$7;}},{key:"EVENT_KEY",get:function get(){return EVENT_KEY$7;}},{key:"DefaultType",get:function get(){return DefaultType$5;}}]);return Popover;}(Tooltip);$.fn[NAME$7]=Popover._jQueryInterface;$.fn[NAME$7].Constructor=Popover;$.fn[NAME$7].noConflict=function(){$.fn[NAME$7]=JQUERY_NO_CONFLICT$7;return Popover._jQueryInterface;};var NAME$8='scrollspy';var VERSION$8='4.3.1';var DATA_KEY$8='bs.scrollspy';var EVENT_KEY$8="."+DATA_KEY$8;var DATA_API_KEY$6='.data-api';var JQUERY_NO_CONFLICT$8=$.fn[NAME$8];var Default$6={offset:10,method:'auto',target:''};var DefaultType$6={offset:'number',method:'string',target:'(string|element)'};var Event$8={ACTIVATE:"activate"+EVENT_KEY$8,SCROLL:"scroll"+EVENT_KEY$8,LOAD_DATA_API:"load"+EVENT_KEY$8+DATA_API_KEY$6};var ClassName$8={DROPDOWN_ITEM:'dropdown-item',DROPDOWN_MENU:'dropdown-menu',ACTIVE:'active'};var Selector$8={DATA_SPY:'[data-spy="scroll"]',ACTIVE:'.active',NAV_LIST_GROUP:'.nav, .list-group',NAV_LINKS:'.nav-link',NAV_ITEMS:'.nav-item',LIST_ITEMS:'.list-group-item',DROPDOWN:'.dropdown',DROPDOWN_ITEMS:'.dropdown-item',DROPDOWN_TOGGLE:'.dropdown-toggle'};var OffsetMethod={OFFSET:'offset',POSITION:'position'};var ScrollSpy=function(){function ScrollSpy(element,config){var _this=this;this._element=element;this._scrollElement=element.tagName==='BODY'?window:element;this._config=this._getConfig(config);this._selector=this._config.target+" "+Selector$8.NAV_LINKS+","+(this._config.target+" "+Selector$8.LIST_ITEMS+",")+(this._config.target+" "+Selector$8.DROPDOWN_ITEMS);this._offsets=[];this._targets=[];this._activeTarget=null;this._scrollHeight=0;$(this._scrollElement).on(Event$8.SCROLL,function(event){return _this._process(event);});this.refresh();this._process();}
var _proto=ScrollSpy.prototype;_proto.refresh=function refresh(){var _this2=this;var autoMethod=this._scrollElement===this._scrollElement.window?OffsetMethod.OFFSET:OffsetMethod.POSITION;var offsetMethod=this._config.method==='auto'?autoMethod:this._config.method;var offsetBase=offsetMethod===OffsetMethod.POSITION?this._getScrollTop():0;this._offsets=[];this._targets=[];this._scrollHeight=this._getScrollHeight();var targets=[].slice.call(document.querySelectorAll(this._selector));targets.map(function(element){var target;var targetSelector=Util.getSelectorFromElement(element);if(targetSelector){target=document.querySelector(targetSelector);}
if(target){var targetBCR=target.getBoundingClientRect();if(targetBCR.width||targetBCR.height){return[$(target)[offsetMethod]().top+offsetBase,targetSelector];}}
return null;}).filter(function(item){return item;}).sort(function(a,b){return a[0]-b[0];}).forEach(function(item){_this2._offsets.push(item[0]);_this2._targets.push(item[1]);});};_proto.dispose=function dispose(){$.removeData(this._element,DATA_KEY$8);$(this._scrollElement).off(EVENT_KEY$8);this._element=null;this._scrollElement=null;this._config=null;this._selector=null;this._offsets=null;this._targets=null;this._activeTarget=null;this._scrollHeight=null;};_proto._getConfig=function _getConfig(config){config=_objectSpread({},Default$6,typeof config==='object'&&config?config:{});if(typeof config.target!=='string'){var id=$(config.target).attr('id');if(!id){id=Util.getUID(NAME$8);$(config.target).attr('id',id);}
config.target="#"+id;}
Util.typeCheckConfig(NAME$8,config,DefaultType$6);return config;};_proto._getScrollTop=function _getScrollTop(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop;};_proto._getScrollHeight=function _getScrollHeight(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);};_proto._getOffsetHeight=function _getOffsetHeight(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height;};_proto._process=function _process(){var scrollTop=this._getScrollTop()+this._config.offset;var scrollHeight=this._getScrollHeight();var maxScroll=this._config.offset+scrollHeight-this._getOffsetHeight();if(this._scrollHeight!==scrollHeight){this.refresh();}
if(scrollTop>=maxScroll){var target=this._targets[this._targets.length-1];if(this._activeTarget!==target){this._activate(target);}
return;}
if(this._activeTarget&&scrollTop<this._offsets[0]&&this._offsets[0]>0){this._activeTarget=null;this._clear();return;}
var offsetLength=this._offsets.length;for(var i=offsetLength;i--;){var isActiveTarget=this._activeTarget!==this._targets[i]&&scrollTop>=this._offsets[i]&&(typeof this._offsets[i+1]==='undefined'||scrollTop<this._offsets[i+1]);if(isActiveTarget){this._activate(this._targets[i]);}}};_proto._activate=function _activate(target){this._activeTarget=target;this._clear();var queries=this._selector.split(',').map(function(selector){return selector+"[data-target=\""+target+"\"],"+selector+"[href=\""+target+"\"]";});var $link=$([].slice.call(document.querySelectorAll(queries.join(','))));if($link.hasClass(ClassName$8.DROPDOWN_ITEM)){$link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);$link.addClass(ClassName$8.ACTIVE);}else{$link.addClass(ClassName$8.ACTIVE);$link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS+", "+Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE);$link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);}
$(this._scrollElement).trigger(Event$8.ACTIVATE,{relatedTarget:target});};_proto._clear=function _clear(){[].slice.call(document.querySelectorAll(this._selector)).filter(function(node){return node.classList.contains(ClassName$8.ACTIVE);}).forEach(function(node){return node.classList.remove(ClassName$8.ACTIVE);});};ScrollSpy._jQueryInterface=function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY$8);var _config=typeof config==='object'&&config;if(!data){data=new ScrollSpy(this,_config);$(this).data(DATA_KEY$8,data);}
if(typeof config==='string'){if(typeof data[config]==='undefined'){throw new TypeError("No method named \""+config+"\"");}
data[config]();}});};_createClass(ScrollSpy,null,[{key:"VERSION",get:function get(){return VERSION$8;}},{key:"Default",get:function get(){return Default$6;}}]);return ScrollSpy;}();$(window).on(Event$8.LOAD_DATA_API,function(){var scrollSpys=[].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));var scrollSpysLength=scrollSpys.length;for(var i=scrollSpysLength;i--;){var $spy=$(scrollSpys[i]);ScrollSpy._jQueryInterface.call($spy,$spy.data());}});$.fn[NAME$8]=ScrollSpy._jQueryInterface;$.fn[NAME$8].Constructor=ScrollSpy;$.fn[NAME$8].noConflict=function(){$.fn[NAME$8]=JQUERY_NO_CONFLICT$8;return ScrollSpy._jQueryInterface;};var NAME$9='tab';var VERSION$9='4.3.1';var DATA_KEY$9='bs.tab';var EVENT_KEY$9="."+DATA_KEY$9;var DATA_API_KEY$7='.data-api';var JQUERY_NO_CONFLICT$9=$.fn[NAME$9];var Event$9={HIDE:"hide"+EVENT_KEY$9,HIDDEN:"hidden"+EVENT_KEY$9,SHOW:"show"+EVENT_KEY$9,SHOWN:"shown"+EVENT_KEY$9,CLICK_DATA_API:"click"+EVENT_KEY$9+DATA_API_KEY$7};var ClassName$9={DROPDOWN_MENU:'dropdown-menu',ACTIVE:'active',DISABLED:'disabled',FADE:'fade',SHOW:'show'};var Selector$9={DROPDOWN:'.dropdown',NAV_LIST_GROUP:'.nav, .list-group',ACTIVE:'.active',ACTIVE_UL:'> li > .active',DATA_TOGGLE:'[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',DROPDOWN_TOGGLE:'.dropdown-toggle',DROPDOWN_ACTIVE_CHILD:'> .dropdown-menu .active'};var Tab=function(){function Tab(element){this._element=element;}
var _proto=Tab.prototype;_proto.show=function show(){var _this=this;if(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&$(this._element).hasClass(ClassName$9.ACTIVE)||$(this._element).hasClass(ClassName$9.DISABLED)){return;}
var target;var previous;var listElement=$(this._element).closest(Selector$9.NAV_LIST_GROUP)[0];var selector=Util.getSelectorFromElement(this._element);if(listElement){var itemSelector=listElement.nodeName==='UL'||listElement.nodeName==='OL'?Selector$9.ACTIVE_UL:Selector$9.ACTIVE;previous=$.makeArray($(listElement).find(itemSelector));previous=previous[previous.length-1];}
var hideEvent=$.Event(Event$9.HIDE,{relatedTarget:this._element});var showEvent=$.Event(Event$9.SHOW,{relatedTarget:previous});if(previous){$(previous).trigger(hideEvent);}
$(this._element).trigger(showEvent);if(showEvent.isDefaultPrevented()||hideEvent.isDefaultPrevented()){return;}
if(selector){target=document.querySelector(selector);}
this._activate(this._element,listElement);var complete=function complete(){var hiddenEvent=$.Event(Event$9.HIDDEN,{relatedTarget:_this._element});var shownEvent=$.Event(Event$9.SHOWN,{relatedTarget:previous});$(previous).trigger(hiddenEvent);$(_this._element).trigger(shownEvent);};if(target){this._activate(target,target.parentNode,complete);}else{complete();}};_proto.dispose=function dispose(){$.removeData(this._element,DATA_KEY$9);this._element=null;};_proto._activate=function _activate(element,container,callback){var _this2=this;var activeElements=container&&(container.nodeName==='UL'||container.nodeName==='OL')?$(container).find(Selector$9.ACTIVE_UL):$(container).children(Selector$9.ACTIVE);var active=activeElements[0];var isTransitioning=callback&&active&&$(active).hasClass(ClassName$9.FADE);var complete=function complete(){return _this2._transitionComplete(element,active,callback);};if(active&&isTransitioning){var transitionDuration=Util.getTransitionDurationFromElement(active);$(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END,complete).emulateTransitionEnd(transitionDuration);}else{complete();}};_proto._transitionComplete=function _transitionComplete(element,active,callback){if(active){$(active).removeClass(ClassName$9.ACTIVE);var dropdownChild=$(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0];if(dropdownChild){$(dropdownChild).removeClass(ClassName$9.ACTIVE);}
if(active.getAttribute('role')==='tab'){active.setAttribute('aria-selected',false);}}
$(element).addClass(ClassName$9.ACTIVE);if(element.getAttribute('role')==='tab'){element.setAttribute('aria-selected',true);}
Util.reflow(element);if(element.classList.contains(ClassName$9.FADE)){element.classList.add(ClassName$9.SHOW);}
if(element.parentNode&&$(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)){var dropdownElement=$(element).closest(Selector$9.DROPDOWN)[0];if(dropdownElement){var dropdownToggleList=[].slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));$(dropdownToggleList).addClass(ClassName$9.ACTIVE);}
element.setAttribute('aria-expanded',true);}
if(callback){callback();}};Tab._jQueryInterface=function _jQueryInterface(config){return this.each(function(){var $this=$(this);var data=$this.data(DATA_KEY$9);if(!data){data=new Tab(this);$this.data(DATA_KEY$9,data);}
if(typeof config==='string'){if(typeof data[config]==='undefined'){throw new TypeError("No method named \""+config+"\"");}
data[config]();}});};_createClass(Tab,null,[{key:"VERSION",get:function get(){return VERSION$9;}}]);return Tab;}();$(document).on(Event$9.CLICK_DATA_API,Selector$9.DATA_TOGGLE,function(event){event.preventDefault();Tab._jQueryInterface.call($(this),'show');});$.fn[NAME$9]=Tab._jQueryInterface;$.fn[NAME$9].Constructor=Tab;$.fn[NAME$9].noConflict=function(){$.fn[NAME$9]=JQUERY_NO_CONFLICT$9;return Tab._jQueryInterface;};var NAME$a='toast';var VERSION$a='4.3.1';var DATA_KEY$a='bs.toast';var EVENT_KEY$a="."+DATA_KEY$a;var JQUERY_NO_CONFLICT$a=$.fn[NAME$a];var Event$a={CLICK_DISMISS:"click.dismiss"+EVENT_KEY$a,HIDE:"hide"+EVENT_KEY$a,HIDDEN:"hidden"+EVENT_KEY$a,SHOW:"show"+EVENT_KEY$a,SHOWN:"shown"+EVENT_KEY$a};var ClassName$a={FADE:'fade',HIDE:'hide',SHOW:'show',SHOWING:'showing'};var DefaultType$7={animation:'boolean',autohide:'boolean',delay:'number'};var Default$7={animation:true,autohide:true,delay:500};var Selector$a={DATA_DISMISS:'[data-dismiss="toast"]'};var Toast=function(){function Toast(element,config){this._element=element;this._config=this._getConfig(config);this._timeout=null;this._setListeners();}
var _proto=Toast.prototype;_proto.show=function show(){var _this=this;$(this._element).trigger(Event$a.SHOW);if(this._config.animation){this._element.classList.add(ClassName$a.FADE);}
var complete=function complete(){_this._element.classList.remove(ClassName$a.SHOWING);_this._element.classList.add(ClassName$a.SHOW);$(_this._element).trigger(Event$a.SHOWN);if(_this._config.autohide){_this.hide();}};this._element.classList.remove(ClassName$a.HIDE);this._element.classList.add(ClassName$a.SHOWING);if(this._config.animation){var transitionDuration=Util.getTransitionDurationFromElement(this._element);$(this._element).one(Util.TRANSITION_END,complete).emulateTransitionEnd(transitionDuration);}else{complete();}};_proto.hide=function hide(withoutTimeout){var _this2=this;if(!this._element.classList.contains(ClassName$a.SHOW)){return;}
$(this._element).trigger(Event$a.HIDE);if(withoutTimeout){this._close();}else{this._timeout=setTimeout(function(){_this2._close();},this._config.delay);}};_proto.dispose=function dispose(){clearTimeout(this._timeout);this._timeout=null;if(this._element.classList.contains(ClassName$a.SHOW)){this._element.classList.remove(ClassName$a.SHOW);}
$(this._element).off(Event$a.CLICK_DISMISS);$.removeData(this._element,DATA_KEY$a);this._element=null;this._config=null;};_proto._getConfig=function _getConfig(config){config=_objectSpread({},Default$7,$(this._element).data(),typeof config==='object'&&config?config:{});Util.typeCheckConfig(NAME$a,config,this.constructor.DefaultType);return config;};_proto._setListeners=function _setListeners(){var _this3=this;$(this._element).on(Event$a.CLICK_DISMISS,Selector$a.DATA_DISMISS,function(){return _this3.hide(true);});};_proto._close=function _close(){var _this4=this;var complete=function complete(){_this4._element.classList.add(ClassName$a.HIDE);$(_this4._element).trigger(Event$a.HIDDEN);};this._element.classList.remove(ClassName$a.SHOW);if(this._config.animation){var transitionDuration=Util.getTransitionDurationFromElement(this._element);$(this._element).one(Util.TRANSITION_END,complete).emulateTransitionEnd(transitionDuration);}else{complete();}};Toast._jQueryInterface=function _jQueryInterface(config){return this.each(function(){var $element=$(this);var data=$element.data(DATA_KEY$a);var _config=typeof config==='object'&&config;if(!data){data=new Toast(this,_config);$element.data(DATA_KEY$a,data);}
if(typeof config==='string'){if(typeof data[config]==='undefined'){throw new TypeError("No method named \""+config+"\"");}
data[config](this);}});};_createClass(Toast,null,[{key:"VERSION",get:function get(){return VERSION$a;}},{key:"DefaultType",get:function get(){return DefaultType$7;}},{key:"Default",get:function get(){return Default$7;}}]);return Toast;}();$.fn[NAME$a]=Toast._jQueryInterface;$.fn[NAME$a].Constructor=Toast;$.fn[NAME$a].noConflict=function(){$.fn[NAME$a]=JQUERY_NO_CONFLICT$a;return Toast._jQueryInterface;};(function(){if(typeof $==='undefined'){throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');}
var version=$.fn.jquery.split(' ')[0].split('.');var minMajor=1;var ltMajor=2;var minMinor=9;var minPatch=1;var maxMajor=4;if(version[0]<ltMajor&&version[1]<minMinor||version[0]===minMajor&&version[1]===minMinor&&version[2]<minPatch||version[0]>=maxMajor){throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');}})();exports.Util=Util;exports.Alert=Alert;exports.Button=Button;exports.Carousel=Carousel;exports.Collapse=Collapse;exports.Dropdown=Dropdown;exports.Modal=Modal;exports.Popover=Popover;exports.Scrollspy=ScrollSpy;exports.Tab=Tab;exports.Toast=Toast;exports.Tooltip=Tooltip;Object.defineProperty(exports,'__esModule',{value:true});}));
(function($){})(window.jQuery);