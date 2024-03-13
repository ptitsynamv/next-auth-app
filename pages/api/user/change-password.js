import { getServerSession } from 'next-auth/next';
import { hashPassword, verifyPassword } from '../../../lib/auth';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'Not auth' });
    return;
  }

  const { email } = session.user;
  const { newPassword, oldPassword } = req.body;

  if (!newPassword || !oldPassword) {
    res.status(422).json({ message: 'Invalid data' });
    return;
  }

  const userData = await fetch(`http://localhost:3001/users?email=${email}`);
  const [user] = await userData.json();

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const isValid = await verifyPassword(oldPassword, user.password);
  if (!isValid) {
    res.status(403).json({ message: 'Invalid password' });
    return;
  }

  try {
    await fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        password: await hashPassword(newPassword),
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    res.status(200).json({ message: 'Password was updated' });
  } catch (e) {
    res.status(500).json({ message: e.message });
    return;
  }
}

export default handler;
