export default async function handler(req, res) {
  const BACKEND_URL = 'https://rasp.ivkeen.keenetic.link/api/login'; // URL твого Java-бекенду

  if (req.method === 'POST') {
    try {
      // Отримуємо тіло запиту (Vercel парсить body автоматично, але для urlencoded переконайся)
      const { username, password } = req.body;  // Якщо body вже об'єкт, або парсинг якщо string

      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      res.status(response.status).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Помилка сервера' });
    }
  } else {
    res.status(405).json({ error: 'Метод не дозволено' });
  }
}