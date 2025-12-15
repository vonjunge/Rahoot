import { Socket } from "@rahoot/common/types/game/socket"
import Game from "@rahoot/socket/services/game"
import Registry from "@rahoot/socket/services/registry"
import crypto from "crypto"

export const withGame = (
  gameId: string | undefined,
  socket: Socket,
  callback: (_game: Game) => void
): void => {
  if (!gameId) {
    socket.emit("game:errorMessage", "Game not found")

    return
  }

  const registry = Registry.getInstance()
  const game = registry.getGameById(gameId)

  if (!game) {
    socket.emit("game:errorMessage", "Game not found")

    return
  }

  callback(game)
}

export const createInviteCode = (length = 6): string => {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const charactersLength = characters.length
  let result = ""

  for (let i = 0; i < length; i += 1) {
    const randomIndex = crypto.randomInt(0, charactersLength)
    result += characters.charAt(randomIndex)
  }

  // Check for collision
  const registry = Registry.getInstance()
  const existingGame = registry.getGameByInviteCode(result)
  
  if (existingGame) {
    // Retry if collision detected (very rare with 36^6 combinations)
    return createInviteCode(length)
  }

  return result
}

export const timeToPoint = (startTime: number, secondes: number): number => {
  let points = 1000

  const actualTime = Date.now()
  const tempsPasseEnSecondes = (actualTime - startTime) / 1000

  points -= (1000 / secondes) * tempsPasseEnSecondes
  points = Math.max(0, points)

  return points
}
