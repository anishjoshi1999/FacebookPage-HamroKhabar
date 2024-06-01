const express = require("express");
const router = express.Router();
const { saveNews } = require("../Functions/saveNews");
const { scrapeHeadline } = require("../utils/scrapeHeadline");

router.get("/", async (req, res) => {
  try {
    const scrapingPromises = [
      scrapeHeadline(
        "https://www.onlinekhabar.com/content/news",
        ".post-title-wrap h4 a:last-child"
      ),
      scrapeHeadline("https://ekantipur.com/news", ".normal:first-child h2 a"),
      scrapeHeadline(
        "https://www.setopati.com/politics",
        ".big-feature .maintitle a"
      ),
      scrapeHeadline(
        "https://nagariknews.nagariknetwork.com/",
        ".article_template h1 a"
      ),
      scrapeHeadline(
        "https://ronbpost.com",
        ".bg-white .text-center .font-mukta a"
      ),
    ];

    const results = await Promise.all(scrapingPromises);
    // Flatten the array of results if needed
    const flattenedResults = results.flat();
    //Save all news into the database
    await saveNews(flattenedResults);
    console.log("Scraping completed successfully");
    res.redirect("/");
  } catch (error) {
    console.error("Error:", error);
  }
});

module.exports = router;
