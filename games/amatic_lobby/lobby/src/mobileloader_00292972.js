var scripts = new Array
(
	new Array("m_settings","src/settings.php","ISO-8859-1"),
	new Array("menu","src/mobile_00292972.js","UTF-8")
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

function loadGame(id)
{
	window.location.href = id+"?lobby=1";
}

loadScripts(scripts);