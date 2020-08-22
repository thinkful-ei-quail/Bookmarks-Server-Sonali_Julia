const express = require("express");
const bookmarks = require("../store");
const { v4: uuid } = require("uuid");
const logger = require("../logger");

const bookmarkRouter = express.Router();
const parser = express.json();

bookmarkRouter.route("/").get((req, res) => {
  res.send("Hello, world!");
});

bookmarkRouter
  .route("/bookmarks")
  .get((req, res) => {
    res.json(bookmarks);
  })

  .post(parser, (req, res) => {
    const { title, url, description, rating } = req.body;
    const bookmarkEntry = req.body || {};
    const requiredKeys = ["title", "url", "description", "rating"];
    if (isNaN(Number(rating)) || Number(rating) > 5 || Number(rating) < 0) {
      return res.status(400).send("Invalid!");
    }
    requiredKeys.forEach((key) => {
      if (
        !bookmarkEntry[key] ||
        typeof bookmarkEntry[key] !== "string" ||
        bookmarkEntry[key] == " "
      ) {
        return res.status(400).send("Invalid!");
      }
    });

    //1.extract info from the body
    //2. Validate it
    //validate json format
    //validate we have at all keys
    //validate keys are in the format we want. Strings are strings and nums are nums.
    //Validate if rating is 1-5.
    //Validate if the values of the keys are not empty.
    //Generate new, random ID for each item
    //3. Push it to bookmarks array.
    //4.respond with 201
    const id = uuid();

    const newBookmark = {
      id,
      title,
      url,
      description,
      rating,
    };

    bookmarks.push(newBookmark);
    logger.info(`Bookmark with ${id} created`);

    res
      .status(200)
      .location(`http://localhost:8000/bookmarks${id}`)
      .send("Successful");
  });

bookmarkRouter
  .route("/bookmarks/:id")
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find((entry) => entry.id == id);
    if (!bookmark) {
      logger.error(`Bookmark with this ID ${id} not found!`);
      return res.status(404).send("Not found!");
    }
    res.status(200).json(bookmark);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const index = bookmarks.findIndex((bookmark) => bookmark.id == id);
    if (index == -1) {
      return res.status(404).send("Bookmark not found");
    }
    bookmarks.splice(index, 1);

    res.status(204).end();
  });

module.exports = bookmarkRouter;
