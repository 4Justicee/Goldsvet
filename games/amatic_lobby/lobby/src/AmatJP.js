function AmatJP(id, opt){		
	this.digits = new Array();	
	this.pause = false;
	this.stopped = false;
	this.needAnimation = false;
	this.id = id;	
	this.options = {
		jpDigits: 6,//total digits
		jpAmount: 5000,//jackpot amount
		jpServerAmount: 5500,//target amount retrieved from server
		jpStep: 1,//step								
		digitImages: 1,
		digitWidth: 2.4,
		digitHeight: 5,
		digitSlide : true,
		digitSlideTime : 300,
		digitImageHeight :55,
		digitAnimationHeight : 5, 
		timerEnd: function(){},
		image: "digits.png", 
		updateInterval : 300
	};		
	
	var s;
	if (typeof opt != "undefined") {
		for (s in this.options) {
			if (typeof opt[s] != "undefined") {
				this.options[s] = opt[s];
			}
		}
	}			
}

AmatJP.prototype.createDivs = function(){
	var dc = 0;
	var denom = "0.01";
	if (typeof sessionStorage.denominator !== 'undefined') {
		 denom = sessionStorage.denominator;
	}

	var dotpos = 10;
	if(denom.indexOf(".")>-1)
	{
		var zeros = denom.split(".")[1].length;
		dotpos = 5-zeros;
	}
	
	for (dc=0; dc<this.options.jpDigits; dc++) {
		if (dc == 0 && dotpos==10) {
			$("#"+this.id).append("<div class='digit-space' style='position:relative;float:left;width:"+this.options.digitWidth/2+"vw;height:"+this.options.digitHeight+"vh;overflow:hidden;'></div>");
		}
		
		this.digits[dc] = { digit: this.options.jpAmountStr.charAt(dc)};							
		$("#"+this.id).append("<div id='"+this.id+"-digit"+dc+"'  style='position:relative;float:left;width:"+this.options.digitWidth+"vw;height:"+this.options.digitHeight+"vh;overflow:hidden;'><div class='digit' id='"+this.id+"-digit-bg"+dc+"' style='position:absolute; top:-"+this.digits[dc].digit*this.options.digitAnimationHeight+"vh; width:"+this.options.digitWidth+"vw; height:"+this.options.digitImageHeight+"vh; '></div></div>");


		if (dc == dotpos) {
			$("#"+this.id).append("<div class='digit-separator' style='position:relative;float:left;width:"+this.options.digitWidth/2+"vw;height:"+this.options.digitHeight+"vh;overflow:hidden;'></div>");
		}
	}
	$("#"+this.id).append("<div style='clear:both'></div>");
};
	
	
AmatJP.prototype.calculateJPAmount = function() {		
	var dif = this.options.jpServerAmount - this.options.jpAmount;		
	if(dif>0)
		this.needAnimation = true;
	else
		this.needAnimation = false;
	
	if(dif>200) 
	{
		this.options.updateInterval = 15;
		this.options.digitSlideTime = 10;
	}
	else
		if(dif>100)
		{
			this.options.updateInterval = 50;
			this.options.digitSlideTime = 40;
		}
		else
			if(dif>10)
			{
				this.options.updateInterval = 100;
				this.options.digitSlideTime = 80;
			}
			else
			{
				this.options.updateInterval = 200;
				this.options.digitSlideTime = 160;
			}
	
	this.options.jpStep = 1;	
	
	if(this.options.jpAmount < this.options.jpServerAmount)
	{
		this.options.jpAmount =  this.options.jpAmount + this.options.jpStep;
	}
	else
	{
		this.options.jpAmount = this.options.jpServerAmount;
		this.pause = true;
	}
	
	var denom = 1;
	if (typeof sessionStorage.denominator !== 'undefined') {
		var sdenom = sessionStorage.denominator;
		sdenom = sdenom.split('.').join("");
		sdenom = sdenom.split('0').join("");
		denom = parseInt(sdenom);
	}	
	this.options.jpAmountStr = zeroPad(this.options.jpAmount*denom,6);						
};

AmatJP.prototype.animateDigits = function() {
	for (var dc=0; dc<this.options.jpDigits; dc++) {
		this.digits[dc].digitNext = Number(this.options.jpAmountStr.charAt(dc));
		this.digits[dc].digitNext = (this.digits[dc].digitNext + 10)%10;
		
		var no = dc;

		if (this.digits[no].digit == 0) $("#"+this.id+"-digit-bg"+no).css("top", -this.options.digitImageHeight+this.options.digitHeight + "vh");
		if (this.digits[no].digit != this.digits[no].digitNext) {
			$("#"+this.id+"-digit-bg"+no).animate( { "top" : -this.digits[no].digitNext*this.options.digitHeight+"vh"}, this.options.digitSlideTime);
			this.digits[no].digit = this.digits[no].digitNext;
		}				
	}					
};
					
AmatJP.prototype.updateJackpot = function() {													
	this.calculateJPAmount();
	if(this.needAnimation)
		this.animateDigits();
	
	var that = this;
	
	if(!this.pause)
	{
		this.stopped = false;
		setTimeout(function () {
			that.updateJackpot();
		}, that.options.updateInterval);
	}
	else
	{
		this.stopped = true;
		//console.log("paused.");
	}
	//setTimeout(this.updateJackpot,this.options.updateInterval);
};

AmatJP.prototype.SetJPServerAmount = function(newamount){
	this.options.jpServerAmount = newamount;
	if(newamount<this.options.jpAmount && newamount>0)
		this.options.jpAmount = newamount-1;
}
AmatJP.prototype.SetJPAmounts = function(newamount){
	this.options.jpAmount = newamount;
	this.options.jpServerAmount = newamount;
}

AmatJP.prototype.resume = function(){
	if(this.stopped)
	{
		this.pause = false;
		this.updateJackpot();
	}
};

AmatJP.prototype.start = function(){
	this.calculateJPAmount();
	this.createDivs();	
	this.updateJackpot();
};
	
function zeroPad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}	

