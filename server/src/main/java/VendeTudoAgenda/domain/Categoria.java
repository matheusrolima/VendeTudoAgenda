package VendeTudoAgenda.domain;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonRootName("categoria")
@Table(name = "categoria", uniqueConstraints = {@UniqueConstraint(columnNames = "nome")})
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "nome", nullable = false, unique = true)
    private String nome;

    @Override
    public String toString() {
        return "Categoria{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                '}';
    }

    public Categoria(final String nome) {
        this.nome = nome;
    }

}
