
const getClientRequest = async (url, httpModule) => {
    return new Promise((resolve, reject) => {

        const request = httpModule.get(url, (resp) => {
            const data = [];
            resp.on('error', (err) => {
                reject(err);
            });
            resp.on('data', (chunk) => data.push(chunk));
            resp.on('end', () => {
                resolve(data.join(''));
            });

        });

        request.on('error', (err) => {
            reject(err);
        });

    })
}
export default getClientRequest