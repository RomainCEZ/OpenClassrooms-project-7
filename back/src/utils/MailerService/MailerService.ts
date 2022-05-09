import * as nodemailer from "nodemailer"
import { Injectable } from "@nestjs/common";
import { User } from "../../users/entities/User";

@Injectable()
export class MailerService {
  private readonly transporter = this.createTransporter()

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
        text: `Si ce message ne s'affiche pas correctement, copiez l'adresse suivant dans la barre de recherche de votre navigateur pour réinitialiser votre mot de passe : ${link}`,
        html: `<h3>Bonjour, ${user.username} !</h3><br/>
                  <p>Vous avez demandé la réinitialisation de votre mot de passe sur Groupomania Socials.</p>
                  <p><a href=${link}>Cliquez ici pour réinitialiser votre mot de passe !</a></p><br/>
                  <p>Merci d'utiliser notre réseau !</p>
                  <p>Cordialement, l'équipe Groupomania Socials.</p>`
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