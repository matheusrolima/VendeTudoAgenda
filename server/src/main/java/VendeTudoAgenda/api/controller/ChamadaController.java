package VendeTudoAgenda.api.controller;

import VendeTudoAgenda.core.repository.ChamadaRepository;
import VendeTudoAgenda.core.repository.ContatoRepository;
import VendeTudoAgenda.domain.Chamada;
import VendeTudoAgenda.domain.Contato;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ChamadaController {

    private ChamadaRepository chamadaRepository;
    private ContatoRepository contatoRepository;

    @Autowired
    public ChamadaController(ChamadaRepository chamadaRepository, ContatoRepository contatoRepository) {
        this.chamadaRepository = chamadaRepository;
        this.contatoRepository = contatoRepository;
    }

    @PostMapping("/chamadas")
    public ResponseEntity criarChamada(@RequestBody Chamada chamada) {
        Contato contato = contatoRepository.findByName(chamada.getNome());

        if (contato == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);

        } else {

            if (contato.getQuantidadeLigacoes() == null || contato.getQuantidadeLigacoes() == 0) {
                contato.setQuantidadeLigacoes(1);
            } else {
                Integer quantidadeLigacoes = contato.getQuantidadeLigacoes();
                contato.setQuantidadeLigacoes(++quantidadeLigacoes);
            }

            chamada.setContato(contato);
        }

        contatoRepository.save(contato);
        chamadaRepository.save(chamada);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/chamadas/{id}")
    public Chamada obterChamada(@PathVariable Long id) {
        return chamadaRepository.findById(id);
    }

    @DeleteMapping("/chamadas/{id}")
    public void deletarChamada(@PathVariable Long id) {
        Chamada chamada = chamadaRepository.findById(id);

        Contato contato = contatoRepository.findById(chamada.getContato().getId());

        Integer quantidadeLigacoes = contato.getQuantidadeLigacoes();
        contato.setQuantidadeLigacoes(--quantidadeLigacoes);

        contatoRepository.save(contato);
        chamadaRepository.delete(chamada);
    }

    @GetMapping("/chamadas")
    public ResponseEntity listarChamadas() {
        return ResponseEntity.ok(chamadaRepository.findAll());
    }

    @PatchMapping("/chamadas/{id}")
    public ResponseEntity alterarChamada(@PathVariable Long id, @RequestBody Chamada chamada) {
        Chamada chamadaDB = chamadaRepository.findById(id);

        if (chamada.getNome() == null) {
            chamada.setNome(chamadaDB.getNome());
        }
        if (chamada.getData() == null) {
            chamada.setData(chamadaDB.getData());
        }
        if (chamada.getDuracao() == null) {
            chamada.setDuracao(chamadaDB.getDuracao());
        }
        if (chamada.getDescricao() == null) {
            chamada.setDescricao(chamadaDB.getDescricao());
        }

        chamadaRepository.save(chamada);
        return new ResponseEntity(HttpStatus.OK);
    }
}
