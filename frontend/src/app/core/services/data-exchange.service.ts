// data-exchange.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define el tipo de dato que espera del historial (ajústelo a su entidad real)
interface HistoryEntry {
    fecha: string; // O Date
    tipo: 'Importación' | 'Exportación';
    archivo: string;
    estado: string;
}

@Injectable({
    providedIn: 'root'
})
export class DataExchangeService {

    // URL base de su backend de Spring Boot
    private apiUrl = 'http://localhost:8080/api/data';

    // Ajuste esta URL a su controlador de Spring Boot real (ej: '/archivo')

    constructor(private http: HttpClient) { }

    // 1. Petición para Importar Datos (Subir Archivo Excel)
    // Necesita un 'FormData' para enviar archivos al backend.
    uploadExcelFile(file: File): Observable<any> {
        const formData: FormData = new FormData();
        // 'file' debe coincidir con el nombre esperado en su @RequestParam de Spring Boot
        formData.append('file', file, file.name);

        // Opcional: El JWTInterceptor de Angular se encargará de añadir el token
        return this.http.post(`${this.apiUrl}/import`, formData);
    }

    // 2. Petición para Exportar Datos (Descargar Archivo Excel)
    // Necesita especificar 'responseType: "blob"' para manejar el archivo binario
    exportData(): Observable<Blob> {
        return this.http.get(`${this.apiUrl}/export`, {
            responseType: 'blob'
        });
    }

    // 3. Petición para Obtener el Historial de Transacciones
    // Sustituya 'HistoryEntry[]' por el tipo de dato real que devuelve su backend
    getHistory(): Observable<HistoryEntry[]> {
        return this.http.get<HistoryEntry[]>(`${this.apiUrl}/history`);
    }

    // Helper para manejar la descarga del archivo blob
    downloadFile(blob: Blob, fileName: string): void {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
}