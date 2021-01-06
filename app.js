export default (express, bodyParser, createReadStream, writeFileSync, crypto, http, cors, getClientRequest, finalHandler, contentType) => {

    const {
        LOGINNAME
    } = process.env;

    const app = express();

    app
        .use((req, res, next) => {
            res
                .status(200)
                .set({
                    ...contentType,
                    ...cors
                });
            next();
        })

        .use(bodyParser.urlencoded({
            extended: true
        }))
        .use(bodyParser.json())

        .get('/login/', r => {
            r.res.send(LOGINNAME || 'mariianasonkina');
        })

        .get('/hello/', r => {
            r.res.send('hello');
        })

        .get('/code/', r => {
            createReadStream(
                import.meta.url.substring(7)).pipe(r.res);
        })

        // .get('/sha1/:input', r => {
        //     const hash = crypto.createHash('sha1').update(r.params.input).digest('hex');
        //     r.res.send(hash);
        // })

        .all('/req/', async (req, res) => {
            const address = req.method === 'GET' ? req.query.addr : req.body.addr;

            if (address) {
                try {
                    const clientResponse = await getClientRequest(address, http).catch((err) => {
                        throw new Error(err);
                    });
                    return res.send(clientResponse);

                } catch (err) {
                    return res.send('not ok');
                }
            }
            return res.send(`I'm terribly sorry, could not get addr`);
        })

        .all('/render/', async (req, res) => {
            const { random2, random3 } = req.body;
            const address2 = req.query.addr;
            res.locals.random2 = random2;
            res.locals.random3 = random3;

            if (address2 && random2 && random3) {
                try {
                    const pugTemplate = await getClientRequest(address2, http).catch((err) => {
                        throw new Error(err);
                    });
                                       
                    writeFileSync('./views/template.pug', pugTemplate);
                    
                    return res.render('template', { random2, random3 });

                } catch (err) {
                    return res.send('not ok');
                }
            } else {
                res.send('sorry, no data provided');
            }
           
        })

        .all(/./, r => r.res.send(LOGINNAME || 'mariianasonkina'))

        .use(finalHandler)

        .set('view engine', 'pug');


    return app;
}