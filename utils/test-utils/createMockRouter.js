export function createMockRouter(router) {
  return {
    query: {},
    isFallback: false,
    back: jest.fn(),
    push: jest.fn(),
    ...router,
  };
}
