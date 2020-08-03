import { SNS } from 'aws-sdk'

export function sendSMS(message: string, phoneNumbers: string[]): void {
  phoneNumbers.forEach((phoneNumber) => {
    const params = new AWSSMS(message, phoneNumber)

    const publishPromise = new SNS({ apiVersion: '2010-03-31' }).publish(params).promise()

    publishPromise
      .then((data) => {
        console.info(data.MessageId)
      })
      .catch((err) => {
        console.error(err)
      })
  })
}

export class AWSSMS {
  constructor(message: string, phoneNumber: string) {
    this.Message = message
    this.PhoneNumber = phoneNumber
  }
  Message: string
  PhoneNumber: string
}
