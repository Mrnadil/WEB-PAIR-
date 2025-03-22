const { exec } = require("child_process");
const { upload } = require('./mega');
const express = require('express');
let router = express.Router()
const pino = require("pino");

let { toBuffer } = require("qrcode");

const path = require('path');

const fs = require("fs-extra");

const { Boom } = require("@hapi/boom");

const MESSAGE = process.env.MESSAGE ||  `
*🐼🍓-𝐙𝐄𝐑𝐎𝐗 𝐌𝐃-🐼❤️‍🩹 𝐁𝐎𝐓 𝐏𝐀𝐈𝐑

*┏━━━━━━━━━━━━━━*
*┃𝐙𝐄𝐑𝐎𝐗-𝐌𝐃 SESSION IS*
*┃SUCCESSFULLY*
*┃CONNECTED ✅🔥*
*┗━━━━━━━━━━━━━━━*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❶ || Creator = 𝙼𝚁  𝙽𝙰𝙳𝙸𝙻 𝙷𝙰𝙽𝚂𝙰𝙹𝙰👨🏻‍💻✅*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❷ || WhatsApp Channel =* https://whatsapp.com/channel/0029Vb8n2cA9mrGioPDAcJ1W
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❸ || Owner =* https://wa.me/+94740952053
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
 *➍ ||  Telegram =* https://t.me/+0Fu4_dlsBUMyOGE1
▬▬▬▬▬▬▬▬▬▬▬▬▬▬

*❸ || Youtube =* https://www.youtube.com/@EXDEVILGAMING-FF
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*🧚‍♀️ᴄʀᴇᴀᴛᴇᴅ ʙʏ ©ᴍʀ ɴᴀᴅɪʟ🐼🍓*
`























if (fs.existsSync('./auth_info_baileys')) {

    fs.emptyDirSync(__dirname + '/auth_info_baileys');

  };

  

  router.get('/', async (req, res) =>  {



  const { default: SuhailWASocket, useMultiFileAuthState, Browsers, delay,DisconnectReason, makeInMemoryStore, } = require("@whiskeysockets/baileys");

  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

  async function SUHAIL() {

    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys')

    try {

      let Smd =SuhailWASocket({ 

        printQRInTerminal: false,

        logger: pino({ level: "silent" }), 

        browser: Browsers.macOS("Desktop"),

        auth: state 

        });





      Smd.ev.on("connection.update", async (s) => {

        const { connection, lastDisconnect, qr } = s;

        if (qr) {

                    // Ensure the response is only sent once

                    if (!res.headersSent) {

                        res.setHeader('Content-Type', 'image/png');

                        try {

                            const qrBuffer = (await toBuffer(qr));  // Convert QR to buffer

                            res.end(qrBuffer);  // Send the buffer as the response

                            return; // Exit the function to avoid sending further responses

                        } catch (error) {

                            console.error("Error generating QR Code buffer:", error);

                            

                            return; // Exit after sending the error response

                        }

                    }

        }





        if (connection == "open"){

          await delay(3000);

          let user = Smd.user.id;





//===========================================================================================

//===============================  SESSION ID    ===========================================

//===========================================================================================



          function randomMegaId(length = 6, numberLength = 4) {

                      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

                      let result = '';

                      for (let i = 0; i < length; i++) {

                      result += characters.charAt(Math.floor(Math.random() * characters.length));

                        }

                       const number = Math.floor(Math.random() * Math.pow(10, numberLength));

                        return `${result}${number}`;

                        }



                        const auth_path = './auth_info_baileys/';

                        const mega_url = await upload(fs.createReadStream(auth_path + 'creds.json'), `${randomMegaId()}.json`);



                        const string_session = mega_url.replace('https://mega.nz/file/', '');



                        const Scan_Id = string_session;

          console.log(`

====================  SESSION ID  ==========================                   

SESSION-ID ==> ${Scan_Id}

-------------------   SESSION CLOSED   -----------------------

`)





          let msgsss = await Smd.sendMessage(user, { text:  Scan_Id });

          await Smd.sendMessage(user, { text: MESSAGE } , { quoted : msgsss });

          await delay(1000);

          try{ await fs.emptyDirSync(__dirname+'/auth_info_baileys'); }catch(e){}





        }



        Smd.ev.on('creds.update', saveCreds)



        if (connection === "close") {            

            let reason = new Boom(lastDisconnect?.error)?.output.statusCode

            // console.log("Reason : ",DisconnectReason[reason])

            if (reason === DisconnectReason.connectionClosed) {

              console.log("Connection closed!")

             // SUHAIL().catch(err => console.log(err));

            } else if (reason === DisconnectReason.connectionLost) {

                console.log("Connection Lost from Server!")

            //  SUHAIL().catch(err => console.log(err));

            } else if (reason === DisconnectReason.restartRequired) {

                console.log("Restart Required, Restarting...")

              SUHAIL().catch(err => console.log(err));

            } else if (reason === DisconnectReason.timedOut) {

                console.log("Connection TimedOut!")

             // SUHAIL().catch(err => console.log(err));

            }  else {

                console.log('Connection closed with bot. Please run again.');

                console.log(reason)

              await delay(5000);

              exec('pm2 restart qasim');

              process.exit(0)

            }

          }







      });

    } catch (err) {

        console.log(err);

        exec('pm2 restart qasim');

       await fs.emptyDirSync(__dirname+'/auth_info_baileys'); 

       

    }

  }

  SUHAIL().catch(async(err) => {

    console.log(err)

    await fs.emptyDirSync(__dirname+'/auth_info_baileys'); 

    exec('pm2 restart qasim');





    //// MADE WITH 



});

return await SUHAIL()



  });

module.exports = router
