import { moviesCollection } from "./myMongo.js"


const getMovies = (res) => {
    moviesCollection.find({},{limit:10}).toArray()
    .then(resp => {
        if(!resp)
        resp = {"error": "No data found"}
        res.status(200).send(resp)
    })

}
export {getMovies}