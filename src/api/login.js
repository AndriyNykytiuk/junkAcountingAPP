// /api/login.js
export default async function handler(req, res) {
  const BACKEND_URL = 'https://rasp.ivkeen.keenetic.link/api/login'; // твій Java бекенд

  if (req.method === 'POST') {
    try {
      // Пересилаємо тіло запиту до Java-бекенду
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();

      // Повертаємо відповідь фронтенду
      res.status(response.status).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Помилка сервера' });
    }
  } else {
    res.status(405).json({ error: 'Метод не дозволено' });
  }
}
