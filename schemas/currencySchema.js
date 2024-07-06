const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },

  wallet: {
    type: Number,
    default: 1000,
  },

  bank: {
    type: Number,
    default: 0,
  },

  begTimeout: {
    type: Number,
  },

  dailyTimeout: {
    type: Number,
  },

  weeklyTimeout: {
    type: Number,
  },

  monthlyTimeout: {
    type: Number,
  },

  fishCount: {
    type: Number,
    default: 0,
  },

  fishTimeout: {
    type: Number,
  },

  pigCount: {
    type: Number,
    default: 0,
  },

  bearCount: {
    type: Number,
    default: 0,
  },

  wildboarCount: {
    type: Number,
    default: 0,
  },

  skunkCount: {
    type: Number,
    default: 0,
  },

  rabbitCount: {
    type: Number,
    default: 0,
  },

  huntTimeout: {
    type: Number,
  },

  ironCount: {
    type: Number,
    default: 0,
  },

  goldCount: {
    type: Number,
    default: 0,
  },

  diamondCount: {
    type: Number,
    default: 0,
  },

  digTimeout: {
    type: Number,
  },

  woodlogCount: {
    type: Number,
    default: 0,
  },

  chopwoodTimeout: {
    type: Number,
  },

  coinflipTimeout: {
    type: Number,
  },

  slotsTimeout: {
    type: Number,
  },
});

module.exports = mongoose.model("currencySchema", schema, "currencySchema");
