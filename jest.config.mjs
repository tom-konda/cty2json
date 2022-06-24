export default async() => {
  return {
    rootDir: './',
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    verbose: true,
  };
};