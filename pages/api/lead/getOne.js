// pages/api/lead/getOne.js
import { Lead } from '../../../models/lead';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { id } = req.query;
  try {
    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).end();
    }
    res.status(200).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
