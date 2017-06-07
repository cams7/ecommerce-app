'use strict';

var async = require('async');
var app = require('./server');

var dataSource = app.dataSources.ecommerceDS;

//create all models
async.parallel({
    users: async.apply(createUsers),
    roles: async.apply(createRoles),
    acls: async.apply(createACLs)
}, function(err, results1) {
    if (err) throw err;

    createAccessTokens(results1.users, function(err) {
      console.log('> AccessToken model created sucessfully');
    });

    createRoleMappings(results1.roles, function(err) {
      console.log('> RoleMapping model created sucessfully');
    });
    
    async.parallel({
        customers: async.apply(createCustomers, results1.users),
        products: async.apply(createProducts)
    }, function(err, results2) {
        if (err) throw err;

        createProductReviews(results2.customers, results2.products, function(err) {
            console.log('> ProductReview model created sucessfully');
        });

        createProductImages(results2.products, function(err) {
            console.log('> ProductImage model created sucessfully');
        });

        createStoredProducts(results2.products, function(err) {
            console.log('> StoredProduct model created sucessfully');
        });


        var ramdomOrders = getRandomOrders(results2.products, 1, 50);
        
        async.parallel({
            orders: async.apply(createOrders, results2.customers, ramdomOrders)           
        }, function(err, results3) {
            if (err) throw err;
            
            createOrderItems(results3.orders, ramdomOrders, function(err) {
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
            }
        ], cb);
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
            }
        ], cb);
    });
}

//Create Orders
function createOrders(customers, orders, cb) {
    
    for(var i=0; i < orders.length; i++) {
        orders[i].customerId = customers[getRandomInt(0, customers.length - 1)].id;
        orders[i].status = 1;
        orders[i].createdAt = Date.now() - (DAY_IN_MILLISECONDS * (90 - i));
        orders[i].updatedAt = Date.now() - (DAY_IN_MILLISECONDS * (90 - i));

    }

    dataSource.automigrate('Order', function(err) {
        if (err) return cb(err);

        console.log('-- order table created');

        var Order = app.models.Order;
        Order.create(orders, cb);
    });
}

function getRandomOrders(products, min, max) {
    var orders = [];
    
    for(var i = 0; i < getRandomInt(min, max); i++) {
        var order = {};
        order.items = [];
        order.quantity = 0;
        order.subtotal = 0;

        var createdItem = false;

        for(var j = 0; j < products.length; j++) {
            if(getTrueOrFalse() || (!createdItem && products.length - 1 == j)) {
                var item = {
                    productId: products[j].id,
                    productCost: products[j].pricing,
                    quantity: getRandomInt(1, 10)
                }
                order.items.push(item);
                order.quantity += item.quantity;
                order.subtotal += item.quantity * item.productCost;

                createdItem = true;
            }
        }
        orders.push(order);
    }

    return orders;
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
            }
        ], cb);
    });
}

//Create OrderItems
function createOrderItems(orders, ramdomOrders, cb) {
    var items = [];
    for(var i = 0; i < orders.length; i++){
        for(var j = 0; j < ramdomOrders[i].items.length; j++) {
            var item = ramdomOrders[i].items[j];
            item.orderId = orders[i].id;
            items.push(item);
        }
    }

    dataSource.automigrate('OrderItem', function(err) {
        if (err) throw err;    

        console.log('-- order_item table created'); 

        var OrderItem = app.models.OrderItem;
        OrderItem.create(items, cb);           
    }); 
}

