const FSDK = require('./index.js')


;(async () =>{
  const FAPI = await FSDK('cli_a133c336a9fbd00c', 'pqSheT2PZdemWFMBmC09vcgIhfP1sNHi')
  
  let res = await FAPI.message.send('e6288gb4', 'hello world')
  console.log(`res:`, res)
})()