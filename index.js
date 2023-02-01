const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
const fs = require('fs');
const fsAs = require('fs').promises;

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/mail', async (req, res) => {

  /* let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  let mailToSent = await generateMail(req.params.companies);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "This is an HTML e-mail, if you see this, please allow your client to load the HTML", // plain text body
    html: mailToSent
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.status(200).send({"message": "Success!"}); */
  
  let output = await generateMail(req.params.companies);
  fs.writeFile('output.html', output, (err) => {
    if(err) throw err;
  })
  res.status(200).send({"message": "Success!"});
});

async function generateMail (companies) {
  let htmlTemplate;
  let tempSum = "";

  htmlTemplate = await fsAs.readFile('./mail-template/index.html', 'UTF-8');

  //console.log(htmlTemplate);

  tempSum = htmlTemplate.split("<!--HEREPRODUCTS-->");
tempSum[1] = `<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> 
<tbody> 
  <tr> 
    <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 20px;font-family:'Lato',sans-serif;" align="left"> 
      
<div style="color: #303030; line-height: 120%; text-align: left; word-wrap: break-word;"> 
  <p style="font-size: 14px; line-height: 120%;">EEEEE Το εβαλα απο δω!</p> 
</div> 

    </td> 
  </tr> 
</tbody> 
</table>` + tempSum[1];

htmlTemplate = tempSum[0] + tempSum[1] + "";
tempSum = htmlTemplate.split("<!--HERENUMBERS-->");

tempSum[1] = `\n<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 20px;font-family:'Lato',sans-serif;" align="left">
      
<div style="color: #303030; line-height: 120%; text-align: left; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 120%;">18</p>
</div>

    </td>
  </tr>
</tbody>
</table>\n` + tempSum[1];

htmlTemplate = tempSum[0] + tempSum[1] + "";
tempSum = htmlTemplate.split("<!--HERECOMMENTS-->");

tempSum[1] = `\n <p style="font-size: 14px; line-height: 140%;">EEEEEE EGV TO EVALA AUTO.</p>\n` + tempSum[1];

htmlTemplate = tempSum[0] + tempSum[1] + "";
tempSum = htmlTemplate.split("<!--HERENAME-->");

tempSum[1] = `<p style="font-size: 14px; line-height: 120%; text-align: center;"><span style="font-size: 20px; line-height: 24px;">ALOOOOOBITCHES.</span></p>` + tempSum[1];

htmlTemplate = tempSum[0] + tempSum[1] + "";
return htmlTemplate;

}

app.listen(4000, () => {
  console.log(`Example app listening on port 4000`);
});
