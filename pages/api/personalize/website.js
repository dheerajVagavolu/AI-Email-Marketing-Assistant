const axios = require("axios");
const cheerio = require("cheerio");

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const url = req.query.url;

  if (!url) {
    return res.status(400).send({ error: "URL is required." });
  }

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const paragraphs = [];
    $("p").each((index, element) => {
      if ($(element).text().split(" ").length > 2) {
        paragraphs.push($(element).text());
      }
    });

    return res.send({ scrapped_website_data: paragraphs.join(" | ") });
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return res.status(500).send({ error: "Failed to scrape the website." });
  }
}
