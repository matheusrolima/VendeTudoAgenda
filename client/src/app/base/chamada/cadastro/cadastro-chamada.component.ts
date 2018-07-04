import {Component, Inject, OnInit} from '@angular/core';
import {ChamadaService} from '../chamada.service';
import {Chamada} from '../../modelo/Chamada.model';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {DOCUMENT} from '@angular/platform-browser';
import {Router} from '@angular/router';


@Component({
    selector: 'app-cadastro-chamada',
    templateUrl: './cadastro-chamada.component.html',
    styles: []
})
export class CadastroChamadaComponent implements OnInit {
    chamada: Chamada;
    configCalendario: any;
    msgs: Message[] = [];

    constructor(@Inject(DOCUMENT) private document: Document,
                private chamadaService: ChamadaService,
                private messageService: MessageService,
                private router: Router) {

        this.chamada = new Chamada();
        this.configCalendario = this.configCalander();
    }

    ngOnInit() {
    }

    salvar() {
        this.chamadaService.salvar(this.chamada).subscribe(result => {
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'Service Message', detail:'Dados salvos com sucesso!'});
            this.chamada = new Chamada();
        }, error => {
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error Message', detail: 'Não possui contato cadastrado com esse nome!'});
        });
    }

    voltarTelaPrincipal(): void{
        this.router.navigate(['/principal']);
    }

    voltar(){
        this.router.navigate(['/principal'])
    }

    private configCalander() {
        return {
            closeText: 'Fechar',
            prevText: 'Anterior',
            nextText: 'Próximo',
            currentText: 'Começo',
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            weekHeader: 'Semana',
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: '',
            timeOnlyTitle: 'Só Horas',
            timeText: 'Tempo',
            hourText: 'Hora',
            minuteText: 'Minuto',
            secondText: 'Segundo',
            ampm: false,
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
            allDayText: 'Todo o Dia'
        };
    }



}
