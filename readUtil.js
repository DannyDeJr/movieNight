import { moviesCollection } from "./myMongo.js"

const getMovies = (res, type) => {
    moviesCollection
        .find({
            type: type
        }, {
            limit: 10,
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
export { getMovies }