
Namespace("eu.twopi.taskforce.renderer.tiles");

eu.twopi.taskforce.renderer.tiles = {
	"name": "Tiles list renderer",
	"uuid": "d971a702-55fc-4075-805e-33b087bcd9ca",
	"creator": "jaseg",
	"altitude": 1.0,
	"render": function(doclist, target){
		var buf = "";
		doclist.each(function(index){
			
		});
		target.html(buf);
	}
}

registerListRenderer(eu.twopi.taskforce.renderer.tiles);
