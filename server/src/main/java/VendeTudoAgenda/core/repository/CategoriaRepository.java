package VendeTudoAgenda.core.repository;

import VendeTudoAgenda.domain.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    @Query("SELECT c FROM Categoria c WHERE LOWER(c.id)=LOWER(:id) ")
    Categoria findById(@Param("id") Long id);

    @Query("SELECT c FROM Categoria c WHERE LOWER(c.nome)=LOWER(:nome) ")
    Categoria findByName(@Param("nome") String nome);
}
