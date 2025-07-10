# SNVA Gitignore Generator

Esta extensión para Visual Studio Code permite generar un archivo `.gitignore` basado en la plantilla estándar utilizada en los proyectos de SNVA.

El contenido del `.gitignore` se obtiene siempre en tiempo real desde el repositorio oficial de plantillas, asegurando que siempre tengas la versión más actualizada.

## Características

*   **Comando simple:** Accede a la funcionalidad a través de la Paleta de Comandos (`Ctrl+Shift+P`).
*   **Plantilla actualizada:** Obtiene el `.gitignore` directamente desde la URL: `https://github.com/SNVA-PROYECTOS-MASTER/SNVA_TEMPLATES/blob/main/.gitignore`.
*   **Selector de ruta:** Te permite elegir exactamente en qué carpeta deseas guardar el archivo `.gitignore` generado.
*   **Protección contra sobreescritura:** Si ya existe un `.gitignore` en la carpeta seleccionada, la extensión te preguntará si deseas reemplazarlo.

## Cómo Usar

1.  Abre la Paleta de Comandos (`Ctrl+Shift+P` o `Cmd+Shift+P` en Mac).
2.  Busca y selecciona el comando: **`Generar .gitignore desde plantilla SNVA`**.
3.  Se abrirá un diálogo para que selecciones la carpeta de destino.
4.  ¡Listo! El archivo `.gitignore` se creará en la ubicación que elegiste.

## Requisitos

No hay requisitos especiales, solo una conexión a internet para descargar la plantilla.

## Notas de la Versión

### 0.0.1

*   Lanzamiento inicial de la extensión.
*   Funcionalidad básica para generar el `.gitignore`.

---
