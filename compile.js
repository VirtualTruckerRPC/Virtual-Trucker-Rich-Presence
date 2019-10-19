// VIRTUAL TRUCKER RICH PRESENCE 2.80

const {
  compile
} = require('nexe')

compile({
  input: './index.js',
  name: './release/VirtualTruckerRichPresence',
  ico: './assets/vtrpc.ico',
  build: false,
}).then(() => {
  console.log('success')
})
