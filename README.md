## Requerimientos
* [node](https://nodejs.org/en/) ^10.13.0
* [npm](https://nodejs.org/en/) ^6.4.1
* [puppetter (headless chrome)](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md)

## Como empezar
1. Para empezar, clone el repositorio

  ```
  git clone `<repo>`
  ```

2. Instale las dependencias con npm

  ```
  npm install
  ```

3. Corra el servidor en modo de desarrollo

  ```
  npm start # or npm run start
  ```

## NPM scripts
`npm <script>`|descripción
---------------|-----------
`start`|Inicia el servidor en el ambiente de desarrollo
`build`|Genera los archivos de la aplicación y los almacena en la carpeta `build`
`build:prod`|Genera los archivos minificados de la aplicación y los almacena en la carpeta `build`
`lint:js`|Verifica que la sintaxis de los archivos JS sea correcta