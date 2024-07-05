import { Component, Input } from '@angular/core';
import { HeatmapService } from './heatmap.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heatmap',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.scss'
})
export class HeatmapComponent {
  @Input() eventData: { timestamp: Date, intensity: number }[] = [];
  @Input() eventStream$: Observable<{ timestamp: Date, intensity: number }>;
  heatmapData: number[][] = [];
  startDate: Date;
  endDate: Date;
  minIntensity: number;
  maxIntensity: number;

  constructor(private heatmapService: HeatmapService) { }

  ngOnInit() {
    this.processData();
    if (this.eventStream$) {
      this.eventStream$.subscribe(event => {
        this.updateHeatmap(event);
      });
    }
  }

  processData() {
    this.heatmapData = this.heatmapService.processEventData(this.eventData);
  }

  updateHeatmap(event: { timestamp: Date, intensity: number }) {
    const timeSlot = this.heatmapService.getTimeSlot(event.timestamp);
    this.heatmapData[timeSlot.row][timeSlot.col] += event.intensity;
  }

  filterData() {
    const filteredData = this.eventData.filter(event => {
      const eventDate = new Date(event.timestamp);
      return (!this.startDate || eventDate >= new Date(this.startDate)) &&
        (!this.endDate || eventDate <= new Date(this.endDate)) &&
        (!this.minIntensity || event.intensity >= this.minIntensity) &&
        (!this.maxIntensity || event.intensity <= this.maxIntensity);
    });
    this.heatmapData = this.heatmapService.processEventData(filteredData);
  }

  getColor(value: number): string {
    const intensity = Math.min(value, 255);
    return `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
  }
}