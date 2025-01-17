/**
 * Czech translation
 * @author <gridley.jay@gmail.com>
 * @version 2011-07-27
 */
if (elFinder && elFinder.prototype && typeof(elFinder.prototype.i18) == 'object') {
	elFinder.prototype.i18.cs = {
		translator : '&lt;gridley.jay@gmail.com&gt;',
		language   : '  esk  ',
		direction  : 'ltr',
		messages   : {
			/********************************** errors **********************************/
			'error'                : 'Chyba',
			'errUnknown'           : 'Nezn  m   chyba.',
			'errUnknownCmd'        : 'Nezn  m   p    kaz.',
			'errJqui'              : 'Nedosta  uj  c   konfigurace jQuery UI. Mus   b  t zahrnuty komponenty Selectable, draggable a droppable.',
			'errNode'              : 'elFinder vy  aduje vytvo  en   DOM Element.',
			'errURL'               : 'Chybn   konfigurace elFinderu! Nen   nastavena hodnota URL.',
			'errAccess'            : 'P    stup zam  tnut.',
			'errConnect'           : 'Nepoda  ilo se p  ipojit k backendu (konektoru).',
			'errAbort'             : 'P  ipojen   zru  eno.',
			'errTimeout'           : 'Vyp  el limit pro p  ipojen  .',
			'errNotFound'          : 'Backend nenalezen.',
			'errResponse'          : 'Nespr  vn   odpov     backendu.',
			'errConf'              : 'Nepsr  vn   konfigurace backendu.',
			'errJSON'              : 'JSON PHP modul nen   nainstalov  n.',
			'errNoVolumes'         : 'Nen   dostupn     iteln   odd  l.',
			'errCmdParams'         : 'Nespr  vn   parametry p    kazu "$1".',
			'errDataNotJSON'       : 'Data nejsou ve form  tu JSON.',
			'errDataEmpty'         : 'Data jsou pr  zdn  .',
			'errCmdReq'            : 'Dotaz backendu vy  aduje n  zev p    kazu.',
			'errOpen'              : 'Chyba p  i otev  r  n   "$1".',
			'errNotFolder'         : 'Objekt nen   slo  ka.',
			'errNotFile'           : 'Objekt nen   soubor.',
			'errRead'              : 'Chyba p  i   ten   "$1".',
			'errWrite'             : 'Chyba p  i z  pisu do "$1".',
			'errPerm'              : 'P    stup odep  en.',
			'errLocked'            : '"$1" je uzam  en   a nem    e b  t p  ejmenov  n, p  esunut nebo smaz  n.',
			'errExists'            : 'N  zev souboru "$1" ji   existuje.',
			'errInvName'           : 'Nespr  vn   n  zev souboru.',
			'errFolderNotFound'    : 'Slo  ka nenalezena.',
			'errFileNotFound'      : 'Soubor nenalezen.',
			'errTrgFolderNotFound' : 'C  lov   slo  ka "$1" nenalezena.',
			'errPopup'             : 'Prohl    e   zabr  nil otev  en   vyskakovac  ho okna. K otev  en   souboru, povolte vyskakovac   okno v prohl    e  i.',
			'errMkdir'             : 'Nepoda  ilo se vytvo  it slo  ku "$1".',
			'errMkfile'            : 'Nepoda  ilo se vytvo  it soubor "$1".',
			'errRename'            : 'Nepoda  ilo se p  ejmenovat "$1".',
			'errCopyFrom'          : 'Kop  rov  n   soubor   z odd  lu "$1" nen   povoleno.',
			'errCopyTo'            : 'Kop  rov  n   soubor   do odd  lu "$1" nen   povoleno.',
			'errUploadCommon'      : 'Chyba nahr  v  n  .',
			'errUpload'            : 'Nepoda  ilo se nahr  t "$1".',
			'errUploadNoFiles'     : 'Nejsou vybr  ny     dn   soubory k nahr  n  .',
			'errMaxSize'           : 'P  ekro  ena maxim  ln   povolen   velikost dat.',
			'errFileMaxSize'       : 'P  ekro  ena maxim  ln   povolen   velikost souboru.',
			'errUploadMime'        : 'Nepovolen   typ souboru.',
			'errUploadTransfer'    : '"$1" chyba p  enosu.',
			'errSave'              : '"$1" nelze ulo  it.',
			'errCopy'              : '"$1" nelze zkop  rovat.',
			'errMove'              : '"$1" nelze p  em  stit.',
			'errCopyInItself'      : '"$1" nelze zkop  rovat do sama sebe.',
			'errRm'                : '"$1" nelze odstranit.',
			'errExtract'           : 'Nelze extrahovat soubory z "$1".',
			'errArchive'           : 'Nelze vytvo  it arch  v.',
			'errArcType'           : 'Nepodporovan   typ arch  vu.',
			'errNoArchive'         : 'Soubor nen   arch  v nebo m   nepodporovan   form  t.',
			'errCmdNoSupport'      : 'Backend tento p    kaz nepodporuje.',
			'errReplByChild'       : 'Slo  ka "$1" nem    e b  t nahrazena souborem, kter   sama obsahuje.',
			'errArcSymlinks'       : 'Z bezpe  nostn  ch d  vod   je zak  z  no rozbalit arch  vy obsahuj  c   symlinky.',
			'errArcMaxSize'        : 'Soubory arch  vu p  ekra  uj   maxim  ln   povolenou velikost.',

			/******************************* commands names ********************************/
			'cmdarchive'   : 'Vytvo  it arch  v',
			'cmdback'      : 'Zp  t',
			'cmdcopy'      : 'Kop  rovat',
			'cmdcut'       : 'Vyjmout',
			'cmddownload'  : 'St  hnout',
			'cmdduplicate' : 'Duplikovat',
			'cmdedit'      : 'Upravit soubor',
			'cmdextract'   : 'Rozbalit arch  v',
			'cmdforward'   : 'Vp  ed',
			'cmdgetfile'   : 'Vybrat soubory',
			'cmdhelp'      : 'O softwaru',
			'cmdhome'      : 'Dom  ',
			'cmdinfo'      : 'Zobrazit informace',
			'cmdmkdir'     : 'Nov   slo  ka',
			'cmdmkfile'    : 'Nov   textov   soubor',
			'cmdopen'      : 'Otev    t',
			'cmdpaste'     : 'Vlo  it',
			'cmdquicklook' : 'N  hled',
			'cmdreload'    : 'Obnovit',
			'cmdrename'    : 'P  ejmenovat',
			'cmdrm'        : 'Smazat',
			'cmdsearch'    : 'Naj  t soubory',
			'cmdup'        : 'P  ej  t do nad  azen   slo  ky',
			'cmdupload'    : 'Nahr  t soubor(y)',
			'cmdview'      : 'Zobrazit',

			/*********************************** buttons ***********************************/
			'btnClose'  : 'Zav    t',
			'btnSave'   : 'Ulo  it',
			'btnRm'     : 'Odstranit',
			'btnCancel' : 'Zru  it',
			'btnNo'     : 'Ne',
			'btnYes'    : 'Ano',

			/******************************** notifications ********************************/
			'ntfopen'     : 'Otev    t slo  ku',
			'ntffile'     : 'Otev    t soubor',
			'ntfreload'   : 'Obnovit obsah slo  ky',
			'ntfmkdir'    : 'Vytv    en   slo  ky',
			'ntfmkfile'   : 'Vytv    en   soubor  ',
			'ntfrm'       : 'Smazat soubory',
			'ntfcopy'     : 'Kop  rovat soubory',
			'ntfmove'     : 'P  esunout soubory',
			'ntfprepare'  : 'P    prava ke kop  rov  n   soubor  ',
			'ntfrename'   : 'P  ejmenovat soubory',
			'ntfupload'   : 'Nahr  v  n   soubor  ',
			'ntfdownload' : 'Stahov  n   soubor  ',
			'ntfsave'     : 'Ulo  it soubory',
			'ntfarchive'  : 'Vytv    en   arch  vu',
			'ntfextract'  : 'Rozbalov  n   soubor   z arch  vu',
			'ntfsearch'   : 'Vyhled  v  n   soubor  ',
			'ntfsmth'     : '  ekejte pros  m...',

			/************************************ dates **********************************/
			'dateUnknown' : 'nezn  m  ',
			'Today'       : 'Dnes',
			'Yesterday'   : 'V  era',
			'Jan'         : 'Led',
			'Feb'         : '  no',
			'Mar'         : 'B  e',
			'Apr'         : 'Dub',
			'May'         : 'Kv  ',
			'Jun'         : '  er',
			'Jul'         : '  ec',
			'Aug'         : 'Srp',
			'Sep'         : 'Z    ',
			'Oct'         : '    j',
			'Nov'         : 'Lis',
			'Dec'         : 'Pro',

			/********************************** messages **********************************/
			'confirmReq'      : 'Po  adov  no potvr  en  ',
			'confirmRm'       : 'Opravdu chcete odstranit tyto soubory?<br/>Zm  na nelze vr  tit!',
			'confirmRepl'     : 'Nahradit star   soubory nov  mi?',
			'apllyAll'        : 'V  em',
			'name'            : 'N  zev',
			'size'            : 'Velikost',
			'perms'           : 'Pr  va',
			'modify'          : 'Upraven  ',
			'kind'            : 'Druh',
			'read'            : '  ten  ',
			'write'           : 'z  pis',
			'noaccess'        : 'p    stup nepovolen',
			'and'             : 'a',
			'unknown'         : 'nezn  m  ',
			'selectall'       : 'Vybrat v  echny soubory',
			'selectfiles'     : 'Vybrat soubor(y)',
			'selectffile'     : 'Vybrat prvn   soubor',
			'selectlfile'     : 'Vybrat posledn   soubor',
			'viewlist'        : 'Seznam',
			'viewicons'       : 'Ikony',
			'places'          : 'M  sta',
			'calc'            : 'Vypo    tat',
			'path'            : 'Cesta',
			'aliasfor'        : 'Z  stupce pro',
			'locked'          : 'Uzam  en  ',
			'dim'             : 'Rozm  ry',
			'files'           : 'Soubory',
			'folders'         : 'Slo  ky',
			'items'           : 'Polo  ky',
			'yes'             : 'ano',
			'no'              : 'ne',
			'link'            : 'Odkaz',
			'searcresult'     : 'V  sledky hled  n  ',
			'selected'        : 'vybran   polo  ky',
			'about'           : 'O',
			'shortcuts'       : 'Z  stupci',
			'help'            : 'N  pov  da',
			'webfm'           : 'Webov   spr  vce soubor  ',
			'ver'             : 'Verze',
			'protocol'        : 'verze protokolu',
			'homepage'        : 'Domovsk   str  nka projektu',
			'docs'            : 'Dokumentace',
			'github'          : 'Fork us on Github',
			'twitter'         : 'Follow us on twitter',
			'facebook'        : 'Join us on facebook',
			'team'            : 'T  m',
			'chiefdev'        : 's  f v  voj      ',
			'developer'       : 'v  voj  r',
			'contributor'     : 'spolupracovn  k',
			'maintainer'      : '  dr  ba',
			'translator'      : 'p  eklad',
			'icons'           : 'Ikony',
			'dontforget'      : 'a nezapome  te si vz  t plavky',
			'shortcutsof'     : 'Z  stupci nejsou povoleni',
			'dropFiles'       : 'P  et  hn  te soubory sem',
			'or'              : 'nebo',
			'selectForUpload' : 'Vyberte soubory',
			'moveFiles'       : 'P  esunout sobory',
			'copyFiles'       : 'Zkup  rovat soubory',
			'rmFromPlaces'    : 'Odstranit z m  st',
			'untitled folder' : 'bez n  zvu',
			'untitled file.txt' : 'nepojmenovan   soubor.txt',

			/********************************** mimetypes **********************************/
			'kindUnknown'     : 'Nezn  m  ',
			'kindFolder'      : 'Slo  ka',
			'kindAlias'       : 'Odkaz',
			'kindAliasBroken' : 'Neplatn   odkaz',
			// applications
			'kindApp'         : 'Aplikace',
			'kindPostscript'  : 'Dokument Postscriptu',
			'kindMsOffice'    : 'Dokument Microsoft Office',
			'kindMsWord'      : 'Dokument Microsoft Word',
			'kindMsExcel'     : 'Dokument Microsoft Excel',
			'kindMsPP'        : 'Prezentace Microsoft Powerpoint',
			'kindOO'          : 'Otev    t dokument Office',
			'kindAppFlash'    : 'Flash aplikace',
			'kindPDF'         : 'PDF',
			'kindTorrent'     : 'Soubor BitTorrent',
			'kind7z'          : 'Arch  v 7z',
			'kindTAR'         : 'Arch  v TAR',
			'kindGZIP'        : 'Arch  v GZIP',
			'kindBZIP'        : 'Arch  v BZIP',
			'kindZIP'         : 'Arch  v ZIP',
			'kindRAR'         : 'Arch  v RAR',
			'kindJAR'         : 'Soubor Java JAR',
			'kindTTF'         : 'True Type font',
			'kindOTF'         : 'Open Type font',
			'kindRPM'         : 'RPM bal    ek',
			// texts
			'kindText'        : 'Textov   dokument',
			'kindTextPlain'   : '  ist   text',
			'kindPHP'         : 'PHP zdrojov   k  d',
			'kindCSS'         : 'Kask  dov   styly',
			'kindHTML'        : 'HTML dokument',
			'kindJS'          : 'Javascript zdrojov   k  d',
			'kindRTF'         : 'Rich Text Format',
			'kindC'           : 'C zdrojov   k  d',
			'kindCHeader'     : 'C hlavi  ka',
			'kindCPP'         : 'C++ zdrojov   k  d',
			'kindCPPHeader'   : 'C++ hlavi  ka',
			'kindShell'       : 'Unix shell skript',
			'kindPython'      : 'Python zdrojov   k  d',
			'kindJava'        : 'Java zdrojov   k  d',
			'kindRuby'        : 'Ruby zdrojov   k  d',
			'kindPerl'        : 'Perl skript',
			'kindSQL'         : 'SQL zdrojov   k  d',
			'kindXML'         : 'Dokument XML',
			'kindAWK'         : 'AWK zdrojov   k  d',
			'kindCSV'         : 'CSV',
			'kindDOCBOOK'     : 'Docbook XML dokument',
			// images
			'kindImage'       : 'Obr  zek',
			'kindBMP'         : 'Obr  zek BMP',
			'kindJPEG'        : 'Obr  zek JPEG',
			'kindGIF'         : 'Obr  zek GIF',
			'kindPNG'         : 'Obr  zek PNG',
			'kindTIFF'        : 'Obr  zek TIFF',
			'kindTGA'         : 'Obr  zek TGA',
			'kindPSD'         : 'Obr  zek Adobe Photoshop',
			'kindXBITMAP'     : 'Obr  zek X bitmapa',
			'kindPXM'         : 'Obr  zek Pixelmator',
			// media
			'kindAudio'       : 'Audio sobory',
			'kindAudioMPEG'   : 'MPEG audio',
			'kindAudioMPEG4'  : 'MPEG-4 audio',
			'kindAudioMIDI'   : 'MIDI audio',
			'kindAudioOGG'    : 'Ogg Vorbis audio',
			'kindAudioWAV'    : 'WAV audio',
			'AudioPlaylist'   : 'MP3 playlist',
			'kindVideo'       : 'Video sobory',
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
