# HamroKhabar: A Facebook Bot

HamroKhabar is a Node.js application designed to automate the process of scraping news articles from selected Nepali websites and seamlessly publishing them on a Facebook page. This README offers a comprehensive guide to the project, including setup instructions and usage details.

## Prerequisites

Before running this project, ensure you have the following prerequisites in place:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) or access to a MongoDB Atlas instance
- A Facebook Page and a corresponding Facebook Developer App with the necessary permissions
- A Facebook Access Token and the associated Page ID

## Installation

1. Clone the repository:

   ```bash
   https://github.com/anishjoshi1999/FacebookPage-HamroKhabar.git
   cd HamroKhabar
   ```

2. Install dependencies:
   `npm install`

## Configuration

Create a `.env` file in the project root and add your configuration values:

### MongoDB Configuration:

- `MONGODB_URI`: Replace with your MongoDB URI along with Collection Name.
- `PORT`: Replace with the desired port number for your application.

### Facebook Configuration:

- `FACEBOOK_PAGE_ID`: Replace with your Facebook Page ID.
- `FACEBOOK_ACCESS_TOKEN`: Replace with your Facebook Access Token.

---

### Starting the Application

To launch the Node.js application, run:

`npm run dev`

The application will start and listen on the specified port (default is 3000).

### Endpoints

- `/scrape`: Use this endpoint to scrape news articles from selected Nepali websites and store them in the MongoDB database.
- `/facebook`: This endpoint automatically publishes scraped news articles on your Facebook page and news article sources in the comments.

You can access these endpoints using HTTP GET requests. For instance:

- To post scraped news articles on Facebook: <http://localhost:3000/facebook>
- To scrape news articles: <http://localhost:3000/scrape>

## Code of Conduct

Please adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). We aim to foster a welcoming and inclusive community.

## Licensing

By contributing to this project, you agree that your contributions will be licensed under the project's [LICENSE](LICENSE.md).
