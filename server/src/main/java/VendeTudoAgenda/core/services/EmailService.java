package VendeTudoAgenda.core.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private JavaMailSender javaMailSender;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void enviarEmail(String to, String assunto, String text) throws MailException {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(to);
        simpleMailMessage.setFrom("vendetudoagenda@gmail.com");
        simpleMailMessage.setSubject(assunto);
        simpleMailMessage.setText(text);

        javaMailSender.send(simpleMailMessage);
    }

}
