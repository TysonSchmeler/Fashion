var fonts = [ { name: "CyrillicGothMedium", tracking: -80},
              { name: "Moyenage", tracking: -80},
              { name: "MaclenburgGotisch", tracking: -60},
              { name: "Schwabacher-Regular", tracking: -80},
              { name: "Lombardia", tracking: -60},
              { name: "Conkordia", tracking: -70},
              { name: "TrueLiesRUSBYLYAJKA", tracking: -70},
              { name: "LowBackDemoRegular", tracking: -30},
              { name: "Saytag-Regular", tracking: -100},
              { name: "BombDaGone", tracking: 0},
              { name: "BlankRiver", tracking: -40},
              { name: "mr_KindlyJasmineG", tracking: -20},
              { name: "BrushScriptMTRusbyme-Italic", tracking: -20},
              { name: "aAnotherTag", tracking: 50},
              { name: "a_CooperBlack", tracking: -60},
              { name: "DSGreece", tracking: -110},
              { name: "ACampusBold", tracking: -50},
              { name: "TheVoiceFont", tracking: -50},
              { name: "AConceptoNrBoldItalic", tracking: -50},
              { name: "AkademitscheskajaBuch", tracking: -60}
];


// Настройки сетки
var cols = 4;
var spacingX = 700;
var spacingY = 300;
var marginTop = 100;
var marginLeft = 300;
var labelSize = 30;
var desiredWidth = 340.16; // 3 см в pt

// Документ
var rows = Math.ceil(fonts.length / cols);
var artboardWidth = spacingX * cols + marginLeft * 2;
var artboardHeight = spacingY * rows + marginTop * 2;
var doc = app.documents.add(DocumentColorSpace.CMYK, artboardWidth, artboardHeight);

for (var i = 0; i < fonts.length; i++) {
  var fontData = fonts[i];
  var col = i % cols;
  var row = Math.floor(i / cols);
  var centerX = marginLeft + col * spacingX;
  var topY = artboardHeight - marginTop - row * spacingY;

  try {
    var fontRef = app.textFonts.getByName(fontData.name);

    // === Надпись ===
    var textItem = doc.textFrames.add();
    textItem.contents = "SUPER\nTESTING";
    with (textItem.textRange.characterAttributes) {
        textFont = fontRef;
        tracking = fontData.tracking;
        leading = 80;
    }

    textItem.textRange.paragraphAttributes.justification = Justification.CENTER;

    // Подбор размера под ширину
    var testSize = 100;
    while (testSize > 5) {
      textItem.textRange.characterAttributes.size = testSize;
      if (textItem.width <= desiredWidth) break;
      testSize--;
    }

    // === Номер ===
    var label = doc.textFrames.add();
    label.contents = (i + 1).toString();
    label.textRange.characterAttributes.size = labelSize;

    // === Расчёт позиции ===
    var textLeft = centerX - textItem.width / 2;
    var textTop = topY;

    // === Расположение ===
    textItem.position = [textLeft, textTop];
    label.position = [textLeft, textTop + 40];

  } catch (e) {
    alert("Ошибка со шрифтом: " + fontData.name + "\n" + e);
  }
}

// alert("Готово: нумерация и надписи размещены.");
