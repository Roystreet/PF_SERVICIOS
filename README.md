# PF_SERVICIOS


## Uso de las rutas producto
- get /api/products ---> retorna los primeros 100 productos
- get /api/products?name='..' ---> retorna todos los productos que se  parezcan en nombre

- get /api/products/:id retorna un objeto con la info del producto 

- post /api/product   recibe el producto por body
 ```js
//Ejemplo de body
{
    "name": "producto",
    "description": "Un producto de calidad",
    "price": "20", 
    "stock": 3,
    "status": true,
    "userId": 1,
    "categoryId": 1,
    "images":["https://image.co/aja", "https://image.co/aja"]
}

```
- put /api/product   recibe un objeto por body
 ```js
//Ejemplo de body para actualizar producto
{
    "description": "Un producto de calidad, de mucha calidad",
    "price": "40", 
    "stock": 2,
   
}
```
- delete /api/product/:id retorna un mensaje de confirmación
```js
   "product destroyed",   "product not found"
 ```