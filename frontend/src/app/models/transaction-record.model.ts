// src/app/models/transaction-record.model.ts

/**
 * Define la estructura del registro de una transacción de importación/exportación.
 */
export interface TransactionRecord {
  id: number;
  fileName: string; // Nombre del archivo subido (e.g., 'data_pacientes.xlsx')
  uploadDate: Date; // Fecha y hora de inicio de la carga
  uploadedBy: string; // Nombre del usuario que ejecutó la acción
  totalRecords: number; // Cantidad total de registros leídos en el archivo
  successRecords: number; // Registros procesados correctamente
  errorRecords: number; // Registros que tuvieron errores
  status: 'EXITO' | 'FALLO_PARCIAL' | 'FALLO_TOTAL' | 'EN_PROCESO'; // Estado de la transacción
  errorFileAvailable: boolean; // Indica si hay un archivo de errores para descargar
}