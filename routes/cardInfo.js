const express = require("express");
const router = express.Router();
const Card = require("../models/cardSchema");

// get all card info
router.get("/all", async (req, res) => {
  let allCards;
  try {
    allCards = await Card.find({});
    return res.send(allCards);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Database Issue");
  }
});

// get balance of particular card
router.get("/:id", async (req, res) => {
  try {
    let cardInfo = await Card.findOne({ cardId: req.params.id });
    if (cardInfo) {
      return res.json(cardInfo.balance);
    } else {
      return res.status(404).send("Card Id doesn't exist");
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Database Issue");
  }
});

// adds a new card
router.post("/new", async (req, res) => {
  try {
    const { userName, cardId, balance } = req.body;
    let card = new Card({
      userName,
      cardId,
      balance
    });

    await card.save();
    return res.json({ card });
  } catch (error) {
    return res.status(500).send("Database Issue");
  }
});

// adds money to the card
router.put("/add/:id/:price", async (req, res) => {
  try {
    let card = await Card.findOne({ cardId: req.params.id });
    if (card) {
      let newBalance = card.get("balance");
      newBalance = newBalance + req.params.price;
      card.balance = newBalance;
      await card.save();
      return res.json({ card });
    } else {
      return res.status(404).send("Card with this id doesn't exist");
    }
  } catch (error) {
    return res.status(500).send("Server Issue");
  }
});

// substract the purchase price from the card
router.put("/buy/:id/:price", async (req, res) => {
  try {
    let card = await Card.findOne({ cardId: req.params.id });
    if (card) {
      let newBalance = card.get("balance");
      newBalance = newBalance - req.params.price;
      card.balance = newBalance;
      await card.save();
      return res.json({ card });
    } else {
      return res.status(404).send("Card with this id doesn't exist");
    }
  } catch (error) {
    return res.status(500).send("Server Issue");
  }
});



module.exports = router;
