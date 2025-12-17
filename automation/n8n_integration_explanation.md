# Documentación de Integración del Flujo de Trabajo Cuántico (Quantum Workflow)

## 1. Visión General de la Arquitectura (Filosofía 10x)

Esta arquitectura no se trata solo de conectar herramientas; se trata de **desacoplar la lógica de negocio de la ejecución de código**.

*   **n8n (El Cerebro/Orquestador):** Maneja el flujo, las decisiones, las reintentos y las conexiones a servicios externos (Slack, Mongo, Email). Es "Low-Code", lo que permite iterar la lógica de negocio 10 veces más rápido que escribiendo código puro.
*   **Python Flask API (El Músculo/Ejecutor):** Realiza el trabajo pesado y computacionalmente costoso (Llamadas a IA, procesamiento de datos complejos). Al estar aislado en una API, es escalable independientemente y fácil de depurar.
*   **MongoDB (La Memoria):** Persistencia de datos crudos y procesados para análisis posterior (Data Lake).

**Resultado:** Un sistema modular, resiliente y de costo marginal casi cero.

---

## 2. Componentes del Sistema

### A. Servidor API (`quantum_workflow_api_server.py`)
Este es un microservicio ligero que expone endpoints para que n8n los consuma.

*   **Endpoint Principal:** `POST /api/v1/process-lead`
*   **Seguridad:** Verifica `X-API-KEY`.
*   **Función:** Simula (o implementa) una llamada a una IA para calificar un lead y generar un mensaje de outreach.

**Puesta en Marcha:**
1.  Instalar dependencias: `pip install flask`
2.  Ejecutar: `python quantum_workflow_api_server.py`
3.  *(Producción)*: Usar Gunicorn o Docker.

### B. Flujo de n8n (`n8n_quantum_workflow_integration.json`)
El diagrama de flujo que automatiza el proceso.

**Nodos Clave:**
1.  **Webhook:** Punto de entrada. Recibe datos del Lead (ej. desde un Typeform o Landing Page).
2.  **MongoDB:** Guarda el lead *inmediatamente* para no perder datos.
3.  **HTTP Request:** Llama a nuestra API de Python (`http://localhost:5000/...`).
4.  **Slack:** Notifica al equipo de ventas si el lead es prometedor.
5.  **Error Trigger:** Si *algo* falla, envía un email de alerta crítico. ¡Cero silencios en fallos!

---

## 3. Guía de Implementación Rápida

### Paso 1: Levantar el Backend
Abra una terminal en la carpeta `automation` y ejecute:
```bash
# Si no tiene flask
pip install flask

# Correr el servidor
python quantum_workflow_api_server.py
```
*Debería ver: "Running on http://0.0.0.0:5000"*

### Paso 2: Importar en n8n
1.  Abra su instancia de n8n (local o nube).
2.  Cree un nuevo workflow.
3.  En la esquina superior derecha, menú "..." -> "Import from File".
4.  Seleccione `n8n_quantum_workflow_integration.json`.

### Paso 3: Configurar Credenciales
Los nodos de MongoDB, Slack y Email aparecerán con advertencias. Debe configurar sus propias credenciales en n8n para cada servicio:
*   **MongoDB:** String de conexión (ej. Atlas).
*   **Slack:**  Token de Bot o Webhook URL.
*   **SMTP:** Datos de su servidor de correo.

### Paso 4: Prueba de Fuego (Test)
1.  En n8n, haga clic en "Execute Workflow".
2.  Use Postman o `curl` para enviar un POST al Webhook de prueba de n8n:
    ```bash
    curl -X POST https://su-instancia-n8n/webhook-test/lead-capture \
    -H "Content-Type: application/json" \
    -d '{"id": "lead_007", "message": "Interesado en escalado 10x"}'
    ```
3.  Verifique que:
    *   El servidor Python recibe la petición.
    *   Slack recibe la alerta.
    *   MongoDB tiene el registro.

## 4. Notas de Optimización "Elon Musk"

*   **Latencia:** Mantenga el servidor Python y n8n en la misma red privada (VPC) para reducir la latencia HTTP a <5ms.
*   **Escalabilidad:** Si recibe 10,000 leads/segundo, puede escalar el servidor Python horizontalmente (Kubernetes) sin tocar el flujo de n8n.
*   **Idempotencia:** Asegúrese de que procesar el mismo `lead_id` dos veces no duplique acciones (el diseño actual lo permite, pero la base de datos debería tener un índice único).

---
*Este sistema no es solo automatización; es una ventaja competitiva injusta.*
