import React, {Component} from 'react';
import uuid from 'react-uuid'
import axios from 'axios'
import './JokeList.css'
import Joke from './Joke'

const API_URL = 'https://icanhazdadjoke.com/'

class JokeList extends Component {
    static defaultProps = {
        numberOfJokes: 10
    }
    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem('jokes')) || [],
            loading: false
        }
        this.seenJokes = new Set(this.state.jokes.map(joke => joke.text))
        this.handleVote = this.handleVote.bind(this)
        this.getNewJokes = this.getNewJokes.bind(this)
    }
    async componentDidMount() {
        if (this.state.jokes.length === 0) {
            await this.getJokes()
        }
    }
    async getJokes () {
        try {
            let jokes = []
            while (jokes.length < this.props.numberOfJokes) {
                const data = (await axios.get(API_URL,
                    {headers: {Accept: 'application/json'}}
                )).data
                const newJoke = data.joke
                if (!this.seenJokes.has(newJoke)) {
                    jokes.push({id: uuid(), text: data.joke, votes: 0})
                } else {
                    console.log("DUPLICATE")
                }
            }
            this.setState(state => ({
                    loading: false,
                    jokes: [...state.jokes, ...jokes]
                }),
                () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
            )
            window.localStorage.setItem("jokes", JSON.stringify(jokes))

        } catch (error) {
            alert(error)
            this.setState({loading: false})
        }
    }
    async getNewJokes () {
        this.setState({loading: true}, await this.getJokes)
    }
    handleVote(id, delta) {
        this.setState(state => ({
            loading: false,
            jokes: state.jokes.map(joke => joke.id === id ? {...joke, votes: joke.votes + delta} : joke )
        }),
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        )
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="JokeList-spinner">
                    <i className="far fa-8x fa-laugh fa-spin" />
                    <h1 className="JokeList-title">Loading...</h1>
                </div>
            )
        }
        const jokes = this.state.jokes.sort((a,b) => b.votes - a.votes)
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">
                        <span>Dad</span> Jokes
                    </h1>
                    <img
                        src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
                        alt="Emoji"
                    />
                    <button className="JokeList-btn" onClick={this.getNewJokes}>New Jokes</button>
                </div>
                <div className="JokeList-jokes">
                    {jokes.map(joke => (
                        <Joke
                            key={joke.id}
                            text={joke.text}
                            votes={joke.votes}
                            upVote={() => this.handleVote(joke.id, 1)}
                            downVote={() => this.handleVote(joke.id, -1)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default JokeList;
