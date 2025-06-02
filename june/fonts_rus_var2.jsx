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
var fontSize = 72;
var labelSize = 24; // размер нумерации
var leadingSize = 8;

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

    with (textItem.textRange.characterAttributes) {
        textFont = fontRef;
        size = fontSize;
        tracking = fontData.tracking;
        leading = leadingSize;
    }

    // Временная позиция (чтобы текст появился в поле видимости)
    textItem.position = [0, 0];

    // 🔧 Приведение ширины к 3 см (85.04 pt)
    var desiredWidth = 340.16;
    var actualWidth = textItem.width;
    if (actualWidth > 0) {
        var scaleX = (desiredWidth / actualWidth) * 100;
        textItem.resize(scaleX, 100); // Масштаб по ширине, высота остаётся пропорциональной
    }

    // Финальная позиция
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
