<div>
    <img src="https://i.sgtbrds.tk/js3fxk.png" width="100%" />
</div>

# Virtual Trucker Rich Presence
## Version 2.8.5

# VTRPC NODEJS HAS BEEN DEPRECTATED. PLEASE USE TRUCKY OVERLAY!
## Trucky Overlay Edition
Want to make things even easier? Just install Trucky Overlayat https://truckyapp.com/overlay and VTRPC will be included!

### Important message
Any user found abusing Trucky API with VTRPC will be held accountable for any issues, and will most likely be banned from using Trucky API is the future.
VTRPC is a tool for rich presence and abusing API will not be tolerated!

###  
An easy tool to let others see your current job, truck, etc. using Discord Rich Presence!  
Here's our Discord server for support: https://discord.gg/Zt49WDH  

ETCARS 0.15.386 is required for the RPC to work, older versions will not work.  
THIS VERSION INCLUDES ETCARS 0.15.386, YOU MUST DO A FULL INSTALL FOR THIS TO WORK

## Things to note!
* TruckersMP has their own Rich Presence which needs to be disabled in MP Settings!
* Due to a few problems with previous ETCARS, you will need to install ETCARS 0.15.386 from our installer.
* Promods is only supported on MP or via the developer argument
* IF YOU HAVE ETCARS INSTALLED, PLEASE REINSTALL IT WITH ONE INCLUDED WITH VTRPC!

Supports **Euro Truck Simulator 2**, **American Truck Simulator** and **TruckersMP**.  
**Rich presence example on Single Player**  
![Rich presence example on Single Player](https://i.sgtbrds.tk/2ktsc.png)  
**Rich presence example on Multiplayer**  
![Rich presence example on Multiplayer](https://i.sgtbrds.tk/of86i.png)  

## Changelog
### Update 2.8.5 - URGENT UPDATE
 - Added user-agent to Trucky API requests
 - Increased timer for trucky api requests
 - Updated ETCars download server for installer
 - Fixed many security vulnerabilities and updated packages
 - Now using newer NodeJS LTS version
 - Added Trucky API fallback, if API is having issues the checkers will be stopped
 - New VTRPC logging method added
 - All previous versions of VTRPC will be removed!

## Use in end user environment
* Install Virtual Trucker Rich Presence using a release installation package from [Releases Page](https://github.com/VirtualTruckerRPC/Virtual-Trucker-Rich-Presence/releases) .

Take a look to [User Guide](UserGuide.md) for further details.

## Use in development environment
But here is the most important information:  

REQUIRED PROGRAMS:  
* ETCARS 0.15.386 - https://etcars.jammerxd.com/
* NodeJS - https://nodejs.org/  
* Git - https://git-scm.com

1. Install and download the required programs.   
3. Open cmd/powershell by holding shift while right clicking inside the VTRPC directory.  
4. Install the required node modules by typing "npm i" in PS/CMD.  
5. Start the rich presence by typing "node index.js --dev". (--dev not required but recommended)  
6. Start ETS2/ATS.  
7. Select that and start playing!  

## Prepare for distribution
* Run `npm run compile` .
* Bundled exe will be written in `release` directory.

## Create installation package
* Install InnoSetup 5.6.1 - http://files.jrsoftware.org/is/5/innosetup-5.6.1.exe (YOU WILL NEED INNOSETUP 5!)
* Install Inno Download Plugin - https://bit.ly/2KnepSA
* Open `setup\InnoSetup.iss` with InnoSetup and compile it
* Run `iscc .\setup\InnoSetupScript.iss` (Add to PATH variable env `C:\Program Files (x86)\Inno Setup 5`)
* Installation package will be written in `setup\Output\VirtualTruckerRichPresenceSetup.exe`

### Why is there a VBScript in this project?
We need `RunHidden.vbs` to run a packaged node.js app windowless in windows. So, the application is launched from that vbscript.

## Logging
Log files are written in:
* Windows: `%appdata%\VirtualTruckerRichPresence\`
* Linux: `/var/local/VirtualTruckerRichPresence/`
* MacOS: `/home/Library/Preferences/VirtualTruckerRichPresence/`

## Startup parameters
* --dev : enable verbose development logging and dev environment behaviour
* --promods : enables promods mode, doesn't do much but change images
* --logetcarsdata : prints in console every ETCARS data received
* --logallactivity : prints in console every activity sent to Discord
* --clientConfiguration : specify clientconfiguration.json path


# Credits to everyone who worked on this project
SgtBreadStick: Coding, Images, Guides, Website Developer.  
jammerxd: ETCARS plugin, compatibility with ETCARS.  
dowmeister: ETCARS plugin, coding, Trucky & Trucky API, Trucky Overlay.  
Cody™: Bot Development.  
Lasse: Initial project, coding.  