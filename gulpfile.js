var fs = require("fs"),
    path = require("path");

var myTasks = fs.readdirSync("./gulp-tasks/").filter(function(name) {
    return /(\.(js)$)/i.test(path.extname(name));
});

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

myTasks.forEach(function(task) {
    require("./gulp-tasks/" + task);
});
