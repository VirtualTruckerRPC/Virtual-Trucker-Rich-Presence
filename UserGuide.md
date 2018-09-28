# User guide

## Download

Download latest installer from [Releases Page](https://github.com/VirtualTruckerRPC/Virtual-Trucker-Rich-Presence/releases) .

## Installation on Windows

Run VirtualTruckingPresenceSetup.exe

### Select components

Select components to be installed, Virtual Trucker Rich Presence is mandatory, you can choose if download ETCARS or not. 
ETCARS is mandatory for the operation of Virtual Trucker Rich Presence. If it is already installed on your computer, you can also avoid downloading it.
If you choose to install ETCARS, ETCARS latest version installer will be downloaded automatically and installed at the end of this installation.

![Select components](https://imgur.com/DKzDjtv.png)

## Additional tasks and configuration

You can choose if you want to start Virtual Trucker Rich Presence at windows startup, is highly recommended.
Furthermore, you can choose to use Miles as distance measurement unit, default is Kilometres. ETCARS (like others Telemetry Plugin on ETS2 and ATS send data in kilometres, so Virtual Trucker Rich Presence will convert them to Miles)

![Additional Tasks](https://imgur.com/H0jODVS.png)

## Confirm tasks and configuration

Confirm your choices.

![Summary](https://imgur.com/RQ3GPQ0.png)

## Downloading ETCARS

Wait for ETCARS download, if you selected it.

![Download ETCARS](https://imgur.com/dBOaEE3.png)

## Close running Virtual Trucker Rich Presence

If you are updating to a newer version of Virtual Trucker Rich Presence, installer will ask if can kill running version to update it.

![Kill existing](https://imgur.com/Vjaqtni.png)

## Installation completed

Installation is completed. If you selected to install ETCARS leaving the check on, ETCARS installation will start automatically. 
You can choose if start Virtual Trucker Rich Presence immediately, installer will do it for you.

![Final step](https://imgur.com/BhVbCdJ.png)

Virtual Trucker Rich Presence will be installed in `C:\Program Files (x86)\Virtual Trucker Rich Presence\` .
Log file can be found in:

* Windows: `%appdata%\VirtualTruckingRichPresence\`
* Linux: `/var/local/VirtualTruckingRichPresence/`
* MacOS: `/home/Library/Preferences/VirtualTruckingRichPresence/`

## Check if Virtual Trucker Rich Presence works

If the installation was successful, ETCARS has been installed correctly, with Discord open, launches ETS2 or ATS, upload your profile and start driving.
In discord your profile should look like this:

![Rich presence](https://imgur.com/9HMV4cS.png)

And outside, view from another user:

![Rich presence](https://imgur.com/Za4ZMCD.png)

![Rich presence](https://imgur.com/L7fxGyI.png)

# Customize your Rich Presence

Virtual Trucker Rich Presence comes with a client configuration file called clientconfiguration.json, a json file containing configuration variables

```json
{
    "configuration": {
        "distanceUnit": "km",
    }
}
```
* distanceUnit : possibile values are `km` for Kilometres and `m` for Miles. It's already configured by the installer.

# Run VTRPC manually

Run `RunHidden.vbs` from installation directory or start menu/screen. Avoid to run directly the exe.

# Reboot VTRPC

Run `RebootVTRPC.bat` from installation directory or start menu/screen.

# Troubleshooting

## Can't download ETCARS from installer

On Windows 7 you could encounter an error during ETCARS download from VTRPC installer. If this happens, download and install ETCARS separately from [ETCARS official site](https://myalpha.menzelstudios.com/) . Then restart VT-RPC installer without download and install ETCARS.

## My Rich Presence isn't updating

1) Check if VirtualTruckerRichPresence.exe is running.

Open Task Manager > Tab "Details" > Search for "VirtualTruckerRichPresence.exe"

![Task manager](https://imgur.com/F34Mt1f.png)

2) Check if ETCARS is installed correctly

When you open ETS2 or ATS, you will be prompt for accepting SDK modifications
You can also check the console in ETS2 or ATS for ETCARS messages

![](https://imgur.com/eMvJM1x.png)

3) With both VTRPC and game running, check the log file in %appdata%\VirtualTruckerRichPresence, vtprc.log , you should see something like this:

```
2018-04-30T12:49:36.359Z - INFO - Rich Presence plugin starting
2018-04-30T12:49:36.359Z - INFO - Version: 2.0.4
2018-04-30T12:49:36.359Z - INFO - Platform: win32
2018-04-30T12:49:36.359Z - INFO - Startup parameters:
2018-04-30T12:49:36.359Z - INFO - {"_":[],"help":false,"version":false,"clientConfiguration":"C:\\Program Files (x86)\\Virtual Trucker Rich Presence\\clientconfiguration.json","$0":"C:\\Program Files (x86)\\Virtual Trucker Rich Presence\\VirtualTruckerRichPresence.exe E:\\Progetti\\etcars\\Virtual-Trucker-Rich-Presence\\index.js"}
2018-04-30T12:49:36.431Z - INFO - {"configuration":{"distanceUnit":"km"}}
2018-04-30T12:49:36.431Z - INFO - Client configuration:
2018-04-30T16:18:04.144Z - INFO - Connected to ETCARS
2018-04-30T16:18:04.387Z - INFO - Game detected: ETS2
2018-04-30T16:18:04.388Z - INFO - Using Discord Application ID 426512878108016647
2018-04-30T16:18:04.529Z - INFO - Discord RPC ready
```

`Connected to ETCARS`, `Game detected: ETS2` and `Discord RPC ready` are the most important lines. If you see these lines, VTRPC is running fine and it's working. 
If you don't see these log lines, something is not working with ETCARS.

4) Check if Rich presence is enabled in your Discord client. Go to Discord client options > Games and check if it's like this below

![](https://imgur.com/LeTig3K.png)

Your game activity settings should seems like this:

![](https://imgur.com/PGRbpgV.png)
