require('coffee-script/register');

var accord = require('accord'),
    path = require('path'),
    fs = require('fs');

process.on('message', function(opts){
  var root = opts.root,
      name = opts.name,
      content = opts.content;

  var adapter = accord.load(name, path.join(root, 'node_modules', name));

  var app_coffee_path = path.join(root, 'app');
  if (!fs.existsSync(app_coffee_path)) {
    var options = {}
  } else {
    var options = require(app_coffee_path)[name] || {}
  }

  adapter.render(content, options)
    .done(this.send.bind(this));

});
