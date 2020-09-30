require('dotenv').config()

const tmi = require("tmi.js");

const options = {
  options: {
    debug: true,
  },
  connection: {
    reconnect: true,
  },
  identity: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  channels: [process.env.CHANNEL],
};

const client = new tmi.client(options);

client.connect();

client.on("connected", (address, port) => {
  client.action("antonioadv08", `Hello Gamer! Connected to ${address}:${port}`);
});

client.on("chat", (target, ctx, message, self) => {
  if (self) return;

  console.log(target);
  console.log(ctx);

  const commandName = message.trim();

  if (commandName === "hello") {
    client.say(target, `Welcome ${ctx.username}`);
  }

  if (commandName === "!game") {
    client.say(target, `We stay playing`);
  }

  if (commandName === "!dice") {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
  }
});

function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
