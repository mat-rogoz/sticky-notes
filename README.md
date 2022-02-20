# Sticky Notes

### Requirements:
- npm
- node >= 12

### Steps to run this application:

- Run `npm i` command
- Run `npm run typeorm migration:run` command
- Run `npm run start` command

You can check if app is working properly using `curl http://localhost:3333/health` command

### Configuration

You can run the application on a different port by changing the property `port` in `src/config/config.ts` file
