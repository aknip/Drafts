// Text to Tags
// v1.0
// Checks all documents for a textline starting with 'Tags: '
// If found, moves the textline to the end of the document 
// and creates 'real' Drafts tags
// Note: The syntax of the tags is not relevant (prefix @ or #, no prefix...)

var wsTmp = Workspace.create();
wsTmp.name = "tmp";
wsTmp.setInboxSort("created", true);
let queryResult = wsTmp.query("all");
var debug = 99999;
var i = 0;
var resultText = '';
for (let d of queryResult) {
	if (i < debug) {
		
		// check for textline 'Tags: '
		var contentLines = d.content.split("\n"); 
		var newContent='';
		var j;
		var tags_string = ''
		for (j = 0; j < contentLines.length; j++) {
			if (contentLines[j].indexOf('Tags: ') < 0) {
				newContent = newContent + contentLines[j] + '\n'
			}
			else {
				tags_string = contentLines[j] 
			}
		}

		// if textline 'Tags: ' found:
		// - move it to end of text
		// - create tags
		if (tags_string != '') {
			d.content = newContent.trim() + '\n\n' + tags_string
			tags_string2 = tags_string.split('Tags: ')
			tags_array = tags_string2[1].split(',')
			
			for (j = 0; j < tags_array.length; j++) {
				d.addTag(tags_array[j].trim())
			}
			//d.addTag('@ergo')
			d.update();
		}
		

		//resultText = resultText + d.title + '\n';

		/*
		var tags = d.tags.toString();
		if (d.tags.length > 0) {
			tags = tags.replaceAll(' - ', '-');
			tags = tags.replaceAll(' ', '-');
			tags = '#' + tags.replaceAll(',', ', #');
			//resultText = resultText + '  ' + tags + '\n\n';
			d.content = d.content + '\n\nTags: ' + tags;
			d.update();
		}
		*/
	}
	i=i+1;
}

/*
let newDraft = Draft.create();
newDraft.content = resultText;
newDraft.update();
editor.load(newDraft);
*/
