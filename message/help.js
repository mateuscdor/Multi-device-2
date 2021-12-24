exports.allmenu = (conn, prefix, pushname, ucapanWaktu) => {
    return `Hi ${pushname ? pushname : 'Kak'} ${ucapanWaktu}, Berikut list menu yang tersedia di Bot ini!

*Downloader*
≻ ${prefix}play _query_
≻ ${prefix}tiktok _link_
≻ ${prefix}tiktokaudio _link_
≻ ${prefix}ytmp4 _link_
≻ ${prefix}ytmp3 _link_
≻ ${prefix}instagram _link_
≻ ${prefix}facebook _link_
≻ ${prefix}twitter _link_

*Search Menu*
≻ ${prefix}brainly _teks_
≻ ${prefix}google _teks_
≻ ${prefix}ytsearch _query_
≻ ${prefix}chord _query_
≻ ${prefix}lirik _query_

*Bmkg Menu*
≻ ${prefix}cuaca _daerah_
≻ ${prefix}infogempa

*Converter/Tools*
≻ ${prefix}sticker
≻ ${prefix}toimg
≻ ${prefix}tovid
≻ ${prefix}style _teks_

*Information Bot*
≻ ${prefix}menu
≻ ${prefix}donasi
≻ ${prefix}speed
≻ ${prefix}runtime

*Group Only*
≻ ${prefix}grup buka/tutup
≻ ${prefix}revoke
≻ ${prefix}hidetag _teks_
≻ ${prefix}tagall
≻ ${prefix}listadmin
≻ ${prefix}delete (reply chat bot)

*Anime*
≻ ${prefix}loli
≻ ${prefix}waifu

*Owner Only*
≻ ${prefix}cekall
≻ ${prefix}meadmin
≻ >>
≻ $
≻ =>
≻ ${prefix}join

*Thanks To*
≻ Farhan
≻ Ichi
≻ Fxc7
≻ Mas Gimenz
≻ Rashid Siregar
≻ Zbin Galang


Fitur lainya coming soon..
    `
}
