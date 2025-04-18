# Case-cheque# 

## 📌 Описание (Description)

**ФудСплит** — это PWA-приложение для удобного деления счета между участниками компании. Приложение использует **OCR (оптическое распознавание текста)** на базе [Tesseract.js](https://github.com/naptha/tesseract.js) для сканирования бумажных чеков и автоматического извлечения позиций из них.

---

**ФудСплит**  is a PWA app designed to help you split bills among friends or colleagues. It uses **OCR (Optical Character Recognition)** powered by [Tesseract.js](https://github.com/naptha/tesseract.js) to scan paper receipts and automatically extract item lines.

---

## ⚙️ Установка и запуск (Installation & Usage)

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/Stucknam/Case-cheque.git
   cd Case-cheque
2. Установите зависимости:
  npm install tesseract.js
3.Запустите локальный сервер (например, с помощью Live Server или сервера на Node.js):
   npm install -g serve
    \serve 

## Основной функционал (Features)
📄 Распознавание текста с фото/сканированного чека
✂️ Ручной выбор нужных строк (с подсветкой)
👥 Деление выбранных позиций между участниками
💾 PWA: можно установить на устройство как приложение

## Статус разработки (Development Status)
Приложение находится в стадии завершения. Распознавание текста работает, но требуется ручной выбор строк, так как автоматизация распознавания еще дорабатывается.

## Используемые технологии (Tech Stack)
HTML / CSS / JavaScript
Tesseract.js — OCR движок
PWA (Progressive Web App) — офлайн-доступ и установка



