package VendeTudoAgenda.core.repository;

import VendeTudoAgenda.domain.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Query("SELECT u FROM Usuario u WHERE u.id =:id ")
    Usuario findById(@Param("id") Long id);

    @Query("SELECT u FROM Usuario u WHERE LOWER(u.email)=LOWER(:email) ")
    Usuario findByEmail(@Param("email") String email);

    @Query("SELECT u FROM Usuario u WHERE LOWER(u.nome)=LOWER(:nome) ")
    Usuario findByName(@Param("nome") String nome);

}