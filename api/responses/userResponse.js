module.exports = function() {
    var req = this.req;
    var res = this.res;

    var viewTemplatePath = 'homepage';
    var statusCode = 200;
    var result = {
        status: statusCode
    };
    res.render(viewTemplatePath);
}