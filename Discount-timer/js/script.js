const oneDay = 24*3600*1000;//one day in miliseconds
const oneHour = 3600*1000;//one hour in miliseconds
const oneMinute = 60*1000;//one minute in miliseconds
const oneSecond = 1000;//one second in miliseconds
let discountTimer;

function dateDiff(endDate, startDate = new Date()) {
	const fullDiff = endDate - startDate;
	if (fullDiff>0) {
		let days = Math.floor(fullDiff/oneDay);
		let hours = Math.floor((fullDiff/oneHour)%24);
		let minutes = Math.floor((fullDiff/oneMinute)%60);
		let seconds = Math.floor((fullDiff/oneSecond)%60);
		if (days<10) day="0"+days;
		if (hours<10) hours="0"+hours;
		if (minutes<10) minutes="0"+minutes;
		if (seconds<10) seconds="0"+seconds;
		return {
			"days": days,
			"hours": hours,
			"minutes": minutes,
			"seconds": seconds
		}
	}
}

function writeDiff(){
	const startDate = new Date();
	const diff = dateDiff(endDate, startDate);
	if (diff!=undefined) {
		daysLeft.textContent = diff.days;
		timeLeft.textContent = `${diff.hours}:${diff.minutes}:${diff.seconds}`;
	}
	else {
		periodLeft.innerHTML = "<b>Discount period is over!</b>";
		clearInterval(discountTimer);
	}
}
function setAndUpdateDiscountTime(endDate) {
	endDateLabel.textContent  = 
	`${endDate.getDate()<10?"0"+endDate.getDate():endDate.getDate()}/
	${(endDate.getMonth())<10?"0"+(endDate.getMonth()+1):(endDate.getMonth()+1)}/
	${endDate.getFullYear()}`;

	endTimeLabel.textContent = 
	`${endDate.getHours()<10?"0"+endDate.getHours():endDate.getHours()}:
	${(endDate.getMinutes())<10?"0"+endDate.getMinutes():endDate.getMinutes()}`;
	writeDiff();

	discountTimer = setInterval(()=>{
		writeDiff();
	}, 
	oneSecond);
}
//Select to interact
const periodLeft = document.querySelector("#periodLeft");
const daysLeft = document.querySelector("#daysLeft");
const timeLeft = document.querySelector("#timeLeft");
const endDateLabel = document.querySelector("#endDate");
const endTimeLabel = document.querySelector("#endTime");

const endDate = new Date("2021-02-01T21:00");//wanted end date
setAndUpdateDiscountTime(endDate);