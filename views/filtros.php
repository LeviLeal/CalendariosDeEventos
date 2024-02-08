<?php
	class Filters
	{
		public function filterString($string)
		{
			$string = filter_var($string, FILTER_SANITIZE_STRING);
			$string = addslashes($string);

			return $string;
		}
	}
?>
