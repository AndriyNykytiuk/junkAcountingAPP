// proxy-server.js
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3001; // можеш змінити на будь-який вільний порт

app.use(cors());
app.use(express.json());

app.use('/api', createProxyMiddleware({
  target: 'https://rasp.ivkeen.keenetic.link',
  changeOrigin: true,
  secure: false,
  pathRewrite: {
    '^/api': '', // видаляє /api з шляху
  },
}));

app.listen(PORT, () => {
  console.log(`🔥 Проксі-сервер запущено на http://localhost:${PORT}`);
});
