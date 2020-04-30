const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage");
const { Page } = require("../models");
const wikipage = require("../views/wikipage");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    res.status(200);
    res.send("wiki");
  } catch (error) {
    console.log(error.message);
    next();
  }
});

router.post("/", async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    await page.save();
    console.log(page);
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
    next();
  }
});

router.get("/add", async (req, res, next) => {
  try {
    res.status(200);
    res.send(addPage());
  } catch (error) {
    console.log(error.message);
    next();
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const foundPage = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });

    res.send(wikipage(foundPage));
  } catch (error) {
    console.log(error.message);
    next();
  }
});
