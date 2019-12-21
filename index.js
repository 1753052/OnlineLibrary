let express = require('express');
let app = express();

//Set public static folder
app.use(express.static(__dirname + '/public'));

//Use view engine
let expressHbs = require('express-handlebars');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//Define your routes here 
app.get('/', require('./router/indexRouter'));

app.use('/books',require('./router/bookRouter'));

app.get('/sync', (req, res) =>{
    let models = require('./models');
    models.sequelize.sync()
    .then(() =>{
       res.send('database sync completed') 
    });
});

app.get('/:page', (req, res) => {
    let banners = {
        giohang: 'Giỏ hàng',
        search: 'Search',
        gioithieutruong: 'Giới thiệu trường',
        bookdetail: 'Book detail',

    }
    let page = req.params.page;
    res.render(page, {banner: banners[page]});
});

//Set server port & start server
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
    console.log(`Server is running at port ${app.get('port')}`);
});