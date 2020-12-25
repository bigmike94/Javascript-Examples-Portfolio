<?php
 $currencies = array();
 $client = new SoapClient('http://nbg.gov.ge/currency.wsdl');
 $currencies["usd"] = $client->GetCurrency('USD');
 $currencies["eur"] = $client->GetCurrency('EUR');
 $currencies["gbp"] = $client->GetCurrency('GBP');
 echo json_encode($currencies);
?>