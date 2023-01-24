const Queue = require('./queue')
const {v4: uuidv4} = require("uuid")

class GameQueue {
    constructor(numPlayersPerTeam) {
        this.numPlayersPerTeam = numPlayersPerTeam;
        this.queue = new Queue();
        this.activeGame = {'team1': null, 'team2': null, 'id': null, 'timestamp': null};
    }

    // get activeGame() {
    //     return this.activeGame;
    // }

    // get numPlayersPerTeam() {
    //     return this._numPlayersPerTeam;
    // }

    // set numPlayersPerTeam(n) {
    //     this._numPlayersPerTeam = n;
    // }

    // get queue() {
    //     return this.queue;
    // }

    gameActive() {
        return this.activeGame.id !== null;
    }

    tryActivateGame() {
        //console.log(this.activeGame);
        if (!this.gameActive() && this.activeGame.team1 !== null && this.activeGame.team2 !== null)  {
            console.log("Starting game between", this.activeGame.team1, "and", this.activeGame.team2);
            this.activeGame.id = uuidv4();
            this.activeGame.timestamp = Date.now();
            //create in database
        }
    }

    // completeGame(winner) {

    // }

    completeGameLazy() {
        if (this.gameActive()) {
            console.log("Completed game between", this.activeGame.team1, "and", this.activeGame.team2);

            // team 1 loses
            this.activeGame.team1 = this.activeGame.team2;
            this.activeGame.team2 = null;
            this.activeGame.id = null;
            this.activeGame.timestamp = null;
            
            // team 2 loses
            // this.activeGame.team2 = null;
            // this.activeGame.id = null;
            // this.activeGame.timestamp = null;

            //update db
            
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

}

module.exports = GameQueue;