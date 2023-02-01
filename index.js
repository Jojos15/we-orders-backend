const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
const path = require('path');
const fsAs = require('fs').promises;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'we-orders-new/build')));

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/we-orders-new/build/index.html'))
});

app.post('/api/mail', async (req, res) => {

  let testAccount = await nodemailer.createTestAccount();

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

  let mailToSent = await generateMail(req.body.companies);

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

  res.status(200).send({"message": "Success!"});

  /* console.log(req.body);
  let output = await generateMail(req.body.companies);
  fs.writeFile('output.html', output, (err) => {
    if (err) throw err;
  })
  res.status(200).send({ "message": "Success!" }); */
});

async function generateMail(companies) {
  let htmlTemplate;
  let tempSum = "";
  let products = companies.products

  htmlTemplate = await fsAs.readFile('./mail-template/index.html', 'UTF-8');

  //console.log(htmlTemplate);

  tempSum = htmlTemplate.split("<!--HEREPRODUCTS-->");
  products.forEach(element => {
    tempSum[1] = `<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> 
<tbody> 
  <tr> 
    <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 20px;font-family:'Lato',sans-serif;" align="left"> 
      
<div style="color: #303030; line-height: 120%; text-align: left; word-wrap: break-word;"> 
  <p style="font-size: 14px; line-height: 120%;">${element.id} | ${element.name}</p> 
</div> 

    </td> 
  </tr> 
</tbody> 
</table>\n` + tempSum[1];
  });


  htmlTemplate = tempSum[0] + tempSum[1] + "";
  tempSum = htmlTemplate.split("<!--HERENUMBERS-->");

  products.forEach(element => {
    tempSum[1] = `\n<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 20px;font-family:'Lato',sans-serif;" align="left">
      
<div style="color: #303030; line-height: 120%; text-align: left; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 120%;">${element.quantity}</p>
</div>

    </td>
  </tr>
</tbody>
</table>\n` + tempSum[1];
  })

  htmlTemplate = tempSum[0] + tempSum[1] + "";
  tempSum = htmlTemplate.split("<!--HERECOMMENTS-->");

  tempSum[1] = `\n <p style="font-size: 14px; line-height: 140%;">${companies.comments}</p>\n` + tempSum[1];

  htmlTemplate = tempSum[0] + tempSum[1] + "";
  tempSum = htmlTemplate.split("<!--HERENAME-->");

  tempSum[1] = `<p style="font-size: 14px; line-height: 120%; text-align: center;"><span style="font-size: 20px; line-height: 24px;">Καλησπέρα ${companies.company}</span></p>` + tempSum[1];

  htmlTemplate = tempSum[0] + tempSum[1] + "";
  return htmlTemplate;

}

app.listen(4000, () => {
  console.log(`Example app listening on port 4000`);
});
