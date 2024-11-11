/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

// TODO: move Utils to library
function Utils() {}
 
Utils.formatNumber = function(x, base, fracDigits)
{
	if(typeof(fracDigits) === "undefined")
		fracDigits = false;
		
	var str = fracDigits ? (x / base).toFixed(2) : Math.floor(x / base).toString();
	
	var arr = str.split(".");
	var n = arr[0];
	var prefix = n.split('');
	
	if (fracDigits)
	{
		var counter = 3;
		var i = prefix.length;
		while (--i > 0) 
		{
			counter--;
			if (counter == 0)
			{
			 counter = 3;
			 prefix.splice(i , 0, ' ');
			}
		}
	}
	
	if(arr[1])
		return (prefix.join('') + "." + arr[1]);
	else
		return (prefix.join(''));
}