/* 
 * The TaskForce JavaScript rendering framework
 * (c) 2010 by Jan Sebastian Götte
 * So far, all rights are reserved, if you wish to do something with this code,
 * just send me an email to the address on the bottom of the main page. I will
 * pobably release the code under a GPL license upon request.
 * requires JQuery.
 */

const couchDBroot = "http://192.168.2.20:5984"

const webbase = "http://192.168.2.23/taskforce"
var currentQuery = new Array();
var queryHistory = new Array();

var currentNode = null;
//Quick-and-dirty code!!
var current_user = "jaseg";

var nodeRenderers = new Array();
var currentNodeRenderer = new Array();
var listRenderers = new Array();
var currentListRenderer = null;

function renderTagList(taglist, target){
	
}

function switchToNode(id){
	fetchNode(id, function(data){
		currentNode = data;
		renderNode(currentNode, "show", $('#contentpanel'));
	});
	populateCurrentNodeRendererMenu(currentNode, $('#rendererSelector'));
}

function switchToTags(tags){
	var query = "(";
	tags.each(function(index){
		if(index > 0)
			query += " OR tag:" + this;
		else
			query = "tag:" + this;
	});
	query += ')';
	switchToFilter(query);
}

function switchToFilter(query){
	if(currentQuery != null)
		queryHistory.push(currentQuery);
	currentQuery = new Array();
	currentQuery.push(query);
	renderCurrentQuery();
}

function addFilter(query){
	queryHistory.push(currentQuery);
	currentQuery.push('('+query+')');
	renderCurrentQuery();
}

function renderCurrentQuery(){
	var queryString = generateQueryString(currentQuery);
	luceneFetch(queryString, function(data){
		renderNode(data, "show", $('#contentpanel'));
	});
}

function renderQueryHistory(){
	var buf='<ul class="queryHistoryList" id="queryHistoryList">';
	queryHistory.each(function(index){
		buf += '<li class="queryHistoryItem" id="queryHistoryItem_'+index+'">';
		buf += '<ul class="partsList">';
		this.each(function(qindex){	
			buf += '<li class="queryPart">';
			buf += this;
			buf += '</li>';
		});
		buf += '</ul></li>';
	});
	buf += '</ul>';
	$('#pathpanel').html(buf);
}

function generateQueryString(queryArray){
	var tmpQuery = "";
	for(var index = 0; index < queryArray.length; index++){
		if(index > 0)
			tmpQuery += ' AND ';
		tmpQuery += queryArray[index];
	}
	return tmpQuery;
}

function queryHistoryBack(){
	currentQuery = queryHistory.pop();
	renderCurrentQuery();
}

function populateCurrentNodeRendererMenu(node, target){
	//In this function an important assumption is made: The renderer lists are
	//considered to be final. If they were not and a renderer would be load
	//or removed after this function has been run, the array indices would be
	//corrupt. So it is in fact necessary that each time the renderer list
	//changes (until now, there is no place where that happens) this function is
	//called again.
	var buf='<ul class="nodeRendererMenu">';
	nodeRenderers.each(function(index){
		if(this.renders(node.node_type)){
			buf += '<li class="nodeRendererMenuItem" id="setNodeRenderer'+index+'" onClick="setCurrentNodeRenderer('+index+')">';
			buf += this.name;
			buf += '</li>';
		}
	});
	buf += '</ul>';
	target.html(buf);
}

function setCurrentNodeRenderer(index){
	currentNodeRenderer[currentNode.node_type] = nodeRenderers[index];
	renderNode(currentNode, "show", $("#contentpanel"));
}

function renderNode(node, role, target){
	if(currentNodeRenderer[node.node_type]){
		currentNodeRenderer[node.node_type].render(node, role, target);
	}else{
		for(var renderer in nodeRenderers){
			if(renderer.renders(node.note_type)){
				renderer.render(node, role, target);
				currentNodeRenderer[node.note_type] = renderer;
				return false;
			}
		}
	}
}

function registerNodeRenderer(renderer){
	nodeRenderers = renderer;
}

function fetchNode(nodeID, callback){
	$.ajax({
		dataType: "json",
		url: couchDBroot+"/taskforce/"+nodeID,
		success: function(data){
			callback(data);
		}
	});
}

function luceneFetch(filter, callback){
	var docs = [];
	var query = "nodes?q="+filter;
	$.ajax({
		dataType: "json",
		url: couchDBroot+"/taskforce/_fti/_design/search/"+query,
		success: function(data){
			docs = data["rows"];
		}
	});
	keylist = '{"keys": [';
	for(var index = 0; index < docs.length; index++){
		if(index>0)
			keylist += ", ";
		keylist += '"'+docs[index].id+'"';
	}
	keylist += ']}';
	$.ajax({
		dataType: "json",
		url: couchDBroot+"/taskforce/_design/summary/_view/by_tag",
		type: "POST",
		data: keylist,
		success: function(data){
			var listdoc={
				"_id":"temp_"+createUUID(),
				"temp":true,
				"name":queryString,
				"data":{
					"summary":{
						"offset":data.offset,
						"row_count":data.total_rows
					},
					"rest":data.rows
				},
				"modification_date":getTime(),
				"parents":null,
				"acl":"everyone:r,owner:w",
				"tags":[],
				"owner":current_user,
				"node_type":"nodelist"
			};
			callback(data);
		}
	});
}

//Posted by Kevin Hakanson on stackoverflow.com
//Probably not too efficient, but... hey, it's javascript, so any forms of
//efficiency are screwed anyway.
function createUUID() {
	//http://www.ietf.org/rfc/rfc4122.txt
	var s = [];
	var hexDigits = "0123456789ABCDEF";
	for (var i = 0; i < 32; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[12] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01

	var uuid = s.join("");
	return uuid;
}

function loadNodeRenderers(){
	$.ajax({
		dataType: "json",
		url: webbase+"/renderer/index.html",
		success: function(data){
			//console.log(data);
			for(var i = 0; i < data.renderers.length; i++){
				//console.log(data.renderers[i]);
				$.getScript(webbase+'/renderer/'+data.renderers[i]);
			}
		}
	});
}

//Initialization function - this is called after the DOM has been loaded.
$(document).ready(function(){
	initLocalize('lang', 'en');
	loadNodeRenderers();
	switchToFilter('*'); //Show by default all nodes
});

//##############################################################################
//Legacy code. Not yet deleted because it could be useful in the future.

/* Constructor of the acl object. The three arguments are perms objects
 */
function acl(u, g, o){
	this.u = u;
	this.g = g;
	this.o = o;
}

/* Constructor of the perms object - is equal to the permissions object
 */
function perms(r, w, x){
	permissions(r, w, x);
}

/* Constructor of the permissions object
 */
function permissions(r, w, x){
	this.r = r;
	this.w = w;
	this.x = x;
}

/* Converts a string to an acl
 * String format: [ugo] rwxrwxrwx
 */
function toACL(s){
	if(!/^([r-][w-][x-]){3}$/.test(s)) //Test for format
		throw new ACLConstructionException("The string has to be of length 9.");
	return acl(perms(s[0] == 'r', s[1] == 'w', s[2] == 'x'), perms(s[3] == 'r', s[4] == 'w', s[5] == 'x'), perms(s[6] == 'r', s[7] == 'w', s[8] == 'x'));
}

/* An exception used in ACL construction
 */
function ACLConstructionException(msg){
	this.name = "ACLConstructionException";
	this.message = msg;
}

