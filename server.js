const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3001;

//config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false})); 

//connect to mongodb
mongoose.connect('mongodb+srv://usermongo:mongouser@cluster0.1wlknj6.mongodb.net/Teacher?retryWrites=true&w=majority');

//data schema
const detailSchema = {
    BName: String,
};

//data model
const Detail = mongoose.model("Detail", detailSchema);

//read route
app.get('/details', (req, res) => {
    Detail.find()
    .then(details => res.json(details))
    .catch(err => res.status(400).json('Error: ' + err))
});

//create route
app.post('/newDetail', (req, res) => {
    const newDetail = new Detail(
        {
        BName: req.body.BName,
        }
    );

    newDetail
    .save()
    .then((detail) => console.log(detail))
    .catch((err) => res.status(400).json("Error " + err));
})

//delete route
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    Detail.findByIdAndDelete({ _id: id }, (req, res, err) => {
        if(!err) {
            console.log("Details Deleted");
        } else {
            console.log(err);
        }
    });  
});

//update route
app.put('/put/:id', (req, res) => {
    const updatedDetail = {
        BName: req.body.BName,
       
    };

    Detail.findByIdAndUpdate(
        {_id: req.params.id},
        { $set: updatedDetail },
        (req, res, err) => {
            if (!err) {
                console.log("Details Updated");
            }
          }
        );
});

app.listen(port, function () {
    console.log("Express is running");
});