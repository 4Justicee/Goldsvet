var scripts = [["settings","src/settings_00395223.js","ISO-8859-1"],["game","src/magicidol_00295223.js","UTF-8"]];
	    
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

function loadScripts()
{	
	for(var i=0,len=scripts.length;i < len;i++)
	{
		loadScript(scripts[i][0],scripts[i][1],scripts[i][2]);
	}
}

loadScripts();