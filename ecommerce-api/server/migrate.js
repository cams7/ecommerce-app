'use strict';

var async = require('async');
var app = require('./server');

var dataSource = app.dataSources.ecommerceDS;

//create all models
async.parallel({
    users: async.apply(createUsers),
    roles: async.apply(createRoles),
    acls: async.apply(createACLs)
}, function(err, results) {
    if (err) throw err;

    createAccessTokens(results.users, function(err) {
      console.log('> AccessToken model created sucessfully');
    });

    createRoleMappings(results.roles, function(err) {
      console.log('> RoleMapping model created sucessfully');
    });
    
    async.parallel({
        customers: async.apply(createCustomers, results.users),
        products: async.apply(createProducts)
    }, function(err, results) {
        if (err) throw err;

        createProductReviews(results.customers, results.products, function(err) {
            console.log('> ProductReview model created sucessfully');
        });

        createProductImages(results.products, function(err) {
            console.log('> ProductImage model created sucessfully');
        });
        
        async.parallel({
            orders: async.apply(createOrders, results.customers),
            storeds: async.apply(createStoredProducts, results.products)            
        }, function(err, results) {
            if (err) throw err;
            
            createOrderItems(results.orders, results.storeds, function(err) {
                console.log('> OrderItem model created sucessfully');
            });
        });
    });
});

//Create Users
function createUsers(cb) {
    dataSource.automigrate('User', function(err) {
        if (err) return cb(err);

        console.log('-- user table created');

        var User = app.models.User;
        User.create([
        {
            username: 'jose',
            email: 'jose@ecommerce.test',
            password: '12345'
        },
        {
            username: 'maria',
            email: 'maria@ecommerce.test',
            password: '12345'
        },
        {
            username: 'ana',
            email: 'ana@ecommerce.test',
            password: '12345'
        }], cb);
    });
}

//Create Roles
function createRoles(cb) {
    dataSource.automigrate('Role', function(err) {
        if (err) throw err;    

        console.log('-- role table created');

        var Role = app.models.Role;
        Role.create([], cb);
    });
}

//Create ACLs
function createACLs(cb) {
    dataSource.automigrate('ACL', function(err) {
        if (err) throw err;    

        console.log('-- acl table created');  

        var ACL = app.models.ACL;
        ACL.create([], cb);                 
    });
}

//Create AccessTokens
function createAccessTokens(users, cb) {
    dataSource.automigrate('AccessToken', function(err) {
        if (err) throw err;    

        console.log('-- accesstoken table created');   

        var AccessToken = app.models.AccessToken;
        AccessToken.create([], cb);
    });
}

//Create RoleMappings
function createRoleMappings(roles, cb) {
    dataSource.automigrate('RoleMapping', function(err) {
        if (err) throw err;    

        console.log('-- rolemapping table created'); 

        var RoleMapping = app.models.RoleMapping;
        RoleMapping.create([], cb);           
    }); 
}

var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

//Create Customers
function createCustomers(users, cb) {
    dataSource.automigrate('Customer', function(err) {
        if (err) return cb(err); 

        console.log('-- customer table created');       

        var Customer = app.models.Customer;
        Customer.create([
        {
            userId: users[0].id,
            name: 'José F. Silva',
            phone: '31991418730',
            createdAt: Date.now() - (DAY_IN_MILLISECONDS * 100),
            updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 100)
        },
        {
            userId: users[1].id,
            name: 'Maria P. Alves',
            phone: '31991477744',
            createdAt: Date.now() - (DAY_IN_MILLISECONDS * 99),
            updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 99)
        },
        {
            userId: users[2].id,
            name: 'Ana G. Ferreira',
            phone: '31991888110',
            createdAt: Date.now() - (DAY_IN_MILLISECONDS * 98),
            updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 98)
        }], cb);
    });
}

//Create Orders
function createOrders(customers, cb) {
    dataSource.automigrate('Order', function(err) {
        if (err) return cb(err);

        console.log('-- order table created');

        var Order = app.models.Order;
        Order.create([
        {
            customerId: customers[0].id,
            quantity: 3,
            subtotal: 75,
            status: 1,
            createdAt: Date.now() - (DAY_IN_MILLISECONDS * 90),
            updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 90)
        },
        {
            customerId: customers[0].id,
            quantity: 5,
            subtotal: 150,
            status: 1,
            createdAt: Date.now() - (DAY_IN_MILLISECONDS * 89),
            updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 89)
        },
        {
            customerId: customers[0].id,
            quantity: 2,
            subtotal: 100,
            status: 1,
            createdAt: Date.now() - (DAY_IN_MILLISECONDS * 88),
            updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 88)
        },
        {
            customerId: customers[1].id,
            quantity: 2,
            subtotal: 20,
            status: 1,
            createdAt: Date.now() - (DAY_IN_MILLISECONDS * 87),
            updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 87)
        },
        {
            customerId: customers[2].id,
            quantity: 5,
            subtotal: 100,
            status: 1,
            createdAt: Date.now() - (DAY_IN_MILLISECONDS * 86),
            updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 86)
        }
        ,
        {
            customerId: customers[1].id,
            quantity: 1,
            subtotal: 30,
            status: 1,
            createdAt: Date.now() - (DAY_IN_MILLISECONDS * 85),
            updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 85)
        }], cb);
    });
}


