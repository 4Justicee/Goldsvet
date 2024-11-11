/**
 * Arabic translation (Syrian Localization, it may differ if you aren't from Syria or any Country in Middle East)
 * @author Tawfek Daghistani <tawfekov@gmail.com>
 * @version 2011-07-09
 */
if (elFinder && elFinder.prototype && typeof(elFinder.prototype.i18) == 'object') {
	elFinder.prototype.i18.ar = {
		translator : 'Tawfek Daghistani &lt;tawfekov@gmail.com&gt;',
		language   : '              ',
		direction  : 'rtl',
		messages   : {

			/********************************** errors **********************************/
			'error'                : '      ',
			'errUnknown'           : '                         .',
			'errUnknownCmd'        : '                         .',
			'errJqui'              : '               jQuery UI                                                                     selectable, draggable and droppable',
			'errNode'              : '.            DOM                  elFinder             ',
			'errURL'               : '                          ,                                                       ',
			'errAccess'            : '                    .',
			'errConnect'           : '                                                                   (backend)',
			'errAbort'             : '                          ',
			'errTimeout'           : '                                        .',
			'errNotFound'          : '                                            .',
			'errResponse'          : '                                                     ',
			'errConf'              : '                                                                        ',
			'errJSON'              : '             PHP JSON module                     ',
			'errNoVolumes'         : '                                                                            ',
			'errCmdParams'         : '                                                               "$1".',
			'errDataNotJSON'       : '                                                       JSON ',
			'errDataEmpty'         : '                                       ',
			'errCmdReq'            : '                                                              ',
			'errOpen'              : '                               "$1".',
			'errNotFolder'         : '                                           ',
			'errNotFile'           : '                                         ',
			'errRead'              : '                                      "$1".',
			'errWrite'             : '                                      "$1".',
			'errPerm'              : '                    ',
			'errLocked'            : '                                                                                        "$1"',
			'errExists'            : '                         "$1"',
			'errInvName'           : '                     ',
			'errFolderNotFound'    : '                              ',
			'errFileNotFound'      : '                            ',
			'errTrgFolderNotFound' : '                       "$1"                   ',
			'errPopup'             : '                                                                    ,                                                                                           ',
			'errMkdir'             : '                                                     "$1".',
			'errMkfile'            : '                                                  "$1".',
			'errRename'            : '                                                   "$1".',
			'errCopyFrom'          : '                                                   "$1"                 .',
			'errCopyTo'            : '                                                     "$1"                   .',
			'errUploadCommon'      : '                                       ',
			'errUpload'            : '                              "$1".',
			'errUploadNoFiles'     : '                               ',
			'errMaxSize'           : '                                                                     ',
			'errFileMaxSize'       : '                                                              ',
			'errUploadMime'        : '                                ',
			'errUploadTransfer'    : '"$1"                                        ', 
			'errSave'              : '                                        "$1".',
			'errCopy'              : '                                        "$1".',
			'errMove'              : '                                       "$1".',
			'errCopyInItself'      : '                                         "$1"                           .',
			'errRm'                : '                                  "$1".',
			'errExtract'           : '                                                           "$1".',
			'errArchive'           : '                                                    ',
			'errArcType'           : '                                                    ',
			'errNoArchive'         : '                                                                                  ',
			'errCmdNoSupport'      : '                                                          ',
			'errReplByChild'       : 'The folder    $1    can   t be replaced by an item it contains.',
			'errArcSymlinks'       : 'For security reason denied to unpack archives contains symlinks.',
			'errArcMaxSize'        : 'Archive files exceeds maximum allowed size.',
			
			/******************************* commands names ********************************/
			'cmdarchive'   : '                            ',
			'cmdback'      : '          ',
			'cmdcopy'      : '      ',
			'cmdcut'       : '    ',
			'cmddownload'  : '          ',
			'cmdduplicate' : '          ',
			'cmdedit'      : '                     ',
			'cmdextract'   : '                             ',
			'cmdforward'   : '            ',
			'cmdgetfile'   : '                           ',
			'cmdhelp'      : '                          ',
			'cmdhome'      : '                           ',
			'cmdinfo'      : '               ',
			'cmdmkdir'     : '                 ',
			'cmdmkfile'    : '                      ',
			'cmdopen'      : '      ',
			'cmdpaste'     : '      ',
			'cmdquicklook' : '            ',
			'cmdreload'    : '                     ',
			'cmdrename'    : '                     ',
			'cmdrm'        : '      ',
			'cmdsearch'    : '                      ',
			'cmdup'        : '                                                  ',
			'cmdupload'    : '                 ',
			'cmdview'      : '      ',

			/*********************************** buttons ***********************************/ 
			'btnClose'  : '          ',
			'btnSave'   : '      ',
			'btnRm'     : '          ',
			'btnCancel' : '          ',
			'btnNo'     : '    ',
			'btnYes'    : '      ',

			/******************************** notifications ********************************/
			'ntfopen'     : '               ',
			'ntffile'     : '             ',
			'ntfreload'   : '                                              ',
			'ntfmkdir'    : '                         ',
			'ntfmkfile'   : '                       ',
			'ntfrm'       : '                     ',
			'ntfcopy'     : '                     ',
			'ntfmove'     : '                     ',
			'ntfprepare'  : '                                  ',
			'ntfrename'   : '                                    ',
			'ntfupload'   : '                     ',
			'ntfdownload' : '                         ',
			'ntfsave'     : '                     ',
			'ntfarchive'  : '                          ',
			'ntfextract'  : '                                                         ',
			'ntfsearch'   : '                        ',
			'ntfsmth'     : '                       >_<',

			/************************************ dates **********************************/
			'dateUnknown' : '                 ',
			'Today'       : '          ',
			'Yesterday'   : '              ',
			'Jan'         : '                       ',
			'Feb'         : '        ',
			'Mar'         : '        ',
			'Apr'         : '          ',
			'May'         : '        ',
			'Jun'         : '            ',
			'Jul'         : '        ',
			'Aug'         : '    ',
			'Sep'         : '          ',
			'Oct'         : '                     ',
			'Nov'         : '                       ',
			'Dec'         : '                      ',

			/********************************** messages **********************************/
			'confirmReq'      : '                       ',
			'confirmRm'       : '                                                      <br/>                                                        ',
			'confirmRepl'     : '                                                           ',
			'apllyAll'        : '                          ',
			'name'            : '          ',
			'size'            : '          ',
			'perms'           : '                  ',
			'modify'          : '                 ',
			'kind'            : '                 ',
			'read'            : '          ',
			'write'           : '          ',
			'noaccess'        : '                   ',
			'and'             : '  ',
			'unknown'         : '                 ',
			'selectall'       : '                              ',
			'selectfiles'     : '                     ',
			'selectffile'     : '                                ',
			'selectlfile'     : '                                  ',
			'viewlist'        : '                      ',
			'viewicons'       : '                          ',
			'places'          : '              ',
			'calc'            : '        ', 
			'path'            : '        ',
			'aliasfor'        : 'Alias for',
			'locked'          : '          ',
			'dim'             : '              ',
			'files'           : '          ',
			'folders'         : '            ',
			'items'           : '          ',
			'yes'             : '      ',
			'no'              : '    ',
			'link'            : '            ',
			'searcresult'     : '                     ',  
			'selected'        : '                             ',
			'about'           : '                     ',
			'shortcuts'       : '                    ',
			'help'            : '            ',
			'webfm'           : '                              ',
			'ver'             : '                     ',
			'protocol'        : '                             ',
			'homepage'        : '                             ',
			'docs'            : '                  ',
			'github'          : '                                                Github',
			'twitter'         : '                              ',
			'facebook'        : '                                            ',
			'team'            : '            ',
			'chiefdev'        : '                           ',
			'developer'       : '          ',
			'contributor'     : '          ',
			'maintainer'      : '          ',
			'translator'      : '          ',
			'icons'           : '              ',
			'dontforget'      : 'and don\'t forget to take your towel',
			'shortcutsof'     : '                                      ',
			'dropFiles'       : '                            ',
			'or'              : '    ',
			'selectForUpload' : '                                                    ',
			'moveFiles'       : '                   ',
			'copyFiles'       : '                     ',
			'rmFromPlaces'    : 'Remove from places',
			'untitled folder' : 'untitled folder',
			'untitled file.txt' : 'untitled file.txt',
			
			/********************************** mimetypes **********************************/
			'kindUnknown'     : '                 ',
			'kindFolder'      : '        ',
			'kindAlias'       : '            ',
			'kindAliasBroken' : '                            ',
			// applications
			'kindApp'         : '            ',
			'kindPostscript'  : 'Postscript       ',
			'kindMsOffice'    : 'Microsoft Office       ',
			'kindMsWord'      : 'Microsoft Word       ',
			'kindMsExcel'     : 'Microsoft Excel       ',
			'kindMsPP'        : 'Microsoft Powerpoint                     ',
			'kindOO'          : 'Open Office       ',
			'kindAppFlash'    : '                   ',
			'kindPDF'         : '       (PDF)',
			'kindTorrent'     : 'Bittorrent       ',
			'kind7z'          : '7z       ',
			'kindTAR'         : 'TAR       ',
			'kindGZIP'        : 'GZIP       ',
			'kindBZIP'        : 'BZIP       ',
			'kindZIP'         : 'ZIP       ',
			'kindRAR'         : 'RAR       ',
			'kindJAR'         : 'Java JAR       ',
			'kindTTF'         : 'True Type      ',
			'kindOTF'         : 'Open Type      ',
			'kindRPM'         : 'RPM                  ',
			// texts
			'kindText'        : 'Text       ',
			'kindTextPlain'   : '                 ',
			'kindPHP'         : 'PHP                              ',
			'kindCSS'         : 'Cascading style sheet',
			'kindHTML'        : 'HTML       ',
			'kindJS'          : 'Javascript                              ',
			'kindRTF'         : 'Rich Text Format',
			'kindC'           : 'C                              ',
			'kindCHeader'     : 'C header                              ',
			'kindCPP'         : 'C++                              ',
			'kindCPPHeader'   : 'C++ header                              ',
			'kindShell'       : 'Unix shell script',
			'kindPython'      : 'Python                              ',
			'kindJava'        : 'Java                              ',
			'kindRuby'        : 'Ruby                              ',
			'kindPerl'        : 'Perl script',
			'kindSQL'         : 'SQL                              ',
			'kindXML'         : 'XML       ',
			'kindAWK'         : 'AWK                              ',
			'kindCSV'         : '       CSV',
			'kindDOCBOOK'     : 'Docbook XML       ',
			// images
			'kind        '       : '        ',
			'kindBMP'         : 'BMP         ',
			'kindJPEG'        : 'JPEG         ',
			'kindGIF'         : 'GIF         ',
			'kindPNG'         : 'PNG         ',
			'kindTIFF'        : 'TIFF         ',
			'kindTGA'         : 'TGA         ',
			'kindPSD'         : 'Adobe Photoshop         ',
			'kindXBITMAP'     : 'X bitmap         ',
			'kindPXM'         : 'Pixelmator         ',
			// media
			'kindAudio'       : '               ',
			'kindAudioMPEG'   : 'MPEG                ',
			'kindAudioMPEG4'  : 'MPEG-4                ',
			'kindAudioMIDI'   : 'MIDI                ',
			'kindAudioOGG'    : 'Ogg Vorbis                ',
			'kindAudioWAV'    : 'WAV                ',
			'AudioPlaylist'   : 'MP3                      ',
			'kindVideo'       : '                 ',
			'kindVideoDV'     : 'DV                  ',
			'kindVideoMPEG'   : 'MPEG                  ',
			'kindVideoMPEG4'  : 'MPEG-4                  ',
			'kindVideoAVI'    : 'AVI                  ',
			'kindVideoMOV'    : 'Quick Time                  ',
			'kindVideoWM'     : 'Windows Media                  ',
			'kindVideoFlash'  : 'Flash                  ',
			'kindVideoMKV'    : 'Matroska                  ',
			'kindVideoOGG'    : 'Ogg                  '
		}
	}
}


 
