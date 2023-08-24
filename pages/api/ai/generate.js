const response = [
  {subject: "Subject 1", body: "1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ducimus enim dolorem iusto distinctio possimus eligendi facere quam necessitatibus dignissimos a ab reiciendis atque, magnam sit consequatur maxime libero pariatur!"},
  {subject: "Subject 2", body: "1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ducimus enim dolorem iusto distinctio possimus eligendi facere quam necessitatibus dignissimos a ab reiciendis atque, magnam sit consequatur maxime libero pariatur!"},
  {subject: "Subject 3", body: "1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ducimus enim dolorem iusto distinctio possimus eligendi facere quam necessitatibus dignissimos a ab reiciendis atque, magnam sit consequatur maxime libero pariatur!"},
  {subject: "Subject 4", body: "1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ducimus enim dolorem iusto distinctio possimus eligendi facere quam necessitatibus dignissimos a ab reiciendis atque, magnam sit consequatur maxime libero pariatur!"},
  {subject: "Subject 5", body: "1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ducimus enim dolorem iusto distinctio possimus eligendi facere quam necessitatibus dignissimos a ab reiciendis atque, magnam sit consequatur maxime libero pariatur!"},
];

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    const { campaignGoal, brandTone, industry } = req.body;

    return res.status(200).json({ message: response });
  } else {
    return res.status(405).end(); // Method Not Allowed if not a POST request.
  }
}
