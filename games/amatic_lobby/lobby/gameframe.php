<html>
<head><meta charset="utf-8" />
<title>games</title>
<link rel="stylesheet" type="text/css" href="src/css/styles.css" />
<script src="src/jquery.min.js"></script>
</head>
<body oncontextmenu="return false;">
<div id="jackpotsdiv" style="position:absolute; z-index:2000; height:8vh; pointer-events: none; display:none;" >
<div id="jackpot-bar">
	<div id="jackpot1"></div>		
	<div id="jackpot2"></div>		
	<div id="jackpot3"></div>		
	<script type="text/javascript" src="src/AmatJP.js"></script>
	<script type="text/javascript">	
		var apiserver = 'api/jp/?uhash=';
		var jp1 = new AmatJP("jackpot1", { jpAmount:0, jpServerAmount:0 });		
		var jp2 = new AmatJP("jackpot2", { jpAmount:0, jpServerAmount:0 });		
		var jp3 = new AmatJP("jackpot3", { jpAmount:0, jpServerAmount:0 });
		var jpStarted = false;			
		var userhash = "";	
		var jprequest = false;

		function updateJackpots()
		{
			//console.log("api call...");
			if(userhash=="")
				return; //userhash not set
			var apiurl = apiserver+userhash;
			
			if(!jprequest)
			{
				jprequest = true;
				$.ajax(apiurl, {
				  success: function(data) {						
						var ar_data = JSON.parse(data);		
						
						if(!jpStarted)
						{
							jp1.SetJPAmounts(Math.floor(ar_data['level1']));
							jp2.SetJPAmounts(Math.floor(ar_data['level2']));
							jp3.SetJPAmounts(Math.floor(ar_data['level3']));
							jpStarted = true;
							jp1.start();
							jp2.start();
							jp3.start();								
						}
						else
						{		
							jp1.SetJPServerAmount(Math.floor(ar_data['level1']));
							jp2.SetJPServerAmount(Math.floor(ar_data['level2']));
							jp3.SetJPServerAmount(Math.floor(ar_data['level3']));
							jp1.resume();						
							jp2.resume();						
							jp3.resume();
						}
						
						
						
						setTimeout(function () {
							jprequest = false;
							updateJackpots();
						}, 5000);
						
			
				  },
				  error: function() {
					 setTimeout(function () {
						jprequest = false;
						updateJackpots();
					}, 5000);
				  }
			   });		   				
			}	
		}			
	</script>
	 <script type="text/javascript">
    sessionStorage.username = "bull50";
	sessionStorage.cusername = "";
	sessionStorage.gamePort = "2237";
	sessionStorage.pusherPort = "3523";
	sessionStorage.jackpotEnabled = false;
    sessionStorage.sessionValue2 = "ebf331d13f02f1d826a2bdfbf1aeebe5";
    sessionStorage.onAlarm = false;
    sessionStorage.pageEnter = 0;
    sessionStorage.pageIndex = 1;
	sessionStorage.menuStyle = 1;
    sessionStorage.denominator = 0.01;
	localStorage.vllms = "ca211d5b997c7cfcc9ba5593aa954f7a";
	</script>
	      
</div>
</div>
<div id="gamesdiv">
<iframe id="myiframe"  src="welcome.html"
        style="border: 0; position:fixed; top:0%; left:0; right:0; bottom:0; width:100%; height:100%" allowfullscreen>
</iframe>
</div>
</body>
<script>
	function waitForLogin(){""!=sessionStorage.sessionValue2? checkjackpot():setTimeout(waitForLogin,3e3)} function checkjackpot(){ if(sessionStorage.jackpotEnabled=="true" && sessionStorage.onAlarm=="false"){startJackpots();}} 
	waitForLogin();
	function startJackpots()
	{		
		userhash = sessionStorage.sessionValue2;
		updateJackpots();
		$("#myiframe").css({"height":"94%"});
		$("#myiframe").css({"top":"6%"});
		$("#jackpotsdiv").show();
	}
	
	function PageChanged(newpage)
	{		
		checkjackpot();
		parent.waitForLogin();
	}
</script>
</html>