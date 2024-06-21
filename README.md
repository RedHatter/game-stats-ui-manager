# Players In Game for Deck Loader

Adds a info panel to the game page displaying how many players are currently in game. This info is pulled directly from the steam web API.

![Screenshot show new info panel](/relative/path/to/img.jpg?raw=true)

## Installing manually

Use the following instructions to maunally build and install this plugin.

### Pre-requsites

You will need `make`, `node`, and `pnpm` installed and setup.

### Setup

1. Run `make init` this will use `pnpm` to install the rquired node dependancies and create a `.env` file.
2. Edit the generated `.env` file with the details of your setup.
3. Run `make build` this will bundle all the code and generate the nessesary files in `./dist`.
4. Run `make deploy` this will sync the plugin files to your steamdeck using the information provided in `.env` and restart Decky Loader.
