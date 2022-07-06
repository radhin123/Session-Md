
// Ini bila ingin edit ke no enc nya 
// pindahkan / salin code di bawah dan paste ke index.js


const 
  makeWASocket,
  DisconnectReason,
  useSingleFileAuthState,
  fetchLatestBaileysVersion,
  AnyMessageContent,
  delay,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore, = require("@adiwajshing/baileys").default
const qrcode = require("qrcode-terminal")
const pino = require('pino')
const fs = require('fs')
const chalk = require('chalk')
const cfonts = require('cfonts')
const axios = require('axios')
const FileType = require('file-type')
const PhoneNumber = require('awesome-phonenumber')
const lolcatjs = require('lolcatjs')
const {Boom} = require("@hapi/boom")
const moment = require('moment-timezone')
const { delay, useSingleFileAuthState } = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState('./session.data.json')

function qr() {
  let session = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  })
  session.ev.on("connection.update", async (s) => {
    const { connection, lastDisconnect } = s
    if (connection == "open") {
      await delay(1000 * 10)
      process.exit(0)
    }
    if (
      connection === "open" &&
      lastDisconnect &&
      lastDisconnect.error &&
      lastDisconnect.error.output.statusCode != 401
    ) {
      qr()
    }
  })
  session.ev.on('creds.update', saveState)
  session.ev.on("messages.upsert", () => { })
}
qr()
