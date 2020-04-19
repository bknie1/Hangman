import React, { Component } from 'react';
import './Hangman.css';
import { randomWord } from './words.js';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';

class Hangman extends Component {
	/** by default, allow 6 guesses and use provided gallows images. */
	static defaultProps = {
		maxWrong: 6,
		images: [ img0, img1, img2, img3, img4, img5, img6 ]
	};

	constructor(props) {
		super(props);
		// this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
		this.state = { nWrong: 0, guessed: new Set(), answer: 'apple', solved: false };
		this.handleGuess = this.handleGuess.bind(this);
		this.restartGame = this.restartGame.bind(this);
	}

	/** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
	guessedWord() {
		return this.state.answer.split('').map((l) => (this.state.guessed.has(l) ? l : '_'));
	}

	/** handleGuess: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
	handleGuess(evt) {
		let l = evt.target.value;
		this.setState(
			(st) => ({
				guessed: st.guessed.add(l),
				nWrong: st.nWrong + (st.answer.includes(l) ? 0 : 1)
			}),
			() => {
				// If guessed contains all answer letters, solved
				let guessed = this.state.guessed;
				let solved = this.state.answer.split('').every((l) => {
					return guessed.has(l);
				});

				if (solved) {
					this.setState((st) => ({
						solved: true
					}));
					document.querySelector('.Hangman-solved').classList.add('show');
				}
			}
		);

		// Compare guessed to answer
	}

	restartGame() {
		this.setState((st) => ({
			nWrong: 0,
			guessed: new Set(),
			answer: 'apple',
			solved: false
		}));
		document.querySelector('.Hangman-solved').classList.remove('show');
	}

	/** generateButtons: return array of letter buttons to render */
	generateButtons() {
		return 'abcdefghijklmnopqrstuvwxyz'.split('').map((l) => (
			<button
				key={l}
				value={l}
				onClick={this.handleGuess}
				disabled={this.state.guessed.has(l) || this.state.nWrong >= this.props.maxWrong || this.state.solved}
			>
				{l}
			</button>
		));
	}

	/** render: render game */
	render() {
		return (
			<div className="Hangman">
				<h1>Hangman</h1>
				<img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong}/${this.props.maxWrong}`} />
				<p className="Hangman-solved">You win!</p>
				<p className="Hangman-wrong">Wrong: {this.state.nWrong}</p>
				<p className="Hangman-word">{this.guessedWord()}</p>
				<p className="Hangman-btns">{this.generateButtons()}</p>
				<button onClick={this.restartGame}>Reset</button>
			</div>
		);
	}
}

export default Hangman;
