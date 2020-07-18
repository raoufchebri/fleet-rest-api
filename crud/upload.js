const AWS = require('aws-sdk')
AWS.config.update({region: process.env.AWS_REGION})

const s3 = new AWS.S3()

module.exports.upload = async (event) => {
    const result = await getUploadURL()
    console.log('Result', result)
    return result
}