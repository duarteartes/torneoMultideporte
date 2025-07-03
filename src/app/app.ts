import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Header], // Sin HttpClientModule
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'torneoMultideporte';
}