/**
 * ...
 * @author Georgi Dimov georgi.dimov@egt-bg.com
 */

ViewController("CustomResultViewController",
{
},
(function()
{
	var p =
	{
		init: function()
		{
			this._super();
			
			var settings = GameSettings.getInstance();
			var imagesArray = [];
			for(var j = 0 ; j<settings.reelImages.length;j++ )
				imagesArray[j] = Loader.getLoader(settings.reelImages[j]).getData();
	
			this._view = new CustomResultView({numReelImages:settings.numReelCards, numImages:settings.numImages, numReels: settings.numReels,
										  	  reelImages:imagesArray, cardsInfo:settings.cardsInfo,
										  	  reelWidth:settings.reelWidth, imageHeight:settings.imageHeight});
		},
		
		getResult: function() { return this._view.getResult(); }
	};
	
	return p;
})());