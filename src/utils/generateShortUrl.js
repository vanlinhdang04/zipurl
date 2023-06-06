
import crypto from 'crypto'

export function generateShortUrl(url) {
    // Generate a hash of the URL using MD5
    const hash = crypto.createHash('md5').update(url).digest('hex');

    // Take the first 8 characters of the hash
    const shortHash = hash.substr(0, 8);

    // Encode the short hash using base64 encoding
    const encodedHash = Buffer.from(shortHash, 'hex').toString('base64');

    // Remove any special characters from the encoded hash
    const shortUrl = encodedHash.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    return shortUrl
}