import express from "express";
const app = express();

app.get('/', (req, res) => {
    const q = req.query;
    res.send(`Ciao, ${q.name}!`);
});

app.get('/another-path', (req, res) => {
    res.send('Ciao on another path!');
})

app.get('/users/:userId', (req, res) => {
    res.send(`The user id is: ${req.params.userId}`);
});

app.get('/math/:op', (req, res) => {            // The first line sets up the GET route for /math/:op, where :op is a placeholder for the operation name. For example, if the URL is /math/add, the op parameter will be "add".

    const x = parseFloat(req.query.x);          // "x" and "y" parameters are extracted from the query and stored in own scope
    const y = parseFloat(req.query.y);

    const {op} = req.params;                    // using destructuring, we get the value of the "op" parameter (req.params would be { op: "add"} for example, and we extract the "op" key as a constant, and we store the value "add")

    const result = op === "add" ? x + y : op === "subtract" ? x - y : op === "multiply" ? x * y : op === "divide" ? x / y : false;      // Using ternary operator, we describe the value, or false if the operation is not recognized

    const resultObject = {                      // This is where we convert the result into a JSON object
        numbers: {
            x: x,
            y: y
        },
        operation: op,
        result: result ? result : `Unrecognizable operation name`
    }

    res.send(resultObject);

});

app.listen(3000, () => {
    console.log(`Open this link in your browser: http://127.0.0.1:3000`);
})