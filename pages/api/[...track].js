import { getLyrics } from "lyrics-dumper"

export default async function handler(req, res) {
    const { track } = req.query
    // console.log(track)
    if (track.length === 2) {
        await getLyrics(`${decodeURIComponent(track[0])} ${decodeURIComponent(track[1])}`).then(l => {
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            // console.log(l)
            res.end(JSON.stringify(l))
        }).catch(err => {
            res.statusCode = 404
            // console.log(err)
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ error: 'Lyrics NotFound' })) 
        }) 
    } else {
        res.status(400).json({error: 'Invalid Parameters, You need to provide 2 parameters: track name and artist name.'})
    }
}