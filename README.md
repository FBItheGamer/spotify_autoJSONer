# spotify_autoJSONer
 A project for simplifying Spotify API Calls & Access Token creation.

Dependencies:

1. NodeJS
2. Clone  Repository

Then:

Option 1:
A. run "npm install"

Option 2:
A. run "npm install node-fetch"
B. run "npm install fs"

---

Instructions:

Pre-Requisites:
1. Grab your Spotify API Client ID & Client Secret ID from the Dev Portal
2. Input those into "keys.json"

Then:
1. Open directory in "cmd"
2. run "node tokenCaller.mjs"
3. Edit "apiCaller.mjs" and change "playlistID" to your desired Playlist, the code can be acquired by:
	A. Right click on Playlist
	B. Share
	C. Copy link to Playlist
	D. Example:
https://open.spotify.com/playlist/ <-- IGNORE
1nhbvaSdb0dU6baZCpmHj1 <-- PLAYLIST ID
?si=645541e2160e4ec2 <-- IGNORE

4. run "node apiCaller.mjs"
5. If all is successful you will see a message, please do not close "cmd.exe" until you see "All files written." in the console.

If there are errors, please double check:
A. Playlist  ID
B. Client ID
C. Client  Secret
D. You have all dependencies installed properly to "node_modules"
E. Your Access Token is valid

!! ACCESS TOKENS, are valid only for 1 Hour, please rerun "node tokenCaller.mjs" when your token expires. THIS IS NOT AUTOMATIC.

!! Currently this script only makes Playlist calls, but you've gotten this far into using it you probably should know how to change it out. If not:

A. Simply comment out "const playlistID",
B. Copy and Paste on a new line "const initialUrl" and remove playlists/ and replace with whatever action you wish, also remove + playlistID + '/'. Do not remove the ";" or anything before and including "v1/",
C. Comment out the original "const initialUrl" line if not already.
