<?php


class LogMaker
{
    private $error = null;

    function __construct()
    {
        if (!file_exists("log/"))
            mkdir("log/");
    }

    function createErrorLogFile($pdoError)
    {
        $this->error = $pdoError->getMessage();

        $File = "----------    " . date("d/m/Y - H:i:s") . "       ---------\n";

        $File .= "'SQL' => '{$this->Sql}'\n";

        foreach ($this->Paramns as $key => $value) 
        {
            $File .= "'{$key}' => '{$value}'\n";
        }

        $File .= $this->error . "\n";
        $File .= "\n\n";

        foreach ($_SERVER as $key => $value) 
        {
            $File .= "'{$key}'' => '{$value}'\n";
        }

        file_put_contents('log/' . date('Ymd his') . '.log', $File);
    }
}
