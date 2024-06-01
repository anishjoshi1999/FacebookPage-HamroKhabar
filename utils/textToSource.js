function textToSource(sourceURL) {
  switch (true) {
    case sourceURL.includes("www.setopati.com"):
      return "SetoPati";
    case sourceURL.includes("ronbpost.com"):
      return "RONBPost";
    case sourceURL.includes("ekantipur.com"):
      return "EKantipur";
    case sourceURL.includes("nagariknews.nagariknetwork.com"):
      return "NagrikNews";
    case sourceURL.includes("www.onlinekhabar.com"):
      return "OnlineKhabar";
    default:
      // Default case or handle other URLs as needed
      return "Unknown";
  }
}
module.exports = { textToSource };
