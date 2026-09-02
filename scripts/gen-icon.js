const zlib = require('zlib')
const fs = require('fs')

function crc32(buf) {
  let c, table = []
  for (let n = 0; n < 256; n++) {
    c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c >>> 0
  }
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const typeBuf = Buffer.from(type, 'ascii')
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])))
  return Buffer.concat([len, typeBuf, data, crcBuf])
}

const size = 180
const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(size, 0)
ihdr.writeUInt32BE(size, 4)
ihdr[8] = 8
ihdr[9] = 2
const raw = Buffer.alloc(size * (size * 3 + 1))
for (let y = 0; y < size; y++) {
  const rowStart = y * (size * 3 + 1)
  raw[rowStart] = 0
  for (let x = 0; x < size; x++) {
    const i = rowStart + 1 + x * 3
    raw[i] = 0x0a
    raw[i + 1] = 0x0a
    raw[i + 2] = 0x0a
  }
}
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(raw)),
  chunk('IEND', Buffer.alloc(0)),
])
fs.writeFileSync('public/apple-touch-icon.png', png)
console.log('apple-touch-icon.png written:', png.length, 'bytes')