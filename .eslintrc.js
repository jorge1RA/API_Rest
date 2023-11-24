module.exports = {
  // Configuración general del entorno donde se ejecuta el código
  env: {
    browser: true, // Este código se ejecuta en un navegador
    es2021: true, // Utiliza características de ECMAScript 2021
  },

  // Extensiones de configuración utilizadas
  extends: [
    "eslint:recommended", // Configuración recomendada por ESLint
    "plugin:react/recommended", // Reglas recomendadas para React
  ],

  // Reglas específicas para ciertos archivos o directorios
  overrides: [
    {
      env: {
        node: true, // Para archivos con nombres ".eslintrc.js" o ".eslintrc.cjs"
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script", // El código se interpreta como un script
      },
    },
  ],

  // Opciones del parser (analizador de código)
  parserOptions: {
    ecmaVersion: "latest", // Utiliza la versión más reciente de ECMAScript
  },

  // Plugins utilizados (como el plugin de ESLint para React)
  plugins: ["react"],

  // Reglas específicas de ESLint para este proyecto (aún no se han configurado)
  rules: {
    // Aquí puedes personalizar y agregar reglas específicas según tus necesidades
  },

  // INFO: Se corrige el error añadiendo esta parte del código donde apunta y detecta la version del React
  // Configuración de React
  settings: {
    react: {
      version: "detect", // Detecta automáticamente la versión de React
    },
  },
};
