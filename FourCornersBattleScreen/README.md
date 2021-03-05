# Four Corners Battle Screen
This plugin creates a battle look similar to the game Omori. The actor portraits are drawn in each corner of the screen.
I recommend first person battles, as space can get tight. [Click here for the plugin](https://github.com/Zami77/RPG_Maker_MZ_Plugins/blob/main/FourCornersBattleScreen/FourCornersBattleScreen.js)

## Features
* Dictate which actor is drawn in which location
* Can have 1-4 actors
* Battle log will adjust position if top layer is open

## Screenshots
### Default layout
<img src="Default 4 person battle.png" width="400" height="300"></img>
### Battle Log with four Person Party
<img src="BattleLog with 4 person party.png" width="400" height="300"></img>
### Battle Log with two Person Party
<img src="BattleLog with 2 person party.png" width="400" height="300"></img>
### Diagonal Layout
<img src="Diagonal layout.png" width="400" height="300"></img>


## How to use
The only user action necesarry is to put the correct actor id into each of the parameters, it defaults to <br>
| Position     | Actor ID |
|--------------|----------|
| Bottom Left  | 1        |
| Bottom Right | 2        |
| Upper Right  | 3        |
| Upper Left   | 4        |

Putting the same actor id for multiple positions will get undesired results. The plugin will function fine if a number is passed as a parameter
but the actor does not exist. You can also place actors in any assortment of setups i.e. actor in bottom left and upper right only.

NOTE: The default project for RPMZ does NOT have actors 1-4, so you will have to adjust.

## Plugin Commands
There are none for this plugin.

## Download
Download off of this [github repo](https://github.com/Zami77/RPG_Maker_MZ_Plugins/blob/main/FourCornersBattleScreen/FourCornersBattleScreen.js)


