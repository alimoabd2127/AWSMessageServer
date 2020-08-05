# AWS Message Server

A NodeJS server that sets up a local server for you to send emails and sms messages from your AWS account using HTTP POST methods.

Please user the Docker container for a production setup.

## Docker Setup

Setup your config.json file in your current directory
> Modify the config.json file in the src folder for your targets.
> Verify the source email has been verified on AWS SES.
> Verify the phone numbers have the country code with a plus.

```json
{
    "email": {
        "source": "verified@email.com",
        "to" : ["user@email.com", "user2@email.com"],
        "replyTo": ["replyto@email.com", "replyto2@email.com"]
    },
    "sms" : {
        "to":["+12223334444"]
    }
}
```

Create a docker-compose like below, or use with docker run.
> Be sure to link your config.json file properly

```docker-compose
version: '3.4'
services:
  messenger:
    environment:
      AWS_ACCESS_KEY_ID: your_aws_key
      AWS_SECRET_ACCESS_KEY: your_aws_secret_access_key
      AWS_REGION: us-east-1
    volumes:
      - '$PWD/config.json:/usr/src/app/src/config.json'
    image: alimoabd2127/aws-message-server
```

## Build Setup

Setup the config.json file in the src folder
> Modify the config.json file in the src folder for your targets.
> Verify the source email has been verified on AWS SES.
> Verify the phone numbers have the country code with a plus.

```json
{
    "email": {
        "source": "verified@email.com",
        "to" : ["user@email.com", "user2@email.com"],
        "replyTo": ["replyto@email.com", "replyto2@email.com"]
    },
    "sms" : {
        "to":["+12223334444"]
    }
}
```

Create a .env file with environment variables
> Set AWS_REGION to a proper region with SES and SNS support (not all regions have support)

```env
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1
```

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:4000
$ npm run dev

# launch production server
$ npm run start
```

---

## Usage

Example usage with Axios.  More examples to come.

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
