"use strict";
class Game{
	usrPtLbl = document.getElementById("userPoints");
	cpuPtlbl = document.getElementById("cpuPoints");
	usrChImg = document.getElementById("userChoice");
	cpuChImg = document.getElementById("cpuChoice");
	startButton  = document.getElementById("start");
	userPoints = 0;
	cpuPoints = 0;
	answers = {ans: ["rock", "paper", "scissors"], pics: ["img/rock.png", "img/paper.png", "img/scissors.png"]}
	constructor(startButton, deleteButton){
		this.startButton = startButton;
		this.deleteButton = deleteButton;
	}
	getUsersChoice(){
		let choice = prompt("rock, paper or scissors?");
		let userFullAnswer = {};
		if (choice.length>0&&this.answers.ans.includes(choice)==true) {
			userFullAnswer.answer = choice;
			let ind = this.answers.ans.indexOf(choice);
			userFullAnswer.img = this.answers.pics[ind];
			return userFullAnswer;
		}
		else alert("Invalid choice");
	}
	getCpuChoice(){
		let randInd = Math.floor(Math.random()*3);//random number from 0-2 generated
		let cpuFullAnswer = {};
		cpuFullAnswer.answer = this.answers.ans[randInd];
		cpuFullAnswer.img = this.answers.pics[randInd];
		return cpuFullAnswer;
	}
	setPoints(){
		this.usrPtLbl.textContent = this.userPoints;
		this.cpuPtlbl.textContent = this.cpuPoints;
		localStorage.setItem('lastScore', `User: ${this.userPoints}, Cpu: ${this.cpuPoints}`);
		lastScore.textContent = localStorage.getItem("lastScore");
	}

	deleteScore(){
		delete localStorage['lastScore'];
		lastScore.textContent = localStorage.getItem("lastScore");
		this.userPoints = 0;
		this.cpuPoints = 0;
		localStorage.clear();

	}
	start(){
		let userChoice = this.getUsersChoice();
		let cpuChoice = this.getCpuChoice();
		if (userChoice!=false) {
			//set images
			this.usrChImg.setAttribute("src", userChoice.img);
			this.cpuChImg.setAttribute("src", cpuChoice.img);
			//-------------------------------------------set score--------------------------------------
			if (userChoice.answer==cpuChoice.answer) setTimeout(()=>{alert ("Draw"); }, 1000);
			else if (userChoice.answer=="rock"&&cpuChoice.answer=="scissors"||
				userChoice.answer=="scissors"&&cpuChoice.answer=="paper"||
				userChoice.answer=="paper"&&cpuChoice.answer=="rock") {
				setTimeout(() => {
					this.userPoints++;  
					this.setPoints();
					alert("You won");
				}, 1000);

			}
			else {
				setTimeout(()=>{ 
					this.cpuPoints++; 
					this.setPoints();
					alert ("You loose"); 
				}, 1000);

			}
			//set score later because math operations complete earlier that dom updates with images
		}
		
		else alert("Invalid choice");
	}
}

const startButton  = document.getElementById("start");
const deleteButton  = document.getElementById("deleteButton");
const lastScore = document.getElementById("lastScore");

const game = new Game(startButton, deleteButton);
game.startButton.addEventListener("click",  ()=>game.start());
game.deleteButton.addEventListener("click",  ()=>game.deleteScore());


lastScore.textContent = localStorage.getItem("lastScore");
