"use strict";
class PictureOverlay{
	constructor(wrapper, overlayDiv, line, circle){
		this.circle = document.getElementById(circle);
		this.wrapper = document.getElementById(wrapper);
		this.overlayDiv = document.getElementById(overlayDiv);
		this.line = document.getElementById(line);
	}
	checkCoordinates(event){
		let x = event.clientX - this.wrapper.offsetLeft;
		if (x>=this.wrapper.clientWidth) x = this.wrapper.clientWidth;
		else if (x<0) x=0;
		return x;
	}
	overlay(event) {
		let x = this.checkCoordinates(event);
		this.line.style.left = x+"px";
		this.overlayDiv.style.width = x+"px";
	}
}
let pictureOverlay = new PictureOverlay("pictures-wrapper", "overlay", "line", "circle");


pictureOverlay.circle.addEventListener("drag", function(event){
	pictureOverlay.overlay(event);
});

pictureOverlay.circle.addEventListener("dragend", function(event){
	pictureOverlay.overlay(event);
});
