var doc = app.documents.add(DocumentColorSpace.CMYK, 1000, 10000);

var allFonts = app.textFonts;
var fontList = "";

for (var i = 0; i < allFonts.length; i++) {
    fontList += (i + 1) + ". " + allFonts[i].name + "\r";
}

var textFrame = doc.textFrames.add();
textFrame.contents = fontList;
textFrame.textRange.characterAttributes.size = 12;
textFrame.position = [50, doc.height - 50];

alert("Список шрифтов выведен в Illustrator.");
