# AWS Message Server

A NodeJS server that sets up a local server for you to send emails and sms messages from your AWS account using HTTP POST methods.

Please user the Docker container for a production setup.

## Build Setup

``` bash
# create a .env file with environment variables
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1 # example region, set it to a proper region with SES and SNS support (not all regions have support)

# modify the logger.json file in the src folder for your targets
# make sure the source email has been verified on AWS SES
# make sure phone numbers have the country code with a plus
{
    "email": {
        "source": "verified@email.com", # make sure its verified on AWS SES!!!
        "to" : ["user@email.com", "user2@email.com"],
        "replyTo": ["replyto@email.com", "replyto2@email.com"]
    },
    "sms" : {
        "to":["+12223334444"]
    }
}

# install dependencies
$ npm install

# serve with hot reload at localhost:4000
$ npm run dev

# launch production server
$ npm run start
```

---

## Usage

### Email

```javascript
var axios = require('axios')
var data = JSON.stringify({"message":"Is this working?"})

var config = {
  method: 'post',
  url: 'http://localhost:4000/email/send',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
}
```

### SMS

```javascript
var axios = require('axios')
var data = JSON.stringify({"message":"Is this working?"})

var config = {
  method: 'post',
  url: 'http://localhost:4000/sms/send',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
}
```
