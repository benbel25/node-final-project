const nodeMailer = require('nodemailer')
const { google } = require('googleapis')
const { tryCatch } = require('./tryCatch')
const OAuth2 = google.auth.OAuth2

const createTransporter = async () => {
    try {
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            'https://developers.google.com/oauthplayground',
        )

        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN,
        })

        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                    reject(err)
                }

                resolve(token)
            })
        })

        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                accessToken,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
            },
        })

        return transporter
    } catch (err) {
        console.log('error from createTransporter', err)
    }
}

const sendEmail = async (emailOptions) => {
    try {
        let emailTransporter = await createTransporter()
        await emailTransporter.sendMail(emailOptions)
    } catch (err) {
        console.log('error from nodemailer', err)
    }
}

module.exports = sendEmail
