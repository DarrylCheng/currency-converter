$(document).ready(function() {
	initializeSelection("countryFROM");
	initializeSelection("countryTO");
	$('select').material_select();
	$('#convert').click(convert);
	$('.modal').modal();
});

var xmlhttp = new XMLHttpRequest();
var url = "https://api.fixer.io/latest"
var currencyRates = [];
var currencyAPI;

xmlhttp.onreadystatechange = function(){
	if (this.readyState == 4 && this.status == 200){
		currencyAPI = JSON.parse(this.responseText);
		document.getElementById('date').innerHTML = "Last currency update: "+currencyAPI["date"];	
	}
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

function convert(){
	console.log("Converting");
	var getInitialValue = parseInt(document.getElementById('oriCurrency').value); 
	console.log(getInitialValue);
	if (!(getInitialValue >= 0)){
		 Materialize.toast('Please input a valid positive number.', 2000);
		 return;
	}
	var countryFrom = document.getElementById('countryFROM').value; 
	var countryTo = document.getElementById('countryTO').value; 
	if(countryFrom == "NONE" || countryTo == "NONE"){
		 Materialize.toast('Please select both the countries.', 2000);
		 return;
	}

	console.log(currencyAPI.rates[countryFrom]);
	if(countryFrom == "EUR"){
		getInitialValue = getInitialValue*currencyAPI.rates[countryTo];
	}else if(countryTo == "EUR"){
		getInitialValue = getInitialValue/currencyAPI.rates[countryFrom];
	}else{
		getInitialValue = getInitialValue/currencyAPI.rates[countryFrom]*currencyAPI.rates[countryTo];
	}
	document.getElementById('outCurrency').value = getInitialValue.toFixed(2);
}

function initializeSelection(country){
	var option = [
		{countryName:"Australia Dollar",code:"AUD"},
		{countryName:"Bulgaria Lev",code:"BGN"},
		{countryName:"Brazil Real",code:"BRL"},
		{countryName:"Canada Dollar",code:"CAD"},
		{countryName:"China Yuan Renminbi",code:"CNY"},
		{countryName:"Croatia Kuna",code:"HRK"},
		{countryName:"Czech Republic Koruna",code:"CZK"},
		{countryName:"Denmark Krone",code:"DKK"},
		{countryName:"Euro",code:"EUR"},
		{countryName:"Hong Kong Dollar",code:"HKD"},
		{countryName:"Hungary Forint",code:"HUF"},
		{countryName:"India Rupee",code:"INR"},
		{countryName:"Indonesia Rupiah",code:"IDR"},
		{countryName:"Israel Shekel",code:"ILS"},
		{countryName:"Japan Yen",code:"JPY"},
		{countryName:"Malaysia Ringgit",code:"MYR"},
		{countryName:"Mexico Peso",code:"MXN"},
		{countryName:"New Zealand Dollar",code:"NZD"},
		{countryName:"Norway Krone",code:"NOK"},
		{countryName:"Philippines Peso",code:"PHP"},
		{countryName:"Poland Zloty",code:"PLN"},
		{countryName:"Romania New Leu",code:"RON"},
		{countryName:"Russia Ruble",code:"RUB"},
		{countryName:"Singapore Dollar",code:"SGD"},
		{countryName:"Sweden Krona",code:"SEK"},
		{countryName:"Switzerland Franc",code:"CHF"},
		{countryName:"South Africa Rand",code:"ZAR"},
		{countryName:"South Korea Won",code:"KRW"},
		{countryName:"Thailand Baht",code:"THB"},
		{countryName:"Turkey Lira",code:"TRY"},
		{countryName:"United Kingdom Pound",code:"GBP"},
		{countryName:"United States Dollar",code:"USD"}
	];

	var selectionBox = document.getElementById(country);
	for(var i = 0, l = option.length; i < l; i++){
		console.log(option[i].countryName);
		console.log(option[i].code);
 		selectionBox.options.add( new Option(option[i].countryName, option[i].code) );
	}
}
