
const nodemailer = require('nodemailer');
require('dotenv').config();

let sendSimpleEmail = async (data) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },

    });

    let info = await transporter.sendMail({
        from: '"Hệ thống đặt lịch khám bệnh 👻" <hiep.datn@gmail.com>', // sender address
        to: data.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line  text: "Hello world?", // plain text body
        html: getBodyHTML(data)
        , // html body
    });

}


let getBodyHTML = (data) => {
    let result = ''
    if (data.language === 'vi') {
        result = `
        <h3>Xin chào ${data.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám trên hệ thống đặt lịch khám bệnh </p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${data.time}</b></div>
        <div><b> Bác Sĩ: ${data.doctorName}</b></div>
        

        <p>Nếu các thông tin bên dưới là đúng sự thật, vui lòng click vào đường link bên dưới 
        để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
        <div><a
        href=${data.redirectLink} target"_blank"
        >Click</a></div>

        <div> Xin chân thành cảm ơn</div>
        `
    }
    if (data.language === 'en') {
        result = `
        <h3>Dear ${data.patientName}</h3>
        <p>You received this email because you booked an appointment on the appointment booking system </p>
        <p>Information to book a medical appointment:</p>
        <div><b>Time: ${data.time}</b></div>
        <div><b> Doctor: ${data.doctorName}</b></div>
        

        <p>If the information below is true, please click on the link below
        to confirm and complete the medical appointment booking procedure</p>
        <div><a
        href=${data.redirectLink} target"_blank"
        >Click</a></div>

        <div>Sincerely thank</div>
        `
    }
    return result



}

let getBodyHTMLEmailRemedy = (data) => {
    let result = ''
    if (data.language === 'vi') {
        result = `
        <h3>Xin chào  ${data.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám trên hệ thống đặt lịch khám bệnh </p>
        <p>Thông tin đặt lịch khám bệnh đơn thuốc và hóa đơn được gửi trong file đính kèm</p>
        <div> Xin chân thành cảm ơn</div>
        `
    }
    if (data.language === 'en') {
        result = `
        <h3>Dear ${data.patientName}</h3>
        <p>You received this email because you booked an appointment on the appointment booking system </p>
        <p>Information to book a medical examination, prescription and invoice are sent in the attached file</p>
        <div>Sincerely thank</div>
        `
    }
    return result



}

let sendAttachment = async (data) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },

    });

    let info = await transporter.sendMail({
        from: '"Hệ thống đặt lịch khám bệnh 👻" <hiep.datn@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh✔", // Subject line  text: "Hello world?", // plain text body
        html: getBodyHTMLEmailRemedy(data),
        attachments: [
            {   // encoded string as an attachment
                filename: `remedy-${data.patientId}-${new Date().getTime()}.png`,
                content: data.imageBase64.split("base64,")[1],
                encoding: 'base64'
            },
        ]

    });

}

module.exports = {
    sendSimpleEmail,
    sendAttachment

}