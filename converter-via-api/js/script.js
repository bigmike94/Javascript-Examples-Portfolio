"use strict";
document.addEventListener("DOMContentLoaded", getCurrencies);
const currencyInput = document.querySelectorAll("input[type='number']");
const gelInput = document.querySelector("input[name = 'gel']");
const usdInput = document.querySelector("input[name = 'usd']");
const eurInput = document.querySelector("input[name = 'eur']");
const gbpInput = document.querySelector("input[name = 'gbp']");
const errorMsg = document.querySelector("#errormsg");
let currencies;

function getCurrencies(argument) {
	const currenciesPromise = fetch("../request/request.php", {
		method: "GET",
		headers: {'Content-type': 'application/json'}
	}).then(response=>{
		if (response.ok) {
			loader.style.visibility = "hidden";
			return response.json();
		}
		else throw Error("Error while loading currencies data...");
	}).then(data => {
		currencies = data;
		gelInput.value = 1;
		usdInput.value = (gelInput.value/currencies["usd"]).toFixed(2);
		eurInput.value = (gelInput.value/currencies["eur"]).toFixed(2);
		gbpInput.value = (gelInput.value/currencies["gbp"]).toFixed(2);
	}).catch(error=>{
		errormsg.innerHTML = error+"<br>";
		console.log(error);
	});
}


function convertCurrencies(event){
	const currentTarget = event.target;
	if(currentTarget.name == "gel"){
		usdInput.value = (gelInput.value/currencies["usd"]).toFixed(2);
	    eurInput.value = (gelInput.value/currencies["eur"]).toFixed(2);
	    gbpInput.value = (gelInput.value/currencies["gbp"]).toFixed(2);
	}
	else {
		const gel = (currentTarget.value * currencies[currentTarget.name]).toFixed(2);
		for(let currency in currencies){
			gelInput.value = gel;
			if (currentTarget.name == currency) currentTarget.value = currentTarget.value;
			else document.querySelector(`input[name = '${currency}']`).value = (gel/currencies[currency]).toFixed(2);
		}
	}
}

currencyInput.forEach(currInput => {
	currInput.addEventListener("input", (event)=>{convertCurrencies(event)});
});
