import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fetchAccessToken = async () => {
    try {
        // Read keys from keys.json
        const keysData = await fs.promises.readFile('./keys.json', 'utf8');
        const { client_id, client_secret } = JSON.parse(keysData);

        // Create authentication options
        const authOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
            },
            body: 'grant_type=client_credentials'
        };

        // Fetch access token
        const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
        if (!response.ok) {
            throw new Error('Failed to obtain access token');
        }

        // Parse response to JSON
        const tokenData = await response.json();

        // Write token data to token.json
        const fileName = `token.json`;
        const filePath = path.join(__dirname, fileName);
        await fs.promises.writeFile(filePath, JSON.stringify(tokenData, null, 4));

        console.log(`Data written to file: ${fileName}`);
    } catch (error) {
        console.error('There was a problem:', error);
    }
};

fetchAccessToken();