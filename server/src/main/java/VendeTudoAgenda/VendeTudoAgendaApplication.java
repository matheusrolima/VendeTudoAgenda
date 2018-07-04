package VendeTudoAgenda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class VendeTudoAgendaApplication {

    public static void main(String[] args) {
        SpringApplication.run(VendeTudoAgendaApplication.class, args);
    }


}
