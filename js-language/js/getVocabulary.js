function getVocabulary(page, items){
	$(document).ready(function (){
	   let defLang;
	   localStorage.getItem('lang')?defLang=localStorage.getItem("lang"):defLang="en";
	   $.getJSON("../data/data.json", (data)=>{
			$(".nav-menu-items").each((index, item)=>$(item).text(data.menu[defLang][index]));
			$(items).each((index, item)=>$(item).text(data[page][defLang][index]));
		}).fail(function() {
		    alert("error");
		});
	});
}
function changeLang(page, items){
	$(document).ready(function (){
	  $(".lang-item").on("click", function(){
	  	 localStorage.lang = $(this).text().toLowerCase();
	  	 getVocabulary(page, items);
	  });
	});
}
export {getVocabulary, changeLang}