package VendeTudoAgenda.domain;

import VendeTudoAgenda.core.repository.ChamadaRepository;
import VendeTudoAgenda.domain.usuario.FuncaoUsuario;
import VendeTudoAgenda.domain.usuario.Usuario;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Time;
import java.util.Date;

import static junit.framework.TestCase.assertTrue;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ChamadaTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ChamadaRepository chamadaRepository;

    private Contato contato;

    @Before
    public void setUp(){
        Categoria categoria = new Categoria("PESSOA JURIDICA");
        entityManager.persist(categoria);

        Usuario usuario = new Usuario("admin", "11111111111", "vendetudoagenda@gmail.com", new Date(), "rua10", "38445654L", "985763251L", FuncaoUsuario.ADMINISTRADOR, "1234");
        entityManager.persist(usuario);

        contato = new Contato(categoria, usuario, "Joao", "11111111111", null, "joao@email", new Date(), "rua12", "123132132L", "3522625L", true, 0);
        entityManager.persist(contato);
        entityManager.flush();
    }

    @Test
    public void deve_salvar_e_buscar_chamada_pelo_id() {
        // given
        Chamada chamada = new Chamada(contato, contato.getNome(), new Date(), new Time(10), "descricao");
        entityManager.persist(chamada);
        entityManager.flush();

        // when
        Chamada chamadaBanco = chamadaRepository.findById(chamada.getId());

        // then
        assertTrue(chamadaBanco.getNome().equals(contato.getNome()));
    }
}