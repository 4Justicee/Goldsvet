sessionStorage.setItem("sessionValue1","en");
function Settings()
{
    this.value6 = sserver;
	this.value53 = null;
	this.value5 = ["en","de","es","ru","tr","cz","gr","ee"];
	this.value9 = true;
	this.value10 = 1000;
	this.value11 = false;
	this.value49 = false;
	this.value27 = true;
	this.value28 = true;
	this.value12 = false;
	this.value50 = false;
	this.value51 = true;

	this.value13 = true;
	this.value20 = 20;
	this.value36 = false;
	this.value37 = false;
	this.value39 = 60;
	this.value14 = 14;
	this.value15 = 4;
	this.value25 = 13;
	this.value32 = 5; 
	this.value33 = 14; 
	this.value73 = 737;
	this.value18 = false;
	this.value19 = false;
	this.value21 = {e:true,s:strCurrency,m:"0.01",ts:null,cs:"."};
	this.value22 = strCurrency;
	this.value23 = 0.01;
	if(!float_bet){this.value21 = {e:false,s:strCurrency,m:"1",ts:null,cs:""};this.value22 = strCurrency;this.value23 = 1;this.value24 = false;	}else{this.value21 = {e:true,s:strCurrency,m:"0.01",ts:null,cs:"."};	this.value22 = strCurrency;this.value23 = 0.01;this.value24 = true;}
	
	this.value72 = {EUR:{s:strCurrency,m:0.01,ts:null,cs:"."},USD:{s:"\u0024",m:0.01,ts:null,cs:"."},AUD:{s:"\u0024",m:0.01,ts:null,cs:"."},NOK:{s:"kr",m:0.01,ts:null,cs:"."},SEK:{s:"kr",m:0.01,ts:null,cs:"."}};
	this.value30 = "bells_on_fire/..";
	this.value40 = 1.0;
	this.value38 = false;
	this.value43 = false;
	this.value44 = false;
	this.value45 = 4;
	this.value46 = 5;
	this.value47 = 10000;
	this.value71 = 1000;
	this.value48 = null;
	this.value55 = false;
	this.value57 = "modern";
	this.value58 = false;
	this.value59 = null;
	this.value62 = true;
	this.value64 = false;
	this.value65 = 0;
	this.value66 = 1000;
	this.value67 = 0;
	this.value68 = null;
	this.value69 = true;
	this.value74 = null;
	this.value75 = null;
	this.value76 = {u:true,a:true,d:9,f:true,s:strCurrency,m:0.01,ts:null,cs:"."};
	this.value78 = {t:false,b:false,d:3000};
	this.value79 = 0;
	
	this.value8 = "../../../";
	this.value1001 = null;
	this.value1002 = ".";
	this.value1003 = "../../../";
	this.value1004 = null;
	this.value1005 = "";
	this.value1006 = true;
	this.value1007 = true;
	this.value1008 = false;
	this.value1009 = {c:10,g:"TwentySeven"};
	this.value1010 = true;
	this.value1011 = null;
	this.value1012 = null;
	this.value1013 = false;
	this.value1014 = false;
	this.value1015 = 3;
	this.value1016 = true;
	this.value1017 = true;
	this.value1018 =  true;;
	this.value1019 = {c:0,i:0,t:1000};
	this.value9997 = 0;
	this.value9999 = "amaticnet";
	this.value9998 = true;

	this.bfh = {value2:10};
	this.lga = {value2:10};
	this.bpa = {value2:10};
	this.apx = {value3:10};
	this.dof = {value2:10};
	this.dpe = {value2:10};
	this.vam = {value2:10};
	this.wsh = {value2:10};
	this.dim = {value2:10};
	this.ffr = {value2:10};
	this.ljo = {value2:10};
	this.mow = {value2:10};
	this.bef = {value2:10};
	this.bil = {value2:10};
	this.tbi = {value2:10};
	this.wir = {value3:10};
	this.wom = {value2:10};
	this.can = {value2:10};
	this.csn = {value2:10};
	this.dic = {value2:10};
	this.fic = {value2:10};
	this.hot = {value2:10};
	this.lbe = {value2:10};
	this.lga = {value2:10};
	this.mfr = {value2:10};
	this.run = {value2:10};
	this.dki = {value2:10};
	this.rec = {value2:10};
	this.maf = {value2:10};	
	this.rgj = {value1:"tallinn",value2:true};
	this.sct = {value6:{g:[10,20,50,100,200,500],d:100,i:100}};
}

var webAudioEngine = null;
