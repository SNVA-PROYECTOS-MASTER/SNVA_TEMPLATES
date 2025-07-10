// Importamos los módulos necesarios de VS Code y otros paquetes.
const vscode = require('vscode');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// La URL del archivo .gitignore en formato "raw" para obtener el contenido puro.
const GITIGNORE_URL = 'https://raw.githubusercontent.com/SNVA-PROYECTOS-MASTER/SNVA_TEMPLATES/main/gitignore-template';

/**
 * Esta función se llama cuando la extensión es activada.
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // Registramos el comando que definimos en package.json
    let disposable = vscode.commands.registerCommand('snva-gitignore-generator.generateGitignore', async function () {
        
        try {
            // 1. Pedir al usuario que seleccione una carpeta de destino.
            const options = {
                canSelectMany: false,
                openLabel: 'Seleccionar Carpeta para el .gitignore',
                canSelectFiles: false,
                canSelectFolders: true
            };

            const folderUri = await vscode.window.showOpenDialog(options);

            // Si el usuario cancela la selección, folderUri será undefined.
            if (!folderUri || folderUri.length === 0) {
                vscode.window.showInformationMessage('Operación cancelada.');
                return;
            }

            const selectedFolderPath = folderUri[0].fsPath;
            const gitignorePath = path.join(selectedFolderPath, '.gitignore');

            // 2. Comprobar si el archivo .gitignore ya existe.
            if (fs.existsSync(gitignorePath)) {
                const response = await vscode.window.showWarningMessage(
                    'El archivo .gitignore ya existe en esta carpeta. ¿Deseas sobreescribirlo?',
                    'Sí, sobreescribir',
                    'No, cancelar'
                );

                if (response !== 'Sí, sobreescribir') {
                    vscode.window.showInformationMessage('Operación cancelada.');
                    return;
                }
            }

            // Mostramos un mensaje de progreso mientras se descarga.
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Descargando plantilla .gitignore...",
                cancellable: false
            }, async (progress) => {

                progress.report({ increment: 25, message: "Contactando con GitHub..." });

                // 3. Descargar el contenido del .gitignore desde la URL.
                const response = await axios.get(GITIGNORE_URL);
                const gitignoreContent = response.data;
                
                progress.report({ increment: 50, message: "Escribiendo archivo..." });

                // 4. Escribir el contenido en el archivo .gitignore en la ruta seleccionada.
                fs.writeFileSync(gitignorePath, gitignoreContent);

                progress.report({ increment: 100, message: "¡Completado!" });
            });

            // 5. Notificar al usuario que todo ha ido bien.
            vscode.window.showInformationMessage(`✅ Archivo .gitignore creado exitosamente en: ${selectedFolderPath}`);

            // Opcional: abrir el archivo recién creado.
            const document = await vscode.workspace.openTextDocument(gitignorePath);
            await vscode.window.showTextDocument(document);

        } catch (error) {
            // Manejo de errores (problemas de red, permisos de escritura, etc.)
            console.error(error);
            vscode.window.showErrorMessage(`❌ Error al generar el .gitignore: ${error.message}`);
        }
    });

    // Añadimos el comando al contexto para que se pueda desechar al desactivar la extensión.
    context.subscriptions.push(disposable);
}

// Esta función se llama cuando la extensión es desactivada.
function deactivate() {}

module.exports = {
    activate,
    deactivate
}