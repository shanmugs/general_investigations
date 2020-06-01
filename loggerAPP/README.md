# logging investigations


This repo for logging  sample repo for node.js with winston and morgan on express sevrer

## installation and setup 


```

git clone.env copy git@github.com:ChimpTech/general_investigations.git

cd loggerAPP

cp .env.sample .env

```

#### Change the values of .env file

```

npm install

npm start

```


### test endpoints  

http://localhost:3000/

http://localhost:3000/users

http://localhost:3000/users/err


```
curl --request GET 'http://localhost:3000/'

curl --request GET 'http://localhost:3000/users'

curl --request GET 'http://localhost:3000/users/err'
```

 ### log message format and template

```
                  
{
    "timestamp": <utc tiemstamp>,
    "level": <log level>,
    "env": <app env>,
    "app": <app name>,
    "host": <app host>,
    "log": { 
        "alert": <is alert log?> <mandatory>, 
        "user_id": <request user id> <optional>,
        "request_id": <request id> <optional>,
        "response_id" : <reponse id> <optional>,
        "path": <request path> <optional>,
        "module":" <request module> <optional>,
        "method": <request module> <optional>,
        "function": <request module> <optional>,
        "status": <request module> <optional>,
        "message": <request module> <mandatory>,
        "stacktrace": <request module> <mandatory_if_error>
      }
}

```

 #### some example messages
   
Debug : "UserCreationRequestReceived"
Debug : "CheckingToSeeIfUserExists"
trace : "DB Query Completed"
trace : "MappingToUserObject"
Debug : "UserDoesNotExist"
Debug : "Creating User"
info : "UserCreated"


#### web client (info)
```
{
    "timestamp": "Mon, 01 Jun 2020 05:15:22 GMT",
    "level": "info",
    "env": "STG",
    "app":"webclient",
    "host": "aws instance id",
    "log": { 
     	"alert": false, 
     	"user_id": "5",
     	"request_id":"x232131434344sssqw2e222212",
     	"response_id":"reskiejhi3wru32932545",
      	"path": "https://aa.bss.com/core/v2/abcd",
	    "module":" donor flow",
      	"method": "GET",
      	"function": "getABCD",
        "status":"200",
     	"data": {'message':'calling api abcd with user id 5'},
      }
}
```
#### web client (error)
```
{
    "timestamp": "Mon, 01 Jun 2020 05:15:22 GMT",
    "level": "error",
    "env": "STG",
    "app":"webclient",
    "host": "aws instance id",
    "log": { 
    	"alert": true, 
        "user_id": "5",
        "request_id":"x232131434344sssqw2e222212",
        "response_id":"reskiejhi3wru32932545",
        "path": "https://aa.bss.com/core/v2/abcd",
	    "module":" donor flow",
        "method": "GET",
        "function": "getABCD",
        "status":"503",
     	"data": {'message':'error while calling api abcd , user id  '},
        "stacktrace":{'trace_data':'fdsfdsgsd fesffgwgrg'}
      }
}

```

#### API (info)
```
{
    "timestamp": "Mon, 01 Jun 2020 05:15:22 GMT",
    "level": "info",
    "host": "heroku app id",
    "env": "STG",
    "app":"ror-api",
    "log": { 
     	"tags": {'info'}, 
     	"user_id": "5",
     	"request_id":"x232131434344sssqw2e222212",
      	"path": "https://aa.bss.com/core/v2/abcd",
	    "module":" donor flow",
      	"method": "GET",
      	"function": "getABCD",
        "status":"",
     	"data": {'message':'calling api abcd with user id 5'},
      	"stacktrace":{}
      }
}
```
#### API (error)
```
{
    "timestamp": "Mon, 01 Jun 2020 05:15:22 GMT",
    "level": "error",
    "env": "STG",
    "app":"ror-api",
    "host": "heroku app id",
    "log": { 
    	"tags": {'error_alert' }, 
        "user_id": "5",
        "request_id":"x232131434344sssqw2e222212",
        "response_id":"reskiejhi3wru32932545",
        "path": "https://aa.bss.com/core/v2/abcd",
        "module":" donor flow",
        "method": "GET",
        "function": "getABCD",
        "status":"503",
     	"data": {'message':'error while calling api abcd , user id  '},
        "stacktrace":{'trace_data':'fdsfdsgsd fesffgwgrg'}
      }
}
```

#### API (info)
```
{
    "timestamp": "Mon, 01 Jun 2020 05:15:22 GMT",
    "level": "info",
    "app":"graph-api",
    "env": "STG",
    "host": "heroku app id",
    "log": { 
     	"tags": {'info'}, 
     	"user_id": "5",
     	"request_id":"x232131434344sssqw2e222212",
      	"path": "https://aa.bss.com/graph/v2/abcd",
      	"method": "GET",
	    "module":" donor flow",
     	"function": "getABCD",
        "status":"",
     	"data": {'message':'calling api abcd with user id 5'},
      	"stacktrace":{}
      }
}
```
#### API (error)
```
{
    "timestamp": "Mon, 01 Jun 2020 05:15:22 GMT",
    "level": "error",
    "app":"ror-api",
    "env": "STG",
     module:" donor flow",
    "host": "heroku app id",
    "log": { 
    	"tags": {'error_alert' }, 
        "user_id": "5",
        "request_id":"x232131434344sssqw2e222212",
        "response_id":"reskiejhi3wru32932545",
        "path": "https://aa.bss.com/graph/v2/abcd",
        "method": "GET",
        "function": "getABCD",
        "status":"503",
     	"data": {'message':'error while calling api abcd , user id  '},
        "stacktrace":{'trace_data':'fdsfdsgsd fesffgwgrg'}
      }
}
```
