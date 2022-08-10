import nodemailer from "nodemailer";

const emailRegistro = async(datos) =>{

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port:   process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const  { email, nombre, token } = datos;
    //Enviar el Email

    const info = await transporter.sendMail({
        from: "APV - Administrador de Pacientes de Veterinario",
        to: email,
        subject: "Comprueba tu cuenta en APV",
        text: "Comprueba tu uenta en APV",
        html: `<p>Hola: ${nombre}, compureba tu cuenta en APV para empezar a generar citas. </p>
        
        <p>Tu cuenta ya esta lista, solo tienes que comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprueba tu Cuenta</a> </p>
        
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje </p>
        `
    });

    console.log("Mensaje enviado: %s", info.messageId);

}

export default emailRegistro;