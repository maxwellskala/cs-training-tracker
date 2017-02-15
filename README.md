# Instructions for use (with Heroku)
## Getting started
1. Clone repo and push to a remote of your choice.
2. `npm install` in both top-level directory and client directory. From top-level directory, `npm run start`. Open browser to 127.0.0.1:3000 and there should be a welcome page. If there isn't, open an issue cuz I haven't seen that before. :P
3. (Optional) Update your two `package.json` files (top-level and client/) with the name of your app and GitHub repo.

## Database stuff (ugh worst part I promise)
1. If you don't have it, install [PostgreSQL](https://www.postgresql.org/download/). If you choose another database, you're on your own here!
2. Set up [Homebrew](https://brew.sh/) to manage your background PostgreSQL processes: `brew tap homebrew/services` then `brew services start postgresql`.
3. Run `createuser --superuser --password [username]`. Remember both these credentials.
4. Run `createdb [db_name] --username=[username] --password`. Then enter a password for your new DB. Keep these credentials on hand as we're going to use them in a second.
5. Run `psql [db_name] < node_modules/connect-pg-simple/table.sql`. One of our dependencies requires a custom table and this is a short SQL script to create it.
6. Update `db/config/config.json` with the credentials you just created (i.e. key `[username]` to `"username"`, `[password_you_entered]` to `"password"` and `[db_name]` to `"database"`) in the `"development"` key.
7. Repeat steps 4 - 6 with the same username but instead of `[db_name]` use `[db_name]_test` or something similar and update the `"test"` key instead of the `"development"` key.
8. Restart the development server and make sure you can create a user and log in/out with them (this is making sure your DB is set up correctly). Again, open an issue if you have problems here.
9. Finally, `npm run test` to make sure your test database is also working.

## Initial deploy (to Heroku)
1. Set up [Heroku](https://devcenter.heroku.com/articles/heroku-cli) if you haven't already.
2. Create your Heroku app with the create-react-app buildpack: `heroku create [app_name]`.

### Database reprise
1. `heroku addons:create heroku-postgresql:hobby-dev` to provision a free, basic database from Heroku.
2. `heroku pg:psql --app [heroku_app_name] < node_modules/connect-pg-simple/table.sql`.

## Deploy finale
1. `cd client && npm run build` to build your client for production. Then add and commit the newly built files (I believe create-react-app adds `build/` to its .gitignore, so make sure to comment that out until you have a better build and deploy system) and `git push heroku master`.
