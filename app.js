import express from 'express';
import path from 'path';
import expressLayouts from 'express-layouts';
import { router } from './routes/routes.js';
import apiRouter from './routes/apiRoutes.js';

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}` );
    next();
});


app.use('/', router);

app.use('/api', apiRouter);

app.use((req, res) => {
    res.status(404).send("Error");
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});