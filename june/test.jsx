var fonts = [
  { name: "MaclenburgGotisch", tracking: -100},
  { name: "Moyenage", tracking: -80},
  { name: "DurerGothicC", tracking: -120},
  { name: "CyrillicGothMedium", tracking: -100},
  { name: "Schwabacher-Regular", tracking: -100},
  { name: "TrueLiesRUSBYLYAJKA", tracking: -90},
  { name: "mr_KindlyJasmineG", tracking: -90},
  { name: "BrushScriptMTRusbyme-Italic", tracking: -110},
  { name: "Lobster-Regular", tracking: -60},
  { name: "TheVoiceFont", tracking: -70},
  { name: "ACampusBold", tracking: -150},
  { name: "DSGreece", tracking: -100},
  { name: "a_CooperBlack", tracking: -90},
  { name: "lazer84RUSbyDaymarius", tracking: 6},
  { name: "INVADERRUSBYLYAJKA", tracking: -60},
  { name: "BatmanForeverAlternateCyr", tracking: -120},
  { name: "Gotham-UltraItalic", tracking: -130},
  { name: "AsylbekM29kz", tracking: -100},
  { name: "AkademitscheskajaBuch", tracking: -70},
  { name: "AConceptoNrBoldItalic", tracking: -70}
];

var cols = 3;
var spacingX = 600;
var spacingY = 200;
var marginTop = 100;
var marginLeft = 200;
var labelSize = 24;
var leadingSize = 8;
var desiredWidth = 340.16; // 3 см в pt

var rows = Math.ceil(fonts.length / cols);
var artboardWidth = spacingX * cols + marginLeft * 2;
var artboardHeight = spacingY * rows + marginTop * 2;
var doc = app.documents.add(DocumentColorSpace.CMYK, artboardWidth, artboardHeight);

for (var i = 0; i < fonts.length; i++) {
    var fontData = fonts[i];
    var col = i % cols;
    var row = Math.floor(i / cols);
    var posX = marginLeft + col * spacingX;
    var posY = artboardHeight - marginTop - row * spacingY;

    try {
        var fontRef = app.textFonts.getByName(fontData.name);

        // ===== Надпись =====
        var textItem = doc.textFrames.add();
        textItem.contents = "авторитеты\nбазарят";
        var tr = textItem.textRange;
        tr.characterAttributes.textFont = fontRef;
        tr.characterAttributes.tracking = fontData.tracking;
        tr.characterAttributes.leading = leadingSize;
        tr.paragraphAttributes.justification = Justification.CENTER; // 💡 Центрирование абзаца

        // Подбор размера под нужную ширину
        var testSize = 100;
        while (testSize > 5) {
            tr.characterAttributes.size = testSize;
            if (textItem.width <= desiredWidth) break;
            testSize--;
        }

        // ===== Нумерация =====
        var label = doc.textFrames.add();
        label.contents = (i + 1).toString();
        label.textRange.characterAttributes.size = labelSize;

        // Временное размещение
        textItem.position = [0, 0];
        label.position = [0, 20]; // метка выше текста

        // Группируем надпись + метку
        textItem.selected = true;
        label.selected = true;
        app.executeMenuCommand("group");

        var group = doc.selection[0];
        group.left = posX - group.width / 2;
        group.top = posY;

        app.executeMenuCommand("deselectall");

    } catch (e) {
        alert("Ошибка со шрифтом: " + fontData.name + "\n" + e);
    }
}

alert("Макеты с центрированными надписями успешно созданы!");
