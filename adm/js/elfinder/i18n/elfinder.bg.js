/**
 * Bulgarian translation
 * @author Stamo Petkov <stamo.petkov@gmail.com>
 * @version 2012-02-18
 */
if (elFinder && elFinder.prototype && typeof(elFinder.prototype.i18) == 'object') {
	elFinder.prototype.i18.bg = {
		translator : 'Stamo Petkov &lt;stamo.petkov@gmail.com&gt;',
		language   : '                  ',
		direction  : 'ltr',
		messages   : {
			
			/********************************** errors **********************************/
			'error'                : '            ',
			'errUnknown'           : '                               .',
			'errUnknownCmd'        : '                                 .',
			'errJqui'              : '                                           jQuery UI.                          selectable, draggable    droppable                                        .',
			'errNode'              : 'elFinder                                               DOM               .',
			'errURL'               : '                                            elFinder!                                                URL.',
			'errAccess'            : '                           .',
			'errConnect'           : '                                           .',
			'errAbort'             : '                                        .',
			'errTimeout'           : '                                 .',
			'errNotFound'          : '                                       .', 
			'errResponse'          : '                                               .',
			'errConf'              : '                                                   .', 
			'errJSON'              : '                                             PHP      JSON.',
			'errNoVolumes'         : '                                                        .',
			'errCmdParams'         : '                                                        "$1".',
			'errDataNotJSON'       : '                         JSON.',
			'errDataEmpty'         : '                         .',
			'errCmdReq'            : '                                                                                    .',
			'errOpen'              : '                                "$1".',
			'errNotFolder'         : '                                 .',
			'errNotFile'           : '                               .',
			'errRead'              : '                                  "$1".',
			'errWrite'             : '                               "$1".',
			'errPerm'              : '                                     .',
			'errLocked'            : '"$1"                                                                          ,                                       .',
			'errExists'            : '                                                 "$1"',
			'errInvName'           : '                                 .',
			'errFolderNotFound'    : '                                     .',
			'errFileNotFound'      : '                                 .',
			'errTrgFolderNotFound' : '                            "$1"                         .',
			'errPopup'             : '                                                                          .                                      ,                                                                                        .',
			'errMkdir'             : '                                          "$1".',
			'errMkfile'            : '                                         "$1".',
			'errRename'            : '                                          "$1".',
			'errCopyFrom'          : '                                                     "$1"                           .',
			'errCopyTo'            : '                                                   "$1"                           .',
			'errUploadCommon'      : '                                  .',
			'errUpload'            : '                            "$1".',
			'errUploadNoFiles'     : '                                                             .',
			'errMaxSize'           : '                                                                                          .',
			'errFileMaxSize'       : '                                                                                    .',
			'errUploadMime'        : '                                               .',
			'errUploadTransfer'    : '"$1"                                       .', 
			'errSave'              : '                                "$1".',
			'errCopy'              : '                                  "$1".',
			'errMove'              : '                                    "$1".',
			'errCopyInItself'      : '                                  "$1"                               .',
			'errRm'                : '                                    "$1".',
			'errExtract'           : '                                                          "$1".',
			'errArchive'           : '                                          .',
			'errArcType'           : '                                               .',
			'errNoArchive'         : '                                                                            .',
			'errCmdNoSupport'      : '                                                            .', 
			'errReplByChild'       : '                  $1                                                                                                    .',
			'errArcSymlinks'       : '                                                                                                                                      symlinks.',
			'errArcMaxSize'        : '                                                                                                             .',
			'errResize'            : '                                          "$1".',
			'errUsupportType'      : '                                      .',
			
			/******************************* commands names ********************************/
			'cmdarchive'   : '                       ',
			'cmdback'      : '          ',
			'cmdcopy'      : '              ',
			'cmdcut'       : '            ',
			'cmddownload'  : '          ',
			'cmdduplicate' : '                ',
			'cmdedit'      : '                             ',
			'cmdextract'   : '                                                   ',
			'cmdforward'   : '            ',
			'cmdgetfile'   : '                           ',
			'cmdhelp'      : '                              ',
			'cmdhome'      : '            ',
			'cmdinfo'      : '                    ',
			'cmdmkdir'     : '                   ',
			'cmdmkfile'    : '                                ',
			'cmdopen'      : '            ',
			'cmdpaste'     : '            ',
			'cmdquicklook' : '              ',
			'cmdreload'    : '                  ',
			'cmdrename'    : '                      ',
			'cmdrm'        : '            ',
			'cmdsearch'    : '                           ',
			'cmdup'        : '                                          ',
			'cmdupload'    : '                           ',
			'cmdview'      : '      ',
			'cmdresize'    : '                                        ',
			'cmdsort'      : '              ',
			
			/*********************************** buttons ***********************************/ 
			'btnClose'  : '              ',
			'btnSave'   : '            ',
			'btnRm'     : '                ',
			'btnApply'  : '              ',
			'btnCancel' : '          ',
			'btnNo'     : '    ',
			'btnYes'    : '    ',
			
			/******************************** notifications ********************************/
			'ntfopen'     : '                                ',
			'ntffile'     : '                              ',
			'ntfreload'   : '                                                                 ',
			'ntfmkdir'    : '                                     ',
			'ntfmkfile'   : '                         ',
			'ntfrm'       : '                                      ',
			'ntfcopy'     : '                                    ',
			'ntfmove'     : '                                          ',
			'ntfprepare'  : '                                                              ',
			'ntfrename'   : '                                            ',
			'ntfupload'   : '                           ',
			'ntfdownload' : '                           ',
			'ntfsave'     : '                              ',
			'ntfarchive'  : '                           ',
			'ntfextract'  : '                                                   ',
			'ntfsearch'   : '                         ',
			'ntfsmth'     : '                >_<',
			'ntfloadimg'  : '                                       ',
			
			/************************************ dates **********************************/
			'dateUnknown' : '                    ',
			'Today'       : '        ',
			'Yesterday'   : '          ',
			'Jan'         : '      ',
			'Feb'         : '      ',
			'Mar'         : '      ',
			'Apr'         : '      ',
			'May'         : '      ',
			'Jun'         : '      ',
			'Jul'         : '      ',
			'Aug'         : '      ',
			'Sep'         : '      ',
			'Oct'         : '      ',
			'Nov'         : '      ',
			'Dec'         : '      ',
			
			/******************************** sort variants ********************************/
			'sortnameDirsFirst' : '            (                         )', 
			'sortkindDirsFirst' : '            (                         )', 
			'sortsizeDirsFirst' : '                  (                         )', 
			'sortdateDirsFirst' : '              (                         )', 
			'sortname'          : '           ', 
			'sortkind'          : '           ', 
			'sortsize'          : '                 ',
			'sortdate'          : '             ',
			
			/********************************** messages **********************************/
			'confirmReq'      : '                                              ',
			'confirmRm'       : '                          ,                                                                 ?<br/>                                                 !',
			'confirmRepl'     : '                                                          ?',
			'apllyAll'        : '                                ',
			'name'            : '      ',
			'size'            : '            ',
			'perms'           : '                    ',
			'modify'          : '                ',
			'kind'            : '      ',
			'read'            : '            ',
			'write'           : '          ',
			'noaccess'        : '                   ',
			'and'             : '  ',
			'unknown'         : '                ',
			'selectall'       : '                                        ',
			'selectfiles'     : '                     (      )',
			'selectffile'     : '                                    ',
			'selectlfile'     : '                                          ',
			'viewlist'        : '                         ',
			'viewicons'       : '                       ',
			'places'          : '          ',
			'calc'            : '              ', 
			'path'            : '      ',
			'aliasfor'        : '                   ',
			'locked'          : '                ',
			'dim'             : '              ',
			'files'           : '              ',
			'folders'         : '          ',
			'items'           : '                ',
			'yes'             : '    ',
			'no'              : '    ',
			'link'            : '            ',
			'searcresult'     : '                                          ',  
			'selected'        : '                               ',
			'about'           : '    ',
			'shortcuts'       : '                       ',
			'help'            : '          ',
			'webfm'           : '                                   web',
			'ver'             : '            ',
			'protocol'        : '                                    ',
			'homepage'        : '            ',
			'docs'            : '                        ',
			'github'          : '                          Github',
			'twitter'         : '                               Twitter',
			'facebook'        : '                                                   Facebook',
			'team'            : '        ',
			'chiefdev'        : '                                   ',
			'developer'       : '                      ',
			'contributor'     : '                  ',
			'maintainer'      : '                  ',
			'translator'      : '                ',
			'icons'           : '          ',
			'dontforget'      : '                                                                    ',
			'shortcutsof'     : '                                                   ',
			'dropFiles'       : '                                        ',
			'or'              : '      ',
			'selectForUpload' : '                                                   ',
			'moveFiles'       : '                               ',
			'copyFiles'       : '                             ',
			'rmFromPlaces'    : '                                ',
			'untitled folder' : '                                   ',
			'untitled file.txt' : '                      _        .txt',
			'aspectRatio'     : '                  ',
			'scale'           : '          ',
			'width'           : '            ',
			'height'          : '                ',
			'mode'            : '          ',
			'resize'          : '                      ',
			'crop'            : '            ',

			
			/********************************** mimetypes **********************************/
			'kindUnknown'     : '                ',
			'kindFolder'      : '          ',
			'kindAlias'       : '            ',
			'kindAliasBroken' : '                           ',
			// applications
			'kindApp'         : '                    ',
			'kindPostscript'  : 'Postscript                 ',
			'kindMsOffice'    : 'Microsoft Office                 ',
			'kindMsWord'      : 'Microsoft Word                 ',
			'kindMsExcel'     : 'Microsoft Excel                 ',
			'kindMsPP'        : 'Microsoft Powerpoint                       ',
			'kindOO'          : 'Open Office                 ',
			'kindAppFlash'    : 'Flash                     ',
			'kindPDF'         : 'PDF                 ',
			'kindTorrent'     : 'Bittorrent         ',
			'kind7z'          : '7z           ',
			'kindTAR'         : 'TAR           ',
			'kindGZIP'        : 'GZIP           ',
			'kindBZIP'        : 'BZIP           ',
			'kindZIP'         : 'ZIP           ',
			'kindRAR'         : 'RAR           ',
			'kindJAR'         : 'Java JAR         ',
			'kindTTF'         : 'True Type           ',
			'kindOTF'         : 'Open Type           ',
			'kindRPM'         : 'RPM           ',
			// texts
			'kindText'        : '                               ',
			'kindTextPlain'   : '                   ',
			'kindPHP'         : 'PHP                      ',
			'kindCSS'         : 'CSS                                     ',
			'kindHTML'        : 'HTML                 ',
			'kindJS'          : 'Javascript                      ',
			'kindRTF'         : 'RTF                          ',
			'kindC'           : 'C                      ',
			'kindCHeader'     : 'C header                      ',
			'kindCPP'         : 'C++                      ',
			'kindCPPHeader'   : 'C++ header                      ',
			'kindShell'       : 'Unix shell script',
			'kindPython'      : 'Python                      ',
			'kindJava'        : 'Java                      ',
			'kindRuby'        : 'Ruby                      ',
			'kindPerl'        : 'Perl                      ',
			'kindSQL'         : 'SQL                      ',
			'kindXML'         : 'XML                 ',
			'kindAWK'         : 'AWK                      ',
			'kindCSV'         : 'CSV                                                            ',
			'kindDOCBOOK'     : 'Docbook XML                 ',
			// images
			'kindImage'       : '                      ',
			'kindBMP'         : 'BMP                       ',
			'kindJPEG'        : 'JPEG                       ',
			'kindGIF'         : 'GIF                       ',
			'kindPNG'         : 'PNG                       ',
			'kindTIFF'        : 'TIFF                       ',
			'kindTGA'         : 'TGA                       ',
			'kindPSD'         : 'Adobe Photoshop                       ',
			'kindXBITMAP'     : 'X bitmap                       ',
			'kindPXM'         : 'Pixelmator                       ',
			// media
			'kindAudio'       : '                     ',
			'kindAudioMPEG'   : 'MPEG         ',
			'kindAudioMPEG4'  : 'MPEG-4         ',
			'kindAudioMIDI'   : 'MIDI         ',
			'kindAudioOGG'    : 'Ogg Vorbis         ',
			'kindAudioWAV'    : 'WAV         ',
			'AudioPlaylist'   : 'MP3                                       ',
			'kindVideo'       : '                     ',
			'kindVideoDV'     : 'DV         ',
			'kindVideoMPEG'   : 'MPEG         ',
			'kindVideoMPEG4'  : 'MPEG-4         ',
			'kindVideoAVI'    : 'AVI         ',
			'kindVideoMOV'    : 'Quick Time         ',
			'kindVideoWM'     : 'Windows Media         ',
			'kindVideoFlash'  : 'Flash         ',
			'kindVideoMKV'    : 'Matroska         ',
			'kindVideoOGG'    : 'Ogg         '
		}
	}
}
