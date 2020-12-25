/*code by Misha Kirichenko. Usage in comercial projects is prohibited :D*/
"use strict";
class Test {
	hour = 60*60*1000;
	minute = 60*1000;
	second = 1000;
	timeSpentElement = document.querySelector("#timeSpent");
	clockElement = document.querySelector("#clock");
	finish = document.querySelector("#finish");
	test_answers = document.querySelector("#test-answers");
	incorrect = document.querySelector("#incorrect");
	correct = document.querySelector("#correct");
	constructor(datalink, hoursLeft, minutesLeft){
		this.testId = datalink.split("/");
		this.testId = this.testId[1];
		this.testId = this.testId.split(".");
		this.testId = this.testId[0];
		this.totalTime = hoursLeft*this.hour+minutesLeft*this.minute;
		this.timeLeft = this.totalTime;
		this.loadData(datalink, hoursLeft, minutesLeft);
	}
	startTimer(hoursLeft, minutesLeft){
		const hoursElement = document.querySelector("#hours");
		const minutesElement = document.querySelector("#minutes");
		const timeOver = document.querySelector("#time-over");

		hoursElement.textContent =`${hoursLeft<10?"0"+hoursLeft+" ":hoursLeft}`;
		minutesElement.textContent = `${minutesLeft<10?"0"+minutesLeft:minutesLeft}:00`;

		this.timer = setInterval(()=>{
		  if (this.timeLeft>0) {
		  	  this.timeLeft = this.timeLeft-1000;
			  let hoursLeft = Math.floor(this.timeLeft/this.hour);
			  let minutesLeft = Math.floor((this.timeLeft/this.minute)%60);
			  let secondsLeft = Math.floor((this.timeLeft/this.second)%60);

			  hoursLeft = hoursLeft<10?"0"+hoursLeft:hoursLeft;
			  minutesLeft = minutesLeft<10?"0"+minutesLeft:minutesLeft;
			  secondsLeft = secondsLeft<10?"0"+secondsLeft:secondsLeft;
		  	  hoursElement.textContent = `${hoursLeft} `;
		  	  minutesElement.textContent = `${minutesLeft}:${secondsLeft}`;
		  }
		  else {
		  	clearInterval(this.timer);
		  	hoursElement.parentElement.style.display="none";
		  	minutesElement.parentElement.style.display="none";
		  	this.clockElement.style.display = "none";
		  	timeOver.style.display = "inline";
		  	this.disableAnswers();
		  	this.finish.style.display = "none";
		  }
		}, 1000);
	}
	loadData(datalink, hoursLeft, minutesLeft){
		const wholeTestBlock = document.querySelector("#test");
		const wasFilled = this.checkPreviousResults();//check from localstorage if test was filled before
		if (!wasFilled) {
			const response = fetch(datalink, {
				method: "GET",
				headers: {"Content-type": "application/json"}
			}).then(response=>{
				if (response.ok) return response.json();
				else throw Error("Error while loading test data..");
			})
			this.getData(response);
			wholeTestBlock.style.display = "block";
			this.startTimer(hoursLeft, minutesLeft);
		}
		else{
			this.test_answers.style.display = "block";
			const correct_answers = JSON.parse(localStorage[this.testId])["correct_answers"];
			const incorrect_answers = JSON.parse(localStorage[this.testId])["incorrect_answers"];
			const timeSpent = JSON.parse(localStorage[this.testId])["timeSpent"];
			const resultsHeader = document.querySelector("#results");
			this.writeResults(correct_answers, incorrect_answers, timeSpent)
			resultsHeader.textContent = this.testId.toUpperCase();
		}
	}
	getData(response){
		response.then(data=>{
		   this.renderData(data);
		   this.getRightQuestions(data);
		})
	}
	renderData(data){
		const questionsForm = document.querySelector("#questionsForm");
		data.forEach(question=>{
			const newQuestion = document.createElement("div");
			newQuestion.setAttribute("class", "question-block");
			newQuestion.innerHTML = `<h3 class="question-header">${question["question"]}</h3>`;
			question["answers"].forEach((answer,index)=>{
				newQuestion.innerHTML+= 
				`<div>
					<label for="v${question["id"]}.${index}">${answer}</label>
					<input type="radio" name="q${question["id"]}_ans" id="v${question["id"]}.${index}" 
					value=${index} required>
				</div>`;
			});
			questionsForm.append(newQuestion);
		});

	}
	disableAnswers(){
		const radioButtons = document.querySelectorAll("input[type=radio]");
		radioButtons.forEach(button=>button.setAttribute("disabled", true));
	}
	getRightQuestions(data){
		const question_block = document.querySelectorAll(".question-block");
		this.finish.addEventListener("click", ()=>{
			let correct_answers = 0;
			let incorrect_answers = 0;
			const right_answers = [];
			const users_answers = [];
			data.forEach(question=>right_answers.push(question["right-answer"]));
			question_block.forEach(item=>{
				const users_answer = item.querySelector("input[type=radio]:checked").value;
				users_answers.push(users_answer);
			});
			for (let i = 0; i < right_answers.length; i++) {
				if (users_answers[i]==right_answers[i]) {
					correct_answers++;
					const parent = question_block[i].querySelector("input[type=radio]:checked").parentElement;
					parent.style.border = "2px solid green";
				}
				else {
					const parent = question_block[i].querySelector("input[type=radio]:checked").parentElement;
					parent.style.border = "2px solid red";
					incorrect_answers++;
				}
			}
			clearInterval(this.timer);
			const timeSpent = this.countTimeSpent();//return of counted time that user spent on test
			this.finish.style.display = "none";
			this.test_answers.style.display = "block";
			this.clockElement.style.animation = "none";
			this.writeResults(correct_answers, incorrect_answers, timeSpent);
			this.disableAnswers();
			localStorage.setItem(this.testId, JSON.stringify({
				"testId": this.testId,
				"correct_answers": correct_answers,
				"incorrect_answers": incorrect_answers,
				"timeSpent": timeSpent  
			}));
		});
	}
	checkPreviousResults(){
		if (localStorage.hasOwnProperty(this.testId)) return true;
	}
	writeResults(correct_answers, incorrect_answers, timeSpent){
		this.correct.textContent = correct_answers;
		this.incorrect.textContent = incorrect_answers;
		this.timeSpentElement.textContent = timeSpent;	
	}
	countTimeSpent(){
		const timeSpent = this.totalTime - this.timeLeft;
		const hoursSpent = Math.floor(timeSpent/this.hour);
		const minutesSpent = Math.floor((timeSpent/this.minute)%60);
		const secondsSpent = Math.floor((timeSpent/this.second)%60);
		const timeSpentString = `
		${hoursSpent<10?"0"+hoursSpent:hoursSpent} hours ${minutesSpent<10?"0"+minutesSpent:minutesSpent}:${secondsSpent<10?"0"+secondsSpent:secondsSpent}`;
		return timeSpentString;
	}
}
const randTestInd = Math.floor(Math.random() * 2) + 1;
const test = new Test(`data/test-${randTestInd}.json`, 0, 3);