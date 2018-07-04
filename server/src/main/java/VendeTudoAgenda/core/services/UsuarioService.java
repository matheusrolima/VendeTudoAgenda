package VendeTudoAgenda.core.services;

import java.util.UUID;

public class UsuarioService {

    public static String gerarSenhaAleatoria() {
        UUID uuid = UUID.randomUUID();
        String senhaNova = uuid.toString();
        return senhaNova.substring(0, 6);
    }


}
