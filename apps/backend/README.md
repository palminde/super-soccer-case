# Node + Express Backend

This is a simple Node + Express backend that serves as the API for the [React frontend](../frontend/README.md).

## Development

To run the backend project locally, execute the following commands:

```
yarn
yarn dev
```

The backend server will start at [http://localhost:3001](http://localhost:3001).

## API Endpoints

The backend server exposes the following API endpoints:

```
GET /api/v1/team/pokemon
GET /api/v1/team/starwars
```

## Testing

The project uses vitest for testing. To run the tests, execute the following command:

```
yarn test
```
