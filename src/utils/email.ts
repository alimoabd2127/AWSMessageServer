import { SES } from 'aws-sdk'

export function sendEmail(
  source: string,
  to: string[],
  reply: string[],
  subject: string,
  message: string
): void {
  const params = new AWSEmail()
  params.Source = source
  params.Destination.ToAddresses = to
  params.ReplyToAddresses = reply
  params.Message.Subject.Data = subject
  params.Message.Body.Text.Data = message
  params.Message.Body.Html.Data = '<p>' + message + '</p>'

  const sendPromise = new SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise()

  sendPromise
    .then((data) => {
      console.info(data.MessageId)
    })
    .catch((err) => {
      console.error(err)
    })
}

export class AWSEmail {
  constructor() {
    this.Message.Body = {
      Html: {
        Charset: 'UTF-8',
        Data: ''
      },
      Text: {
        Charset: 'UTF-8',
        Data: ''
      }
    }
  }
  Destination = {
    CcAddresses: new Array<string>(),
    ToAddresses: new Array<string>()
  }
  Message = {
    Body: {
      Html: {
        Charset: 'UTF-8',
        Data: ''
      },
      Text: {
        Charset: 'UTF-8',
        Data: ''
      }
    },
    Subject: {
      Charset: 'UTF-8',
      Data: ''
    }
  }
  Source: string
  ReplyToAddresses = new Array<string>()
}
