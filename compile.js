// VIRTUAL TRUCKER RICH PRESENCE 2.74

const {
  compile
} = require('nexe')

compile({
  input: './index.js',
  name: './release/VirtualTruckerRichPresence',
  ico: './assets/vtrpc.ico',
  build: true,
}).then(() => {
  console.log('success')
})
