/* This is jaseg's website localizator v0.0.0.0.00.0-0
 */

/* Localize a string
 * 
 * Looks up the string in the selected language file. If the string is not found
 * it is returned unchanged, otherwise the translated string is returned.
 * 
 * 
 */
function $I(what){
	if(typeof langData != 'undefined'){
		if(typeof langData[what] == 'undefined'){
			return langData[what];
		}else{
			return what;
		}
	}else{
		return what;
	}
}

/* Initialize the localize lib
 * 
 * The one argument is the root of the language data files (with leading and
 * trailing slash).
 */
function init_localize(langroot, lang){
	$.getJSON(langroot+lang+'.json', function(data){
		langData = data;
	});
}
