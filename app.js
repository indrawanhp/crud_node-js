const express = require('express');
const app = express();

const db = require("./config/db");
const user = require('./models/user');

app.get('/', (req,res) => res.send('Respon Nodejs berhasil'));

app.use(express.urlencoded({extended: true}));

db.authenticate().then(() => 
    console.log("Berhasil terkoneksi dengan database")
);

const User = require("./models/user");

app.post('/crud', async (req, res) => {
    try {
        const { username , email , password } = req.body;

        const newUser = new User({
            username, email, password
        })

        await newUser.save();

        res.json(newUser);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
})

app.get('/crud', async (req,res) => {
    try {
        const getAllUser = await User.findAll({})

        res.json(getAllUser)
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
})

app.get('/crud/:id', async (req,res) => {
    try {
        const id = req.params.id

        const getUser = await User.findOne({
            where: {id : id}
        });

        res.json(getUser);
    }catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
})
app.delete('/crud/:id', async (req, res) => {
    try {
        const id = req.params.id

        const deleteUser = await User.destroy({
            where: { id : id }
        })

        await deleteUser;
        res.json('Berhasil di hapus')
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
})
app.put('/update/:id', async (req,res) => {
    try {
        const {username, email, password } = req.body
        const id = req.params.id

        const updateUser = await User.update({
            username, email, password
        }, {where : {id:id}})
        
        await updateUser;

        res.json('berhasil di update');
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
})
app.listen(5000, () => console.log('Port berjalan di 5000'));