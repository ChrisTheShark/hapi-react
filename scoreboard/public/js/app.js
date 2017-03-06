import React from 'react';
import ReactDOM from 'react-dom';
import css from '../css/app.css';

const PLAYERS = [
  {
    id: 1,
    name: "Chris Dyer",
    score: 32
  },
  {
    id: 2,
    name: "John Thomas",
    score: 13
  },
  {
    id: 3,
    name: "Tommy Pence",
    score: 26
  }
]

function Stats(props) {
  const totalPlayers = props.players.length;
  const totalPoints = props.players.reduce(
    (total, player) => { return total + player.score; }, 0
  );

  return (
    <table>
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  );
}

Stats.propTypes = {
  players: React.PropTypes.array.isRequired
}

function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players}/>
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired
};

function Counter(props) {
  return (
    <div className="counter">
      <button className="counter-action decrement"
          onClick={() => { props.onChange(-1); }}> - </button>
        <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment"
          onClick={() => { props.onChange(1); }}> + </button>
    </div>
  );
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
}

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange}/>
      </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired
};

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.initialPlayers
    }
    this.onScoreChange = this.onScoreChange.bind(this);
  }
  onScoreChange(index, delta) {
    this.state.players[index].score += delta;
    this.setState(this.state);
  }
  render() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players}/>
        <div className="players">
          {
            this.state.players.map((player, index) => {
              return (
                <Player
                  name={player.name}
                  score={player.score}
                  key={player.id}
                  onScoreChange={(delta) => { this.onScoreChange(index, delta); }}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

Application.propTypes = {
  title: React.PropTypes.string,
  initialPlayers: React.PropTypes.arrayOf(
    React.PropTypes.shape(
      {
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        score: React.PropTypes.number.isRequired
      }
    )
  ).isRequired
};

Application.defaultProps = {
  title: "Scoreboard"
};

ReactDOM.render(<Application initialPlayers={PLAYERS}/>,
  document.getElementById('container'));
