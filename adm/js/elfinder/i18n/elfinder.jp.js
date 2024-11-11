/**
 * Japanese translation
 * @author Tomoaki Yoshida <info@yoshida-studio.jp>
 * @version 2012-02-25
 */
if (elFinder && elFinder.prototype && typeof(elFinder.prototype.i18) == 'object') {
	elFinder.prototype.i18.jp = {
		translator : 'Tomoaki Yoshida &lt;info@yoshida-studio.jp&gt;',
		language   : 'Japanese',
		direction  : 'ltr',
		messages   : {
			
			/********************************** errors **********************************/
			'error'                : '         ',
			'errUnknown'           : '                        ',
			'errUnknownCmd'        : '                           ',
			'errJqui'              : '         jQuery UI                                                                                                                                                                                                       ',
			'errNode'              : 'elFinder   DOM Element               ',
			'errURL'               : '         elFinder                                     ! URL                           ',
			'errAccess'            : '                                    ',
			'errConnect'           : '                                                ',
			'errAbort'             : '                              ',
			'errTimeout'           : '                                       .',
			'errNotFound'          : '                                          ',
			'errResponse'          : '                                                               ',
			'errConf'              : '                                                               ',
			'errJSON'              : 'PHP JSON                                                          ',
			'errNoVolumes'         : '                                                            ',
			'errCmdParams'         : '             "$1"                                    ',
			'errDataNotJSON'       : 'JSON                              ',
			'errDataEmpty'         : '                     ',
			'errCmdReq'            : '                                                                           ',
			'errOpen'              : '"$1"                                 ',
			'errNotFolder'         : '                                                         ',
			'errNotFile'           : '                                                      ',
			'errRead'              : '"$1"                                 ',
			'errWrite'             : '"$1"                                       ',
			'errPerm'              : '                        ',
			'errLocked'            : '"$1"                                                                                     ',
			'errExists'            : '"$1"                                                         ',
			'errInvName'           : '                              ',
			'errFolderNotFound'    : '                                       ',
			'errFileNotFound'      : '                                    ',
			'errTrgFolderNotFound' : '                                        "$1"                         ',
			'errPopup'             : '                                                                                                                                 ',
			'errMkdir'             : '"$1"                                                      ',
			'errMkfile'            : '"$1"                                                   ',
			'errRename'            : '"$1"                                                ',
			'errCopyFrom'          : '"$1"                                                            ',
			'errCopyTo'            : '"$1"                                                         ',
			'errUpload'            : '                           ',  // old name - errUploadCommon
			'errUploadFile'        : '"$1"                                    ', // old name - errUpload
			'errUploadNoFiles'     : '                                                         ',
			'errUploadTotalSize'   : '                                                ', // old name - errMaxSize
			'errUploadFileSize'    : '                                                   ', //  old name - errFileMaxSize
			'errUploadMime'        : '                                                ',
			'errUploadTransfer'    : '"$1"                      ', 
			'errNotReplace'        : '             "$1"                                                                                                                            ', // new
			'errReplace'           : '"$1"                                          ',
			'errSave'              : '"$1"                                       ',
			'errCopy'              : '"$1"                                          ',
			'errMove'              : '"$1"                                       ',
			'errCopyInItself'      : '"$1"                                                               ',
			'errRm'                : '"$1"                                       ',
			'errRmSrc'             : 'Unable remove source file(s).',
			'errExtract'           : '"$1"                                       ',
			'errArchive'           : '                                                      ',
			'errArcType'           : '                                             ',
			'errNoArchive'         : '                                                                                    ',
			'errCmdNoSupport'      : '                                                ',
			'errReplByChild'       : '          "$1"                                                                         ',
			'errArcSymlinks'       : '                                                                                                   ',
			'errArcMaxSize'        : '                                                               ',
			'errResize'            : '"$1"                              ',
			'errUsupportType'      : '                                                         ',
			'errNotUTF8Content'    : '             "$1"        UTF-8                                                                ',  // added 9.11.2011
			
			/******************************* commands names ********************************/
			'cmdarchive'   : '                     ',
			'cmdback'      : '      ',
			'cmdcopy'      : '         ',
			'cmdcut'       : '         ',
			'cmddownload'  : '                  ',
			'cmdduplicate' : '      ',
			'cmdedit'      : '                  ',
			'cmdextract'   : '                        ',
			'cmdforward'   : '      ',
			'cmdgetfile'   : '                  ',
			'cmdhelp'      : '                                    ',
			'cmdhome'      : '         ',
			'cmdinfo'      : '      ',
			'cmdmkdir'     : '                     ',
			'cmdmkfile'    : '                              ',
			'cmdopen'      : '      ',
			'cmdpaste'     : '            ',
			'cmdquicklook' : '               ',
			'cmdreload'    : '            ',
			'cmdrename'    : '            ',
			'cmdrm'        : '      ',
			'cmdsearch'    : '                     ',
			'cmdup'        : '                                 ',
			'cmdupload'    : '                              ',
			'cmdview'      : '         ',
			'cmdresize'    : '                     ',
			'cmdsort'      : '         ',
			
			/*********************************** buttons ***********************************/ 
			'btnClose'  : '         ',
			'btnSave'   : '      ',
			'btnRm'     : '      ',
			'btnApply'  : '      ',
			'btnCancel' : '               ',
			'btnNo'     : '         ',
			'btnYes'    : '      ',
			
			/******************************** notifications ********************************/
			'ntfopen'     : '                        ',
			'ntffile'     : '                     ',
			'ntfreload'   : '                           ',
			'ntfmkdir'    : '                              ',
			'ntfmkfile'   : '                     ',
			'ntfrm'       : '                     ',
			'ntfcopy'     : '                        ',
			'ntfmove'     : '                     ',
			'ntfprepare'  : '                              ',
			'ntfrename'   : '                        ',
			'ntfupload'   : '                                 ',
			'ntfdownload' : '                                 ',
			'ntfsave'     : '                     ',
			'ntfarchive'  : '                     ',
			'ntfextract'  : '                        ',
			'ntfsearch'   : '                  ',
			'ntfresize'   : '                           ',
			'ntfsmth'     : '                      >_<',
			'ntfloadimg'  : 'Loading image',
			
			/************************************ dates **********************************/
			'dateUnknown' : '      ',
			'Today'       : '      ',
			'Yesterday'   : '      ',
			'Jan'         : '1   ',
			'Feb'         : '2   ',
			'Mar'         : '3   ',
			'Apr'         : '4   ',
			'May'         : '5   ',
			'Jun'         : '6   ',
			'Jul'         : '7   ',
			'Aug'         : '8   ',
			'Sep'         : '9   ',
			'Oct'         : '10   ',
			'Nov'         : '11   ',
			'Dec'         : '12   ',

			/******************************** sort variants ********************************/
			'sortnameDirsFirst' : '          (                  )', 
			'sortkindDirsFirst' : '          (                  )', 
			'sortsizeDirsFirst' : '             (                  )', 
			'sortdateDirsFirst' : '          (                  )', 
			'sortname'          : '         ', 
			'sortkind'          : '         ', 
			'sortsize'          : '            ',
			'sortdate'          : '         ',

			/********************************** messages **********************************/
			'confirmReq'      : '                  ',
			'confirmRm'       : '                                          ?<br/>                                    !',
			'confirmRepl'     : '                                                                  ?',
			'apllyAll'        : '                        ',
			'name'            : '      ',
			'size'            : '         ',
			'perms'           : '      ',
			'modify'          : '      ',
			'kind'            : '      ',
			'read'            : '            ',
			'write'           : '            ',
			'noaccess'        : '                  ',
			'and'             : ',',
			'unknown'         : '      ',
			'selectall'       : '                              ',
			'selectfiles'     : '                  ',
			'selectffile'     : '                              ',
			'selectlfile'     : '                              ',
			'viewlist'        : '                        ',
			'viewicons'       : '                           ',
			'places'          : 'Places',
			'calc'            : '      ', 
			'path'            : '      ',
			'aliasfor'        : '               ',
			'locked'          : '                           ',
			'dim'             : '         ',
			'files'           : '            ',
			'folders'         : '               ',
			'items'           : '            ',
			'yes'             : '      ',
			'no'              : '         ',
			'link'            : '         ',
			'searcresult'     : '            ',  
			'selected'        : '                           ',
			'about'           : '            ',
			'shortcuts'       : '                     ',
			'help'            : '         ',
			'webfm'           : '                                       ',
			'ver'             : '               ',
			'protocol'        : '                              ',
			'homepage'        : '                           ',
			'docs'            : '                              ',
			'github'          : 'Github                ',
			'twitter'         : 'Twitter                ',
			'facebook'        : 'Facebook                      ',
			'team'            : '         ',
			'chiefdev'        : '                           ',
			'developer'       : '                  ',
			'contributor'     : '                        ',
			'maintainer'      : '                  ',
			'translator'      : '         ',
			'icons'           : '            ',
			'dontforget'      : '                                    ',
			'shortcutsof'     : '                                             ',
			'dropFiles'       : '                                    ',
			'or'              : '         ',
			'selectForUpload' : '                                             ',
			'moveFiles'       : '                     ',
			'copyFiles'       : '                        ',
			'rmFromPlaces'    : '                  ',
			'aspectRatio'     : '               ',
			'scale'           : '            ',
			'width'           : '   ',
			'height'          : '      ',
			'resize'          : '            ',
			'crop'            : '            ',
			'rotate'          : '      ',
			'rotate-cw'       : '90            ',
			'rotate-ccw'      : '90            ',
			'degree'          : '   ',
			
			/********************************** mimetypes **********************************/
			'kindUnknown'     : '      ',
			'kindFolder'      : '               ',
			'kindAlias'       : '      ',
			'kindAliasBroken' : '                     ',
			// applications
			'kindApp'         : '                        ',
			'kindPostscript'  : 'Postscript                   ',
			'kindMsOffice'    : 'Microsoft Office                   ',
			'kindMsWord'      : 'Microsoft Word                   ',
			'kindMsExcel'     : 'Microsoft Excel                   ',
			'kindMsPP'        : 'Microsoft Powerpoint                            ',
			'kindOO'          : 'Open Office                   ',
			'kindAppFlash'    : 'Flash                         ',
			'kindPDF'         : 'PDF',
			'kindTorrent'     : 'Bittorrent             ',
			'kind7z'          : '7z                ',
			'kindTAR'         : 'TAR                ',
			'kindGZIP'        : 'GZIP                ',
			'kindBZIP'        : 'BZIP                ',
			'kindZIP'         : 'ZIP                ',
			'kindRAR'         : 'RAR                ',
			'kindJAR'         : 'Java JAR             ',
			'kindTTF'         : 'True Type             ',
			'kindOTF'         : 'Open Type             ',
			'kindRPM'         : 'RPM                ',
			// texts
			'kindText'        : 'Text                   ',
			'kindTextPlain'   : '                        ',
			'kindPHP'         : 'PHP          ',
			'kindCSS'         : 'Cascading style sheet',
			'kindHTML'        : 'HTML                   ',
			'kindJS'          : 'Javascript          ',
			'kindRTF'         : 'Rich Text                   ',
			'kindC'           : 'C          ',
			'kindCHeader'     : 'C                      ',
			'kindCPP'         : 'C++          ',
			'kindCPPHeader'   : 'C++                      ',
			'kindShell'       : 'Unix shell                ',
			'kindPython'      : 'Python          ',
			'kindJava'        : 'Java          ',
			'kindRuby'        : 'Ruby          ',
			'kindPerl'        : 'Perl                ',
			'kindSQL'         : 'SQL          ',
			'kindXML'         : 'XML                   ',
			'kindAWK'         : 'AWK          ',
			'kindCSV'         : 'CSV',
			'kindDOCBOOK'     : 'Docbook XML                   ',
			// images
			'kindImage'       : '            ',
			'kindBMP'         : 'BMP             ',
			'kindJPEG'        : 'JPEG             ',
			'kindGIF'         : 'GIF             ',
			'kindPNG'         : 'PNG             ',
			'kindTIFF'        : 'TIFF             ',
			'kindTGA'         : 'TGA             ',
			'kindPSD'         : 'Adobe Photoshop             ',
			'kindXBITMAP'     : 'X bitmap             ',
			'kindPXM'         : 'Pixelmator             ',
			// media
			'kindAudio'       : '                           ',
			'kindAudioMPEG'   : 'MPEG                ',
			'kindAudioMPEG4'  : 'MPEG-4                ',
			'kindAudioMIDI'   : 'MIDI                ',
			'kindAudioOGG'    : 'Ogg Vorbis                ',
			'kindAudioWAV'    : 'WAV                ',
			'AudioPlaylist'   : 'MP3                   ',
			'kindVideo'       : '                     ',
			'kindVideoDV'     : 'DV             ',
			'kindVideoMPEG'   : 'MPEG             ',
			'kindVideoMPEG4'  : 'MPEG-4             ',
			'kindVideoAVI'    : 'AVI             ',
			'kindVideoMOV'    : 'Quick Time             ',
			'kindVideoWM'     : 'Windows Media             ',
			'kindVideoFlash'  : 'Flash             ',
			'kindVideoMKV'    : 'Matroska             ',
			'kindVideoOGG'    : 'Ogg             '
		}
	};
}
