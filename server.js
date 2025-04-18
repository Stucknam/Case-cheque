const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

function cleanMixedLanguageText(text) {
  const words = text.split(/\s+/);
  const isCyrillic = (word) => /[а-яА-Я]/.test(word);
  const isLatin = (word) => /[a-zA-Z]/.test(word);
  return words.filter(word => !(isCyrillic(word) && isLatin(word))).join(' ');
}

function extractReceiptItems(text) {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  while (lines.length && !/рамен|лапша|моти|вода|напит|соус|кола|пепси|сок|шт\.|шт|X|x|×/i.test(lines[0])) {
    lines.shift();
  }

  const itemRegex = /(.+?)\s*(\d+)\s*[xX×*]\s*(\d+[\.,]?\d*)/u;
  const items = [];

  lines.forEach(line => {
    const match = line.match(itemRegex);
    if (match) {
      let [_, name, qty, price] = match;
      qty = parseFloat(qty.replace(',', '.'));
      price = parseFloat(price.replace(',', '.'));
      items.push({ name: name.trim(), quantity: qty, price });
    }
  });

  return items;
}

app.use(express.static(path.join(__dirname, 'public')));

app.post('/scan', upload.single('image'), async (req, res) => {
  const inputPath = req.file.path;
  const processedPath = 'processed_' + req.file.filename + '.png';

  try {
    await sharp(inputPath)
      .rotate()
      .resize({ width: 1000 })
      .grayscale()
      .normalize()
      .toFile(processedPath);

    const { data: { text } } = await Tesseract.recognize(processedPath, 'eng+rus');

    const cleanedText = cleanMixedLanguageText(text);
    console.log('Текст после обработки Tesseract:', cleanedText);

    const items = extractReceiptItems(cleanedText);

    fs.unlinkSync(inputPath);
    fs.unlinkSync(processedPath);

    res.json({ text: cleanedText, items });
  } catch (err) {
    console.error('Ошибка обработки чека:', err);
    res.status(500).json({ error: 'Ошибка при обработке чека' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
