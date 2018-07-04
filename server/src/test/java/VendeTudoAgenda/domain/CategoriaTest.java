package VendeTudoAgenda.domain;

import VendeTudoAgenda.core.repository.CategoriaRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static junit.framework.Assert.assertNull;
import static junit.framework.TestCase.assertTrue;

@RunWith(SpringRunner.class)
@DataJpaTest
public class CategoriaTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Test
    public void deve_salvar_e_buscar_categoria_pelo_nome() {
        // given
        Categoria categoria = new Categoria("TESTE");
        entityManager.persist(categoria);
        entityManager.flush();

        // when
        Categoria categoriaBanco = categoriaRepository.findByName(categoria.getNome());

        // then
        assertTrue(categoriaBanco.getNome().equals("TESTE"));
    }

    @Test
    public void deve_salvar_e_deletar_categoria_pelo_nome() {
        // given
        Categoria categoria = new Categoria("TESTE");
        entityManager.persist(categoria);
        entityManager.flush();

        // when
        categoriaRepository.delete(categoria);

        // then
        Categoria categoriaBanco = categoriaRepository.findByName("TESTE");
        assertNull(categoriaBanco);
    }

    @Test
    public void deve_salvar_e_editar_categoria() {
        // given
        Categoria categoria = new Categoria("TESTE");
        entityManager.persist(categoria);
        entityManager.flush();

        // when
        categoria.setNome("NOVOTESTE");
        entityManager.persist(categoria);
        entityManager.flush();

        // then
        List<Categoria> categoriaList = categoriaRepository.findAll();
        assertTrue(categoriaList.size() == 1);
    }

}