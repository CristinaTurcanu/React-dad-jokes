import React, {Component} from 'react';
import './Joke.css'

class Joke extends Component {
    getColor () {
        if (this.props.votes >= 15) {
            return "#4caf50"
        } else if (this.props.votes >= 12) {
            return "#8bc34a"
        } else if (this.props.votes >= 9) {
            return "#cddc39"
        } else if (this.props.votes >= 6) {
            return "#ffeb38"
        } else if (this.props.votes >= 4) {
            return "#ffc107"
        } else if (this.props.votes >= 0) {
            return "#ff9800"
        } else {
            return "#f44336"
        }
    }
    getEmoji () {
        if (this.props.votes >= 15) {
            return "em em-rolling_on_the_floor_laughing"
        } else if (this.props.votes >= 12) {
            return "em em-_laughing"
        } else if (this.props.votes >= 9) {
            return "em em-smiley"
        } else if (this.props.votes >= 6) {
            return "em em-slightly_smiling_face"
        } else if (this.props.votes >= 4) {
            return "em em-neutral_face"
        } else if (this.props.votes >= 0) {
            return "em em-confused"
        } else {
            return "em em-angry"
        }
    }
    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i className="fas fa-arrow-up" onClick={this.props.upVote}/>
                    <span className="Joke-votes" style={{borderColor: this.getColor()}}>{this.props.votes}</span>
                    <i className="fas fa-arrow-down" onClick={this.props.downVote}/>
                </div>
                <div className="Joke-text">{this.props.text}</div>
                <div className="Joke-smiley">
                    <i className={this.getEmoji()} />
                </div>
            </div>
        );
    }
}

export default Joke;
