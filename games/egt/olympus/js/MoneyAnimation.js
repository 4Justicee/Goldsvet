/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

function MoneyAnimation()
{
	var self = this;
	
	var _countsByOnePoint = 10;
	var _divisor = 10;
	var _fastModeDiv = 10;
	var _amount;
	
	self.settings = { endValue:0, denom:0, fastMode:false, onComplete:null };
	
	self.getTime = function()
	{
		_amount = self.settings.endValue;
			
		var count = 0;
		while (_amount != 0)
		{
			DoNextCount();
			count++;
		}
		
		return (count+1) * 150;
	}
	
	var round = function(n64Currency, n64Point)
	{
		n64Currency = Math.floor(n64Currency);
		var n64Floor = Math.floor(n64Currency / n64Point) * n64Point;
		var n64Ceil = n64Floor + n64Point;

		if ( n64Floor == 0 )
			return n64Ceil;
		else if (n64Ceil - n64Currency > n64Currency - n64Floor)
			return n64Floor;
		else
			return n64Ceil;
	}
	
	var DoNextCount = function()
	{
		if (!self.settings.fastMode)
		{
			if (_amount > (self.settings.denom * _countsByOnePoint))
			{
				var cCount = Math.floor(_amount - (self.settings.denom * _countsByOnePoint)) / _divisor;

				cCount = round( cCount, self.settings.denom );
				
				_amount -= cCount;
			}
			else if (_amount > self.settings.denom)
			{
				_amount -= self.settings.denom;
			}
			else
			{
				_amount = 0;
				return true;
			}
		}
		else
		{
			if (_fastModeDiv > 1)
			{
				cCount = Math.floor(_amount / _fastModeDiv);

				cCount = round( cCount, self.settings.denom );

				_fastModeDiv--;
				_amount -= cCount;

			}
			else
			{

				_amount = 0;
				return true;
			}
		}
		
		return false;
	}
}

MoneyAnimation.getAnimationTime = function(value, denom)
{
	var moneyAnim = new MoneyAnimation();
	moneyAnim.settings.endValue = value;
	moneyAnim.settings.denom = denom;
	
	return moneyAnim.getTime();
}