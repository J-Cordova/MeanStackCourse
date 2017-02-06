
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = 
{
    development:
    {
        db: 'mongodb://localhost/multivision',
        rootPath:rootPath,
        port: process.env.port || 3030
    },
    production:
    {
        db: '//jordan:multivision@ds033096.mlab.com:33096/multivision',
        rootPath:rootPath,
        port: process.env.port || 80
    }
}