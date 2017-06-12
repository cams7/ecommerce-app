# Ecommerce APP

* Autor: César Magalhães
* Tecnologias: Angular, Node JS
* Resumo: Aplicação Angular
* Linguagens: TypeScript
* Fonte: <https://github.com/cams7/ecommerce-app/>
* Site: <https://cams7.github.io/ecommerce-app/>
* Linkedin: <https://br.linkedin.com/in/cams7>

## Qual a finalidade desse projeto?

Criar uma APP de Loja Virtual.

## Sistemas requeridos

* [Microsoft Windows 10](https://www.microsoft.com/pt-br/software-download/windows10)
* [Ubuntu 16.04.5 LTS](http://releases.ubuntu.com/16.04/)
* [Git](https://git-scm.com/downloads)
* [Angular](https://angular.io/)
* [Node JS](https://nodejs.org/en/)
* [Visual Studio Code](https://code.visualstudio.com/)

## Para testa o exemplo

* Instale o Git
* Instale o Node JS
* Instale o Visual Studio Code

-------------------

```sh
cd ~/Dev/Projetos/ecommerce
ng new ecommerce-app --routing

cd ~/Dev/Projetos/ecommerce/ecommerce-app

ng serve
#Go to http://localhost:4200
#CTR-C

npm install ngx-bootstrap bootstrap --save
npm install --save font-awesome angular2-font-awesome
npm install angularjs-color-picker --save
npm install jquery --save
```

Change `ecommerce-app/.angular-cli.json`

`"styles": ["../node_modules/bootstrap/dist/css/bootstrap.css","../node_modules/font-awesome/css/font-awesome.css","styles.css","../node_modules/angularjs-color-picker/dist/angularjs-color-picker.css"],`
`"scripts": ["../node_modules/jquery/dist/jquery.js","../node_modules/bootstrap/dist/js/bootstrap.js"],`

```sh
cd ~/Dev/Projetos/ecommerce/ecommerce-app

ng g m home
ng g c home

ng g c about-us

ng g m blog
ng g c blog

ng g m contact
ng g c contact

ng g c page-not-found

ng g s settings

ng g m products
ng g c products
ng g s products/products
ng g class products/product
ng g p products/product-short-description
ng g p products/product-short-name

ng g s products/guards/product-resolver
#Rename product-resolver.service to product.resolver
#Rename product-resolver.service.spec to product.resolver.spec

ng g m reviews
ng g c reviews
ng g s reviews/reviews
ng g class reviews/review

ng g m items
ng g c items
ng g c items/item-details
ng g s items/items
ng g class items/item

ng g m checkout
ng g c checkout
ng g s checkout/checkout

npm test
#CTR-C

ng lint -fix

ng build --prod

npm start
#Go to http://localhost:8080
#CTR-C
```
```sh
sudo npm i -g angular-cli-ghpages

ng build --prod --base-href "https://cams7.github.io/ecommerce-app/"

ngh
```