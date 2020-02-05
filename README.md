# Pug Template Engin
Pug is a Template engine to make easy code with html document.
## Installation pug
npm install --save pug

## VSCODE formarter
- Install extention name pug (jade) formatter. it allow you to use Alt + Shift + F to formate pug code.

## Set Default Express View Engine
```
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```