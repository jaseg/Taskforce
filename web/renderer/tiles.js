
Namespace("eu.twopi.taskforce.renderer.tiles");

eu.twopi.taskforce.renderer.tiles = {
	"name": "Tiles list renderer",
	"uuid": "d971a702-55fc-4075-805e-33b087bcd9ca",
	"creator": "jaseg",
	"altitude": 1.0,
	"renders": function(node_type){
		return node_type == "nodelist";
	}
	"render": function(node, role, target){
		if(role == "show"){
			var buf = "<div class=\"tiles\">";
			for(var tile in node.data.full){
				buf += "<div class=\"tile\">";
				buf += renderNode(
				buf += "</div>";
			}
			buf += "</div>";
			target.html(buf);
		}
	}
}

registerNodeRenderer(eu.twopi.taskforce.renderer.tiles);
