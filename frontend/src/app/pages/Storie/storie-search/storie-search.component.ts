import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
// ✅ Importa los módulos de Angular Material necesarios
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-storie-search',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './storie-search.component.html',
  styleUrl: './storie-search.component.css'
})
export class StorieSearchComponent {
  faFolder = faFolder;

  // 🧾 Datos de ejemplo
  dataSource = [
    {
      historia: 'HC-001',
      nombre: 'Juan Pérez',
      tipo: 'Digital',
      documento: 'Historia Clínica General',
      formato: 'PDF',
      digitalizador: 'Ana Torres',
      fecha: '2025-10-15',
      almacen: 'A1',
      anaquel: '3',
      numeroCaja: '12'
    },
    {
      historia: 'HC-002',
      nombre: 'María López',
      tipo: 'Físico',
      documento: 'Examen Laboratorio',
      formato: 'JPG',
      digitalizador: 'Carlos Vega',
      fecha: '2025-10-12',
      almacen: 'B2',
      anaquel: '1',
      numeroCaja: '8'
    },
    {
      historia: 'HC-003',
      nombre: 'Luis Gutiérrez',
      tipo: 'Digital',
      documento: 'Ecografía',
      formato: 'PDF',
      digitalizador: 'Sofía Ramos',
      fecha: '2025-10-13',
      almacen: 'C1',
      anaquel: '2',
      numeroCaja: '5'
    }
  ];

  displayedColumns: string[] = [
    'historia',
    'nombre',
    'tipo',
    'documento',
    'formato',
    'digitalizador',
    'fecha',
    'ubicacion'
  ];

  modalAbierto = false;
  historiaSeleccionada: any = {};

  abrirUbicacion(element: any) {
    this.historiaSeleccionada = element;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }
}
