var scripts = new Array
(
	new Array("settings","src/settings_00334668.js","ISO-8859-1"),
	new Array("game","src/vampires_0024668.js","UTF-8")
);

function loadScripts(s)
{
	for(var i=0,len=s.length;i < len;i++)
	{
		loadScript(s[i][0],s[i][1],s[i][2]);
	}
}

function loadScript(id, source, cs)
{	
	if(cs == "UTF-8")
	{
		document.write("<script id=\"js_"+id+"\" type=\"text/javascript\" src=\""+ source+"\" charset=\"utf-8\"></script>");
	}
	else	
	{
		document.write("<script id=\"js_"+id+"\" type=\"text/javascript\" src=\""+ source+"\"></script>");
	}
}

loadScripts(scripts);