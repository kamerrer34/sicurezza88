<?php
$apikey = "433db91430093ff7b84a89d340276226-us10";
$list_id = "5a1915bff9";
$auth = base64_encode( 'user:'.$apikey );
$merge_fields = array(
	'FNAME' => $fname,
	'LNAME' => $lname,
);
$data = $_POST;
$json_data = json_encode($data);
$ch = curl_init();
$curlopt_url = "https://us10.api.mailchimp.com/3.0/lists/$list_id/members/"; // NOTA: usare server che si trova nell'api key (-usXX)
curl_setopt($ch, CURLOPT_URL, $curlopt_url);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization: Basic '.$auth));
curl_setopt($ch, CURLOPT_USERAGENT, 'PHP-MCAPI/3.0');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
$answer = curl_exec($ch);
curl_close($ch);
$json_answer=json_decode($answer);
$msg="Email: ".$data['email_address']."\r\n".
     "status: ".$data['status']."\r\n".
     "NOME: ".$data['merge_fields']['NOME']."\r\n".
     "AZIENDA: ".$data['merge_fields']['AZIENDA']."\r\n".
     "PIVA: ".$data['merge_fields']['PIVA']."\r\n".
     "TELEFONO: ".$data['merge_fields']['TELEFONO']."\r\n".
     "REGIONE: ".$data['merge_fields']['REGIONE']."\r\n".
     "PROVINCIA: ".$data['merge_fields']['PROVINCIA']."\r\n".
     "CITTA: ".$data['merge_fields']['CITTA']."\r\n".
     "INDIRIZZO: ".$data['merge_fields']['INDIRIZZO']."\r\n".
     "CAP: ".$data['merge_fields']['CAP']."\r\n".
     "MESSAGGIO: ".$data['merge_fields']['MESSAGGIO']."\r\n".
     "CATALOGO: ".$data['merge_fields']['CATALOGO']."\r\n".
     "LIBRO: ".$data['merge_fields']['LIBRO']."\r\n".
     "SOURCE: ".$data['merge_fields']['SOURCE']."\r\n".
     "MEDIUM: ".$data['merge_fields']['MEDIUM']."\r\n".
     "CAMPAIGN: ".$data['merge_fields']['CAMPAIGN']."\r\n";
$headers .= "Reply-To: sistemianticaduta88 <noreply@sistemianticaduta88.com>\r\n";
$headers .= "Return-Path: sistemianticaduta88 <noreply@sistemianticaduta88.com>\r\n";
$headers .= "From: sistemianticaduta88 <noreply@sistemianticaduta88.com>\r\n";
$headers .= 'Cc: ' .' <misha@man-super.com>';
if (isset($json_answer->id)){
	echo 'TRUE';
	mail("misha@man-super.com", "Message from sistemianticaduta88.com", $msg, $headers);
} else {
	if ($json_answer->title == 'Member Exists') {
		// UPDATE
		$md5hash = md5(strtolower($data['email_address']));
		$ch = curl_init();
		$curlopt_url = "https://us10.api.mailchimp.com/3.0/lists/$list_id/members/$md5hash"; // NOTA: usare server che si trova nell'api key (-usXX)
		curl_setopt($ch, CURLOPT_URL, $curlopt_url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization: Basic '.$auth));
		curl_setopt($ch, CURLOPT_USERAGENT, 'PHP-MCAPI/3.0');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_TIMEOUT, 10);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
		$answer = curl_exec($ch);
		curl_close($ch);
		$json_upd_answer=json_decode($answer);
		if (isset($json_upd_answer->id)){
			echo 'TRUE';
			mail("info@sicurezza88.com", "Message from sicurezza88", $msg, $headers);
		} else {
			echo 'FALSE';
		}

	}
}
?>