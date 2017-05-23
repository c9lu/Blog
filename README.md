website: http://chenluplayground.azurewebsites.net/

The blog service API is built using Express Framework,
https://github.com/c9lu/BlogServer

sample URLs:
detail about individual post:http://blogserviceapi.azurewebsites.net/posts/1

filter posts by category: http://blogserviceapi.azurewebsites.net/category/programming/

filter posts by multiple id(s) http://blogserviceapi.azurewebsites.net/mposts/1_5/

all posts: http://blogserviceapi.azurewebsites.net

Unit tests (on the server side): I have added few unit tests (located in the test folder) for saving and retrieving user info via the mongodb. I am using Mocha framework for testing the asynchronous calls to the database. 

Work in progress, and still in development: Adding units tests on the client side (using Jasmine framework ) for the new blog features - allow user to register/login, add comments and subscribe to posts. 

