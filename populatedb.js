#! /usr/bin/env node

// "mongodb+srv://admin:JEveXTv67zOb3mtZ@cluster0.sbgudcz.mongodb.net/?retryWrites=true&w=majority"

console.log(
  'This script populates some test games, publishers, systems and gameinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Game = require("./models/game");
const Publisher = require("./models/publisher");
const System = require("./models/system");
const GameInstance = require("./models/gameinstance");

const games = [];
const systems = [];
const publishers = [];
const gameinstances = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createSystems();
  await createPublishers();
  await createGames();
  await createGameInstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function systemCreate(name) {
  const system = new System({ name: name });
  await system.save();
  systems.push(system);
  console.log(`Added system: ${name}`);
}

async function publisherCreate(publisher_name) {
  pulisherdetail = { publisher_name: publisher_name };

  const publisher = new Publisher(publisherdetail);

  await publisher.save();
  publishers.push(publisher);
  console.log(`Added publisher: ${publisher_name}`);
}

async function gameCreate(title, summary, publisher, system) {
  gamedetail = {
    title: title,
    summary: summary,
    publisher: publisher,
  };
  if (system != false) gamedetail.system = system;

  const game = new Game(gamedetail);
  await game.save();
  games.push(game);
  console.log(`Added game: ${title}`);
}

async function gameInstanceCreate(game, system, publisher, status) {
  gameinstancedetail = {
    game: game,
    system: system,
    publisher: publisher,
  };
  if (status != false) gameinstancedetail.status = status;

  const gameinstance = new GameInstance(gameinstancedetail);
  await gameinstance.save();
  gameinstances.push(gameinstance);
  console.log(`Added gameinstance: ${imprint}`);
}

async function createSystems() {
  console.log("Adding systems");
  await Promise.all([
    systemCreate("Switch"),
    systemCreate("PlayStation"),
    systemCreate("Xbox"),
  ]);
}

async function createPublishers() {
  console.log("Adding publishers");
  await Promise.all([
    publisherCreate("Nintendo"),
    publisherCreate("Sony"),
    publisherCreate("Microsoft"),
  ]);
}

async function createGames() {
  console.log("Adding Games");
  await Promise.all([
    gameCreate(
      "Final Fantasy IX",
      "The plot focuses on a war between nations in a medieval fantasy world called Gaia. Players follow a thief named Zidane Tribal who kidnaps princess Garnet Til Alexandros XVII as part of a ploy by the neighboring nation of Lindblum. He joins Garnet and a growing cast of characters on a quest to take down her mother, Queen Brahne of Alexandria, who started the war.",
      publishers[1],
      [systems[1]]
    ),
    gameCreate(
      "Cyberpunk 2077",
      "Set in Night City, an open world set in the Cyberpunk universe, players assume the role of a customisable mercenary known as V, who can acquire skills in hacking and machinery with options for melee and ranged combat. The main story follows V's struggle as they deal with a mysterious cybernetic implant that threatens to overwrite their body with the personality and memories of a deceased celebrity only perceived by V; the two must work together to be separated and save V's life.",
      publishers[2],
      [systems[2]]
    ),
    gameCreate(
      "Fire Emblem: Three Houses",
      "Three nations are connected through the Garreg Mach Monastery, which houses a church and an officer's school for students from each nation. Taking the role of Byleth, a former mercenary with a mysterious past and the academy's newest professor, the player must choose a class to lead and guide their students through a series of battles.",
      publishers[0],
      [systems[0]]
    ),
    gameCreate(
      "Legend of Zelda: Ocarina of Time",
      "The fairy Navi awakens Link from a nightmare in which he witnesses a man in black armor pursuing a young girl on horseback. Navi brings Link to the Great Deku Tree, who is cursed and near death. The Deku Tree tells Link that a 'wicked man of the desert' cursed him and seeks to conquer the world and that Link must stop him. Before dying, the Great Deku Tree gives Link the Spiritual Stone of the Forest and sends him to Hyrule Castle to speak with Hyrule's princess.",
      publishers[0],
      [systems[0]]
    ),
    gameCreate(
      "Spider-Man",
      "Based on the Marvel Comics character Spider-Man, it tells an original narrative that is inspired by the long-running comic book mythology, while also drawing from various adaptations in other media. In the main story, the super-human crime lord Mister Negative orchestrates a plot to seize control of New York City's criminal underworld. When Mister Negative threatens to release a deadly virus, Spider-Man must confront him and protect the city while dealing with the personal problems of his civilian persona, Peter Parker.",
      publishers[1],
      [systems[1]]
    ),
  ]);
}

async function createGameInstances() {
  console.log("Adding game instances");
  await Promise.all([
    gameInstanceCreate(games[0], "PlayStation", "Sony", "Available"),
    gameInstanceCreate(games[1], "Xbox", "Microsoft", "Available"),
    gameInstanceCreate(games[2], "Switch", "Nintendo", "Available"),
    gameInstanceCreate(games[3], "Switch", "Nintendo", "Available"),
    gameInstanceCreate(games[4], "PlayStation", "Sony", "Available"),
  ]);
}