//Create ProductReviews
function createProductReviews(customers, products, cb) {
    dataSource.automigrate('ProductReview', function(err) {
        if (err) throw err;    

        console.log('-- product_review table created'); 

        var ProductReview = app.models.ProductReview;
        ProductReview.create([
            {
                productId: products[0].id,
                customerId: customers[0].id,
                rating: 4,
                comment: "This product was great in terms of quality. I would definitely buy another!",
                approved: true,
                spam: false,
                createdAt: Date.now() - (DAY_IN_MILLISECONDS * 50),
                updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 50)
            },
            {
                productId: products[0].id,
                customerId: customers[1].id,
                rating: 3,
                comment: "I've alredy ordered another one!",
                approved: true,
                spam: false,
                createdAt: Date.now() - (DAY_IN_MILLISECONDS * 49),
                updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 49)
            },
            {
                productId: products[0].id,
                customerId: customers[2].id,
                rating: 2,
                comment: "I've seen some better than this, but not at this price. I definitely recommend this item.",
                approved: true,
                spam: false,
                createdAt: Date.now() - (DAY_IN_MILLISECONDS * 48),
                updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 48)
            },
            {
                productId: products[1].id,
                customerId: customers[1].id,
                rating: 3,
                comment: "I've alredy ordered another one!",
                approved: true,
                spam: false,
                createdAt: Date.now() - (DAY_IN_MILLISECONDS * 47),
                updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 47)
            },
            {
                productId: products[2].id,
                customerId: customers[2].id,
                rating: 3,
                comment: "I've seen some better than this, but not at this price. I definitely recommend this item.",
                approved: true,
                spam: false,
                createdAt: Date.now() - (DAY_IN_MILLISECONDS * 46),
                updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 46)
            },
            {
                productId: products[3].id,
                customerId: customers[0].id,
                rating: 3,
                comment: "This product was great in terms of quality. I would definitely buy another!",
                approved: true,
                spam: false,
                createdAt: Date.now() - (DAY_IN_MILLISECONDS * 45),
                updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 45)
            },
            {
                productId: products[4].id,
                customerId: customers[0].id,
                rating: 3,
                comment: "This product was great in terms of quality. I would definitely buy another!",
                approved: true,
                spam: false,
                createdAt: Date.now() - (DAY_IN_MILLISECONDS * 44),
                updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 44)
            },
            {
                productId: products[5].id,
                customerId: customers[1].id,
                rating: 3,
                comment: "I've alredy ordered another one!",
                approved: true,
                spam: false,
                createdAt: Date.now() - (DAY_IN_MILLISECONDS * 43),
                updatedAt: Date.now() - (DAY_IN_MILLISECONDS * 43)
            }
        ], cb);           
    }); 
}

