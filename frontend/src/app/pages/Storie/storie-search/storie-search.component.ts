import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-storie-search',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './storie-search.component.html',
  styleUrl: './storie-search.component.css'
})
export class StorieSearchComponent {

}
