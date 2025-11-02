import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionRecord } from '../../models/transaction-record.model';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {
  // Asegúrate de que HttpClientModule esté importado en tu AppModule o que tu componente use provideHttpClient()
  private http = inject(HttpClient);
  // URL base de tu backend de Spring Boot
  private apiUrl = 'http://localhost:8080/api/files'; 

  /**
   * 📤 Envía el archivo Excel al backend para su procesamiento.
   */
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  /**
   * 📜 Obtiene el historial de todas las transacciones de carga.
   */
  getHistory(): Observable<TransactionRecord[]> {
    return this.http.get<TransactionRecord[]>(`${this.apiUrl}/history`);
  }

  /**
   * ❌ Descarga el archivo Excel con los registros que contuvieron errores.
   */
  downloadErrors(recordId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/errors/${recordId}`, {
      responseType: 'blob' 
    });
  }

  /**
   * ⬇️ Exporta el historial de transacciones (el contenido de la tabla del log).
   */
  exportHistoryLog(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/log`, {
      responseType: 'blob' 
    });
  }

  /**
   * ⬇️ Exporta TODOS los registros clínicos de la base de datos (Data).
   */
  exportClinicalData(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/data`, {
      responseType: 'blob'
    });
  }
}