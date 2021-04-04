import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {
  // Adicionando o conteudo de frases-mock
  public frases: Array<Frase> = FRASES
  // Adicionando a instrucao
  public instrucao: string = 'Traduza a frase: '
  public resposta: string = ''
  public rodada: number = 0
  public rodadaFrase: Frase
  
  public progresso: number = 0

  public tentativas: number = 3

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizaRodada()
  }

  ngOnDestroy(): void {
    
  }
  
  public atualizaRodada(): void {
    // define a frase da rodada
    this.rodadaFrase = this.frases[this.rodada]
    // limpa o texto no text area
    this.resposta = ''
  }

  // evento para ouvir o textarea
  public atualizarResposta(resposta: Event): void {
    this.resposta = ( (<HTMLInputElement>resposta.target).value)
  }

  public verificarResposta(): void {
    if (this.rodadaFrase.frasePtBr === this.resposta){
      // trocar pergunta da rodada
      this.rodada++
      
      // Progresso
      this.progresso = this.progresso + (100 / this.frases.length)
      
      // Lógica de vitória
      if (this.rodada === 4 ){
        this.encerrarJogo.emit('vitoria')
      }

      // Atualização de rodada
      this.atualizaRodada()
    } 
    
    else {
      // diminuir a variável de tentativas
      this.tentativas--

      if(this.tentativas === - 1){
        this.encerrarJogo.emit('derrota')
      }
    }
    
  }

  ngOnInit(): void {
  }

}
