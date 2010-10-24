
registerNodeRenderer({
	"name": "Tiles list renderer",
	"uuid": "d971a702-55fc-4075-805e-33b087bcd9ca",
	"creator": "jaseg",
	"altitude": 1.0,
	"renders": function(nodeNodeType){
		return nodeNodeType == "nodelist";
	},
	"render": function(node, role, target){
		if(role == "show"){
			var buf = "<div class=\"tiles\">";
			console.log(node);
			for(var index in node.data.rest){
				buf += "<div class=\"tile\">";
				console.log("rendering tile "+index);
				var obj = { "val":"", "html": function(arg){this.val = arg}};
				console.log({"requesting rendering of summary": node.data.rest[index].value});
				renderNode(node.data.rest[index].value, "summary", obj);
				buf += obj.val;
				buf += "</div>";
			}
			buf += "</div>";
			target.html(buf);
		}
	}
});

