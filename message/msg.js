//"use strict";
const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
//Lib
const { color, bgcolor } = require('../lib/color')
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, fetchText, getBuffer, format, logic, generateProfilePicture, parseMention, getRandom } = require('../lib/myfunc')
//const { simple, smsg, getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep } = require("../lib/myfunc");
const { webp2mp4File } = require("../lib/convert")

//Module
const fs = require ("fs")
const moment = require("moment-timezone");
const util = require("util")
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const xfar = require('xfarr-api');
const axios = require('axios')
const hxz = require("hxz-api")
const yts = require("yt-search")
const speed = require("performance-now")
const googleIt = require('google-it')
const brainly = require('brainly-scraper')
const os = require('os')
const child = require("child_process")

//Exif&Stiker
const { exif } = require("./../lib/exif")
const WSF = require("wa-sticker-formatter");

//Scrape
const { tiktok, tiktok2 } = require("../scrape/tiktok.js")
const { igdl } = require('../scrape/igdl.js')
const { twitter } = require('../scrape/twitter.js')
const { alldownload } = require('../scrape/downloader.js')
const { ytmp3, ytmp4 } = require('../scrape/yt.js')
const { y2mateA, y2mateV } = require('../scrape/y2mate.js')
const { Gempa, Cuaca} = require("../scrape/bmkg")
const { lirikLagu } = require('../scrape/lirik.js')
const { chord } = require('../scrape/chord.js')
const { igstory } = require('../scrape/igstory.js')


//Tebal&Renggang
let mono = '*'
let mini = '```'

// Database
let mess = JSON.parse(fs.readFileSync('./message/response.json'));
let set = JSON.parse(fs.readFileSync("./config.json"));


moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(conn, msg, m, setting) => {
	try {
		let { ownerNumber, botName } = setting
		let thumbnailNya = fs.readFileSync(setting.pathimg)
		let { allmenu } = require('./help')
		const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
		const type = Object.keys(msg.message)[0]
		const content = JSON.stringify(msg.message)
		const fromMe = msg.key.fromMe
		const from = msg.key.remoteJid
		//const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''
		const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'listResponseMessage') && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : '';
                const toJSON = j => JSON.stringify(j, null,'\t')
		const Json = j => JSON.stringify(j, null,'\t')
		const jsonformat = j => JSON.stringify(j, null,'\t')
		if (conn.multi) {
			var prefix = /^[°•<π÷×¶∆£¢€¥®™✓Z=|~!?#$%^&.\/\\©^]/.test(chats) ? chats.match(/^[°•><π÷×¶∆£¢€¥®™✓Z=|~!?#$%^&.\/\\©^]/gi)[0] : '-'
		} else {
			if (conn.nopref) {
				prefix = ''
			} else {
				prefix = conn.prefa
			}
		}
		const args = chats.split(' ')
		const command = chats.toLowerCase().split(' ')[0] || ''
		const isCmd = command.startsWith(prefix)
		const isGroup = msg.key.remoteJid.endsWith('@g.us')
		const isPrivate = msg.key.remoteJid.endsWith('@s.whatsapp.net')
		const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
		const isOwner = ownerNumber.includes(sender)
                const zahra = ["6285376700928@s.whatsapp.net"]
                const isZahra = zahra.includes(sender)
		const pushname = msg.pushName || "Kak"
		const q = chats.slice(command.length + 1, chats.length)
		const body = chats.startsWith(prefix) ? chats : ''
		const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
		const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.id : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		//const isGroupAdmins = groupAdmins.includes(sender) || false
                const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
		
		const metadataGroups = isGroup ? await conn.groupMetadata(from) : '';
		const countAdminsGroups = isGroup ? metadataGroups.participants.map(map => map.admin == null).filter(fill => fill == true).length : '';
		const getParticipants = isGroup ? metadataGroups.participants : '';

                //Only Link
            const Link = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : ''
            const Wannn = Link.slice(0).trim().split(/ +/).shift().toLowerCase()
		
		//Auto Read/Auto Centang Biru
	    conn.sendReadReceipt(from, sender, [msg.key.id])
		
		
		// Bot Status
        const used = process.memoryUsage()
        const cpus = os.cpus().map(cpu => {
            cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
			return cpu
        })
        const cpu = cpus.reduce((last, cpu, _, { length }) => {
            last.total += cpu.total
			last.speed += cpu.speed / length
			last.times.user += cpu.times.user
			last.times.nice += cpu.times.nice
			last.times.sys += cpu.times.sys
			last.times.idle += cpu.times.idle
			last.times.irq += cpu.times.irq
			return last
        }, {
            speed: 0,
			total: 0,
			times: {
			    user: 0,
			    nice: 0,
			    sys: 0,
			    idle: 0,
			    irq: 0
            }
        })
        
        
		async function downloadAndSaveMediaMessage (type_file, path_file) {
			if (type_file === 'image') {
				var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
			} else if (type_file === 'video') {
				var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
			} else if (type_file === 'sticker') {
				var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
			} else if (type_file === 'audio') {
				var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
			}
		}
		

const sendFileFromUrl = async (from, url, caption, mek, men) => {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            if (mime.split("/")[1] === "gif") {
                return conn.sendMessage(from, { video: await getBuffer(url), caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: m})
                }
            let type = mime.split("/")[0]+"Message"
            if(mime === "application/pdf"){
                return conn.sendMessage(m.chat, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, mentions: men ? men : []}, {quoted: mek })
            }
            if(mime.split("/")[0] === "image"){
                return conn.sendMessage(m.chat, { image: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: m})
            }
            if(mime.split("/")[0] === "video"){
                return conn.sendMessage(m.chat, { video: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: m})
            }
            if(mime.split("/")[0] === "audio"){
                return conn.sendMessage(m.chat, { audio: await getBuffer(url), caption: caption, mentions: men ? men : [], mimetype: 'audio'}, {quoted: m })
            }
        } 
		
                async function sendPlay(from, query) {
                  var url = await yts(query)
                  url = url.videos[0].url
                  hxz.youtube(url).then(async(data) => {
                  var button = [{ buttonId: `!ytmp3 ${url}`, buttonText: { displayText: `🎵 Audio (${data.size_mp3})` }, type: 1 }, { buttonId: `!ytmp4 ${url}`, buttonText: { displayText: `🎥 Video (${data.size})` }, type: 1 }]
                  conn.sendMessage(from, { caption: `*Title :* ${data.title}\n*Quality :* ${data.quality}\n*Url :* https://youtu.be/${data.id}`, location: { jpegThumbnail: await getBuffer(data.thumb) }, buttons: button, footer: 'Pilih Salah Satu Button Dibawah⬇️', mentions: [sender] })
                  }).catch((e) => {
                    conn.sendMessage(from, { text: mess.error.api }, { quoted: msg })
                    ownerNumber.map( i => conn.sendMessage(from, { text: `Send Play Error : ${e}` }))
                  })
                }
const sendHidetag = async function(from, text){
var h = (await conn.groupMetadata(from)).participants.map(a => a.id)
conn.sendMessage(from, { text: text, mentions: h})
}
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
		}
		const reply = (teks) => {
                        conn.sendPresenceUpdate('composing', from)
			conn.sendMessage(from, { text: teks }, { quoted: msg })
		}
		const textImg = (teks) => {
			return conn.sendMessage(from, { text: teks, jpegThumbnail: fs.readFileSync(setting.pathimg) }, { quoted: msg })
		}
		const sendMess = (hehe, teks) => {
			conn.sendMessage(hehe, { text, teks })
		}
		const mentions = (teks, memberr, id) => {
			(id == null || id == undefined || id == false) ? conn.sendMessage(from, teks.trim(), "extendedTextMessage", { contextInfo: { "mentionedJid": memberr } }) : conn.sendMessage(from, teks.trim(), "extendedTextMessage", { quoted: msg, contextInfo: { "mentionedJid": memberr } });
		};
		const buttonWithText = (from, text, footer, buttons) => {
			return conn.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
		}
		const sendContact = (jid, numbers, name, quoted, mn) => {
			let number = numbers.replace(/[^0-9]/g, '')
			const vcard = 'BEGIN:VCARD\n' 
			+ 'VERSION:3.0\n' 
			+ 'FN:' + name + '\n'
			+ 'ORG:;\n'
			+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
			+ 'END:VCARD'
			return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
		}
		
		const templateButtons = [
			{ callButton: {displayText: `Call Owner!`, phoneNumber: `+6281528743676`} },
			{ urlButton: { displayText: `Website!`, url : `http://api-xcoders.xyz/`} },
			{ quickReplyButton: { displayText: `🧑 Owner`, id: `${prefix}owner` } },
			{ quickReplyButton: { displayText: `💰Sewa Bot `, id: `${prefix}donate` } },
			{ quickReplyButton: { displayText: `📶 Statistic`, id: `${prefix}stat` } }
		]
        
		const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedMsg = (type == 'extendedTextMessage')
		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false
		
		if (chats.startsWith('>') && isOwner) {
		  	try {
						const evaling = await eval(`;(async () => {
							${chats.slice(2)}
							})();`);
						const utilites = await util.format(evaling);
						reply(utilites);
					} catch (e) {
						reply(util.format(e));
					}
				}
		
