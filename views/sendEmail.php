<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailException;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

class sendEmail 
{
	const HOST = "smtp.gmail.com";
	const USER = "skmemes.2020@gmail.com";
	const PASS = "Footbzsit_30032022";
	const SECURE = "tls";
	const PORT = 587;
	const CHARSET = "UTF-8";
	const FROM_EMAIL = "skmemes.2020@gmail.com";
	const FROM_NAME = "Ascontec";

	private $error;

	public function send($addresses, $subject, $body, $attachment = [], $ccs = [], $bccs = [])
	{
		$this->error = "";

		$mail = new PHPMailer(true);
		$mail->ChartSet = self::CHARSET;

		try
		{
			$mail->isSMTP();
			$mail->Host = self::HOST;
			$mail->SMTPAuth = true;
			$mail->Username = self::USER;
			$mail->Password = self::PASS;
			$mail->SMTPSecure = self::SECURE;
			$mail->Port = self::PORT;

			$mail->setFrom(self::FROM_EMAIL, self::FROM_NAME);

			$addresses = is_array($addresses) ? $addresses : [$addresses];
			foreach ($addresses as $address) {
				$mail->addAddress($address);
			}

			$attachment = is_array($attachment) ? $attachment : [$attachment];
			foreach ($attachment as $attachment) {
				$mail->addAddress($attachment);
			}

			$ccs = is_array($ccs) ? $ccs : [$ccs];
			foreach ($ccs as $ccs) {
				$mail->addAddress($ccs);
			}

			$bccs = is_array($bccs) ? $bccs : [$bccs];
			foreach ($bccs as $bccs) {
				$mail->addAddress($bccs);
			}

			$mail->isHTML(true);
			$mail->addCustomHeader('Content-Type', 'text/plain;charset=utf-8');
			$mail->Subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
			$mail->Body = $body;

			return $mail->send();
		}

		catch(PHPMailException $e)
		{
			$this->error = $e->getMessage();
			return false;
		}
	}

	public function getError()
	{
		return $this->error;
	}

	public function emailNotification($email, $subject, $body, $attachment = [])
	{
		$mail = new sendEmail();

		$body = str_replace("&#34;", '"', $body);
		$subject = str_replace("&#34;", '"', $subject);

		if(str_contains($email, "outlook") || str_contains($email, "hotmail"))
		{
			$body = nl2br(utf8_decode($body));
		}

		$success = $mail->send($email, $subject, $body);
		echo $success ? "Email '" . $body . "' enviado para o endereço '" . $email . "'" : $mail->getError();
	}
}
?>