// pages/api/lead/getAll.js
import { Lead } from '../../../models/lead';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const leads = await Lead.findAll();
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
