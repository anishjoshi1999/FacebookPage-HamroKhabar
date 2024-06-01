const translate = require("@iamtraction/google-translate");

async function translateText(text) {
  try {
    const result = await translate(text, { to: "en" });
    return result.text;
  } catch (err) {
    throw err;
  }
}

module.exports = translateText;
