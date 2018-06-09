// VIRTUAL TRUCKER RICH PRESENCE 2.50

const {
  compile
} = require('nexe')

if (process.argv[0] == '--ico') {
  compile({
    input: './index.js',
    build: true, //required to use patches
    ico: './assets/vtrpc.ico',
    name: 'release/VirtualTruckerRichPresence'
  }).then(() => {
    console.log('success')
  })
} else {
  compile({
    input: './index.js',
    name: 'release/VirtualTruckerRichPresence'
  }).then(() => {
    console.log('success')
  })
}