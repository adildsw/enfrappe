const RootFileGenerator = (frontendIp, frontendPort) => {
    return {
        packageJson: packageJson,
        env: env(frontendIp, frontendPort)
    }
}

export default RootFileGenerator;

const packageJson = `
{
    "name": "enfrappe-custom-server",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
        "@testing-library/jest-dom": "^5.16.2",
        "@testing-library/react": "^12.1.4",
        "@testing-library/user-event": "^13.5.0",
        "react": "^17.0.2",
        "react-dom": "^17.0.2",
        "react-scripts": "4.0.3",
        "semantic-ui-css": "^2.4.1",
        "semantic-ui-react": "^2.1.2",
        "use-sound": "^4.0.1",
        "web-vitals": "^2.1.4"
    },
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
    "eslintConfig": {
        "extends": [
            "react-app",
            "react-app/jest"
        ]
    },
    "browserslist": {
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ],
        "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ]
    }
}
`;

const env = (frontendIp, frontendPort) => (`
PORT=${frontendPort}
HOST=${frontendIp}
`);