import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from './header/header';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Header, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  protected title = 'torneo Multideporte';
}