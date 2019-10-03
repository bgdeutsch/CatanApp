import axios from 'axios'

function GetBaseApiUrl() {
  const env = process.env.NODE_ENV
  const devURL = process.env.REACT_APP_DEVELOPMENT_API
  const prodURL = process.env.REACT_APP_PRODUCTION_API

  return env === "development" ? devURL : prodURL
}

export function fetchRecentGames() {
  const URL = GetBaseApiUrl()

  return fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      if (!data) {
        console.warn("Data could not be fetched")
      }

      return data
    })
}

export function fetchGameTypes() {
  const URL = GetBaseApiUrl() + 'gametypes'

  return fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      if (!data) {
        console.warn("Data could not be fetched")
      }

      return data
    })
}

export function fetchPlayers(gameID) {
  const URL = `${GetBaseApiUrl()}player/all?gameID=${gameID}`
  return fetch(URL)
  .then((res) => res.json())
  .then((players) => {
    return players
  })
}

export async function fetchStats(gameTypeID) {
  const [gameStats, playerStats] = await Promise.all([fetchGameTypeStats(gameTypeID), fetchGameTypeStatsByPlayer(gameTypeID)])

  return [gameStats, playerStats]
}

function fetchGameTypeStats(gameTypeID) {
  const URL = GetBaseApiUrl() + `stats/gametypes/${gameTypeID}`
  return fetch(URL)
  .then(res => res.json())
  .then(stats => {
    return stats
  })
}

function fetchGameTypeStatsByPlayer(gameTypeID) {
  const URL = GetBaseApiUrl() + `stats/gametypes/${gameTypeID}/all`
  return fetch(URL)
  .then(res => res.json())
  .then(stats => {
    return stats
  })
}

export async function fetchGame(gameID) {
  const [gameDetail, participantDetail] = await Promise.all([fetchGameDetail(gameID), fetchPlayerDetailByGame(gameID)])

  return [gameDetail, participantDetail]
}

function fetchGameDetail(gameID) {
  const URL = `${GetBaseApiUrl()}game/${gameID}`
  return fetch(URL)
    .then(res => res.json())
    .then(game => {
      return game
    })
}

function fetchPlayerDetailByGame(gameID) {
  const URL = `${GetBaseApiUrl()}game/${gameID}/participants`
  return fetch(URL)
    .then(res => res.json())
    .then(players => {
      return players
    })
}

export function getActiveGame() {
  const URL = GetBaseApiUrl() + 'activegame'

  return fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    if (!data) {
      console.warn("Data could not be fetched")
    }

    return data
  })
}

export function createNewGame(gameTypeID, notes) {
  const URL = GetBaseApiUrl() + 'create'

  const newGame = axios.post(URL, {
    gameTypeID,
    notes
  })

  return newGame
}

export function createGameParticipant(playerID, placementOrder, VP) {
  const URL = `${GetBaseApiUrl()}create/participant`

  const newParticipant = axios.post(URL, {
    playerID,
    placementOrder,
    VP
  })

  return newParticipant
}

export function completeGame(gameID) {
  const URL = `${GetBaseApiUrl()}game/${gameID}`

  return axios.put(URL)
}