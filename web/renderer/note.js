
Namespace("eu.twopi.taskforce.renderer.note");

eu.twopi.taskforce.renderer.note = {
	"name": "Note renderer",
	"uuid": "0c950621-1c27-4bfb-ae59-61878a8a7e66",
	"creator": "jaseg",
	"altitude": 1.0,
	"renders": function(node_type){
		return node_type == "note";
	},
	"render": function(node, target){
		var buf = "";
		
		target.html(buf);
	}
}

registerNodeRenderer(eu.twopi.taskforce.renderer.note);

