/**
 * gmail service
 */

import { error } from "console";
import { google } from "googleapis";
import { SendMailOptions, SentMessageInfo } from "nodemailer";
import nodemailer from "nodemailer";
// import { FieldValue, firestore } from "../../../utils/firebase";

const {
    GMAIL_USER,
    GMAIL_USER_NAME,
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    GMAIL_REFRESH_TOKEN,
    GMAIL_REDIRECT_URI,
} = process.env;

const OAuth2 = google.auth.OAuth2;

const getOAuth2Client = () => {
    const oAuth2Client = new google.auth.OAuth2(
        GMAIL_USER,
        GMAIL_CLIENT_ID,
        GMAIL_REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });
    return oAuth2Client;
};

export default ({ strapi }: { strapi: any }) => ({
    async send(options: SendMailOptions): Promise<SentMessageInfo> {
        const { to, subject, text, html, attachments } = options;

        strapi.log.debug("GMAIL_CLIENT_ID:" + GMAIL_CLIENT_ID);
        strapi.log.debug("GMAIL_CLIENT_SECRET:" + GMAIL_CLIENT_SECRET);
        strapi.log.debug("GMAIL_REFRESH_TOKEN:" + GMAIL_REFRESH_TOKEN);
        strapi.log.debug("GMAIL_USER:" + GMAIL_USER);
        strapi.log.debug("GMAIL_REDIRECT_URI:" + GMAIL_REDIRECT_URI);

        const oAuth2Client = new OAuth2(
            GMAIL_CLIENT_ID,
            GMAIL_CLIENT_SECRET,
            GMAIL_REDIRECT_URI
        );

        oAuth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

        const accessToken = oAuth2Client.getAccessToken();

        // const accessTokenObj = await oAuth2Client
        //     .getAccessToken()
        //     .then((res) => res)
        //     .catch((reason) => {
        //         strapi.log.debug("ERROR: " + reason);
        //         throw new Error("Error! ");
        //     });

        if (!accessToken) {
            strapi.log.debug("Failed to get Gmail access token.");
            throw new Error("Failed to get Gmail access token.");
        }

        strapi.log.debug(`accessTokenObj.token: ${accessToken.toString()}`);

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: GMAIL_USER,
                clientId: GMAIL_CLIENT_ID,
                clientSecret: GMAIL_CLIENT_SECRET,
                refreshToken: GMAIL_REFRESH_TOKEN,
                accessToken: accessToken.toString(),
            },
        });

        const mailOptions = {
            from: `${GMAIL_USER_NAME} <${GMAIL_USER}>`,
            to,
            subject,
            text,
            html,
            attachments,
        };

        // const doc = await firestore.collection("notifications").add({
        //     title: "title",
        //     message: "message",
        //     createdAt: FieldValue.serverTimestamp(),
        //     target: "all",
        //     readBy: [],
        // });

        strapi.log.debug("doc.id: " + doc.id);

        return transport.sendMail(mailOptions);
    },
});
