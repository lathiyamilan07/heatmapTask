import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeatmapService {

  constructor() { }
  processEventData(eventData: { timestamp: Date, intensity: number }[]): number[][] {
    const grid: number[][] = this.initializeGrid();
    eventData.forEach(event => {
      const timeSlot = this.getTimeSlot(event.timestamp);
      grid[timeSlot.row][timeSlot.col] += event.intensity;
    });
    return grid;
  }

  initializeGrid(): number[][] {
    const rows = 7; 
    const cols = 30;
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.floor(Math.random() * 100))
    );
  }

  getTimeSlot(timestamp: Date): { row: number, col: number } {
    const date = new Date(timestamp);
    const row = date.getDay() % 7; 
    const col = date.getDate() % 30;
    return { row, col };
  }
}
