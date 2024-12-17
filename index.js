const express = require("express")
const cors = require("cors")
const port = 3000;
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("public"))
let bookmarks = [{
    id: 1,
    url: "http://localhost:3000/book",
    type: "my-site",
}]
let currentId = 1
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/bookmarks", function (req, res) {
    res.send(bookmarks);
})

app.post("/bookmarks", function (req, res) {


    try {
        const url = req.body.url
        const type = req.body.type

        if(!type || !url){
            return res.status(400).send({
                error:"Please Give the Url and type"
            })
        }
        else{
            const newBookmark = {
                id:currentId++,
                url:url,
                type:type
            }
            bookmarks.push(newBookmark);

            return res.status(200).json(newBookmark)
        }
    } catch (error) {
        return res.status(500).send({
            error:"An error ocuered while adding bookmark"
        })
    }
})

app.delete("/bookmarks/:id",function(req,res){

try {
        const id = req.params.id

        if(!id){
            return res.status(400).send({
                error:"The todo id was not found"
            })
        }
        else{
            const currentBookmark = bookmarks.findIndex(b=>b.id===id)
            if(currentBookmark===-1)
            {
                return res.send("Bookmark was not found")
            }else{
                bookmarks.splice(currentBookmark,1)
                return res.status(200).send({
                    message:"The bookmark was deleted"
                })
            }
            
        }
} catch (error) {
    return res.status(400).send({
        error:"Error while deleting"
    })
}
})
app.listen(port, () => {
    console.log(`The Server was running in port ${port}`)
})