<div>
    <img src="https://i.sgtbrds.tk/js3fxk.png" width="100%" />
</div>

# Virtual Trucker Rich Presence
## Version 2.8.1

An easy tool to let others see your current job, truck, etc. using Discord Rich Presence!  
Here's our Discord server for support: https://discord.gg/Zt49WDH  

ETCARS 0.15.386 is required for the RPC to work, older versions will not work.  
THIS VERSION INCLUDES ETCARS 0.15.386, YOU MUST DO A FULL INSTALL FOR THIS TO WORK

## Things to note!
* TruckersMP has their own Rich Presence which needs to be disabled in MP Settings!
* Due to a few problems with previous ETCARS, you will need to install ETCARS 0.15.386 from our installer.
* Promods is only supported on MP or via the developer argument
* IF YOU HAVE ETCARS INSTALLED, PLEASE REINSTALL IT WITH ONE INCLUDED WITH VT-RPC!

Supports **Euro Truck Simulator 2**, **American Truck Simulator** and **TruckersMP**.  
**Rich presence example on Single Player**  
![Rich presence example on Single Player](https://i.sgtbrds.tk/2ktsc.png)  
**Rich presence example on Multiplayer**  
![Rich presence example on Multiplayer](https://i.sgtbrds.tk/of86i.png)  

## Changelog
### Update 2.8.1
 - No longer shows generic truck icon when game is loading
 - Better game loading detection and status (code)
 - Updated node packages
 - Now using NodeJS version 12.13.0
 - Removed Speed & Server Stats
 - Removed " | ProMods" text
 - Removed MP Server Stats Checker
 - Removed Job Income from Large Image Hover
 - Removed Night image(s) due to technical issues
 - Moved most of code to prevent issues
 - Removed un-needed functions
 - Removed un-needed node packages

## Known Issues:
 - Memory leaking (Highly rare)
 - VT-RPC crashing randomly (reboot vtrpc)
 - VT-RPC status freezing on discord (reboot vtrpc)
 - After a while of being in-game, VT-RPC info may be delayed on discord

## Use in end user environment
* Install Virtual Trucker Rich Presence using a release installation package from [Releases Page](https://github.com/VirtualTruckerRPC/Virtual-Trucker-Rich-Presence/releases) .

Take a look to [User Guide](UserGuide.md) for further details.

## Use in development environment
But here is the most important information:  

REQUIRED PROGRAMS:  
* ETCARS 0.15.386 - https://etcars.menzelstudios.com/
* NodeJS 10.9.0 - https://nodejs.org/download/release/v10.9.0/node-v10.9.0-x64.msi  
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
* Install InnoSetup 5.6.1 - http://files.jrsoftware.org/is/5/innosetup-5.6.1.exe (YOU WILL NEED INNOSETUP 5!)
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

## Startup parameters & Auto Run Scripts
### Auto Run Scripts
This is for those who just want to run it with 1 click. All scripts are located in "auto run scripts" folder  
* Run as dev : Runs with --dev argument
* Run as standard : Runs as standard application
* Run with ETCars data : Runs with --logetcarsdata argument (Testing purposes)
* Run with Discord data : Runs with --logallactivity argument (Testing purposes)
* Run with ProMods mode : Runs with --promods & --dev arguments (Testing purposes)
#### IF YOU HAPPEN TO RUN INTO ISSUES OR IT RANDOMLY CLOSES THE WINDOW, RUN MANUAL WITH ARGUMENTS!

### Manual Startup Arguments
* --dev : enable verbose development logging and dev environment behaviour
* --promods : enables promods mode, doesn't do much but change images
* --logetcarsdata : prints in console every ETCARS data received
* --logallactivity : prints in console every activity sent to Discord
* --clientConfiguration : specify clientconfiguration.json path


# Credits To Staff
### Current Staff
SgtBreadStick: Coding, Images, Guides, Website Developer.  
jammerxd: ETCARS plugin, compatibility with ETCARS.  
Cody™: Bot Development.  
Heyhococo: Testing, Mac Testing.  
Minion_Josh: Testing.

### Retired Staff
Lasse: Initial project, coding.  
dowmeister: ETCARS plugin, coding, Trucky & Trucky API. 
Rein: Previous Images.