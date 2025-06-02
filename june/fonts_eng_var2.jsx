var fonts = [
  { name: "CyrillicGothMedium", tracking: -80, fontSize: 72},
  { name: "Moyenage", tracking: -80, fontSize: 72},
  { name: "MaclenburgGotisch", tracking: -60, fontSize: 110},
  { name: "Schwabacher-Regular", tracking: -80, fontSize: 90},
  { name: "Lombardia", tracking: -60, fontSize: 130},
  { name: "Conkordia", tracking: -70, fontSize: 100},
  { name: "TrueLiesRUSBYLYAJKA", tracking: -70, fontSize: 72},
  { name: "LowBackDemoRegular", tracking: -30, fontSize: 90},
  { name: "Saytag-Regular", tracking: -100, fontSize: 72},
  { name: "BombDaGone", tracking: 0, fontSize: 100},
  { name: "BlankRiver", tracking: -40, fontSize: 100},
  { name: "mr_KindlyJasmineG", tracking: -20, fontSize: 120},
  { name: "BrushScriptMTRusbyme-Italic", tracking: -20, fontSize: 100},
  { name: "aAnotherTag", tracking: 50, fontSize: 90},
  { name: "a_CooperBlack", tracking: -60, fontSize: 72},
  { name: "DSGreece", tracking: -110, fontSize: 72},
  { name: "ACampusBold", tracking: -50, fontSize: 72},
  { name: "TheVoiceFont", tracking: -50, fontSize: 72},
  { name: "AConceptoNrBoldItalic", tracking: -50, fontSize: 72},
  { name: "AkademitscheskajaBuch", tracking: -60, fontSize: 130}
];

// Настройки макета
var cols = 3;
var rows = 7;
var spacingX = 600;
var spacingY = 200;
var marginTop = 100;
var marginLeft = 100;

// Размер артборда
var artboardWidth = spacingX * cols + marginLeft * 2;
var artboardHeight = spacingY * rows + marginTop * 2;
var doc = app.documents.add(DocumentColorSpace.CMYK, artboardWidth, artboardHeight);

// Размеры текста
// var fontSize = 72;
var labelSize = 24; // размер нумерации
var leadingSize = 8;

for (var i = 0; i < fonts.length; i++) {
    var fontData = fonts[i]; // 👈 получаем объект с настройками
    var col = i % cols;
    var row = Math.floor(i / cols);
    var posX = marginLeft + col * spacingX;
    var posY = artboardHeight - marginTop - row * spacingY;

    try {
        var fontRef = app.textFonts.getByName(fontData.name);

        // ===== Надпись =====
        var textItem = doc.textFrames.add();
        textItem.contents = "nakama";

        with (textItem.textRange.characterAttributes) {
            textFont = fontRef;
            size = fontData.fontSize;
            tracking = fontData.tracking;
            leading = leadingSize;
        }

        textItem.position = [posX, posY];

        // ===== Нумерация =====
        var label = doc.textFrames.add();
        label.contents = (i + 1).toString();
        label.textRange.characterAttributes.size = labelSize;
        var labelOffset = 20;
        label.position = [posX, posY + labelOffset];

        // Превращаем в кривые
        // var outlines = textItem.createOutline();
        // outlines.selected = true;
        // app.executeMenuCommand("group");
        // app.executeMenuCommand("Live Pathfinder Add");
        // app.executeMenuCommand("expandStyle");
        // app.executeMenuCommand("deselectall");

    } catch (e) {
        alert("Ошибка со шрифтом: " + fontData.name + "\n" + e);
    }
}

alert("Макеты с плотной нумерацией успешно созданы!");
