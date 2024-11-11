/**
 * Dutch translation
 * @author Barry vd. Heuvel <barry@fruitcakestudio.nl>
 * @version 2012-04-02
 */
if (elFinder && elFinder.prototype && typeof(elFinder.prototype.i18) == 'object') {
	elFinder.prototype.i18.nl = {
		translator : 'Barry vd. Heuvel &lt;barry@fruitcakestudio.nl&gt;',
		language   : 'Nederlands',
		direction  : 'ltr',
		dateFormat : 'd-m-Y H:i',
		fancyDateFormat : '$1 H:i',
		messages   : {
			
			/********************************** errors **********************************/
			'error'                : 'Fout',
			'errUnknown'           : 'Onbekend fout.',
			'errUnknownCmd'        : 'Onbekend commando.',
			'errJqui'              : 'Ongeldige jQuery UI configuratie. Selectable, draggable en droppable componenten moeten aanwezig zijn.',
			'errNode'              : 'Voor elFinder moet een DOM Element gemaakt worden.',
			'errURL'               : 'Ongeldige elFinder configuratie! URL optie is niet ingesteld.',
			'errAccess'            : 'Toegang geweigerd.',
			'errConnect'           : 'Kan geen verbinding met de backend maken.',
			'errAbort'             : 'Verbinding afgebroken.',
			'errTimeout'           : 'Verbinding time-out.',
			'errNotFound'          : 'Backend niet gevonden.',
			'errResponse'          : 'Ongeldige reactie van de backend.',
			'errConf'              : 'Ongeldige backend configuratie.',
			'errJSON'              : 'PHP JSON module niet ge  nstalleerd.',
			'errNoVolumes'         : 'Leesbaar volume is niet beschikbaar.',
			'errCmdParams'         : 'Ongeldige parameters voor commando "$1".',
			'errDataNotJSON'       : 'Data is niet JSON.',
			'errDataEmpty'         : 'Data is leeg.',
			'errCmdReq'            : 'Backend verzoek heeft een commando naam nodig.',
			'errOpen'              : 'Kan "$1" niet openen.',
			'errNotFolder'         : 'Object is geen map.',
			'errNotFile'           : 'Object is geen bestand.',
			'errRead'              : 'Kan "$1" niet lezen.',
			'errWrite'             : 'Kan niet schrijven in "$1".',
			'errPerm'              : 'Toegang geweigerd.',
			'errLocked'            : '"$1" is vergrendeld en kan niet hernoemd, verplaats of verwijderd worden.',
			'errExists'            : 'Bestand "$1" bestaat al.',
			'errInvName'           : 'Ongeldige bestandsnaam.',
			'errFolderNotFound'    : 'Map niet gevonden.',
			'errFileNotFound'      : 'Bestand niet gevonden.',
			'errTrgFolderNotFound' : 'Doelmap"$1" niet gevonden.',
			'errPopup'             : 'De browser heeft voorkomen dat de pop-up is geopend. Pas de browser instellingen aan om de popup te kunnen openen.',
			'errMkdir'             : 'Kan map "$1" niet aanmaken.',
			'errMkfile'            : 'Kan bestand "$1" niet aanmaken.',
			'errRename'            : 'Kan "$1" niet hernoemen.',
			'errCopyFrom'          : 'Bestanden kopi  ren van "$1" is niet toegestaan.',
			'errCopyTo'            : 'Bestanden kopi  ren naar "$1" is niet toegestaan.',
			'errUploadCommon'      : 'Upload fout.',
			'errUpload'            : 'Kan "$1" niet uploaden.',
			'errUploadNoFiles'     : 'Geen bestanden gevonden om te uploaden.',
			'errMaxSize'           : 'Data overschrijdt de maximale grootte.',
			'errFileMaxSize'       : 'Bestand overschrijdt de maximale grootte.',
			'errUploadMime'        : 'Bestandstype niet toegestaan.',
			'errUploadTransfer'    : '"$1" overdrachtsfout.', 
			'errSave'              : 'Kan "$1" niet opslaan.',
			'errCopy'              : 'Kan "$1" niet kopi  ren.',
			'errMove'              : 'Kan "$1" niet verplaatsen.',
			'errCopyInItself'      : 'Kan "$1" niet in zichzelf kopi  ren.',
			'errRm'                : 'Kan "$1" niet verwijderen.',
			'errExtract'           : 'Kan de bestanden van "$1" niet uitpakken.',
			'errArchive'           : 'Kan het archief niet maken.',
			'errArcType'           : 'Archief type is niet ondersteund.',
			'errNoArchive'         : 'Bestand is geen archief of geen ondersteund archief type.',
			'errCmdNoSupport'      : 'Backend ondersteund dit commando niet.',
			'errReplByChild'       : 'De map "$1" kan niet vervangen worden door een item uit die map.',
			'errArcSymlinks'       : 'Om veiligheidsredenen kan een bestand met symlinks niet worden uitgepakt .',
			'errArcMaxSize'        : 'Archief overschrijdt de maximale bestandsgrootte.',
			'errResize'            : 'Kan het formaat van "$1" niet wijzigen.',
    			'errUsupportType'      : 'Bestandstype wordt niet ondersteund.',
			
			/******************************* commands names ********************************/
			'cmdarchive'   : 'Maak archief',
			'cmdback'      : 'Vorige',
			'cmdcopy'      : 'Kopieer',
			'cmdcut'       : 'Knip',
			'cmddownload'  : 'Download',
			'cmdduplicate' : 'Dupliceer',
			'cmdedit'      : 'Pas bestand aan',
			'cmdextract'   : 'Bestanden uit archief uitpakken',
			'cmdforward'   : 'Volgende',
			'cmdgetfile'   : 'Kies bestanden',
			'cmdhelp'      : 'Over deze software',
			'cmdhome'      : 'Home',
			'cmdinfo'      : 'Bekijk info',
			'cmdmkdir'     : 'Nieuwe map',
			'cmdmkfile'    : 'Nieuw tekstbestand',
			'cmdopen'      : 'Open',
			'cmdpaste'     : 'Plak',
			'cmdquicklook' : 'Voorbeeld',
			'cmdreload'    : 'Vernieuwen',
			'cmdrename'    : 'Naam wijzigen',
			'cmdrm'        : 'Verwijder',
			'cmdsearch'    : 'Zoek bestanden',
			'cmdup'        : 'Ga een map hoger',
			'cmdupload'    : 'Upload bestanden',
			'cmdview'      : 'Bekijk',
			'cmdresize'    : 'Formaat wijzigen',
			'cmdsort'      : 'Sorteren',
			
			/*********************************** buttons ***********************************/ 
			'btnClose'  : 'Sluit',
			'btnSave'   : 'Opslaan',
			'btnRm'     : 'Verwijder',
			'btnApply'  : 'Toepassen',
			'btnCancel' : 'Annuleren',
			'btnNo'     : 'Nee',
			'btnYes'    : 'Ja',
			
			/******************************** notifications ********************************/
			'ntfopen'     : 'Bezig met openen van map',
			'ntffile'     : 'Bezig met openen bestand',
			'ntfreload'   : 'Bezig met inhoud map vernieuwen',
			'ntfmkdir'    : 'Bezig met map maken',
			'ntfmkfile'   : 'Bezig met Bestanden maken',
			'ntfrm'       : 'Bezig met verwijderen bestanden',
			'ntfcopy'     : 'Kopieer bestanden',
			'ntfmove'     : 'Verplaats bestanden',
			'ntfprepare'  : 'Voorbereiden om bestanden te kopi  ren',
			'ntfrename'   : 'Hernoem bestanden',
			'ntfupload'   : 'Bezig met uploaden bestanden',
			'ntfdownload' : 'Bezig met downloaden bestanden',
			'ntfsave'     : 'Bestanden opslaan',
			'ntfarchive'  : 'Archief aan het maken',
			'ntfextract'  : 'Bestanden uit het archief aan het uitpakken',
			'ntfsearch'   : 'Zoeken naar bestanden',
			'ntfsmth'     : 'Iets aan het doen >_<',
			'ntfloadimg'  : 'Laden van plaatje',
			
			/************************************ dates **********************************/
			'dateUnknown' : 'onbekend',
			'Today'       : 'Vandaag',
			'Yesterday'   : 'Gisteren',
			'Jan'         : 'Jan',
			'Feb'         : 'Feb',
			'Mar'         : 'Mar',
			'Apr'         : 'Apr',
			'May'         : 'Mei',
			'Jun'         : 'Jun',
			'Jul'         : 'Jul',
			'Aug'         : 'Aug',
			'Sep'         : 'Sep',
			'Oct'         : 'Okt',
			'Nov'         : 'Nov',
			'Dec'         : 'Dec',
			'January'     : 'Januari',
			'February'    : 'Februari',
			'March'       : 'Maart',
			'April'       : 'April',
			'May'         : 'Mei',
			'June'        : 'Juni',
			'July'        : 'Juli',
			'August'      : 'Augustus',
			'September'   : 'September',
			'October'     : 'Oktober',
			'November'    : 'November',
			'December'    : 'December',
			'Sunday'      : 'Zondag', 
			'Monday'      : 'Maandag', 
			'Tuesday'     : 'Dinsdag', 
			'Wednesday'   : 'Woensdag', 
			'Thursday'    : 'Donderdag', 
			'Friday'      : 'Vrijdag', 
			'Saturday'    : 'Zaterdag',
			'Sun'         : 'Zo', 
			'Mon'         : 'Ma', 
			'Tue'         : 'Di', 
			'Wed'         : 'Wo', 
			'Thu'         : 'Do', 
			'Fri'         : 'Vr', 
			'Sat'         : 'Za',
			
			/******************************** sort variants ********************************/
			'sortnameDirsFirst' : 'op naam (mappen eerst)', 
			'sortkindDirsFirst' : 'op type (mappen eerst)', 
			'sortsizeDirsFirst' : 'op grootte (mappen eerst)', 
			'sortdateDirsFirst' : 'op datum (mappen eerst)', 
			'sortname'          : 'op naam', 
			'sortkind'          : 'op type', 
			'sortsize'          : 'op grootte',
			'sortdate'          : 'op datum',

			/********************************** messages **********************************/
			'confirmReq'      : 'Bevestiging nodig',
			'confirmRm'       : 'Weet u zeker dat u deze bestanden wil verwijderen?<br/>Deze actie kan niet ongedaan gemaakt worden!',
			'confirmRepl'     : 'Oud bestand vervangen door het nieuwe bestand?',
			'apllyAll'        : 'Toepassen op alles',
			'name'            : 'Naam',
			'size'            : 'Grootte',
			'perms'           : 'Rechten',
			'modify'          : 'Aangepast',
			'kind'            : 'Type',
			'read'            : 'lees',
			'write'           : 'schrijf',
			'noaccess'        : 'geen toegang',
			'and'             : 'en',
			'unknown'         : 'onbekend',
			'selectall'       : 'Selecteer alle bestanden',
			'selectfiles'     : 'Selecteer bestand(en)',
			'selectffile'     : 'Selecteer eerste bestand',
			'selectlfile'     : 'Selecteer laatste bestand',
			'viewlist'        : 'Lijst weergave',
			'viewicons'       : 'Icoon weergave',
			'places'          : 'Plaatsen',
			'calc'            : 'Bereken', 
			'path'            : 'Pad',
			'aliasfor'        : 'Alias voor',
			'locked'          : 'Vergrendeld',
			'dim'             : 'Dimensies',
			'files'           : 'Bestanden',
			'folders'         : 'Mappen',
			'items'           : 'Items',
			'yes'             : 'ja',
			'no'              : 'nee',
			'link'            : 'Link',
			'searcresult'     : 'Zoek resultaten',  
			'selected'        : 'geselecteerde items',
			'about'           : 'Over',
			'shortcuts'       : 'Snelkoppelingen',
			'help'            : 'Help',
			'webfm'           : 'Web bestandsmanager',
			'ver'             : 'Versie',
			'protocol'        : 'protocol versie',
			'homepage'        : 'Project home',
			'docs'            : 'Documentatie',
			'github'          : 'Fork ons op Github',
			'twitter'         : 'Volg ons op twitter',
			'facebook'        : 'Wordt lid op facebook',
			'team'            : 'Team',
			'chiefdev'        : 'Hoofd ontwikkelaar',
			'developer'       : 'ontwikkelaar',
			'contributor'     : 'bijdrager',
			'maintainer'      : 'onderhouder',
			'translator'      : 'vertaler',
			'icons'           : 'Iconen',
			'dontforget'      : 'En vergeet je handdoek niet!',
			'shortcutsof'     : 'Snelkoppelingen uitgeschakeld',
			'dropFiles'       : 'Sleep hier uw bestanden heen',
			'or'              : 'of',
			'selectForUpload' : 'Selecteer bestanden om te uploaden',
			'moveFiles'       : 'Verplaats bestanden',
			'copyFiles'       : 'Kopieer bestanden',
			'rmFromPlaces'    : 'Verwijder uit Plaatsen',
			'untitled folder' : 'Nieuwe map',
			'untitled file.txt' : 'nieuw bestand.txt',
			'aspectRatio'     : 'Aspect ratio',
			'scale'           : 'Schaal',
			'width'           : 'Breedte',
			'height'          : 'Hoogte',
			'mode'		  : 'Modus',
			'resize'	  : 'Verkleinen', //Or: Vergroten/verkleinen
			'crop'		  : 'Bijsnijden',
			'rotate'	  : 'Draaien',
			'rotate-cw'	  : 'Draai 90 graden rechtsom',
			'rotate-ccw'	  : 'Draai 90 graden linksom',
			'degree'	  : '  ',
			
			/********************************** mimetypes **********************************/
			'kindUnknown'     : 'Onbekend',
			'kindFolder'      : 'Map',
			'kindAlias'       : 'Alias',
			'kindAliasBroken' : 'Kapot alias',
			// applications
			'kindApp'         : 'Applicatie',
			'kindPostscript'  : 'Postscript document',
			'kindMsOffice'    : 'Microsoft Office document',
			'kindMsWord'      : 'Microsoft Word document',
			'kindMsExcel'     : 'Microsoft Excel document',
			'kindMsPP'        : 'Microsoft Powerpoint presentation',
			'kindOO'          : 'Open Office document',
			'kindAppFlash'    : 'Flash applicatie',
			'kindPDF'         : 'Portable Document Format (PDF)',
			'kindTorrent'     : 'Bittorrent bestand',
			'kind7z'          : '7z archief',
			'kindTAR'         : 'TAR archief',
			'kindGZIP'        : 'GZIP archief',
			'kindBZIP'        : 'BZIP archief',
			'kindZIP'         : 'ZIP archief',
			'kindRAR'         : 'RAR archief',
			'kindJAR'         : 'Java JAR bestand',
			'kindTTF'         : 'True Type font',
			'kindOTF'         : 'Open Type font',
			'kindRPM'         : 'RPM package',
			// texts
			'kindText'        : 'Tekst bestand',
			'kindTextPlain'   : 'Tekst',
			'kindPHP'         : 'PHP bronbestand',
			'kindCSS'         : 'Cascading style sheet',
			'kindHTML'        : 'HTML document',
			'kindJS'          : 'Javascript bronbestand',
			'kindRTF'         : 'Rich Text Format',
			'kindC'           : 'C bronbestand',
			'kindCHeader'     : 'C header bronbestand',
			'kindCPP'         : 'C++ bronbestand',
			'kindCPPHeader'   : 'C++ header bronbestand',
			'kindShell'       : 'Unix shell script',
			'kindPython'      : 'Python bronbestand',
			'kindJava'        : 'Java bronbestand',
			'kindRuby'        : 'Ruby bronbestand',
			'kindPerl'        : 'Perl bronbestand',
			'kindSQL'         : 'SQL bronbestand',
			'kindXML'         : 'XML document',
			'kindAWK'         : 'AWK bronbestand',
			'kindCSV'         : 'Komma gescheiden waardes',
			'kindDOCBOOK'     : 'Docbook XML document',
			// images
			'kindImage'       : 'Afbeelding',
			'kindBMP'         : 'BMP afbeelding',
			'kindJPEG'        : 'JPEG afbeelding',
			'kindGIF'         : 'GIF afbeelding',
			'kindPNG'         : 'PNG afbeelding',
			'kindTIFF'        : 'TIFF afbeelding',
			'kindTGA'         : 'TGA afbeelding',
			'kindPSD'         : 'Adobe Photoshop afbeelding',
			'kindXBITMAP'     : 'X bitmap afbeelding',
			'kindPXM'         : 'Pixelmator afbeelding',
			// media
			'kindAudio'       : 'Audio media',
			'kindAudioMPEG'   : 'MPEG audio',
			'kindAudioMPEG4'  : 'MPEG-4 audio',
			'kindAudioMIDI'   : 'MIDI audio',
			'kindAudioOGG'    : 'Ogg Vorbis audio',
			'kindAudioWAV'    : 'WAV audio',
			'AudioPlaylist'   : 'MP3 playlist',
			'kindVideo'       : 'Video media',
			'kindVideoDV'     : 'DV video',
			'kindVideoMPEG'   : 'MPEG video',
			'kindVideoMPEG4'  : 'MPEG-4 video',
			'kindVideoAVI'    : 'AVI video',
			'kindVideoMOV'    : 'Quick Time video',
			'kindVideoWM'     : 'Windows Media video',
			'kindVideoFlash'  : 'Flash video',
			'kindVideoMKV'    : 'Matroska video',
			'kindVideoOGG'    : 'Ogg video'
		}
	}
}

