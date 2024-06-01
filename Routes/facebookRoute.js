const axios = require("axios");
const express = require("express");
const router = express.Router();
const News = require("../Models/News");
const { textToSource } = require("../utils/textToSource");
const { DateTime } = require("luxon");

async function postCommentOnPost(postId, message) {
  const facebookUrl = `https://graph.facebook.com/v20.0/${postId}/comments`;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  const comment = {
    message,
    access_token: accessToken,
  };
  try {
    const response = await axios.post(facebookUrl, comment);
    console.log(response.data);
    console.log("Comments Added");
  } catch (error) {
    console.error("Error posting to Facebook:", error);
    throw error;
  }
}
async function postNewsToFacebook(sources) {
  const facebookUrl = `https://graph.facebook.com/${process.env.FACEBOOK_PAGE_ID}/feed`;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  const kathmanduTime = DateTime.now().setZone("Asia/Kathmandu");

  const month = kathmanduTime.toFormat("MMMM");
  const day = kathmanduTime.day;
  const year = kathmanduTime.year;
  const hour = kathmanduTime.toFormat("hh");
  const minute = kathmanduTime.toFormat("mm");
  const amPm = kathmanduTime.toFormat("a");

  const message = `Latest News Updates - ${month} ${day}, ${year} at ${hour}:${minute} ${amPm}\n${sources}`;
  const data = {
    message,
    access_token: accessToken,
  };

  try {
    const response = await axios.post(facebookUrl, data);
    return response;
  } catch (error) {
    console.error("Error posting to Facebook:", error);
    throw error;
  }
}

router.get("/", async (req, res) => {
  try {
    const latestNews = await News.find({}).sort({ createdAt: -1 }).limit(5);
    const forPost = [];
    const forComment = [];
    for (let index = 0; index < latestNews.length; index++) {
      const element = latestNews[index];
      const formattedNews = `${index + 1}. ${textToSource(element.source)}: ${
        element.originalNews
      }\n`;
      const formattedComment = `${textToSource(element.source)}: ${
        element.link
      }\n`;
      forPost.push(formattedNews);
      forComment.push(formattedComment);
    }
    const resultPost = forPost.join("");
    const resultComment = forComment.join("");

    const caption = `Headlines:\n${resultPost}`;

    const facebookResponse = await postNewsToFacebook(caption);

    console.log("Automatic post request triggered:", facebookResponse.data);
    await postCommentOnPost(facebookResponse.data.id, resultComment);

    //change the status from isPublished to true
    await changeStatus(latestNews);
    res.redirect("/");
  } catch (error) {
    // console.log(error);
    console.log("An error occurred");
    res.redirect("/");
  }
});
async function changeStatus(news) {
  for (const article of news) {
    await News.findByIdAndUpdate(article._id, { isPublished: true });
  }
}

module.exports = router;
