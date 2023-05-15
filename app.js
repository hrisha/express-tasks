const express = require('express')
const app = express()
const port = 3000

///////// 1- Simple Array of Todos:
var todos = [];

for (let i= 1;i<6;i++) {
    todos.push({
        id: i,
        title : "Todo "+i,
        description : "This is Todo" + i,
        status : i%2 == 1 ? "In Progress":"Done"
    });
}

function getRandomIndex() {
    return Math.floor(Math.random() * todos.length);
}


//// 2-  Implement GET and DELETE Endpoints & 3- Utilize HTTP Status Codes

app.get('/getTodos', (req, res) => {
    res.status(200);
    res.send(JSON.stringify(todos));
});

app.delete('/todo', (req, res) => {
    let result;
    if (todos.length === 0) {
        result = "No todos to Delete!";
        res.status(422).send(result);
        //res.status(422);
    } else {
        result = "Deleted todo :" + JSON.stringify(todos.splice(getRandomIndex(), 1));
        //res.status(204);
        res.status(204).json(result);
    }
    res.send(result);
});

//// 4 - Serve Static Files Endpoint

app.use('/public',express.static('public'));
// use this link to see the html page : http://localhost:3000/public/showImage.html

// GET /todos: List all todos
app.get('/todos', (req, res) => {
    res.status(200);
    res.send(JSON.stringify(todos));
});

//GET /todos/:id: Show a single todo.
app.get('/todo/id/:id', (req, res) => {
    const todoId = req.params.id;
    var result;
    if (todoId) {
        result = JSON.stringify(todos.find(x=> x.id == todoId));
        if(!result) {
            result = 'No todo with this id.';
        }
    } else {
        result = 'No id provided.';
    }
    
    res.status(200).send(result);
});

// DELETE /todos/:id: Delete a single todo.
app.delete('/todo/id/:id', (req, res) => {
    const todoId = req.params.id;
    let result;

    if (todos.length === 0) {
        result = "No todos to Delete!";
        res.status(422).send(result);
    } else {
        if (todoId) {
            let index = todos.findIndex(x=> x.id == todoId);
            if (index ==-1) {
                result = 'No todo with this id.';
            } else {
                result = "Deleted todo :" + JSON.stringify(todos.splice(index, 1));
            }
        } else {
            result = 'No id provided.';
        }
    }
    res.send(result);
});

// POST /todos/:id: Create a single todo.



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});