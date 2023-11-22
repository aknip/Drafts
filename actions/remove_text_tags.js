// Remove Text Tags
// v1.0
// Checks all documents for a textline starting with 'Tags: '
// and removes it
// Note: Does not change the 'real' Drafts tags

var wsTmp = Workspace.create();
wsTmp.name = "tmp";
wsTmp.setInboxSort("created", true);
let queryResult = wsTmp.query("all");
var debug = 999999;
var i = 0;
var resultText = '';
for (let d of queryResult) {
	if (i < debug) {
		var contentLines = d.content.split("\n"); 
		var newContent='';
		var j;
		for (j = 0; j < contentLines.length; j++) {
			if (contentLines[j].indexOf('Tags: ') < 0) {
				newContent = newContent + contentLines[j] + '\n'
			}
		}
		d.content = newContent;
		d.update();
	}
	i=i+1;
}

/*
let newDraft = Draft.create();
newDraft.content = resultText;
newDraft.update();
editor.load(newDraft);
*/
