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

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      elapsedTime: 0,
      previousTime: 0
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.onTick = this.onTick.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onReset = this.onReset.bind(this);
  }
  componentDidMount() {
    this.interval = setInterval(this.onTick, 100);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  onTick() {
    if (this.state.running) {
      let now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime)
      });
    }
  }
  onStop() {
    this.setState({ running: false });
  }
  onStart() {
    this.setState({
      running: true,
      previousTime: Date.now()
    });
  }
  onReset() {
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now()
    });
  }
  render() {
    let seconds = Math.floor(this.state.elapsedTime / 1000);
    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        {
          this.state.running ?
          <button onClick={this.onStop}>Stop</button>
          :
          <button onClick={this.onStart}>Start</button>
        }
        <button onClick={this.onReset}>Reset</button>
      </div>
    );
  }
}

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
      <Stopwatch/>
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
        <a className="remove-player" onClick={props.onRemove}>X</a>
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
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
};

class AddPlayerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({ name: "" })
  }
  onNameChange(e) {
    this.setState({ name: e.target.value });
  }
  render() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange}/>
          <input type="submit" value="Add Player"/>
        </form>
      </div>
    );
  }
}

AddPlayerForm.propTypes = {
  onAdd: React.PropTypes.func.isRequired
}

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.initialPlayers
    }
    this.onScoreChange = this.onScoreChange.bind(this);
    this.onPlayerAdd = this.onPlayerAdd.bind(this);
  }
  onScoreChange(index, delta) {
    this.state.players[index].score += delta;
    this.setState(this.state);
  }
  onPlayerAdd(name) {
    this.state.players.push({
      id: this.state.players.length + 1,
      name: name,
      score: 0
    });
    this.setState(this.state);
  }
  onRemovePlayer(index) {
    this.state.players.splice(index, 1);
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
                  onRemove={() => { this.onRemovePlayer(index); }}
                />
              );
            })
          }
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd}/>
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
