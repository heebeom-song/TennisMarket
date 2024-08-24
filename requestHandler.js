const fs = require('fs'); //file sync
const main_view = fs.readFileSync("./main.html");
const orderlist_view = fs.readFileSync("./orderlist.html");

const mariadb = require('./database/connect/mariadb');

function main(response){
    console.log('main');

    mariadb.query("SELECT * FROM product", function(err, rows){
        console.log(rows);
    })

    response.writeHead(200, {'content-Type' : 'text/html'});
    response.write(main_view);
    response.end();
}

function blueRacket(response){
    fs.readFile('./img/blueRacket.png', function(err, data){
        response.writeHead(200, {'content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

function blackRacket(response){
    fs.readFile('./img/blackRacket.png', function(err, data){
        response.writeHead(200, {'content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

function redRacket(response){
    fs.readFile('./img/redRacket.png', function(err, data){
        response.writeHead(200, {'content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

function order(response, productId){
    response.writeHead(200, {'content-Type' : 'text/html'});
    mariadb.query("INSERT INTO orderlist VALUES ("+productId+", '"+new Date().toLocaleDateString()+"')", function(err, rows){
        console.log(rows);
    })
    response.write(main_view);
    response.end();
}

function orderlist(response){
    response.writeHead(200, {'content-Type' : 'text/html'});
    mariadb.query("SELECT * FROM orderlist", function(err, rows){
        response.write(orderlist_view);

        rows.forEach(element => {
            response.write("<tr>"
                            +"<td>"+element.product_id+"</td>"
                            +"<td>"+element.order_date+"</td>"
                            +"</tr>");
            
        });

        response.write("</table>");
        response.end();
    })
}



function plz_put_icon(){
    console.log('favicon 좀 넣어주세용!');
}

let handle = {}; // dictionary 선언
handle['/'] = main;
handle['/favicon.ico'] = plz_put_icon;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

//image directory
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;