package VendeTudoAgenda.core.repository;

import VendeTudoAgenda.domain.Contato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContatoRepository extends JpaRepository<Contato, Long> {

    @Query("SELECT c FROM Contato c WHERE c.id=:id ")
    Contato findById(@Param("id") Long id);

    @Query("SELECT c FROM Contato c WHERE LOWER(c.nome)=LOWER(:nome) ")
    Contato findByName(@Param("nome") String nome);

    @Query("SELECT c FROM Contato c WHERE c.cpf=:cpf")
    Contato findByCpf(@Param("cpf") String cpf);

    @Query("SELECT c FROM Contato c WHERE c.cnpj=:cnpj")
    Contato findByCnpj(@Param("cnpj") String cnpj);

    @Query("SELECT c FROM Contato c WHERE LOWER(c.email)=LOWER(:email) ")
    Contato findByEmail(@Param("email") String email);

}
