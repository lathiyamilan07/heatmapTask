import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeatmapComponent } from './heatmap/heatmap.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeatmapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-heatmap';
}
