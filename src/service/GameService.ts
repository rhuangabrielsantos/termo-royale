import { IGame } from '../interfaces/IGame';
import { IPlayer } from '../interfaces/IPlayer';
import { database } from './FirebaseService';

export class GameService {
  private gameRef = database.ref('games');

  public async createGame(game: IGame) {
    return await this.gameRef.push(game);
  }

  public async updateGame(gameId: string, game: IGame) {
    return await this.gameRef.child(gameId).update(game);
  }

  public async addPlayer(gameId: string, player: IPlayer) {
    return await this.gameRef
      .child(gameId)
      .child('players')
      .set([
        ...(
          await this.gameRef
            .child(gameId)
            .child('players')
            .once('value')
        ).val(),
        player,
      ]);
  }
}
