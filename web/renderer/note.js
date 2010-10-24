
registerNodeRenderer({
	"name": "Note renderer",
	"uuid": "0c950621-1c27-4bfb-ae59-61878a8a7e66",
	"creator": "jaseg",
	"altitude": 1.0,
	"renders": function(node_type, test){
		return node_type == "note";
	},
	"render": function(node, role, target){
		console.log("rendering node");
		var buf = '<div class="note">';
		if(role == "show"){
			buf += eu.twopi.taskforce.renderer.note.generateShowDiv(node.data.summary.content + node.data.rest.content);
		}else{//if (role == "summary"){
			buf += '<div class="text">';
			buf += node.data.summary.content;
			buf += '<div class="threedots">...</div></div><div class="size">';
			buf += node.data.summary.size;
			buf += '</div>';
		}
		buf += '</div>';
		target.html(buf);
	},
	"generateShowDiv": function(text){
		return '<div class="text" onClick="$.getScript(\''+webbase+'/renderer/note_edit_text.js\')">' + text + '</div>';
	},
	"create": function(){
		return {
			"node_type": "note",
			"name": "",
			"data": {
				"summary": {
					"length": 0,
					"text": "",
				},
				"rest": ""
			}
		};
	}
});

