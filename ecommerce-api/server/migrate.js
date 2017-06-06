app = require('./server')

var dataSource = app.dataSources.ecommerceDS;

dataSource.automigrate('User', function(err) {
  if (err) throw err;  

  console.log('-- User table created');  
});  

dataSource.automigrate('AccessToken', function(err) {
  if (err) throw err;    

  console.log('-- AccessToken table created');    
});

dataSource.automigrate('ACL', function(err) {
    if (err) throw err;    

    console.log('-- ACL table created');                   
});

dataSource.automigrate('RoleMapping', function(err) {
    if (err) throw err;    

    console.log('-- RoleMapping table created');            
}); 

dataSource.automigrate('Role', function(err) {
    if (err) throw err;    

    console.log('-- Role table created');
});

dataSource.automigrate('Customer', function(err) {
    if (err) throw err;    

    console.log('-- Customer table created');
});

dataSource.automigrate('Order', function(err) {
    if (err) throw err;    

    console.log('-- Order table created');
});

dataSource.automigrate('OrderItem', function(err) {
    if (err) throw err;    

    console.log('-- OrderItem table created');
});

dataSource.automigrate('Product', function(err) {
    if (err) throw err;    

    console.log('-- Product table created');
});

dataSource.automigrate('StoredProduct', function(err) {
    if (err) throw err;    

    console.log('-- StoredProduct table created');
});

dataSource.automigrate('ProductReview', function(err) {
    if (err) throw err;    

    console.log('-- ProductReview table created');
});

dataSource.automigrate('ProductImage', function(err) {
    if (err) throw err;    

    console.log('-- ProductImage table created');
});