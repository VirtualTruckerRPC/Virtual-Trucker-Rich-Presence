<div>
    <img src="https://i.imgur.com/0wSXSgW.png" width="100%" />
</div>

# Virtual Trucker Rich Presence on Discord
## Version 2.6.1 (2.61)

An easy tool to let others see your current job, truck, etc. using Discord Rich Presence!  

Here's our Discord server for support: https://discord.gg/Zt49WDH  

Your image will change on the rich presence depending if your lights are on.  
ETCARS 0.15  is required for the RPC to work, older versions will not work.  
THIS VERSION INCLUDES ETCARS 0.15, YOU MUST DO A FULL INSTALL FOR THIS TO WORK

## Things to note!

* TruckersMP has their own Rich Presence which needs to be disabled in MP Settings!
* Due to a few problems with previous ETCARS, you will need to install ETCARS 0.15 from our installer.
* Promods isn't supported currently but there are future plans for supporting it.

Supports **Euro Truck Simulator 2**, **American Truck Simulator** and **TruckersMP**.  

**Rich presence example on Single Player**

![Rich presence example on Single Player](https://i.imgur.com/SWMBaXf.png)

**Rich presence example on Multiplayer**

![Rich presence example on Multiplayer](https://i.imgur.com/l5xNkvS.png)

## Changelog
 - Updated Node Packs and NPM
 - Removed Server Player ID and added server users and max slots
 - Removed leftover code
 - Added linqjs for NPM
 - Changed layout (see images above for what it now looks like)
 - Logging has been improved
 - Special Transport compatability
 - Near & In City detection!

## Use in end user environment

* Install Virtual Trucker Rich Presence using a release installation package from [Releases Page](https://github.com/VirtualTruckerRPC/Virtual-Trucker-Rich-Presence/releases) .

Take a look to [User Guide](UserGuide.md) for further details.

## Use in development environment

But here is the most important information:  

REQUIRED PROGRAMS:  

* ETCARS 0.15 - https://etcarsdev.menzelstudios.com/  
* Node.js - https://nodejs.org.  
* Git - https://git-scm.com  

1. Install and download the required programs.   
3. Open cmd/powershell by holding shift while right clicking inside the VT-RPC directory.  
4. Install the required node modules by typing "npm i" in PS/CMD.  
5. Start the rich presence by typing "node index.js".  
6. Start ETS2.  
7. Select that and start playing!  

## Prepare for distribution

**Without custom icon**

* Run `npm run compile` .
* Bundled exe will be written in `release` directory.

**With custom icon**

* Install Python 2.7 to `c:\Python27` - https://www.python.org/ftp/python/2.7.14/python-2.7.14.msi
* Set environment variable `PYTHON` to `c:\Python27\`
* Run `npm run compile --ico` . Nexe will download node.js sources and compile it, first time will take a while. It's necessary to compile node from sources to set custom icon via nexe.
* Bundled exe will be written in `release` directory. 

## Create installation package

* Install InnoSetup - http://www.jrsoftware.org/isdl.php
* Install Inno Download Plugin - https://bit.ly/2KnepSA
* Open `setup\InnoSetup.iss` with InnoSetup and compile it
* Run `iscc .\setup\InnoSetupScript.iss` (Add to PATH variable env `C:\Program Files (x86)\Inno Setup 5`)
* Installation package will be written in `setup\Output\VirtualTruckerRichPresenceSetup.exe`

### Why there is a VBScript in this project?

We need `RunHidden.vbs` to run a packaged node.js app windowless in windows. So, the application is launched from that vbscript.

## Logging

Log file `vtrpc.log` is written in:

* Windows: `%appdata%\VirtualTruckerRichPresence\`
* Linux: `/var/local/VirtualTruckerRichPresence/`
* MacOS: `/home/Library/Preferences/VirtualTruckerRichPresence/`

## Startup parameters

* --dev : enable verbose development logging and dev environment behaviour
* --logetcarsdata : prints in console every ETCARS data received
* --logallactivity : prints in console every activity sent to Discord
* --clientConfiguration : specify clientconfiguration.json path

# Credits To Staff
### Current Staff
dowmeister: ETCARS plugin, coding, Trucky & Trucky API.  
SgtBreadStick: Coding, Images, Website Developer, Breaking Things.  
Josh Menzel (kirito): ETCARS plugin, compatibility with ETCARS.  
Heyhococo: Testing, Mac Testing.

### Retired Staff
Lasse: Initial project, coding. 
Rein: Images.