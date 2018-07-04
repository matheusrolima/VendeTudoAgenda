package VendeTudoAgenda;

import VendeTudoAgenda.core.repository.CategoriaRepository;
import VendeTudoAgenda.core.repository.ChamadaRepository;
import VendeTudoAgenda.core.repository.ContatoRepository;
import VendeTudoAgenda.core.repository.UsuarioRepository;
import VendeTudoAgenda.domain.Categoria;
import VendeTudoAgenda.domain.Chamada;
import VendeTudoAgenda.domain.Contato;
import VendeTudoAgenda.domain.usuario.FuncaoUsuario;
import VendeTudoAgenda.domain.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.sql.Time;
import java.util.Date;

@Component
public class PopulateBancoLimpo implements ApplicationRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private ContatoRepository contatoRepository;
    @Autowired
    private ChamadaRepository chamadaRepository;

    /* POPULATE BANCO LIMPO
     * Caso queira rodar o populate banco limpo, colocar true nesta variável
     * Observação 1: Colocar create-drop em application.properties
     * Observação 2: NÃO COLOCAR TRUE QUANDO ESTIVER USANDO O BANCO ONLINE
     * */
    private static final boolean RODAR_POPULATE_LIMPO = true;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        if (RODAR_POPULATE_LIMPO) {

            Usuario usuario = new Usuario("admin", "11111111111", "vendetudoagenda@gmail.com", new Date(), "rua10", "(62)3333-3333", "(62)99999-9999", FuncaoUsuario.ADMINISTRADOR, "1234");
            incluirUsuario(usuario);

            incluirUsuario(new Usuario("admin1", "22222222222", "vendetudoagend@gmail.com", new Date(), "rua10", "(62)3333-3333", "(62)99999-9999", FuncaoUsuario.ADMINISTRADOR, "12345"));
            incluirUsuario(new Usuario("admin2", "333", "vendetudoagen@gmail.com", new Date(), "rua10", "(62)3333-3333", "(62)99999-9999", FuncaoUsuario.ADMINISTRADOR, "54321"));
            incluirUsuario(new Usuario("admin3", "44444", "vendetudoage@gmail.com", new Date(), "rua10", "(62)3333-3333", "(62)99999-9999", FuncaoUsuario.ADMINISTRADOR, "1234"));
            incluirUsuario(new Usuario("admin4", "55555", "vendetudoag@gmail.com", new Date(), "rua10", "(62)3333-3333", "(62)99999-9999", FuncaoUsuario.ADMINISTRADOR, "555857"));
            incluirUsuario(new Usuario("admin5", "66666", "vendetudoa@gmail.com", new Date(), "rua10", "(62)3333-3333", "(62)99999-9999", FuncaoUsuario.ADMINISTRADOR, "1234"));
            incluirUsuario(new Usuario("admin6", "777777", "vendetudo@gmail.com", new Date(), "rua10", "(62)3333-3333", "(62)99999-9999", FuncaoUsuario.ADMINISTRADOR, "1234"));

            incluirUsuario(new Usuario("vendedor", "7777877", "vendedor@vendedor.com", new Date(), "rua10", "(62)3333-3333", "(62)99999-9999", FuncaoUsuario.VENDEDOR, "1234"));

            Categoria categoria = new Categoria("PESSOA JURIDICA");
            categoria = incluirCategoria(categoria);
            categoria = new Categoria("PESSOA FISICA");
            categoria = incluirCategoria(categoria);

            Contato contato = new Contato(categoria, usuario, "Joao", "11111111111", null, "joao@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 1);
            contato = incluirContato(contato);

            incluirContato(new Contato(categoria, usuario, "Joao1", "00000000000", null, "joa1o@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao2", "22222222222", null, "joao1@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao3", "33333333333", null, "joa2o@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao4", "44444444444", null, "j54oao@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao5", "55555555555", null, "joa24o@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao6", "66666666666", null, "jo456ao@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao7", "77777777777", null, "joa6546o@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao8", "88888888888", null, "joa456o@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao9", "99999999999", null, "joa546o@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao10", "1010101010", null, "jo4647ao@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao11", "1212121212", null, "joa87678o@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao12", "1313131313", null, "joaetgo@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao13", "1414141414", null, "jorerao@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao14", "1515151515", null, "joadsdo@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao15", "1616161616", null, "joqazao@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao16", "1717171717", null, "jogtgao@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao17", "1818181818", null, "josdfao@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao18", "1919191919", null, "johhyao@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao20", "2020202020", null, "joaazo@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));
            incluirContato(new Contato(categoria, usuario, "Joao19", "2121212121", null, "joajuo@email", new Date(), "rua12", "(62)3333-3333", "(62)99999-9999", true, 0));

            Chamada chamada = new Chamada(contato, "Chamada - 1", new Date(), new Time(System.currentTimeMillis()), "Descricao da Chamada");
            incluirChamada(chamada);
        }
    }

    private void incluirUsuario(Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    private Categoria incluirCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    private Contato incluirContato(Contato contato) {
        return contatoRepository.save(contato);
    }

    private void incluirChamada(Chamada chamada) {
        chamadaRepository.save(chamada);
    }

}
