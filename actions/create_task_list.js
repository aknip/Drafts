// Creates a new draft with all tasks, sorted by creation date (desc)
// v1.0

let allDrafts = [];

// simple query
// let queryResult = Draft.query('"- [ ]"', 'all', [], [], 'created', true); // descending

// complex query
var wsTmp = Workspace.create();
//wsTmp.tagFilter = 'tagname';
wsTmp.queryString = '"- [ ]"';
wsTmp.setAllSort('created', true); // descending
let queryResult = wsTmp.query("all");

for (let d of queryResult) {
	//if (d.content.length > min) {
		allDrafts.push(d);
	//}
}

if (allDrafts.length > 0) {
	let draftText = "List of all drafts with Tasks.\n\n";
	var draftTextTemp = ''
	// loop through all drafts
	for (let d of allDrafts) {
	    taskFoundFlag = false;
		// create link
		// draftLinkText = `${d.content.split("\n")[0]}`.replace('#','').trim();
		// draftTextTemp = draftText + '[[' + draftLinkText + ']]\n';
		//  `- ${d.title}: ${d.permalink}\n`;

		
		// loop through all lines of the draft
		// for (let tempLine of d.content.split("\n")) {
		var contentLines = d.content.split("\n")
		var i;
		for (i = 0; i < contentLines.length; i++) {
			tempLine = contentLines[i];
			if (tempLine.indexOf('- [ ]') >= 0) {
				draftTextTemp = draftTextTemp + tempLine.trim() + '\n\n';
				if (i>0) {
					// Add context
					// draftTextTemp = draftTextTemp + '\t - > Kontext: ' + contentLines[i-1].replace('- ', '').trim() + '\n';
				}
				taskFoundFlag = true;
			}
		}
		
		// include only in list if at least one (unchecked) task was found
		if (taskFoundFlag == true) {
			draftText = draftTextTemp + '\n\n';
		}
	}
	
	let newDraft = Draft.create();
	newDraft.content = draftText;
	newDraft.update();
	editor.load(newDraft);
}
else {
	alert("No tasks found.");
}