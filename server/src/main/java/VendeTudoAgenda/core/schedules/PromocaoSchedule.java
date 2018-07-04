package VendeTudoAgenda.core.schedules;

import VendeTudoAgenda.core.repository.ContatoRepository;
import VendeTudoAgenda.core.services.EmailService;
import VendeTudoAgenda.domain.Contato;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PromocaoSchedule {

    @Autowired
    private ContatoRepository contatoRepository;
    private static final String TIME_ZONE = "America/Sao_Paulo";

    @Autowired
    private EmailService emailService;

    @Scheduled(cron = "0 0 12 * * FRI", zone = TIME_ZONE)
    public void enviarEmailPromocional() {
        List<Contato> contatos = contatoRepository.findAll();

        for (Contato contato : contatos) {
            if (contato.getAutorizaEmail()) {

                StringBuilder corpoEmail = new StringBuilder();
                corpoEmail.append("Aproveita a promoção cambada de pobre!");

                emailService.enviarEmail(contato.getEmail(), "Promoção", corpoEmail.toString());
            }
        }
    }
}
