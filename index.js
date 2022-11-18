/* eslint-disable no-loop-func */
require("dotenv").config();
const nodemailer = require("nodemailer");

const persons = require("./persons");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

async function sendMail([giver, receiver]) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailConfig = {
    from: `Babo Wichtel <${process.env.MAIL_ADDRESS}>`, // sender address
    to: giver.email, // list of receivers
    subject: "Wichteln", // Subject line
    text: `Dein Wichtel Partner ist ${receiver.name}`, // plain text body
  };

  console.log(mailConfig);

  // const info = await transporter.sendMail(mailConfig);
  // console.log("Message sent: %s", info.messageId);
}

let matches = [];
let attempts = 0;

while (matches.length !== persons.length) {
  attempts += 1;

  if (attempts === 10) {
    throw new Error("Impossible excluding conditions! Check your list of persons!");
  }

  matches = [];
  const shuffeled = shuffleArray([...persons]);

  for (let i = 0; i < shuffeled.length; i++) {
    const person = shuffeled[i];

    const picked = matches.map(([giver, receiver]) => receiver);

    const others = shuffeled.filter((p) => {
      const isNotSame = p !== person;
      const isNotPicked = !picked.includes(p);
      const isNotExcluded = !person.exclude.includes(p.email);

      return isNotSame && isNotPicked && isNotExcluded;
    });

    if (others.length === 0) {
      // console.log("Impossible Condition")
      break;
    }

    const partner = others[Math.floor(Math.random() * others.length)];
    matches.push([person, partner]);
  }
}

for (const match of matches) {
  // console.log(giver.name, receiver.name)
  sendMail(match);
}
