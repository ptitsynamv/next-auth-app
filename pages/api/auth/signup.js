import { hashPassword } from '../../../lib/auth';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(422).json({ message: 'Invalid data' });
      return;
    }

    const existing = await fetch(`http://localhost:3001/users?email=${email}`);

    if (existing) {
      res.status(422).json({ message: 'User exists' });
      return;
    }

    try {
      await fetch('http://localhost:3001/users', {
        method: 'POST',
        body: JSON.stringify({ email, password: await hashPassword(password) }),
        headers: { 'Content-Type': 'application/json' },
      });

      res.status(200).json({ message: 'Created user' });
    } catch (e) {
      res.status(500).json({ message: e.message });
      return;
    }
  }
}

export default handler;
