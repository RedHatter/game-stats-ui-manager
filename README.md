# Game Stats UI Manager for Deck Loader

Manage the game stats displayed on the app details page. Supports changing order, visibility, and adding a few additional stats.

## Custom stats
* In game
  Displays how many players are currently playing the game according the the steam web API.
* App ID
  Displays steam App ID of the currently selected game.

If there any additinal stats or modifications you would like please do not hesitate to open an issue.

![Screenshot showing the new game stats section](/screenshot.jpg?raw=true)

## Installing manually

Use the following instructions to maunally build and install this plugin.

### Pre-requsites

You will need `make`, `node`, and `pnpm` installed and setup.

### Setup

1. Run `make init`  
   Uses `pnpm` to install the rquired node dependancies and creates a `.env` file.
3. Edit the generated `.env` file with the details of your setup.
4. Run `make build`  
   builds the plugin to `./dist`.
5. Run `make deploy`
   Syncs the plugin files to your steamdeck using the info provided in `.env` and restarts Decky Loader.
