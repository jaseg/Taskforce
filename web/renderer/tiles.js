
registerNodeRenderer({
	"name": "Tiles list renderer",
	"uuid": "d971a702-55fc-4075-805e-33b087bcd9ca",
	"creator": "jaseg",
	"altitude": 1.0,
	"renders": function(node_type){
		console.log("asked to render"+node_type);
		return node_type == "nodelist";
	},
	"render": function(node, role, target){
		console.log("rendering nodelist");
		if(role == "show"){
			var buf = "<div class=\"tiles\">";
			for(var tile in node.data.full){
				buf += "<div class=\"tile\">";
				var obj = { "val":"", "html": function(arg){this.val = arg}};
				renderNode(tile, "summary", obj);
				buf += obj.val;
				buf += "</div>";
			}
			buf += "</div>";
			target.html(buf);
		}
	}
});