//Create ProductImages
function createProductImages(products, cb) {
    dataSource.automigrate('ProductImage', function(err) {
        if (err) throw err;    

        console.log('-- product_image table created'); 

        var ProductImage = app.models.ProductImage;
        ProductImage.create([
            {
                productId: products[0].id,
                icon: 'https://lh3.googleusercontent.com/0h17IJICJs3_1TMmXYYOwOP5kTzkPvKIlc8-wg7XNhcil7y59k8p-FsR8vZzWWbQgDhG7bMO9rR1vefDMT0EqyaW6Tzyuzc03QtiUrToQ408oD4tkdTK_f0_KdETVNzE7kpVDJoGmWtgUM3CDQ113h0XXCrrI5ENTzYX8Gipl_OyQfOhgBPM-yYkq5vSvIHlsq9rAbleO4W5bxeHbqd89QOqrXgeiJQxqpomTwy1XuLQtsgq111-qnnqYrcFBPrUzz7W8ERMdHlng43-Rzpb8f6WtpyReam6BiXhzXB7udRrcKaWi9zmku-3O5LWYjU481zQGpaHnjfU5ad9AQDF8R6RDvPTuA4nDP_2mojcrk5nlGAKglflRm8mR_dtJSbF1rypMvjTxTwN7KrM7yhhcAGa1Ll_rznr-1c-ahB-c2wBN7TnPpblldBiGsVXOvyZXu5VSzrdMQ4WC49NWiftpstRo2tP9hdygkZcUyUp46H9Dg155lI22T-nDQsBIXsNsZzrL_XTHlmA_po3WWKGs_DkVKQ-4Rtf2Ld2_Y8Vu_pPg5_Y79qvRiR8BKAyBt6sEy-x1KHv_UxrfQZGrmTL1SPMU7o7_THQpKJP4ZWyXhuk_FxM=w675-h529-no',
                size: 1
            },
            {
                productId: products[0].id,
                icon: 'https://lh3.googleusercontent.com/nnARJRZHE1zCGHILyYwC1XHt6AtBItp8wNOgUUp5mWlq3MwDDn_QU90G_nHoEqC9AC88t_bVXKTBnNQnsbkif7ztXx-xCq9YxA2-7KMTkNwHzi6dayil70m6LYsj_iHAmHmiWqe_U8JHqc8MMAL05qXNVUVR6o7GNYuIgnU126t4pApVZJcq3SywCsqirLu0pca4PNNXYxK5G6_pWunmuvthgX-s7cxG2n5U2wGG-m9UqxsGLgTSuZP8vgdMgc2VjXLm9krYh8brnCmdgZhX3zK2tQKAgYMyIUoqMvb7BpmoPSiF1kpFU0BYPVY7esVz3z89wnua2Dq5XzFLK3gc-6-FaF8P3ofyu9MkEgn6WYuHJ5vjmMyagGzK_4rxJVAX5LlegIO52voe89RyHe_I0_XCfT6ChiLWeu_4_0rarCPxPBMtOJ377GGuMttLHwwILxhDjeZ6NP2EpoSHHRM4SYyrlojcVclDArBeZpRbYHX8Gk4sSUpHTG9IZB0pHo3L4NGZD48QM8dhP6nIScg936rXLEFGEAOIuNKE_UC4LLPAqkbuASG3dnh7kUrd0z270CC_Z4bnl3WLyMqYQJq4O9lwOu3NJ3GG0NleSFvtIT2OJkDdzoN2=w298-h350-no',
                size: 2
            },
            {
                productId: products[0].id,
                icon: 'https://lh3.googleusercontent.com/Q7DO0hUAP6qnELp8fGDgS4jJPCFqkKwuK5wGx_3LmWf9R29euI-0vH4zJ3IAvSzYqylu6iUlngoGnlmLt52nVOOxK3mL_RFYeGiLND00hrVcpI7U9dsyhP9LPSM-RA8MA-8r6p81jGzzW3Ktcy3cnGrBFDwE8zLBq-Hgf-8tYWeDKL83kVLG_77WNaVberBwOKarv7OIokg3JAzuT-I7oYr1823VUvsVheXsuKH4V1sThWw2erTSjP8xL_jy630PWaVP-5nBKhsZoD4yElXXrm8N7T_1o40lArDQlMYxIYOhl0RWdcK_8usYok03mg_XqV7_oA4Tvdg4XU2zz1UzLUznHfZ-wKuFNlvQfgvUBqSY04PAUHhk6t6KpJiWgdxCMm_P5_aGQK8iPyYLif0vD3ZSJRuau_8liMmt3ZSEg26Ab4ofEj2rD-dAcH_JUqMmJRV70jn43zohY8CZLqBDO1FhgXFg8xldrJYP50hWE-ujUtBgSNHScubbnCvujfA4b1g9JRczcEXqjDZK5hSRh_jKGbpkqivufihTpEsZzhZvvYpA5QVzYIMHx-Y9drFa_SGTE-fxMkVYJRnRUrONIeBe8yrxkk0OeqhLRj71K8v3pRLRywHn=w120-h100-no',
                size: 3
            },
            {
                productId: products[1].id,
                icon: 'https://lh3.googleusercontent.com/tLcFOkGBCMhbo7XcbBZexsxxrOaO1RqgVq-lQ0F1l2-f9oJxLrl7aVHk-_I8GZ-HHX9TRmIzSfpLYJJddzJXCUZLEJRZjJdvfioqsl592ZbwtAYLyXr72hRe4WAUQ9uWWNKQfYyCQ9CW17uQXF3os9EOoCD_JW5gliFhsOxqMI5PdgDpr6cYOE0zpADuBCTuJl5yksV4md39UF_Y9HFYmWYUKV5J8MgE3r2JR4L5uBmYYQ5x1JTfX-699IbW5o2GETWwiIPu3FyIJ1fNsXlF6RXaurng3NvkvWKV2Yvxif0bffxUV-l0OIQcn7dJxRho9bmFlHRRChZ_rTnwWTket4mN2eqYcJ4HsrauV1893kZX1oTp89P02j1fVBqcGOF6RWJbXRhbWltvmPGs-3MLs12K_N4O5dwSF4Mgg_DbsFfgTamC8-9wtBq5KXsmfKzCxB3oHbEa5Ggtz35n78wLu1ea1T3ad-ksLjTDM4Cr8_nUSEjPQgwmbRAOG0i8WsfSTraKylsEEKWFIE_IVM3vC6LP4v-W-9vLyInyW1D4t87dSdoTVjpd96ctuXQl0dAWTVCaWUC-FilROTpA3m8Xv1U0ZFKj2SyX0ntDYph4oKt-hUz9tddy=w400-h500-no',
                size: 1
            },
            {
                productId: products[1].id,
                icon: 'https://lh3.googleusercontent.com/-MFw3NWPX9M4Q-VTOP_qMojxgBN2n4v-yrZJuZYt-tABO43DqeH3jFWDzPSfY-0i3aP3MJzjbgN_bEYRLj57SPaGqYQwpxSMbcqTeiyWzK4av17N3oG_BNoYYyOOBBn8l96Lu4SugjwMo5C895z_V0Whp32yi3nWYVTRThubXheDyK6UZC551W5wroHCfoA4ahp08h8CMS2ELkPykhMgfUhvLcAnD-wP7h0s6BLxayCp5YUxkFWCrMRpsYvzQs3cBunANb4aWtM-hcJqhGAaeVKew9YfD6TuQ3SE9wOfTcx4-htmKMMzJq4UMxsJZDEgpXDNrcYtZq5waQLDR0IgNCXBZMWnCI_g_bGPf8GIESJOVbETei3-okuD37V1mqab2nUjVF1GD-0RO8oX1EAGHkUjkHcvfXZXRnhc_0qcg3vx1cS44El97Bd3E3ttRS1_D0mGZGgsApK5xDvCUP72qMGYnj_v56BDpegPquSGUEy6UkO06jo7Jcck73kRvhBm8QVAUdVRVyoMYqS2FvVUr5P6-wRZ8SbYBIHOrefII0Rij0AOdtK3E8xu6oaa0hhtv3d8fDOBezSXHCieVQlOySUXb4W4VS35iElJpxG2C4Br6-zfcZgA=w298-h350-no',
                size: 2
            },
            {
                productId: products[2].id,
                icon: 'https://lh3.googleusercontent.com/a9iAcZ6UmSQuSCEF916Sfw1gUZ_pZhKrqewZg2FVRbEr-Kp2MoJclxaWmGh0nVEz642nGiKHshpmMNTN0uG7S63gxj5vkEr1SwPwySLB-gMuNVCpk1FBiy5o6CdiucH3oSKdtQP5xBJCEf2qt1NCsn76-jBFl0573u7IAWJ4N7NGNjiEX7UHn8tskeB1mAEqpPQFxH3c7lHaPzKVOp2jO839-DsGuj1jXw65yE09SJRylfK0qTjc0-k_qpl5tLcK5JlK6Iz0RIO01QjeFQAVXAb7OA3HHwI5lCrR67IiKk9Veqihi10kTc5ZaDzwrtGcJP9LtN1oBPA13OZN3Wxc6LN2Ehuro-Kh-0zRQgfKHDE8AKrWOUA720ULAfE3KZIfA-Hr3-4vB7C-lXuKa9wXULk93vkVrqrY857r7-zpeVQfyYyaWIgg963nAhNAytL2wB6Muu9hi25nK1Opxj8-oQ-qTGp4fIrS4joeN5LN-Jilh3Asqp1mjIxs6jyBVscKyUY4twhDnvl2Ku713zZmmYGYnQ2Tqgc576v4xffsHGWAwfdteseU-_Mqx7gWzZOqkxgM94ts1WF7sSCoyFgugy5kVJSzWqi1DrlfeBICWj3RVpPc6Tk5=w400-h500-no',
                size: 1
            },
            {
                productId: products[2].id,
                icon: 'https://lh3.googleusercontent.com/NkrfeZBy1w4Q3FHeQJ7GFg1nCgWsAV51OQqjcsWeXUYn5hW6FajL9oS6NV9SVHlQB4rlln8ZSb2pxijlczUvL-IQBahvowCF3zwMmnzltxSWtxt6NObkKoy5idMU6XFtpFOQcNSQED1DAB9fhw_DPFGi6NmjIfi5vPyRZNbxbTz5N8ikBMYRMrWkVnQr4Xrl9Skd5wuprRE-Tx2b0XMluxmkXBy886x8IGVPviEaU1dRucK97EFnvcEVxF7Mcqpj0Ijy9C1Rtus102nNb2xroxQhmAMrMWtQidSqj3O4ljWjb5_B1y34CZ1kgych_m1cl4B23EWsPY_vEqUyb_02B3T1Gr8MCRmCSRg-sr_eynPESH2SpnHHc05f5bTycJfq1Skt9YyoPUiKL2fG4IKJgn1XkhYHbrSsrRri_8N1HTAew5pzOP0obZnyoHZaE6lno1KSMlA4fFcoEwQEZH8XOk0wXtHdi4V8yy3ZeJuH5nYIjroIUTm2oHPO-SrcNz26vxp2vRIY1UvSWchf27_hduGinskXu706p5YZffnfMObGw_IaSjvos4b1nouXEoFg6X_JFpjoJlZBT9EUhNyRwq5mhNAWf3vw_lPAKPMmW270bnLJUgCz=w298-h350-no',
                size: 2
            },
            {
                productId: products[3].id,
                icon: 'https://lh3.googleusercontent.com/KVCMvRWAklr7TM3cFrEAaTnRyTMBSfX8OW94JOIftv7Hf_lqqmC1VuWZP-TrfOK6boBsmkWdACjSAm9lFycJ5v3B6KxVOc3j9wKlQ3ak_HB_LoEcVoK35DxTQ77vgGAAKoPtWmdpwksndrRccwL177LAcc2H-z5IXHC0aMhPwMnCK_iou7P3OQaTOx_Z1krQyU7hpRl94jEbpa-6lrCyEHotSHgP1FSdgEJwuf9XzHJBXjZqc6U4vMICOxSAtJq4J3u1sdPCD87ZHkxBIy3Q_Axv4-BkEEepV_Ds5vChQ_vDhNsAW4eK-NKa3_0ktNgAnj6xezyKU0moL4k_POEqcnzW4KvaSWDlnloLqC3iIXiV91o_QACvO7bf18YuotnbY2eGmW9T_6LsAGxXCrH4sar6BaPGMs3eJk0Rvp0D4B2wU6fZa_LEyk0D2Q84SC3_F90AYSUYgq1OO8-2gC-hqq8AgbuJ2vaJoVgmOmG_REj_4O7h1XaNTNrkHdpnEsYDc3XmORBb5c-vTIwKVRkJkSanxwaTEN2E4sy2BQD_lxi4QmHDYzj5HyZ7gxy1TWlEWWgGlwlD1EzwvL1pTOzyD0y1NNoXkjbQxw4ZrrAyg2u0727gaBy6=w400-h500-no',
                size: 1
            },
            {
                productId: products[3].id,
                icon: 'https://lh3.googleusercontent.com/6xf_lzOae0Yo3x5cBNkGzxcyxO_LYOnP0s_W6VnHmYulvPD5N1V-a38s1QpbOfHO7K9oOKVYbxSyXlClYGz6L96Gqm5QcixPSKfvdmbsUW7e05tbmmW_L1YNjbONGf3H0wPEeT6zTl4Ap2N6F-6GjmVPnEM7lby7vzK_fZUIC3vGe8VA-jNqDVzfhAZNx1uWdTv3cFs-WLQWOQffg8txkwbSNbnJPL50uz6XUcY9ZGSfg5Rv8q6B6DgpDCQ4hvNZbvrR8ONwEkU5QQniVoC2T2WaaWbD0yiQmEoO87b1Sn56X-qysUG-GoIAyEpYH1INESNuzdw-3i0Bmp5Rfnk88yt8TENvMO6do1hZhEaFwxASGdQ88_S5stmGnnKDc-2oMfMgKy9gX4W43gm3zbnkIkPf0DceR6KXme5B4O2qxCbiXCCjjJjM3JK4-OAq-eIYhAeU--_Fj7gufRikmaBHraqnwKXo858lCl2i3KgtC6Xp97z2tdmLnh-VkYKsZANWJ3poLDb59Sm3sPk5JX7TtsSIls_ITJt9LcrBqPwm7Wb9i7iqRaxfDbpgy1p_Oa-0DGe7TtDpUE94GEsxJS_znjk356r747FHOmjjQzurbFVzhtLqIaHt=w298-h350-no',
                size: 2
            },
            {
                productId: products[4].id,
                icon: 'https://lh3.googleusercontent.com/KQQLVgAXKXL-QklYV8ZbtXeM1t18RA2IaZFWI2y_wKUhWBBcfq4k-B-QUmwEPGnfKZ_I7Ao8PA7_DtlMBnaYzqNDTtiuw4LtapP7W8OICT3RcgogO8x5tBD-RIhBb4xhJ3LXAkMF5S9iLKpwyVDaw3eEn2hZtCl-3R8K-B9gNWeRft9yHQnqoZ54ygaMRzMRKIhS7KXT0ZvTwkLsRTNdX0A7tk1N2YlLkL5WInuYAihwd4AwQPIzjwdJNhnuwJC02nbVAIoeU7WJfTyzTYXamayH7tlQBsKAzTIlu84CIQWnbLJkFFLtAuerv6qKNVKmgLng7JZVhSMGTI93HYyCD_Q7OLde5qUlX8DKaXqMh9Liy3MJVSb8VqnCKSwSTKu1x5LvPEfcBMKlV4P6S-ElNLfGwZK8gjkbHEfpP12S-pFpbxE6NxiWGn7B3SZxp4oDkckkCDOC3cSorjU4jrP1gCPB9ToGJJ6bQRpw6HcoQq-KB8I1StoSljHrJiTnxPWecMARY4rfyKnswbNuPIZHWkoKPZnqst6zPcl5FRqBg2Uv7ZJ9oOgl6kBdiF06oCMf2QjoGXEiojJ1BpBRH7wEJXe_Zy86HMUC0o8yLM07nx9PQOnOoMH5=w400-h500-no',
                size: 1
            },
            {
                productId: products[4].id,
                icon: 'https://lh3.googleusercontent.com/4T-jsX0VFntpyyceCt4Kyc-tWHdexUFjwqd3TQs4FCeaMiHU7NMPySFhZIM3SFgc05tN0rn59zGP7NdFYNjoY0n76XtRm3ARmkdyFf9NyckgT24GeZ7SxYcRICtCoVGYUBNjBG-5JWvpDduxoJ09wUPD8tECOuOC1mpzRIW7Fqzvg-ICWoPRphVdRXm_7rzUHgwyzR-LNQosdSFSWfq61YNG1rDT7uNDZ9iyaWtfkz6ztPPFKx12fpNAajh5YuelhHcWGh-kn2AMNFlqxln-jGFB6Ch-kwB2RfIVn31kPkzVnow2qhqwBc9NNVFVK6jKcGnn0hTK7iNm3unG_MxMIX-yDyhTnXU0llFhHzjY6E_pQrG_QJl7vkIMT8LNnjqISSgu8hNYO2O9G-UelK5KkWtSnjm81KYbSH4hMaIKQXtrY-FJIo0yG3fAsUNhaIHwpNXhIDx5RG5vBKiFt9NQgb0AP7paSsZhlM156YTZkWfuAGpSQCySkdF7PLOAi1AykZfFntvJNWLiD504ZM8t5pSBISfY-jRbuk0VegJ99owI9stlddmxl5ZQRmwyhuSb8GJ0utuYV_87KSvhTlLcGgBxb4MDxdKUMh3qnUShT1H38mBbEj1R=w298-h350-no',
                size: 2
            },
            {
                productId: products[5].id,
                icon: 'https://lh3.googleusercontent.com/XrR23sKJEsleZtmSiL30Q2Gng8FP1rdjh3O2tBrO4CVGKxGquOB3SFz0wY3Q5j8smvbrR6npCjtfGIfGN8aTIyGiEQ4KnKc7nqOi6xQ5sBRkf4QFeZ6JdI--_tuOPO2QMOt7tzQELPJnPsM5JSpZr9yZ3XB4pu5oHKgIa_C56BDu6smdmR_dCilDBm9zgd3r2JNkZ4p_Lm1KBkRbFb2nOs_l7_dB5NmBPI4kqp4GmlUT9uzl-OAcHPSLTJyuXaAyj_qAq0T_WJuZBSgdDz992Yq-28vkOz0sMPl2DlqzVRoaNBbzDl0dJEmSv91xvhjaopRn7yNRMc5Mr80dm7Z4LVYc5l47deLOrDtBzI0p3upYAhZk8rqrluLYtjMEvfsS7x5IYOQN5q8FJvD-9PFTSweDJ-bsyAqOu_GsyHlY4dO7ZKKwl9adfJ9AIkfiQF41XUv2xlzOyw7d-pRqsqrt5Oeb6WdYww3S_yI_B6LYPW0J4YVgCBodU2oZ3CBWsiwsC85UheJGqLvJA4lTVM9asbc-CZyjOnsBIa5yVAxry1ls7tBT-KVwWX6EojBQLm8oCisHv2AehW8gFUpBHI-bYP35MSmdAHNlY6Q9m5Xa8Fl240YRN9am=w400-h500-no',
                size: 1
            },
            {
                productId: products[5].id,
                icon: 'https://lh3.googleusercontent.com/UNYTIeE-gVu48TcvutHZKIlbEHeJr_6Mp8ZASL34No04U_-Smct4sgklSecQzvTAdZs0WK79VHx0pc8Yo4TkFDWLD-Ip0Y0Zm8yfCSQfzNR8jHTt0XkuQ-Mz2fcQtUpJ7Tsts4iUvh2O3I44vinlYYnhPwjj4eD23AU63m1W2-HJNGkuGWsALMpKCmv_q6gJaqsnylBGmp7Kv95cv13e91k0IM2ZcoBlfqvj-QcxlnjQ4BYpctErZ5R2GNO48jm30gKKMo6d2twnsdR41Lm6YEpyqqgi-fkPJQG1AJok5Ou-pkrCoGgXTTR_xtMKsjyWEdGWh3QwvVb1rvoYGnbHXpADEyIi0oD9ajuQEr7hF9JvGgRuirbEN8CaFAALA988RSb1xAGd5077_tgxiIdLCUGcHm8kBriNPPa175LGg7eeq-XCnHVjGMFh4y0b3t7c9au5tJouQy98N3UbllbEbqZrX5W7i23aQFsdWVr_IeF6KZJcp1la__wqJC_lG1URblWoyjt0Ma9TIr5AwVQnRzLCBDL2TwFGC7wtbmapyOgyt3jGNfk628ItzZGlRCmJ7DYxg0SDaR6-fJAO4Z1FwR_4-JiyeQjjbaHKmbgBtdiQHLKvfYCu=w298-h350-no',
                size: 2
            }
        ], cb);           
    }); 
}

//Create StoredProducts
function createStoredProducts(products, cb) {
    dataSource.automigrate('StoredProduct', function(err) {
        if (err) throw err;    

        console.log('-- stored_product table created'); 

        var StoredProduct = app.models.StoredProduct;
        StoredProduct.create([
            newStoredProduct(products[0], getRandomInt(1, 50)),
            newStoredProduct(products[1], getRandomInt(1, 50)),
            newStoredProduct(products[2], getRandomInt(1, 50)),
            newStoredProduct(products[3], getRandomInt(1, 50)),
            newStoredProduct(products[4], getRandomInt(1, 50)),
            newStoredProduct(products[5], 0)
        ], cb);           
    }); 
}

function newStoredProduct(product, quantity) {
    return {
        productId: product.id,
        quantity: quantity,
        subtotal: product.pricing * quantity
    };
}

function getTrueOrFalse() {
    if (getRandomInt(0, 1) == 1)
        return true;

    return false;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}