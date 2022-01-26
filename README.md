# PF_SERVICIOS


## Uso de las rutas post
- get /api/post ---> retorna los primeros 100 posts
- get /api/post?name='..' ---> retorna todos los posts que se  parezcan en nombre

- get /api/posts/:id retorna un objeto con la info del post

- post /api/post   recibe el post por body
 ```js
//Ejemplo de body
{
    "name": "post",
    "description": "Un post de calidad",
    "price": "20",
    "stock": 3,
    "status": true,
    "userId": 1,
    "categories": [1,2,3],
    "images":["https://image.co/aja", "https://image.co/aja"]
}

```
- put /api/post   recibe un objeto por body
 ```js
//Ejemplo de body para actualizar post (siempre con Id)
{
    "id":1
    "description": "Un post de calidad, de mucha calidad",
    "price": "40",
    "stock": 2,

}
```
- delete /api/post/:id retorna un mensaje de confirmación
```js
   "post destroyed",   "post not found"
 ```

 get /api/postbyuser/:userId
 retorna los productos de un usuario
