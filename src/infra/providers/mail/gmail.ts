import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { resolve } from "path";

import { IMailProvider, IVariable } from "@domain/contracts/providers/mail";
import { AppError } from "@domain/errors/app-error";

class GmailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      port: +process.env.MAIL_PORT,
      host: process.env.MAIL_HOST,
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

      await this.client.sendMail({
        to,
        from: "Rentx <rentxignitesample@gmail.com>",
        subject,
        html: templateHtml,
      });
    } catch (err) {
      throw new AppError(`Template ${template} does not exists`);
    }
  }
}

export { GmailProvider };
