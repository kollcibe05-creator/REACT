module.exports = {
  testEnvironment: "jsdom",
  transform: {
    //Tells Jest "If you see a JS or JSX file, use Bable to read it."
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    //Mocks out CSS/Style imports which would otherwise break Jest.
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};