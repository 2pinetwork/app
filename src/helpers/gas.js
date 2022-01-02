const oracleApiKey = process.env.REACT_APP_ORACLE_API_KEY
const oracleUrl    = `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${oracleApiKey}`

export const suggestedGasPrice = async () => {
  let value = 31 // default gas price

  await fetch(oracleUrl).then(async response => {
    const data = (await response.json()).result

    if (data.ProposeGasPrice && data.SafeGasPrice) {
      value = (+data.ProposeGasPrice + +data.SafeGasPrice) / 2
    }
  }).catch(error => {
    console.error(`Gas price fetch error: ${error}`)
  })

  if (value < 31) {
    value = 31
  } else if (value >= 50) {
    value = 50
  }

  return (value * 1e9).toFixed()
}
