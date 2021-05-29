import { toastAdded, toastDestroyed } from '../features/toastsSlice'

export const getPrices = (vaults, dispatch) => {
  const ids = vaults.map(vault => vault.priceId).join()

  return fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  ).then(response => {
    dispatch(toastDestroyed('Prices loading error'))

    return response.json()
  }).catch(error => {
    dispatch(
      toastAdded({
        title: 'Prices loading error',
        body:  error.message,
        icon:  'exclamation-triangle',
        style: 'danger'
      })
    )
  })
}

