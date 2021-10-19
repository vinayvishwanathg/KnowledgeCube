const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 1,
      max: 1024,
    },

    date: {
      type: Date,
      default: Date.now,
      set(value) {
        return this.date;
      },
    },

    isTeacher: {
      type: Boolean,
      default: false,
    },

    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      min: 5,
      max: 60,
    },

    verify: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
