# My Little Sport — Frontend Storefront

Este directorio contiene la aplicación del cliente final (Storefront) de **My Little Sport**, una Single Page Application (SPA) moderna, dinámica y altamente interactiva desarrollada con **React 19**, **TypeScript** y construida con **Vite**.

La interfaz de la tienda ha sido diseñada en referencia a Nike, empleando una combinación de colores, tipografía, efectos y micro-animaciones fluidas para asegurar una experiencia de usuario (UX) agradable.

---

## Stack Tecnológico del Frontend

La tienda utiliza las siguientes librerías para asegurar escalabilidad y velocidad:

* **React 19**: Versión más moderna de la biblioteca de UI de Facebook, aprovechando mejoras de renderizado y el nuevo compilador optimizado de React.
* **TypeScript 5.9**: Tipado estático completo a lo largo de toda la interfaz para prevenir errores en tiempo de desarrollo y asegurar un mantenimiento escalable.
* **Vite 7.3**: Herramienta de compilación de nueva generación que ofrece un servidor de desarrollo ultrarrápido con Hot Module Replacement (HMR) casi instantáneo.
* **Tailwind CSS v4**: El framework CSS utilitario por excelencia, configurado para estructurar estilos atómicos consistentes y transiciones animadas avanzadas.
* **Bootstrap 5.3 & Bootstrap Icons**: Empleado de manera estratégica para simplificar layouts responsivos basados en rejilla (grid) y estilizar componentes comunes.
* **React Router DOM v7.1**: Enrutador declarativo para la navegación por páginas internas sin recarga de navegador, con soporte para páginas de error y rutas protegidas.
* **Axios**: Cliente HTTP para la comunicación con el Backend. Cuenta con configuraciones personalizadas e **interceptores de peticiones** automáticos que adjuntan los tokens JWT y controlan la expiración de las credenciales.
* **Pasarelas de Pago Interactivas**:
  * **Stripe React SDK (`@stripe/stripe-js`)**: Componentes interactivos y seguros de inputs de tarjeta de crédito (Stripe Elements).
  * **PayPal React SDK (`@paypal/react-paypal-js`)**: Botones dinámicos inteligentes para el flujo de pago con cuentas PayPal Sandbox.
* **Poppins Font (`@fontsource/poppins`)**: Tipografía moderna cargada localmente sin ralentizar la carga inicial de la página.

---

## Arquitectura y Estructura de Directorios

La estructura de carpetas sigue un enfoque modular basado en **Características (Features)** para mantener el código desacoplado y auto-contenido:

```text
frontend/src/
├── assets/
├── components/
├── features/
│   ├── auth/
│   ├── layout/
│   ├── orders/
│   ├── products/
│   ├── shared/
│   └── shopping-cart/
├── App.css
├── index.css
└── main.tsx
```

---

## Características Principales Implementadas

1. **Catálogo Deportivo Avanzado**: Listado interactivo con paginación, filtros dinámicos por categorías deportivas, ordenación por precio y búsqueda de artículos en tiempo real.
2. **Ficha de Detalle Dinámica**: Visualización ampliada de imágenes, valoraciones de usuarios por estrellas y selector inteligente de variantes físicas (ej. tallas S, M, L) que valida el stock en tiempo real.
3. **Carrito de Compras de Desplazamiento Lateral**: Un cajón interactivo que permite añadir, restar y eliminar variantes, manteniendo la persistencia local de la sesión de compra y comprobando la disponibilidad de stock en el backend.
4. **Flujo de Pago Dual (Checkout)**: Integración dual e interactiva para compras reales y pruebas:
   * Formulario interactivo de Stripe para pagos con tarjeta.
   * Ventanas emergentes nativas de PayPal Sandbox.
5. **Panel del Perfil del Usuario**: Área privada para clientes donde pueden actualizar datos personales, gestionar múltiples direcciones de envío mediante un CRUD dedicado y consultar su historial detallado de pedidos deportivos.
6. **Autenticación Segura y OTP**: Flujo de inicio de sesión con JWT y validación obligatoria de cuentas mediante códigos de un solo uso enviados por email para mitigar cuentas falsas.

---

## Ejecución en Desarrollo Local (Sin Docker)

Si deseas levantar el frontend de forma independiente sin utilizar Docker, sigue estos sencillos pasos:

### Requisitos Previos
* **Node.js** v18 o superior instalado.
* **npm** v10 o superior (viene junto a Node.js).

### Pasos de Ejecución
1. Navega al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Instala todas las dependencias necesarias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo local de Vite:
   ```bash
   npm run dev
   ```
4. El servidor se iniciará y te mostrará la dirección de acceso local (habitualmente `http://localhost:5173`).
5. Asegúrate de configurar el endpoint correcto de la API en el archivo de configuración global `src/features/shared/config.ts` para que apunte a tu servidor backend local (ej. `http://localhost:8080`).

---

## Scripts Disponibles en `package.json`

En el directorio del frontend puedes ejecutar los siguientes scripts de automatización:

* `npm run dev`: Levanta el servidor de desarrollo local con recarga en caliente (HMR).
* `npm run build`: Ejecuta el verificador de tipos de TypeScript y compila el frontend generando los archivos de producción optimizados en la carpeta `/dist`.
* `npm run lint`: Ejecuta el análisis estático de código mediante **ESLint** para asegurar la calidad de sintaxis del código TypeScript.
* `npm run preview`: Previsualiza de forma local la build optimizada de producción previamente generada.

---
*Frontend premium, responsivo y adaptado para ofrecer la máxima velocidad en cualquier dispositivo.*
