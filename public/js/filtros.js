function scriptRegex(string)
{
	let regex1 = /<script>/g;
	let regex2 = /<\/script>/g;

	string = string.replace(regex1, "");
	string = string.replace(regex2, "");

	return string;
}