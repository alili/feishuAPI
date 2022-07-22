const FAPI = require('./index')

;(async () => {
  const FClient = FAPI('cli_a1360c412078900c', '9JvV3wJ0KlsxNLuxLrpG2dWvMQeCkdtL')
  console.log(`FAPI:`, FClient)

  let token = await FClient.getTenantToken()

  console.log(`token:`, token)
})()