//Create Products
function createProducts(cb) {
    dataSource.automigrate('Product', function(err) {
        if (err) throw err;    

        console.log('-- product table created');

        var Product = app.models.Product;
        Product.create([
        {
            name: "Wacom Bamboo Tablet",
            pricing: 100,
            description: "Just getting going with your art? Transitioning from paper to computer-based work? The Bamboo Splash is a great way to explore your interests, with a premium feel of the pen tablet and everything you need to get started in the box.Start something fun! Sketch, draw, paint, all on your computer with the new Bamboo Splash. You'll work both digitally and naturally, thanks to the feel of the Bamboo pen in your hand. Whenever your art and your computer come together, a Bamboo pen tablet is a must have!You can replicate pencils, chalks, oils and watercolors as you move the Bamboo pen naturally across the tablet. Create your own effects, experiment, and share your stuff with others digitally. Most of all, have some fun!",
            published: true,
            ratingCache: 0,
            ratingCount: 0,
            createdAt: Date.now() - (DAY_IN_MILLISECONDS * 200),
            updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 200)
        },
        {
            name: "Smartphone MTK6572",
            pricing: 500,
            description: "K M8 Smartphone with Android 4.4.2 OS",
            published: true,
            ratingCache: 0,
            ratingCount: 0,
            createdAt: Date.now() - (DAY_IN_MILLISECONDS * 199),
            updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 199)
        },
        {
            name: "iMac Desktop Computer",
            pricing: 1200,
            description: "The idea behind iMac has never wavered: to craft the ultimate desktop experience. The best display, paired with high-performance processors, graphics, and storage — all within an incredibly thin, seamless enclosure. And that commitment continues with the all-new 21.5‑inch iMac with Retina 4K display. Like the revolutionary 27‑inch 5K model, it delivers such spectacular image quality that everything else around you seems to disappear. Adding up to the most immersive iMac experience yet — and another big, beautiful step forward.",
            published: true,
            ratingCache: 0,
            ratingCount: 0,
            createdAt: Date.now() - (DAY_IN_MILLISECONDS * 198),
            updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 198)
        },
        {
            name: "DualShock Controller for PlayStation 4",
            pricing: 20,
            description: "The DualShock®4 Wireless Controller for PlayStation®4 defines the next generation of play, combining revolutionary new features with intuitive, precision controls. Improved analog sticks and trigger buttons allow for unparalleled accuracy with every move while innovative new technologies such as the multi-touch, clickable touch pad, integrated light bar, and internal speaker offer exciting new ways to experience and interact with your games. And with the addition of the Share button, celebrate and upload your greatest gaming moments on PlayStation®4 with the touch of a button.",
            published: true,
            ratingCache: 0,
            ratingCount: 0,
            createdAt: Date.now() - (DAY_IN_MILLISECONDS * 197),
            updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 197)
        },
        {
            name: "Asus Transformer Pad Tablet",
            pricing: 200,
            description: "The New ASUS Transformer Pad is a 10.1-inch mobile entertainment tablet with a vivid 1280 x 800 IPS display, the latest high-performance Intel BayTrail quad-core processor, and a lightweight optional keyboard dock with USB 2.0.",
            published: true,
            ratingCache: 0,
            ratingCount: 0,
            createdAt: Date.now() - (DAY_IN_MILLISECONDS * 195),
            updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 195)
        },
        {
            name: "Dualshock Controller for PlayStation 4",
            pricing: 23.75,
            description: "The DualShock®4 Wireless Controller for PlayStation®4 defines the next generation of play, combining revolutionary new features with intuitive, precision controls. Improved analog sticks and trigger buttons allow for unparalleled accuracy with every move while innovative new technologies such as the multi-touch, clickable touch pad, integrated light bar, and internal speaker offer exciting new ways to experience and interact with your games. And with the addition of the Share button, celebrate and upload your greatest gaming moments on PlayStation®4 with the touch of a button.",
            published: true,
            ratingCache: 0,
            ratingCount: 0,
            createdAt: Date.now() - (DAY_IN_MILLISECONDS * 196),
            updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 196)
        }], cb);
    });
}

//Create StoredProducts
function createStoredProducts(products, cb) {
    dataSource.automigrate('StoredProduct', function(err) {
        if (err) throw err;    

        console.log('-- stored_product table created'); 

        var StoredProduct = app.models.StoredProduct;
        StoredProduct.create([
            getStoredProduct(products[0], getRandomInt(1, 1000)),
            getStoredProduct(products[1], getRandomInt(1, 1000)),
            getStoredProduct(products[2], getRandomInt(1, 1000)),
            getStoredProduct(products[3], getRandomInt(1, 1000)),
            getStoredProduct(products[4], getRandomInt(1, 1000)),
            getStoredProduct(products[5], 0)
        ], cb);           
    }); 
}

function getStoredProduct(product, quantity) {
    return {
        productId: product.id,
        quantity: quantity,
        subtotal: product.pricing * quantity
    };
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Create OrderItems
function createOrderItems(orders, storeds, cb) {
    dataSource.automigrate('OrderItem', function(err) {
        if (err) throw err;    

        console.log('-- order_item table created'); 

        var OrderItem = app.models.OrderItem;
        OrderItem.create([], cb);           
    }); 
}

//Create ProductReviews
function createProductReviews(customers, products, cb) {
    dataSource.automigrate('ProductReview', function(err) {
        if (err) throw err;    

        console.log('-- product_review table created'); 

        var ProductReview = app.models.ProductReview;
        ProductReview.create([], cb);           
    }); 
}

//Create ProductImages
function createProductImages(products, cb) {
    dataSource.automigrate('ProductImage', function(err) {
        if (err) throw err;    

        console.log('-- product_image table created'); 

        var ProductImage = app.models.ProductImage;
        ProductImage.create([], cb);           
    }); 
}