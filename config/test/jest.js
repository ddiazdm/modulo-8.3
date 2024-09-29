export default {
  preset: "ts-jest",  // Indicamos que use ts-jest
  testEnvironment: "node",
  rootDir: "../../",
  verbose: true,
  restoreMocks: true,
  moduleDirectories: ["<rootDir>/src", "node_modules"],
  transform: {
    "^.+\\.ts?$": "ts-jest",  // Usamos ts-jest para transformar archivos .ts
  },
  globals: {
    'ts-jest': {
      useESM: true,  // Habilitar ECMAScript Modules (import/export)
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
