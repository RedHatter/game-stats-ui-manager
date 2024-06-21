# Players In Game for Deck Loader

Adds a info panel to the game page displaying how many players are currently in game. This info is pulled directly from the steam web API.

![Screenshot show new info panel](/screenshot.jpg?raw=true)

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
