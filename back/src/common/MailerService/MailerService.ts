import * as nodemailer from "nodemailer"
// import * as handlebars from "handlebars"
// import * as fs from "fs"
// import * as path from "path";
import { Injectable } from "@nestjs/common";
import { User } from "../../users/entities/User";

@Injectable()
export class MailerService {
  private transporter = this.createTransporter()
  // private source = fs.readFileSync(path.join(__dirname, "./template/requestpasswordreset.handlebars"), "utf8");
  // private compiledTemplate = handlebars.compile(this.source);

  private createTransporter() {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    return transporter
  }
  async sendPasswordRestEmail(user: User, resetToken: string) {
    const link = `${process.env.CLIENT_ADDRESS}/login/resetpassword?token=${resetToken}&id=${user.id}`;
    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: user.email,
        subject: "Réinitialisation de votre mot de passe Groupomania Socials",
        text: "Hello world?",
        html: `<span>Cliquez ici pour réinitialiser votre mot de passe : <a>${link}</a></span>`
      };
    };
    this.transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log(info)
      }
    })
  }
}