# My Little Sport — Plataforma de E-Commerce

**My Little Sport** es un ecosistema de comercio electrónico completo, moderno y de alto rendimiento, especialmente diseñado para la visualización, venta y gestión de productos y artículos deportivos.

Este proyecto está estructurado bajo una arquitectura **full-stack desacoplada y contenerizada**, inspirada en la fluidez estética y dinamismo de plataformas líderes como Nike. Ofrece una experiencia de navegación agradable para el cliente y herramientas robustas de control interno para el negocio.

---

## ¿De Qué Se Trata el Proyecto?

**My Little Sport** es un sistema de E-commerce de ciclo completo que unifica tres capas principales:

1. **Tienda del Cliente (Frontend SPA)**: 
   Una Single Page Application (SPA) interactiva y ágil, desarrollada con React y TypeScript, orientada a que los usuarios exploren categorías deportivas, consulten variantes de artículos (tallas, colores), interactúen con su carrito de compras y realicen simulaciones de pagos seguros.
2. **Servicio y API REST (Backend Headless)**:
   Un motor centralizado desarrollado con Spring Boot que provee endpoints RESTful organizados, seguros e inmutables. Es el encargado de procesar la lógica de negocio, transacciones, envíos de correos de verificación y autenticación.
3. **Panel de Gestión y Administración (Dashboard MVC)**:
   Un panel de control web tradicional e interactivo integrado directamente en el backend mediante Spring Boot MVC y plantillas de Thymeleaf. Permite a los administradores de la tienda gestionar de forma visual e intuitiva el stock físico, variantes de tallas, categorías jerárquicas, estado de pedidos e incluso moderar valoraciones de productos.

---

## Stack Tecnológico General

| Módulo | Tecnologías Principales | Propósito |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Bootstrap 5 | Interfaz de usuario responsiva, rápida y agradable. |
| **Backend** | Java 21, Spring Boot 4.0, JPA / Hibernate, Thymeleaf | Motor de negocio, APIs REST, seguridad y panel web de gestión. |
| **Base de Datos** | MySQL 8.4 | Persistencia relacional de todas las entidades de la tienda. |
| **Seguridad** | JWT, Spring Security, BCrypt, Protección CSRF | Filtro doble: Stateless para la API REST y Stateful para el panel web. |
| **Pasarelas de Pago** | Stripe SDK, PayPal SDK | Simulación y procesamiento de pagos seguros con tarjeta y cuentas de prueba. |
| **Mailing y SMTP** | JavaMailSender | Envío automatizado de códigos de activación (OTP) de cuentas. |
| **Contenerización** | Docker, Docker Compose | Orquestación completa para desarrollo local rápido y producción. |

---

## Estructura del Monorepo

El código del proyecto está distribuido de forma limpia en directorios específicos:

```text
My-Little-Sport-Ecommerce/
├── backend/                  
│   ├── src/                  
│   ├── pom.xml               
│   └── Dockerfile            
├── frontend/                 
│   ├── src/                  
│   ├── package.json          
│   └── Dockerfile            
├── .env.docker            
├── docker-compose.yml        
├── docker-compose.prod.yml   
└── README.md                 
```

---

## Guía de Descarga y Configuración

Sigue estos sencillos pasos para obtener una copia local y poner en marcha la aplicación completa en unos minutos haciendo uso de **Docker**.

### 1. Clonar el Proyecto
Abre tu terminal y clona este repositorio git:

```bash
git clone https://github.com/hugopiramide/My-Little-Sport-Ecommerce.git
cd My-Little-Sport-Ecommerce
```

---

### 2. Configurar Variables de Entorno (`.env`)
El sistema requiere claves de seguridad, secretos JWT y credenciales SMTP para su correcto funcionamiento. 

He preparado un archivo de plantilla con valores listos para desarrollo local. Realiza una copia de este archivo con el nombre `.env` en la raíz de la carpeta del proyecto:

```bash
cp .env.docker .env
```


Puedes abrir el archivo `.env` resultante y editar las variables a tu gusto, por ejemplo, para añadir tus credenciales reales de Stripe, cuentas Sandbox de PayPal o servidores de correo personalizados.

---

### 3. Levantar la Infraestructura Completa

Ejecuta el siguiente comando en la raíz del proyecto para descargar las imágenes requeridas, construir los contenedores y levantar la base de datos MySQL, el servidor Spring Boot y el cliente React de forma automatizada:

```bash
sudo docker compose up --build
```

*(Una vez que la compilación termine de forma exitosa, en el futuro podrás arrancar el proyecto directamente con `sudo docker compose up` o en segundo plano usando la bandera `-d`).*

---

## Direcciones de Acceso y Credenciales

Una vez que los contenedores estén levantados y estables, puedes acceder a las diferentes plataformas:

* ** Tienda del Cliente (Frontend):** `http://localhost:5173`
  * Explora los catálogos deportivos, regístrate y realiza compras.
* ** Panel de Gestión Administrativa:** `http://localhost:8080/login`
  * Dashboard de administración web de productos y compras.
  * **Credenciales por defecto (inicializadas automáticamente por `data.sql`):**
    *  **Usuario/Email:** `admin@example.com`
    *  **Contraseña:** `AdminAa1!23dmin`
* ** Endpoints de la API REST:** `http://localhost:8080/api`
  * Listados paginados integrados con HATEOAS.

---

## Registro de Usuarios y Flujo de Correo en Desarrollo

Al registrar una nueva cuenta de cliente en el frontend, el sistema enviará un código OTP por correo electrónico para verificar la cuenta. 

Durante el desarrollo local, si no deseas configurar un servidor de correo real, el backend **imprimirá directamente en los logs de la consola** el código autogenerado. Puedes buscar una línea como la siguiente en tu terminal de Docker:

```text
[DEV] Email verification code for testuser@example.com: 698528
```

Simplemente copia ese número de 6 dígitos e introdúcelo en la pantalla de verificación del frontend para activar la cuenta de pruebas.

---

## Documentación Detallada de los Módulos

Si deseas profundizar en las arquitecturas específicas, librerías, dependencias internas y guías de desarrollo nativo de cada capa del proyecto, consulta sus respectivos README:

* [ Ver Documentación Detallada del Frontend](./frontend/README.md)
* [ Ver Documentación Detallada del Backend](./backend/README.md)

---
*Desarrollado y mantenido con dedicación por [hugopiramide](https://github.com/hugopiramide)*
