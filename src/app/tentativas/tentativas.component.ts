import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {Coracao} from '../shared/coracao.model'

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css']
})
export class TentativasComponent implements OnInit, OnChanges {
  // // property binding dos elementos da imagem
  // public coracaoVazio: string = '/assets/coracao_vazio.png'
  // public coracaoCheio: string = '/assets/coracao_cheio.png'

  @Input() public tentativas: number

  public coracoes: Array<Coracao> = [
    new Coracao(true),
    new Coracao(true),
    new Coracao(true), 
  ]

  constructor() { 

  }
  
  ngOnChanges(): void {
    if (this.tentativas !== this.coracoes.length) {
      let indice = this.coracoes.length - this.tentativas
      this.coracoes[indice - 1].cheio = false
    }
  }

  ngOnInit(): void {
  }


}
