package VendeTudoAgenda.domain.usuario;

import VendeTudoAgenda.core.repository.UsuarioRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

import static junit.framework.TestCase.assertTrue;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UsuarioTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    public void deve_salvar_e_buscar_usuario_pelo_nome() {
        // given
        Usuario usuario = new Usuario("admin", "11111111111", "vendetudoagenda@gmail.com", new Date(), "rua10", "38445654L", "985763251L", FuncaoUsuario.ADMINISTRADOR, "1234");
        entityManager.persist(usuario);
        entityManager.flush();

        // when
        Usuario usuarioBanco = usuarioRepository.findByName(usuario.getNome());

        // then
        assertTrue(usuarioBanco.getNome().equals("admin"));
    }

    @Test
    public void deve_salvar_e_buscar_usuario_pelo_email() {
        // given
        Usuario usuario = new Usuario("admin", "11111111111", "vendetudoagenda@gmail.com", new Date(), "rua10", "38445654L", "985763251L", FuncaoUsuario.ADMINISTRADOR, "1234");
        entityManager.persist(usuario);
        entityManager.flush();

        // when
        Usuario usuarioBanco = usuarioRepository.findByEmail("vendetudoagenda@gmail.com");

        // then
        assertTrue(usuarioBanco.getNome().equals("admin"));
    }

    @Test
    public void deve_salvar_e_editar_usuario() {
        // given
        Usuario usuario = new Usuario("admin", "11111111111", "vendetudoagenda@gmail.com", new Date(), "rua10", "38445654L", "985763251L", FuncaoUsuario.ADMINISTRADOR, "1234");
        entityManager.persist(usuario);
        entityManager.flush();

        // when
        usuario.setNome("NovoAdmin");
        entityManager.persist(usuario);
        entityManager.flush();

        // then
        Usuario usuarioBanco = usuarioRepository.findById(1L);
        assertTrue(usuarioRepository.findAll().size() == 1);
    }

    @Test
    public void deve_salvar_e_deletar_usuario() {
        // given
        Usuario usuario = new Usuario("admin", "11111111111", "vendetudoagenda@gmail.com", new Date(), "rua10", "38445654L", "985763251L", FuncaoUsuario.ADMINISTRADOR, "1234");
        entityManager.persist(usuario);
        entityManager.flush();

        // when
        usuarioRepository.delete(usuario);

        // then
        assertTrue(usuarioRepository.findAll().size() == 0);
    }


}