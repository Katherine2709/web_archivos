# 📋 Sistema de Gestión de Inventario de Historias Clínicas  

**Aplicación web para la gestión digitalizada y eficiente de historias clínicas en entornos médicos**  

---

## 🚀 **Descripción del Proyecto**  
Solución integral desarrollada con **Spring Boot (Backend) y Angular (Frontend)** para optimizar el almacenamiento, seguimiento y control de historias clínicas físicas en **cajas etiquetadas**, implementando tecnologías como **códigos QR/barras, reconocimiento de texto con IA (Google ML Kit) y generación de informes en PDF**.  

✔ **Digitaliza** el inventario de historias clínicas en múltiples sedes, incluyendo un almacén central.  
✔ **Elimina errores manuales** mediante escaneo automático y reconocimiento de textos.  
✔ **Garantiza seguridad** en el acceso a datos sensibles.  

---

## 🔍 **Características Principales**  

### 📦 **Gestión de Inventario**  
- Registro y búsqueda de historias clínicas por sede, caja o paciente.  
- Actualización en tiempo real del estado de cada caja (disponible, prestada, archivada).  

### 📊 **Tecnologías de Digitalización**  
- **Escaneo de códigos QR/barras** (ZXing) para identificación rápida de cajas.  
- **Reconocimiento óptico de caracteres (OCR)** con Google ML Kit para leer números de historias clínicas desde folders.  

### 🛡 **Seguridad y Acceso**  
- Autenticación de usuarios con roles (administrador, empleado, auditor).  
- Encriptación de datos sensibles.  

### 📄 **Reportes y Exportación**  
- Generación de informes en **PDF** (iText) con detalles del inventario.  
- Exportación a formatos CSV/Excel para análisis externos.  

---

## ⚙️ **Tecnologías Utilizadas**  

| **Categoría**       | **Tecnologías**                                                                 |  
|----------------------|---------------------------------------------------------------------------------|  
| **Frontend**         | Angular 19, TypeScript, HTML5/CSS                                              |  
| **Backend**          | Spring Boot 3 (Java 21), Spring Security, JPA/Hibernate                        |  
| **Base de Datos**    | PostgreSQL / MySQL                                                             |  
| **Escaneo**          | ZXing (QR/barras), Google ML Kit (OCR)                                         |  
| **Documentación**    | Swagger (OpenAPI 3.0), Javadoc                                                 |  
| **DevOps**           | GitHub Actions (CI/CD)                                                         |  

---
<p align="center"> <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="Spring Boot"> <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular"> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"> <img src="https://img.shields.io/badge/Google%20ML%20Kit-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google ML Kit"> </p>
