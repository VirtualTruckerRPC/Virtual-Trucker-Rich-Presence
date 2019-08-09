<div>
    <img src="https://i.imgur.com/0wSXSgW.png" width="100%" />
</div>

# Virtual Trucker Rich Presence on Discord
## Version 2.7.5

An easy tool to let others see your current job, truck, etc. using Discord Rich Presence!  

Here's our Discord server for support: https://discord.gg/Zt49WDH  

Your image will change on the rich presence depending if your lights are on.  
ETCARS 0.15.386 is required for the RPC to work, older versions will not work.  
THIS VERSION INCLUDES ETCARS 0.15.386, YOU MUST DO A FULL INSTALL FOR THIS TO WORK

## Things to note!

* TruckersMP has their own Rich Presence which needs to be disabled in MP Settings!
* Due to a few problems with previous ETCARS, you will need to install ETCARS 0.15.386 from our installer.
* Promods isn't supported currently but there are future plans for supporting it.
* IF YOU HAVE ETCARS INSTALLED, PLEASE REINSTALL IT WITH ONE INCLUDED WITH VT-RPC!

Supports **Euro Truck Simulator 2**, **American Truck Simulator** and **TruckersMP**.  

**Rich presence example on Single Player**

![Rich presence example on Single Player](https://i.sgtbrds.tk/2ktsc.png)

**Rich presence example on Multiplayer**

![Rich presence example on Multiplayer](https://i.sgtbrds.tk/of86i.png)

## Changelog
### Updated 2.7.0
 - Updated Node Packs and NPM
 - Removed Server Player ID and added server users and max slots
 - Removed leftover code
 - Changed layout (see images above for what it now looks like)
 - Logging has been improved
 - Special Transport compatability
 - Near & In City detection! (Thanks to dowmeister)
 - Updated included ETCars 0.15.386 (prev. 0.15)
 - ETCars is now installed from web once again.
 - Revamped installer!
#### ================================================================
### Update 2.7.1 / 2.7.2
 - Bug Fixes
 - Old VT-RPC & ETCars directories deleted on install
 - Forced ETCars installation
 - Other changes
 - Fixed update checker
#### ================================================================
### Update 2.7.3
 - Fixed location tracker
 - Updated the images 🎉
 - Instantly checks location on dev argument
 - RunHidden doesnt run as dev on each startup
#### ================================================================
### Update 2.7.4
 - Updated NPM to version 6.10.3
 - Changed Loading Game icon
 - Update Notification has changed slightly
 - New update notification sound
 - Pre-release versions no longer cause notification
 - Shows default ETS2 Image on game loading
 - Updated Generic Truck image
 #### ================================================================
 ### Update 2.7.5
 - Removed "Delivering from" text to match new style
 - Removed Cargo name from large image text
 - Added TMP player ID (with prefix if any) to large image text
 - Fixed update notification
 - Added timestamp to show how long you've played ETS2/ATS

## Use in end user environment

* Install Virtual Trucker Rich Presence using a release installation package from [Releases Page](https://github.com/VirtualTruckerRPC/Virtual-Trucker-Rich-Presence/releases) .

Take a look to [User Guide](UserGuide.md) for further details.

## Use in development environment

But here is the most important information:  

REQUIRED PROGRAMS:  

* ETCARS 0.15.386 - https://etcars.menzelstudios.com/  
* Node.js - https://nodejs.org.  
* Git - https://git-scm.com  

1. Install and download the required programs.   
3. Open cmd/powershell by holding shift while right clicking inside the VT-RPC directory.  
4. Install the required node modules by typing "npm i" in PS/CMD.  
5. Start the rich presence by typing "node index.js --dev". (--dev not required but recommended)  
6. Start ETS2/ATS.  
7. Select that and start playing!  

## Prepare for distribution

* Run `npm run compile` .
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
SgtBreadStick: Coding, Images, Website Developer.  
Josh Menzel (jammerxd): ETCARS plugin, compatibility with ETCARS.  
Heyhococo: Testing, Mac Testing.  
Minion_Josh: Testing.

### Retired Staff
Lasse: Initial project, coding. 
Rein: Images.