' VIRTUAL TRUCKER RICH PRESENCE 2.71
scriptdir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
Set shell = CreateObject("Wscript.Shell")
shell.CurrentDirectory = scriptdir
shell.Run """" & scriptdir & "\VirtualTruckerRichPresence.exe" & " ""--dev""" & " ""--clientConfiguration=""" & scriptdir & "\clientconfiguration.json""", 0, False