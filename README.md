<div>
    <img src="https://i.imgur.com/0KzG450.png" width="500px" />
</div>

# Virtual Trucker Rich Presence on Discord
## Version 2.5.1 (2.51) FINAL

An easy tool to let others see your current job, truck, etc. using Discord Rich Presence!  

Here's our Discord server for support: https://discord.gg/UwSJjSA  

In different weather or time, your image will change on the rich presence.  
It will change when your turn your lights on/off or wipers on/off.  
ETCARS 0.15  is required for the RPC to work.  

**TruckersMP has their own Rich Presence which needs to be disabled in MP Settings!**
**Due to a few problems with previous ETCARS, you will need to install ETCARS 0.15 from our installer, uncheck it if you have problems during installation and download seperately!**

Supports **Euro Truck Simulator 2**, **American Truck Simulator** and **TruckersMP**.

**Rich presence example on Single Player**

![Rich presence example on Single Player](https://i.imgur.com/3K03uix.png)

**Rich presence example on Multiplayer**

![Rich presence example on Multiplayer](https://i.imgur.com/N94Emxt.png)

On Multiplayer shows server connected and location on the map to the nearest city.

**Rich presence example for ATS**

![Rich presence example on Single Player](https://imgur.com/bQlN1M2.png)

## Use in end user environment

* Install Virtual Trucker Rich Presence using a release installation package from [Releases Page](https://github.com/VirtualTruckerRPC/Virtual-Trucker-Rich-Presence/releases) .

Take a look to [User Guide](UserGuide.md) for further details.

### Why there is a VBScript in this project?

We need `RunHidden.vbs` to run a packaged node.js app windowless in windows. So, the application is launched from that vbscript.

## Logging

Log file `vtrpc.log` is written in:

* Windows: `%appdata%\VirtualTruckingRichPresence\`
* Linux: `/var/local/VirtualTruckingRichPresence/`
* MacOS: `/home/Library/Preferences/VirtualTruckingRichPresence/`

## Startup parameters

* --dev : enable verbose development logging and dev environment behaviour
* --logetcarsdata : prints in console every ETCARS data received
* --logallactivity : prints in console every activity sent to Discord
* --clientConfiguration : specify clientconfiguration.json path

# Credits To Staff
### Current Staff
Rein: Images & several text improvements.   
SgtBreadStick: Coding, text improvements, backgrounds, Logos.  
Josh Menzel: ETCARS plugin, compatibility with ETCARS, future updates.  
dowmeister: ETCARS plugin, coding.  
Ollie: Website Developer, Logos.  
Heyhococo: Testing, Mac Testing.

### Retired Staff
Lasse: Initial project, coding. 