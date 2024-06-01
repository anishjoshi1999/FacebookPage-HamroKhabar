const translateText = require("./translateText");
const News = require("../Models/News");

async function saveNews(news) {
  try {
    // `news` is an array of news objects
    const translatedNewsPromises = news.map(async (newsItem) => {
      const existingNews = await News.findOne({
        originalNews: newsItem.originalNews,
      });

      if (!existingNews) {
        const translatedNewsInfo = await translateText(newsItem.originalNews);
        newsItem.translatedNews = translatedNewsInfo;
        const newsInfo = new News(newsItem);
        await newsInfo.save();
        console.log("Saved:", newsInfo);
      } else {
        console.log("News already exists in the database");
      }

      return newsItem; // Return the original news item or the modified one
    });

    // Wait for all translations and saving operations to complete
    await Promise.all(translatedNewsPromises);
  } catch (error) {
    console.error("Error saving news item:", error);
    throw error;
  }
}

module.exports = { saveNews };
