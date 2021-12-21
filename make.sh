test -f .env && (rm .env && > .env) || > .env

read -p 'Set default environment (Y|N): ' results

if [ "$results" == "y" ] || [ "$results" == "Y" ] 
  then 
    echo "### Server config ###" >> .env
    echo "NODE_ENV=development" >> .env
    echo "HOST=0.0.0.0" >> .env
    echo "PORT=8080" >> .env
    echo >> .env
    echo "### Auth config ###" >> .env
    echo "AUTH_KEY_SMS=secret" >> .env
    echo "AUTH_KEY_SECURITY=secret" >> .env
    echo "AUTH_KEY_TOKEN_EXPIRES=300000" >> .env
    echo >> .env
    echo "### SQL Server config (APP) ###" >> .env
    echo "MSSQL_APP_CONNECTION_NAME=app" >> .env
    echo "MSSQL_APP_HOST=localhost" >> .env
    echo "MSSQL_APP_PORT=1433" >> .env
    echo "MSSQL_APP_NAME=root" >> .env
    echo "MSSQL_APP_USER=root" >> .env
    echo "MSSQL_APP_PASS=root" >> .env
    echo >> .env
    echo "### SQL Server config (ADMIN) ###" >> .env
    echo "MSSQL_ADMIN_CONNECTION_NAME=admin" >> .env
    echo "MSSQL_ADMIN_HOST=localhost" >> .env
    echo "MSSQL_ADMIN_PORT=1433" >> .env
    echo "MSSQL_ADMIN_NAME=root" >> .env
    echo "MSSQL_ADMIN_USER=root" >> .env
    echo "MSSQL_ADMIN_PASS=root" >> .env
    echo >> .env
    echo "### Mongo config ###" >> .env
    echo "MONGO_HOST=localhost" >> .env
    echo "MONGO_PORT=27017" >> .env
    echo "MONGO_NAME=test" >> .env
    echo "MONGO_USER=root" >> .env
    echo "MONGO_PASS=root" >> .env
    echo >> .env
    echo "### Redis config ###" >> .env
    echo "REDIS_HOST=localhost" >> .env
    echo "REDIS_PORT=27017" >> .env

