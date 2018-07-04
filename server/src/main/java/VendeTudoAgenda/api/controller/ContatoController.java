package VendeTudoAgenda.api.controller;

import VendeTudoAgenda.core.repository.ContatoRepository;
import VendeTudoAgenda.domain.Contato;
import org.apache.commons.codec.binary.Base64;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
public class ContatoController {

    private ContatoRepository contatoRepository;

    @Autowired
    public ContatoController(ContatoRepository contatoRepository) {
        this.contatoRepository = contatoRepository;
    }

    @PostMapping("/contatoes/nome")
    public ResponseEntity buscarContatosNome(@RequestBody String nome) {
        Contato contato = contatoRepository.findByName(nome);
        return contato != null ? ResponseEntity.ok(contato) : ResponseEntity.notFound().build();
    }

    @GetMapping("/contatoes/cpf/{cpf}")
    public ResponseEntity buscarContatosCpf(@PathVariable String cpf) {
        Contato contato = contatoRepository.findByCpf(cpf);
        return contato != null ? ResponseEntity.ok(contato) : ResponseEntity.notFound().build();
    }

    @GetMapping("/contatoes/cnpj/{cnpj}")
    public ResponseEntity buscarContatosCnpj(@PathVariable String cnpj) {
        Contato contato = contatoRepository.findByCnpj(cnpj);
        return contato != null ? ResponseEntity.ok(contato) : ResponseEntity.notFound().build();
    }

    @GetMapping("/contatoes/email/{email}")
    public ResponseEntity buscarContatosEmail(@PathVariable String email) {
        Contato contato = contatoRepository.findByEmail(email);
        return contato != null ? ResponseEntity.ok(contato) : ResponseEntity.notFound().build();
    }


    @PostMapping("/contatoes")
    public void criarContato(@RequestBody Contato contato) {
        contatoRepository.save(contato);
    }

    @GetMapping("/contatoes/{id}")
    public Contato obterContato(@PathVariable Long id) {
        return contatoRepository.findOne(id);
    }

    @DeleteMapping("/contatoes/{id}")
    public void deletarContato(@PathVariable Long id) {
        Contato contato = contatoRepository.findById(id);
        contatoRepository.delete(contato);
    }

    @GetMapping("/contatoes")
    public ResponseEntity listarContatos() {
        return ResponseEntity.ok(contatoRepository.findAll());
    }

    @GetMapping("/contatosListagem")
    public ResponseEntity listarContatosListagem() {
        JSONArray body = new JSONArray();
        List<Contato> contatos = contatoRepository.findAll(new Sort(Sort.Direction.ASC, "nome"));

        for (Contato contato : contatos) {
            JSONObject linha = new JSONObject();
            linha.put("id", contato.getId());
            linha.put("nome", contato.getNome());
            linha.put("cpf", contato.getCpf());
            linha.put("cnpj", contato.getCnpj());
            linha.put("categoria", contato.getCategoria().getNome());
            linha.put("ligacoes", contato.getQuantidadeLigacoes());
            body.put(linha);
        }

        return ResponseEntity.ok(body.toList());
    }

    @PatchMapping("/contatoes/{id}")
    public ResponseEntity alterarContato(@PathVariable Long id, @RequestBody Contato contato) {
        Contato contatoDB = contatoRepository.findById(id);
        contato.setId(id);

        if (contato.getNome() == null) {
            contato.setNome(contatoDB.getNome());
        }
        if (contato.getCpf() == null) {
            contato.setCpf(contatoDB.getCpf());
        }
        if (contato.getCnpj() == null) {
            contato.setCnpj(contatoDB.getCnpj());
        }
        if (contato.getEmail() == null) {
            contato.setEmail(contatoDB.getEmail());
        }
        if (contato.getDataNascimento() == null) {
            contato.setDataNascimento(contatoDB.getDataNascimento());
        }
        if (contato.getEndereco() == null) {
            contato.setEndereco(contatoDB.getEndereco());
        }
        if (contato.getTelefoneFixo() == null) {
            contato.setTelefoneFixo(contatoDB.getTelefoneFixo());
        }
        if (contato.getCelular() == null) {
            contato.setCelular(contatoDB.getCelular());
        }
        if (contato.getAutorizaEmail() == null) {
            contato.setAutorizaEmail(contatoDB.getAutorizaEmail());
        }
        if (contato.getCategoria() == null) {
            contato.setCategoria(contatoDB.getCategoria());
        }
        if (contato.getUsuario() == null) {
            contato.setUsuario(contatoDB.getUsuario());
        }

        contatoRepository.save(contato);
        return (new ResponseEntity(HttpStatus.OK));
    }

    @GetMapping(value = "/gerarRelatorio", produces = "application/xls")
    public ResponseEntity getExcel() {
        try {

            List<Contato> contatos = contatoRepository.findAll(new Sort(Sort.Direction.ASC, "nome"));

            HSSFWorkbook workbook = new HSSFWorkbook();
            HSSFSheet sheet = workbook.createSheet("Relatório de Contatos");

            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Nome");
            header.createCell(1).setCellValue("Categoria");
            header.createCell(2).setCellValue("Quantidade de Ligações");

            int rowCount = 1;

            for (Contato contato : contatos) {
                Row userRow = sheet.createRow(rowCount++);
                userRow.createCell(0).setCellValue(contato.getNome());
                userRow.createCell(1).setCellValue(contato.getCategoria().getNome());
                userRow.createCell(2).setCellValue(contato.getQuantidadeLigacoes());

            }

            HttpHeaders headers = new HttpHeaders();
            File desktopDir = new File(System.getProperty("user.home"), "Desktop");

            if (desktopDir.exists()) {
                String pathToDesktop = desktopDir.getPath();
                FileOutputStream fileOut = new FileOutputStream(pathToDesktop + "\\contatos.xls");
                workbook.write(fileOut);
                fileOut.close();

                return (new ResponseEntity("", headers, HttpStatus.OK));

            } else {

                ByteArrayOutputStream bos = new ByteArrayOutputStream();
                workbook.write(bos);
                byte[] bytes = bos.toByteArray();

                byte[] bytes64 = Base64.encodeBase64(bytes);
                String base64 = new String(bytes64);

                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"contatos.xls\"");

                return (new ResponseEntity(base64, headers, HttpStatus.OK));
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.badRequest().build();

    }

}
