package VendeTudoAgenda.core.schedules;

import VendeTudoAgenda.core.repository.UsuarioRepository;
import VendeTudoAgenda.core.services.EmailService;
import VendeTudoAgenda.domain.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.List;


@Component
public class AniversarioSchedule {

    @Autowired
    private UsuarioRepository usuarioRepository;
    private static final String TIME_ZONE = "America/Sao_Paulo";

    @Autowired
    private EmailService emailService;

    @Scheduled(cron = "0 0 12 * * *", zone = TIME_ZONE)
    public void enviarEmailAniversario() {
        List<Usuario> usuarios = usuarioRepository.findAll();

        StringBuilder templateCorpoEmail = new StringBuilder(", a Vende Tudo LTDA te deseja um Feliz Aniversário e muito sucesso em sua vida.")
                .append(" Aproveite o seu dia e garanta as promoções exclusivas para aniversariantes!");

        for (Usuario usuario : usuarios) {
            if (isAniversario(usuario.getDataNascimento())) {
                StringBuilder corpoEmail = new StringBuilder(usuario.getNome());
                corpoEmail.append(templateCorpoEmail);
                emailService.enviarEmail(usuario.getEmail(), "Feliz Aniversário!", corpoEmail.toString());
            }
        }
    }

    private boolean isAniversario(Date aniversario) {
        Calendar calendarHoje = Calendar.getInstance();
        calendarHoje.setTime(new Date());

        Calendar calendarAniversario = Calendar.getInstance();
        calendarAniversario.setTime(aniversario);

        return (calendarHoje.get(Calendar.MONTH) == calendarAniversario.get(Calendar.MONTH) &&
                calendarHoje.get(Calendar.DAY_OF_MONTH) == calendarAniversario.get(Calendar.DAY_OF_MONTH));
    }
}