else 
  echo ""
  echo "### Server config ###"
  echo ""

  echo "### Server config ###" >> .env

  read -p 'Node environment (development): ' INPUT
    [ -z "$INPUT" ] && echo "NODE_ENV=development" >> .env || echo "NODE_ENV=$INPUT" >> .env

  read -p 'Server host (0.0.0.0): ' INPUT
    [ -z "$INPUT" ] && echo "HOST=0.0.0.0" >> .env || echo "HOST=$INPUT" >> .env


  read -p 'Server port (8080): ' INPUT
    [ -z "$INPUT" ] && echo "PORT=8080" >> .env || echo "PORT=$INPUT" >> .env

  echo >> .env
  echo ""
  echo "----------------------------"

  echo "### Auth config ###"
  echo ""

  echo "### Auth config ###" >> .env

  read -p 'Auth key sms (secret): ' INPUT
    [ -z "$INPUT" ] && echo "AUTH_KEY_SMS=secret" >> .env || echo "AUTH_KEY_SMS=$INPUT" >> .env

  read -p 'Auth key security (secret): ' INPUT
    [ -z "$INPUT" ] && echo "AUTH_KEY_SECURITY=secret" >> .env || echo "AUTH_KEY_SECURITY=$INPUT" >> .env

  read -p 'Auth key expires (300000): ' INPUT
    [ -z "$INPUT" ] && echo "AUTH_KEY_TOKEN_EXPIRES=300000" >> .env || echo "AUTH_KEY_TOKEN_EXPIRES=$INPUT" >> .env

  echo >> .env
  echo ""
  echo "----------------------------"

  echo "### SQL Server config (APP) ###"
  echo ""

  echo "### SQL Server config (APP) ###" >> .env

  read -p 'Connection name (app): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_APP_CONNECTION_NAME=app" >> .env || echo "MSSQL_APP_CONNECTION_NAME=$INPUT" >> .env

  read -p 'SQL Server host (localhost): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_APP_HOST=localhost" >> .env || echo "MSSQL_APP_HOST=$INPUT" >> .env

  read -p 'SQL Server port (1433): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_APP_PORT=1433" >> .env || echo "MSSQL_APP_PORT=$INPUT" >> .env

  read -p 'SQL Server database (root): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_APP_NAME=root" >> .env || echo "MSSQL_APP_NAME=$INPUT" >> .env

  read -p 'SQL Server user (root): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_APP_USER=root" >> .env || echo "MSSQL_APP_USER=$INPUT" >> .env

  read -sp 'SQL Server password (root): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_APP_PASS=root" >> .env || echo "MSSQL_APP_PASS=$INPUT" >> .env

  echo >> .env
  echo ""
  echo "----------------------------"

  echo "### SQL Server config (ADMIN) ###"
  echo ""

  echo "### SQL Server config (ADMIN) ###" >> .env

  read -p 'Connection name (admin): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_ADMIN_CONNECTION_NAME=admin" >> .env || echo "MSSQL_ADMIN_CONNECTION_NAME=$INPUT" >> .env

  read -p 'SQL Server host (localhost): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_ADMIN_HOST=localhost" >> .env || echo "MSSQL_ADMIN_HOST=$INPUT" >> .env

  read -p 'SQL Server port (1433): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_ADMIN_PORT=1433" >> .env || echo "MSSQL_ADMIN_PORT=$INPUT" >> .env

  read -p 'SQL Server database (root): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_ADMIN_NAME=root" >> .env || echo "MSSQL_ADMIN_NAME=$INPUT" >> .env

  read -p 'SQL Server user (root): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_ADMIN_USER=root" >> .env || echo "MSSQL_ADMIN_USER=$INPUT" >> .env

  read -sp 'SQL Server password (root): ' INPUT
    [ -z "$INPUT" ] && echo "MSSQL_ADMIN_PASS=root" >> .env || echo "MSSQL_ADMIN_PASS=$INPUT" >> .env

  echo >> .env
  echo ""
  echo "----------------------------"

  echo "### Mongo config ###"
  echo ""

  echo "### Mongo config ###" >> .env

  read -p 'Mongo host (localhost): ' INPUT
    [ -z "$INPUT" ] && echo "MONGO_HOST=localhost" >> .env || echo "MONGO_HOST=$INPUT" >> .env

  read -p 'Mongo port (27017): ' INPUT
    [ -z "$INPUT" ] && echo "MONGO_PORT=27017" >> .env || echo "MONGO_PORT=$INPUT" >> .env

  read -p 'Mongo database (test): ' INPUT
    [ -z "$INPUT" ] && echo "MONGO_NAME=test" >> .env || echo "MONGO_NAME=$INPUT" >> .env

  read -p 'Mongo user (root): ' INPUT
    [ -z "$INPUT" ] && echo "MONGO_USER=root" >> .env || echo "MONGO_USER=$INPUT" >> .env

  read -sp 'Mongo password (root): ' INPUT
    [ -z "$INPUT" ] && echo "MONGO_PASS=root" >> .env || echo "MONGO_PASS=$INPUT" >> .env
  
  echo >> .env
  echo ""
  echo "----------------------------"

  echo "### Redis config ###"
  echo ""

  echo "### Redis config ###" >> .env

  read -p 'Redis host (localhost): ' INPUT
    [ -z "$INPUT" ] && echo "REDIS_HOST=localhost" >> .env || echo "REDIS_HOST=$INPUT" >> .env

  read -p 'Redis port (6379): ' INPUT
    [ -z "$INPUT" ] && echo "REDIS_PORT=6379" >> .env || echo "REDIS_PORT=$INPUT" >> .env

  echo >> .env
  echo ""
  echo "----------------------------"
fi


echo "Successfully!!"
echo ""