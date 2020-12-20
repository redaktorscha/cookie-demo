import cors from './CORS.js';
import contentType from './contentType.js';

const finalHandler = (e, r, rs, n) => {
    rs.status(e.status).set({
        ...contentType,
        ...cors
    }).send(`Error: ${rs.statusCode}`)
};
export default finalHandler;