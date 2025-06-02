var fonts = [
  "MaclenburgGotisch",
  "Moyenage",
  "DurerGothicC",
  "CyrillicGothMedium",
  "Schwabacher-Regular",
  "TrueLiesRUSBYLYAJKA",
  "mr_KindlyJasmineG",
  "BrushScriptMTRusbyme-Italic",
  "Lobster-Regular",
  "TheVoiceFont",
  "ACampusBold",
  "DSGreece",
  "a_CooperBlack",
  "lazer84RUSbyDaymarius",
  "INVADERRUSBYLYAJKA",
  "BatmanForeverAlternateCyr",
  "Gotham-UltraItalic",
  "AsylbekM29kz",
  "AkademitscheskajaBuch",
  "AConceptoNrBoldItalic"
];

// Настройки макета
var cols = 2;
var rows = 10;
var spacingX = 400;   // увеличено для более длинных надписей
var spacingY = 200;   // увеличено для более крупного текста
var marginTop = 100;
var marginLeft = 100;

// Размер артборда
var artboardWidth = spacingX * cols + marginLeft * 2;
var artboardHeight = spacingY * rows + marginTop * 2;
var doc = app.documents.add(DocumentColorSpace.CMYK, artboardWidth, artboardHeight);

// Размер текста
var fontSize = 72; // ← Увеличь здесь размер, если хочешь ещё крупнее

for (var i = 0; i < fonts.length; i++) {
    var col = i % cols;
    var row = Math.floor(i / cols);

    var posX = marginLeft + col * spacingX;
    var posY = artboardHeight - marginTop - row * spacingY;

    try {
        // Создаем текст
        var textItem = doc.textFrames.add();
        textItem.contents = "тестирование";
        textItem.textRange.characterAttributes.textFont = app.textFonts.getByName(fonts[i]);
        textItem.textRange.characterAttributes.size = fontSize;

        // Позиционируем
        textItem.position = [posX, posY];

        // Превращаем в контуры
        var outlines = textItem.createOutline();

        // Объединяем
        outlines.selected = true;
        app.executeMenuCommand("group");
        app.executeMenuCommand("Live Pathfinder Add");
        app.executeMenuCommand("expandStyle");
        app.executeMenuCommand("deselectall");

    } catch (e) {
        alert("Ошибка со шрифтом: " + fonts[i]);
    }
}

// 🔄 Экспорт в PNG
var exportOptions = new ExportOptionsPNG24();
exportOptions.artBoardClipping = true;
exportOptions.transparency = true;
exportOptions.horizontalScale = 300 / 72 * 100; // 300 dpi
exportOptions.verticalScale = 300 / 72 * 100;

alert("ГОТОВО!");