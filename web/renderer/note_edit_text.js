
Namespace("eu.twopi.taskforce.renderer.note");

eu.twopi.taskforce.renderer.note.showTextEditor = function(){
	var field = $('#contentpanel.text');
	var text = field.text();
	var buf = '<form id="note_text_editor"><textarea cols="160" rows="80" id="node_text_editor_textarea">';
	buf += text;
	buf += '</textarea><input type="button" onClick="eu.twopi.taskforce.renderer.note.hideTextEditor()" value="'+$I('Save')+'"/></form>';
	field.html(buf);
}

eu.twopi.taskforce.renderer.note.hideTextEditor = function(){
	var newText = $("node_text_editor_textarea").text();
	//Here the length of the summary is set
	currentNode.data.summary.size = newText.split(' ').length;
	currentNode.data.summary.content = (/(\b[a-z0-9]+\b.*){10,}/i).exec(newText);
	currentNode.data.rest.content = newText.substring(currentNode.data.summary.content.length);
	$('#contentpanel.text').html(eu.twopi.taskforce.renderer.note.generateShowDiv(newText));
	editingFinished();
}

eu.twopi.taskforce.renderer.tiles.showNoteTextEditor();

