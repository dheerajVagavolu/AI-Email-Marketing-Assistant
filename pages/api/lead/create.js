// pages/api/lead/create.js
import { Lead } from '../../../models/lead';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, email, website, twitter } = req.body;
  try {
    const lead = await Lead.create({ name, email, website, twitter });
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
