// Tags to Text
// v1.0
// Checks all documents for Drafts tags
// Appends a new line with 'Tags: ' and all tags, separated by ','
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
		//resultText = resultText + d.title + '\n';
		var tags = d.tags.toString();
		if (d.tags.length > 0) {
			tags = tags.replaceAll(' - ', '-');
			tags = tags.replaceAll(' ', '-');
			//tags = '#' + tags.replaceAll(',', ', #');
			//resultText = resultText + '  ' + tags + '\n\n';
			d.content = d.content + '\n\nTags: ' + tags;
			d.update();
		}
	}
	i=i+1;
}

/*
let newDraft = Draft.create();
newDraft.content = resultText;
newDraft.update();
editor.load(newDraft);
*/
