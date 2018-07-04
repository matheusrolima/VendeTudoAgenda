package VendeTudoAgenda.api.controller;

import VendeTudoAgenda.core.repository.UsuarioRepository;
import VendeTudoAgenda.domain.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UsuarioController {

    private UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/usuarios")
    public void criarUsuario(@RequestBody Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    @GetMapping("/usuarios/{id}")
    public Usuario obterUsuario(@PathVariable Long id) {
        return usuarioRepository.findById(id);
    }

    @DeleteMapping("/usuarios/{id}")
    public void deletarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id);
        usuarioRepository.delete(usuario);
    }

    @GetMapping("/usuarios")
    public ResponseEntity listarUsuario() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    @PatchMapping("/usuarios/{id}")
    public ResponseEntity alterarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        Usuario usuarioDB = usuarioRepository.findById(id);

        if (usuario.getNome() == null) {
            usuario.setNome(usuarioDB.getNome());
        }
        if (usuario.getCpf() == null) {
            usuario.setCpf(usuarioDB.getCpf());
        }
        if (usuario.getEmail() == null) {
            usuario.setEmail(usuarioDB.getEmail());
        }
        if (usuario.getDataNascimento() == null) {
            usuario.setDataNascimento(usuarioDB.getDataNascimento());
        }
        if (usuario.getEndereco() == null) {
            usuario.setEndereco(usuarioDB.getEndereco());
        }
        if (usuario.getTelefoneFixo() == null) {
            usuario.setTelefoneFixo(usuarioDB.getTelefoneFixo());
        }
        if (usuario.getCelular() == null) {
            usuario.setCelular(usuarioDB.getCelular());
        }
        if (usuario.getFuncao() == null) {
            usuario.setFuncao(usuarioDB.getFuncao());
        }
        if (usuario.getSenha() == null) {
            usuario.setSenha(usuarioDB.getSenha());
        }

        usuarioRepository.save(usuario);
        return new ResponseEntity(HttpStatus.OK);

    }

}