//Deteksi Hidetag
if (
      isGroup && !m.key.fromMe && m.message[m.mtype]?.contextInfo?.mentionedJid?.length ==
        groupMembers.length
    ) {
      console.log(
        color("[ANTI-HIDETAG]", "red"),
        color(`@${sender.split("@")[0]} mengirim pesan hidetag`, "white")
      );
      nkh = sender
     conn.sendMessage(from, { text: `${mono}Terdeteksi @${nkh.split("@s.whatsapp.net")[0]} Melakukan Hidetag!${mono}`, contextInfo: { mentionedJid: [nkh]} }, { quoted: m })
}

		if (chats.startsWith('$') && isOwner) {

exec(q, (err, stdout) => {
if(err) return reply(`${err}`)
if (stdout) {
reply(`${stdout}`)
}
})
}
		// Logs;
		if (!isGroup && isCmd) console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		if (isGroup && isCmd) console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))

                //NoPref
  if (/https:\/\/.+\.tiktok.+/g.test(chats) && !m.isBaileys) {
             url = chats.match(/https:\/\/.+\.tiktok.+/g)[0]
                     reply(mess.wait)
			    res = await tiktok2(url)
conn.sendMessage(from, {
				 video: { url: res.data.video },
				 caption: `✅Sukses Download Video Tiktok\n\nJika ingin mengubah ke audio/music, tekan tombol dibawah, jika tidak terlihat ketik ${prefix}tiktokaudio ${url}`,
				 buttons: [{buttonId: `${prefix}tiktokaudio ${url}`, buttonText: { displayText: "Audio" }, type: 1 }],
				 footer: "Create by Wans-Bot"
			      }, { quoted: msg }).catch(() => reply(mess.error.api))
			}

		switch(command) {
case prefix+'igs': case prefix+'igstory': case prefix+'instastory':
if (!q) return reply(`Contoh:\n${command} ekooju`)
reply(mess.wait)
igstory(q).then(data => {
if(data.medias.length > 10) return  reply(`Maaf ${pushname} file media terlalu banyak, maksimal 10`)
reply(`✅Instastory Download From IG\n\n${mono}[ Info Account ]${mono}\n≻ Username: ${data.user.username}\n≻Jumlah Media: ${data.medias.length}\n≻ Followers: ${data.user.followers}\n≻ Following: ${data.user.following}\n≻ Bio: ${data.user.biography}`)
for (let i of data.medias) {
				 if (i.fileType === "mp4") {
				   conn.sendMessage(from, { video: { url: i.downloadUrl }, caption: mess.success}, {quoted: msg })
				 } else if (i.fileType === "jpg") {
				   conn.sendMessage(from, { image: { url: i.downloadUrl }, caption: mess.success}, {quoted: msg })
			         }
			       }
}).catch(err => reply(mess.error.api))
break
case prefix+'attp':
if (args.length === 1) return reply(`Contoh:\n${command} ${pushname}`)
conn.sendMessage(from, {sticker: await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(q)}`)}, {quoted: m}).catch(err => reply(mess.error.api))
break
case prefix+'couple': case prefix+'ppcouple': case prefix+'cople':
cpnya = fs.readFileSync('./scrape/couple.js');
                 jsonData = JSON.parse(cpnya);
                 randIndex = Math.floor(Math.random() * jsonData.length);
                 randKey = jsonData[randIndex];
sendFileFromUrl(m.chat, randKey.male, 'Cowo', m)
sendFileFromUrl(m.chat, randKey.female, 'cewe', m)
break
case prefix+'yts': case prefix+'ytsearch':
if (args.length === 1) return reply(`Contoh:\n${command} bukti Virgoun`)
let list_rows = [];
            const data = await yts(q);
for(let a of data.all) {
list_rows.push({
title: a.title, description: `Channel: ${a.author.name} | Durasi: ${a.duration}`, rowId: `${prefix}yt ${a.url}`
})
}
    const button = {
        title: `Hasil Pencarian Dari ${q}`,
        description: "Silahkan Tap Tombol Dibawah!",
        footerText: `Create by Wans-Bot`,
        buttonText: 'Tap Disini!',
        listType: 'SINGLE_SELECT',
        sections: [
            {
                title: "Hasil Pencarian", 
                rows: list_rows
            }
        ]
        }
        const templateList = generateWAMessageFromContent(from, proto.Message.fromObject({ "listMessage": button }), {});
        conn.relayMessage(from, templateList.message, { messageId: templateList.key.id });
break
case prefix+'meadmin':
if (!isOwner) return 
if (!m.isGroup) return reply(mess.OnlyGrup)
conn.groupParticipantsUpdate(m.chat, [sender], 'promote')
atmnt = `${mono}Succes, @${sender.split("@s.whatsapp.net")[0]} anda telah menjadi admin di group ${groupName}${mono}`
conn.sendMessage(from, { text: atmnt, contextInfo: { mentionedJid: [sender]} }, { quoted: m })
break
case prefix+'demoteme':
if (!isOwner) return 
if (!m.isGroup) return reply(mess.OnlyGrup)
conn.groupParticipantsUpdate(m.chat, [sender], 'demote')
atmnt = `${mono}Succes, @${sender.split("@s.whatsapp.net")[0]} anda telah di demote di group ${groupName}${mono}`
conn.sendMessage(from, { text: atmnt, contextInfo: { mentionedJid: [sender]} }, { quoted: m })
break
case prefix+'listadmin': case prefix+'adminlist': 
if (!m.isGroup) return reply(mess.OnlyGrup)
          if (!isGroupAdmins) return reply(mess.GrupAdmin)
let numberAdmin = [];
				var teks = `\t\tAdmin Group *${groupName}*\n\n`;
				for (let adm of getParticipants) {
					if (adm.admin !== null) {
						numberAdmin.push(adm.id);
						teks += `[+] @${adm.id.split("@")[0]}\n`;
					}
				}
			conn.sendMessage(from, { text: teks, mentions: numberAdmin }, { quoted: m });
			break
case prefix+'infoall': case prefix+'tagall': case prefix+'mentionall':
                if (!m.isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins) return reply(mess.GrupAdmin)
                 let tekss = `══✪〘 *👥 Mention All, Pesan : ${q ? q : 'Tidak Ada'} * 〙✪══\n\n`
		      	for (let mem of groupMembers) {
		            tekss += `࿃➡️ @${mem.id.split('@')[0]}\n`
				}
                teks += `\n⋙ ${botName} ⋘`
conn.sendMessage(from, { text: tekss, mentions: groupMembers.map(a => a.id) }, { quoted: m })
break
case prefix+'chord':
if (args.length === 1) return reply(`Contoh:\n${command} bukti Virgoun`)
chord(q).then(res => 
reply(`Chord dari lagu ${q}\n${res.chord}`)).catch(err => {
	reply(`Chord Dari Lagu ${q} tidak ditemukan!!!`)
	console.log(err)
})
break
case prefix+'lirik': case prefix+'lyrics':
if (args.length === 1) return reply(`Contoh:\n${command} bukti Virgoun`)
lirikLagu(q).then((res) => {
let lirik = `「  *Lirik Dari Lagu ${q}  」

${res[0].result}
`
reply(lirik)
}).catch(err => {
	reply(`Lirik Dari Lagu ${q} tidak ditemukan!!!`)
	console.log(err)
})
break
case prefix+'infogempa': case prefix+'gempa': 
Gempa().then( v => 
conn.sendMessage(m.chat, { image: { url: v.map }, caption: `${mono}Info Gempa${mono}\n• Waktu: *${v.waktu}*\n• Lintang: *${v.lintang}*\n• Bujur: *${v.bujur}*\n• Magnitudo: *${v.magnitudo}*\n• Kedalaman: *${v.kedalaman}*\n• Wilayah: *${v.wilayah}*\n` }, { quoted: m})
)
break
case prefix+'infocuaca': case prefix+'cuaca': 
if (args.length === 1) return reply(`Contoh:\n${command} surabaya`)
Cuaca(q).then( v => {
reply(`✅Hasil Pencarian Cuaca ${q}\n• Daerah: *${v.Name}*\n• Longlitude: *${v.Longitude}*\n• Latitude: *${v.Latitude}*\n• Suhu: *${v.Suhu}*\n• Angin: *${v.Angin}*\n• Kelembapan: *${v.Kelembaban}*\n• Cuaca: *${v.Cuaca}*\n• Keterangan: *${v.Keterangan}*\n• Udara: *${v.Udara}*`)
})
		break
case prefix+'style': case prefix+'styletext': case prefix+'styleteks':
if (args.length === 1) return reply(`Contoh:\n${command} ${pushname}`)
try {
const cheerio = require('cheerio')
const fetch = require('node-fetch')
let respon = await fetch('http://qaz.wtf/u/convert.cgi?text=' + encodeURIComponent(args[1]))
 let html = await respon.text()
$ = cheerio.load(html)
reply($('tab
