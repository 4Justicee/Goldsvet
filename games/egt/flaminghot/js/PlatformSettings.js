   $.Class("PlatformSettings", 
{
	socketType: "wss",
	language: "en",
	translations: 
	{
		session_override:
		{
			en: "Disconnected due to multiple logins!",
			bg: "                                                                                               !",
			ru: "                                            -                                        !",
			nl: "Verbinding verbroken door meerdere aanmeldingen!",
			fr: "D  connect   en raison de connexions multiples!",
			mk: "                                                         !",
		},
		session_timeout:
		{
			en: "Your session has timed out due to inactivity.",
			bg: "                                                                                 .",
			ru: "                                                        -                             .",
			nl: "Er is een time-out van uw sessie opgetreden omwille van inactiviteit.",
			fr: "Votre session a expir   pour cause d'inactivit  .",
			mk: "                                                                          ."
		},
		connection_closed:
		{
			en: "Server Maintenance</br></br> We are currently offline due to server maintenance. Our team sincerely apologizes for the inconvenience. Thank you for your patience.",
			bg: "                                            </br></br>                                                                                           .                                                                                         .                                               .",
			ru: "                                                                 </br></br>                                                                                       -                             .                                                                                                                    .                                            .",
			nl: "Serveronderhoud</br> We zijn momenteel offline omwille van een serveronderhoud. Ons team biedt zijn excuses aan voor dit ongemak. Bedankt voor uw geduld.",
			fr: "Maintenance du serveur</br> Nous sommes actuellement hors-ligne en raison de la maintenance du serveur. Notre   quipe pr  sente ses sinc  res excuses pour la g  ne occasionn  e. Merci pour votre patience.",
			mk: "                                    </br>                                                                                                  .                                                                                                     .                                                                ."
		},
		shutdown_title:
		{
			en: "Maintenance notice",
			bg: "                                                      ",
			ru: "                                                e",
			nl: "Onderhoudsmededeling",
			fr: "Avis de maintenance",
			mk: "                                                    "
		},
		shutdown_message:
		{
			en: "Our game server will be entering a maintenance mode. Please finish your current game session and log out. Be aware that no wagers will be accepted during the maintenance period. Our team sincerely apologize for the inconvenience. Thank you for your patience.",
			bg: "                                                                                        .         ,                                                                                                              .                                                                                                                         .                                                                                         .                                               .",
			ru: "                                                                                                  .                     ,                                               e                                                   .                                                                                                 .                                                                                                                    .                                            .",
			nl: "Onze spelserver gaat in de onderhoudsmodus. Be  indig uw huidige speelsessie en meld u af. Opgelet, tijdens de onderhoudsperiode worden er geen inzetten aanvaard. Ons team biedt zijn excuses aan voor dit ongemak. Bedankt voor uw geduld.",
			fr: "Notre serveur va rentrer en mode maintenance. Veuillez finir la session en cours et vous d  connecter. Vouillez noter que pendant la p  riode de maintenance aucun pari ne sera pas accept  . Notre   quipe vous pr  sente nos sinc  res excuses pour la g  ne occasionn  e. Merci pour votre patience.",
			mk: "                                                                                               .                                                                                                                                  .                                                                                                                                                                   .                                                                                                     .                                                                ."
		},
		reality_check_title:
		{
			en: "Responsible Gaming Reality Check",
			bg: "                                -                 ",
			ru: "                                                        ",
			nl: "Realiteitscontrole voor verantwoord spelen",
			mk: "                                           ,                                         ",
			es: "Comprobaci  n de Juego Responsable",
		},
		reality_check_message:
		{
			en: "You have been playing for <font color='#C3D2FF'>((playTime:String))</font> minutes. You have wagered <font color='#C3D2FF'>((totalBet:Money))</font>. You won <font color='#C3D2FF'>((totalWin:Money))</font> and your result is <font color='#C3D2FF'>((balance:Money))</font>.<br/><br/>If you wish to continue to play, please click OK, or press Exit to quit the game.",
			bg: "                    <font color='#C3D2FF'>((timePassed))</font>             .                         <font color='#C3D2FF'>((totalBet))</font>.                           <font color='#C3D2FF'>((totalWin))</font>                                 <font color='#C3D2FF'>((result))</font>.                                                             ,                                 .                                                                                                         .                                                                                  ,                           ,                                                  .",
			ru: "                                    <font color='#C3D2FF'>((timePassed))</font>           .                                    <font color='#C3D2FF'>((totalBet))</font>.                       <font color='#C3D2FF'>((totalWin))</font>                              <font color='#C3D2FF'>((result))</font>.                                                             ,                     ,                                 .                                                                                                   .                                                        ,                                ,                                             .",
			nl: "U hebt <font color='#C3D2FF'>((timePassed))</font> minuten gespeeld. U hebt <font color='#C3D2FF'>((totalBet))</font> ingezet. U hebt <font color='#C3D2FF'>((totalWin))</font> gewonnen en uw resultaat is <font color='#C3D2FF'>((result))</font>. Als u verder wilt spelen, klik op OK Anders klik op AFSLUITEN om het spel te verlaten. Door op een van de knoppen te klikken, geeft u aan dat u het bericht hebt gelezen.",
			mk: "                      <font color='#C3D2FF'>((timePassed))</font>             .                                <font color='#C3D2FF'>((totalBet))</font>.                       <font color='#C3D2FF'>((totalWin))</font>                                     <font color='#C3D2FF'>((result))</font>.                                                                ,                                        OK.                                               EXIT                                             .                                                                                                        .",
			es: "Ha jugado durante <font color='#C3D2FF'>((playTime:String))</font> minutos. A apostado <font color='#C3D2FF'>((totalBet:Money))</font>. Ha ganado <font color='#C3D2FF'>((totalWin:Money))</font> y su balance es de <font color='#C3D2FF'>((balance:Money))</font>.<br/><br/>Si desea continuar jugando, por favor, pulse OK, o pulse Salir para abandonar el juego."
		},
		time_proximity_title:
		{
			en: "Responsible Gaming Time Notification",
			bg: "                                -                 ",
			ru: "                                                        ",
			nl: "Realiteitscontrole voor verantwoord spelen",
			mk: "                                           ,                                         ",
			es: "Notificaci  n de Tiempo de Juego Responsible"
		},
		time_proximity_message:
		{
			en: "The session is almost over. You are about to reach your self-imposed session time limit.<br/><br/>Please click OK to continue the game.",
			bg: "                                -                 ",
			ru: "                                                        ",
			nl: "Realiteitscontrole voor verantwoord spelen",
			mk: "                                           ,                                         ",
			es: "La sesi  n de juego est   a punto de finalizar. Est   a punto de alcanzar su l  mite de Tiempo de sesi  n auto establecido.<br/><br/>Por favor, pulse OK para continuar jugando."
		},
		credit_left_title:
		{
			en: "Responsible Gaming Bet Notification",
			bg: "                                -                 ",
			ru: "                                                        ",
			nl: "Realiteitscontrole voor verantwoord spelen",
			mk: "                                           ,                                         ",
			es: "Notificaci  n de Apuesta de Juego Responsible"
		},
		credit_left_message:
		{
			en: "The session is almost over. You are about to reach your self-imposed bet limit.<br/><br/>Please click OK to continue the game.",
			bg: "                                -                 ",
			ru: "                                                        ",
			nl: "Realiteitscontrole voor verantwoord spelen",
			mk: "                                           ,                                         ",
			es: "La sesi  n de juego est   a punto de finalizar. Est   a punto de alcanzar su l  mite de apuesta auto establecido.<br/><br/>Por favor, pulse OK para continuar jugando."
		},
		loss_limit_title:
		{
			en: "Responsible Gaming Loss Limit",
			bg: "                                -                                             ",
			ru: "                                    -                                          ",
			nl: "Verlieslimiet voor verantwoord spelen",
			mk: "                                           ,                                                   ",
			es: "L  mite de P  rdida de Juego Responsabe"
		},
		loss_limit_message:
		{
			en: "You have reached your self-imposed loss limit and your game session has been terminated.<br/><br/>For exit, please press OK.",
			bg: "                                                                                                         <font color='#C3D2FF'>((lossLimit))</font>                                                                .                                                 ,                           ,                                                  .",
			ru: "                                                                                                         <font color='#C3D2FF'>((lossLimit))</font>                                                        .                                             ,                                ,                                             .",
			nl: "U hebt uw zelf opgelegd verlieslimiet van <font color='#C3D2FF'>((lossLimit))</font> bereikt en uw speelsessie werd be  indigd. Door op de OK knop te klikken, geeft u aan dat u het bericht hebt gelezen.",
			mk: "                                                                                                                           <font color='#C3D2FF'>((lossLimit))</font>                                                                     .                                               OK                                                                                       .",
			es: "Ha alcanzado su l  mite personal de p  rdida y su sesi  n ha sido finalizada.<br/><br/>Para salir, por favor, pulse OK."
		},
		bet_limit_title:
		{
			en: "Responsible Gaming Bet Limit",
			bg: "                                -                                             ",
			ru: "                                    -                                    ",
			nl: "Goklimiet voor verantwoord spelen",
			mk: "                                           ,                                                       ",
			es: "L  mite de Apuesta de Juego Responsabe"
		},
		bet_limit_message:
		{
			en: "You have reached your self-imposed bet limit and your game session has been terminated.<br/><br/>For exit, please press OK.",
			bg: "                                                                                                         <font color='#C3D2FF'>((betLimit))</font>                                                                .                                                 ,                           ,                                                  .",
			ru: "                                                                                                   <font color='#C3D2FF'>((betLimit))</font>                                                        .                                             ,                                ,                                             .",
			nl: "U hebt uw zelf opgelegd goklimiet van <font color='#C3D2FF'>((betLimit))</font> bereikt en uw speelsessie werd be  indigd. Door op de OK knop te klikken, geeft u aan dat u het bericht hebt gelezen.",
			mk: "                                                                                                                           <font color='#C3D2FF'>((betLimit))</font>                                                                     .                                               OK                                                                                       .",
			es: "Ha alcanzado su l  mite personal de apuesta y su sesi  n ha sido finalizada.<br/><br/>Para salir, por favor, pulse OK.",
		},
		time_limit_title:
		{
			en: "Responsible Gaming Time Limit",
			bg: "                                -                                                                      ",
			ru: "                                    -                                                                       ",
			nl: "Tijdslimiet voor verantwoord spelen",
			mk: "                                           ,                                             ",
			es: "L  mite de Tiempo de Juego Responsabe"
		},
		time_limit_message:
		{
			en: "You have reached your self-imposed session time limit and your game session has been terminated.<br/><br/>For exit, please press OK.",
			bg: "                                                                                                                                           <font color='#C3D2FF'>((timeLimit))</font>                                                                             .                                                 ,                           ,                                                  .",
			ru: "                                                                                                                                      <font color='#C3D2FF'>((timeLimit))</font>                                                                       .                                             ,                                ,                                             .",
			nl: "U hebt uw zelf opgelegd tijdslimiet van <font color='#C3D2FF'>((timeLimit))</font> minuten bereikt en uw speelsessie werd onderbroken. Door op de OK knop te klikken, geeft u aan dat u het bericht hebt gelezen en het spel zal afsluiten.",
			mk: "                                                                                                                     <font color='#C3D2FF'>((timeLimit))                                                                                        .                                               OK                                                                                                                                         .",
			es: "Ha alcanzado su l  mite personal de tiempo y su sesi  n ha sido finalizada.<br/><br/>Para salir, por favor, pulse OK.",
		},
		login_error:
		{
			en: "Unable to connect to server. Please close the window and try again.",
			bg: "                                                                                         .         ,                                                                       .",
			ru: "                                                            .                     ,                                                             .",
			mk: "                                                                                 .                                                                                                    ."
		},
		content_error:
		{
			en: "Unable to load content. Please retry.",
			bg: "                                                                     .         ,                              .",
			ru: "                                                            .                     ,                                .",
			mk: "                                                       .                                                                                                    ."
		},
		no_connecton:
		{
			en: "NO CONNECTION",
			bg: "                     ",
			ru: "                 ",
			nl: "GEEN VERBINDING",
			fr: "PAS DE CONNEXION",
			mk: "                        "
		},
		ok_text:
		{
			en: "OK",
			bg: "OK",
			ru: "OK",
			nl: "OK",
			fr: "OK",
			mk: "OK"
		},
		exit_text:
		{
			en: "Exit",
			bg: "          ",
			ru: "          ",
			nl: "          ",
			fr: "          ",
			mk: "          ",
			es: "Salir"
		}
	},
	
	currencies: [
		{name:'KRW', displayCreditsOnly:'yes'},
		{name:'RUB', displayBanknotesOnly:'yes'},
		{name:'CZK', displayBanknotesOnly:'yes'},
		{name:'NOK', displayBanknotesOnly:'yes'},
		{name:'DKK', displayBanknotesOnly:'yes'},
		{name:'SEK', displayBanknotesOnly:'yes'},
		{name:'HUF', displayCreditsOnly: 'yes'},
		{name:'GYD', displayCreditsOnly: 'yes'},
		{name:'UGX', displayCreditsOnly: 'yes'},
		{name:'BYR', displayCreditsOnly: 'yes'},
		{name:'AMD', displayCreditsOnly: 'yes'},
		{name:'MNT', displayCreditsOnly: 'yes'},
		{name:'COP', displayCreditsOnly: 'yes'},
		{name:'XAF', displayCreditsOnly: 'yes'},
		{name:'IRR', displayCreditsOnly: 'yes'},
		{name:'CLP', displayCreditsOnly: 'yes'},
		{name:'NGN', displayCreditsOnly: 'yes'}
	],
	
	localize: function(key)
	{
		var availableLanguages = PlatformSettings.translations[key];
		if(availableLanguages)
		{
			if(availableLanguages[PlatformSettings.language])
				return availableLanguages[PlatformSettings.language];
			
			if(availableLanguages["en"])
				return availableLanguages["en"];
		}
		
		return key + " not translated";
	}
},
{});