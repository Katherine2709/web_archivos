// src/app/data-exchange/data-exchange.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Importamos DatePipe
import { DataExchangeService } from '../../../core/services/data-exchange.service';
import { TransactionRecord } from '../../../models/transaction-record.model';


@Component({
  selector: 'app-data-exchange',
  standalone: true,
  // Agregamos DatePipe a imports para usar el pipe 'date' en el HTML
  imports: [CommonModule, DatePipe], 
  templateUrl: './data-exchange.component.html',
  styleUrls: ['./data-exchange.component.css']
})
export class DataExchangeComponent implements OnInit {
  private dataService = inject(DataExchangeService);

  history: TransactionRecord[] = [];
  selectedFile: File | null = null;
  isLoading: boolean = false;
  uploadMessage: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadHistory();
  }

  /**
   * Carga el historial de transacciones desde el servicio.
   */
  loadHistory(): void {
    this.dataService.getHistory().subscribe({
      next: (records) => {
        // Ordenamos por fecha de forma descendente
        this.history = records.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
      },
      error: (err) => {
        console.error('Error al cargar historial', err);
        this.errorMessage = 'No se pudo cargar el historial. Revise la conexión al servidor.';
      }
    });
  }

  /**
   * Maneja la selección del archivo por el usuario.
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.errorMessage = ''; 
    this.selectedFile = null;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      // Validación de extensión (solo .xlsx o .xls)
      if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        this.selectedFile = file;
        this.uploadMessage = `Archivo seleccionado: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
      } else {
        this.errorMessage = 'Tipo de archivo no permitido. Por favor, selecciona un archivo Excel (.xlsx o .xls).';
        input.value = ''; 
      }
    }
  }

  /**
   * Inicia el proceso de carga del archivo al servidor.
   */
  uploadFile(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Por favor, selecciona un archivo antes de iniciar la carga.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.dataService.uploadFile(this.selectedFile).subscribe({
      next: () => {
        this.uploadMessage = `¡Archivo ${this.selectedFile!.name} cargado con éxito! El procesamiento ha comenzado.`;
        this.selectedFile = null; 
        this.loadHistory(); 
      },
      error: (err) => {
        this.errorMessage = `Error al procesar la carga: ${err.error?.message || 'Error desconocido del servidor.'}`;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  /**
   * Exporta el historial de carga de la data (el log de transacciones).
   */
  exportHistoryLog(): void {
    this.dataService.exportHistoryLog().subscribe({
      next: (blob) => {
        this.saveFile(blob, `Log_Transacciones_${new Date().toISOString().slice(0, 10)}.xlsx`);
        this.uploadMessage = 'Exportación del historial de cargas iniciada.';
      },
      error: (err) => {
        this.errorMessage = `Error al exportar el historial: ${err.error?.message || 'Error desconocido.'}`;
      }
    });
  }

  /**
   * Exporta TODOS los registros clínicos de la base de datos.
   */
  exportClinicalData(): void {
    this.dataService.exportClinicalData().subscribe({
      next: (blob) => {
        this.saveFile(blob, `Data_Clinica_Completa_${new Date().toISOString().slice(0, 10)}.xlsx`);
        this.uploadMessage = 'Exportación de la data clínica completa iniciada.';
      },
      error: (err) => {
        this.errorMessage = `Error al exportar los datos clínicos: ${err.error?.message || 'Error desconocido.'}`;
      }
    });
  }

  /**
   * Descarga el archivo de errores de un registro específico.
   */
  downloadErrorFile(recordId: number, originalFileName: string): void {
    this.dataService.downloadErrors(recordId).subscribe(blob => {
      const errorFileName = `Errores_${originalFileName}`;
      this.saveFile(blob, errorFileName);
    });
  }

  /**
   * Función auxiliar para guardar el Blob como un archivo en el navegador.
   */
  private saveFile(blob: Blob, fileName: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}