let source = $('#entry-template').html();
let template = Handlebars.compile(source);
var context = { title: "My New Post", body: "This is my first post!" };
var html = template(context);

$('main').append(html);