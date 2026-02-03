import { ObjectId } from "mongodb"
import { moviesCollection } from "./myMongo.js"
import { format } from "date-and-time"

const getMovies = (res, type, page = 0) => {
    moviesCollection
        .find({
            type: type
        }, {
            limit: 10,
            skip: page,
            sort: { year: -1 }
        })
        .project({
            plot: 1,
            genre: 1,
            runtime: 1,
            title: 1,
            year: 1,
            poster: 1

        })
        .toArray()
        .then(resp => {
            if (!resp)
                resp = { "error": "No data found" }
            else {
                for (let doc of resp) {
                    if (doc.runtime) {
                        let hours = Math.floor(doc.runtime / 60)
                        let minutes = doc.runtime % 60
                        doc.runtime = `${hours} ${hours == 1 ? "hr" : "hrs"} ${minutes} ${minutes == 1 ? "min" : "mins"}`
                    }
                }
            }
            res.status(200).send(resp)
        })

}
// retrieve a single movie by it's ID
const getMovie = (res, movieID) => {
    moviesCollection
        .findOne(
            {_id: new ObjectId(movieID)},
            {
                projection: {
                    fullplot: 1,
                    imdb:{ rating: 1},
                    year: 1,
                    genre:1,
                    title:1,
                    released:1,
                    rating:1,
                    poster:1,
                    cast:1,
                    directors:1
                }
            }
        )
        .then(doc => {
            if (!doc)
                doc = { "error": "no data found" }
            console.log(doc.released)
            if (doc.released){
                doc.released = format(doc.released, "DD, MMMM YYYY")
                console.log(doc.released)
            res.status(200).send(doc)
}})
}
export { getMovies, getMovie }