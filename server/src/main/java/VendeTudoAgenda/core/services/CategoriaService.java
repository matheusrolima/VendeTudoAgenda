package VendeTudoAgenda.core.services;

import VendeTudoAgenda.core.repository.CategoriaRepository;
import VendeTudoAgenda.domain.Categoria;
import org.springframework.beans.factory.annotation.Autowired;

public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public void update(Categoria categoria) {
        if (!"".equals(categoria.getNome())) {

        }
    }
}
