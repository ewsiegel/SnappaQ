const Queue = require('./queue')
const {v4: uuidv4} = require("uuid")
const Game = require('./models/game')
const Profile = require('./models/profile')

class GameQueue {
    constructor(gameName, numPlayersPerTeam) {
        this.numPlayersPerTeam = numPlayersPerTeam;
        this.queue = new Queue();
        this.activeGame = {'team1': null, 'team2': null, 'id': null, 'timestamp': null};
        this.gameName = gameName;
    }

    gameActive() {
        return this.activeGame.id !== null;
    }

    tryActivateGame() {
        if (!this.gameActive() && this.activeGame.team1 !== null && this.activeGame.team2 !== null)  {
            console.log("Starting game between", this.activeGame.team1, "and", this.activeGame.team2);
            this.activeGame.id = uuidv4();
            this.activeGame.timestamp = Date.now();
            let game = new Game({
                gameType: this.gameName,
                gameId: this.activeGame.id,
                state: "active",
                players: {
                  team1: this.activeGame.team1,
                  team2: this.activeGame.team2,
                },
                winners: null,
                losers: null,
                timestamp: this.activeGame.timestamp,
            });
            game.save()/*.then(() => {
                console.log("Uploaded game to database");
            });*/
        }
    }

    // completeGame(winner) {

    // }

    completeGameLazy() {
        if (this.gameActive()) {
            console.log("Completed game between", this.activeGame.team1, "and", this.activeGame.team2);
            // team 1 loses
            Game.findOneAndUpdate({gameId: this.activeGame.id}, {state: "complete", winners: this.activeGame.team1, losers: this.activeGame.team2}).then(() => {
                console.log("Updated completed game in db");
            });
            this.activeGame.team2.forEach(async (player) => {
                Profile.findOneAndUpdate({id: player}, {$inc: {wins: 1}}).then(() => {
                    console.log("Incremented win for", player);
                });
            });
            this.activeGame.team1.forEach(async (player) => {
                Profile.findOneAndUpdate({id: player}, {$inc: {losses: 1}}).then(() => {
                    console.log("Incremented loss for", player);
                });
            });  
            this.activeGame.team1 = this.activeGame.team2;
            this.activeGame.team2 = null;
            this.activeGame.id = null;
            this.activeGame.timestamp = null;
            
            // team 2 loses
            // this.activeGame.team2 = null;
            // this.activeGame.id = null;
            // this.activeGame.timestamp = null;

            this.tryDequeue();
            this.tryActivateGame();
        }
        else {
            console.log("Tried to complete a game, but no game is active");
        }
    }

    queueEmpty() {
        return this.queue.size === 0;
    }

    tryDequeue() {
        //console.log(this.queue);
        if (this.activeGame.team1 === null) {
            if (!this.queueEmpty()) {
                this.activeGame.team1 = this.queue.dequeue();
            }
        }
        if (this.activeGame.team2 === null) {
            if (!this.queueEmpty()) {
                this.activeGame.team2 = this.queue.dequeue();
            }
        }
    }

    append(team) {
        if (Array.isArray(team) && team.length === this.numPlayersPerTeam) {
            console.log("Adding", team.join(","), "to queue")
            this.queue.enqueue(team);
            this.tryDequeue();
            this.tryActivateGame();
        }
        else {
            console.log("Added a team that is not the right size");
            //return an error
        }
    }

    clearQueue() {
        console.log("Clearing queue");
        if (this.gameActive()) {
            Game.deleteOne({id: this.activeGame.id});
        }
        this.queue = new Queue();
        this.activeGame = {'team1': null, 'team2': null, 'id': null, 'timestamp': null};
    }

}

module.exports = GameQueue;