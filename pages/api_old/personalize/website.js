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

    const contents = [];

    // Collect text from common elements
    const selectors = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "li", "blockquote"];

    selectors.forEach(selector => {
      $(selector).each((index, element) => {
        const text = $(element).text().trim();
        if (text.split(" ").length > 3) {
          contents.push(text);
        }
      });
    });

    return res.send({ scrapped_website_data: contents.join(" | ") });
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return res.status(500).send({ error: "Failed to scrape the website." });
  }
}
