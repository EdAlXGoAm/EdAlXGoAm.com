import express from 'express';
import path from 'path';
// React
import React from 'react';
import ReactDOM from 'react-dom';
// Routers
import indexRouter from '@routes/index.route';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Settings for Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);

app.listen(port, () => console.log('Server is running on port 3000'));
