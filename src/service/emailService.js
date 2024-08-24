require('dotenv').config();
import nodemailer from 'nodemailer'

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
            <h3>Xin chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Biện Nhật channel.</p>
            <p>Thông tin đặt lịch khám bệnh: </p>
            <div><b>Thời gian: ${dataSend.time}</b></p>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></p>
            <p>Nếu các thông tin trên là đúng sự thật, vui lòng Click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
            <div> <a href=${dataSend.redirectLink} target='_blank'> Click here </a> </div>
            <div> Xin chân thành cảm ơn </div>
        `;
    }
    else if (dataSend.language === 'en') {
        result = `
            <h3>Dear ${dataSend.patientName}!</h3>
            <p>You received this email because you booked an online medical appointment on Biện Nhật channel.</p>
            <p>Information to schedule an appointment: </p>
            <div><b>Time: ${dataSend.time}</b></p>
            <div><b>Doctor: ${dataSend.doctorName}</b></p>
            <p>If the above information is true, please click on the link below to confirm and complete the medical appointment.</p>
            <div> <a href=${dataSend.redirectLink} target='_blank'> Click here </a> </div>
            <div> Sincerely thank! </div>
        `;
    }
    return result;
}

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP, // email send
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: `"Bien Nhat deptrai" ${process.env.EMAIL_APP}`, // sender address
        to: dataSend.receiverEmail, // email receive
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend)
    });

}
module.exports = {
    sendSimpleEmail,

}