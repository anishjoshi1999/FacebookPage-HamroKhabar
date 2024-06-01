const axios = require("axios");
const cheerio = require("cheerio");
const https = require("https");

// Create an instance of axios with custom HTTPS agent to ignore SSL issues

async function scrapeHeadline(url, selector) {
  try {
    const response = await axios.get(url);
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname;

    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const articleTitles = [];

      $(selector).each((index, element) => {
        const link = $(element).attr("href");
        const fullLink =
          domain === "ekantipur.com" ||
          domain === "nagariknews.nagariknetwork.com"
            ? `https://${domain}${link}`
            : link;

        articleTitles.push({
          source: domain,
          link: fullLink,
          originalNews: $(element).text().trim(),
        });
      });

      return articleTitles;
    } else {
      console.error(
        "Failed to fetch the web page, status code:",
        response.status
      );
      return [];
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

module.exports = { scrapeHeadline };
