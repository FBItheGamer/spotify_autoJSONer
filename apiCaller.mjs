// Import required modules
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the Spotify playlist endpoint URL
const playlistID = '4Is8KvZDZyj6ypEOENGybC' // Update as needed for API calls
const initialUrl = 'https://api.spotify.com/v1/playlists/' + playlistID + '/'; // Initial URL for the first API call

// Fetch the access token from token.json
const readAccessToken = async () => {
    try {
        // Read token.json file
        const tokenData = await fs.promises.readFile('./token.json', 'utf8');
        
        // Parse token data to JSON
        const { access_token } = JSON.parse(tokenData);
        
        console.log('Access Token:', access_token);
        
        // Define the request options including the Authorization header with the access token
        const requestOptions = {
            method: 'GET', // This is a GET request to retrieve playlist information
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        };

        let fileCounter = 1; // Counter for JSON files

        // Define the fetchPlaylistData function inside an async function
        async function start() {
            try {
                // Call fetchPlaylistData function
                await fetchPlaylistData(initialUrl);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        start();

        // Function to fetch playlist data
        async function fetchPlaylistData(url) {
            try {
                // Send the request using the Fetch API
                const response = await fetch(url, requestOptions);
                if (!response.ok) {
                    const errorMessage = `Network response was not ok (${response.status} ${response.statusText})`;
                    throw new Error(errorMessage);
                }
                const data = await response.json();

                // Handle the playlist data returned from the Spotify API
                console.log('Playlist Data:', data);

                const outputFolder = 'output'; // Specify the name of the output folder

                // Create the output folder if it doesn't exist
                const outputFolderPath = path.join(__dirname, outputFolder);
                if (!fs.existsSync(outputFolderPath)) {
                    fs.mkdirSync(outputFolderPath);
                }
                
                // Write data to a JSON file inside the output folder
                const fileName = `return_data.${String(fileCounter).padStart(3, '0')}.json`;
                const filePath = path.join(outputFolderPath, fileName);
                fs.writeFile(filePath, JSON.stringify(data, null, 4), err => {
                    if (err) {
                        console.error('Error writing to file:', err);
                    } else {
                        console.log(`Data written to file: ${fileName}`);
                        fileCounter++;
                    }
                });

                // Check if it's the first call or subsequent calls
                if (data.next === null) {
                    console.log('All files written');
                } else if (url === initialUrl && data.tracks.next) {
                    // If it's the first call and 'next' URL exists in 'data.tracks', wait for 30 seconds before making the next API call
                    setTimeout(() => {
                        fetchPlaylistData(data.tracks.next); // Make the next API call
                        console.log('Awaiting next call...');
                    }, 30000); // 30 seconds
                } else if (data.next) {
                    // If it's a subsequent call and 'next' URL exists, wait for 30 seconds before making the next API call
                    setTimeout(() => {
                        fetchPlaylistData(data.next); // Make the next API call
                        console.log('Awaiting next call...');
                    }, 30000); // 30 seconds
                }

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }
            } catch (error) {
                console.error('Error reading access token:', error);
            }
        };

readAccessToken();