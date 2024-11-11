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
			this._imagesArray = [];
			for(var j = 0 ; j<settings.reelImages.length;j++ )
				this._imagesArray[j] = Loader.getLoader(settings.reelImages[j]).getData();
	
			this._view = new CustomResultView({numReelImages:settings.numReelCards, numImages:settings.numImages, numReels: settings.numReels,
										  	  reelImages: this._imagesArray, cardsInfo:settings.cardsInfo,
										  	  reelWidth:settings.reelWidth, imageHeight:settings.imageHeight});
		},
		updateReelImages: function() {
			var settings = GameSettings.getInstance();
			if (Loader.getLoader(settings.reelImages[settings.cardsInfo[settings.freeSpinsExpandSymbol].reelImageIndex]))
				this._imagesArray[settings.cardsInfo[settings.freeSpinsExpandSymbol].reelImageIndex] = Loader.getLoader(settings.reelImages[settings.cardsInfo[settings.freeSpinsExpandSymbol].reelImageIndex]).getData();
			else
				this._imagesArray[settings.cardsInfo[settings.freeSpinsExpandSymbol].reelImageIndex] = settings.reelImages[settings.cardsInfo[settings.freeSpinsExpandSymbol].reelImageIndex];
			this._view.updateReelImages();
		}, 
		getResult: function() { return this._view.getResult(); }
	};
	
	return p;
})());