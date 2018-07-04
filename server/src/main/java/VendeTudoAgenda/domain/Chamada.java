package VendeTudoAgenda.domain;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonRootName("chamada")
@Table(name = "chamada")
public class Chamada {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "contato_id", nullable = false)
    private Contato contato;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "data", nullable = false)
    private Date data;

    @Column(name = "duracao", nullable = false)
    private Time duracao;

    @Column(name = "descricao", length = 2048, nullable = false)
    private String descricao;

    @Override
    public String toString() {
        return "Chamada{" +
                "nome='" + nome + '\'' +
                ", data=" + data +
                ", duracao=" + duracao +
                '}';
    }

    public Chamada(Contato contato, String nome, Date data, Time duracao, String descricao) {
        //olaaaaa
        //teste conflito
        this.contato = contato;
        this.nome = nome;
        this.data = data;
        this.duracao = duracao;
        this.descricao = descricao;
    }
}
