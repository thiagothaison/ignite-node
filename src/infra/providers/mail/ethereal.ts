import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { resolve } from "path";

import { IMailProvider, IVariable } from "@domain/contracts/providers/mail";
import { AppError } from "@domain/errors/app-error";

class EtherealProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        this.client = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
      })
      .catch((err) => {
        throw new AppError(err.message);
      });
  }

  async send(
    to: string,
    subject: string,
    template: string,
    variables: IVariable
  ) {
    const templatePath = resolve(
      process.cwd(),
      "src",
      "application",
      "views",
      "email",
      `${template}.hbs`
    );

    try {
      fs.statSync(templatePath);

      const templateContent = fs.readFileSync(templatePath).toString("utf-8");
      const templateParsed = handlebars.compile(templateContent);
      const templateHtml = templateParsed(variables);

      const message = await this.client.sendMail({
        to,
        from: "Rentx <noreply@rentx.com.br>",
        subject,
        html: templateHtml,
      });

      console.log("Message sent: %s", message.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
    } catch (err) {
      throw new AppError(`Template ${template} does not exists`);
    }
  }
}

export { EtherealProvider };
